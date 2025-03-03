'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface DropdownProps {
    initialValue: string;
    options: Array<{
        value: string;
        label: string;
    }>;
  }

export default function Dropdown({initialValue, options}: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [option, setOption] = useState<string>('');
  const selectedOption = options.find(o => o.value === option);

  return (
    <div className="bg-white p-6 space-y-4">
        <div className="relative inline-block w-full">
            <button
            onClick={() => setDropdownOpen(o => !o)}
            className="w-full flex items-center rounded-2xl justify-between border border-black p-2 text-sm"
            >
            <div className="flex items-center">
                <span>{initialValue}</span>
                {selectedOption && <span>{selectedOption.label}</span>}
            </div>
            {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {dropdownOpen && (
            <ul className="absolute w-full bg-white border border-black rounded-2xl shadow z-10">
                {options.map(opt => (
                <li
                    key={opt.value}
                    onClick={() => {
                    setOption(opt.value);
                    setDropdownOpen(false);
                    }}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
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
