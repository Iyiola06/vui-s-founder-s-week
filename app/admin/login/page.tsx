import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './LoginForm';
import { Shield, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-sprf-surface px-6 py-10 text-sprf-charcoal">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sprf-navy hover:text-sprf-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Portal</span>
          </Link>
          <div className="w-8 h-8 rounded-lg bg-sprf-navy text-sprf-gold flex items-center justify-center font-bold text-sm">
            S
          </div>
        </div>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1fr_460px]">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sprf-navy/5 text-sprf-navy text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-sprf-gold" />
              <span>SPRF Administrative Console</span>
            </div>
            <h1 className="max-w-2xl font-serif text-4xl sm:text-6xl leading-[1.08] tracking-tight text-sprf-navy">
              Manage orientation schedules, notices, arrival guides, and settings.
            </h1>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-sprf-muted font-light">
              This console allows SPRF leadership to update orientation schedules, publish emergency arrival circulars, maintain transport terminal details, and oversee incoming fresher inquiries.
            </p>
            <div className="pt-2 text-xs text-sprf-muted flex items-center gap-2 font-mono">
              <span>Venite University</span>
              <span>·</span>
              <span>Student Programmer Representative Forum</span>
            </div>
          </section>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
