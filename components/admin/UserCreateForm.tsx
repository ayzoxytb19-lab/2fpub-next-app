"use client";

import { useActionState } from "react";
import { createUser } from "@/lib/admin/actions/users";
import { PERMISSION_KEYS, PERMISSION_LABELS } from "@/lib/admin/permissions";

export default function UserCreateForm() {
  const [state, formAction, pending] = useActionState(createUser, null);

  return (
    <details className="admin-create-user">
      <summary>+ Créer un compte</summary>
      <form action={formAction} className="admin-form" key={state && "success" in state ? "reset" : "form"}>
        <div className="admin-form-row">
          <div className="form-group">
            <label htmlFor="new-displayName">Nom à afficher</label>
            <input id="new-displayName" name="displayName" type="text" required className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="new-email">Email</label>
            <input id="new-email" name="email" type="email" required className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Mot de passe temporaire</label>
          <input
            id="new-password"
            name="password"
            type="text"
            required
            minLength={8}
            className="form-control"
            placeholder="8 caractères minimum"
          />
        </div>

        <fieldset className="admin-permissions-fieldset">
          <legend>Permissions</legend>
          {PERMISSION_KEYS.map((key) => (
            <label key={key} className="admin-permission-checkbox">
              <input type="checkbox" name="permissions" value={key} />
              {PERMISSION_LABELS[key]}
            </label>
          ))}
        </fieldset>

        {state && "error" in state && <p className="admin-form-error">{state.error}</p>}
        {state && "success" in state && <p className="admin-form-success">Compte créé.</p>}

        <button type="submit" className="btn-submit" disabled={pending}>
          {pending ? "Création…" : "Créer le compte"}
        </button>
      </form>
    </details>
  );
}
