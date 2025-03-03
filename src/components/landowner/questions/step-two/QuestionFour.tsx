'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiFileText, FiTrash2 } from 'react-icons/fi';
import UploadDocModal from '@/components/landowner/UploadDocModal';
import type { Answerable } from '@/types/QuestionContracts';

/* ------------------------------------------------------------- */
/* local preview type                                             */
type DocPreview = { file: File; url: string };
type Answer     = File | 'SKIPPED';          // step is optional

export default function QuestionFour({
  value,
  onAnswered,
}: Answerable<Answer>) {
  /* initialise from value if we came back with a file */
  const [doc, setDoc] = useState<DocPreview | null>(
    value instanceof File ? { file: value, url: URL.createObjectURL(value) } : null,
  );
  const [open, setOpen] = useState(false);

  /* stable callback ref to avoid loops */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  /* send answer whenever doc changes */
  useEffect(() => {
    cbRef.current?.(doc ? doc.file : 'SKIPPED');
  }, [doc]);

  /* revoke old URL on change / unmount */
  useEffect(
    () => () => {
      if (doc) URL.revokeObjectURL(doc.url);
    },
    [doc],
  );

  /* modal upload handler */
  const handleUpload = (file: File | null) => {
    if (!file) return;
    if (doc) URL.revokeObjectURL(doc.url);
    setDoc({ file, url: URL.createObjectURL(file) });
    setOpen(false);
  };

  const clearDoc = () => {
    if (doc) URL.revokeObjectURL(doc.url);
    setDoc(null);
  };

  /* --------------------------- UI --------------------------- */
  return (
    <>
      <section className="mx-auto max-w-2xl px-4">
        <h2 className="mb-2 text-2xl font-extrabold">
          Upload an appraisal&nbsp;(optional)
        </h2>
        <p className="mb-10 text-sm text-gray-600" />

        <div
          onClick={() => !doc && setOpen(true)}
          className="relative mx-auto flex h-[400px] w-full flex-col items-center
                     justify-center overflow-hidden rounded-xl border border-gray-300
                     bg-gray-100"
        >
          {/* -------- empty state -------- */}
          {!doc && (
            <>
              <Image
                src="/icons/document.png"
                alt="Add document"
                width={100}
                height={100}
                className="mb-10 h-[100px] w-[100px] object-contain"
              />
              <button className="rounded-md bg-white px-6 py-2 text-sm font-medium shadow transition hover:scale-105">
                Add document
              </button>
            </>
          )}

          {/* -------- previews -------- */}
          {doc && doc.file.type.startsWith('image/') && (
            <Image
              src={doc.url}
              alt={doc.file.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}

          {doc && doc.file.type === 'application/pdf' && (
            <iframe
              title={doc.file.name}
              src={`${doc.url}#toolbar=0&navpanes=0&scrollbar=0`}
              className="h-full w-full"
            />
          )}

          {doc &&
            !doc.file.type.startsWith('image/') &&
            doc.file.type !== 'application/pdf' && (
              <div className="flex items-center gap-3">
                <FiFileText className="text-3xl text-primary" />
                <span className="truncate text-sm font-medium">
                  {doc.file.name}
                </span>
              </div>
            )}

          {/* -------- trash can -------- */}
          {doc && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearDoc();
              }}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-gray-700 shadow hover:bg-white hover:text-red-600"
            >
              <FiTrash2 size={16} />
            </button>
          )}
        </div>
      </section>

      <UploadDocModal
        open={open}
        onClose={() => setOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
}
