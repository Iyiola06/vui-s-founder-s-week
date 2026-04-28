import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-10 text-venite-green">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center">
          <Image
            src="/venite-logo.png"
            alt="Venite University"
            width={158}
            height={61}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1fr_460px]">
          <section>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-venite-green/50">Founder&apos;s Week 2026</p>
            <h2 className="max-w-2xl font-serif text-5xl leading-[1.05] tracking-tight text-venite-green md:text-7xl">
              Manage events, voting, payments, and site settings.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-venite-green/60">
              The admin dashboard is protected by a secure app session. Sign in to continue.
            </p>
          </section>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
