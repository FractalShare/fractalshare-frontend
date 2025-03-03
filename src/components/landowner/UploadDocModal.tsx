'use client';

import { useRef, useState } from 'react';
import { FiX, FiPlus, FiFileText, FiTrash2 } from 'react-icons/fi';

interface UploadDocModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
}

export default function UploadDocModal({
  open,
  onClose,
  onUpload,
}: UploadDocModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* helpers */
  const browse   = () => inputRef.current?.click();
  const addFile  = (f: File | null) => f && setFile(f);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addFile(e.dataTransfer.files[0] ?? null);
  };
  const handleUpload = () => {
    onUpload(file);     // send file back to QuestionTwo
    setFile(null);      // reset local state
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex w-[420px] max-h-[90vh] flex-col rounded-xl bg-white shadow-xl">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-6">
            <button onClick={onClose}>
              <FiX />
            </button>
            <div className="flex-1 text-center text-sm font-medium">
              Upload document
              <div className="text-xs font-normal text-gray-500">
                {file ? '1 selected' : 'No item selected'}
              </div>
            </div>
            <button
              onClick={browse}
              disabled={!!file}
              className="rounded-full border p-1.5 hover:bg-gray-100 disabled:opacity-40"
            >
              <FiPlus size={14} />
            </button>
          </div>

          {/* body */}
          <div
            className="flex-1 overflow-y-auto p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-between rounded border p-3 text-sm">
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-2
                           rounded-lg border-2 border-dashed border-gray-300
                           bg-gray-100 py-12 text-gray-600"
              >
                <FiFileText size={42} />
                <p className="mt-4 text-sm">Drag & drop</p>
                <p className="text-sm text-gray-500">or</p>
                <button
                  onClick={browse}
                  className="mt-2 rounded bg-[#1F4F36] px-4 py-1.5 text-sm font-medium text-white
                             transition hover:scale-105"
                >
                  Browse
                </button>
              </div>
            )}
          </div>

          {/* footer */}
          <div className="flex justify-between border-t px-4 py-6">
            <button
              onClick={onClose}
              className="text-sm font-medium text-[#1F4F36] hover:underline"
            >
              Done
            </button>
            <button
              onClick={handleUpload}
              disabled={!file}
              className={`rounded px-6 py-1.5 text-sm font-medium transition
                ${
                  !file
                    ? 'cursor-not-allowed bg-gray-300 text-white'
                    : 'bg-black text-white hover:scale-105'
                }`}
            >
              Upload
            </button>
          </div>

          {/* hidden input */}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={(e) => addFile(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>
    </>
  );
}
