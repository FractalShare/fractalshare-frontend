'use client';

import { useState } from 'react';
import {
  FiHome,
  FiShoppingBag,
  FiHelpCircle,
} from 'react-icons/fi';
import {
  GiPlantRoots,
  GiTreeBranch,
  GiWoodPile,
  GiTreehouse,
  GiMountainCave,
} from 'react-icons/gi';
import { MdOutlinePark } from 'react-icons/md';
import { LiaIndustrySolid } from 'react-icons/lia';
import type { Answerable } from '@/types/QuestionContracts';

/* ---------- types ---------- */
export type Zoning =
  | 'Residential'
  | 'Agricultural'
  | 'Commercial'
  | 'Industrial'
  | 'Recreational'
  | 'Conservation'
  | 'Mixed-use'
  | 'Timber Production Zone'
  | 'Agricultural Residential'
  | "I'm not sure";

const ZONINGS: { id: Zoning; icon: React.ReactNode }[] = [
  { id: 'Residential', icon: <FiHome size={40} /> },
  { id: 'Agricultural', icon: <GiPlantRoots size={40} /> },
  { id: 'Commercial', icon: <FiShoppingBag size={40} /> },
  { id: 'Industrial', icon: <LiaIndustrySolid size={40} /> },
  { id: 'Recreational', icon: <MdOutlinePark size={40} /> },
  { id: 'Conservation', icon: <GiTreeBranch size={40} /> },
  { id: 'Mixed-use', icon: <GiMountainCave size={40} /> },
  { id: 'Timber Production Zone', icon: <GiWoodPile size={40} /> },
  { id: 'Agricultural Residential', icon: <GiTreehouse size={40} /> },
  { id: "I'm not sure", icon: <FiHelpCircle size={40} /> },
];

/* ---------- component ---------- */
export default function QuestionFive({
  value,
  onAnswered,
}: Answerable<Zoning>) {
  const [selected, setSelected] = useState<Zoning | null>(value ?? null);

  const choose = (z: Zoning) => {
    setSelected(z);
    onAnswered?.(z);          // ✅ notify parent immediately
  };

  return (
    <section className="mx-auto max-w-3xl px-4">
      <div className="text-center">
        <h2 className="mb-12 text-3xl font-extrabold">
          What type of zoning does your land have?
        </h2>
      </div>

      <div className="grid place-items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ZONINGS.map(({ id, icon }) => {
          const active = selected === id;
          return (
            <div
              key={id}
              onClick={() => choose(id)}
              className={`flex cursor-pointer flex-col gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition
                ${
                  active
                    ? 'border-primary bg-[#f6fdf8] text-primary'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <span className="text-2xl">{icon}</span>
              <span>{id}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
