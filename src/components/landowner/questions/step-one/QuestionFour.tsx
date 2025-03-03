'use client';

import { useState } from 'react';
import { TbRuler } from 'react-icons/tb';
import type { Answerable } from '@/types/QuestionContracts';

export default function StepOneTwo({
  value,
  onAnswered,
}: Answerable<number | null>) {
  /* store raw text so an empty string is allowed */
  const [acresText, setAcresText] = useState(
    value != null && value > 0 ? String(value) : '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.replace(/[^0-9.]/g, ''); // keep digits / dot
    setAcresText(txt);

    const num = parseFloat(txt);
    if (!Number.isNaN(num) && num > 0) {
      onAnswered?.(num);       // ✅ valid number
    } else {
      onAnswered?.(null);      // 🚫 not valid (clears parent answer)
    }
  };

  return (
    <section className="mx-auto max-w-lg px-4 text-center">
      <h2 className="mb-12 text-3xl font-extrabold">
        How many acres is your land?
      </h2>

      <div>
        {/* acreage input */}
        <div className="relative mb-12">
          <TbRuler
            size={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
          />
          <input
            type="text"
            placeholder="Enter acreage"
            value={acresText}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 py-3 pl-12 pr-4 text-sm
                       placeholder-gray-600"
          />
        </div>
      </div>
    </section>
  );
}
