import { useEffect, useRef, useState, useCallback } from 'react';
import { CustomWad, DoomExports, EngineStats, GameStatus } from '../types';
import { soundEngine } from '../utils/soundEngine';

export function useDoomEngine(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [customWad, setCustomWad] = useState<CustomWad | null>(null);
  const [fpsLimit, setFpsLimit] = useState<number>(0); // 0 = unlocked (RAF)
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStage, setLoadingStage] = useState<string>('Preparing...');
  const [currentFile, setCurrentFile] = useState<string>('assets/doom.wasm');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [stats, setStats] = useState<EngineStats>({
    fps: 0,
    width: 640,
    height: 400,
    ticks: 0,
    loadedWad: 'DOOM1.WAD (Shareware)',
  });

  const exportsRef = useRef<DoomExports | null>(null);
  const memoryRef = useRef<WebAssembly.Memory | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const keyMapRef = useRef<Map<string, number>>(new Map());
  const scratchImageRef = useRef<ImageData | null>(null);
  const totalTicksRef = useRef<number>(0);
  const fpsFrameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(performance.now());
  const isPausedRef = useRef<boolean>(false);
  const customWadRef = useRef<CustomWad | null>(null);
  const fpsLimitRef = useRef<number>(fpsLimit);

  // Sync refs
  customWadRef.current = customWad;
  fpsLimitRef.current = fpsLimit;

  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [...prev.slice(-100), msg]);
  }, []);

  const readUtf8 = (memory: WebAssembly.Memory, offset: number, length: number): string => {
    try {
      const buf = new Uint8Array(memory.buffer, offset, length);
      const dec = new TextDecoder('utf-8', { fatal: false });
      return dec.decode(buf);
    } catch {
      return '';
    }
  };

  const getGlobalValue = (global: WebAssembly.Global | number | undefined): number => {
    if (typeof global === 'number') return global;
    if (global && typeof global === 'object' && 'value' in global) {
      return (global as { value: number }).value;
    }
    return 0;
  };

  const sendKeyDown = useCallback((doomKey: number) => {
    if (exportsRef.current && !isPausedRef.current) {
      exportsRef.current.reportKeyDown(doomKey);
    }
  }, []);

  const sendKeyUp = useCallback((doomKey: number) => {
    if (exportsRef.current) {
      exportsRef.current.reportKeyUp(doomKey);
    }
  }, []);

  // Stop any active ticker
  const stopLoop = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // Start ticker according to fpsLimit
  const startLoop = useCallback(() => {
    stopLoop();
    const limit = fpsLimitRef.current;

    const doTick = () => {
      if (!isPausedRef.current && exportsRef.current) {
        try {
          exportsRef.current.tickGame();
          totalTicksRef.current++;
        } catch (tickErr) {
          console.error('Tick error:', tickErr);
        }
      }
    };

    if (limit === 0) {
      // Unlocked: requestAnimationFrame
      const loop = () => {
        doTick();
        rafIdRef.current = requestAnimationFrame(loop);
      };
      rafIdRef.current = requestAnimationFrame(loop);
    } else {
      // Locked to specific FPS target (e.g., 30, 35, 60)
      const ms = Math.max(1, 1000 / limit);
      intervalIdRef.current = window.setInterval(doTick, ms);
    }
  }, [stopLoop]);

  // Restart loop when fpsLimit changes and engine is running
  useEffect(() => {
    if (status === 'running') {
      startLoop();
    }
  }, [fpsLimit, status, startLoop]);

  // Start / initialize engine with authentic loading stages
  const startEngine = useCallback(async () => {
    if (isInitialized && exportsRef.current) {
      isPausedRef.current = false;
      setStatus('running');
      startLoop();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      setErrorMessage('Canvas element not available');
      setStatus('error');
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      setErrorMessage('Failed to obtain 2D rendering context');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);
    setLoadingProgress(5);
    setLoadingStage('Connecting to asset host...');
    setCurrentFile('assets/doom.wasm');
    addLog('[Engine] Starting DOOM loader sequence...');
    stopLoop();

    try {
      const response = await fetch('/assets/doom.wasm');
      if (!response.ok) {
        throw new Error(`Failed to load doom.wasm: HTTP ${response.status}`);
      }

      const totalExpected = +(response.headers.get('content-length') || 4559928);
      const reader = response.body?.getReader();
      let wasmBytes: ArrayBuffer;

      if (reader) {
        const chunks: Uint8Array[] = [];
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          const pct = Math.min(55, Math.round(5 + (received / totalExpected) * 50));
          setLoadingProgress(pct);
          setLoadingStage(
            `Downloading WebAssembly runtime (${(received / 1024 / 1024).toFixed(1)} / ${(totalExpected / 1024 / 1024).toFixed(1)} MB)...`
          );
        }
        const fullBytes = new Uint8Array(received);
        let offset = 0;
        for (const chunk of chunks) {
          fullBytes.set(chunk, offset);
          offset += chunk.length;
        }
        wasmBytes = fullBytes.buffer;
      } else {
        wasmBytes = await response.arrayBuffer();
        setLoadingProgress(55);
      }

      setLoadingStage('Extracting DOOM1.WAD shareware assets & sound tables...');
      setCurrentFile('doom1.wad');
      setLoadingProgress(70);
      await new Promise((r) => setTimeout(r, 200));

      setLoadingStage('Compiling WebAssembly Reactor module...');
      setCurrentFile('assets/doom.wasm');
      setLoadingProgress(85);
      await new Promise((r) => setTimeout(r, 150));

      const imports = {
        loading: {
          onGameInit: (width: number, height: number) => {
            canvas.width = width;
            canvas.height = height;
            scratchImageRef.current = ctx.createImageData(width, height);
            setStats((prev) => ({ ...prev, width, height }));
            addLog(`[Engine] Initialized viewport: ${width}x${height}`);
          },
          wadSizes: (numWadsPtr: number, totalBytesPtr: number) => {
            const wad = customWadRef.current;
            if (wad && memoryRef.current) {
              const view = new DataView(memoryRef.current.buffer);
              view.setInt32(numWadsPtr, 1, true);
              view.setUint32(totalBytesPtr, wad.data.byteLength, true);
              addLog(`[Engine] Loading custom WAD: ${wad.name} (${(wad.data.byteLength / 1024).toFixed(1)} KB)`);
            }
          },
          readWads: (wadDataDestPtr: number, byteLengthOfEachWadPtr: number) => {
            const wad = customWadRef.current;
            if (wad && memoryRef.current) {
              const mem8 = new Uint8Array(memoryRef.current.buffer);
              const view = new DataView(memoryRef.current.buffer);
              mem8.set(new Uint8Array(wad.data), wadDataDestPtr);
              view.setInt32(byteLengthOfEachWadPtr, wad.data.byteLength, true);
              addLog(`[Engine] Custom WAD copied to memory.`);
            }
          },
        },
        ui: {
          drawFrame: (indexOfFrameBuffer: number) => {
            const memory = memoryRef.current;
            const scratch = scratchImageRef.current;
            if (!memory || !scratch) return;

            const totalPixels = canvas.width * canvas.height;
            const src32 = new Uint32Array(memory.buffer, indexOfFrameBuffer, totalPixels);
            const dst32 = new Uint32Array(scratch.data.buffer);

            // Fast Little-Endian BGRA -> RGBA pixel transfer with full alpha
            for (let i = 0; i < totalPixels; i++) {
              const p = src32[i];
              dst32[i] = 0xff000000 | ((p & 0xff) << 16) | (p & 0x00ff00) | ((p >> 16) & 0xff);
            }

            ctx.putImageData(scratch, 0, 0);

            // Calculate FPS
            fpsFrameCountRef.current++;
            const now = performance.now();
            if (now - lastFpsTimeRef.current >= 1000) {
              const currentFps = Math.round((fpsFrameCountRef.current * 1000) / (now - lastFpsTimeRef.current));
              setStats((prev) => ({
                ...prev,
                fps: currentFps,
                ticks: totalTicksRef.current,
              }));
              fpsFrameCountRef.current = 0;
              lastFpsTimeRef.current = now;
            }
          },
        },
        runtimeControl: {
          timeInMilliseconds: () => BigInt(Math.trunc(performance.now())),
        },
        console: {
          onInfoMessage: (messagePtr: number, length: number) => {
            if (memoryRef.current) {
              const msg = readUtf8(memoryRef.current, messagePtr, length);
              if (msg.trim()) {
                console.log(`[Doom stdout] ${msg}`);
                addLog(`[Doom] ${msg.trim()}`);
              }
            }
          },
          onErrorMessage: (messagePtr: number, length: number) => {
            if (memoryRef.current) {
              const msg = readUtf8(memoryRef.current, messagePtr, length);
              if (msg.trim()) {
                console.error(`[Doom stderr] ${msg}`);
                addLog(`[Doom Err] ${msg.trim()}`);
              }
            }
          },
        },
        gameSaving: {
          sizeOfSaveGame: (gameSaveId: number) => {
            try {
              const saved = localStorage.getItem(`doom_save_${gameSaveId}`);
              if (!saved) return 0;
              const byteLen = window.atob(saved).length;
              return byteLen;
            } catch {
              return 0;
            }
          },
          readSaveGame: (gameSaveId: number, dataDestinationPtr: number) => {
            try {
              const saved = localStorage.getItem(`doom_save_${gameSaveId}`);
              if (!saved || !memoryRef.current) return 0;
              const binaryString = window.atob(saved);
              const mem8 = new Uint8Array(memoryRef.current.buffer);
              for (let i = 0; i < binaryString.length; i++) {
                mem8[dataDestinationPtr + i] = binaryString.charCodeAt(i);
              }
              addLog(`[Save] Loaded save game from slot ${gameSaveId}`);
              return binaryString.length;
            } catch {
              return 0;
            }
          },
          writeSaveGame: (gameSaveId: number, dataPtr: number, length: number) => {
            try {
              if (!memoryRef.current) return 0;
              const mem8 = new Uint8Array(memoryRef.current.buffer);
              const bytes = mem8.subarray(dataPtr, dataPtr + length);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              localStorage.setItem(`doom_save_${gameSaveId}`, window.btoa(binary));
              localStorage.setItem(`doom_save_${gameSaveId}_date`, new Date().toISOString());
              addLog(`[Save] Game saved successfully in slot ${gameSaveId} (${length} bytes)`);
              return length;
            } catch (err) {
              console.error('Failed to write save game', err);
              return 0;
            }
          },
        },
      };

      const { instance } = await WebAssembly.instantiate(wasmBytes, imports);
      const exports = instance.exports as unknown as DoomExports;

      exportsRef.current = exports;
      memoryRef.current = exports.memory;

      // Set up key code map
      const km = new Map<string, number>();
      km.set('ArrowLeft', getGlobalValue(exports.KEY_LEFTARROW));
      km.set('ArrowRight', getGlobalValue(exports.KEY_RIGHTARROW));
      km.set('ArrowUp', getGlobalValue(exports.KEY_UPARROW));
      km.set('ArrowDown', getGlobalValue(exports.KEY_DOWNARROW));
      // WASD bindings
      km.set('w', getGlobalValue(exports.KEY_UPARROW));
      km.set('W', getGlobalValue(exports.KEY_UPARROW));
      km.set('s', getGlobalValue(exports.KEY_DOWNARROW));
      km.set('S', getGlobalValue(exports.KEY_DOWNARROW));
      km.set('a', getGlobalValue(exports.KEY_STRAFE_L));
      km.set('A', getGlobalValue(exports.KEY_STRAFE_L));
      km.set('d', getGlobalValue(exports.KEY_STRAFE_R));
      km.set('D', getGlobalValue(exports.KEY_STRAFE_R));

      km.set(',', getGlobalValue(exports.KEY_STRAFE_L));
      km.set('.', getGlobalValue(exports.KEY_STRAFE_R));
      km.set('Control', getGlobalValue(exports.KEY_FIRE));
      km.set(' ', getGlobalValue(exports.KEY_USE));
      km.set('Shift', getGlobalValue(exports.KEY_SHIFT));
      km.set('Tab', getGlobalValue(exports.KEY_TAB));
      km.set('Escape', getGlobalValue(exports.KEY_ESCAPE));
      km.set('Enter', getGlobalValue(exports.KEY_ENTER));
      km.set('Backspace', getGlobalValue(exports.KEY_BACKSPACE));
      km.set('Alt', getGlobalValue(exports.KEY_ALT));

      keyMapRef.current = km;

      setLoadingStage('Initializing engine viewport & registers...');
      setLoadingProgress(95);
      await new Promise((r) => setTimeout(r, 120));

      // Initialize game
      exports.initGame();

      setLoadingStage('Starting DOOM engine...');
      setLoadingProgress(100);
      await new Promise((r) => setTimeout(r, 220));

      setStatus('running');
      setIsInitialized(true);
      setStats((prev) => ({
        ...prev,
        loadedWad: customWadRef.current?.name ?? 'DOOM1.WAD (Shareware)',
      }));
      addLog(`[Engine] Game started with FPS limit: ${fpsLimitRef.current === 0 ? 'Unlocked (RAF)' : fpsLimitRef.current}`);

      startLoop();
    } catch (err) {
      console.error('Doom initialization failed:', err);
      const errStr = err instanceof Error ? err.message : String(err);
      setErrorMessage(errStr);
      setStatus('error');
      addLog(`[Engine Error] ${errStr}`);
    }
  }, [canvasRef, addLog, startLoop, stopLoop, isInitialized]);

  // Handle keyboard events on window
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't capture when typing in inputs
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (status !== 'running' && status !== 'paused') return;

      const exports = exportsRef.current;
      if (!exports) return;

      let doomKey: number | null = null;
      if (keyMapRef.current.has(e.key)) {
        doomKey = keyMapRef.current.get(e.key)!;
      } else if (e.key.length === 1) {
        doomKey = e.key.charCodeAt(0);
      }

      if (doomKey !== null) {
        e.preventDefault();
        e.stopPropagation();
        exports.reportKeyDown(doomKey);

        if (e.key === 'Control') {
          soundEngine.playGunShot();
        } else if (e.key === ' ') {
          soundEngine.playSwitch();
        }
      }
    },
    [status]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (status !== 'running' && status !== 'paused') return;

      const exports = exportsRef.current;
      if (!exports) return;

      let doomKey: number | null = null;
      if (keyMapRef.current.has(e.key)) {
        doomKey = keyMapRef.current.get(e.key)!;
      } else if (e.key.length === 1) {
        doomKey = e.key.charCodeAt(0);
      }

      if (doomKey !== null) {
        e.preventDefault();
        e.stopPropagation();
        exports.reportKeyUp(doomKey);
      }
    },
    [status]
  );

  // Pause / Resume toggle
  const togglePause = useCallback(() => {
    isPausedRef.current = !isPausedRef.current;
    setStatus(isPausedRef.current ? 'paused' : 'running');
    addLog(isPausedRef.current ? '[Engine] Game paused.' : '[Engine] Game resumed.');
  }, [addLog]);

  // Restart engine
  const restartEngine = useCallback(async () => {
    setIsInitialized(false);
    await startEngine();
  }, [startEngine]);

  // Load custom WAD
  const loadCustomWad = useCallback(
    async (wad: CustomWad | null) => {
      setCustomWad(wad);
      customWadRef.current = wad;
      setIsInitialized(false);
      await startEngine();
    },
    [startEngine]
  );

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      stopLoop();
    };
  }, [stopLoop]);

  // Attach global keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    status,
    errorMessage,
    stats,
    logs,
    customWad,
    fpsLimit,
    setFpsLimit,
    loadingProgress,
    loadingStage,
    currentFile,
    isInitialized,
    startEngine,
    togglePause,
    restartEngine,
    loadCustomWad,
    sendKeyDown,
    sendKeyUp,
    exports: exportsRef.current,
    keyMap: keyMapRef.current,
  };
}
