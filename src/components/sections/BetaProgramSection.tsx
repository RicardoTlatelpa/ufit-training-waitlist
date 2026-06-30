import { Card, Container, SectionHeader, Button } from '@/components/ui';
import { typography } from '@/theme/typography';

const benefits = [
  'Free beta access',
  'Early features',
  'Direct influence on development',
];

export default function BetaProgramSection() {
  return (
    <section className="bg-primary-50 py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            title="Beta Program"
            subtitle="We're inviting a limited number of early users to help shape the future of UFIT."
            align="center"
          />
          <Card className="text-left">
            <p className={typography.overline}>Early testers receive</p>
            <ul className="mt-4 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100">
                    <svg
                      className="h-3 w-3 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className={typography.body}>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Button href="#waitlist">Join the Beta Waitlist</Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
