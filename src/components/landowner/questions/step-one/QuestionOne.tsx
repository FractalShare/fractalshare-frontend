'use client';

import { useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';
import {
  LuLandmark,
  LuTreePine,
  LuTentTree,
  LuWaves,
  LuSunMedium,
  LuFlower2,
  LuBuilding,
  LuTrees,
} from 'react-icons/lu';
import { PiFarm, PiBarnDuotone } from 'react-icons/pi';
import { MdOutlineForest } from 'react-icons/md';
import { BiTargetLock } from 'react-icons/bi';

export type LandType =
  | 'Farmland'
  | 'Forest'
  | 'Undeveloped land'
  | 'Recreational'
  | 'Timberland'
  | 'Hunting land'
  | 'Waterfront'
  | 'Ranch'
  | 'Desert'
  | 'Meadow'
  | 'Mixed-use land'
  | 'Other';

const LAND_TYPES: { id: LandType; icon: React.ReactNode }[] = [
  { id: 'Farmland', icon: <PiFarm size={40} /> },
  { id: 'Forest', icon: <MdOutlineForest size={40} /> },
  { id: 'Undeveloped land', icon: <LuTrees size={40} /> },
  { id: 'Recreational', icon: <LuTentTree size={40} /> },
  { id: 'Timberland', icon: <LuTreePine size={40} /> },
  { id: 'Hunting land', icon: <BiTargetLock size={40} /> },
  { id: 'Waterfront', icon: <LuWaves size={40} /> },
  { id: 'Ranch', icon: <PiBarnDuotone size={40} /> },
  { id: 'Desert', icon: <LuSunMedium size={40} /> },
  { id: 'Meadow', icon: <LuFlower2 size={40} /> },
  { id: 'Mixed-use land', icon: <LuBuilding size={40} /> },
  { id: 'Other', icon: <LuLandmark size={40} /> },
];

export default function QuestionOne({
  value,
  onAnswered,
}: Answerable<LandType>) {
  const [selected, setSelected] = useState<LandType | null>(value ?? null);

  const choose = (t: LandType) => {
    setSelected(t);
    onAnswered?.(t);
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-8">
      <h2 className="text-3xl font-extrabold">
        Which of these best describes your land?
      </h2>

      <div className="grid place-items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LAND_TYPES.map(({ id, icon }) => {
          const active = selected === id;
          return (
            <div
              key={id}
              onClick={() => choose(id)}
              className={`flex cursor-pointer flex-col gap-1 rounded-lg border
                          px-6 py-4 transition ${
                            active
                              ? 'border-primary bg-[#f6fdf8] text-primary'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-md font-medium">{id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
