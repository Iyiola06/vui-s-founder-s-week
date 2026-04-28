import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-transparent border border-venite-green/20 px-8 py-3.5',
          'text-sm font-medium text-venite-green transition-all duration-300',
          'hover:bg-venite-green/5 hover:border-venite-green/40 hover:-translate-y-0.5',
          'focus:outline-none focus:ring-2 focus:ring-venite-green focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);
SecondaryButton.displayName = 'SecondaryButton';
