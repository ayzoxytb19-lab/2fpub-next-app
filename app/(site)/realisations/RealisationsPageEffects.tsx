"use client";

import { useEffect } from "react";
import { initCarousel, initGlobalKeydown, initRevealAndCountUps } from "../../../lib/interactions";

// La page est passée en Server Component pour charger les réalisations
// depuis la base (voir page.tsx) ; ce petit composant client ne fait que
// brancher les effets DOM restants (reveal au scroll, compteurs, carrousel
// d'avis, Échap). Le filtrage/la modale réalisations sont maintenant gérés
// par RealisationsGallery/RealisationModal (état React, pas DOM).
export default function RealisationsPageEffects() {
  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    const cleanupCarousel = initCarousel();
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      cleanupCarousel();
    };
  }, []);

  return null;
}
