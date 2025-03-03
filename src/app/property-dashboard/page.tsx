// pages/property-dashboard.tsx
'use client';

import React, { FC, useState } from 'react';
import { NavbarSearch } from '@/components/common';
import Image from 'next/image';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const PROPERTIES = [
  {
    name: 'Pine Grove Farmland',
    address: '4084 KY Highway 596, Mayslick, KY 41055',
    image: '/images/land.jpg',
    attributes: [
      { label: 'Farmland', icon: '/icons/farmer.svg' },
      { label: '46.8 AC', icon: '/icons/ruler.svg' },
      { label: 'A Zoning', icon: '/icons/agzoning.svg' },
      { label: 'Active', icon: '/icons/active.svg' },
    ],
  },
  {
    name: 'Cedar Hill Pastures',
    address: '7029 Oak View Dr, Lexington, KY 40509',
    image: '/images/land1.jpg',
    attributes: [
      { label: 'Pasture', icon: '/icons/farmer.svg' },
      { label: '32.4 AC', icon: '/icons/ruler.svg' },
      { label: 'I Zoning', icon: '/icons/agzoning.svg' },
      { label: 'Pending', icon: '/icons/active.svg' },
    ],
  },
  {
    name: 'Blue Ridge Valley Lot',
    address: '7029 Oak View Dr, Lexington, KY 40509',
    image: '/images/land4.jpg',
    attributes: [
      { label: 'Farmland', icon: '/icons/farmer.svg' },
      { label: '32.7 AC', icon: '/icons/ruler.svg' },
      { label: 'C Zoning', icon: '/icons/agzoning.svg' },
      { label: 'Active', icon: '/icons/active.svg' },
    ],
  }
];

const OVERVIEW = [
  { label: 'Price per Share', value: '$250.00' },
  { label: 'Shares Remaining', value: '750' },
  { label: 'Shares Sold',      value: '250' },
  { label: 'Current Valuation', value: '$260,000', change: '+4.0%' },
  { label: 'Unique Investors', value: '43' },
];

const TRANSACTIONS = [
  { investor: 'Elena Whitmore', shares: 10, price: '$2,500.00', date: '03/12/2025' },
  { investor: 'Marcus Talley',    shares:  4, price: '$1,000.00', date: '07/29/2025' },
  { investor: 'Jasmine Arroyo',   shares: 36, price: '$9,000.00', date: '10/05/2025' },
  { investor: 'Brandon Kessler',  shares:  2, price: '$500.00',   date: '01/18/2024' },
  { investor: 'Talia Monroe',     shares: 25, price: '$6,250.00', date: '05/02/2020' },
];

const ownershipData = [
  { name: 'Remaining', value: 73.5 },
  { name: 'Sold',      value: 23.5 },
];
const revenueData = [
  { name: 'Total Revenue',       value: 10000 },
  { name: 'Available to Withdraw', value: 2200 },
];
const COLORS = ['#35946D', '#7DC79D'];

const PropertyDashboard: FC = () => {
  const [timeRange, setTimeRange] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = PROPERTIES[selectedIndex];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
    <NavbarSearch />

    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-2xl font-semibold">Property Dashboard</h1>

      <div className="relative">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center bg-white rounded-3xl border border-gray-200 shadow p-4 overflow-hidden cursor-pointer"
        >
          <div className="w-1/4">
            <Image
              src={selected.image}
              alt={selected.name}
              width={300}
              height={200}
              className="object-cover w-full h-36 rounded-3xl"
            />
          </div>
          <div className="flex-1 px-6 space-y-5">
            <h2 className="text-xl font-medium">{selected.name}</h2>
            <p className="text-gray-600">{selected.address}</p>
          </div>
          <div className="flex space-x-4 pr-6">
            {selected.attributes.map(attr => (
              <div
                key={attr.label}
                className="flex flex-col space-y-4 justify-center bg-white border border-gray-200 rounded-3xl p-3 shadow-md w-28 h-28"
              >
                <Image src={attr.icon} alt={attr.label} width={28} height={28} />
                <span className="mt-2 text-[16px]">{attr.label}</span>
              </div>
            ))}
          </div>
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-3xl shadow z-10">
            {PROPERTIES.map((property, idx) => (
              <div
                key={property.name}
                className={`flex items-center p-3 hover:bg-gray-50 rounded-3xl cursor-pointer ${selectedIndex === idx ? 'bg-gray-100' : ''}`}
                onClick={() => {
                  setSelectedIndex(idx);
                  setDropdownOpen(false);
                }}
              >
                <Image
                  src={property.image}
                  alt={property.name}
                  width={80}
                  height={60}
                  className="object-cover w-32 h-20 rounded-lg mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{property.name}</h4>
                  <p className="text-sm text-gray-600">{property.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        <div className="bg-white rounded-3xl shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="border border-gray-300 bg-white rounded-md cursor-pointer p-2 text-sm focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="1y">Last Year</option>
              <option value="6m">Last 6 Months</option>
              <option value="1m">Last Month</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OVERVIEW.map(metric => (
              <div
                key={metric.label}
                className="bg-white rounded-2xl border p-4 flex flex-col"
              >
                <span className="text-sm text-gray-500">{metric.label}</span>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold">{metric.value}</span>
                  {metric.change && (
                    <span className="ml-2 text-sm text-green-600">
                      ({metric.change})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 bg-white rounded-lg rounded-l-3xl border border-gray-200 shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button className="text-sm text-gray-400 border border-gray-400 hover:scale-105 px-3 py-1 rounded-xl shadow transition">
                View All
              </button>
            </div>
            <div className="overflow-y-auto">
              <table className="w-full text-left text-sm divide-y divide-gray-200">
                <thead>
                  <tr>
                    {['Investor','Shares Sold','Price','Date'].map(hdr => (
                      <th key={hdr} className="py-4 px-3 text-gray-600">
                        {hdr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((tx, i) => (
                    <tr key={i} className='border-b h-20 last:border-b-0'>
                      <td className="py-4 px-3">{tx.investor}</td>
                      <td className="py-4 px-3">{tx.shares}</td>
                      <td className="py-4 px-3">{tx.price}</td>
                      <td className="py-4 px-3">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2 flex-stretch">

            <div className="bg-white rounded-lg rounded-tr-3xl border border-gray-200 shadow p-4">
              <h4 className="text-md font-semibold mb-2">Ownership</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={ownershipData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {ownershipData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {ownershipData.map((d, i) => (
                <div key={i} className="flex items-center text-sm">
                  <span
                    className="w-2 h-2 rounded-full inline-block mr-2"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="mr-1">{d.value}%</span>
                  <span className="text-gray-600">{d.name}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg rounded-br-3xl border border-gray-200 shadow p-4">
              <h4 className="text-md font-semibold mb-2">Revenue</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {revenueData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {revenueData.map((d, i) => (
                <div key={i} className="flex items-center text-sm">
                  <span
                    className="w-2 h-2 rounded-full inline-block mr-2"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="mr-1">
                    {i === 0
                      ? `$${d.value.toLocaleString()}`
                      : `$${d.value.toLocaleString()}`}
                  </span>
                  <span className="text-gray-600">
                    {d.name.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDashboard;
