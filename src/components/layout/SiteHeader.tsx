import Image from 'next/image';
import { Container, Button } from '@/components/ui';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <Container className="flex min-h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/icon.png"
            alt="UFIT Training"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-heading text-heading-04 font-bold text-primary-800">
            UFIT Training
          </span>
        </a>
        <Button href="#waitlist" variant="primary" className="hidden sm:inline-flex">
          Join the Beta Waitlist
        </Button>
      </Container>
    </header>
  );
}
