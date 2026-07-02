import { NextResponse } from 'next/server';
import { getTurnstileSiteKey, isTurnstileConfigured } from '@/lib/turnstile';

export async function GET() {
  return NextResponse.json({
    turnstileSiteKey: getTurnstileSiteKey(),
    turnstileEnabled: isTurnstileConfigured(),
  });
}
