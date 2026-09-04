"use client";

import { useState } from "react";

type ImageItem = { url: string; alt: string };

export default function RealisationImagesUpload({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: ImageItem[];
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
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'envoi des images.");
    } finally {
      setUploading(false);
    }
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
