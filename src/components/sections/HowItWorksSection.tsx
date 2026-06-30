import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const steps = [
  { number: '1', title: 'Build your program.', description: 'Design training that matches how you actually lift.' },
  { number: '2', title: 'Complete your workout.', description: 'Follow your session with everything laid out for you.' },
  { number: '3', title: 'Track your results.', description: 'Log sets, reps, and weights as you go.' },
  { number: '4', title: 'UFIT updates your next session.', description: 'Progression handled automatically—always know what comes next.' },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <SectionHeader title="How It Works" align="center" />
        <ol className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 font-heading text-heading-04 font-bold text-white">
                {step.number}
              </span>
              <div>
                <p className={`${typography.cardTitle} text-heading-04`}>{step.title}</p>
                <p className={`mt-1 ${typography.bodySecondary}`}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
