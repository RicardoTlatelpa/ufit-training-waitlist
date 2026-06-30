export type WaitlistEmailKind = 'verification' | 'welcome';

type WaitlistEmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function buildWaitlistEmail(
  kind: WaitlistEmailKind,
  options: { verifyUrl?: string; tokenTtlHours?: number } = {},
): WaitlistEmailContent {
  const tokenTtlHours = options.tokenTtlHours ?? 48;

  if (kind === 'verification') {
    const verifyUrl = options.verifyUrl ?? '';
    return {
      subject: 'Confirm your UFIT Training beta waitlist signup',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #242930; max-width: 560px;">
          <p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #79879a; margin: 0 0 12px;">UFIT Training</p>
          <h1 style="font-size: 28px; line-height: 1.2; color: #00368d; margin: 0 0 16px;">Confirm your waitlist signup</h1>
          <p style="margin: 0 0 16px;">Thanks for your interest in the UFIT Training beta. Confirm your email address to join the waitlist.</p>
          <p style="margin: 0 0 24px;">
            <a href="${verifyUrl}" style="display: inline-block; background: #3a86ff; color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 6px;">
              Confirm email address
            </a>
          </p>
          <p style="margin: 0 0 16px; color: #5b6879; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="margin: 0 0 24px; word-break: break-all; font-size: 14px;">
            <a href="${verifyUrl}" style="color: #005beb;">${verifyUrl}</a>
          </p>
          <p style="margin: 0; color: #79879a; font-size: 12px;">This link expires in ${tokenTtlHours} hours. If you did not request this, you can ignore this email.</p>
        </div>
      `,
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

  return {
    subject: 'You are confirmed on the UFIT Training beta waitlist',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #242930; max-width: 560px;">
        <p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #79879a; margin: 0 0 12px;">UFIT Training</p>
        <h1 style="font-size: 28px; line-height: 1.2; color: #00368d; margin: 0 0 16px;">You are on the list</h1>
        <p style="margin: 0 0 16px;">Your email is confirmed. You are now on the UFIT Training beta waitlist.</p>
        <p style="margin: 0; color: #5b6879;">We will reach out when beta spots become available. Thanks for helping shape the future of UFIT.</p>
      </div>
    `,
    text: [
      'You are confirmed on the UFIT Training beta waitlist.',
      '',
      'Your email is confirmed. We will reach out when beta spots become available.',
    ].join('\n'),
  };
}
