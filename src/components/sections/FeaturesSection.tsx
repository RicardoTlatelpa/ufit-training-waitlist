import { Card, Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const features = [
  {
    title: 'Build Your Own Programs',
    description: 'Create programs exactly the way you train.',
    outcome: 'Never forget what you lifted last week.',
  },
  {
    title: 'Track Every Workout',
    description: 'Log every set, rep, and weight.',
    outcome: 'Every session counts toward real progress.',
  },
  {
    title: 'Automatic Progression',
    description: 'UFIT updates future workouts based on your performance.',
    outcome: 'Always know what weight to lift next.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeader
          title="Everything You Need to Progress"
          subtitle="Built for athletes who train with intention, not random workouts."
          align="center"
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} padding="lg">
              <h3 className={typography.cardTitle}>{feature.title}</h3>
              <p className={`mt-2 ${typography.bodySecondary}`}>{feature.description}</p>
              <p className={`mt-4 ${typography.body} font-medium text-primary-700`}>
                {feature.outcome}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
