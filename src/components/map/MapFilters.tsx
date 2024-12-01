import React from 'react';
import { Button } from '@/components/ui/button';
import type { MapFilters, SkillCategory, SkillLevel } from '@/types/skill-map';
import debounce from 'debounce';

interface MapFiltersProps {
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
}

const CATEGORIES: SkillCategory[] = [
  'programming',
  'design',
  'music',
  'language',
  'fitness',
  'cooking',
  'business',
  'art',
  'crafts',
  'academic',
];

const DISTANCES = [1, 5, 10, 25, 50];
const LEVELS: SkillLevel[] = ['beginner', 'intermediate', 'expert'];

export function MapFilters({ filters, onFiltersChange }: MapFiltersProps) {
  const handleSearchChange = debounce((value: string) => {
    onFiltersChange({ ...filters, search: value });
  }, 300);

  const handleCategoryChange = (category: SkillCategory | 'all') => {
    onFiltersChange({ ...filters, category });
  };

  const handleDistanceChange = (distance: number) => {
    onFiltersChange({ ...filters, distance });
  };

  const handleLevelToggle = (level: SkillLevel) => {
    const newLevels = filters.level.includes(level)
      ? filters.level.filter(l => l !== level)
      : [...filters.level, level];
    onFiltersChange({ ...filters, level: newLevels });
  };

  const handleAvailabilityToggle = (status: string) => {
    const newAvailability = filters.availability.includes(status)
      ? filters.availability.filter(s => s !== status)
      : [...filters.availability, status];
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      distance: 50,
      availability: [],
      level: [],
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div>
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full px-3 py-2 border rounded-md"
          onChange={(e) => handleSearchChange(e.target.value)}
          defaultValue={filters.search}
        />
      </div>

      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filters.category === 'all' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </Button>
          {CATEGORIES.map(category => (
            <Button
              key={category}
              size="sm"
              variant={filters.category === category ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Distance (km)</h3>
        <div className="flex flex-wrap gap-2">
          {DISTANCES.map(distance => (
            <Button
              key={distance}
              size="sm"
              variant={filters.distance === distance ? 'default' : 'outline'}
              onClick={() => handleDistanceChange(distance)}
            >
              {distance}km
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Skill Level</h3>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(level => (
            <Button
              key={level}
              size="sm"
              variant={filters.level.includes(level) ? 'default' : 'outline'}
              onClick={() => handleLevelToggle(level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Availability</h3>
        <div className="flex flex-wrap gap-2">
          {['available', 'busy', 'offline'].map(status => (
            <Button
              key={status}
              size="sm"
              variant={filters.availability.includes(status) ? 'default' : 'outline'}
              onClick={() => handleAvailabilityToggle(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}