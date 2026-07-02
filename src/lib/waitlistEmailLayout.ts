import { colors, fontSize, lineHeight } from '@/theme/tokens';

export const emailFonts = {
  heading: "'Raleway', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  body: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

const emailWidth = 560;

export type EmailLayoutOptions = {
  siteUrl: string;
  preheader?: string;
};

function font(style: {
  family: string;
  size: string;
  lineHeight: string;
  weight?: number;
  color?: string;
  letterSpacing?: string;
  textTransform?: string;
}): string {
  const parts = [
    `font-family:${style.family}`,
    `font-size:${style.size}`,
    `line-height:${style.lineHeight}`,
  ];

  if (style.weight) parts.push(`font-weight:${style.weight}`);
  if (style.color) parts.push(`color:${style.color}`);
  if (style.letterSpacing) parts.push(`letter-spacing:${style.letterSpacing}`);
  if (style.textTransform) parts.push(`text-transform:${style.textTransform}`);

  return parts.join(';');
}

export function emailOverline(text: string): string {
  return `<p style="margin:0 0 8px;${font({
    family: emailFonts.body,
    size: fontSize.caption,
    lineHeight: lineHeight.caption,
    weight: 600,
    color: colors.gray[600],
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  })}">${text}</p>`;
}

export function emailHeading(text: string): string {
  return `<h1 style="margin:0 0 16px;${font({
    family: emailFonts.heading,
    size: fontSize['heading-03'],
    lineHeight: lineHeight['heading-03'],
    weight: 700,
    color: colors.primary[800],
  })}">${text}</h1>`;
}

export function emailBody(text: string, marginBottom = 16): string {
  return `<p style="margin:0 0 ${marginBottom}px;${font({
    family: emailFonts.body,
    size: fontSize['paragraph-01'],
    lineHeight: lineHeight['paragraph-01'],
    color: colors.gray[800],
  })}">${text}</p>`;
}

export function emailMuted(text: string): string {
  return `<p style="margin:0;${font({
    family: emailFonts.body,
    size: fontSize['paragraph-03'],
    lineHeight: lineHeight['paragraph-03'],
    color: colors.gray[600],
  })}">${text}</p>`;
}

export function emailLink(href: string, label: string): string {
  return `<a href="${href}" style="color:${colors.primary[600]};text-decoration:underline;word-break:break-all;">${label}</a>`;
}

export function emailButton(href: string, label: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
      <tr>
        <td style="border-radius:8px;background:${colors.primary[500]};">
          <a href="${href}" style="display:inline-block;padding:14px 24px;${font({
            family: emailFonts.body,
            size: fontSize['paragraph-01'],
            lineHeight: lineHeight['paragraph-01'],
            weight: 700,
            color: '#ffffff',
          })};text-decoration:none;border-radius:8px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function wrapEmailLayout(content: string, options: EmailLayoutOptions): string {
  const { siteUrl, preheader } = options;
  const logoUrl = `${siteUrl}/images/icon.png`;
  const siteLabel = siteUrl.replace(/^https?:\/\//, '');

  const preheaderHtml = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${preheader}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Raleway:wght@600;700;800&display=swap" rel="stylesheet" />
    <title>UFIT Training</title>
  </head>
  <body style="margin:0;padding:0;background:${colors.gray[50]};">
    ${preheaderHtml}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${colors.gray[50]};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:${emailWidth}px;">
            <tr>
              <td style="padding:0 0 20px;" align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:10px;vertical-align:middle;">
                      <img src="${logoUrl}" width="36" height="36" alt="UFIT Training" style="display:block;border:0;border-radius:8px;" />
                    </td>
                    <td style="vertical-align:middle;${font({
                      family: emailFonts.heading,
                      size: fontSize['heading-04'],
                      lineHeight: lineHeight['heading-04'],
                      weight: 700,
                      color: colors.primary[800],
                    })}">
                      UFIT Training
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid ${colors.gray[200]};border-radius:12px;overflow:hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="height:4px;background:${colors.primary[500]};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:32px 28px;">
                      ${content}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 8px 0;text-align:center;${font({
                family: emailFonts.body,
                size: fontSize['paragraph-03'],
                lineHeight: lineHeight['paragraph-03'],
                color: colors.gray[600],
              })}">
                <p style="margin:0 0 8px;">Train smarter. Progress every workout.</p>
                <p style="margin:0;">
                  <a href="${siteUrl}" style="color:${colors.primary[600]};text-decoration:none;">${siteLabel}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
