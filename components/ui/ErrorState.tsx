import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ className, title = 'Something went wrong', message, onRetry, ...props }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-red-50 border border-red-100 p-6 flex items-start text-red-800',
        className
      )}
      {...props}
    >
      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-sm text-red-700/80 mb-4">{message}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-medium bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-full transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
