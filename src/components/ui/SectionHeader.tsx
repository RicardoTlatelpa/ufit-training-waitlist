import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-6 sm:mb-8',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <h2 className="font-heading text-[1.75rem] font-semibold leading-[1.15] text-gray-900 sm:text-heading-02 sm:leading-heading-02">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mt-2 font-body text-[15px] leading-[1.5] text-gray-600 sm:text-paragraph-02 sm:leading-paragraph-02',
            align === 'center' && 'mx-auto max-w-2xl',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
