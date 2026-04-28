import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, isLoading, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-venite-green px-8 py-3.5',
          'text-sm font-medium text-cream shadow-md transition-all duration-300',
          'hover:bg-venite-green-light hover:shadow-lg hover:-translate-y-0.5',
          'focus:outline-none focus:ring-2 focus:ring-venite-green focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);
PrimaryButton.displayName = 'PrimaryButton';
