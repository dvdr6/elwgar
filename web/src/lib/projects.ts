import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  title: string;
  category_pl: string;
  category_en: string;
  year: number;
  /** Visual theme of the placeholder tile: invert | invert2 | mark | mark2 | grid | stripes */
  theme: string;
  description_pl: string | null;
  description_en: string | null;
  /** Real cover image URL (e.g. Supabase Storage). Overrides the placeholder tile. */
  image_url: string | null;
  /** External link for the tile. Falls back to the contact section when empty. */
  href: string | null;
}

/* ------------------------------------------------------------------ */
/* Fallback content — used until Supabase is connected/seeded          */
/* ------------------------------------------------------------------ */

export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: "nordhaus",
    title: "NORDHAUS",
    category_pl: "Strona internetowa",
    category_en: "Website",
    year: 2026,
    theme: "invert",
    image_url: null,
    href: null,
    description_pl: "Architektura wymaga ciszy. Strona, która kadruje przestrzeń jak obiektyw.",
    description_en: "Architecture requires silence. A website that frames space like a lens.",
  },
  {
    slug: "kava-studios",
    title: "KAVA STUDIOS",
    category_pl: "Identyfikacja wizualna",
    category_en: "Visual identity",
    year: 2025,
    theme: "mark",
    image_url: null,
    href: null,
    description_pl: "Pełny system wizualny dla studia kawowego: znak, typografia, opakowania.",
    description_en: "Full visual system for a coffee studio: mark, typography, packaging.",
  },
  {
    slug: "mono-records",
    title: "MONO RECORDS",
    category_pl: "Branding",
    category_en: "Branding",
    year: 2025,
    theme: "stripes",
    image_url: null,
    href: null,
    description_pl: "Wytwórnia, która wydaje tylko winyle. Wizerunek równie analogowy jak dźwięk.",
    description_en: "A vinyl-only record label. An identity as analogue as the sound.",
  },
  {
    slug: "atelier-44",
    title: "ATELIER 44",
    category_pl: "Identyfikacja + web",
    category_en: "Identity + web",
    year: 2026,
    theme: "grid",
    image_url: null,
    href: null,
    description_pl: "Pracownia projektowa. Znak, brandbook i strona w jednym sprincie.",
    description_en: "A design atelier. Mark, brandbook and website in a single sprint.",
  },
  {
    slug: "blk-coffee",
    title: "BLK COFFEE",
    category_pl: "Opakowania",
    category_en: "Packaging",
    year: 2024,
    theme: "mark2",
    image_url: null,
    href: null,
    description_pl: "Seria opakowań, w których nazwa palenia jest jedyną dekoracją.",
    description_en: "A packaging series where the roast name is the only decoration.",
  },
  {
    slug: "form-studio",
    title: "FORM STUDIO",
    category_pl: "System wizualny",
    category_en: "Visual system",
    year: 2025,
    theme: "invert2",
    image_url: null,
    href: null,
    description_pl: "Elastyczny system siatkowy, który skaluje się od stories po fasadę budynku.",
    description_en: "A flexible grid system scaling from stories to a building facade.",
  },
];

/* ------------------------------------------------------------------ */
/* Fetch — Supabase if configured, otherwise fallback                  */
/* ------------------------------------------------------------------ */

export async function getProjects(): Promise<{
  projects: Project[];
  fromSupabase: boolean;
}> {
  if (!isSupabaseConfigured) {
    return { projects: FALLBACK_PROJECTS, fromSupabase: false };
  }

  const BASE =
    "slug,title,category_pl,category_en,year,theme,description_pl,description_en";
  const FULL = `${BASE},image_url,href`;

  try {
    const supabase = getSupabase()!;
    let { data, error } = await supabase
      .from("projects")
      .select(FULL)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    // Older database (schema v1, no image_url/href)? Retry with base columns
    // so portfolio edits still go live before migration_v2 is run.
    if (error && /column|image_url|href/i.test(error.message)) {
      console.warn(
        "[projects] full select failed, retrying base columns — run migration_v2.sql:",
        error.message
      );
      const retry = await supabase
        .from("projects")
        .select(BASE)
        .eq("published", true)
        .order("sort_order", { ascending: true });
      data = (retry.data ?? []).map((p) => ({
        ...p,
        image_url: null,
        href: null,
      })) as Project[];
      error = retry.error;
    }

    if (error) {
      console.error("[projects] supabase error:", error.message);
      return { projects: FALLBACK_PROJECTS, fromSupabase: false };
    }

    // 0 visible rows → table empty or all unpublished: fall back to the
    // placeholder grid so the site never renders an empty portfolio.
    if (!data || data.length === 0) {
      return { projects: FALLBACK_PROJECTS, fromSupabase: false };
    }

    return { projects: data as Project[], fromSupabase: true };
  } catch {
    return { projects: FALLBACK_PROJECTS, fromSupabase: false };
  }
}
