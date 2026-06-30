import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const painPoints = [
  'No spreadsheets',
  'No notebooks',
  'No guessing your next workout',
];

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <Container>
        <div className="max-w-2xl">
          <SectionHeader
            title="Stop Guessing What To Do Next"
            subtitle="Most workout apps record what you've already done. UFIT helps you know what comes next."
          />
          <ul className="space-y-4">
            {painPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <svg
                    className="h-3.5 w-3.5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className={typography.body}>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-heading text-heading-03 font-bold text-primary-800">
            Simply train.
          </p>
        </div>
      </Container>
    </section>
  );
}
