import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation';
import { subscribeToWaitlist } from '@/lib/waitlist';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid email address' },
        { status: 400 },
      );
    }

    const result = await subscribeToWaitlist(parsed.data.email);

    if (result.status === 'already_verified') {
      return NextResponse.json({
        status: 'already_verified',
        message: 'This email is already confirmed on the waitlist.',
      });
    }

    return NextResponse.json({
      status: 'verification_sent',
      message: 'Check your email to confirm your waitlist signup.',
    });
  } catch (error) {
    console.error('[waitlist] subscribe failed', error);
    return NextResponse.json(
      { error: 'Unable to process your signup right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
