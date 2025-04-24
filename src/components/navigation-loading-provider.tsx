"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PageLoading } from "@/components/ui/page-loading";

interface NavigationLoadingContextType {
  isNavigating: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  startNavigating: (href: string) => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
  isNavigating: false,
  startLoading: () => {},
  stopLoading: () => {},
  startNavigating: () => {},
});

export const useNavigationLoading = () => useContext(NavigationLoadingContext);

// Component that uses the search params hook
function NavigationStateManager({ 
  children, 
  onNavigate 
}: { 
  children: React.ReactNode;
  onNavigate: (isNavigating: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSetInitialLoadingRef = useRef(false);

  // Set loading state on client-side only after hydration
  useEffect(() => {
    if (!hasSetInitialLoadingRef.current) {
      hasSetInitialLoadingRef.current = true;
      // Always show loading on initial page load
      onNavigate(true);
    }
  }, [onNavigate]);

  // Handle initial page load
  useEffect(() => {
    // Function to handle when the page is fully loaded
    const handleInitialLoadComplete = () => {
      // Add a small delay to ensure components are rendered
      const timer = setTimeout(() => {
        onNavigate(false);
      }, 800); // Increased slightly to ensure progress bar animation completes
      return () => clearTimeout(timer);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleInitialLoadComplete();
    } else {
      // Add event listener for when it loads
      window.addEventListener('load', handleInitialLoadComplete);
      return () => window.removeEventListener('load', handleInitialLoadComplete);
    }
  }, [onNavigate]);

  // Track route changes to hide loading when navigation completes
  useEffect(() => {
    // Only run if we're navigating
    if (hasSetInitialLoadingRef.current) {
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Set a new timeout to hide loading after navigation completes
      navigationTimeoutRef.current = setTimeout(() => {
        onNavigate(false);
      }, 600); // Increased to ensure progress bar animation completes
      
      return () => {
        if (navigationTimeoutRef.current) {
          clearTimeout(navigationTimeoutRef.current);
        }
      };
    }
  }, [pathname, searchParams, onNavigate]);

  // Intercept link clicks at the document level with capture phase
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLinkClick = (e: MouseEvent) => {
      // Find if the click was on a link or inside a link
      let target = e.target as HTMLElement | null;
      
      // Traverse up the DOM to find the link
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      // If it's a link and it's an internal link (starts with / or #)
      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');
        const isNavigationLink = target.hasAttribute('data-navigation');
        const isExternalLink = target.getAttribute('rel')?.includes('external');
        const isSamePageHashLink = href?.startsWith('#') && window.location.pathname === pathname;
        
        if (href && (href.startsWith('/') || href.startsWith('#')) && !isExternalLink && !isSamePageHashLink) {
          // Set navigating state immediately, before the navigation actually happens
          onNavigate(true);
        }
      }
    };

    // Also intercept button clicks that might trigger navigation
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navigationButton = target.closest('button[data-navigation]') 
        || target.closest('[role="button"][data-navigation]');
      
      if (navigationButton) {
        // Set navigating state immediately
        onNavigate(true);
        
        // Get the href from the button's data attribute if available
        const href = navigationButton.getAttribute('data-href');
        if (href) {
          e.preventDefault();
          router.push(href);
        }
      }
    };

    // Use capture to intercept events before they reach the elements
    document.addEventListener('click', handleLinkClick, true);
    document.addEventListener('click', handleButtonClick, true);
    
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
      document.removeEventListener('click', handleButtonClick, true);
    };
  }, [pathname, router, onNavigate]);

  return children;
}

export function NavigationLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start with true to show loading on initial page load
  const [isNavigating, setIsNavigating] = useState(true);

  const startLoading = useCallback(() => setIsNavigating(true), []);
  const stopLoading = useCallback(() => setIsNavigating(false), []);
  
  // Function to programmatically navigate with loading
  const startNavigating = useCallback((href: string) => {
    setIsNavigating(true);
    // We don't have router here, so we'll just use window.location
    window.location.href = href;
  }, []);

  return (
    <NavigationLoadingContext.Provider
      value={{ isNavigating, startLoading, stopLoading, startNavigating }}
    >
      {/* Render PageLoading directly - its internal logic will handle hydration issues */}
      <PageLoading isLoading={isNavigating} />
      <Suspense fallback={null}>
        <NavigationStateManager onNavigate={setIsNavigating}>
          {children}
        </NavigationStateManager>
      </Suspense>
    </NavigationLoadingContext.Provider>
  );
} 