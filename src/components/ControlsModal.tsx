import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlsModal: React.FC<ControlsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const controlGroups = [
    {
      title: 'Movement',
      items: [
        { key: '↑ or W', action: 'Move Forward' },
        { key: '↓ or S', action: 'Move Backward' },
        { key: '← / →', action: 'Turn Left / Right' },
        { key: ', / . or A / D', action: 'Strafe Left / Right' },
        { key: 'Shift (Hold)', action: 'Speed / Sprint' },
      ],
    },
    {
      title: 'Combat & Interaction',
      items: [
        { key: 'Ctrl or Left-Click', action: 'Fire Weapon' },
        { key: 'Spacebar', action: 'Use (Open doors, activate switches)' },
        { key: '1 - 7', action: 'Select Weapon (Fist/Chainsaw, Pistol, Shotgun, Chaingun, Rocket, Plasma, BFG)' },
      ],
    },
    {
      title: 'System & Navigation',
      items: [
        { key: 'Esc', action: 'Game Menu (Save, Load, Options, Sound)' },
        { key: 'Enter', action: 'Confirm Menu Selection' },
        { key: 'Tab', action: 'Toggle Automap' },
        { key: 'Backspace', action: 'Back / Cancel' },
      ],
    },
  ];

  return (
    <div
      id="doom-controls-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="doom-controls-modal"
        className="w-full max-w-xl bg-[#141c28] border border-[#232e42] shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#202c3f]">
          <div className="flex items-center gap-2 text-red-500">
            <Keyboard className="w-5 h-5" />
            <h2 className="font-bold text-base text-zinc-100 uppercase tracking-wider">DOOM CONTROLS GUIDE</h2>
          </div>
          <button
            id="close-controls-modal-btn"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5 max-h-[70vh] overflow-y-auto pr-2">
          {controlGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-2">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-3 bg-zinc-950/60 rounded-md border border-zinc-800/80 text-sm font-mono"
                  >
                    <span className="text-zinc-300">{item.action}</span>
                    <kbd className="px-2 py-0.5 bg-zinc-800 text-amber-400 font-bold rounded text-xs border border-zinc-700 shadow-inner">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-md cursor-pointer transition-colors"
          >
            Got it, Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};
