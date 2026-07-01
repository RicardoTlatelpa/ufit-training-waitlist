import { Container } from '@/components/ui';
import { typography } from '@/theme/typography';
import TestFlightLogo from '@/components/TestFlightLogo';
import WaitlistForm from '@/components/WaitlistForm';
import PhoneMockup from '@/components/PhoneMockup';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/80 via-white to-white pt-8 pb-12 sm:pt-10 sm:pb-14 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary-100/60 blur-3xl sm:h-80 sm:w-80"
      />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h1 className="font-heading text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-primary-800 sm:text-[2.5rem] sm:leading-[1.1] lg:text-display-02 lg:leading-display-02">
              Train Smarter. Progress Every Workout.
            </h1>
            <p className={`mt-4 max-w-xl text-[15px] leading-[1.55] sm:mt-5 sm:text-paragraph-01 sm:leading-paragraph-01 lg:mt-6 ${typography.body}`}>
              Build your own training program, track every workout, and let UFIT
              automatically manage your progression so you always know what to lift
              next.
            </p>

            <div className="my-8 flex justify-center lg:hidden">
              <PhoneMockup />
            </div>

            <div id="waitlist" className="scroll-mt-24">
              <WaitlistForm />
            </div>
            <p
              className={`mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:mt-4 sm:justify-start sm:text-left ${typography.caption}`}
            >
              <TestFlightLogo className="h-10 w-10 shrink-0 rounded-[9px]" />
              <span>Now in TestFlight beta.</span>
            </p>
          </div>

          <div className="hidden justify-center lg:flex lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
