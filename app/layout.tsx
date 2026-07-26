import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWidgets from "../components/FloatingWidgets";

export const metadata: Metadata = {
  title: "2F Publicité — Communication visuelle B2B",
  description:
    "2F Publicité : vêtements professionnels, covering véhicules, enseignes lumineuses, impression. Devis gratuit sous 24h.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
