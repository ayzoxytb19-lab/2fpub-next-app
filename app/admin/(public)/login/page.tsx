"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/admin/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="admin-auth-shell">
      <div className="admin-auth-card">
        <Link href="/" className="admin-auth-logo">
          2F <span>Publicité</span>
        </Link>
        <h1 className="admin-auth-title">Espace admin</h1>
        <p className="admin-auth-sub">Connectez-vous pour gérer le blog.</p>

        <form action={formAction} className="admin-form">
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
              className="form-control"
              autoComplete="current-password"
            />
          </div>

          {state?.error && <p className="admin-form-error">{state.error}</p>}

          <button type="submit" className="btn-submit" disabled={pending}>
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
