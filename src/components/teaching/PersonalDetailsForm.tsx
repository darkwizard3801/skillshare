import React from 'react';
import { Gender } from '@/types/teaching';

interface PersonalDetailsFormProps {
  values: {
    fullName: string;
    gender: Gender;
    age: number;
    phoneNumber: string;
    email: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string | number) => void;
}

export function PersonalDetailsForm({ values, errors, onChange }: PersonalDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Details</h2>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={values.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          value={values.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          id="age"
          min="18"
          value={values.age || ''}
          onChange={(e) => onChange('age', parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number (with country code)
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          placeholder="+1234567890"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
    </div>
  );
}