import React from 'react';
import { ArrowLeft, Maximize2, Minimize2, Gauge } from 'lucide-react';

interface InGameHudProps {
  fps: number;
  fpsLimit: number;
  isFullscreen: boolean;
  onExitToMenu: () => void;
  onToggleFullscreen: () => void;
  onCycleFpsLimit: () => void;
}

export const InGameHud: React.FC<InGameHudProps> = ({
  fps,
  fpsLimit,
  isFullscreen,
  onExitToMenu,
  onToggleFullscreen,
  onCycleFpsLimit,
}) => {
  return (
    <header
      id="doom-ingame-hud"
      className="w-full flex items-center justify-between py-2 px-3 bg-[#141c28] border border-[#232e42] border-b-0 text-xs font-mono text-[#7d91a9] select-none"
    >
      {/* Left: Back to Menu */}
      <button
        id="hud-back-to-menu-btn"
        type="button"
        onClick={onExitToMenu}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] border border-[#2b3a52] text-white font-sans font-bold text-xs uppercase cursor-pointer transition-colors"
        title="Return to Game Launcher"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Menu</span>
      </button>

      {/* Right: Only FPS button and Full Screen button */}
      <div className="flex items-center gap-2">
        {/* FPS Button */}
        <button
          id="hud-fps-btn"
          type="button"
          onClick={onCycleFpsLimit}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0e141f] hover:bg-[#162130] border border-[#27374e] text-[#9bb0c9] hover:text-white font-mono text-xs font-semibold cursor-pointer transition-colors"
          title={`Framerate: ${fps} FPS. Click to change limit (${fpsLimit === 0 ? 'Unlocked' : `${fpsLimit} FPS`})`}
        >
          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          <span>{fps} FPS</span>
          <span className="text-[10px] text-[#556982] hidden sm:inline">
            ({fpsLimit === 0 ? 'Unlocked' : `${fpsLimit}`})
          </span>
        </button>

        {/* Full Screen Button */}
        <button
          id="hud-fullscreen-btn"
          type="button"
          onClick={onToggleFullscreen}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] border border-[#2b3a52] text-white font-sans font-bold text-xs uppercase cursor-pointer transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>
      </div>
    </header>
  );
};
