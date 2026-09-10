import type { Metadata } from "next";
import DevisPageClient from "./DevisPageClient";

export const metadata: Metadata = {
  title: { absolute: "Demande de devis communication visuelle | 2F PUB" },
  description:
    "Demandez votre devis gratuit pour du covering véhicule, des enseignes, du textile personnalisé ou de l'impression grand format. Réponse sous 24h.",
  alternates: { canonical: "/devis" },
  openGraph: {
    title: "Demande de devis communication visuelle | 2F PUB",
    description:
      "Demandez votre devis gratuit pour du covering véhicule, des enseignes, du textile personnalisé ou de l'impression grand format. Réponse sous 24h.",
  },
};

export default function DevisPage() {
  return <DevisPageClient />;
}
