import { z } from 'zod';
import {
  getWaitlistEmailAvailabilityMessage,
  validateWaitlistEmailFormat,
  validateWaitlistEmailInput,
  waitlistEmailFieldSchema,
  type WaitlistEmailAvailability,
} from '@/lib/waitlistEmailValidation';

export { waitlistEmailFieldSchema, validateWaitlistEmailFormat, validateWaitlistEmailInput };
export type { WaitlistEmailAvailability };

export const waitlistSchema = z.object({
  email: waitlistEmailFieldSchema,
  company: z.string().optional(),
});

export const waitlistFormSchema = waitlistSchema.superRefine(async (data, ctx) => {
  const message = await validateWaitlistEmailInput(data.email);

  if (message !== true) {
    ctx.addIssue({
      code: 'custom',
      message,
      path: ['email'],
    });
  }
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export function getWaitlistEmailCheckError(
  status: WaitlistEmailAvailability,
): string | null {
  if (status === 'available') {
    return null;
  }

  return getWaitlistEmailAvailabilityMessage(status);
}
