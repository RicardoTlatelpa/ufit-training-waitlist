import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type WaitlistSignupRow = {
  id: string;
  email: string;
  verified_at: string | null;
  verification_token: string | null;
  verification_token_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  supabaseAdmin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return supabaseAdmin;
}
