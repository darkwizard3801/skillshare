import React from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';

interface LocationFormProps {
  values: {
    latitude: number | null;
    longitude: number | null;
    useAutoLocation: boolean;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function LocationForm({ values, errors, onChange }: LocationFormProps) {
  const { latitude, longitude, loading, error } = useGeolocation();

  const handleAutoLocationToggle = (checked: boolean) => {
    onChange('useAutoLocation', checked);
    if (checked && latitude && longitude) {
      onChange('latitude', latitude);
      onChange('longitude', longitude);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location Services</h2>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={values.useAutoLocation}
            onChange={(e) => handleAutoLocationToggle(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2">Use automatic location detection</span>
        </label>
        {loading && <p className="text-sm text-gray-600 mt-2">Detecting location...</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>

      {!values.useAutoLocation && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              step="any"
              value={values.latitude || ''}
              onChange={(e) => onChange('latitude', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>
          
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              step="any"
              value={values.longitude || ''}
              onChange={(e) => onChange('longitude', parseFloat(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}