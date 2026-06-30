import { typography } from '@/theme/typography';
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
        'mb-8',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <h2 className={typography.sectionTitle}>{title}</h2>
      {subtitle ? (
        <p className={cn('mt-2', typography.bodySecondary, align === 'center' && 'mx-auto max-w-2xl')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
