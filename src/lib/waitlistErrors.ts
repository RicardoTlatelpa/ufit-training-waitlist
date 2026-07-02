export class WaitlistEmailDeliveryError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'WaitlistEmailDeliveryError';
    if (options?.cause) {
      this.cause = options.cause;
    }
  }
}
