import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}

export function GlassCard({ className, dark, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 relative overflow-hidden transition-all duration-300',
        dark ? 'glass-dark' : 'glass-card',
        className
      )}
      {...props}
    />
  );
}
