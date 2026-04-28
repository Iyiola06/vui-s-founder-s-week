'use client';

import { useActionState } from 'react';
import { LockKeyhole, LogIn } from 'lucide-react';
import { loginAdmin, type LoginState } from './actions';

export function LoginForm() {
  const initialState: LoginState = { error: '' };
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="w-full max-w-md rounded-[28px] border border-venite-green/10 bg-white/75 p-8 shadow-2xl shadow-venite-green/10 backdrop-blur-xl">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-venite-green/10 bg-venite-green/5 text-venite-green">
        <LockKeyhole className="h-6 w-6" />
      </div>

      <div className="mb-8">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-venite-green/50">Admin Access</p>
        <h1 className="font-serif text-4xl tracking-tight text-venite-green">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-venite-green/60">
          Use the admin email and password configured for this app.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-venite-green/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="w-full rounded-2xl border border-transparent bg-venite-green/5 px-5 py-4 text-sm text-venite-green outline-none transition-colors placeholder:text-venite-green/30 focus:border-venite-gold focus:bg-white"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-venite-green/50">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-transparent bg-venite-green/5 px-5 py-4 text-sm text-venite-green outline-none transition-colors placeholder:text-venite-green/30 focus:border-venite-gold focus:bg-white"
            placeholder="Enter admin password"
          />
        </div>
      </div>

      {state.error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-venite-green px-6 py-4 text-sm font-bold text-cream shadow-lg shadow-venite-green/10 transition-all hover:bg-venite-gold disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LogIn className="h-4 w-4" />
        {isPending ? 'Signing in...' : 'Sign in to dashboard'}
      </button>
    </form>
  );
}
