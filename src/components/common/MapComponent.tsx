'use client';

import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '@/providers/GoogleMapsProvider';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.0902,
  lng: -95.7129,
};

const markers = [
  { id: 1, position: { lat: 41.5938, lng: -122.6371 } },
  { id: 2, position: { lat: 30.2672, lng: -97.7431 } },
  { id: 3, position: { lat: 40.8136, lng: -96.6852 } },
  { id: 4, position: { lat: 35.7210, lng: -79.1780 } },
];

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  restriction: {
    latLngBounds: {
      north: 49.3845,
      south: 24.3963,
      west: -125.0,
      east: -66.9346,
    },
    strictBounds: true,
  },
};

export default function MapComponent() {
  const { isLoaded } = useGoogleMaps(); // ✅ shared loader

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      options={mapOptions}
    >
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position} />
      ))}
    </GoogleMap>
  );
}
