import React, { useRef, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';

interface EngineConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: string[];
}

export const EngineConsoleModal: React.FC<EngineConsoleModalProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="doom-console-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="doom-console-modal"
        className="w-full max-w-2xl bg-[#141c28] border border-[#232e42] shadow-2xl p-6 relative flex flex-col h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#202c3f]">
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal className="w-5 h-5" />
            <h2 className="font-bold text-base text-zinc-100 uppercase tracking-wider">
              ENGINE CONSOLE & TELEMETRY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 mt-4 p-4 bg-black/90 rounded-lg border border-zinc-900 font-mono text-xs overflow-y-auto space-y-1 select-text"
        >
          {logs.length === 0 ? (
            <div className="text-zinc-600 italic">No output received yet...</div>
          ) : (
            logs.map((log, index) => {
              const isErr = log.includes('[Doom Err]') || log.includes('Error');
              const isEngine = log.includes('[Engine]');
              const isSave = log.includes('[Save]');

              return (
                <div
                  key={index}
                  className={`leading-relaxed break-all ${
                    isErr
                      ? 'text-red-400'
                      : isSave
                      ? 'text-amber-400'
                      : isEngine
                      ? 'text-blue-400'
                      : 'text-zinc-300'
                  }`}
                >
                  {log}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
          <div className="text-[11px] font-mono text-zinc-500">
            Capturing stdout & stderr from WebAssembly instance
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold rounded-md cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
