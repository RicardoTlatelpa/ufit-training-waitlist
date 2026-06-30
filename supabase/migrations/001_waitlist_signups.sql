-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  verified_at timestamptz,
  verification_token text,
  verification_token_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_verification_token_idx
  on public.waitlist_signups (verification_token)
  where verification_token is not null;

create index if not exists waitlist_signups_verified_at_idx
  on public.waitlist_signups (verified_at);

alter table public.waitlist_signups enable row level security;

-- Only the service role (used by API routes) can access this table.

create or replace function public.set_waitlist_signups_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists waitlist_signups_updated_at on public.waitlist_signups;

create trigger waitlist_signups_updated_at
before update on public.waitlist_signups
for each row
execute function public.set_waitlist_signups_updated_at();
