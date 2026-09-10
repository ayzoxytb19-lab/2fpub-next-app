"use client";

import { useState } from "react";

type ImageItem = { url: string; alt: string };

// Génère un alt par défaut à partir du titre SEO du projet et de sa
// catégorie — pas d'appel IA, juste un gabarit texte appliqué à chaque
// import. `index` (0-based) sert à distinguer les photos d'un même projet ;
// la première (vignette) n'a pas de suffixe.
function buildDefaultAlt(seoTitle: string, categoryLabel: string, index: number): string {
  const base = [seoTitle.trim(), categoryLabel.trim()].filter(Boolean).join(" — ");
  if (!base) return "";
  return index === 0 ? base : `${base} (vue ${index + 1})`;
}

export default function RealisationImagesUpload({
  name,
  defaultValue,
  seoTitle = "",
  categoryLabel = "",
}: {
  name: string;
  defaultValue?: ImageItem[];
  /** Titre SEO du projet, utilisé pour pré-remplir l'alt de chaque photo importée. */
  seoTitle?: string;
  /** Libellé de la catégorie choisie, ajouté à l'alt généré. */
  categoryLabel?: string;
}) {
  const [images, setImages] = useState<ImageItem[]>(defaultValue ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const body = new FormData();
          body.set("file", file);
          const res = await fetch("/admin/media/upload", { method: "POST", body });
          const data = (await res.json()) as { url?: string; error?: string };
          if (!res.ok || !data.url) {
            throw new Error(data.error ?? "Échec de l'envoi d'une image.");
          }
          return { url: data.url, alt: "" };
        })
      );
      setImages((prev) => {
        // Le suffixe "(vue N)" est basé sur la position finale dans la liste
        // (vignette + carrousel), pas seulement sur ce lot importé.
        const startIndex = prev.length;
        const withAlt = uploaded.map((img, i) => ({
          ...img,
          alt: buildDefaultAlt(seoTitle, categoryLabel, startIndex + i),
        }));
        return [...prev, ...withAlt];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'envoi des images.");
    } finally {
      setUploading(false);
    }
  }

  function updateAlt(index: number, alt: string) {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, alt } : img)));
  }

  function removeAt(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setImages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  return (
    <div className="admin-images-upload">
      {images.length > 0 && (
        <ul className="admin-images-list">
          {images.map((image, index) => (
            <li key={image.url + index} className="admin-images-item">
              <img src={image.url} alt="" />
              <span className="admin-images-item-label">
                {index === 0 ? "Vignette (carte)" : `Photo ${index + 1}`}
              </span>
              <input
                type="text"
                className="form-control admin-images-item-alt"
                value={image.alt}
                onChange={(e) => updateAlt(index, e.target.value)}
                placeholder="Texte alternatif (SEO) de cette photo"
                aria-label={`Texte alternatif de la photo ${index + 1}`}
              />
              <div className="admin-images-item-actions">
                <button type="button" onClick={() => moveUp(index)} disabled={index === 0} title="Monter">
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === images.length - 1}
                  title="Descendre"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="admin-delete-link"
                  onClick={() => removeAt(index)}
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <label className="admin-cover-dropzone">
        {uploading ? "Envoi en cours…" : "+ Ajouter une ou plusieurs photos"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          onChange={handleFilesSelected}
          disabled={uploading}
        />
      </label>
      {error && <p className="admin-form-error">{error}</p>}
      <p className="admin-field-hint">
        La première photo de la liste est utilisée comme vignette sur la carte. Les autres apparaissent dans le
        carrousel une fois le projet ouvert.
      </p>

      <input type="hidden" name={name} value={JSON.stringify(images)} />
    </div>
  );
}
