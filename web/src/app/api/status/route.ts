import { NextResponse } from "next/server";
import {
  getSupabase,
  getSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Self-diagnostic for the Supabase wiring.
 * Open https://your-domain/api/status — it reports which env vars exist and
 * whether each table (and the v2 columns) is reachable. Reveals mistakes like
 * a missing migration, a forgotten service key, or a malformed URL.
 * Nothing secret is returned — booleans, row counts and error messages only.
 */
export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };

  let urlLooksValid = false;
  try {
    new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
    urlLooksValid = true;
  } catch {
    urlLooksValid = false;
  }

  const checks: Record<string, string> = {};
  const probe = async (
    label: string,
    fn: () => PromiseLike<{
      error: { message: string } | null;
      count?: number | null;
    }>
  ) => {
    try {
      const r = await fn();
      checks[label] = r.error
        ? `ERROR: ${r.error.message}`
        : `ok (${r.count ?? 0} rows)`;
    } catch (e) {
      checks[label] = `ERROR: ${e instanceof Error ? e.message : String(e)}`;
    }
  };

  const anon = getSupabase();
  if (anon) {
    await probe("projects_table", () =>
      anon.from("projects").select("slug", { count: "exact", head: true })
    );
    await probe("projects_v2_columns_image_url_href", () =>
      anon
        .from("projects")
        .select("image_url,href", { count: "exact", head: true })
    );
    await probe("published_projects_visible_to_site", async () => {
      const r = await anon
        .from("projects")
        .select("slug", { count: "exact", head: true })
        .eq("published", true);
      return { error: r.error, count: r.count };
    });
    await probe("site_settings_table", () =>
      anon.from("site_settings").select("key", { count: "exact", head: true })
    );
  } else {
    checks.public_client =
      "unavailable — NEXT_PUBLIC_SUPABASE_URL / ANON_KEY missing (site shows fallback content)";
  }

  const admin = getSupabaseAdmin();
  if (admin) {
    await probe("visits_table", () =>
      admin.from("visits").select("id", { count: "exact", head: true })
    );
    await probe("contact_messages_table", () =>
      admin
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
    );
  } else {
    checks.admin_client =
      "unavailable — SUPABASE_SERVICE_ROLE_KEY missing (contact form + visit log run in demo mode, nothing is saved)";
  }

  return NextResponse.json(
    {
      configured: isSupabaseConfigured,
      env,
      urlLooksValid,
      checks,
      hint: {
        missing_tables_or_columns: "run supabase/migration_v2.sql in the SQL Editor",
        env_vars_false:
          "add them in Vercel → Settings → Environment Variables, then Redeploy",
        visits_zero: "visits only log after a visitor clicks 'Accept' on the cookie banner",
      },
    },
    { status: 200 }
  );
}
