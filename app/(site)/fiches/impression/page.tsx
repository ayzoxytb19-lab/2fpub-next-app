import type { Metadata } from "next";
import FicheImpressionPageClient from "./FicheImpressionPageClient";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/PageJsonLd";

export const metadata: Metadata = {
  title: { absolute: "Impression grand format, stickers & bâches | 2F PUB" },
  description:
    "Stickers, bâches, adhésifs muraux imprimés, roll-up, kakémonos, drapeaux et affiches jusqu'à 1,55 m de large. Fabrication à Aubervilliers, devis sous 24h.",
  alternates: { canonical: "/fiches/impression" },
  openGraph: {
    title: "Impression grand format, stickers & bâches | 2F PUB",
    description:
      "Stickers, bâches, adhésifs muraux imprimés, roll-up, kakémonos, drapeaux et affiches jusqu'à 1,55 m de large. Fabrication à Aubervilliers, devis sous 24h.",
  },
};

// FAQPage JSON-LD : reprend mot pour mot le contenu de la FAQ déjà présente
// dans FicheImpressionPageClient.tsx.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel format de fichier fournir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Idéalement un fichier vectoriel AI ou PDF. On accepte aussi les PNG haute résolution (min. 300 dpi). Si vous n'avez pas de fichier prêt, notre studio peut créer ou adapter votre visuel sur devis.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai de production ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le délai varie selon le produit et le format — il vous est communiqué précisément lors du devis. Besoin urgent ? Contactez-nous, on s'adapte.",
      },
    },
    {
      "@type": "Question",
      name: "Les stickers résistent-ils à l'extérieur ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nos vinyles résistent aux UV, à la pluie et aux écarts de température. La Classique + protection tient mieux en extérieur intensif.",
      },
    },
  ],
};

export default function FicheImpressionPage() {
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
          { name: "Impressions", path: "/fiches/impression" },
        ]}
      />
      <ServiceJsonLd
        name="Impression grand format, stickers & bâches"
        description="Fabrication de stickers, bâches, adhésifs muraux imprimés, roll-up, kakémonos, drapeaux et affiches à Aubervilliers."
        path="/fiches/impression"
      />
      <FicheImpressionPageClient />
    </>
  );
}
