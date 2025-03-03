'use client';

import React from 'react';
import Image from 'next/image';

export interface LearnCardProps {
  title: string;
  imgSrc: string;
  bgClass?: string;
}

export default function LearnCard({ title, imgSrc, bgClass = 'bg-white' }: LearnCardProps) {
  return (
    <div className={`flex flex-row w-full items-center border border-gray-200 rounded-3xl p-4 ${bgClass}`}>
      <h3 className="self-start text-sm font-medium mb-2">{title}</h3>
      <div className="relative w-full h-32">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
