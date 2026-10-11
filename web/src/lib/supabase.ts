import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is OPTIONAL at runtime.
 * If the env vars are missing (e.g. before you create the project),
 * the site silently falls back to built-in content and a demo-mode
 * contact form. Nothing crashes.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let browserClient: SupabaseClient | null = null;

/** Anon client — safe for server components fetching public data. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!browserClient) browserClient = createClient(url, anonKey);
  return browserClient;
}

/** Service-role client — server ONLY (API routes). Bypasses RLS for inserts. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
