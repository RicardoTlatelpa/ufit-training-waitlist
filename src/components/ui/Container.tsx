import { cn } from '@/lib/cn';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section';
  id?: string;
};

export default function Container({
  children,
  className,
  as: Tag = 'div',
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn('mx-auto w-full max-w-6xl px-4 sm:px-5', className)}>
      {children}
    </Tag>
  );
}
