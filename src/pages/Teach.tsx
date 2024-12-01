import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PersonalDetailsForm } from '@/components/teaching/PersonalDetailsForm';
import { SkillInformationForm } from '@/components/teaching/SkillInformationForm';
import { LocationForm } from '@/components/teaching/LocationForm';
import { AdditionalInfoForm } from '@/components/teaching/AdditionalInfoForm';
import type { TeachingProfile } from '@/types/teaching';

export function Teach() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TeachingProfile>({
    personalDetails: {
      fullName: '',
      gender: 'male',
      age: 0,
      phoneNumber: '',
      email: '',
    },
    skillInfo: {
      primarySkill: '',
      yearsOfExperience: 0,
      proficiencyLevel: 'beginner',
      hourlyRate: 0,
      currency: 'USD',
      availableHours: {
        weekdays: false,
        weekends: false,
      },
    },
    location: {
      latitude: null,
      longitude: null,
      useAutoLocation: true,
    },
    additionalInfo: {
      bio: '',
      teachingMethodology: 'online',
      languagesSpoken: [],
      credentials: [],
    },
  });

  const handleChange = (section: keyof TeachingProfile, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.personalDetails.fullName) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.personalDetails.email) {
          newErrors.email = 'Email is required';
        }
        if (formData.personalDetails.age < 18) {
          newErrors.age = 'You must be 18 or older';
        }
        break;
      case 2:
        if (!formData.skillInfo.primarySkill) {
          newErrors.primarySkill = 'Primary skill is required';
        }
        if (!formData.skillInfo.availableHours.weekdays && !formData.skillInfo.availableHours.weekends) {
          newErrors.availableHours = 'Please select at least one availability option';
        }
        break;
      case 3:
        if (!formData.location.useAutoLocation && 
            (formData.location.latitude === null || formData.location.longitude === null)) {
          newErrors.location = 'Please provide location information';
        }
        break;
      case 4:
        if (!formData.additionalInfo.bio) {
          newErrors.bio = 'Bio is required';
        }
        if (formData.additionalInfo.languagesSpoken.length === 0) {
          newErrors.languagesSpoken = 'Please specify at least one language';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        // In a real app, this would make an API call
        console.log('Form submitted:', formData);
        // Redirect to profile or success page
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Teaching Profile</h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-1/4 h-2 rounded ${
                step <= currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Personal Details</span>
          <span>Skill Information</span>
          <span>Location</span>
          <span>Additional Info</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {currentStep === 1 && (
          <PersonalDetailsForm
            values={formData.personalDetails}
            errors={errors}
            onChange={(field, value) => handleChange('personalDetails', field, value)}
          />
        )}

        {currentStep === 2 && (
          <SkillInformationForm
            values={formData.skillInfo}
            errors={errors}
            onChange={(field, value) => handleChange('skillInfo', field, value)}
          />
        )}

        {currentStep === 3 && (
          <LocationForm
            values={formData.location}
            errors={errors}
            onChange={(field, value) => handleChange('location', field, value)}
          />
        )}

        {currentStep === 4 && (
          <AdditionalInfoForm
            values={formData.additionalInfo}
            errors={errors}
            onChange={(field, value) => handleChange('additionalInfo', field, value)}
          />
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Submit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}