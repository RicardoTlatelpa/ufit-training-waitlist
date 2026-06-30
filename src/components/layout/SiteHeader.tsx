import Image from 'next/image';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/90 backdrop-blur-md supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]">
      <Container className="flex min-h-[3.75rem] items-center justify-between gap-3 sm:min-h-16">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/images/icon.png"
            alt="UFIT Training"
            width={36}
            height={36}
            className="shrink-0 rounded-lg"
          />
          <span className="truncate font-heading text-[17px] font-bold text-primary-800 sm:text-heading-04">
            UFIT Training
          </span>
        </Link>
        <Button
          href="#waitlist"
          variant="primary"
          className="h-9 min-h-0 w-auto shrink-0 self-center px-4 py-0 text-[14px] leading-none sm:min-h-[44px] sm:h-auto sm:px-5 sm:py-3 sm:text-paragraph-01 sm:leading-paragraph-01"
        >
          <span className="sm:hidden">Join</span>
          <span className="hidden sm:inline">Join the Beta Waitlist</span>
        </Button>
      </Container>
    </header>
  );
}
