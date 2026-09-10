import type { Metadata } from "next";
import SuppressionDonneesPageClient from "./SuppressionDonneesPageClient";

export const metadata: Metadata = {
  title: { absolute: "Suppression de données personnelles | 2F PUB" },
  description:
    "Exercez vos droits RGPD auprès de 2F Publicité : accès, rectification, effacement, limitation, portabilité et opposition sur vos données personnelles.",
  alternates: { canonical: "/suppression-donnees" },
};

export default function SuppressionDonneesPage() {
  return <SuppressionDonneesPageClient />;
}
