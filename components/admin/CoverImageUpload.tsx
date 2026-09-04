"use client";

import { useState } from "react";

export default function CoverImageUpload({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/admin/media/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Échec de l'envoi de l'image.");
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Échec de l'envoi de l'image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-cover-upload">
      {url ? (
        <div className="admin-cover-preview">
          <img src={url} alt="Image de couverture" />
          <button type="button" className="btn-text-link admin-delete-link" onClick={() => setUrl(null)}>
            Retirer l&apos;image
          </button>
        </div>
      ) : (
        <label className="admin-cover-dropzone">
          {uploading ? "Envoi en cours…" : "Choisir une photo de couverture"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            hidden
            onChange={handleFileSelected}
            disabled={uploading}
          />
        </label>
      )}
      {error && <p className="admin-form-error">{error}</p>}
      <input type="hidden" name={name} value={url ?? ""} />
    </div>
  );
}
