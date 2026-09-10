import type { Metadata } from "next";
import FicheFlyersPageClient from "./FicheFlyersPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Flyers & cartes de visite professionnels | 2F PUB" },
  description:
    "Cartes de visite, flyers 135g demi-mat et dépliants, avec création graphique sur devis. Impression à Aubervilliers, tarifs dégressifs par quantité.",
  alternates: { canonical: "/fiches/flyers" },
  openGraph: {
    title: "Flyers & cartes de visite professionnels | 2F PUB",
    description:
      "Cartes de visite, flyers 135g demi-mat et dépliants, avec création graphique sur devis. Impression à Aubervilliers, tarifs dégressifs par quantité.",
  },
};

export default function FicheFlyersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Petite papeterie", path: "/fiches/flyers" },
        ]}
      />
      <ServiceJsonLd
        name="Flyers & cartes de visite professionnels"
        description="Impression de cartes de visite et flyers 135g demi-mat, avec création graphique sur devis. Impression à Aubervilliers."
        path="/fiches/flyers"
      />
      <FicheFlyersPageClient />
    </>
  );
}
