'use client';

import { useEffect, useRef, useState } from 'react';
import { FiX, FiPlus, FiImage } from 'react-icons/fi';
import Image from 'next/image';

interface UploadPhotoModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

/* helper type that carries the preview URL */
type Preview = { file: File; url: string };

const MAX_FILES = 5;

export default function UploadPhotoModal({
  open,
  onClose,
  onUpload,
}: UploadPhotoModalProps) {
  /* ---------- state ---------- */
  const [files, setFiles] = useState<Preview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------- helpers ---------- */
  const browse = () => inputRef.current?.click();

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const selection = Array.from(list).slice(0, MAX_FILES - files.length);
    const previews = selection.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...previews]);
  };

  const removeFile = (url: string) => {
    URL.revokeObjectURL(url);
    setFiles((prev) => prev.filter((p) => p.url !== url));
  };

  const handleUpload = () => {
    onUpload(files.map((p) => p.file));
    files.forEach(({ url }) => URL.revokeObjectURL(url));
    setFiles([]);
    onClose();
  };

  /* revoke every URL on unmount */
  useEffect(
    () => () => {
      files.forEach(({ url }) => URL.revokeObjectURL(url));
    },
    [files],
  );

  if (!open) return null;

  /* ---------- UI ---------- */
  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex w-[420px] max-h-[70vh] flex-col rounded-xl bg-white shadow-xl">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-6">
            <button onClick={onClose}>
              <FiX />
            </button>
            <div className="flex-1 text-center text-sm font-medium">
              Upload photos
              <div className="text-xs font-normal text-gray-500">
                {files.length === 0
                  ? 'No item selected'
                  : `${files.length} selected`}
              </div>
            </div>
            <button
              onClick={browse}
              disabled={files.length >= MAX_FILES}
              className="rounded-full border p-1.5 hover:bg-gray-100"
            >
              <FiPlus size={14} />
            </button>
          </div>

          {/* body */}
          <div
            className="flex-1 overflow-y-auto p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
          >
            {files.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-2
                           rounded-lg border-2 border-dashed border-gray-300
                           bg-gray-100 py-12 text-gray-600"
              >
                <FiImage size={42} />
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
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {files.map(({ file, url }) => (
                  <div key={url} className="relative">
                    <Image
                      width={200}
                      height={200}
                      src={url}
                      alt={file.name}
                      className="h-32 w-full rounded object-cover"
                    />
                    <button
                      onClick={() => removeFile(url)}
                      className="absolute right-1 top-1 rounded-full bg-white/80 p-1
                                 text-xs backdrop-blur hover:bg-white"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
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
              disabled={files.length === 0}
              className={`rounded px-6 py-1.5 text-sm font-medium transition
                ${
                  files.length === 0
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
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      </div>
    </>
  );
}
