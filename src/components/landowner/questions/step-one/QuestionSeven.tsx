'use client';

import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import type { Answerable } from '@/types/QuestionContracts';

export default function QuestionSeven({
  value,
  onAnswered,
}: Answerable<boolean | null>) {
  const [selected, setSelected] = useState<boolean | null>(value ?? null);

  const choose = (val: boolean) => {
    setSelected(val);
    onAnswered?.(val);               // ✅ tell parent immediately
  };

  return (
    <section className="mx-auto max-w-2xl px-4 text-center">
      <h2 className="mb-12 text-2xl font-extrabold">
        Is your land owned by a business, trust, or LLC?
      </h2>

      <div className="space-y-6">
        {/* YES */}
        <button
          onClick={() => choose(true)}
          className={`flex w-full items-center gap-6 rounded-xl border px-6 py-5 text-left transition
            ${
              selected === true
                ? 'border-primary bg-[#f6fdf8] text-primary'
                : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full border
              ${
                selected === true
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-400 text-gray-500'
              }`}
          >
            <FiCheck size={18} />
          </span>
          <span className="text-sm font-medium">Yes</span>
        </button>

        {/* NO */}
        <button
          onClick={() => choose(false)}
          className={`flex w-full items-center gap-6 rounded-xl border px-6 py-5 text-left transition
            ${
              selected === false
                ? 'border-primary bg-[#f6fdf8] text-primary'
                : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full border
              ${
                selected === false
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-400 text-gray-500'
              }`}
          >
            <FiX size={18} />
          </span>
          <span className="text-sm font-medium">No</span>
        </button>
      </div>
    </section>
  );
}
