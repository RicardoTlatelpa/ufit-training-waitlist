import nodemailer from 'nodemailer';
import { Resend } from 'resend';

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/$/, '');
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.URL ??
      'http://localhost:3000',
  );
}

/** Public base URL for links and images in outbound waitlist emails. */
export function getEmailSiteUrl(): string {
  const url =
    process.env.WAITLIST_SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.DEPLOY_URL;

  if (!url) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Missing WAITLIST_SITE_URL, NEXT_PUBLIC_SITE_URL, or URL for waitlist email links',
      );
    }

    console.warn(
      '[email] No site URL configured; email links and images will use http://localhost:3000. ' +
        'Set NEXT_PUBLIC_SITE_URL or WAITLIST_SITE_URL in .env.local when testing emails.',
    );
    return 'http://localhost:3000';
  }

  return normalizeSiteUrl(url);
}

export function getWaitlistFromEmail(): string {
  const configured = process.env.WAITLIST_FROM_EMAIL?.trim().replace(/^["']|["']$/g, '');

  if (configured) {
    return configured;
  }

  if (process.env.SMTP_USER) {
    return `UFIT Training <${process.env.SMTP_USER}>`;
  }

  return 'UFIT Training <onboarding@resend.dev>';
}

export function getWaitlistFromEmailAddress(): string | null {
  const from = getWaitlistFromEmail();
  const match = from.match(/<([^>]+)>/);
  return match?.[1] ?? (from.includes('@') ? from : null);
}

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (resendClient) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY');
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

function hasSmtpConfig(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getEmailProvider(): 'resend' | 'smtp' {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (hasSmtpConfig()) return 'smtp';
  throw new Error(
    'No email provider configured. Set RESEND_API_KEY or SMTP_USER + SMTP_PASS.',
  );
}

async function sendViaResend(input: SendEmailInput): Promise<void> {
  const resend = getResendClient();
  const from = getWaitlistFromEmail();

  const { error } = await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });

  if (error) {
    console.error('[waitlist] resend send failed', {
      from,
      to: input.to,
      error,
    });
    throw new Error(error.message);
  }
}

async function sendViaSmtp(input: SendEmailInput): Promise<void> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('Missing SMTP_USER or SMTP_PASS');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: getWaitlistFromEmail(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

export async function sendWaitlistEmail(input: SendEmailInput): Promise<void> {
  const provider = getEmailProvider();

  if (provider === 'resend') {
    await sendViaResend(input);
    return;
  }

  await sendViaSmtp(input);
}

export function getConfiguredEmailProvider(): 'resend' | 'smtp' | 'none' {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (hasSmtpConfig()) return 'smtp';
  return 'none';
}
