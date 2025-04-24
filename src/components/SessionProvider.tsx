"use client";

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getCurrentUser, setCurrentUser, clearCurrentUser, authenticateUser, registerUser } from '@/lib/local-auth';

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const authenticatedUser = await authenticateUser({ email, password });
      setUser(authenticatedUser);
      setCurrentUser(authenticatedUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearCurrentUser();
  };

  // Register function - now doesn't automatically log in the user
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Register user but don't log them in
      await registerUser({ name, email, password });
      
      // Previously we were setting the user here (automatically logging them in)
      // Now we just register and let them log in separately
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}; 