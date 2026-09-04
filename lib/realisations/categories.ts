// Source unique des catégories de réalisations — utilisée par l'admin (menu
// déroulant, validation) et le public (onglets de filtre, badge sur les
// cartes). Les clés reprennent celles historiquement utilisées sur
// /realisations (la page d'accueil utilisait "vehicules" pour la même
// catégorie que "covering" ici — on unifie sur ces clés-ci).

export const REALISATION_CATEGORIES = [
  { key: "covering", label: "Covering véhicule" },
  { key: "textile", label: "Textile pro" },
  { key: "enseignes", label: "Enseignes" },
  { key: "impression", label: "Impression" },
  { key: "stickers", label: "Stickers & vitro" },
] as const;

export type RealisationCategoryKey = (typeof REALISATION_CATEGORIES)[number]["key"];

export function isRealisationCategoryKey(value: string): value is RealisationCategoryKey {
  return REALISATION_CATEGORIES.some((c) => c.key === value);
}

export function realisationCategoryLabel(key: string): string {
  return REALISATION_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}
