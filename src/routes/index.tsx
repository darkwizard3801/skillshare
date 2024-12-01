import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Explore } from '@/pages/Explore';
import { Teach } from '@/pages/Teach';
import { Learn } from '@/pages/Learn';
import { Profile } from '@/pages/Profile';
import { Messages } from '@/pages/Messages';
import { Login } from '@/pages/auth/Login';
import { SignUp } from '@/pages/auth/SignUp';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/teach" element={<Teach />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}