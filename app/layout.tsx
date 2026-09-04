import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2F Publicité — Communication visuelle B2B",
  description:
    "2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h.",
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
