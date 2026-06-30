import { Container } from '@/components/ui';
import { typography } from '@/theme/typography';
import WaitlistForm from '@/components/WaitlistForm';
import PhoneMockup from '@/components/PhoneMockup';

export default function HeroSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-heading text-heading-01 font-bold leading-heading-01 text-primary-800 lg:text-display-02 lg:leading-display-02">
              Train Smarter. Progress Every Workout.
            </h1>
            <p className={`mt-4 max-w-xl lg:mt-6 ${typography.body}`}>
              Build your own strength program, track every workout, and let UFIT
              automatically manage your progression so you always know what to lift
              next.
            </p>
            <div id="waitlist" className="mt-8 scroll-mt-24">
              <WaitlistForm />
            </div>
            <p className={`mt-4 ${typography.caption}`}>
              Be among the first athletes helping shape the future of UFIT.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
