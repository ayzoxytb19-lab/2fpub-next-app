import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getPublishedRealisations } from "@/lib/realisations/data";
import type { RealisationSummary } from "@/components/RealisationsGallery";

// Les réalisations affichées ici viennent de la base (gérées depuis
// /admin/realisations) : jamais de pré-rendu figé au build.
export const dynamic = "force-dynamic";

// Titre validé par l'annexe A du cahier des charges (section 14) — remplace
// le titre générique hérité de app/layout.tsx pour la page d'accueil.
export const metadata: Metadata = {
  title: { absolute: "2F PUB | Communication visuelle & publicité à Aubervilliers" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "2F PUB | Communication visuelle & publicité à Aubervilliers",
  },
};

export default async function HomePage() {
  let realisations: RealisationSummary[] = [];
  try {
    realisations = await getPublishedRealisations();
  } catch (err) {
    console.error("Impossible de charger les réalisations pour l'accueil :", err);
  }

  return <HomeClient realisations={realisations} />;
}
