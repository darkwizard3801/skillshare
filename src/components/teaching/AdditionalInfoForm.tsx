import React from 'react';
import { TeachingMethod } from '@/types/teaching';

interface AdditionalInfoFormProps {
  values: {
    bio: string;
    teachingMethodology: TeachingMethod;
    languagesSpoken: string[];
    credentials: string[];
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function AdditionalInfoForm({ values, errors, onChange }: AdditionalInfoFormProps) {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const languages = e.target.value.split(',').map(lang => lang.trim());
    onChange('languagesSpoken', languages);
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const credentials = e.target.value.split(',').map(cred => cred.trim());
    onChange('credentials', credentials);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Additional Information</h2>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Brief Bio (maximum 200 characters)
        </label>
        <textarea
          id="bio"
          value={values.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          maxLength={200}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          {values.bio.length}/200 characters
        </p>
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
        )}
      </div>

      <div>
        <label htmlFor="teachingMethodology" className="block text-sm font-medium text-gray-700">
          Teaching Methodology
        </label>
        <select
          id="teachingMethodology"
          value={values.teachingMethodology}
          onChange={(e) => onChange('teachingMethodology', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        >
          <option value="">Select methodology</option>
          <option value="online">Online Only</option>
          <option value="in-person">In-Person Only</option>
          <option value="both">Both Online and In-Person</option>
        </select>
        {errors.teachingMethodology && (
          <p className="mt-1 text-sm text-red-600">{errors.teachingMethodology}</p>
        )}
      </div>

      <div>
        <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700">
          Languages Spoken (comma-separated)
        </label>
        <input
          type="text"
          id="languagesSpoken"
          value={values.languagesSpoken.join(', ')}
          onChange={handleLanguageChange}
          placeholder="English, Spanish, French"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.languagesSpoken && (
          <p className="mt-1 text-sm text-red-600">{errors.languagesSpoken}</p>
        )}
      </div>

      <div>
        <label htmlFor="credentials" className="block text-sm font-medium text-gray-700">
          Credentials/Certifications (comma-separated)
        </label>
        <input
          type="text"
          id="credentials"
          value={values.credentials.join(', ')}
          onChange={handleCredentialsChange}
          placeholder="Teaching Certificate, Industry Certification"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        />
        {errors.credentials && (
          <p className="mt-1 text-sm text-red-600">{errors.credentials}</p>
        )}
      </div>
    </div>
  );
}