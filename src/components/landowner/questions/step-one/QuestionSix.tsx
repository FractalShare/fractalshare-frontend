'use client';

import { useEffect, useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';

export default function QuestionSix({
  value,
  onAnswered,
}: Answerable<string | null>) {
  const [apn, setApn] = useState(value ?? '');

  /* initial mount: if we already have an APN value, notify parent once */
  useEffect(() => {
    if (apn.trim()) onAnswered?.(apn.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value;
    setApn(txt);

    /* send valid or clear */
    if (txt.trim()) {
      onAnswered?.(txt.trim());
    } else {
      onAnswered?.(null);
    }
  };

  return (
    <section className="mx-auto max-w-lg px-4">
      <h2 className="mb-12 text-3xl font-extrabold">
        What is your land’s Assessor’s
        <br />
        Parcel Number (APN)?
      </h2>

      <input
        type="text"
        placeholder="Enter APN"
        value={apn}
        onChange={handleChange}
        className="w-full rounded-2xl border border-gray-300 py-3 px-4 text-sm
                   placeholder-gray-600"
      />
    </section>
  );
}
