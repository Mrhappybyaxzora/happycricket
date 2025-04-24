"use client";

import React, { useState, useEffect } from 'react';

interface TypedTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
}

export function TypedText({ text, typingSpeed = 100, className = "" }: TypedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, typingSpeed]);
  
  return (
    <div className={`inline-block ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
} 