// JSON-LD LocalBusiness, injecté une fois pour tout le site public (voir
// app/(site)/layout.tsx). Uniquement des données déjà présentes ailleurs
// dans le code (mentions légales, footer, page d'accueil) — aucune donnée
// inventée : pas de note/avis agrégés, pas de SIREN pour 2F Publicité lui-même
// (non affiché nulle part dans le site), pas d'horaires autres que ceux déjà
// publiés.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.2fpub.fr";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "2F Publicité",
  alternateName: "2F PUB",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-2f-3d.png`,
  image: `${SITE_URL}/logo-2f-3d.png`,
  telephone: "+33143522424",
  email: "contact@2fpub.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "217 avenue Jean Jaurès",
    postalCode: "93300",
    addressLocality: "Aubervilliers",
    addressCountry: "FR",
  },
  areaServed: ["Aubervilliers", "Paris", "Seine-Saint-Denis", "Île-de-France"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/2fpub",
    "https://www.instagram.com/2fpublicite/",
    "https://www.tiktok.com/@2fpub",
  ],
};

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
