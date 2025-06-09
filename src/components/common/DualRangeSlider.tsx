'use client';

import React, { useRef, useEffect } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface DualRangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
}

export default function DualRangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
}: DualRangeSliderProps) {
  const [minVal, maxVal] = value;
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);  

  const handleSliderChange = (newVals: number[]) => {
    onChange([newVals[0], newVals[1]]);
  };

  const handleInputChange = (index: 0 | 1, newVal: number) => {
    if (index === 0 && newVal < maxVal) {
      onChange([Math.max(min, newVal), maxVal]);
    }
    if (index === 1 && newVal > minVal) {
      onChange([minVal, Math.min(max, newVal)]);
    }
  };

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const width = spanRef.current.offsetWidth + 12; // extra buffer
      inputRef.current.style.width = `${width}px`;
    }
  }, [minVal]);

  return (
    <div className="w-full">
      <label className="text-sm text-gray-800 block mb-2">{label}</label>

      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleSliderChange}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full bg-primary rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white border border-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-primary" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white border border-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-primary" />
      </SliderPrimitive.Root>

      <div className="flex justify-between mt-3 gap-4">
        {/* Left input: unit follows number, left-aligned */}
        <div className="flex items-center rounded-md px-2 py-1 text-sm bg-white relative">
          {/* Input field dynamically sized */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            min={min}
            max={maxVal - 1}
            value={minVal.toLocaleString()}
            onChange={(e) => {
              const num = parseInt(e.target.value, 10);
              handleInputChange(0, isNaN(num) ? 0 : num)
              }}
            className="focus:outline-none appearance-none border-none no-spinner text-left bg-transparent"
            style={{ width: `${minVal.toString().length + 0.5}ch` }}
          />
          <span className="text-xs">{unit}</span>

          {/* Hidden span to measure width of input */}
          <span
            ref={spanRef}
            className="absolute invisible text-xs"
          >
            {minVal || 0}
          </span>
        </div>


        {/* Right input: unit follows number, right-aligned */}
        <div className="flex items-center rounded-md px-2 py-1 text-sm w-fit bg-white">
          <input
            type="text"
            inputMode="numeric"
            min={minVal + 1}
            max={max}
            value={maxVal.toLocaleString()}
            onChange={(e) => handleInputChange(1, Number(e.target.value))}
            className="focus:outline-none appearance-none no-spinner border-none text-right bg-transparent"
          />
          <span className="pl-1 text-xs">{unit}</span>
        </div>
      </div>
    </div>
  );
}
