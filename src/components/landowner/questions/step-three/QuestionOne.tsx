'use client';

import { useEffect, useRef, useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';

/**
 * Big asking‑price input.
 * Accepts only digits; formats with commas while typing.
 */
export default function QuestionOne({
  value,
  onAnswered,
}: Answerable<number | null>) {
  /* raw digit string (max 12) */
  const [raw, setRaw] = useState(
    value != null && value > 0 ? String(value) : '',
  );

  /* ---------- stable callback ref ---------- */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  /* notify parent whenever raw changes */
  useEffect(() => {
    cbRef.current?.(raw === '' ? null : Number(raw));
  }, [raw]);

  /* helpers */
  const format = (s: string) =>
    s === '' ? '' : parseInt(s, 10).toLocaleString('en-US');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, '').slice(0, 12);
    setRaw(digits);
  };

  /* -------------------- UI -------------------- */
  return (
    <section className="mx-auto max-w-2xl px-4">
      <h2 className="mb-1 text-2xl font-extrabold">What is your asking price?</h2>
      <p className="mb-12 text-sm text-gray-600">
        Enter the total value of your entire property. We will still need to
        verify it.
      </p>

      <div className="inline-flex items-center gap-1">
        <span className="text-5xl font-extrabold sm:text-6xl">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={format(raw)}
          onChange={handleChange}
          placeholder="0"
          className="w-[11ch] bg-transparent text-center text-5xl font-extrabold
                     text-black placeholder:text-gray-400 focus:outline-none sm:text-6xl"
        />
      </div>
    </section>
  );
}
