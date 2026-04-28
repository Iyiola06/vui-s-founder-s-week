import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { databaseUnavailableResponse, isDatabaseConnectivityError } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const paystackSecretKey = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) return NextResponse.json({}, { status: 200 });

    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const hash = crypto.createHmac('sha512', paystackSecretKey).update(rawBody).digest('hex');
    
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const eventData = JSON.parse(rawBody);

    if (eventData.event === 'charge.success') {
      const { reference, status, amount } = eventData.data;

      if (status !== 'success') return NextResponse.json({ received: true });

      await prisma.$transaction(async (tx) => {
        const transaction = await tx.voteTransaction.findUnique({
          where: { reference },
        });

        if (!transaction || transaction.status === 'success') {
          return;
        }

        const expectedKobo = transaction.amount * 100;
        if (amount >= expectedKobo) {
          await tx.voteTransaction.update({
            where: { reference },
            data: { status: 'success' },
          });

          await tx.candidate.update({
            where: { id: transaction.candidateId },
            data: { voteCount: { increment: transaction.voteQuantity } },
          });
        }
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    if (isDatabaseConnectivityError(error)) {
      return NextResponse.json(databaseUnavailableResponse(), { status: 503 });
    }
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
