/** Semantic typography roles ported from frontend/ufit/theme/typography.ts */

export const typography = {
  display: 'font-heading text-heading-01 font-bold leading-heading-01 text-primary-800',
  screenTitle:
    'font-heading text-heading-02 font-bold leading-heading-02 text-primary-800',
  sectionTitle:
    'font-heading text-heading-02 font-semibold leading-heading-02 text-gray-900',
  cardTitle:
    'font-heading text-heading-03 font-semibold leading-heading-03 text-primary-800',
  body: 'font-body text-paragraph-01 leading-paragraph-01 text-gray-700',
  bodySecondary: 'font-body text-paragraph-02 leading-paragraph-02 text-gray-600',
  caption: 'font-body text-paragraph-03 leading-paragraph-03 text-gray-500',
  label: 'font-body text-paragraph-02 leading-paragraph-02 text-gray-800',
  button:
    'text-center font-body text-paragraph-01 font-bold leading-paragraph-01 text-white',
  buttonSecondary:
    'text-center font-body text-paragraph-01 font-bold leading-paragraph-01 text-gray-800',
  overline:
    'font-body text-caption uppercase tracking-wide leading-caption text-gray-500',
} as const;

export type TypographyRole = keyof typeof typography;

export function cnTypography(role: TypographyRole, extra?: string): string {
  return extra ? `${typography[role]} ${extra}` : typography[role];
}
