import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Container } from '@/components/ui';
import { typography } from '@/theme/typography';

export const metadata: Metadata = {
  title: 'Waitlist Confirmed — UFIT Training',
  description: 'Your email is confirmed on the UFIT Training beta waitlist.',
};

export default function WaitlistConfirmedPage() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-xl">
          <Card padding="lg" className="text-center">
            <p className={typography.overline}>UFIT Training</p>
            <h1 className="mt-2 font-heading text-heading-02 font-bold leading-heading-02 text-primary-800">
              You&apos;re on the list
            </h1>
            <p className={`mt-4 ${typography.body}`}>
              Your email is confirmed. You are now on the UFIT Training beta waitlist.
            </p>
            <p className={`mt-2 ${typography.bodySecondary}`}>
              We&apos;ll reach out when beta spots become available.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="font-body text-paragraph-02 font-bold text-primary-600 hover:text-primary-700"
              >
                Back to home
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
