"use client";

import { useMemo, useState } from "react";
import { REALISATION_CATEGORIES, realisationCategoryLabel } from "@/lib/realisations/categories";
import RealisationModal from "@/components/RealisationModal";

export type RealisationSummary = {
  id: number;
  slug: string;
  seoTitle: string;
  category: string;
  description: string;
  images: { url: string; alt: string }[];
};

// Grille + filtres + modale carrousel, réutilisée par /realisations (page
// complète, avec onglets "Tous") et par l'accueil (aperçu, sans onglet "Tous"
// pour rester compact — voir `showAllTab`).
export default function RealisationsGallery({
  projects,
  showAllTab = true,
}: {
  projects: RealisationSummary[];
  showAllTab?: boolean;
}) {
  // Page complète : "Tous" par défaut. Aperçu accueil (pas d'onglet "Tous") :
  // démarre sur la première catégorie, pour ne montrer qu'un aperçu ciblé.
  const [activeCategory, setActiveCategory] = useState<string>(
    showAllTab ? "all" : REALISATION_CATEGORIES[0].key
  );
  const [openProject, setOpenProject] = useState<RealisationSummary | null>(null);

  const filtered = useMemo(
    () => (activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)),
    [projects, activeCategory]
  );

  const tabs = showAllTab
    ? [{ key: "all", label: "Tous" }, ...REALISATION_CATEGORIES]
    : REALISATION_CATEGORIES;

  return (
    <>
      <div className="rea-filters">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`rea-tab${activeCategory === tab.key ? " active" : ""}`}
            onClick={() => setActiveCategory(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty-state">Aucune réalisation dans cette catégorie pour l&apos;instant.</p>
      ) : (
        <div className="rea-grid">
          {filtered.map((project) => {
            const cover = project.images[0];
            return (
              // <div role="button"> plutôt qu'un vrai <button> : le contenu
              // (image + overlay) n'est pas du "phrasing content", invalide
              // dans un <button> ; tabIndex + onKeyDown gardent l'accès clavier.
              <div
                key={project.id}
                className="rea-card"
                role="button"
                tabIndex={0}
                onClick={() => setOpenProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenProject(project);
                  }
                }}
              >
                <div className="rea-bg">
                  {cover && <img loading="lazy" src={cover.url} alt={cover.alt || project.seoTitle} />}
                </div>
                <div className="rea-overlay">
                  <span className="rea-cat-badge">{realisationCategoryLabel(project.category)}</span>
                  <div className="rea-project-title">{project.seoTitle}</div>
                  <span className="rea-cta-mini">Voir le projet →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openProject && <RealisationModal key={openProject.id} project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
}
