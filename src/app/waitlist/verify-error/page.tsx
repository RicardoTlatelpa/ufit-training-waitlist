import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Container } from '@/components/ui';
import { typography } from '@/theme/typography';

export const metadata: Metadata = {
  title: 'Verification Error — UFIT Training',
  description: 'There was a problem confirming your UFIT Training waitlist signup.',
};

const messages: Record<string, { title: string; body: string }> = {
  'missing-token': {
    title: 'Verification link is incomplete',
    body: 'The confirmation link is missing required information. Submit the form again to receive a new email.',
  },
  'invalid-token': {
    title: 'Verification link is invalid',
    body: 'This confirmation link is not valid. Submit the form again to receive a new email.',
  },
  'expired-token': {
    title: 'Verification link has expired',
    body: 'This confirmation link has expired. Submit the form again to receive a new email.',
  },
  'server-error': {
    title: 'Something went wrong',
    body: 'We could not confirm your email right now. Please try again shortly.',
  },
};

type PageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function WaitlistVerifyErrorPage({ searchParams }: PageProps) {
  const { reason } = await searchParams;
  const content = messages[reason ?? ''] ?? messages['server-error'];

  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-xl">
          <Card padding="lg" className="text-center">
            <p className={typography.overline}>UFIT Training</p>
            <h1 className="mt-2 font-heading text-heading-02 font-bold leading-heading-02 text-primary-800">
              {content.title}
            </h1>
            <p className={`mt-4 ${typography.body}`}>{content.body}</p>
            <div className="mt-8">
              <Link
                href="/#waitlist"
                className="font-body text-paragraph-02 font-bold text-primary-600 hover:text-primary-700"
              >
                Return to waitlist form
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
