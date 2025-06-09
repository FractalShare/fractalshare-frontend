/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Footer, Navbar } from '@/components/common';
import { IoFilter } from "react-icons/io5";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import PropertySection from '@/components/common/PropertySection';
import DualRangeSlider from '@/components/common/DualRangeSlider';
import MoreFiltersModal from '@/components/common/MoreFiltersModal';

/* ─── sample data (replace with real API) ─────────────────────── */
const sampleListingsOne = [
  {
    imageSrc: '/images/land1.jpg',
    pricePerShare: 110,
    valuation: 110000,
    numOfAcres: 30,
    typeOfLand: 'Orchard',
    percentRemaining: 20,
    isActive: true,
    location: 'Napa Valley, CA, Napa County',
  },
  {
    imageSrc: '/images/land2.jpg',
    pricePerShare: 97,
    valuation: 180000,
    numOfAcres: 22,
    typeOfLand: 'Hillside',
    percentRemaining: 50,
    isActive: true,
    location: 'Bend, OR, Deschutes County',
  },
  {
    imageSrc: '/images/land3.jpg',
    pricePerShare: 130,
    valuation: 390000,
    numOfAcres: 55,
    typeOfLand: 'Timberland',
    percentRemaining: 10,
    isActive: true,
    location: 'Spokane, WA, Spokane County',
  },
  {
    imageSrc: '/images/land8.jpg',
    pricePerShare: 89,
    valuation: 160000,
    numOfAcres: 18,
    typeOfLand: 'Wetlands',
    percentRemaining: 65,
    isActive: false,
    location: 'Madison, WI, Dane County',
  },
  {
    imageSrc: '/images/land5.jpg',
    pricePerShare: 92,
    valuation: 220000,
    numOfAcres: 27,
    typeOfLand: 'Recreational',
    percentRemaining: 35,
    isActive: true,
    location: 'Taos, NM, Taos County',
  },
];

const sampleListingsTwo = [
  {
    imageSrc: '/images/land6.jpg',
    pricePerShare: 105,
    valuation: 210000,
    numOfAcres: 35,
    typeOfLand: 'Desert',
    percentRemaining: 40,
    isActive: true,
    location: 'Joshua Tree, CA, San Bernardino County',
  },
  {
    imageSrc: '/images/land7.jpg',
    pricePerShare: 88,
    valuation: 140000,
    numOfAcres: 15,
    typeOfLand: 'Prairie',
    percentRemaining: 55,
    isActive: true,
    location: 'Fargo, ND, Cass County',
  },
  {
    imageSrc: '/images/land4.jpg',
    pricePerShare: 99,
    valuation: 198000,
    numOfAcres: 26,
    typeOfLand: 'Agricultural',
    percentRemaining: 33,
    isActive: true,
    location: 'Amarillo, TX, Potter County',
  },
  {
    imageSrc: '/images/land9.jpg',
    pricePerShare: 100,
    valuation: 170000,
    numOfAcres: 20,
    typeOfLand: 'Residential',
    percentRemaining: 75,
    isActive: false,
    location: 'Tulsa, OK, Tulsa County',
  },
  {
    imageSrc: '/images/land2.jpg',
    pricePerShare: 93,
    valuation: 186000,
    numOfAcres: 24,
    typeOfLand: 'Meadow',
    percentRemaining: 25,
    isActive: true,
    location: 'Helena, MT, Lewis and Clark County',
  },
];

const sampleListings = [
  {
    imageSrc: '/images/land.jpg',
    pricePerShare: 107,
    valuation: 214000,
    numOfAcres: 28,
    typeOfLand: 'Farmland',
    percentRemaining: 45,
    isActive: true,
    location: 'Lexington, KY, Fayette County',
  },
  {
    imageSrc: '/images/land5.jpg',
    pricePerShare: 112,
    valuation: 250000,
    numOfAcres: 32,
    typeOfLand: 'Ranch',
    percentRemaining: 37,
    isActive: true,
    location: 'Boerne, TX, Kendall County',
  },
  {
    imageSrc: '/images/land9.jpg',
    pricePerShare: 98,
    valuation: 275000,
    numOfAcres: 45,
    typeOfLand: 'Residential',
    percentRemaining: 70,
    isActive: true,
    location: 'Asheville, NC, Buncombe County',
  },
  {
    imageSrc: '/images/land12.jpg',
    pricePerShare: 101,
    valuation: 190000,
    numOfAcres: 19,
    typeOfLand: 'Timberland',
    percentRemaining: 82,
    isActive: false,
    location: 'Flagstaff, AZ, Coconino County',
  },
  {
    imageSrc: '/images/land15.jpg',
    pricePerShare: 90,
    valuation: 180000,
    numOfAcres: 23,
    typeOfLand: 'Mountain',
    percentRemaining: 15,
    isActive: true,
    location: 'Durango, CO, La Plata County',
  },
  {
    imageSrc: '/images/land5.jpg',
    pricePerShare: 112,
    valuation: 250000,
    numOfAcres: 32,
    typeOfLand: 'Ranch',
    percentRemaining: 37,
    isActive: true,
    location: 'Boerne, TX, Kendall County',
  },
];


const LAND_TYPES: string[] = [
  'Farmland',
  'Forest',
  'Undeveloped land',
  'Recreational',
  'Timberland',
  'Hunting land',
  'Waterfront',
  'Ranch',
  'Desert',
  'Meadow',
  'Mixed-use land',
  'Other'
];

export default function Explore() {
  const router = useRouter();
  const [lotSizeRange, setLotSizeRange] = useState<[number, number]>([0, 9000]);
  const [daysListedRange, setDaysListedRange] =
    useState<[number, number]>([0, 365]);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* navigation bar */}
      <Navbar />

      {/* ─── HERO section (full‑width gradient) ─────────────────── */}
      <section className="w-full bg-gradient-to-r from-[#88CDAD] via-[#35946D] to-[#1D5F47]">
        <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-center justify-between gap-8 px-4 py-4 lg:flex-row lg:px-24">
          {/* text + search */}
          <div className="w-full max-w-xl space-y-6 text-white">
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Real Estate Investing, Finally Within Reach
            </h1>
            <p className="text-base sm:text-lg">
              Own land in minutes. Fractional, verified, and fully transparent.
            </p>

            {/* search input with icon */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter a State, City, County, or ZIP"
                className="peer w-full rounded-2xl px-6 py-4 text-sm text-black shadow-md focus:outline-none placeholder:text-base"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#35946D] p-[10px] transition hover:scale-105 focus:outline-none"
                aria-label="Search"
              >
                <HiMagnifyingGlass className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* illustration */}
          <Image
            src="/images/explore2.png"
            alt="Hero illustration"
            width={460}
            height={260}
            className="h-auto w-64 lg:w-80"
            priority
          />
        </div>
      </section>

      {/* ─── MAIN content ───────────────────────────────────────── */}
      <div className="space-y-10 px-4 py-10 lg:px-24">
        <div className='space-y-3'>
          <PropertySection
            title="Land Available in the United States"
            subtitle="The most viewed and favorited in the last day"
            listings={sampleListings}
            filter={
              <div>
                {/* header + filter button */}
                <div className="mb-2 flex flex-col items-start justify-end gap-4 sm:flex-row sm:items-center text-black">
                  <button onClick={() => setShowFilters(true)} className="flex items-center rounded-full border px-2 py-1 text-xs hover:scale-105 transition">
                    <IoFilter className="mr-2 h-3 w-3" />
                    More filters
                  </button>
                </div>
      
                {/* filter bar */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-sm text-black">Location</label>
                    <select className="w-full rounded-lg border px-3 py-2 bg-white cursor-pointer">
                      <option>United States</option>
                    </select>
                  </div>
      
                  <div>
                    <label className="mb-1 block text-sm text-black">Property type</label>
                    <select className="w-full rounded-lg border px-3 py-2 bg-white cursor-pointer">
                      <option>All properties</option>
                      {LAND_TYPES.map((type, index) => (
                        <option key={index}>{type}</option>
                      ))}
                    </select>
                  </div>
      
                  <DualRangeSlider
                    label="Lot size"
                    min={0}
                    max={9000}
                    step={1}
                    value={lotSizeRange}
                    onChange={setLotSizeRange}
                    unit="Acres"
                  />
      
                  <DualRangeSlider
                    label="Number of days listed"
                    min={0}
                    max={365}
                    step={1}
                    value={daysListedRange}
                    onChange={setDaysListedRange}
                    unit="Days"
                  />
                </div>
              </div>}
          />
        </div>

        {/* property sections */}

        <div className="space-y-12">
          <PropertySection
            title="Ongoing Transactions"
            subtitle="Based on your investments"
            listings={sampleListingsOne}
          />
          <PropertySection
            title="Land on Your Lists"
            subtitle="Based on your lists"
            listings={sampleListingsTwo}
          />
          <PropertySection
            title="Land Near You"
            subtitle="Based on your location"
            listings={sampleListingsOne}
          />
          <PropertySection
            title="Recently Viewed"
            subtitle=""
            listings={sampleListingsTwo}
          />
        </div>
      </div>
      <Footer />

      {/* ─── Filters modal ─── */}
      <MoreFiltersModal open={showFilters} onClose={() => setShowFilters(false)} />
    </div>
  );
}
