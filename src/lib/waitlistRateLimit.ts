import { getSupabaseAdmin } from '@/lib/supabase';

export type WaitlistRateLimitRoute = 'subscribe' | 'check';

const RATE_LIMITS: Record<
  WaitlistRateLimitRoute,
  { maxRequests: number; windowMs: number; emailMaxRequests?: number }
> = {
  subscribe: {
    maxRequests: 15,
    windowMs: 60 * 60 * 1000,
    emailMaxRequests: 8,
  },
  check: {
    maxRequests: 100,
    windowMs: 60 * 60 * 1000,
  },
};

export function getClientIp(request: Request): string {
  const netlifyIp = request.headers.get('x-nf-client-connection-ip');
  if (netlifyIp) {
    return netlifyIp.trim();
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  return 'unknown';
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; message: string };

export async function checkWaitlistRateLimit(
  route: WaitlistRateLimitRoute,
  ip: string,
  email?: string,
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[route];
  const windowStart = new Date(Date.now() - config.windowMs).toISOString();
  const supabase = getSupabaseAdmin();

  const { count: ipCount, error: ipError } = await supabase
    .from('waitlist_request_log')
    .select('id', { count: 'exact', head: true })
    .eq('route', route)
    .eq('ip', ip)
    .gte('created_at', windowStart);

  if (ipError) {
    console.error('[waitlist] rate limit ip check failed', ipError);
    return { allowed: true };
  }

  // Avoid one shared bucket when IP detection fails on the edge.
  if (ip !== 'unknown' && (ipCount ?? 0) >= config.maxRequests) {
    return { allowed: false, message: 'Too many requests. Try again later.' };
  }

  if (email && config.emailMaxRequests) {
    const { count: emailCount, error: emailError } = await supabase
      .from('waitlist_request_log')
      .select('id', { count: 'exact', head: true })
      .eq('route', route)
      .eq('email', email)
      .gte('created_at', windowStart);

    if (emailError) {
      console.error('[waitlist] rate limit email check failed', emailError);
      return { allowed: true };
    }

    if ((emailCount ?? 0) >= config.emailMaxRequests) {
      return { allowed: false, message: 'Too many requests. Try again later.' };
    }
  }

  return { allowed: true };
}

export async function logWaitlistRequest(
  route: WaitlistRateLimitRoute,
  ip: string,
  email?: string,
): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('waitlist_request_log').insert({
      route,
      ip,
      email: email ?? null,
    });

    if (error) {
      console.error('[waitlist] request log insert failed', error);
    }
  } catch (error) {
    console.error('[waitlist] request log insert failed', error);
  }
}
