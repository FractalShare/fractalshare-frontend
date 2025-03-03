'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowLeft,
  FiDollarSign,
  FiClock,
  FiMapPin,
  FiWind,
  FiCamera
} from 'react-icons/fi';
import {
  FaRegHeart,
  FaRegEyeSlash,
  FaWalking,
  FaBus,
  FaBicycle,
  FaWater
} from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { GiFarmTractor } from 'react-icons/gi';
import { CiRuler } from "react-icons/ci";
import { LuScrollText } from "react-icons/lu";
import { IoDocumentTextOutline, IoCloudOutline, IoBarChart  } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { NavbarSearch, PropertySection } from '@/components/common';
import AccordionItem from '@/components/common/AccordianItem';
import { useRouter } from 'next/navigation';
import { saveOrder } from '@/components/utils/OrderProvider';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

interface Section {
    id: number;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
  }
  const sampleListings = [
    {
      imageSrc: '/images/land.jpg',
      pricePerShare: 102,
      valuation: 102000,
      numOfAcres: 25,
      typeOfLand: 'Farmland',
      percentRemaining: 28,
      isActive: true,
      location: 'Mayslick, KY, 41055, Mason County',
    },
    {
      imageSrc: '/images/land6.jpg',
      pricePerShare: 120,
      valuation: 320000,
      numOfAcres: 25,
      typeOfLand: 'Land',
      percentRemaining: 45,
      isActive: true,
      location: 'Alpharetta, GA, 30005, Forsyth County',
    },
    {
      imageSrc: '/images/land2.jpg',
      pricePerShare: 95,
      valuation: 250000,
      numOfAcres: 40,
      typeOfLand: 'Ranch',
      percentRemaining: 60,
      isActive: true,
      location: 'Bozeman, MT, 59718, Gallatin County',
    },
    {
      imageSrc: '/images/land7.jpg',
      pricePerShare: 85,
      valuation: 150000,
      numOfAcres: 10,
      typeOfLand: 'Residential',
      percentRemaining: 80,
      isActive: false,
      location: 'Sedona, AZ, 86336, Coconino County',
    },
    {
      imageSrc: '/images/land3.jpg',
      pricePerShare: 85,
      valuation: 150000,
      numOfAcres: 10,
      typeOfLand: 'Residential',
      percentRemaining: 80,
      isActive: true,
      location: 'Sedona, AZ, 86336, Coconino County',
    },
  ];

  const gallery = [
    '/images/land1.jpg',
    '/images/pd1.png',
    '/images/pd2.png',
    '/images/pd3.png',
    '/images/pd4.png',
  ];

const sections: Section[] = [
{
    id: 1,
    title: 'Exterior',
    icon: <GiFarmTractor className="w-5 h-5" />,
    content: (
    <p className="mt-2 text-gray-700">
        • 3-bedroom brick exterior<br />
        • New roof installed 2022<br />
        • Landscaped garden with irrigation system
    </p>
    ),
},
{
    id: 2,
    title: 'Utilities',
    icon: <FiDollarSign className="w-5 h-5" />,
    content: (
    <p className="mt-2 text-gray-700">
        • Electricity: 200 A service panel<br />
        • Water: Municipal supply, metered<br />
        • Internet: Fiber available
    </p>
    ),
},
{
    id: 3,
    title: 'Location',
    icon: <FiMapPin className="w-5 h-5" />,
    content: (
    <p className="mt-2 text-gray-700">
        123 Main St, Springfield, USA<br />
        Walking distance to schools, parks, and shopping.
    </p>
    ),
},
{
    id: 4,
    title: 'Public facts',
    icon: <LuScrollText className="w-5 h-5" />,
    content: (
    <p className="mt-2 text-gray-700">
        • Parcel ID: 000-123-456<br />
        • Zoned: Residential R-1<br />
        • Last sold: June 2019
    </p>
    ),
},
];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const chartData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Market Value',
        data: [90000, 92000, 91000, 90000, 92000, 96000, 100000, 130000, 120000, 125000, 128000],
        borderColor: 'green',
        backgroundColor: 'green',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4
      }
    ]
  };
  
  const chartOptions: import('chart.js').ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Market Value History' }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: string | number) {
            if (typeof value === 'number') {
              return `$${value / 1000}K`;
            }
            return value;
          }
        }
      }
    }
  };

export default function PropertyDetails() {
  const [showFull, setShowFull] = useState(false);
  const tabs = ['Market Value', 'Sale history', 'Tax history'];
  const [activeTab, setActiveTab] = useState<string>('Market Value');
  const [buyInMode, setBuyInMode] = useState<'Dollars' | 'Shares'>('Dollars');
  const [amount, setAmount] = useState<number>(0);
  const [numShares, setNumShares] = useState<number>(0);
  const [isBuying, setIsBuying] = useState(false);

  const [centsStr, setCentsStr] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const clean = raw.slice(0, 9);
    setCentsStr(clean);

    const cents = parseInt(clean || '0');
    setAmount(cents / 100);
    setNumShares(Number((cents / 100 / 102).toFixed(2)))
  };

  const handleFormattedValue = () => {
    const cents = centsStr.padStart(3, '0');
    const dollars = cents.slice(0, -2);
    const centsPart = cents.slice(-2);
    return `$${Number(dollars)}.${centsPart}`;
  };

  const router = useRouter();

  const handleBuy = () => {
    saveOrder({ amount: amount, sharePrice: 102, estimatedShares: numShares, address: '4084 KY Highway 596, Mayslick, KY 41055' });
    router.push(`/property-details/1233/payment`);
  }

  return (
    <div className="bg-white min-h-screen">
      {/* --- Search Navbar --- */}
      <NavbarSearch />

      {/* --- Top Nav Row --- */}
      <div className="sticky top-0 bg-white z-50 flex w-full mt-4 p-4">
        {/* --- Main Section --- */}
        <div className="w-4/5 flex justify-start gap-8 px-4">
          <Link
            href="/explore"
            className="flex items-center text-sm font-medium text-gray-800 hover:scale-105 transition"
          >
            <FiArrowLeft className="mr-1 h-5 w-5" />
            Back to search
          </Link>
          <Link href="#overview" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Overview
          </Link>
          <Link href="#details" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Property details
          </Link>
          <Link href="#financials" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Financials
          </Link>
          <Link href="#records" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Land records
          </Link>
          <Link href="#climate" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Climate
          </Link>
          <Link href="#nearby" className="text-sm font-medium text-gray-800 hover:text-primary transition">
            Nearby
          </Link>
        </div>
        <div className="w-1/5 flex justify-evenly items-center px-4">
          <button className="flex items-center text-gray-500 space-x-2">
            <FaRegHeart size={17} />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center text-gray-500 space-x-2">
            <FaRegEyeSlash size={17} />
            <span className="text-sm">Hide</span>
          </button>
          <button className="flex items-center text-gray-500 space-x-2">
            <PiShareFat size={17} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* --- Image Gallery --- */}
      <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-5 lg:gap-2 lg:p-8">
        {/* Large cover photo */}
        <div className="lg:col-span-3">
          <Image
            src={gallery[0]}
            alt="Cover photo"
            width={1600}
            height={900}
            priority
            className="h-64 w-full rounded-lg rounded-l-3xl object-cover sm:h-80 lg:h-[393.5px]"
          />
        </div>

        {/* 2×2 side grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:col-span-2">
          {gallery.slice(1, 5).map((src, i) => (
            <div key={i} className="relative">
              <Image
                src={src}
                alt={`Gallery photo ${i + 2}`}
                width={750}
                height={600}
                className={`h-32 w-full object-cover sm:h-40 lg:h-48 rounded-lg 
                            ${i === 3 ? 'rounded-br-3xl' : ''} ${i === 1 ? 'rounded-tr-3xl' : ''}`}
              />

              {/* small pill on bottom‑right tile */}
              {i === 3 && (
                <button
                  className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full
                             bg-white/90 px-3 py-1 text-xs font-medium shadow backdrop-blur
                             transition hover:scale-105"
                >
                  <FiCamera className="h-4 w-4" />
                  34&nbsp;photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Header Card + Main Content + Sidebar --- */}
      <div className="flex flex-row mx-auto px-8 py-4 justify-start gap-14 w-full">
        {/* Header Card */}
        <div className='flex flex-col w-2/3 space-y-6'>
            <div className="flex flex-col justify-between rounded-3xl border border-gray-200 p-6 bg-white">
                <div className='flex flex-row justify-between'>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="h-3 w-3 rounded-full bg-green-500 block" />
                            <span className="text-sm font-medium">Active</span>
                        </div>
                        <h1 className="text-3xl font-bold">$102,000</h1>
                        <p className="text-[#636363]">4084 KY Highway 596, Mayslick, KY 41055</p>
                    </div>

                    <div className='flex flex-col items-end'>
                        <div className="flex flex-row text-xs text-[#636363] gap-2">
                            <span>Property ID:</span>
                            <span>123456789</span>
                        </div>
                        <div className="flex flex-row mt-4 gap-8">
                            <div className="flex flex-col">
                                <span className="font-semibold mt-1">$102</span>
                                <span className="text-[#636363] text-sm">per share</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold mt-1">32,000</span>
                                <span className="text-[#636363] text-sm"> acres</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold mt-1">1,089,000</span>
                                <span className="text-[#636363] text-sm"> sqft</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row mt-4 gap-6 w-full text-sm">
                    <div className="flex items-center rounded-2xl space-x-4 w-1/4 border border-gray-200 p-4">
                        <FiClock size={30}/>
                        <div className='flex flex-col'>
                            <span>33 days</span>
                            <span className='text-sm text-[#636363]'>On Fractal Share</span>
                        </div>
                    </div>
                    <div className="flex items-center rounded-2xl space-x-4 w-1/4 border border-gray-200 p-4">
                        <CiRuler size={30}/>
                        <div className='flex flex-col'>
                            <span>$189</span>
                            <span className='text-sm text-[#636363]'>Price/Sq.Ft.</span>
                        </div>
                    </div>
                    <div className="flex items-center rounded-2xl space-x-4 w-1/4 border border-gray-200 p-4">
                        <IoDocumentTextOutline size={30}/>
                        <div className='flex flex-col'>
                            <span>$1.84</span>
                            <span className='text-sm text-[#636363]'>Property tax/share</span>
                        </div>
                    </div>
                    <div className="flex items-center rounded-2xl space-x-4 w-1/4 border border-gray-200 p-4">
                        <GiFarmTractor size={30}/>
                        <div className='flex flex-col'>
                            <span>Farmland</span>
                            <span className='text-sm text-[#636363]'>Property type</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Column */}
                <div id="overview" className="flex-1 border border-gray-200 rounded-xl divide-y p-2 divide-gray-200">
                    {/* About Section */}
                    <div className="p-6 bg-white">
                        <h2 className="text-xl font-semibold">About This Property</h2>
                        <p className="mt-2 text-gray-700">
                            Discover 25 acres of picturesque farmland nestled in the heart of rural America. This property offers a rare opportunity to invest in open, fertile land surrounded by rolling pastures, soft tree lines, and golden sunset views.
                            {showFull && (
                            <>
                                {' '}
                                With rich soil, gently sloping terrain, and year-round sunlight, this parcel is ideal for crops, grazing, or long-term appreciation.
                            </>
                            )}
                        </p>
                        <button
                            onClick={() => setShowFull(!showFull)}
                            className="mt-2 text-[#244E3B] text-sm font-medium hover:underline"
                        >
                            {showFull ? 'Show less' : 'Show more'}
                        </button>

                        <div className="mt-4 flex flex-wrap gap-6 text-sm">
                            <span>143 viewed</span>
                            <span>58 added to lists</span>
                            <span>97 saved</span>
                        </div>

                        <div className="mt-4">
                            <p>Google Map</p>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4">
                            <FaWalking className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">0/100</p>
                                <p className="text-sm text-gray-500">Walk Score</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4">
                            <FaBus className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">0/100</p>
                                <p className="text-sm text-gray-500">Transit Score</p>
                            </div>
                            </div>
                            <div className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4">
                            <FaBicycle className="h-6 w-6" />
                            <div>
                                <p className="font-semibold">25/100</p>
                                <p className="text-sm text-gray-500">Bike Score</p>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Nearby Schools */}
                    <div className="p-6 bg-white">
                        <h2 className="text-xl font-semibold">Nearby Schools</h2>
                        <p className="text-sm text-gray-500 mb-4">GreatSchools rating</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                            {
                                rating: '-/10',
                                name: 'Charles Straub Elementary School',
                                grades: 'PreK-2',
                                distance: '8.3mi',
                            },
                            {
                                rating: '3/10',
                                name: 'Mason County Intermediate School',
                                grades: '3-5',
                                distance: '6.6mi',
                            },
                            {
                                rating: '4/10',
                                name: 'Mason County Middle School',
                                grades: '6-8',
                                distance: '8.1mi',
                            },
                            {
                                rating: '5/10',
                                name: 'Mason County High School',
                                grades: '9-12',
                                distance: '4.9mi',
                            },
                            ].map((school) => (
                            <div
                                key={school.name}
                                className="flex items-center space-x-4 border rounded-lg p-4"
                            >
                                <div className="p-2 py-3 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                    {school.rating}
                                </div>
                                <div>
                                    <p className="font-medium">{school.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Grades: {school.grades} · Distance: {school.distance}
                                    </p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Details Section */}
            <div id="details" className='border border-gray-200 p-6 rounded-xl'>
                <h2 className="text-xl font-semibold">Property Details</h2>
                <div className="divide-y divide-gray-200 mt-4">
                    {sections.map(({ id, title, icon, content }) => (
                    <AccordionItem key={id} title={title} icon={icon}>
                        {content}
                    </AccordionItem>
                    ))}
                </div>
            </div>

            {/* Financials Section */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Financials</h2>

                {/* Tab buttons */}
                <div className="flex space-x-4 mb-6">
                {tabs.map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                        px-3 py-1 rounded-md transform transition
                        ${activeTab === tab
                        ? 'font-bold text-black'
                        : 'font-medium text-gray-800'}
                        hover:bg-gray-100 hover:scale-105
                    `}
                    >
                    {tab}
                    </button>
                ))}
                </div>

                {/* Tab content */}
                {activeTab === 'Market Value' && (
                    <div>
                    <Line data={chartData} options={chartOptions} className="w-full" />
              
                    <div className="flex flex-row gap-8 items-center">
                      <div className="flex flex-row items-center border p-4 rounded-xl mt-4 w-60">
                        <HiOutlineDocumentCurrencyDollar size={30} />
                        <div className="ml-4">
                          <p className="text-lg font-semibold">$102,000</p>
                          <p className="text-sm text-gray-600">Price</p>
                        </div>
                      </div>
              
                      <div className="flex flex-row items-center border p-4 rounded-xl mt-4 w-60">
                        <IoBarChart size={30} />
                        <div className="ml-4">
                          <p className="text-lg font-semibold">$98K - $110K</p>
                          <p className="text-sm text-gray-600">Estimated sales range</p>
                        </div>
                      </div>
              
                      <div className="flex flex-row items-center border p-4 rounded-xl mt-4 w-60">
                        <BsCoin size={30} />
                        <div className="ml-4">
                          <p className="text-lg font-semibold">$102</p>
                          <p className="text-sm text-gray-600">Price per share</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'Sale history' && (
                    <table className="w-full text-left">
                        <thead className="border-b">
                        <tr>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Event</th>
                            <th className="py-2 px-4">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b">
                            <td className="py-3 px-4">Apr 2025</td>
                            <td className="py-3 px-4">Listed</td>
                            <td className="py-3 px-4">$102,000</td>
                        </tr>
                        </tbody>
                    </table>
                )}
                {activeTab === 'Tax history' && (
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                            <th className="py-2 px-4">Year</th>
                            <th className="py-2 px-4">Assessed value</th>
                            <th className="py-2 px-4">Tax Rate</th>
                            <th className="py-2 px-4">Annual property tax</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                            <td className="py-3 px-4">2025</td>
                            <td className="py-3 px-4">$102,000</td>
                            <td className="py-3 px-4">0.92%</td>
                            <td className="py-3 px-4">$938.40</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            {/* Land Records Section */}
            <div id="records" className="border border-gray-200 rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold">Land Records</h2>
                <div className="divide-y divide-gray-200 mt-4 ml-6">
                    {[
                    { title: 'Property Deed', desc: 'Ownership is legally recorded and verified with the county as of May 2017.' },
                    { title: 'Title Report', desc: 'The property has a clear title with no liens or encumbrances.' },
                    { title: 'Survey Report', desc: 'Boundaries are confirmed with no overlaps or encroachments.' },
                    { title: 'Zoning and Use Information', desc: 'The property is zoned for agricultural use with no recorded variances.' },
                    { title: 'Valuation Summary', desc: 'The property is appraised at $320,000 based on comparable land sales.' },
                    { title: 'Risk Disclosures', desc: 'Key investment risks are disclosed per regulatory and internal review standards.' },
                    ].map((record) => (
                    <div key={record.title} className="flex items-center py-4">
                        <IoDocumentTextOutline size={30} />
                        <div className="ml-4">
                            <p className="text-lg font-semibold">{record.title}</p>
                            <p className="text-sm text-gray-600">{record.desc}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>


            {/* Climate Section */}
            <div id="climate" className='border border-gray-200 rounded-xl p-6'>
                <h2 className="text-xl font-semibold">Climate Risks</h2>
                <div className="divide-y divide-gray-200 mt-4 ml-6">
                    <div className="flex items-center py-4">
                        <FaWater size={30}/>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">Flood Factor - Minimal</p>
                            <p className="text-sm text-gray-600">1/10</p>
                        </div>
                    </div>
                    <div className="flex items-center py-4">
                        <BsFire size={30}/>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">Fire Factor - Moderate</p>
                            <p className="text-sm text-gray-600">4/10</p>
                        </div>
                    </div>
                    <div className="flex items-center py-4">
                        <MdSunny size={30}/>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">Heat Factor - Moderate</p>
                            <p className="text-sm text-gray-600">4/10</p>
                        </div>
                    </div>
                    <div className="flex items-center py-4">
                        <FiWind size={30}/>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">Wind Factor - Minor</p>
                            <p className="text-sm text-gray-600">2/10</p>
                        </div>
                    </div>
                    <div className="flex items-center py-4">
                        <IoCloudOutline size={30}/>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">Air Factor - Minor</p>
                            <p className="text-sm text-gray-600">2/10</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nearby Section */}
            <div id="nearby" className='border border-gray-200 rounded-xl p-6'>
                <PropertySection
                    title="Nearby properties"
                    subtitle="Based on your location"
                    listings={sampleListings}
                />
            </div>

            {/* Properties Section */}
            <div className='border border-gray-200 rounded-xl p-6'>
                <PropertySection
                    title="Properties for you"
                    subtitle="Based on your preferences"
                    listings={sampleListings}
                />
            </div>

        </div>

        {/* Sidebar Invest */}
        <div className="flex flex-col w-1/3 space-y-6">
            <div className='sticky top-14'>
                <div className="border border-gray-200 rounded-xl shadow p-6 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Invest</h2>
                    <div className="space-y-4">
                        <div className="divide-y divide-gray-200 mt-4">
                            <div>
                                <div className="flex flex-row gap-4 mb-4 w-full justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Buy in
                                    </label>
                                    <select className="mt-1 w-32 border border-gray-300 rounded-lg p-2 bg-white text-sm"
                                            value={buyInMode}
                                            onChange={e => {
                                                setBuyInMode(e.target.value as 'Dollars' | 'Shares');
                                                setAmount(0);
                                                }}
                                            onClick={() => setIsBuying(false)}>
                                        <option>Dollars</option>
                                        <option>Shares</option>
                                    </select>
                                </div>

                                <div className="flex flex-row gap-4 mb-4 w-full justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <div className="w-32">
                                        {buyInMode === 'Dollars' ? (
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={handleFormattedValue()}
                                            onChange={handleChange}
                                            onClick={() => setIsBuying(false)}
                                            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-right"
                                        />
                                        ) : (
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={e => {
                                            const num = parseInt(e.target.value, 10);
                                            setAmount(isNaN(num) ? 0 : num);
                                            }}
                                            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-right"
                                            onClick={() => setIsBuying(false)}
                                        />
                                        )}
                                    </div>
                                    </div>

                                {buyInMode === 'Shares' && 
                                    <div className="flex flex-row gap-4 mb-4 w-full justify-between items-center">
                                        <span className="text-sm font-medium text-primary">
                                            Market price
                                        </span>
                                        <span className="text-sm font-bold">
                                            $102.00
                                        </span>
                                    </div>
                                }
                            </div>
                            
                            <div>
                                <div className="text-sm text-black py-4 justify-between flex items-center">
                                    <span>Estimated quantity</span>
                                    <span>{numShares}</span>
                                </div>
                                {isBuying &&
                                    <div className='space-y-4 text-sm'>
                                        <span className='font-bold'>Order Summary</span>
                                        <p>You are placing an order to invest <b>${amount}</b> into <b>4084 KY Highway 596, Mayslick, KY 41055</b>. At the current price of <b>$102 per share</b>, you are estimated to receive <b>{numShares} shares</b> in this property. Upon confirmation, your order will be processed and recorded in your portfolio. Final share allocation may vary slightly due to processing rounding. Review all property and risk details before placing your order.</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        {!isBuying &&
                            <button disabled={!buyInMode || amount <= 0} 
                            className={`mt-4 w-full py-3 rounded-full text-white font-medium transition ${
                                buyInMode && amount > 0
                                  ? 'bg-primary hover:scale-105'
                                  : 'bg-gray-300 cursor-not-allowed'}`}
                                  onClick={() => setIsBuying(true)}>
                                Review Order
                            </button>
                        }
                        {isBuying &&
                            <div className='space-y-4'>
                                <button className="w-full bg-primary text-white py-4 rounded-full font-medium hover:scale-105 transition" onClick={() => handleBuy()}>
                                    Buy
                                </button>
                            </div>
                        }
                    </div>
                </div>
                { !isBuying &&
                    <div className='p-6'>
                        <button className="w-full border border-primary text-primary py-4 rounded-full font-medium hover:scale-105 transition">
                            + Add to lists
                        </button>
                    </div>
                }
            </div>
        </div>
      </div>
    </div>
  );
}
