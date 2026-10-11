import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/* Editable site settings — stored in Supabase `site_settings`,        */
/* changeable from the dashboard with zero redeploys.                  */
/* ------------------------------------------------------------------ */

export interface SiteSettings {
  contact_email: string;
  instagram_url: string;
  behance_url: string;
  linkedin_url: string;
}

export const FALLBACK_SETTINGS: SiteSettings = {
  contact_email: "hello@elwgar.com",
  instagram_url: "#",
  behance_url: "#",
  linkedin_url: "#",
};

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return FALLBACK_SETTINGS;
  try {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");
    if (error || !data) return FALLBACK_SETTINGS;

    const merged = { ...FALLBACK_SETTINGS };
    for (const row of data as { key: string; value: string }[]) {
      if (row.key in merged) {
        merged[row.key as keyof SiteSettings] = row.value || FALLBACK_SETTINGS[row.key as keyof SiteSettings];
      }
    }
    return merged;
  } catch {
    return FALLBACK_SETTINGS;
  }
}
