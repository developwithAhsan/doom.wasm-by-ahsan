import React, { useRef, useState } from 'react';
import { X, Upload, FileCode, CheckCircle2, RotateCcw } from 'lucide-react';
import { CustomWad } from '../types';

interface WadLoaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  customWad: CustomWad | null;
  onLoadWad: (wad: CustomWad | null) => void;
}

export const WadLoaderModal: React.FC<WadLoaderModalProps> = ({
  isOpen,
  onClose,
  customWad,
  onLoadWad,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const processFile = async (file: File) => {
    setLoadError(null);
    if (!file.name.toLowerCase().endsWith('.wad')) {
      setLoadError('Please select a file with .wad extension (e.g., DOOM2.WAD, FREEDOOM.WAD)');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      // Basic WAD header check: first 4 bytes should be IWAD or PWAD
      const headerBytes = new Uint8Array(buffer, 0, 4);
      const headerStr = String.fromCharCode(...headerBytes);
      if (headerStr !== 'IWAD' && headerStr !== 'PWAD') {
        setLoadError(`Invalid WAD header ("${headerStr}"). Valid Doom WAD files begin with 'IWAD' or 'PWAD'.`);
        return;
      }

      onLoadWad({
        name: file.name,
        data: buffer,
        size: buffer.byteLength,
      });
      onClose();
    } catch (err) {
      setLoadError('Failed to read WAD file: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      id="doom-wad-loader-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="doom-wad-loader-modal"
        className="w-full max-w-lg bg-[#141c28] border border-[#232e42] shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#202c3f]">
          <div className="flex items-center gap-2 text-amber-500">
            <Upload className="w-5 h-5" />
            <h2 className="font-bold text-base text-zinc-100 uppercase tracking-wider">CUSTOM WAD LOADER</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs text-zinc-400 font-mono">
            Load custom Doom I/II IWADs or PWADs into the WebAssembly memory. By default, the engine loads the embedded original Doom 1 Shareware WAD (DOOM1.WAD).
          </p>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center ${
              dragActive
                ? 'border-amber-500 bg-amber-950/20'
                : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".wad"
              onChange={handleFileChange}
              className="hidden"
            />
            <FileCode className="w-10 h-10 text-amber-400 mb-3" />
            <span className="font-mono text-sm font-semibold text-zinc-200">
              Drag & Drop your .WAD file here
            </span>
            <span className="font-mono text-xs text-zinc-500 mt-1">or click to browse your files</span>
          </div>

          {loadError && (
            <div className="p-3 bg-red-950/50 border border-red-800 rounded-md text-red-300 text-xs font-mono">
              {loadError}
            </div>
          )}

          {/* Current Status */}
          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="text-xs font-mono">
                <span className="text-zinc-500">Active WAD: </span>
                <span className="text-zinc-200 font-bold">
                  {customWad ? customWad.name : 'DOOM1.WAD (Shareware)'}
                </span>
                {customWad && (
                  <span className="text-zinc-500 ml-2">
                    ({(customWad.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                )}
              </div>
            </div>

            {customWad && (
              <button
                onClick={() => {
                  onLoadWad(null);
                  onClose();
                }}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset to default shareware WAD"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-bold rounded-md cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
