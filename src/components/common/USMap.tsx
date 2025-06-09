'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import Image from 'next/image';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

type LandType = 'farmland' | 'undeveloped';

type Location = {
  id: number;
  name: string;
  county: string;
  coordinates: [number, number];
  invested: number;
  currentValue: number;
  roi: string;
  status: string;
  available: string;
  owned: number;
  image: string;
  type: LandType;
};

const locations: Location[] = [
  {
    id: 1,
    name: 'Pine Grove Farmland',
    county: 'Siskiyou County, California',
    coordinates: [-122.6371, 41.5938],
    invested: 3300,
    currentValue: 3900,
    roi: '+18.18%',
    status: 'Active',
    available: '25%',
    owned: 4.1,
    image: '/images/land6.jpg',
    type: 'farmland',
  },
  {
    id: 2,
    name: 'Ranch Creek Estate',
    county: 'Travis County, Texas',
    coordinates: [-97.7431, 30.2672],
    invested: 2700,
    currentValue: 3100,
    roi: '+14.81%',
    status: 'Active',
    available: '18%',
    owned: 5.3,
    image: '/images/land3.jpg',
    type: 'undeveloped',
  },
  {
    id: 3,
    name: 'Green Plains',
    county: 'Lancaster County, Nebraska',
    coordinates: [-96.6852, 40.8136],
    invested: 2000,
    currentValue: 2500,
    roi: '+25.00%',
    status: 'Active',
    available: '30%',
    owned: 3.0,
    image: '/images/land5.jpg',
    type: 'undeveloped',
  },
  {
    id: 4,
    name: 'Willow Ridge Farmland',
    county: 'Chatham County, North Carolina',
    coordinates: [-79.1780, 35.7210],
    invested: 2800,
    currentValue: 3400,
    roi: '+21.43%',
    status: 'Active',
    available: '22%',
    owned: 4.6,
    image: '/images/land4.jpg',
    type: 'farmland',
  }
];

export default function USMap() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setActiveLocation(null);
        setModalPosition(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle marker hover
  const handleMarkerHover = (
    loc: Location,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    const bounds = (event.target as SVGElement).getBoundingClientRect();
    setModalPosition({
      x: bounds.right + 10,
      y: bounds.top + window.scrollY - 20,
    });
    setActiveLocation(loc);
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: '#4b5254', stroke: '#FFFFFF', strokeWidth: 0.75 },
                  hover: { fill: '#4b5254', stroke: '#FFFFFF', strokeWidth: 0.75 },
                  pressed: { fill: '#4b5254', stroke: '#FFFFFF', strokeWidth: 0.75 },
                }}
              />
            ))
          }
        </Geographies>

        {locations.map((loc) => (
          <Marker key={loc.id} coordinates={loc.coordinates}>
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={(e) => handleMarkerHover(loc, e)}
              onMouseLeave={() => {
                setActiveLocation(null);
                setModalPosition(null);
              }}
            >
              {loc.id % 2 === 0 ? (
                <circle
                  r={6}
                  fill={loc.type === 'farmland' ? '#5CD597' : '#F7A928'}
                />
              ) : (
                <>
                  <circle
                    r={6}
                    fill="transparent"
                    stroke={loc.type === 'farmland' ? '#5CD597' : '#F7A928'}
                    strokeWidth={1.5}
                  />
                  <circle
                    r={3.5}
                    fill={loc.type === 'farmland' ? '#5CD597' : '#F7A928'}
                  />
                </>
              )}
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {activeLocation && modalPosition && (
        <div
          ref={modalRef}
          className="absolute bg-white rounded-3xl shadow-lg p-4 w-[300px] z-30"
          style={{
            top: `${modalPosition.y - 400}px`,
            left: `${modalPosition.x - 50}px`,
          }}
        >
          <div className="relative w-full h-[100px] rounded-xl overflow-hidden mb-2">
            <Image
              src={activeLocation.image}
              alt={activeLocation.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h3 className="font-bold text-[14px] leading-tight">{activeLocation.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{activeLocation.county}</p>

          <div className="text-xs grid grid-cols-3 gap-2 mb-2">
            <div>
              <p className="text-tertiary">Invested</p>
              <p className="font-semibold">${activeLocation.invested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-tertiary">Current Value</p>
              <p className="text-[#6BBF6B] font-semibold">${activeLocation.currentValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-tertiary">ROI</p>
              <p className="text-[#6BBF6B] font-semibold">{activeLocation.roi}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between text-xs">
            <div className="flex justify-between">
              <span className="text-primary font-semibold">{activeLocation.status}</span>
              <span>{activeLocation.available} Available</span>
            </div>
            <div className="relative mt-3 h-5 bg-primary rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-secondary"
                style={{ width: `${activeLocation.owned}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                {activeLocation.owned}% owned
              </span>
            </div>
          </div>

          <button
            className="text-sm text-gray-500 hover:text-gray-700 absolute top-2 right-3"
            onClick={() => {
              setActiveLocation(null);
              setModalPosition(null);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
