import type { Metadata } from 'next';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { AlertCircle } from 'lucide-react';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Payment Not Completed',
  description: "Founder's Week payment status page for incomplete voting transactions.",
  path: '/voting/failed',
  noIndex: true,
});

export default function FailedPage() {
  return (
    <div className="w-full mx-auto min-h-screen bg-cream text-venite-green font-sans flex items-center justify-center p-6">
      <GlassCard className="max-w-md w-full bg-white text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif text-venite-green mb-2">Payment Not Completed</h2>
        <p className="text-venite-green/60 mb-8 text-sm">
          Your payment could not be processed or was cancelled. No votes have been recorded.
        </p>
        
        <div className="flex flex-col gap-3 w-full">
          <Link href="/voting">
            <PrimaryButton className="w-full">Try Again</PrimaryButton>
          </Link>
          <Link href="/">
             <button className="text-sm font-bold uppercase tracking-widest text-venite-green/60 hover:text-venite-green mt-4 transition-colors">Back to Home</button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
