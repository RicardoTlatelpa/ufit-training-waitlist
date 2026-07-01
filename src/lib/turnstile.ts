type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[turnstile] TURNSTILE_SECRET_KEY is not configured');
      return false;
    }

    console.warn('[turnstile] TURNSTILE_SECRET_KEY missing; skipping verification in dev');
    return true;
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip) {
    body.set('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    console.error('[turnstile] siteverify request failed', response.status);
    return false;
  }

  const payload = (await response.json()) as TurnstileVerifyResponse;

  if (!payload.success) {
    console.error('[turnstile] verification failed', payload['error-codes']);
  }

  return payload.success;
}

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
