type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
}

export function isTurnstileConfigured(): boolean {
  return Boolean(getTurnstileSiteKey() && process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  if (!isTurnstileConfigured()) {
    return true;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return false;
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
