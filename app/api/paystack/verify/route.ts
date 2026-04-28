import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { databaseUnavailableResponse, isDatabaseConnectivityError } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
    }

    // Verify through Paystack API
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      return NextResponse.json({ error: 'Paystack configuration error' }, { status: 500 });
    }

    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
      },
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message || 'Payment verification failed at Paystack' }, { status: 400 });
    }

    const { status, amount } = paystackData.data;

    // Use a transaction to ensure idempotency
    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.voteTransaction.findUnique({
        where: { reference },
      });

      if (!transaction) {
        throw new Error('Transaction not found in database');
      }

      if (transaction.status === 'success') {
        return { message: 'Transaction already verified', status: 'success' };
      }

      if (status === 'success') {
        // Double check amount matches (Paystack returns amount in kobo)
        const expectedKobo = transaction.amount * 100;
        if (amount < expectedKobo) {
          await tx.voteTransaction.update({
            where: { reference },
            data: { status: 'failed' },
          });
          throw new Error('Amount mismatch');
        }

        // Update transaction
        await tx.voteTransaction.update({
          where: { reference },
          data: { status: 'success' },
        });

        // Increment candidate votes
        await tx.candidate.update({
          where: { id: transaction.candidateId },
          data: { voteCount: { increment: transaction.voteQuantity } },
        });

        return { message: 'Vote recorded successfully', status: 'success' };
      } else {
        await tx.voteTransaction.update({
          where: { reference },
          data: { status: 'failed' },
        });
        return { message: 'Payment failed', status: 'failed' };
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payment verification error:', error);
    if (isDatabaseConnectivityError(error)) {
      return NextResponse.json(databaseUnavailableResponse(), { status: 503 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}
