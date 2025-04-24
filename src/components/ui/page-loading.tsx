"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageLoadingProps {
  isLoading: boolean;
}

export function PageLoading({ isLoading }: PageLoadingProps) {
  // Use clientLoaded to prevent hydration mismatch
  const [clientLoaded, setClientLoaded] = useState(false);
  
  // Only show loading UI after component mounts on client
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  // Always render a div with fixed structure but hide it initially
  // This prevents hydration mismatches
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-lg transition-all duration-300",
        // Only show loading animation when both client is loaded AND isLoading is true
        (clientLoaded && isLoading) ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      suppressHydrationWarning
    >
      {/* Only render animation content after client load */}
      {clientLoaded && (
        <div className="flex flex-col items-center justify-center">
          {/* Site name */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Happycricket.com
          </h1>
          
          {/* Simple loading animation */}
          <div className="flex space-x-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      )}
    </div>
  );
} 