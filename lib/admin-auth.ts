export const ADMIN_SESSION_COOKIE = 'venite_admin_session';

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function getAdminEmail() {
  return (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'admin@example.com')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)[0];
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'venite2026';
}

export async function createAdminSessionToken() {
  const secret = process.env.NEXTAUTH_SECRET || 'venite-admin-session';
  const payload = `${getAdminEmail()}:${getAdminPassword()}:${secret}`;
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(payload));

  return toHex(digest);
}

export async function isValidAdminSession(token?: string) {
  if (!token) {
    return false;
  }

  return token === await createAdminSessionToken();
}
