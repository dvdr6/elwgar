import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELWGAR — Międzynarodowe Studio Wizualne",
  description:
    "ELWGAR to międzynarodowe studio wizualne. Identyfikacje wizualne i strony internetowe dla marek z całego świata. Nasza marka: czerń + biel. Twoja: dowolna.",
  keywords: [
    "identyfikacja wizualna",
    "visual identity",
    "logo",
    "brandbook",
    "strony internetowe",
    "web design",
    "ELWGAR",
  ],
  openGraph: {
    title: "ELWGAR — Międzynarodowe Studio Wizualne",
    description:
      "Identyfikacje wizualne i strony internetowe. Nasza marka: czerń + biel — Twoja: dowolna.",
    type: "website",
    locale: "pl_PL",
    alternateLocale: "en_US",
    siteName: "ELWGAR Visual Studio",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${archivo.variable} ${plexMono.variable} font-sans`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
