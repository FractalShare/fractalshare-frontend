'use client';

import { useEffect, useRef, useState } from 'react';
import { BiMap } from 'react-icons/bi';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import { useGoogleMaps } from '@/providers/GoogleMapsProvider';
import type { Answerable } from '@/types/QuestionContracts';
import type { AddressForm } from './QuestionThree';
import type { LandType } from './QuestionOne';

import {
  LuLandmark,
  LuTreePine,
  LuTentTree,
  LuWaves,
  LuSunMedium,
  LuFlower2,
  LuBuilding,
  LuTrees,
} from 'react-icons/lu';
import { PiFarm, PiBarnDuotone } from 'react-icons/pi';
import { MdOutlineForest } from 'react-icons/md';
import { BiTargetLock } from 'react-icons/bi';
import { renderToStaticMarkup } from 'react-dom/server';

/* ------------------------------------------------------------------ */
/* constants                                                           */

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  gestureHandling: 'none',
  zoomControl: false,
  draggable: false,
  keyboardShortcuts: false,
  clickableIcons: false,
  styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
};

const LAND_ICON_MAP: Record<LandType, JSX.Element> = {
  Farmland: <PiFarm color="white" size={24} />,
  Forest: <MdOutlineForest color="white" size={24} />,
  'Undeveloped land': <LuTrees color="white" size={24} />,
  Recreational: <LuTentTree color="white" size={24} />,
  Timberland: <LuTreePine color="white" size={24} />,
  'Hunting land': <BiTargetLock color="white" size={24} />,
  Waterfront: <LuWaves color="white" size={24} />,
  Ranch: <PiBarnDuotone color="white" size={24} />,
  Desert: <LuSunMedium color="white" size={24} />,
  Meadow: <LuFlower2 color="white" size={24} />,
  'Mixed-use land': <LuBuilding color="white" size={24} />,
  Other: <LuLandmark color="white" size={24} />,
};

/* ------------------------------------------------------------------ */
/* helper                                                              */

function getSVGMarker(landType: LandType): google.maps.Icon {
  const iconMarkup = renderToStaticMarkup(LAND_ICON_MAP[landType]);

  const svg = `
    <svg width="40" height="54" viewBox="0 0 40 54" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C8.954 0 0 8.954 0 20C0 33.333 20 54 20 54C20 54 40 33.333 40 20C40 8.954 31.046 0 20 0Z" fill="#1db954"/>
      <g transform="translate(8, 14)">
        ${iconMarkup}
      </g>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(40, 54),
    anchor: new window.google.maps.Point(20, 54),
  };
}

function parseAddressComponents(components: google.maps.GeocoderAddressComponent[]): AddressForm {
  const get = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name || '';

  return {
    street: `${get('street_number')} ${get('route')}`.trim(),
    city: get('locality'),
    state: get('administrative_area_level_1'),
    zip: get('postal_code'),
    country: get('country') || 'United States - US',
  };
}

/* ------------------------------------------------------------------ */
/* props                                                               */

interface Props extends Answerable<AddressForm> {
  selectedLandType: LandType | null;
}

/* ------------------------------------------------------------------ */
/* component                                                           */

export default function QuestionTwo({ value, onAnswered, selectedLandType }: Props) {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapError, setMapError] = useState(false);

  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const { isLoaded } = useGoogleMaps();

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const fetchSuggestions = (input: string) => {
    if (!autocompleteServiceRef.current || !input.trim()) return;
    autocompleteServiceRef.current.getPlacePredictions(
      {
        input,
        types: ['address'],
        componentRestrictions: { country: 'us' },
      },
      (predictions) => {
        setSuggestions(predictions?.slice(0, 5) || []);
      }
    );
  };

  const geocodeAddress = (addressStr: string) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ address: addressStr }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const result = results[0];
        const loc = result.geometry.location;
        const parsed = parseAddressComponents(result.address_components);
        setCoords({ lat: loc.lat(), lng: loc.lng() });
        setAddress(result.formatted_address);
        setSuggestions([]);
        setMapError(false);
        onAnswered?.(parsed);
      } else {
        setMapError(true);
        toast.error('Address is invalid');
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAddress(input);
    fetchSuggestions(input);
  };

  const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    geocodeAddress(prediction.description);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <h2 className="mb-12 text-3xl font-extrabold">What is the address of your land?</h2>

      <div className="relative rounded-xl border border-gray-300 p-8 text-left">
        <div className="relative mb-4">
          <BiMap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full rounded-3xl border border-gray-300 py-3 pl-12 pr-4 text-sm placeholder-gray-500 focus:border-primary focus:ring-0"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 rounded-3xl border border-gray-200 bg-white shadow-lg z-10">
              {suggestions.map((s) => (
                <li
                  key={s.place_id}
                  onClick={() => handleSelect(s)}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-3xl last:rounded-b-3xl"
                >
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-80 rounded-3xl overflow-hidden">
          {isLoaded && coords ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coords}
              zoom={14}
              options={mapOptions}
            >
              <Marker
                position={coords}
                icon={selectedLandType ? getSVGMarker(selectedLandType) : undefined}
              />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Map will appear once address is inserted
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
