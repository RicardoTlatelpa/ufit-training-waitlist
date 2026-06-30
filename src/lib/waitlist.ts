import { randomBytes } from 'crypto';
import { getSupabaseAdmin, type WaitlistSignupRow } from '@/lib/supabase';
import { getSiteUrl, sendWaitlistEmail } from '@/lib/sendEmail';
import { buildWaitlistEmail } from '@/lib/waitlistEmailTemplates';

const TOKEN_TTL_HOURS = 48;

export type SubscribeResult =
  | { status: 'verification_sent' }
  | { status: 'already_verified' };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function createVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

function verificationExpiresAt(): string {
  return new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000).toISOString();
}

async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const siteUrl = getSiteUrl();
  const verifyUrl = `${siteUrl}/api/waitlist/verify?token=${encodeURIComponent(token)}`;
  const content = buildWaitlistEmail('verification', {
    verifyUrl,
    tokenTtlHours: TOKEN_TTL_HOURS,
  });

  await sendWaitlistEmail({
    to: email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });
}

export async function subscribeToWaitlist(email: string): Promise<SubscribeResult> {
  const normalizedEmail = normalizeEmail(email);
  const supabase = getSupabaseAdmin();
  const token = createVerificationToken();
  const expiresAt = verificationExpiresAt();

  const { data: existingData, error: fetchError } = await supabase
    .from('waitlist_signups')
    .select('id, verified_at')
    .eq('email', normalizedEmail)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const existing = existingData as Pick<WaitlistSignupRow, 'id' | 'verified_at'> | null;

  if (existing?.verified_at) {
    return { status: 'already_verified' };
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from('waitlist_signups')
      .update({
        verification_token: token,
        verification_token_expires_at: expiresAt,
      })
      .eq('id', existing.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  } else {
    const { error: insertError } = await supabase.from('waitlist_signups').insert({
      email: normalizedEmail,
      verification_token: token,
      verification_token_expires_at: expiresAt,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  await sendVerificationEmail(normalizedEmail, token);
  return { status: 'verification_sent' };
}

export type VerifyResult =
  | { status: 'verified'; email: string }
  | { status: 'already_verified' }
  | { status: 'invalid_token' }
  | { status: 'expired_token' };

export async function verifyWaitlistSignup(token: string): Promise<VerifyResult> {
  const supabase = getSupabaseAdmin();

  const { data: signupData, error } = await supabase
    .from('waitlist_signups')
    .select('id, email, verified_at, verification_token_expires_at')
    .eq('verification_token', token)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const signup = signupData as Pick<
    WaitlistSignupRow,
    'id' | 'email' | 'verified_at' | 'verification_token_expires_at'
  > | null;

  if (!signup) {
    return { status: 'invalid_token' };
  }

  if (signup.verified_at) {
    return { status: 'already_verified' };
  }

  if (
    !signup.verification_token_expires_at ||
    new Date(signup.verification_token_expires_at).getTime() < Date.now()
  ) {
    return { status: 'expired_token' };
  }

  const { error: updateError } = await supabase
    .from('waitlist_signups')
    .update({
      verified_at: new Date().toISOString(),
      verification_token: null,
      verification_token_expires_at: null,
    })
    .eq('id', signup.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { status: 'verified', email: signup.email };
}

export async function sendWelcomeEmail(email: string): Promise<void> {
  const content = buildWaitlistEmail('welcome');

  await sendWaitlistEmail({
    to: email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });
}
