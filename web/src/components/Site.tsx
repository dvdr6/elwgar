"use client";

import type { Project } from "@/lib/projects";
import type { SiteSettings } from "@/lib/settings";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Studio from "@/components/Studio";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Site({
  projects,
  fromSupabase,
  settings,
}: {
  projects: Project[];
  fromSupabase: boolean;
  settings: SiteSettings;
}) {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio projects={projects} fromSupabase={fromSupabase} />
        <Studio />
        <ContactSection email={settings.contact_email} />
      </main>
      <Footer settings={settings} />
      <CookieBanner />
    </>
  );
}
