import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Visit logging. Called ONLY after the visitor clicks "Accept" on the cookie
 * banner. Records the IP (from the platform's forwarding headers), country,
 * chosen language, path and user agent into the `visits` table.
 * Viewing the data: Supabase dashboard → Table Editor → visits,
 * or the `visits_summary` view (counts per IP).
 */

const trim = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty body is tolerated */
  }

  // Explicit consent required — this is the GDPR guard.
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "consent_required" },
      { status: 403 }
    );
  }

  const h = req.headers;
  const forwarded = h.get("x-forwarded-for") ?? h.get("x-vercel-forwarded-for");
  const ip = trim(
    forwarded?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown",
    45
  );
  const country = trim(
    h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "",
    2
  );
  const lang = trim(body.lang, 5) === "en" ? "en" : "pl";
  const path = trim(body.path, 200) || "/";
  const ua = trim(h.get("user-agent"), 300);

  const admin = getSupabaseAdmin();
  if (!admin) {
    console.warn("[visit] Supabase not configured; demo accept:", { ip, lang });
    return NextResponse.json({ ok: true, demo: true });
  }

  const { error } = await admin
    .from("visits")
    .insert({ ip, country, lang, path, user_agent: ua });

  if (error) {
    console.error("[visit] insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, demo: false });
}
