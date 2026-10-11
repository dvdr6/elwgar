import { getProjects } from "@/lib/projects";
import { getSettings } from "@/lib/settings";
import Site from "@/components/Site";

export const revalidate = 60; // refresh content from Supabase at most once a minute

export default async function Home() {
  const [{ projects, fromSupabase }, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);
  return (
    <Site projects={projects} fromSupabase={fromSupabase} settings={settings} />
  );
}
