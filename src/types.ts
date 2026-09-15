export interface DoomExports {
  initGame: () => void;
  tickGame: () => void;
  reportKeyDown: (doomKey: number) => void;
  reportKeyUp: (doomKey: number) => void;
  memory: WebAssembly.Memory;
  KEY_LEFTARROW: WebAssembly.Global;
  KEY_RIGHTARROW: WebAssembly.Global;
  KEY_UPARROW: WebAssembly.Global;
  KEY_DOWNARROW: WebAssembly.Global;
  KEY_STRAFE_L: WebAssembly.Global;
  KEY_STRAFE_R: WebAssembly.Global;
  KEY_FIRE: WebAssembly.Global;
  KEY_USE: WebAssembly.Global;
  KEY_SHIFT: WebAssembly.Global;
  KEY_TAB: WebAssembly.Global;
  KEY_ESCAPE: WebAssembly.Global;
  KEY_ENTER: WebAssembly.Global;
  KEY_BACKSPACE: WebAssembly.Global;
  KEY_ALT: WebAssembly.Global;
}

export type GameStatus = 'idle' | 'loading' | 'running' | 'paused' | 'error';

export interface CustomWad {
  name: string;
  data: ArrayBuffer;
  size: number;
}

export interface SaveSlotInfo {
  slot: number;
  date: string;
  size: number;
}

export interface EngineStats {
  fps: number;
  width: number;
  height: number;
  ticks: number;
  loadedWad: string;
}
