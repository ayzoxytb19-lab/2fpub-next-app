import type { Metadata } from "next";
import FicheTextilePageClient from "./FicheTextilePageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Vêtements professionnels personnalisés | 2F PUB" },
  description:
    "Broderie et flocage sur t-shirts, polos, sweats et vêtements de travail vendus et personnalisés par 2F PUB. Fabrication à Aubervilliers, devis sous 24h.",
  alternates: { canonical: "/fiches/textile" },
  openGraph: {
    title: "Vêtements professionnels personnalisés | 2F PUB",
    description:
      "Broderie et flocage sur t-shirts, polos, sweats et vêtements de travail vendus et personnalisés par 2F PUB. Fabrication à Aubervilliers, devis sous 24h.",
  },
};

// FAQPage JSON-LD : reprend mot pour mot le contenu de la FAQ déjà présente
// dans FicheTextilePageClient.tsx (voir le bloc `.fiche-faq`), sans texte
// additionnel ni promesse d'affichage enrichi Google.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la quantité minimum pour commander ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "12 pièces pour la broderie (hors casquettes/bonnets) et 10 pièces pour le flocage. Pour les casquettes et bonnets, contactez-nous directement — la quantité est flexible.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai de fabrication ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "5 à 7 jours ouvrés après validation du bon à tirer. Commande urgente ? Contactez-nous, on s'adapte.",
      },
    },
    {
      "@type": "Question",
      name: "La broderie résiste-t-elle au lavage machine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument, elle résiste à des centaines de lavages sans s'effriter — idéale pour les vêtements de travail quotidiens.",
      },
    },
    {
      "@type": "Question",
      name: "Tarifs dégressifs pour grandes quantités ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, dès 50 pièces. Demandez un devis personnalisé pour une simulation.",
      },
    },
  ],
};

export default function FicheTextilePage() {
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
          { name: "Vêtements personnalisés", path: "/fiches/textile" },
        ]}
      />
      <ServiceJsonLd
        name="Vêtements professionnels personnalisés"
        description="Broderie et flocage sur t-shirts, polos, sweats et vêtements de travail vendus et personnalisés par 2F PUB, à Aubervilliers."
        path="/fiches/textile"
      />
      <FicheTextilePageClient />
    </>
  );
}
