"use client";

import { useActionState, useState } from "react";
import { updateUserPermissions, setUserActive } from "@/lib/admin/actions/users";
import { PERMISSION_KEYS, PERMISSION_LABELS, type PermissionKey } from "@/lib/admin/permissions";

export default function UserRow({
  id,
  email,
  displayName,
  isOwner,
  isActive,
  permissions,
  isSelf,
}: {
  id: number;
  email: string;
  displayName: string;
  isOwner: boolean;
  isActive: boolean;
  permissions: PermissionKey[];
  isSelf: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const boundUpdatePermissions = updateUserPermissions.bind(null, id);
  const [state, formAction, pending] = useActionState(boundUpdatePermissions, null);

  return (
    <div className={`admin-user-row${isActive ? "" : " admin-user-row-inactive"}`}>
      <div className="admin-user-row-header">
        <div>
          <strong>{displayName}</strong>
          {isOwner && <span className="admin-owner-badge">Propriétaire</span>}
          {isSelf && <span className="admin-self-badge">Vous</span>}
          {!isActive && <span className="admin-status-badge admin-status-draft">Désactivé</span>}
          <p className="admin-user-row-email">{email}</p>
        </div>

        {!isOwner && (
          <div className="admin-user-row-actions">
            <button type="button" className="btn-text-link" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Fermer" : "Modifier les permissions"}
            </button>
            {!(isSelf && isActive) && (
              <form action={setUserActive}>
                <input type="hidden" name="userId" value={id} />
                <input type="hidden" name="active" value={(!isActive).toString()} />
                <button type="submit" className={`btn-text-link${isActive ? " admin-delete-link" : ""}`}>
                  {isActive ? "Désactiver" : "Réactiver"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {isOwner ? (
        <p className="admin-field-hint">Toutes les permissions, en permanence.</p>
      ) : (
        <div className="admin-user-row-permissions">
          {permissions.length === 0 ? (
            <span className="admin-field-hint">Aucune permission pour l&apos;instant.</span>
          ) : (
            permissions.map((key) => (
              <span key={key} className="admin-permission-chip">
                {PERMISSION_LABELS[key]}
              </span>
            ))
          )}
        </div>
      )}

      {expanded && !isOwner && (
        <form action={formAction} className="admin-form admin-permissions-edit">
          <fieldset className="admin-permissions-fieldset">
            <legend>Modifier les permissions</legend>
            {PERMISSION_KEYS.map((key) => (
              <label key={key} className="admin-permission-checkbox">
                <input type="checkbox" name="permissions" value={key} defaultChecked={permissions.includes(key)} />
                {PERMISSION_LABELS[key]}
              </label>
            ))}
          </fieldset>
          {state && "error" in state && <p className="admin-form-error">{state.error}</p>}
          {state && "success" in state && <p className="admin-form-success">Permissions mises à jour.</p>}
          <button type="submit" className="btn-submit admin-inline-btn" disabled={pending}>
            {pending ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      )}
    </div>
  );
}
