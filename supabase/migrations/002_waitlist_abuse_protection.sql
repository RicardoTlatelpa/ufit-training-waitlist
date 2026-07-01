-- Run in Supabase SQL Editor after 001_waitlist_signups.sql

alter table public.waitlist_signups
  add column if not exists last_verification_sent_at timestamptz;

create table if not exists public.waitlist_request_log (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  ip text not null,
  email text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_request_log_ip_route_created_at_idx
  on public.waitlist_request_log (ip, route, created_at desc);

alter table public.waitlist_request_log enable row level security;
