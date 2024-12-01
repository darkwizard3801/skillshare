import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useForm } from '@/hooks/useForm';
import { loginUser } from '@/lib/auth';
import { useAuthStore } from '@/store/useAuthStore';

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const user = await loginUser(values.email, values.password);
      login(user);
      navigate('/profile');
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {errors.form}
            </div>
          )}
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
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  );
}