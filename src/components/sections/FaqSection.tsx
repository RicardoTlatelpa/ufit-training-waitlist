import { Container, SectionHeader } from '@/components/ui';
import { typography } from '@/theme/typography';

const faqs = [
  {
    question: 'Who is UFIT for?',
    answer: 'Anyone who wants structured, progressive training.',
  },
  {
    question: 'Is the beta free?',
    answer: 'Yes.',
  },
  {
    question: 'When will invites go out?',
    answer: 'As new testing spots become available.',
  },
];

export default function FaqSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeader title="FAQ" align="center" />
        <div className="mx-auto max-w-2xl divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-4 py-1 sm:px-5">
              <summary className="cursor-pointer list-none py-4 font-heading text-[17px] font-semibold leading-snug text-gray-900 sm:text-heading-04 sm:leading-heading-04 [&::-webkit-details-marker]:hidden">
                <span className="flex min-h-[44px] items-center justify-between gap-4">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg font-normal text-primary-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className={`pb-4 ${typography.bodySecondary}`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
