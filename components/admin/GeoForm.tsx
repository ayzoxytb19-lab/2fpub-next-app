"use client";

import { useActionState } from "react";
import { updateLlmsTxt } from "@/lib/admin/actions/geo";

export default function GeoForm({
  defaultContent,
  isCustom,
}: {
  defaultContent: string;
  isCustom: boolean;
}) {
  const [state, formAction, pending] = useActionState(updateLlmsTxt, null);

  return (
    <form action={formAction} className="admin-form">
      <div className="form-group">
        <label htmlFor="content">
          Contenu de /llms.txt {isCustom ? "(personnalisé)" : "(version générée par défaut)"}
        </label>
        <textarea
          id="content"
          name="content"
          className="form-control admin-geo-textarea"
          rows={22}
          defaultValue={defaultContent}
        />
        <p className="admin-field-hint">
          Laissez vide (ou videz le champ) pour revenir à la version générée automatiquement à partir du site.
        </p>
      </div>

      {state && "error" in state && <p className="admin-form-error">{state.error}</p>}
      {state && "success" in state && <p className="admin-form-success">Enregistré.</p>}

      <button type="submit" className="btn-submit admin-inline-btn" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
