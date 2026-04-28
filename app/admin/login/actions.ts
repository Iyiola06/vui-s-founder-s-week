'use server';

import { ADMIN_SESSION_COOKIE, createAdminSessionToken, getAdminEmail, getAdminPassword } from '@/lib/admin-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type LoginState = {
  error: string;
};

export async function loginAdmin(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const expectedEmail = getAdminEmail().toLowerCase();
  const expectedPassword = getAdminPassword();

  if (!email || !password) {
    return { error: 'Enter your admin email and password.' };
  }

  if (email !== expectedEmail || password !== expectedPassword) {
    return { error: 'Invalid admin email or password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, await createAdminSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/admin',
  });

  redirect('/admin');
}
