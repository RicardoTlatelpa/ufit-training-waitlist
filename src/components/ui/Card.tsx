import { cn } from '@/lib/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: 'md' | 'lg';
};

export default function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white shadow-sm',
        padding === 'md' ? 'px-4 py-4 sm:px-5 sm:py-5' : 'px-4 py-5 sm:px-5 sm:py-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
