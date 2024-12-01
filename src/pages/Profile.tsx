import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export function Profile() {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}