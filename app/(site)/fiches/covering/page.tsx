import type { Metadata } from "next";
import FicheCoveringPageClient from "./FicheCoveringPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Marquage véhicule & covering publicitaire | 2F PUB" },
  description:
    "Adhésif découpé, adhésif imprimé, semi-covering et plaques magnétiques pour voitures, utilitaires et flottes. Fabrication et pose à Aubervilliers, devis sous 24h.",
  alternates: { canonical: "/fiches/covering" },
  openGraph: {
    title: "Marquage véhicule & covering publicitaire | 2F PUB",
    description:
      "Adhésif découpé, adhésif imprimé, semi-covering et plaques magnétiques pour voitures, utilitaires et flottes. Fabrication et pose à Aubervilliers, devis sous 24h.",
  },
};

// FAQPage JSON-LD : reprend mot pour mot le contenu de la FAQ déjà présente
// dans FicheCoveringPageClient.tsx.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps dure la pose ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entre 2h et une journée selon la surface. Adhésif découpe : 2-3h. Semi-covering complet : jusqu'à une journée. Véhicule rendu le jour même ou le lendemain.",
      },
    },
    {
      "@type": "Question",
      name: "Le covering abîme-t-il la peinture ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, au contraire : le vinyle protège la peinture d'origine des UV et micro-rayures. À la dépose, elle est préservée.",
      },
    },
    {
      "@type": "Question",
      name: "Avez-vous des tarifs dégressifs pour une flotte ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, dès 3 véhicules. Plus la flotte est importante, plus le coût unitaire diminue — contactez-nous pour un devis personnalisé.",
      },
    },
  ],
};

export default function FicheCoveringPage() {
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
          { name: "Marquage véhicule", path: "/fiches/covering" },
        ]}
      />
      <ServiceJsonLd
        name="Marquage véhicule & covering publicitaire"
        description="Adhésif découpé, adhésif imprimé et semi-covering pour voitures, utilitaires et flottes. Fabrication et pose à Aubervilliers."
        path="/fiches/covering"
      />
      <FicheCoveringPageClient />
    </>
  );
}
