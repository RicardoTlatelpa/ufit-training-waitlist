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
import { verifyTurnstileToken, isTurnstileConfigured } from '@/lib/turnstile';
import {
  isWaitlistMigrationMissingError,
  WAITLIST_MIGRATION_ERROR_MESSAGE,
} from '@/lib/waitlistMigration';
import { WaitlistEmailDeliveryError } from '@/lib/waitlistErrors';

const waitlistSubscribeBodySchema = z.object({
  email: z.string(),
  turnstileToken: z.string().optional(),
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

    const turnstileValid = isTurnstileConfigured()
      ? await verifyTurnstileToken(parsed.data.turnstileToken ?? '', clientIp)
      : true;

    if (isTurnstileConfigured() && !parsed.data.turnstileToken) {
      return NextResponse.json(
        { error: 'Security verification is required. Please complete the check and try again.' },
        { status: 400 },
      );
    }

    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 },
      );
    }

    const emailStatus = await getWaitlistEmailStatus(emailCheck.email);

    if (emailStatus === 'already_verified') {
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

    if (isWaitlistMigrationMissingError(error)) {
      return NextResponse.json({ error: WAITLIST_MIGRATION_ERROR_MESSAGE }, { status: 503 });
    }

    if (error instanceof WaitlistEmailDeliveryError) {
      return NextResponse.json(
        {
          error:
            'Your signup was saved, but we could not send the confirmation email. Please try again in a few minutes.',
          reason: error.message,
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: 'Unable to process your signup right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
