'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  fetchWaitlistEmailAvailability,
  getWaitlistEmailAvailabilityMessage,
  validateWaitlistEmailFormat,
} from '@/lib/waitlistEmailValidation';
import { waitlistSchema, type WaitlistFormValues } from '@/lib/validation';
import { typography } from '@/theme/typography';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type WaitlistFormProps = {
  className?: string;
};

type SubmitStatus = 'verification_sent' | 'already_verified';

type WaitlistConfig = {
  turnstileSiteKey: string;
  turnstileEnabled: boolean;
};

export default function WaitlistForm({
  className,
}: WaitlistFormProps) {
  const emailId = useId();
  const companyId = useId();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const emailCheckRequestId = useRef(0);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [availabilityHint, setAvailabilityHint] = useState<string | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [config, setConfig] = useState<WaitlistConfig | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch('/api/waitlist/config');
        const payload = (await response.json()) as WaitlistConfig;
        if (cancelled) return;

        setConfig(payload);
        setTurnstileToken(payload.turnstileEnabled ? '' : 'dev-bypass');
      } catch {
        if (cancelled) return;
        setConfig({ turnstileSiteKey: '', turnstileEnabled: false });
        setTurnstileToken('dev-bypass');
      }
    }

    void loadConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', company: '' },
  });

  const emailValue = watch('email');
  const turnstileRequired = Boolean(config?.turnstileEnabled);
  const turnstileReady = !turnstileRequired || Boolean(turnstileToken);
  const configLoaded = config !== null;
  const canSubmit =
    configLoaded && Boolean(emailValue.trim()) && turnstileReady && !submitting;

  const resetTurnstile = () => {
    turnstileRef.current?.reset();
    setTurnstileToken(config?.turnstileEnabled ? '' : 'dev-bypass');
    setTurnstileError(null);
  };

  const checkEmailAvailabilityOnBlur = async (email: string) => {
    const format = validateWaitlistEmailFormat(email);
    setAvailabilityHint(null);

    if (!format.ok) {
      return;
    }

    const requestId = ++emailCheckRequestId.current;
    setCheckingAvailability(true);

    try {
      const status = await fetchWaitlistEmailAvailability(format.email);

      if (requestId !== emailCheckRequestId.current) {
        return;
      }

      if (status === 'invalid_format') {
        return;
      }

      if (status === 'available') {
        setAvailabilityHint(null);
        clearErrors('email');
        return;
      }

      const message = getWaitlistEmailAvailabilityMessage(status);
      setAvailabilityHint(message);
      setError('email', { type: 'manual', message });
    } catch (error) {
      if (requestId !== emailCheckRequestId.current) {
        return;
      }

      const message =
        error instanceof Error && error.message.includes('Too many requests')
          ? error.message
          : null;
      setAvailabilityHint(message);
    } finally {
      if (requestId === emailCheckRequestId.current) {
        setCheckingAvailability(false);
      }
    }
  };

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
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const payload = (await response.json()) as {
        status?: SubmitStatus;
        message?: string;
        error?: string;
        reason?: string;
      };

      if (!response.ok) {
        const detail = payload.reason ? ` ${payload.reason}` : '';
        setSubmitError(
          (payload.error ?? 'Unable to submit your signup. Please try again.') + detail,
        );
        resetTurnstile();
        return;
      }

      setSubmitStatus(payload.status ?? 'verification_sent');
    } catch {
      setSubmitError('Unable to submit your signup. Please try again.');
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  };

  const emailField = register('email');

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
          name={emailField.name}
          ref={emailField.ref}
          onChange={(event) => {
            setAvailabilityHint(null);
            clearErrors('email');
            void emailField.onChange(event);
          }}
          onBlur={(event) => {
            void emailField.onBlur(event);
            void checkEmailAvailabilityOnBlur(event.target.value);
          }}
        />
        {errors.email ? (
          <p className={cn('mt-1', typography.caption, 'text-error-500')}>
            {errors.email.message}
          </p>
        ) : checkingAvailability ? (
          <p className={cn('mt-1', typography.caption, 'text-gray-500')}>
            Checking email…
          </p>
        ) : availabilityHint ? (
          <p className={cn('mt-1', typography.caption, 'text-error-500')}>{availabilityHint}</p>
        ) : null}
        {submitError ? (
          <p className={cn('mt-1', typography.caption, 'text-error-500')}>{submitError}</p>
        ) : null}
      </div>
      {!configLoaded ? (
        <p className={cn(typography.caption, 'text-gray-500')}>Loading form…</p>
      ) : null}
      {configLoaded && config.turnstileSiteKey ? (
        <div className="space-y-2">
          <Turnstile
            ref={turnstileRef}
            siteKey={config.turnstileSiteKey}
            onSuccess={(token) => {
              setTurnstileToken(token);
              setTurnstileError(null);
            }}
            onExpire={() => setTurnstileToken('')}
            onError={() => {
              setTurnstileToken('');
              setTurnstileError(
                'Security check failed to load. Try refreshing the page or disabling ad blockers.',
              );
            }}
            options={{ theme: 'light', size: 'normal' }}
          />
          {!turnstileToken && !turnstileError ? (
            <p className={cn(typography.caption, 'text-gray-500')}>
              Complete the security check above to enable signup.
            </p>
          ) : null}
          {turnstileError ? (
            <p className={cn(typography.caption, 'text-error-500')}>{turnstileError}</p>
          ) : null}
        </div>
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
