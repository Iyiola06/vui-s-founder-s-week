'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { LoadingState } from '@/components/ui/LoadingState';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>(reference ? 'verifying' : 'failed');
  const [message, setMessage] = useState(reference ? '' : 'No transaction reference found.');

  useEffect(() => {
    if (!reference) {
      return;
    }

    fetch(`/api/paystack/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setStatus('success');
          setMessage(data.message || 'Your vote has been recorded successfully.');
        } else {
          setStatus('failed');
          setMessage(data.error || data.message || 'Payment verification failed.');
        }
      })
      .catch(() => {
        setStatus('failed');
        setMessage('Network error during verification.');
      });
  }, [reference]);

  if (status === 'verifying') {
    return <LoadingState text="Verifying payment..." className="bg-white/40 p-12 rounded-3xl border border-venite-green/10" />;
  }

  if (status === 'failed') {
    return (
      <GlassCard className="max-w-md w-full bg-white text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif text-venite-green mb-2">Verification Failed</h2>
        <p className="text-venite-green/60 mb-8">{message}</p>
        
        <div className="flex flex-col gap-3 w-full">
          <Link href={reference ? `/voting?reference=${reference}` : '/voting'}>
            <PrimaryButton className="w-full">Try Again / Check Status</PrimaryButton>
          </Link>
          <Link href="/voting">
             <SecondaryButton className="w-full text-venite-green border-venite-green/20 hover:bg-venite-green/5">Back to Voting</SecondaryButton>
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="max-w-md w-full bg-white text-center flex flex-col items-center border border-venite-green/10 shadow-xl shadow-venite-green/5">
      <div className="w-16 h-16 bg-venite-green/5 text-venite-green rounded-full flex items-center justify-center mb-6 border border-venite-green/10">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-venite-green/50 mb-2 block">Payment Confirmed</span>
      <h2 className="text-3xl font-serif text-venite-green mb-2">Vote Recorded</h2>
      <p className="text-sm text-venite-green/60 mb-8 max-w-[280px]">
        {message} Thank you for contributing to the Venite University Founder&apos;s Week Dinner & Awards.
      </p>
      
      <div className="bg-venite-green/5 rounded-xl p-4 w-full mb-8 text-left border border-venite-green/10">
         <p className="text-[10px] uppercase font-bold tracking-widest text-venite-green/50 mb-1">Transaction Ref</p>
         <p className="font-mono text-xs text-venite-green mb-4 truncate">{reference}</p>
         
         <p className="text-[10px] uppercase font-bold tracking-widest text-venite-green/50 mb-1">Status</p>
         <p className="font-medium text-sm text-venite-green flex items-center">Verified <CheckCircle2 className="w-3 h-3 ml-1 text-green-600" /></p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/voting">
          <PrimaryButton className="w-full">Vote Again / View Results</PrimaryButton>
        </Link>
        <Link href="/dinner-night">
           <button className="text-[10px] font-bold uppercase tracking-widest text-venite-green/60 hover:text-venite-green mt-4 transition-colors">View Dinner Details</button>
        </Link>
      </div>
    </GlassCard>
  );
}
