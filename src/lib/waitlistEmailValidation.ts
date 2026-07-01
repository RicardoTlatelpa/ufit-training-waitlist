import { z } from 'zod';

export const waitlistEmailFieldSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Enter a valid email address');

export type WaitlistEmailAvailability =
  | 'available'
  | 'already_verified'
  | 'pending_verification';

export type WaitlistEmailFormatResult =
  | { ok: true; email: string }
  | { ok: false; message: string };

export function normalizeWaitlistEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateWaitlistEmailFormat(email: string): WaitlistEmailFormatResult {
  const parsed = waitlistEmailFieldSchema.safeParse(email);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? 'Enter a valid email address',
    };
  }

  return { ok: true, email: normalizeWaitlistEmail(parsed.data) };
}

export function getWaitlistEmailAvailabilityMessage(
  status: Exclude<WaitlistEmailAvailability, 'available'>,
): string {
  switch (status) {
    case 'already_verified':
      return 'This email is already on the beta waitlist.';
    case 'pending_verification':
      return 'This email is already registered. Check your inbox for the confirmation link.';
  }
}

export async function fetchWaitlistEmailAvailability(
  email: string,
): Promise<WaitlistEmailAvailability | 'invalid_format'> {
  const format = validateWaitlistEmailFormat(email);

  if (!format.ok) {
    return 'invalid_format';
  }

  const response = await fetch(
    `/api/waitlist/check?email=${encodeURIComponent(format.email)}`,
  );

  if (!response.ok) {
    throw new Error('Unable to validate email right now.');
  }

  const payload = (await response.json()) as { status?: WaitlistEmailAvailability };

  return payload.status ?? 'available';
}

export async function validateWaitlistEmailInput(email: string): Promise<true | string> {
  const format = validateWaitlistEmailFormat(email);

  if (!format.ok) {
    return format.message;
  }

  try {
    const status = await fetchWaitlistEmailAvailability(format.email);

    if (status === 'invalid_format') {
      return 'Enter a valid email address';
    }

    if (status === 'available') {
      return true;
    }

    return getWaitlistEmailAvailabilityMessage(status);
  } catch {
    return 'Unable to validate email right now. Please try again.';
  }
}
