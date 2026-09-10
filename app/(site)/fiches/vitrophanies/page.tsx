import type { Metadata } from "next";
import FicheVitrophaniesPageClient from "./FicheVitrophaniesPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Vitrophanie & adhésifs pour vitrines | 2F PUB" },
  description:
    "Adhésifs imprimés, lettrage découpé, films dépolis, microperforés et décoratifs pour commerces et bureaux. Fabrication à Aubervilliers, sur devis.",
  alternates: { canonical: "/fiches/vitrophanies" },
  openGraph: {
    title: "Vitrophanie & adhésifs pour vitrines | 2F PUB",
    description:
      "Adhésifs imprimés, lettrage découpé, films dépolis, microperforés et décoratifs pour commerces et bureaux. Fabrication à Aubervilliers, sur devis.",
  },
};

export default function FicheVitrophaniesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Vitrophanies", path: "/fiches/vitrophanies" },
        ]}
      />
      <ServiceJsonLd
        name="Vitrophanie & adhésifs pour vitrines"
        description="Fabrication d'adhésifs imprimés, lettrage découpé, films dépolis, microperforés et décoratifs pour commerces et bureaux, à Aubervilliers."
        path="/fiches/vitrophanies"
      />
      <FicheVitrophaniesPageClient />
    </>
  );
}
