'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiPlus, FiMoreHorizontal, FiX } from 'react-icons/fi';
import UploadModal from '@/components/landowner/UploadPhotoModal';
import type { Answerable } from '@/types/QuestionContracts';

/* ------------------------------------------------------------------ */
/* local types                                                         */
type Photo = {
  id: string;
  file: File;
  url: string;
  tags: string[];
};

/* helpers */
const uuid = () => crypto.randomUUID();

/* ------------------------------------------------------------------ */
/* tag modal                                                           */
const TAG_OPTIONS = [
  'Main Entrance',
  'North Boundary',
  'South Boundary',
  'East Boundary',
  'West Boundary',
  'Access Road',
  'Interior/Open Field',
  'Water Feature',
  'Structure',
  'Driveway',
  'Custom Tag',
];

function TagModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (tag: string) => void;
}) {
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (!open) setSelected(undefined);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-[420px] rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between px-5 py-6">
            <button onClick={onClose}>
              <FiX />
            </button>
            <div className="flex-1 text-center text-sm font-semibold">
              Add tag
              <div className="text-xs font-normal text-gray-500">
                {selected ?? 'No tag selected'}
              </div>
            </div>
            <span className="opacity-0">
              <FiX />
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 px-6 pb-8">
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelected(tag);
                  onSelect(tag);
                  onClose();
                }}
                className={`rounded-full px-4 py-1.5 text-sm shadow-sm ${
                  selected === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* main component                                                      */
export default function QuestionOne({
  value,
  onAnswered,
}: Answerable<Photo[] | null>) {
  /* state */
  const [photos, setPhotos] = useState<Photo[]>(value ?? []);
  const [openUpload, setOpenUpload] = useState(false);
  const [taggingId, setTaggingId] = useState<string | null>(null);

  /* upload */
  const handleUpload = (files: File[]) => {
    const newPhotos: Photo[] = files.map((file) => ({
      id: uuid(),
      file,
      url: URL.createObjectURL(file),
      tags: [],
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  /* tagging */
  const addTagToPhoto = (id: string, tag: string) =>
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, tags: [tag] } : p)),
    );

  /* drag‑n‑drop */
  const dragSrc = useRef<string | null>(null);
  const onDragStart = (id: string) => (e: React.DragEvent) => {
    dragSrc.current = id;
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (id: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const srcId = dragSrc.current;
    if (!srcId || srcId === id) return;
    setPhotos((prev) => {
      const srcIdx = prev.findIndex((p) => p.id === srcId);
      const dstIdx = prev.findIndex((p) => p.id === id);
      if (srcIdx === -1 || dstIdx === -1) return prev;
      const reordered = [...prev];
      const [moved] = reordered.splice(srcIdx, 1);
      reordered.splice(dstIdx, 0, moved);
      return reordered;
    });
    dragSrc.current = null;
  };

  /* ---------- parent callback (no infinite loop) ---------- */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  const ready =
    photos.length >= 5 && photos.every((p) => p.tags.length > 0);

  useEffect(() => {
    cbRef.current?.(ready ? photos : null);
  }, [ready, photos]);

  /* cleanup URLs */
  useEffect(
    () => () => {
      photos.forEach(({ url }) => URL.revokeObjectURL(url));
    },
    [photos],
  );

  /* ------------------------- UI ---------------------------- */

  if (photos.length === 0) {
    return (
      <>
        <section className="mx-auto max-w-2xl px-4">
          <h2 className="mb-2 text-2xl font-extrabold">
            Add and tag your property photos
          </h2>
          <p className="mb-10 text-sm text-gray-600">
            You&rsquo;ll need 5 pictures to get started. You can add more or
            make changes later
          </p>

          <div
            className="relative mx-auto flex h-[300px] w-full max-w-2xl flex-col
                       items-center justify-center rounded-xl border border-gray-300
                       bg-gray-100 px-6 py-14"
            onClick={() => setOpenUpload(true)}
          >
            <Image
              src="/icons/camera.png"
              alt="Add photos"
              width={100}
              height={100}
              className="mb-14 h-[100px] w-[100px] object-contain"
            />
            <button className="rounded-md bg-white px-6 py-2 text-sm font-medium shadow transition hover:scale-105">
              Add photos
            </button>
          </div>
        </section>

        <UploadModal
          open={openUpload}
          onClose={() => setOpenUpload(false)}
          onUpload={handleUpload}
        />
      </>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-3xl px-4">
        <header className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-extrabold">Time to tag your photos</h2>
            <p className="text-sm text-gray-600">
              You&rsquo;ll need to tag at least 5 photos. Drag to reorder.
            </p>
          </div>

          <button
            onClick={() => setOpenUpload(true)}
            disabled={photos.length >= 5}
            className="rounded-full border p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiPlus size={18} />
          </button>
        </header>

        {/* photo grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {photos.map((p, idx) => {
            const tag = p.tags[0];
            return (
              <div
                key={p.id}
                draggable
                onDragStart={onDragStart(p.id)}
                onDragOver={onDragOver}
                onDrop={onDrop(p.id)}
                className={`relative overflow-hidden rounded-lg ${
                  idx === 0 ? 'col-span-2 row-span-2 h-72' : 'h-40'
                }`}
              >
                <Image
                  src={p.url}
                  alt={p.file.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />

                {idx === 0 && (
                  <span className="absolute left-3 top-2 rounded-lg bg-white px-2 py-0.5 text-xs font-medium">
                    Cover Photo
                  </span>
                )}

                {tag ? (
                  <button
                    className="absolute right-3 top-2 rounded-lg bg-white/90 px-2 py-0.5 text-xs font-medium shadow"
                    onClick={() => setTaggingId(p.id)}
                  >
                    {tag}
                  </button>
                ) : (
                  <button
                    className="absolute right-3 top-2 rounded-lg bg-white/70 px-2 py-0.5 text-xs font-medium shadow hover:scale-105 transition"
                    onClick={() => setTaggingId(p.id)}
                  >
                    Add Tag
                  </button>
                )}

                {idx === 0 && (
                  <button className="absolute bottom-2 right-2 rounded-full bg-white/90 p-1 text-gray-600 shadow">
                    <FiMoreHorizontal size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* modals */}
      <UploadModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUpload={handleUpload}
      />

      <TagModal
        open={Boolean(taggingId)}
        onClose={() => setTaggingId(null)}
        onSelect={(tag) => {
          if (taggingId) addTagToPhoto(taggingId, tag);
          setTaggingId(null);
        }}
      />
    </>
  );
}
