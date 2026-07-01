import { NextResponse } from 'next/server';
import {
  assertWaitlistEmailAllowed,
  type WaitlistEmailAvailability,
} from '@/lib/waitlistEmailValidation';
import { getWaitlistEmailStatus } from '@/lib/waitlist';
import {
  checkWaitlistRateLimit,
  getClientIp,
  logWaitlistRequest,
} from '@/lib/waitlistRateLimit';

export async function GET(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = await checkWaitlistRateLimit('check', clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: rateLimit.message }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') ?? '';
    const format = assertWaitlistEmailAllowed(email);

    if (!format.ok) {
      return NextResponse.json({ error: format.message }, { status: 400 });
    }

    const status: WaitlistEmailAvailability = await getWaitlistEmailStatus(format.email);
    await logWaitlistRequest('check', clientIp, format.email);

    return NextResponse.json({ status });
  } catch (error) {
    console.error('[waitlist] email check failed', error);
    return NextResponse.json(
      { error: 'Unable to validate email right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
