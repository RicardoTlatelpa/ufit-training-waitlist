import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/sendEmail';
import { sendWelcomeEmail, verifyWaitlistSignup } from '@/lib/waitlist';

function redirectTo(path: string): NextResponse {
  return NextResponse.redirect(new URL(path, getSiteUrl()));
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')?.trim();

  if (!token) {
    return redirectTo('/waitlist/verify-error?reason=missing-token');
  }

  try {
    const result = await verifyWaitlistSignup(token);

    if (result.status === 'invalid_token') {
      return redirectTo('/waitlist/verify-error?reason=invalid-token');
    }

    if (result.status === 'expired_token') {
      return redirectTo('/waitlist/verify-error?reason=expired-token');
    }

    if (result.status === 'verified') {
      try {
        await sendWelcomeEmail(result.email);
      } catch (error) {
        console.error('[waitlist] welcome email failed', error);
      }
      return redirectTo('/waitlist/confirmed');
    }

    return redirectTo('/waitlist/confirmed');
  } catch (error) {
    console.error('[waitlist] verify failed', error);
    return redirectTo('/waitlist/verify-error?reason=server-error');
  }
}
