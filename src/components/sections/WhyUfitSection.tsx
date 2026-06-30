import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const audiences = [
  'Strength training',
  'Powerlifting',
  'Boxing support',
  'General fitness',
];

export default function WhyUfitSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <Container>
        <SectionHeader
          title="Why UFIT?"
          subtitle="Built for people who care about consistent progress—not random workouts."
        />
        <div className="mx-auto max-w-2xl">
          <p className={typography.overline}>Perfect for</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {audiences.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
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
