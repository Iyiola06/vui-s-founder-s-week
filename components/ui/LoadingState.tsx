import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function LoadingState({ className, text = 'Loading...', ...props }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-venite-green/60 animate-pulse',
        className
      )}
      {...props}
    >
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-sm tracking-wide uppercase font-medium">{text}</p>
    </div>
  );
}
