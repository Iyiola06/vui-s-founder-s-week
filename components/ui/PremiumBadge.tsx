import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PremiumBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green' | 'outline';
}

export function PremiumBadge({ className, variant = 'gold', children, ...props }: PremiumBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
        {
          'bg-venite-gold/10 text-venite-gold border border-venite-gold/20': variant === 'gold',
          'bg-venite-green/10 text-venite-green border border-venite-green/20': variant === 'green',
          'border border-ink/10 text-ink/70': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
