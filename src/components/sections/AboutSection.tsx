import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

export default function AboutSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader title="About" align="center" />
          <p className={typography.body}>
            UFIT was built by a software engineer passionate about training.
          </p>
          <p className={`mt-4 ${typography.body}`}>
            The mission is simple:
          </p>
          <p className="mt-2 font-heading text-[1.25rem] font-bold leading-tight text-primary-800 sm:text-heading-03 sm:leading-heading-03">
            Spend less time managing workouts and more time training.
          </p>
        </div>
      </Container>
    </section>
  );
}
