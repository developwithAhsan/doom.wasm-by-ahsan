import React, { useState } from 'react';
import { GameStatus } from '../types';
import { Play, Pause, AlertTriangle, Loader2 } from 'lucide-react';

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  status: GameStatus;
  errorMessage: string | null;
  onRestart: () => void;
  onTogglePause: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  canvasRef,
  status,
  errorMessage,
  onRestart,
  onTogglePause,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const handleCanvasFocus = () => {
    setIsFocused(true);
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  };

  return (
    <div
      id="doom-canvas-container"
      className="relative w-full aspect-[16/10] max-w-5xl mx-auto bg-[#090d13] border border-[#232e42] shadow-2xl flex items-center justify-center cursor-crosshair group overflow-hidden"
      onClick={handleCanvasFocus}
    >
      <canvas
        id="DoomGame"
        ref={canvasRef}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full h-full object-contain pixel-art outline-none transition-opacity duration-200"
        style={{ opacity: status === 'running' && isFocused ? 1 : 0.85 }}
      />

      {/* Loading Overlay */}
      {status === 'loading' && (
        <div
          id="doom-loading-overlay"
          className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20"
        >
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold tracking-wider text-red-500 uppercase font-mono">
            Booting Doom WebAssembly Engine
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md">
            Streaming WebAssembly binary, decoding shareware WAD resources, and setting up the 35 FPS rendering pipeline...
          </p>
        </div>
      )}

      {/* Error Overlay */}
      {status === 'error' && (
        <div
          id="doom-error-overlay"
          className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center p-6 text-center z-30"
        >
          <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
          <h3 className="text-lg font-bold text-red-400 font-mono">Failed to Initialize Doom</h3>
          <p className="text-sm text-zinc-400 mt-2 max-w-md font-mono bg-zinc-900/80 p-3 rounded-md border border-zinc-800 text-left">
            {errorMessage || 'Unknown WebAssembly runtime error'}
          </p>
          <button
            id="doom-retry-btn"
            onClick={onRestart}
            className="mt-5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-sm font-semibold rounded-md shadow-md transition-colors"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* Paused Overlay */}
      {status === 'paused' && (
        <div
          id="doom-paused-overlay"
          className="absolute inset-0 bg-black/65 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-10"
        >
          <div className="bg-zinc-900/90 border border-zinc-700 px-6 py-4 rounded-lg flex flex-col items-center shadow-2xl">
            <Pause className="w-8 h-8 text-amber-400 mb-2" />
            <h3 className="text-lg font-mono font-bold tracking-wider text-amber-400">GAME PAUSED</h3>
            <button
              id="doom-resume-btn"
              onClick={onTogglePause}
              className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> RESUME GAME
            </button>
          </div>
        </div>
      )}

      {/* Click to Focus Overlay (when unfocused) */}
      {status === 'running' && !isFocused && (
        <div
          id="doom-unfocused-banner"
          className="absolute bottom-3 inset-x-0 mx-auto w-fit px-4 py-1.5 bg-zinc-900/85 backdrop-blur-xs border border-zinc-700/80 rounded-full text-xs font-mono text-zinc-300 pointer-events-none shadow-lg"
        >
          Click screen to focus & capture controls
        </div>
      )}
    </div>
  );
};
