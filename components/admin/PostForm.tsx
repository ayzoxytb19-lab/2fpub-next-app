"use client";

import { useActionState, useState } from "react";
import ContentEditor from "@/components/admin/ContentEditor";
import CoverImageUpload from "@/components/admin/CoverImageUpload";
import { slugify } from "@/lib/slug";
import type { PostFormState } from "@/lib/admin/actions/posts";
import { generateArticleFromTopic } from "@/lib/admin/actions/ai";

type Action = (state: PostFormState, formData: FormData) => Promise<PostFormState>;

export default function PostForm({
  action,
  canPublish,
  submitLabel,
  defaultValues,
}: {
  action: Action;
  canPublish: boolean;
  submitLabel: string;
  defaultValues?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImageUrl?: string | null;
    status?: "draft" | "published";
  };
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.slug));
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  // Incrémenté à chaque génération IA pour forcer ContentEditor à se
  // remonter avec le nouveau `defaultValue` (il gère son propre état interne
  // en écriture normale, non contrôlé par ce parent).
  const [contentVersion, setContentVersion] = useState(0);

  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!aiTopic.trim()) {
      setAiError("Décrivez le sujet de l'article.");
      return;
    }
    if ((title || excerpt || content) && !confirm("Remplacer le titre, l'extrait et le contenu actuels par la version générée par l'IA ?")) {
      return;
    }

    setAiLoading(true);
    setAiError(null);
    try {
      const result = await generateArticleFromTopic(aiTopic);
      if ("error" in result) {
        setAiError(result.error);
        return;
      }
      setTitle(result.data.title);
      if (!slugTouched) setSlug(slugify(result.data.title));
      setExcerpt(result.data.excerpt);
      setContent(result.data.content);
      setContentVersion((v) => v + 1);
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
          ✦ Générer avec l&apos;IA (titre, extrait et article optimisés SEO)
        </label>
        <div className="admin-ai-panel-row">
          <input
            id="aiTopic"
            type="text"
            className="form-control"
            placeholder="Ex : les avantages du covering pour une flotte d'utilitaires"
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
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug">Adresse de l&apos;article (slug)</label>
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
        <p className="admin-field-hint">2fpub.fr/blog/{slug || "…"}</p>
      </div>

      <div className="form-group">
        <label htmlFor="excerpt">Extrait (résumé affiché dans la liste et sur les moteurs de recherche)</label>
        <textarea
          id="excerpt"
          name="excerpt"
          className="form-control"
          rows={3}
          maxLength={280}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Photo de couverture</label>
        <CoverImageUpload name="coverImageUrl" defaultValue={defaultValues?.coverImageUrl} />
      </div>

      <div className="form-group">
        <label htmlFor="content">Contenu</label>
        <ContentEditor key={contentVersion} name="content" defaultValue={content} />
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
            {/* Pas la permission de publier/dépublier : le statut actuel est
                verrouillé et soumis tel quel via un champ caché — jamais via
                un <select> désactivé, dont la valeur soumise dépend du
                navigateur et pourrait dépublier l'article par accident. */}
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
