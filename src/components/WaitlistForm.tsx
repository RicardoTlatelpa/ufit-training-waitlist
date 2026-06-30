'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistSchema, type WaitlistFormValues } from '@/lib/validation';
import { typography } from '@/theme/typography';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type WaitlistFormProps = {
  className?: string;
  compact?: boolean;
};

export default function WaitlistForm({
  className,
  compact = false,
}: WaitlistFormProps) {
  const emailId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    // TODO: wire to waitlist API
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          'rounded-xl border border-success-200 bg-success-50 px-5 py-4',
          className,
        )}
        role="status"
      >
        <p className="font-heading text-heading-04 font-semibold text-success-700">
          You&apos;re on the list!
        </p>
        <p className={cn('mt-1', typography.bodySecondary)}>
          We&apos;ll reach out when beta spots open up.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        compact ? 'flex flex-col gap-3 sm:flex-row sm:items-start' : 'space-y-3',
        className,
      )}
      noValidate
    >
      <div className={cn(compact && 'flex-1')}>
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(
            'w-full min-h-[44px] rounded-md border border-gray-300 bg-white px-4 py-3 font-body text-paragraph-01 text-gray-900 placeholder:text-gray-500',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
            errors.email && 'border-error-500 focus:border-error-500 focus:ring-error-100',
          )}
          {...register('email')}
        />
        {errors.email ? (
          <p className={cn('mt-1', typography.caption, 'text-error-500')}>
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={!isValid}
        loading={submitting}
        className={cn(compact && 'w-full sm:w-auto sm:shrink-0')}
      >
        Join the Beta Waitlist
      </Button>
    </form>
  );
}
