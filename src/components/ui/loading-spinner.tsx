import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: {
      outer: "w-8 h-8 border-2",
      inner: "w-5 h-5 border-1.5",
    },
    md: {
      outer: "w-12 h-12 border-2.5",
      inner: "w-8 h-8 border-2",
    },
    lg: {
      outer: "w-16 h-16 border-3",
      inner: "w-10 h-10 border-2.5",
    },
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer ring */}
      <div
        className={cn(
          "absolute rounded-full border-solid border-primary border-t-transparent animate-spin",
          sizeClasses[size].outer
        )}
      />
      
      {/* Inner ring */}
      <div
        className={cn(
          "absolute rounded-full border-solid border-primary/50 border-b-transparent animate-spin-reverse",
          sizeClasses[size].inner
        )}
      />
    </div>
  );
} 