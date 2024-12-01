import type { User } from '@/types/user';

// Simulated authentication service
export async function loginUser(email: string, password: string): Promise<User> {
  // In a real app, this would make an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          skills: [],
          achievements: [],
          level: 1,
          experiencePoints: 0,
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

export async function signUpUser(name: string, email: string, password: string): Promise<User> {
  // In a real app, this would make an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && name) {
        resolve({
          id: '1',
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          skills: [],
          achievements: [],
          level: 1,
          experiencePoints: 0,
        });
      } else {
        reject(new Error('Invalid input'));
      }
    }, 1000);
  });
}