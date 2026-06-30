import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  outline: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
};

const disabledClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-300 cursor-not-allowed',
  secondary: 'bg-gray-200 cursor-not-allowed opacity-60',
  outline: 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60',
  ghost: 'opacity-50 cursor-not-allowed',
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  href?: string;
};

export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  className,
  onClick,
  href,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classes = cn(
    'inline-flex min-h-[48px] w-full items-center justify-center rounded-lg px-5 py-3.5 font-body text-paragraph-01 font-bold leading-paragraph-01 transition-colors sm:min-h-[44px] sm:w-auto sm:rounded-md sm:px-4',
    isDisabled ? disabledClasses[variant] : variantClasses[variant],
    className,
  );

  if (href && !isDisabled) {
    return (
      <a href={href} className={classes}>
        {loading ? 'Joining…' : children}
      </a>
    );
  }

  return (
    <button type={type} disabled={isDisabled} className={classes} onClick={onClick}>
      {loading ? 'Joining…' : children}
    </button>
  );
}
