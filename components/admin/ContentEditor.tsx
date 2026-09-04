"use client";

import { useRef, useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

type ToolbarAction = {
  label: string;
  placeholder: string;
  wrap: (selected: string) => string;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: "Titre", placeholder: "Titre de section", wrap: (s) => `## ${s}` },
  { label: "Sous-titre", placeholder: "Sous-titre", wrap: (s) => `### ${s}` },
  { label: "Gras", placeholder: "texte en gras", wrap: (s) => `**${s}**` },
  { label: "Italique", placeholder: "texte en italique", wrap: (s) => `*${s}*` },
  { label: "Liste", placeholder: "élément de liste", wrap: (s) => `- ${s}` },
];

export default function ContentEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Remplace la sélection courante du textarea par `insertText`, met à jour
  // l'état, puis replace le curseur juste après le texte inséré.
  function replaceSelection(insertText: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = value.slice(0, start) + insertText + value.slice(end);
    setValue(next);

    const cursor = start + insertText.length;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  function handleToolbarAction(action: ToolbarAction) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const selected = value.slice(textarea.selectionStart, textarea.selectionEnd) || action.placeholder;
    replaceSelection(action.wrap(selected));
  }

  function handleInsertLink() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const selected = value.slice(textarea.selectionStart, textarea.selectionEnd) || "texte du lien";
    const url = window.prompt("Adresse du lien (https://…) :");
    if (!url) return;
    replaceSelection(`[${selected}](${url})`);
  }

  function triggerImageUpload() {
    setUploadError(null);
    fileInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/admin/media/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setUploadError(data.error ?? "Échec de l'envoi de l'image.");
        return;
      }
      const alt = window.prompt("Texte alternatif (description de l'image) :", "") ?? "";
      replaceSelection(`![${alt}](${data.url})\n`);
    } catch {
      setUploadError("Échec de l'envoi de l'image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-editor">
      <div className="admin-editor-toolbar">
        {TOOLBAR_ACTIONS.map((action) => (
          <button key={action.label} type="button" onClick={() => handleToolbarAction(action)}>
            {action.label}
          </button>
        ))}
        <button type="button" onClick={handleInsertLink}>
          Lien
        </button>
        <button type="button" onClick={triggerImageUpload} disabled={uploading}>
          {uploading ? "Envoi…" : "Image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={handleFileSelected}
        />
        <div className="admin-editor-toolbar-spacer" />
        <button type="button" className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}>
          Édition
        </button>
        <button type="button" className={mode === "preview" ? "active" : ""} onClick={() => setMode("preview")}>
          Aperçu
        </button>
      </div>

      {uploadError && <p className="admin-form-error">{uploadError}</p>}

      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="admin-editor-textarea"
          rows={16}
          placeholder="Écrivez votre article ici. Utilisez la barre d'outils pour mettre en forme."
        />
      ) : (
        <div
          className="admin-editor-preview blog-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) || "<p><em>Rien à prévisualiser.</em></p>" }}
        />
      )}

      {/* Champ réellement soumis avec le formulaire : le textarea visible
          disparaît en mode "Aperçu", donc on garde une copie cachée. */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
