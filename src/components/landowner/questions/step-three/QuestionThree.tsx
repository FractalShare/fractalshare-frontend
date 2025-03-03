'use client';

import { useEffect, useRef, useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';

/**
 * Short title input – 40‑character limit with live counter.
 */
export default function QuestionThree({
  value,
  onAnswered,
}: Answerable<string | null>) {
  const MAX = 40;
  const [title, setTitle] = useState(value ?? '');

  /* ---------- stable callback ref ---------- */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  /* notify parent whenever title changes */
  useEffect(() => {
    cbRef.current?.(title.trim() === '' ? null : title.trim());
  }, [title]);

  /* ------------------------ UI ------------------------ */
  return (
    <section className="mx-auto max-w-xl px-4">
      <h2 className="mb-1 text-2xl font-extrabold">
        Let’s give your property a name
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Short titles work best. Be creative — you can always change it later.
      </p>

      <textarea
        rows={4}
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, MAX))}
        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm
                   focus:border-primary focus:ring-0"
      />

      <span className="mt-1 block text-xs text-gray-500">
        {title.length}/{MAX}
      </span>
    </section>
  );
}
