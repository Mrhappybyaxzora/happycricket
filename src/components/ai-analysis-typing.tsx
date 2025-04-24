"use client";

import React, { useState, useEffect } from 'react';
import { TypedText } from './typed-text';

export function AiAnalysisTyping() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const aiPredictions = [
    "Analyzing batting performance patterns...",
    "Pitch conditions suggest swing bowling advantage...",
    "Player fatigue analysis predicts 12% performance drop...",
    "Historical data indicates 73% win probability...",
    "Weather forecast shows 8% impact on batting conditions..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % aiPredictions.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/30 backdrop-blur-sm px-3 py-2 rounded border border-white/10 w-full max-w-[90%] mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"></div>
        <span className="text-[10px] text-white/80 uppercase tracking-wider">AI Analyzing</span>
      </div>
      <TypedText 
        key={currentTextIndex} 
        text={aiPredictions[currentTextIndex]} 
        typingSpeed={30} 
        className="text-xs text-white/90" 
      />
    </div>
  );
} 