import type { Metadata } from "next";
import ConfidentialitePageClient from "./ConfidentialitePageClient";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité | 2F PUB" },
  description:
    "Politique de confidentialité de 2fpub.fr : traitement des données personnelles, cookies et droits RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return <ConfidentialitePageClient />;
}
