import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, HardDrive } from 'lucide-react';
import { SaveSlotInfo } from '../types';

interface SavesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavesModal: React.FC<SavesModalProps> = ({ isOpen, onClose }) => {
  const [saveSlots, setSaveSlots] = useState<SaveSlotInfo[]>([]);

  const loadSlots = () => {
    const slots: SaveSlotInfo[] = [];
    for (let i = 0; i < 6; i++) {
      const data = localStorage.getItem(`doom_save_${i}`);
      const date = localStorage.getItem(`doom_save_${i}_date`);
      if (data) {
        slots.push({
          slot: i + 1,
          date: date ? new Date(date).toLocaleString() : 'Saved Game',
          size: window.atob(data).length,
        });
      }
    }
    setSaveSlots(slots);
  };

  useEffect(() => {
    if (isOpen) {
      loadSlots();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDeleteSlot = (slotIdx: number) => {
    const saveId = slotIdx - 1;
    localStorage.removeItem(`doom_save_${saveId}`);
    localStorage.removeItem(`doom_save_${saveId}_date`);
    loadSlots();
  };

  return (
    <div
      id="doom-saves-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="doom-saves-modal"
        className="w-full max-w-lg bg-[#141c28] border border-[#232e42] shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#202c3f]">
          <div className="flex items-center gap-2 text-cyan-400">
            <HardDrive className="w-5 h-5" />
            <h2 className="font-bold text-base text-zinc-100 uppercase tracking-wider">SAVED GAMES</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-xs text-zinc-400 font-mono">
            Saved games are created directly inside the game by pressing <kbd className="text-amber-400 font-bold">ESC</kbd> &rarr; <span className="text-zinc-200">Save Game</span>. Data is securely kept in your browser storage.
          </p>

          {saveSlots.length === 0 ? (
            <div className="py-8 text-center bg-zinc-950/60 rounded-lg border border-zinc-800">
              <Save className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <div className="text-sm font-mono text-zinc-400">No saved games found</div>
              <div className="text-xs text-zinc-500 font-mono mt-1">
                Press ESC during gameplay and select "Save Game" to save your progress.
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {saveSlots.map((slot) => (
                <div
                  key={slot.slot}
                  className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800"
                >
                  <div className="font-mono">
                    <div className="text-sm font-bold text-zinc-200">
                      Slot {slot.slot}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {slot.date} &bull; {(slot.size / 1024).toFixed(1)} KB
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteSlot(slot.slot)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded cursor-pointer transition-colors"
                    title="Delete Save Slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold rounded-md cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
