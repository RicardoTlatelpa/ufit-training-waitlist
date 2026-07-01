'use client';

import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { waitlistFormSchema, type WaitlistFormValues } from '@/lib/validation';
import { typography } from '@/theme/typography';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type WaitlistFormProps = {
  className?: string;
};

type SubmitStatus = 'verification_sent' | 'already_verified';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export default function WaitlistForm({
  className,
}: WaitlistFormProps) {
  const emailId = useId();
  const companyId = useId();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState(
    turnstileSiteKey ? '' : 'dev-bypass',
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email: '', company: '' },
  });

  const canSubmit = isValid && Boolean(turnstileToken);

  const onSubmit = async (data: WaitlistFormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          company: data.company,
          turnstileToken,
        }),
      });

      const payload = (await response.json()) as {
        status?: SubmitStatus;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setSubmitError(payload.error ?? 'Unable to submit your signup. Please try again.');
        turnstileRef.current?.reset();
        setTurnstileToken(turnstileSiteKey ? '' : 'dev-bypass');
        return;
      }

      setSubmitStatus(payload.status ?? 'verification_sent');
    } catch {
      setSubmitError('Unable to submit your signup. Please try again.');
      turnstileRef.current?.reset();
      setTurnstileToken(turnstileSiteKey ? '' : 'dev-bypass');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitStatus === 'verification_sent') {
    return (
      <div
        className={cn(
          'rounded-xl border border-primary-200 bg-primary-50 px-5 py-4',
          className,
        )}
        role="status"
      >
        <p className="font-heading text-heading-04 font-semibold text-primary-800">
          Check your email
        </p>
        <p className={cn('mt-1', typography.bodySecondary)}>
          We sent you a confirmation link. Click it to verify your email and join the beta
          waitlist.
        </p>
      </div>
    );
  }

  if (submitStatus === 'already_verified') {
    return (
      <div
        className={cn(
          'rounded-xl border border-success-200 bg-success-50 px-5 py-4',
          className,
        )}
        role="status"
      >
        <p className="font-heading text-heading-04 font-semibold text-success-700">
          You&apos;re already confirmed
        </p>
        <p className={cn('mt-1', typography.bodySecondary)}>
          This email is already on the verified beta waitlist.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-3', className)}
      noValidate
    >
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={companyId}>Company</label>
        <input
          id={companyId}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>
      <div>
        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(
            'w-full min-h-[48px] rounded-lg border border-gray-300 bg-white px-4 py-3.5 font-body text-base text-gray-900 placeholder:text-gray-500 sm:min-h-[44px] sm:rounded-md sm:py-3 sm:text-paragraph-01',
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
        {submitError ? (
          <p className={cn('mt-1', typography.caption, 'text-error-500')}>{submitError}</p>
        ) : null}
      </div>
      {turnstileSiteKey ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken('')}
          onError={() => setTurnstileToken('')}
          options={{ theme: 'light', size: 'flexible' }}
        />
      ) : null}
      <Button
        type="submit"
        disabled={!canSubmit}
        loading={submitting}
      >
        Join the Beta Waitlist
      </Button>
    </form>
  );
}
