import { cn } from '@/lib/cn';

export type BadgeVariant = 'critical' | 'important' | 'neutral' | 'info' | 'accent';

const variantClasses: Record<BadgeVariant, string> = {
  critical: 'bg-red-100 text-red-700',
  important: 'bg-amber-100 text-amber-800',
  neutral: 'bg-gray-100 text-gray-700',
  info: 'bg-blue-50 text-blue-700',
  accent: 'bg-purple-100 text-purple-800',
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-paragraph-03 font-semibold leading-paragraph-03',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
