import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress: number;
  stageLabel: string;
  currentFile?: string;
}

const TIPS = [
  'Tip: Use WASD or Arrow Keys to move your Marine around the Phobos facility.',
  'Tip: Press Spacebar to open doors, access secret chambers, and activate switches.',
  'Tip: Hold Shift while moving to run faster and outmaneuver demon fireballs.',
  'Tip: Press 1-7 to switch between unlocked weapons, from the shotgun to the BFG9000.',
  'Tip: Press Esc at any time to open the menu and save your progress into local storage.',
  'Tip: Frame rate is unlocked for maximum smoothness, or can be capped in the settings.',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  stageLabel,
  currentFile = 'assets/doom.wasm',
}) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="setup-progress"
      className="fixed inset-0 z-50 bg-[#0e1520] flex flex-col items-center justify-center p-6 select-none"
      role="status"
      aria-label="Loading game files"
    >
      {/* Title */}
      <h2
        id="setup-progress-title"
        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase text-center font-sans"
      >
        LOADING...
      </h2>

      {/* Progress Bar Container */}
      <div
        className="w-[min(420px,85vw)] h-5 border border-[#3a5070] bg-transparent relative overflow-hidden mt-5"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          id="setup-progress-bar"
          className="h-full bg-[#c8d8e8] transition-all duration-200 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
        <div className="ls-bar-shimmer absolute inset-0" />
      </div>

      {/* Percentage */}
      <p
        id="setup-progress-percent"
        className="text-sm font-semibold tracking-wider text-[#c8d8e8] mt-2 font-mono tabular-nums"
      >
        {Math.round(progress)}%
      </p>

      {/* Status Stage Label */}
      <p
        id="setup-progress-label"
        className="text-xs text-[#5a7090] text-center max-w-md min-h-[1.4em] font-mono mt-0.5"
      >
        {stageLabel}
      </p>

      {/* File Info */}
      <p
        id="setup-progress-file"
        className="text-[11px] text-[#3a5068] text-center max-w-md truncate font-mono mt-0.5"
      >
        {currentFile}
      </p>

      {/* Rotating Tips */}
      <p
        id="setup-progress-tip"
        className="text-xs text-[#7890a8] text-center max-w-md mt-6 leading-relaxed min-h-[2.5em] transition-opacity duration-300"
      >
        {TIPS[tipIndex]}
      </p>
    </div>
  );
};
