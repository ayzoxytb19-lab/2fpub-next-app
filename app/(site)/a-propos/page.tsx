import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { BreadcrumbJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "À propos de 2F PUB | Communication visuelle depuis 1999" },
  description:
    "2F Publicité, agence de communication visuelle B2B installée à Aubervilliers depuis 1999. Découvrez notre atelier de fabrication et notre savoir-faire.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos de 2F PUB | Communication visuelle depuis 1999",
    description:
      "2F Publicité, agence de communication visuelle B2B installée à Aubervilliers depuis 1999. Découvrez notre atelier de fabrication et notre savoir-faire.",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", path: "/" }, { name: "À propos", path: "/a-propos" }]} />
      <AboutPageClient />
    </>
  );
}
