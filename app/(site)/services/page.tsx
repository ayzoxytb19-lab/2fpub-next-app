import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { BreadcrumbJsonLd } from "@/components/PageJsonLd";

// Page convertie en Server Component pour pouvoir exporter une metadata
// propre (impossible depuis un composant "use client") — le titre suit la
// proposition validée de l'annexe A du cahier des charges. Le contenu
// interactif (onglets, modales) reste dans ServicesPageClient.tsx, inchangé.
export const metadata: Metadata = {
  title: { absolute: "Services de communication visuelle | 2F PUB" },
  description:
    "Marquage véhicule, vêtements personnalisés, enseignes lumineuses, vitrophanie, panneaux, impression grand format et flyers : toute l'offre 2F PUB fabriquée à Aubervilliers.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services de communication visuelle | 2F PUB",
    description:
      "Marquage véhicule, vêtements personnalisés, enseignes lumineuses, vitrophanie, panneaux, impression grand format et flyers : toute l'offre 2F PUB fabriquée à Aubervilliers.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }]} />
      <ServicesPageClient />
    </>
  );
}
