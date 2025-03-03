'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import DualRangeSlider from './DualRangeSlider';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultPrice?: { min: string; max: string };
  defaultValuation?: [number, number];
  defaultZoning?: string[];
  onReset?: () => void;
}

const ZONING_OPTIONS = [
  'Agricultural',
  'Undeveloped residential',
  'Undeveloped commercial',
  'Timberland',
  'Mixed-use',
  'Recreational (hunting, fishing, etc.)',
];

export default function MoreFiltersModal({
  open,
  onClose,
  defaultPrice = { min: '', max: '' },
  defaultValuation = [50_000, 4_000_000],
  defaultZoning = [],
  onReset,
}: Props) {
  /* local state */
  const [price, setPrice] = useState(defaultPrice);
  const [valuation, setValuation] = useState<[number, number]>(defaultValuation);
  const [zoning, setZoning] = useState<string[]>(defaultZoning);

  /* page scroll lock + ESC key */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', esc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', esc);
      };
    }
  }, [open, onClose]);

  const resetAll = () => {
    setPrice({ min: '', max: '' });
    setValuation([50_000, 4_000_000]);
    setZoning([]);
    onReset?.();
  };

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10">
        <div className="w-[380px] rounded-3xl bg-white shadow-xl">
          {/* header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-lg font-semibold">More Filters</h2>
            <button onClick={onClose}>
              <FiX size={22} />
            </button>
          </div>

          {/* body */}
          <div className="max-h-[70vh] space-y-6 overflow-y-auto px-5 py-6">

            {/* Price per Share */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price per Share
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Min"
                  value={price.min}
                  onChange={(e) =>
                    setPrice((p) => ({ ...p, min: e.target.value }))
                  }
                  className="w-1/2 rounded-lg border px-3 py-2 text-sm focus:outline-none"
                />
                <span className="text-gray-500">—</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Max"
                  value={price.max}
                  onChange={(e) =>
                    setPrice((p) => ({ ...p, max: e.target.value }))
                  }
                  className="w-1/2 rounded-lg border px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Property valuation */}
            <div>
              <DualRangeSlider
                min={50_000}
                max={4_000_000}
                step={10_000}
                value={valuation}
                onChange={setValuation}
                label='Property Valuation'
                unit='$'
              />
            </div>

            {/* Zoning */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Zoning</label>
              <ul className="space-y-3">
                {ZONING_OPTIONS.map((zone) => (
                  <li key={zone} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={zoning.includes(zone)}
                      onChange={() =>
                        setZoning((prev) =>
                          prev.includes(zone)
                            ? prev.filter((z) => z !== zone)
                            : [...prev, zone],
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm">{zone}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* footer */}
          <div className="border-t px-5 py-4">
            <button
              onClick={resetAll}
              className="w-full rounded-3xl border border-primary py-2 text-sm font-medium text-primary hover:scale-105 transition"
            >
              Reset all filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
