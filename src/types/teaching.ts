export type Gender = 'male' | 'female' | 'other';
export type TeachingMethod = 'online' | 'in-person' | 'both';

export interface TeachingProfile {
  personalDetails: {
    fullName: string;
    gender: Gender;
    age: number;
    phoneNumber: string;
    email: string;
  };
  skillInfo: {
    primarySkill: string;
    yearsOfExperience: number;
    proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    hourlyRate: number;
    currency: string;
    availableHours: {
      weekdays: boolean;
      weekends: boolean;
    };
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    useAutoLocation: boolean;
  };
  additionalInfo: {
    bio: string;
    teachingMethodology: TeachingMethod;
    languagesSpoken: string[];
    credentials: string[];
  };
}