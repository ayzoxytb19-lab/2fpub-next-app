// Composants JSON-LD réutilisables pour les pages de contenu (fiches,
// services, réalisations, à-propos). Ne portent jamais de prix, disponibilité
// ni caractéristique inventée — voir components/OrganizationJsonLd.tsx pour
// les coordonnées réelles réutilisées ici via `provider: { "@id": ... }`.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Type `Service` (pas `Product`/`Offer`) : décrit une prestation sans jamais
// afficher de prix, stock ni caractéristique commerciale chiffrée — conforme
// à la consigne de ne rien inventer sur ces points. `provider` référence
// l'Organization déjà déclarée une fois dans le layout (pas de duplication
// de coordonnées).
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["Aubervilliers", "Paris", "Seine-Saint-Denis", "Île-de-France"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
