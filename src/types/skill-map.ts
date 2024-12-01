export interface SkillMarker {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  latitude: number;
  longitude: number;
  distance?: number;
  availability: 'available' | 'busy' | 'offline';
  teacherName: string;
  teacherId: string;
}

export type SkillCategory =
  | 'programming'
  | 'design'
  | 'music'
  | 'language'
  | 'fitness'
  | 'cooking'
  | 'business'
  | 'art'
  | 'crafts'
  | 'academic';

export type SkillLevel = 'beginner' | 'intermediate' | 'expert';

export interface MapFilters {
  search: string;
  category: SkillCategory | 'all';
  distance: number;
  availability: string[];
  level: SkillLevel[];
}