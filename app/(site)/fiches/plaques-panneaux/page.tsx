import type { Metadata } from "next";
import FichePlaquesPanneauxPageClient from "./FichePlaquesPanneauxPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Panneaux publicitaires & plaques sur mesure | 2F PUB" },
  description:
    "Panneaux de chantier, panneaux immobiliers et plaques professionnelles en Akilux, PVC, Dibond ou aluminium. Fabrication à Aubervilliers, cible BTP.",
  alternates: { canonical: "/fiches/plaques-panneaux" },
  openGraph: {
    title: "Panneaux publicitaires & plaques sur mesure | 2F PUB",
    description:
      "Panneaux de chantier, panneaux immobiliers et plaques professionnelles en Akilux, PVC, Dibond ou aluminium. Fabrication à Aubervilliers, cible BTP.",
  },
};

export default function FichePlaquesPanneauxPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Plaques & Panneaux", path: "/fiches/plaques-panneaux" },
        ]}
      />
      <ServiceJsonLd
        name="Panneaux publicitaires & plaques sur mesure"
        description="Fabrication de panneaux de chantier, panneaux immobiliers et plaques professionnelles en Akilux, PVC, Dibond ou aluminium, à Aubervilliers."
        path="/fiches/plaques-panneaux"
      />
      <FichePlaquesPanneauxPageClient />
    </>
  );
}
