'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  initialValue: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export default function Dropdown({ initialValue, options, value, onChange }: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="bg-white w-full space-y-4">
      <div className="relative w-full">
        <button
          onClick={() => setDropdownOpen(o => !o)}
          className="w-full flex items-center rounded-xl justify-between border border-gray-300 p-2 text-sm"
        >
          <div className="flex items-center">
            {!selectedOption && <span>{initialValue}</span>}
            {selectedOption && <span>{selectedOption.label}</span>}
          </div>
          {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {dropdownOpen && (
          <ul className="absolute w-full bg-white border rounded-2xl shadow z-10">
            {options.map(opt => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setDropdownOpen(false);
                }}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
              >
                <span className="text-sm text-gray-800">{opt.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
