import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'default' | 'compact';

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

const sizeClasses: Record<ButtonSize, string> = {
  default:
    'min-h-[48px] w-full rounded-lg px-5 py-3.5 sm:min-h-[44px] sm:w-auto sm:rounded-md sm:px-4',
  compact:
    'h-9 min-h-0 w-auto shrink-0 rounded-md px-4 py-0 text-[14px] leading-none sm:min-h-[44px] sm:h-auto sm:px-5 sm:py-3 sm:text-paragraph-01 sm:leading-paragraph-01',
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  size = 'default',
  disabled = false,
  loading = false,
  type = 'button',
  className,
  onClick,
  href,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const classes = cn(
    'inline-flex items-center justify-center font-body font-bold transition-colors',
    size === 'default' && 'text-paragraph-01 leading-paragraph-01',
    sizeClasses[size],
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
