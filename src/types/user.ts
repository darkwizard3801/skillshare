export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: Skill[];
  achievements: Achievement[];
  level: number;
  experiencePoints: number;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  teachingPreference: 'online' | 'in-person' | 'both';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}