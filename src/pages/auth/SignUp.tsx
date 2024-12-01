import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useForm } from '@/hooks/useForm';
import { signUpUser } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<SignUpForm>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const user = await signUpUser(values.name, values.email, values.password);
      login(user);
      navigate('/profile');
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {errors.form}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </div>
  );
}