import type { Metadata } from "next";
import FicheLogoLumineuxPageClient from "./FicheLogoLumineuxPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Logo lumineux personnalisé sur mesure | 2F PUB" },
  description:
    "Boîtier Plexi lumineux avec face et chants rétroéclairés, pour accueil, comptoir, bureaux ou décoration murale. Fabrication à Aubervilliers, sur devis.",
  alternates: { canonical: "/fiches/logo-lumineux" },
  openGraph: {
    title: "Logo lumineux personnalisé sur mesure | 2F PUB",
    description:
      "Boîtier Plexi lumineux avec face et chants rétroéclairés, pour accueil, comptoir, bureaux ou décoration murale. Fabrication à Aubervilliers, sur devis.",
  },
};

export default function FicheLogoLumineuxPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Logo lumineux", path: "/fiches/logo-lumineux" },
        ]}
      />
      <ServiceJsonLd
        name="Logo lumineux personnalisé sur mesure"
        description="Fabrication de boîtiers Plexi lumineux avec face et chants rétroéclairés, sur mesure, à Aubervilliers."
        path="/fiches/logo-lumineux"
      />
      <FicheLogoLumineuxPageClient />
    </>
  );
}
