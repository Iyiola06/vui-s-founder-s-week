import { Suspense } from 'react';
import { LoadingState } from '@/components/ui/LoadingState';
import SuccessClient from './SuccessClient';

export default function SuccessPage() {
  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans flex items-center justify-center p-6">
      <Suspense fallback={<LoadingState text="Verifying payment..." className="bg-white/40 p-12 rounded-3xl" />}>
        <SuccessClient />
      </Suspense>
    </div>
  );
}
