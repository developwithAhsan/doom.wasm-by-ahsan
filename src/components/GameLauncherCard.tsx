import React, { useState } from 'react';
import { Share2, Maximize, Check } from 'lucide-react';
import { GameStatus } from '../types';

interface GameLauncherCardProps {
  status: GameStatus;
  fpsLimit: number;
  onChangeFpsLimit: (val: number) => void;
  onStartOrResumeGame: () => void;
  onOpenSaveManager: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const GameLauncherCard: React.FC<GameLauncherCardProps> = ({
  status,
  fpsLimit,
  onChangeFpsLimit,
  onStartOrResumeGame,
  onOpenSaveManager,
  onToggleFullscreen,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Doom WebAssembly',
      text: 'Play original DOOM directly in your browser with WebAssembly!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      id="doom-launcher-card"
      className="w-full max-w-2xl bg-[#141c28] border border-[#232e42] p-5 sm:p-6 text-[#7d91a9] shadow-2xl select-none"
    >
      {/* Action Button 1: PLAY GAME / RESUME GAME */}
      <button
        id="launcher-start-game-btn"
        type="button"
        onClick={onStartOrResumeGame}
        className="w-full py-3.5 px-4 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] text-white font-bold tracking-widest text-xs uppercase border border-[#2b3a52] transition-colors cursor-pointer text-center"
      >
        {status === 'paused' ? 'RESUME GAME' : 'PLAY GAME'}
      </button>

      {/* Action Button 2: SAVE MANAGER */}
      <button
        id="launcher-save-manager-btn"
        type="button"
        onClick={onOpenSaveManager}
        className="w-full mt-2.5 py-3 px-4 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] text-white font-bold tracking-widest text-xs uppercase border border-[#2b3a52] transition-colors cursor-pointer text-center"
      >
        SAVE MANAGER
      </button>

      {/* Divider */}
      <div className="border-t border-[#202c3f] my-4" />

      {/* Option Row: FPS LIMIT */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-[#7d91a9] uppercase">
          FPS LIMIT:
        </span>
        <div className="flex items-center gap-1.5">
          <input
            id="launcher-fps-input"
            type="number"
            min="0"
            max="144"
            value={fpsLimit}
            onChange={(e) => onChangeFpsLimit(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-16 py-1 bg-[#0e141f] border border-[#27374e] text-white font-bold text-xs text-center rounded-xs focus:outline-none focus:border-[#425d85]"
          />
        </div>
      </div>

      {/* Note Description */}
      <div className="mt-3 text-xs leading-relaxed text-[#7d91a9] space-y-2">
        <p>
          <strong className="text-zinc-200">Note:</strong> Frame rate is unlocked (0) for best
          performance on modern hardware. However, the original game was designed for 35 FPS. Unlocked
          framerates may cause weird physics bugs.
        </p>
        <p>
          If you get stuck on a mission due to physics, or if you are playing on a low-end or mobile
          device that is overheating, change the limit above to 35.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#202c3f] my-4" />

      {/* Bottom Row: Share & Fullscreen */}
      <div className="grid grid-cols-2 gap-3">
        <button
          id="launcher-share-btn"
          type="button"
          onClick={handleShare}
          className="w-full py-2.5 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] text-[#9bb0c9] hover:text-white font-semibold text-xs border border-[#2b3a52] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 rotate-90" />
              <span>Share</span>
            </>
          )}
        </button>

        <button
          id="launcher-fullscreen-btn"
          type="button"
          onClick={onToggleFullscreen}
          className="w-full py-2.5 bg-[#1a2536] hover:bg-[#233147] active:bg-[#16202e] text-[#9bb0c9] hover:text-white font-semibold text-xs border border-[#2b3a52] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>
      </div>
    </div>
  );
};
