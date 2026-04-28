import * as React from 'react';
import { cn } from '@/lib/utils';
import { Ghost } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ className, title, description, icon, action, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center rounded-3xl glass-card border-dashed border-2 border-venite-green/20',
        className
      )}
      {...props}
    >
      <div className="mb-6 text-venite-green/40 p-4 bg-venite-green/5 rounded-full">
        {icon || <Ghost className="w-10 h-10" />}
      </div>
      <h3 className="text-xl font-playfair font-medium text-venite-green mb-2">{title}</h3>
      <p className="text-ink/60 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
