'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import type { Answerable } from '@/types/QuestionContracts';
import { FiMapPin } from 'react-icons/fi';
import { useGoogleMaps } from '@/providers/GoogleMapsProvider'; // 👈 shared loader

/* ------------------------------------------------------------------ */
/* types                                                               */
export interface AddressForm {
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

/* ------------------------------------------------------------------ */
/* component                                                           */
export default function QuestionThree({
  value,
  onAnswered,
}: Answerable<AddressForm | null>) {
  const [form, setForm] = useState<AddressForm>(
    value ?? {
      country: 'United States - US',
      street: '',
      city: '',
      state: '',
      zip: '',
    }
  );

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const updateField = <K extends keyof AddressForm>(key: K, v: AddressForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const cbRef = useRef<typeof onAnswered>(undefined);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  const required: (keyof AddressForm)[] = ['street', 'city', 'state', 'zip'];
  const completed = required.every((k) => form[k].trim() !== '');

  useEffect(() => {
    cbRef.current?.(completed ? form : null);
  }, [completed, form]);

  useEffect(() => {
    if (!completed) return;

    const fullAddress = `${form.street}, ${form.city}, ${form.state}, ${form.zip}`;

    const geocode = async () => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          fullAddress
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const loc = data.results[0].geometry.location;
        setCoords({ lat: loc.lat, lng: loc.lng });
      } else {
        toast.error('Failed to locate address on map.');
        setCoords(null);
      }
    };

    geocode();
  }, [completed, form]);

  const { isLoaded } = useGoogleMaps(); // ✅ shared loader

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    gestureHandling: 'none',
    zoomControl: false,
    draggable: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
  };

  useEffect(() => {
    if (value) {
      setForm(value);
    }
  }, [value]);

  return (
    <section className="mx-auto max-w-3xl px-4 text-center">
      <h2 className="mb-10 text-3xl font-extrabold">Confirm your address</h2>

      <div className="flex flex-row gap-6">
        {/* Input fields */}
        <div className="overflow-hidden rounded-xl border border-gray-300 w-full">
          {(
            [
              { id: 'country', label: 'Country / region', readOnly: true, placeholder: '' },
              { id: 'street', label: 'Street Address', readOnly: false, placeholder: 'Enter street' },
              { id: 'city', label: 'City / town', readOnly: false, placeholder: 'Enter city' },
              { id: 'state', label: 'State / territory', readOnly: false, placeholder: 'Enter state' },
              { id: 'zip', label: 'ZIP code', readOnly: false, placeholder: 'Enter ZIP' },
            ] as const
          ).map(({ id, label, readOnly, placeholder }) => (
            <div
              key={id}
              className="relative flex flex-col items-start px-4 py-4 border-b last:border-b-0"
            >
              <label className="mb-1 text-xs font-medium text-gray-500">
                {label}
              </label>
              <input
                type="text"
                readOnly={readOnly}
                value={form[id]}
                placeholder={placeholder}
                onChange={(e) => updateField(id, e.target.value)}
                className={`w-full bg-transparent text-sm outline-none ${
                  readOnly ? 'cursor-default' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Map display */}
        <div className="flex w-full items-center justify-center rounded-xl border border-gray-300 text-gray-600 h-[380px]">
          {isLoaded && coords ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={14}
              options={mapOptions}
            >
              <Marker position={coords} />
            </GoogleMap>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FiMapPin size={42} className="mb-2 text-primary" />
              <span className="text-sm font-medium">Map will appear after address is complete</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
