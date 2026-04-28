import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { databaseUnavailableResponse, isDatabaseConnectivityError } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { categoryId, candidateId, voterName, voterEmail, voteQuantity } = body;

    if (!categoryId || !candidateId || !voterEmail || !voteQuantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (voteQuantity < 1) {
      return NextResponse.json({ error: 'Vote quantity must be at least 1' }, { status: 400 });
    }

    // Fetch category and candidate
    const category = await prisma.votingCategory.findUnique({
      where: { id: categoryId },
      include: { candidates: { where: { id: candidateId } } },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    if (!category.isOpen) {
      return NextResponse.json({ error: 'Voting is closed for this category' }, { status: 400 });
    }

    if (category.candidates.length === 0) {
      return NextResponse.json({ error: 'Candidate not found in this category' }, { status: 404 });
    }

    // Calculate amount server-side
    const amountInNGN = category.pricePerVote * voteQuantity;
    const amountInKobo = amountInNGN * 100;

    // Generate unique reference
    const reference = `VENITE-${crypto.randomUUID()}`;

    // Create pending transaction
    await prisma.voteTransaction.create({
      data: {
        reference,
        amount: amountInNGN,
        voteQuantity,
        status: 'pending',
        email: voterEmail,
        candidateId,
      },
    });

    // Initialize Paystack payment
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      return NextResponse.json({ error: 'Paystack configuration error' }, { status: 500 });
    }

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: voterEmail,
        amount: amountInKobo,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/voting/success`,
        metadata: {
          categoryId,
          candidateId,
          voterName,
          voteQuantity,
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message || 'Failed to initialize payment' }, { status: 400 });
    }

    return NextResponse.json({
      authorizationUrl: paystackData.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    if (isDatabaseConnectivityError(error)) {
      return NextResponse.json(databaseUnavailableResponse(), { status: 503 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
