import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  assertWaitlistEmailAllowed,
} from '@/lib/waitlistEmailValidation';
import { subscribeToWaitlist, getWaitlistEmailStatus } from '@/lib/waitlist';
import {
  checkWaitlistRateLimit,
  getClientIp,
  logWaitlistRequest,
} from '@/lib/waitlistRateLimit';
import { verifyTurnstileToken } from '@/lib/turnstile';

const waitlistSubscribeBodySchema = z.object({
  email: z.string(),
  turnstileToken: z.string().min(1, 'Security verification is required'),
  company: z.string().optional(),
});

function honeypotTriggered(company: string | undefined): boolean {
  return Boolean(company?.trim());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSubscribeBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 },
      );
    }

    if (honeypotTriggered(parsed.data.company)) {
      return NextResponse.json({
        status: 'verification_sent',
        message: 'Check your email to confirm your waitlist signup.',
      });
    }

    const clientIp = getClientIp(request);
    const emailCheck = assertWaitlistEmailAllowed(parsed.data.email);

    if (!emailCheck.ok) {
      return NextResponse.json({ error: emailCheck.message }, { status: 400 });
    }

    const rateLimit = await checkWaitlistRateLimit('subscribe', clientIp, emailCheck.email);

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: rateLimit.message }, { status: 429 });
    }

    const turnstileValid = await verifyTurnstileToken(parsed.data.turnstileToken, clientIp);

    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 },
      );
    }

    const emailStatus = await getWaitlistEmailStatus(emailCheck.email);

    if (emailStatus === 'already_verified') {
      await logWaitlistRequest('subscribe', clientIp, emailCheck.email);
      return NextResponse.json({
        status: 'already_verified',
        message: 'This email is already confirmed on the waitlist.',
      });
    }

    const result = await subscribeToWaitlist(emailCheck.email);
    await logWaitlistRequest('subscribe', clientIp, emailCheck.email);

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
