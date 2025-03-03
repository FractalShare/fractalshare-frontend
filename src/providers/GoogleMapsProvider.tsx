'use client';

import { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

export const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
