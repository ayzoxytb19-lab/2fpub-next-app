"use client";

import { useActionState, useState } from "react";
import RealisationImagesUpload from "@/components/admin/RealisationImagesUpload";
import { slugify } from "@/lib/slug";
import { REALISATION_CATEGORIES, realisationCategoryLabel } from "@/lib/realisations/categories";
import type { RealisationFormState } from "@/lib/admin/actions/realisations";
import { generateRealisationFromTopic } from "@/lib/admin/actions/ai";

type Action = (state: RealisationFormState, formData: FormData) => Promise<RealisationFormState>;

export default function RealisationForm({
  action,
  canPublish,
  submitLabel,
  defaultValues,
}: {
  action: Action;
  canPublish: boolean;
  submitLabel: string;
  defaultValues?: {
    seoTitle?: string;
    slug?: string;
    category?: string;
    description?: string;
    status?: "draft" | "published";
    images?: { url: string; alt: string }[];
  };
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const [seoTitle, setSeoTitle] = useState(defaultValues?.seoTitle ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.slug));
  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");

  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!aiTopic.trim()) {
      setAiError("Décrivez le chantier.");
      return;
    }
    if ((seoTitle || description) && !confirm("Remplacer le titre et la description actuels par la version générée par l'IA ?")) {
      return;
    }

    setAiLoading(true);
    setAiError(null);
    try {
      const result = await generateRealisationFromTopic(aiTopic, category);
      if ("error" in result) {
        setAiError(result.error);
        return;
      }
      setSeoTitle(result.data.title);
      if (!slugTouched) setSlug(slugify(result.data.title));
      setDescription(result.data.description);
    } catch {
      setAiError("Échec de la génération IA.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <form action={formAction} className="admin-form admin-post-form">
      <div className="admin-ai-panel">
        <label htmlFor="aiTopic" className="admin-ai-panel-label">
          ✦ Générer avec l&apos;IA (titre et description optimisés SEO)
        </label>
        <div className="admin-ai-panel-row">
          <input
            id="aiTopic"
            type="text"
            className="form-control"
            placeholder="Ex : covering complet d'une camionnette pour un plombier à Bondy, film vinyle, pose en 2 jours"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
          />
          <button type="button" className="btn-submit admin-inline-btn" onClick={handleGenerate} disabled={aiLoading}>
            {aiLoading ? "Génération…" : "Générer"}
          </button>
        </div>
        {aiError && <p className="admin-form-error">{aiError}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="seoTitle">Titre (optimisé SEO — affiché sur la vignette)</label>
        <input
          id="seoTitle"
          name="seoTitle"
          type="text"
          required
          className="form-control"
          value={seoTitle}
          onChange={(e) => {
            setSeoTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="Ex : Covering total — Flotte utilitaires BTP"
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug">Adresse de la réalisation (slug)</label>
        <input
          id="slug"
          name="slug"
          type="text"
          className="form-control"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          placeholder="genere-automatiquement-depuis-le-titre"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          name="category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Choisir une catégorie…
          </option>
          {REALISATION_CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        <p className="admin-field-hint">Choisissez-la avant de générer avec l&apos;IA pour un meilleur résultat.</p>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description du projet (visible uniquement à l&apos;ouverture)</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Détails du chantier : contexte, matériaux, délai, résultat…"
        />
      </div>

      <div className="form-group">
        <label>Photos</label>
        <RealisationImagesUpload
          name="images"
          defaultValue={defaultValues?.images}
          seoTitle={seoTitle}
          categoryLabel={category ? realisationCategoryLabel(category) : ""}
        />
        <p className="admin-field-hint">
          Le texte alternatif de chaque nouvelle photo est pré-rempli à partir du titre SEO et de la catégorie
          ci-dessus — modifiez-le si besoin, il reste éditable.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="status">Statut</label>
        {canPublish ? (
          <select id="status" name="status" className="form-control" defaultValue={defaultValues?.status ?? "draft"}>
            <option value="draft">Brouillon (non visible sur le site)</option>
            <option value="published">Publié</option>
          </select>
        ) : (
          <>
            {/* Même garde que components/admin/PostForm.tsx : jamais de
                <select> désactivé dont la valeur soumise pourrait varier
                selon le navigateur. */}
            <p className="form-control admin-status-locked">
              {defaultValues?.status === "published" ? "Publié" : "Brouillon (non visible sur le site)"}
              <span className="admin-field-hint"> — vous n&apos;avez pas la permission de changer le statut.</span>
            </p>
            <input type="hidden" name="status" value={defaultValues?.status ?? "draft"} />
          </>
        )}
      </div>

      {state?.error && <p className="admin-form-error">{state.error}</p>}

      <button type="submit" className="btn-submit" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}
