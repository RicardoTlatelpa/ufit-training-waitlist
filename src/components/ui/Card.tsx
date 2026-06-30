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
        padding === 'md' ? 'px-5 py-5' : 'px-5 py-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
