import { getSiteUrl } from '@/lib/sendEmail';
import {
  emailBody,
  emailButton,
  emailHeading,
  emailLink,
  emailMuted,
  emailOverline,
  wrapEmailLayout,
} from '@/lib/waitlistEmailLayout';

export type WaitlistEmailKind = 'verification' | 'welcome';

type WaitlistEmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function buildWaitlistEmail(
  kind: WaitlistEmailKind,
  options: { verifyUrl?: string; tokenTtlHours?: number; siteUrl?: string } = {},
): WaitlistEmailContent {
  const siteUrl = options.siteUrl ?? getSiteUrl();
  const tokenTtlHours = options.tokenTtlHours ?? 48;

  if (kind === 'verification') {
    const verifyUrl = options.verifyUrl ?? '';
    const content = [
      emailOverline('Beta waitlist'),
      emailHeading('Confirm your waitlist signup'),
      emailBody(
        'Thanks for your interest in the UFIT Training beta. Confirm your email address to join the waitlist.',
      ),
      emailButton(verifyUrl, 'Confirm email address'),
      emailBody('Or copy and paste this link into your browser:', 8),
      `<p style="margin:0 0 24px;">${emailLink(verifyUrl, verifyUrl)}</p>`,
      emailMuted(
        `This link expires in ${tokenTtlHours} hours. If you did not request this, you can ignore this email.`,
      ),
    ].join('');

    return {
      subject: 'Confirm your UFIT Training beta waitlist signup',
      html: wrapEmailLayout(content, {
        siteUrl,
        preheader: 'Confirm your email to join the UFIT Training beta waitlist.',
      }),
      text: [
        'Confirm your UFIT Training beta waitlist signup',
        '',
        'Thanks for your interest in the UFIT Training beta. Confirm your email address to join the waitlist:',
        verifyUrl,
        '',
        `This link expires in ${tokenTtlHours} hours. If you did not request this, you can ignore this email.`,
      ].join('\n'),
    };
  }

  const content = [
    emailOverline('Beta waitlist'),
    emailHeading('You are on the list'),
    emailBody(
      'Your email is confirmed. You are now on the UFIT Training beta waitlist.',
    ),
    emailMuted(
      'We will reach out when beta spots become available. Thanks for helping shape the future of UFIT.',
    ),
  ].join('');

  return {
    subject: 'You are confirmed on the UFIT Training beta waitlist',
    html: wrapEmailLayout(content, {
      siteUrl,
      preheader: 'You are confirmed on the UFIT Training beta waitlist.',
    }),
    text: [
      'You are confirmed on the UFIT Training beta waitlist.',
      '',
      'Your email is confirmed. We will reach out when beta spots become available.',
    ].join('\n'),
  };
}
