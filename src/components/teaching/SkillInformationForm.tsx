import React from 'react';
import { CATEGORIES } from '@/lib/constants';

interface SkillInformationFormProps {
  values: {
    primarySkill: string;
    yearsOfExperience: number;
    proficiencyLevel: string;
    hourlyRate: number;
    currency: string;
    availableHours: {
      weekdays: boolean;
      weekends: boolean;
    };
  };
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function SkillInformationForm({ values, errors, onChange }: SkillInformationFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skill Information</h2>

      <div>
        <label htmlFor="primarySkill" className="block text-sm font-medium text-gray-700">
          Primary Teaching Skill
        </label>
        <select
          id="primarySkill"
          value={values.primarySkill}
          onChange={(e) => onChange('primarySkill', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        >
          <option value="">Select a skill</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        {errors.primarySkill && (
          <p className="mt-1 text-sm text-red-600">{errors.primarySkill}</p>
        )}
      </div>

      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          min="0"
          value={values.yearsOfExperience || ''}
          onChange={(e) => onChange('yearsOfExperience', parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience}</p>
        )}
      </div>

      <div>
        <label htmlFor="proficiencyLevel" className="block text-sm font-medium text-gray-700">
          Proficiency Level
        </label>
        <select
          id="proficiencyLevel"
          value={values.proficiencyLevel}
          onChange={(e) => onChange('proficiencyLevel', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        >
          <option value="">Select level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        {errors.proficiencyLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.proficiencyLevel}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
            Hourly Rate
          </label>
          <input
            type="number"
            id="hourlyRate"
            min="0"
            step="0.01"
            value={values.hourlyRate || ''}
            onChange={(e) => onChange('hourlyRate', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            value={values.currency}
            onChange={(e) => onChange('currency', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Teaching Hours
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.availableHours.weekdays}
              onChange={(e) => onChange('availableHours', { 
                ...values.availableHours, 
                weekdays: e.target.checked 
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2">Weekdays</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.availableHours.weekends}
              onChange={(e) => onChange('availableHours', { 
                ...values.availableHours, 
                weekends: e.target.checked 
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2">Weekends</span>
          </label>
        </div>
        {errors.availableHours && (
          <p className="mt-1 text-sm text-red-600">{errors.availableHours}</p>
        )}
      </div>
    </div>
  );
}