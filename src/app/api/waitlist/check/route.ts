import { NextResponse } from 'next/server';
import {
  validateWaitlistEmailFormat,
  type WaitlistEmailAvailability,
} from '@/lib/waitlistEmailValidation';
import { getWaitlistEmailStatus } from '@/lib/waitlist';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') ?? '';
    const format = validateWaitlistEmailFormat(email);

    if (!format.ok) {
      return NextResponse.json({ error: format.message }, { status: 400 });
    }

    const status: WaitlistEmailAvailability = await getWaitlistEmailStatus(format.email);

    return NextResponse.json({ status });
  } catch (error) {
    console.error('[waitlist] email check failed', error);
    return NextResponse.json(
      { error: 'Unable to validate email right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}
