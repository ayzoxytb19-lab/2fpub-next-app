import type { Metadata } from "next";
import "./globals.css";

// Utilisée aussi par app/robots.ts et app/sitemap.ts — garder cette valeur
// alignée avec SITE_URL dans ces deux fichiers.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "2F Publicité — Communication visuelle B2B",
    template: "%s | 2F Publicité",
  },
  description:
    "2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "2F Publicité",
    title: "2F Publicité — Communication visuelle B2B",
    description:
      "2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "2F Publicité — Communication visuelle B2B",
    description:
      "2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h.",
  },
};

// Layout minimal, commun à TOUT le site (pages publiques ET /admin) : juste
// le squelette html/body. Le header/footer/widget WhatsApp du site vitrine
// vivent dans app/(site)/layout.tsx — /admin ne les affiche pas, c'est une
// interface volontairement distincte.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
