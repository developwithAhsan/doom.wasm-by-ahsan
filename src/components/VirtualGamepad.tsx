import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Hand,
  FastForward,
  CornerDownLeft,
} from 'lucide-react';
import { DoomExports } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface VirtualGamepadProps {
  exports: DoomExports | null;
  keyMap: Map<string, number>;
  onKeyDown: (key: number) => void;
  onKeyUp: (key: number) => void;
}

export const VirtualGamepad: React.FC<VirtualGamepadProps> = ({
  exports,
  keyMap,
  onKeyDown,
  onKeyUp,
}) => {
  if (!exports) return null;

  const handlePressStart = (keyIdentifier: string, isFire: boolean = false, isUse: boolean = false) => {
    let doomKey: number | undefined;
    if (keyMap.has(keyIdentifier)) {
      doomKey = keyMap.get(keyIdentifier);
    } else if (keyIdentifier.length === 1) {
      doomKey = keyIdentifier.charCodeAt(0);
    }

    if (doomKey !== undefined) {
      onKeyDown(doomKey);
      if (isFire) soundEngine.playGunShot();
      if (isUse) soundEngine.playSwitch();
    }
  };

  const handlePressEnd = (keyIdentifier: string) => {
    let doomKey: number | undefined;
    if (keyMap.has(keyIdentifier)) {
      doomKey = keyMap.get(keyIdentifier);
    } else if (keyIdentifier.length === 1) {
      doomKey = keyIdentifier.charCodeAt(0);
    }

    if (doomKey !== undefined) {
      onKeyUp(doomKey);
    }
  };

  return (
    <div
      id="doom-virtual-gamepad"
      className="w-full max-w-5xl mx-auto mt-3 p-4 bg-[#141c28] border border-[#232e42] select-none shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left: Directional & Strafe Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Movement</div>
          <div className="relative w-44 h-44 bg-zinc-950/80 rounded-full border border-zinc-800 p-2 flex items-center justify-center shadow-inner">
            {/* UP */}
            <button
              id="gamepad-btn-up"
              type="button"
              onPointerDown={() => handlePressStart('ArrowUp')}
              onPointerUp={() => handlePressEnd('ArrowUp')}
              onPointerLeave={() => handlePressEnd('ArrowUp')}
              className="absolute top-2 w-12 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-red-600 active:scale-95 text-zinc-200 rounded-lg flex items-center justify-center border border-zinc-700 shadow-md cursor-pointer transition-transform"
              aria-label="Move Forward"
            >
              <ChevronUp className="w-6 h-6" />
            </button>

            {/* DOWN */}
            <button
              id="gamepad-btn-down"
              type="button"
              onPointerDown={() => handlePressStart('ArrowDown')}
              onPointerUp={() => handlePressEnd('ArrowDown')}
              onPointerLeave={() => handlePressEnd('ArrowDown')}
              className="absolute bottom-2 w-12 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-red-600 active:scale-95 text-zinc-200 rounded-lg flex items-center justify-center border border-zinc-700 shadow-md cursor-pointer transition-transform"
              aria-label="Move Backward"
            >
              <ChevronDown className="w-6 h-6" />
            </button>

            {/* TURN LEFT */}
            <button
              id="gamepad-btn-left"
              type="button"
              onPointerDown={() => handlePressStart('ArrowLeft')}
              onPointerUp={() => handlePressEnd('ArrowLeft')}
              onPointerLeave={() => handlePressEnd('ArrowLeft')}
              className="absolute left-2 w-12 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-red-600 active:scale-95 text-zinc-200 rounded-lg flex items-center justify-center border border-zinc-700 shadow-md cursor-pointer transition-transform"
              aria-label="Turn Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* TURN RIGHT */}
            <button
              id="gamepad-btn-right"
              type="button"
              onPointerDown={() => handlePressStart('ArrowRight')}
              onPointerUp={() => handlePressEnd('ArrowRight')}
              onPointerLeave={() => handlePressEnd('ArrowRight')}
              className="absolute right-2 w-12 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-red-600 active:scale-95 text-zinc-200 rounded-lg flex items-center justify-center border border-zinc-700 shadow-md cursor-pointer transition-transform"
              aria-label="Turn Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Center Strafe L / R toggles */}
            <div className="flex gap-1.5 z-10">
              <button
                id="gamepad-btn-strafe-l"
                type="button"
                onPointerDown={() => handlePressStart(',')}
                onPointerUp={() => handlePressEnd(',')}
                onPointerLeave={() => handlePressEnd(',')}
                className="w-8 h-8 bg-zinc-900 active:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded text-[10px] font-mono font-bold border border-zinc-700 flex items-center justify-center cursor-pointer"
                title="Strafe Left (, or A)"
              >
                ST-L
              </button>
              <button
                id="gamepad-btn-strafe-r"
                type="button"
                onPointerDown={() => handlePressStart('.')}
                onPointerUp={() => handlePressEnd('.')}
                onPointerLeave={() => handlePressEnd('.')}
                className="w-8 h-8 bg-zinc-900 active:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded text-[10px] font-mono font-bold border border-zinc-700 flex items-center justify-center cursor-pointer"
                title="Strafe Right (. or D)"
              >
                ST-R
              </button>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Combat & Action</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* FIRE BUTTON */}
            <button
              id="gamepad-btn-fire"
              type="button"
              onPointerDown={() => handlePressStart('Control', true, false)}
              onPointerUp={() => handlePressEnd('Control')}
              onPointerLeave={() => handlePressEnd('Control')}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 active:scale-95 text-white font-mono font-black text-sm flex flex-col items-center justify-center gap-1 shadow-lg shadow-red-950/50 border border-red-500/40 cursor-pointer transition-transform"
            >
              <Crosshair className="w-6 h-6" />
              <span>FIRE</span>
            </button>

            {/* USE (DOOR/SWITCH) BUTTON */}
            <button
              id="gamepad-btn-use"
              type="button"
              onPointerDown={() => handlePressStart(' ', false, true)}
              onPointerUp={() => handlePressEnd(' ')}
              onPointerLeave={() => handlePressEnd(' ')}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 active:scale-95 text-white font-mono font-black text-sm flex flex-col items-center justify-center gap-1 shadow-lg shadow-amber-950/50 border border-amber-500/40 cursor-pointer transition-transform"
            >
              <Hand className="w-6 h-6" />
              <span>USE</span>
            </button>

            {/* RUN / SPRINT */}
            <button
              id="gamepad-btn-run"
              type="button"
              onPointerDown={() => handlePressStart('Shift')}
              onPointerUp={() => handlePressEnd('Shift')}
              onPointerLeave={() => handlePressEnd('Shift')}
              className="w-16 h-16 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 font-mono text-xs font-bold flex flex-col items-center justify-center gap-1 border border-zinc-700 cursor-pointer transition-transform"
            >
              <FastForward className="w-5 h-5" />
              <span>RUN</span>
            </button>

            {/* ESC (MENU) */}
            <button
              id="gamepad-btn-esc"
              type="button"
              onPointerDown={() => handlePressStart('Escape')}
              onPointerUp={() => handlePressEnd('Escape')}
              onPointerLeave={() => handlePressEnd('Escape')}
              className="w-16 h-16 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 font-mono text-xs font-bold flex flex-col items-center justify-center gap-1 border border-zinc-700 cursor-pointer transition-transform"
            >
              <span className="text-sm font-bold">ESC</span>
              <span className="text-[10px] text-zinc-400">MENU</span>
            </button>

            {/* ENTER (SELECT) */}
            <button
              id="gamepad-btn-enter"
              type="button"
              onPointerDown={() => handlePressStart('Enter')}
              onPointerUp={() => handlePressEnd('Enter')}
              onPointerLeave={() => handlePressEnd('Enter')}
              className="w-16 h-16 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 font-mono text-xs font-bold flex flex-col items-center justify-center gap-1 border border-zinc-700 cursor-pointer transition-transform"
            >
              <CornerDownLeft className="w-5 h-5" />
              <span className="text-[10px] text-zinc-400">ENTER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
