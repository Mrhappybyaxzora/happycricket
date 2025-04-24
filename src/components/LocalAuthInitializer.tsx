'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, setCurrentUser } from '@/lib/local-auth';

// This component initializes local auth and sets up client-side auth state
const LocalAuthInitializer = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if we have a user saved in localStorage
    const savedUser = getCurrentUser();
    
    // If there's a user in localStorage, make sure they're set as the current user
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, [router]);

  // This is a client-side only component that doesn't render anything
  return null;
};

export default LocalAuthInitializer; 