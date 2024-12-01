import React, { useState } from 'react';
import { SkillMap } from '@/components/map/SkillMap';
import { MapFilters } from '@/components/map/MapFilters';
import type { MapFilters as MapFiltersType, SkillMarker } from '@/types/skill-map';

// Mock data - replace with API call in production
const MOCK_MARKERS: SkillMarker[] = [
  {
    id: '1',
    name: 'JavaScript Programming',
    category: 'programming',
    level: 'expert',
    latitude: 51.505,
    longitude: -0.09,
    distance: 2.5,
    availability: 'available',
    teacherName: 'John Doe',
    teacherId: 'teacher1',
  },
  // Add more mock markers as needed
];

export function Explore() {
  const [filters, setFilters] = useState<MapFiltersType>({
    search: '',
    category: 'all',
    distance: 50,
    availability: [],
    level: [],
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Skills Nearby</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
        <MapFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <SkillMap
            markers={MOCK_MARKERS}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}