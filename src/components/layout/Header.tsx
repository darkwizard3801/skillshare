import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { BookOpen, MessageCircle, User } from 'lucide-react';

export function Header() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkillSwap</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">
              Explore Skills
            </Link>
            <Link to="/teach" className="text-gray-600 hover:text-gray-900">
              Teach
            </Link>
            <Link to="/learn" className="text-gray-600 hover:text-gray-900">
              Learn
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/messages">
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}