import { Container, SectionHeader } from '@/components/ui';
import WaitlistForm from '@/components/WaitlistForm';

export default function FinalCtaSection() {
  return (
    <section className="bg-primary-800 py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <SectionHeader
            title="Ready To Train Smarter?"
            subtitle="Join the waitlist today and help shape the future of UFIT."
            align="center"
            className="[&_h2]:text-white [&_p]:text-primary-100"
          />
          <WaitlistForm compact variant="dark" className="justify-center" />
        </div>
      </Container>
    </section>
  );
}
