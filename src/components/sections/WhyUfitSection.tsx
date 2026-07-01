import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const audiences = [
  'Strength training',
  'Powerlifting',
  'Bodybuilding',
  'Boxing support',
  'General fitness',
];

export default function WhyUfitSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeader
          title="Why UFIT?"
          subtitle="Built for people who care about consistent progress, not random workouts."
        />
        <div className="mx-auto max-w-2xl">
          <p className={typography.overline}>Perfect for</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {audiences.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 sm:rounded-lg sm:py-3"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                <span className={typography.body}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
