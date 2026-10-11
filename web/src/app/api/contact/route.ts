import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trim = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // Honeypot — bots fill hidden fields, humans don't
  if (trim(body.company, 200)) {
    return NextResponse.json({ ok: true, demo: false }); // silently drop
  }

  const name = trim(body.name, 120);
  const email = trim(body.email, 200);
  const message = trim(body.message, 4000);
  const lang = trim(body.lang, 5) === "en" ? "en" : "pl";

  if (!name || !EMAIL_RE.test(email) || message.length < 3) {
    return NextResponse.json(
      { ok: false, error: "invalid_fields" },
      { status: 422 }
    );
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    // Supabase not wired up yet — accept in demo mode so the UX is testable.
    console.warn("[contact] Supabase not configured; demo accept:", {
      name,
      email,
    });
    return NextResponse.json({ ok: true, demo: true });
  }

  const { error } = await admin.from("contact_messages").insert({
    name,
    email,
    message,
    lang,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "db_error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, demo: false });
}
