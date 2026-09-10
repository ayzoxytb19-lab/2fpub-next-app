import type { Metadata } from "next";
import FicheEnseignesPageClient from "./FicheEnseignesPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Enseignes lumineuses sur mesure | 2F PUB" },
  description:
    "7 techniques d'enseignes lumineuses exposées en showroom à Aubervilliers : ajouré, PVC et alu rétroéclairés, relief PMMA, boîtier Plexi. Fabrication sur devis.",
  alternates: { canonical: "/fiches/enseignes" },
  openGraph: {
    title: "Enseignes lumineuses sur mesure | 2F PUB",
    description:
      "7 techniques d'enseignes lumineuses exposées en showroom à Aubervilliers : ajouré, PVC et alu rétroéclairés, relief PMMA, boîtier Plexi. Fabrication sur devis.",
  },
};

// FAQPage JSON-LD : reprend mot pour mot le contenu de la FAQ déjà présente
// dans FicheEnseignesPageClient.tsx.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment choisir la bonne technique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Venez au showroom toucher et comparer les 7 techniques. On vous conseille selon votre budget, votre façade et votre image. Devis gratuit et sans engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il un permis pour installer une enseigne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En dessous de 1 m², une déclaration en mairie suffit souvent. Au-delà, on vous accompagne dans les démarches d'autorisation.",
      },
    },
    {
      "@type": "Question",
      name: "Quel délai entre commande et pose ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7 à 10 jours ouvrés après validation du BAT. Installation planifiée avec vous, intervention rapide en Île-de-France.",
      },
    },
  ],
};

export default function FicheEnseignesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Enseignes", path: "/fiches/enseignes" },
        ]}
      />
      <ServiceJsonLd
        name="Enseignes lumineuses sur mesure"
        description="Fabrication de 7 techniques d'enseignes lumineuses exposées en showroom à Aubervilliers : ajouré, PVC et alu rétroéclairés, relief PMMA, boîtier Plexi."
        path="/fiches/enseignes"
      />
      <FicheEnseignesPageClient />
    </>
  );
}
