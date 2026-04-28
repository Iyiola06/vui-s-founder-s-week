import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ className, title, subtitle, align = 'center', ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col mb-12',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      {...props}
    >
      <h2 className="text-4xl md:text-5xl font-playfair font-medium text-venite-green mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink/60 max-w-2xl text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
