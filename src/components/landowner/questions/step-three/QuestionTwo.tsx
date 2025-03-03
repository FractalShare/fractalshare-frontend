'use client';

import { useEffect, useRef, useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';

interface PercentOfferProps extends Answerable<number | null> {
  fullValue?: number;  // market value (default $100 000)
  initialPct?: number; // starting percent (default 80)
}

export default function PercentOffer({
  fullValue = 100_000,
  initialPct = 80,
  value,
  onAnswered,
}: PercentOfferProps) {
  /* percentage state (0‑100) */
  const [pct, setPct] = useState<number>(
    value != null ? value : initialPct,
  );

  /* ---------- stable callback ref ---------- */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  /* notify parent on mount & whenever pct changes */
  useEffect(() => {
    cbRef.current?.(pct);
  }, [pct]);

  /* helpers */
  const dollars = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format((pct / 100) * fullValue);

  /* update handler */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPct(Number(e.target.value));

  /* --------------------------- UI --------------------------- */
  return (
    <section className="mx-auto max-w-xl px-4">
      <h2 className="mb-2 text-2xl font-extrabold">
        What percent of your land do you want to offer?
      </h2>
      <p className="mb-10 text-sm text-gray-600">
        Select the portion you want to tokenize.
      </p>

      <div className="text-center">
        <p className="mb-10 text-5xl font-extrabold tracking-tight">{dollars}</p>
      </div>

      {/* slider */}
      <div className="relative mx-auto mt-24 w-full max-w-lg">
        {/* badge */}
        <div
          className="absolute -top-14 z-10 flex flex-col items-center"
          style={{ left: `calc(${pct}% - 16px - 25px * (${pct}/100))` }}
        >
          <span className="rounded bg-primary px-4 py-1 text-xs font-semibold text-white">
            {pct}%
          </span>
          <div
            className="mt-2 h-0 w-0 border-x-8 border-t-8 border-x-transparent"
            style={{ borderTopColor: '#35946D' }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={handleChange}
          className="w-full appearance-none accent-primary"
        />

        {/* custom track for WebKit & Firefox */}
        <style jsx>{`
          input[type='range']::-webkit-slider-runnable-track {
            height: 4px;
            background: linear-gradient(
              to right,
              #35946d 0%,
              #35946d ${pct}%,
              #d1d5db ${pct}%,
              #d1d5db 100%
            );
            border-radius: 9999px;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #35946d;
            cursor: pointer;
            margin-top: -6px;
          }
          input[type='range']::-moz-range-track {
            height: 4px;
            background: #d1d5db;
            border-radius: 9999px;
          }
          input[type='range']::-moz-range-progress {
            height: 4px;
            background: #35946d;
            border-radius: 9999px;
          }
          input[type='range']::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #35946d;
            cursor: pointer;
          }
        `}</style>
      </div>
    </section>
  );
}
