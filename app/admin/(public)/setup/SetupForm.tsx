"use client";

import { useActionState } from "react";
import { setupOwner } from "@/lib/admin/actions/auth";

export default function SetupForm() {
  const [state, formAction, pending] = useActionState(setupOwner, null);

  return (
    <div className="admin-auth-shell">
      <div className="admin-auth-card">
        <span className="admin-auth-logo">
          2F <span>Publicité</span>
        </span>
        <h1 className="admin-auth-title">Configuration initiale</h1>
        <p className="admin-auth-sub">
          Créez le compte propriétaire (« 2F »). Il pourra ensuite créer d&apos;autres comptes admin et
          choisir leurs permissions. Cet écran ne s&apos;affichera plus une fois ce compte créé.
        </p>

        <form action={formAction} className="admin-form">
          <div className="form-group">
            <label htmlFor="displayName">Nom à afficher</label>
            <input id="displayName" name="displayName" type="text" required className="form-control" placeholder="2F Publicité" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="form-control" autoComplete="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="form-control"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              minLength={8}
              className="form-control"
              autoComplete="new-password"
            />
          </div>

          {state?.error && <p className="admin-form-error">{state.error}</p>}

          <button type="submit" className="btn-submit" disabled={pending}>
            {pending ? "Création…" : "Créer le compte propriétaire"}
          </button>
        </form>
      </div>
    </div>
  );
}
