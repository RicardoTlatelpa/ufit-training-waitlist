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
    <section className="bg-gray-50 py-16 lg:py-20">
      <Container>
        <SectionHeader title="FAQ" align="center" />
        <div className="mx-auto max-w-2xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4">
              <summary
                className={`cursor-pointer list-none font-heading text-heading-04 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden`}
              >
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-primary-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className={`mt-3 pb-1 ${typography.bodySecondary}`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
