'use client';

import { useState, useRef, useEffect } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';

const SORT_OPTIONS = [
  'Recommended for You',
  'Payment (High to Low)',
  'Payment (Low to High)',
  'Newest',
  'Square Feet',
  'Acres',
];

export default function SortDropdown() {
  const [selected, setSelected] = useState('Recommended for You');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center text-primary text-sm font-medium focus:outline-none cursor-pointer hover:underline"
      >
        <span>
          Sort: {selected}
        </span>
        <IoChevronDownSharp className="ml-1 text-base" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black/5 z-30">
          <ul className="py-2 text-sm text-gray-700">
            {SORT_OPTIONS.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selected === option ? 'font-semibold text-[#2E8B68]' : ''
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
