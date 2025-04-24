"use client";

import React from 'react';

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-background to-primary/20 animate-gradient-slow"></div>
      
      {/* Animated color blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-radial from-blue-500/10 to-transparent opacity-30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-radial from-primary/10 to-transparent opacity-30 blur-3xl animate-pulse-slower"></div>
      </div>
      
      {/* Moving blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-indigo-600/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
} 