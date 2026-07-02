export function isWaitlistMigrationMissingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);

  return (
    message.includes('waitlist_request_log') ||
    message.includes('last_verification_sent_at')
  );
}

export const WAITLIST_MIGRATION_ERROR_MESSAGE =
  'Waitlist database setup is incomplete. Run supabase/migrations/002_waitlist_abuse_protection.sql in the Supabase SQL Editor.';
