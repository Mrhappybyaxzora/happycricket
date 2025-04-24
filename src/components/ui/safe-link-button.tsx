import * as React from "react"
import Link from "next/link"
import { Button } from "./button"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"
import { useNavigationLoading } from '../navigation-loading-provider'
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface SafeLinkButtonProps extends Omit<React.ComponentProps<typeof Link>, 'className' | 'children'>, 
  VariantProps<typeof buttonVariants> {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * A component that safely combines Button and Link to prevent hydration mismatches
 * Use this component instead of using Button with asChild prop and Link
 */
export function SafeLinkButton({
  href,
  children,
  className,
  variant = 'default',
  size = 'default',
  onClick,
  ...props
}: SafeLinkButtonProps) {
  const loadingContext = useNavigationLoading();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Trigger the loading state for all link clicks
    if (loadingContext?.startLoading) {
      loadingContext.startLoading();
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-navigation="true"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
} 