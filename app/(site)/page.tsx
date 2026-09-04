import HomeClient from "./HomeClient";
import { getPublishedRealisations } from "@/lib/realisations/data";
import type { RealisationSummary } from "@/components/RealisationsGallery";

// Les réalisations affichées ici viennent de la base (gérées depuis
// /admin/realisations) : jamais de pré-rendu figé au build.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let realisations: RealisationSummary[] = [];
  try {
    realisations = await getPublishedRealisations();
  } catch (err) {
    console.error("Impossible de charger les réalisations pour l'accueil :", err);
  }

  return <HomeClient realisations={realisations} />;
}
