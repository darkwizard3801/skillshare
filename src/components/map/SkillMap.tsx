import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useGeolocation } from '@/hooks/useGeolocation';
import type { SkillMarker, MapFilters } from '@/types/skill-map';
import { getCategoryIcon } from '@/lib/map-utils';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface SkillMapProps {
  markers: SkillMarker[];
  filters: MapFilters;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export function SkillMap({ markers, filters }: SkillMapProps) {
  const { latitude, longitude, loading, error } = useGeolocation();

  const filteredMarkers = useMemo(() => {
    return markers.filter(marker => {
      const matchesSearch = marker.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || marker.category === filters.category;
      const matchesDistance = marker.distance ? marker.distance <= filters.distance : true;
      const matchesAvailability = filters.availability.length === 0 || 
        filters.availability.includes(marker.availability);
      const matchesLevel = filters.level.length === 0 || 
        filters.level.includes(marker.level);

      return matchesSearch && matchesCategory && matchesDistance && 
        matchesAvailability && matchesLevel;
    });
  }, [markers, filters]);

  if (loading) {
    return <div className="h-[600px] flex items-center justify-center">Loading map...</div>;
  }

  if (error || !latitude || !longitude) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        Error loading map: {error || 'Could not get location'}
      </div>
    );
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      className="h-[600px] w-full rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={[latitude, longitude]} />
      
      {filteredMarkers.map(marker => (
        <Marker
          key={marker.id}
          position={[marker.latitude, marker.longitude]}
          icon={getCategoryIcon(marker.category)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{marker.name}</h3>
              <p className="text-sm text-gray-600">
                Teacher: {marker.teacherName}
              </p>
              <p className="text-sm text-gray-600">
                Level: {marker.level}
              </p>
              <p className="text-sm text-gray-600">
                Distance: {marker.distance?.toFixed(1)}km
              </p>
              <button className="mt-2 text-sm text-primary hover:text-primary/80">
                Request Session
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}