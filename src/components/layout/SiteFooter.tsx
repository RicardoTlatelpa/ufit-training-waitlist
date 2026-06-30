import { Container } from '@/components/ui';
import { typography } from '@/theme/typography';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className={typography.caption}>
            &copy; {new Date().getFullYear()} UFIT Training. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#"
              className="font-body text-paragraph-02 text-gray-600 hover:text-primary-600"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-paragraph-02 text-gray-600 hover:text-primary-600"
            >
              Contact
            </a>
            <a
              href="#"
              className="font-body text-paragraph-02 text-gray-600 hover:text-primary-600"
              aria-label="UFIT on social media"
            >
              Social
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
