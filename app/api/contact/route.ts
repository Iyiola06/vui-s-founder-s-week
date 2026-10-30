import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/data-store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const saved = await saveContactMessage(
      name.trim(),
      email.trim(),
      category || 'General Inquiry',
      message.trim()
    );

    return NextResponse.json({ success: true, messageId: saved.id });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Internal server error processing contact form.' }, { status: 500 });
  }
}
