'use client';

import { useEffect, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import AboutPropertyModal, { AboutPropertyValues } from '@/components/landowner/AboutPropertyModal';
import { useRouter } from 'next/navigation';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useGoogleMaps } from '@/providers/GoogleMapsProvider';
import Image from 'next/image';

export default function LandownerLanding() {
  const router = useRouter();
  const [percent, setPercent] = useState(1);
  const payout = 2000 * (percent / 1);
  const { isLoaded } = useGoogleMaps();

  const [showModal, setShowModal] = useState(false);
  const [valDetails, setValDetails] = useState<AboutPropertyValues>({
    location: 'Loading...',
    type: 'Undeveloped',
    acres: 0,
  });

  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    gestureHandling: 'none',
    zoomControl: false,
    draggable: false,
    keyboardShortcuts: false,
    clickableIcons: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setCurrentPosition(coords);

      // Reverse geocode to get the city name
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      const address = data.results?.[0]?.address_components?.find((comp: { types: string | string[]; }) =>
        comp.types.includes('locality') || comp.types.includes('administrative_area_level_1')
      )?.long_name;

      if (address) {
        setValDetails((prev) => ({
          ...prev,
          location: address,
        }));
      }
    });
  }, []);

  const handleUpdate = (vals: AboutPropertyValues) => {
    setValDetails(vals);
  };

  const handleClick = () => {
    router.push('/landowner-landing/introduction');
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4">
        <Image className='cursor-pointer' onClick={() => router.push('/home')} src="/images/fs.svg" alt="Fractal Share" width={150} height={150} />
        <button onClick={handleClick} className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:scale-105 transition">
          List Now
        </button>
      </nav>

      <section className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-10">
        <div className="w-full max-w-md flex flex-col items-start lg:items-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-left mb-8">
            Your property could
            <br /> make <span className="whitespace-nowrap">${payout.toLocaleString()}</span>{' '}
            on Fractal Share
          </h1>

          <p className="text-xs font-medium text-center lg:text-left mb-1">
            {percent}% ≈ ${payout.toLocaleString()}
          </p>

          <input
            type="range"
            min={1}
            max={100}
            value={percent}
            step={1}
            onChange={(e) => setPercent(Number(e.target.value))}
            className="w-full accent-primary border-none mb-8"
          />

          <div
            onClick={() => setShowModal(true)}
            className="flex flex-row items-center justify-start gap-4 cursor-pointer rounded-full border border-gray-300 p-4 text-md"
          >
            <PiMagnifyingGlass size={20} className="text-primary" />
            {valDetails.location} · {valDetails.type} land · {valDetails.acres} acres
          </div>
        </div>

        {/* Map Preview Box */}
        <div className="w-full max-w-md h-[420px] rounded-2xl border border-black">
          {isLoaded && currentPosition ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '15px' }}
              center={currentPosition}
              zoom={12}
              options={mapOptions}
            >
              <Marker position={currentPosition} />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full text-lg font-semibold text-gray-800">
              Loading Map...
            </div>
          )}
        </div>
      </section>

      <AboutPropertyModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUpdate}
        initial={valDetails}
      />
    </main>
  );
}
