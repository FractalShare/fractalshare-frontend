/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Dropdown, MapComponent, Navbar, Footer } from '@/components/common';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import PropertyCard from '@/components/common/PropertyCard';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { SortDropdown } from '@/components/common';

const sampleListings = [
  {
    imageSrc: '/images/land.jpg',
    pricePerShare: 107,
    valuation: 214000,
    numOfAcres: 28,
    typeOfLand: 'Farmland',
    percentRemaining: 45,
    isActive: true,
    location: 'Lexington, KY, 40508, Fayette County',
  },
  {
    imageSrc: '/images/land2.jpg',
    pricePerShare: 112,
    valuation: 250000,
    numOfAcres: 32,
    typeOfLand: 'Ranch',
    percentRemaining: 37,
    isActive: true,
    location: 'Boerne, TX, 78006, Kendall County',
  },
  {
    imageSrc: '/images/land9.jpg',
    pricePerShare: 98,
    valuation: 275000,
    numOfAcres: 45,
    typeOfLand: 'Residential',
    percentRemaining: 70,
    isActive: true,
    location: 'Asheville, NC, 28801, Buncombe County',
  },
  {
    imageSrc: '/images/land12.jpg',
    pricePerShare: 101,
    valuation: 190000,
    numOfAcres: 19,
    typeOfLand: 'Timberland',
    percentRemaining: 82,
    isActive: false,
    location: 'Flagstaff, AZ, 86001, Coconino County',
  },
  {
    imageSrc: '/images/land15.jpg',
    pricePerShare: 90,
    valuation: 180000,
    numOfAcres: 23,
    typeOfLand: 'Mountain',
    percentRemaining: 15,
    isActive: true,
    location: 'Durango, CO, 81301, La Plata County',
  },
];

export default function Map() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearch = (option: string) => {
    const searchVal = option.replace(", ", "-");
    router.push('/home');
  };

  const chooseOption = async (option: string) => {
    const searchVal = option;
    setSearchQuery(searchVal);
    setLastSearch(searchVal);
    setSuggestions([]);
    handleSearch(searchVal);
  };

  const options = [
    { value: 'one', label: 'Option 1' },
    { value: 'two', label: 'Option 2' },
    { value: 'three', label: 'Option 3' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Filters row */}
      <div className="hidden md:flex items-center pl-2 border-b border-black">
        {/* Search Input */}
        <div className="relative w-2/5 p-2">
          <div className="flex items-center w-full border border-black rounded-2xl px-4 py-2">
            <PiMagnifyingGlass className="text-lg mr-3" />
            <input
              type="text"
              placeholder="City, county, state, ZIP"
              className="flex-1 bg-transparent focus:outline-none placeholder:text-black"
              value={searchQuery}
              onChange={handleChange}
              onFocus={() => setSearchQuery('')}
              onBlur={() => setSearchQuery(lastSearch)}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 z-10 w-full bg-white border text-black border-gray-300 rounded-lg mt-1">
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => chooseOption(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex w-3/5 gap-2 z-10">
          <div className="flex-1"><Dropdown initialValue="Active" options={options} /></div>
          <div className="flex-1"><Dropdown initialValue="Lot Size" options={options} /></div>
          <div className="flex-1"><Dropdown initialValue="Land Type" options={options} /></div>
          <div className="flex-1"><Dropdown initialValue="More" options={options} /></div>
        </div>
      </div>

      {/* Map and Cards layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Left: Full-height map */}
        <div className="w-1/2 h-[calc(100vh-128px)]">
          <MapComponent />
        </div>

        {/* Right: Scrollable card list with footer */}
        <div className="w-1/2 flex flex-col" style={{ height: 'calc(100vh - 128px)' }}>
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <h2 className="text-2xl font-semibold">Land Investment Opportunities</h2>
            <div className="mb-4 flex items-center justify-between">
              <span>86 opportunities</span>
              <SortDropdown />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sampleListings.map((listing, index) => (
                <div key={index} className="min-w-[340px] max-w-[340px] flex-shrink-0">
                  <PropertyCard {...listing} />
                </div>
              ))}
            </div>

            {/* Footer sits below all cards */}
            <div className="mt-8">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
