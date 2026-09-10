import { NextRequest, NextResponse } from "next/server";
import { createSubmission, type FormType } from "@/lib/forms/data";
import { logActivity } from "@/lib/admin/log";

export const runtime = "nodejs";

// Point d'entrée unique pour les 3 formulaires publics (devis, RGPD,
// catalogue) — remplace Formspree, jamais configuré (voir
// docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md). Écrit en base (lib/forms/data.ts),
// consultable depuis /admin/soumissions. Aucune clé/secret nécessaire ici :
// réutilise uniquement DATABASE_URL, déjà côté serveur.
//
// IMPORTANT vie privée : cette route ne doit JAMAIS journaliser le contenu
// du formulaire (nom, email, message...) — seul un évènement générique est
// envoyé à activity_logs, sans donnée personnelle. Les données du visiteur
// ne vivent que dans form_submissions.payload.

const FORM_TYPES = new Set<FormType>(["devis", "rgpd", "catalogue"]);

// Champs obligatoires par type de formulaire, cohérents avec les attributs
// `required` déjà présents côté client dans chaque page.
const REQUIRED_FIELDS: Record<FormType, string[]> = {
  devis: ["email"],
  rgpd: ["nom", "email", "type_demande"],
  catalogue: ["email"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;
const MAX_FIELDS = 30;

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= 254;
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const formTypeRaw = formData.get("form_type");
  const formType = typeof formTypeRaw === "string" ? formTypeRaw : "";
  if (!FORM_TYPES.has(formType as FormType)) {
    return NextResponse.json({ ok: false, error: "Type de formulaire inconnu." }, { status: 400 });
  }
  const type = formType as FormType;

  // Piège à robots (champ caché, jamais rempli par un visiteur humain) :
  // on répond succès sans rien enregistrer, pour ne pas indiquer au robot
  // que sa soumission a été détectée.
  const honeypot = formData.get("societe_web");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const payload: Record<string, string> = {};
  let fieldCount = 0;
  for (const [key, value] of formData.entries()) {
    if (key === "form_type" || key === "societe_web") continue;
    if (typeof value !== "string") continue; // pas de fichiers sur ces formulaires
    if (++fieldCount > MAX_FIELDS) {
      return NextResponse.json({ ok: false, error: "Formulaire invalide." }, { status: 400 });
    }
    payload[key] = value.slice(0, MAX_FIELD_LENGTH).trim();
  }

  for (const field of REQUIRED_FIELDS[type]) {
    if (!payload[field]) {
      return NextResponse.json({ ok: false, error: `Le champ « ${field} » est obligatoire.` }, { status: 400 });
    }
  }
  if (payload.email && !isValidEmail(payload.email)) {
    return NextResponse.json({ ok: false, error: "Adresse email invalide." }, { status: 400 });
  }

  try {
    const id = await createSubmission(type, payload);
    // Journal d'activité SANS donnée personnelle : ni nom, ni email, ni
    // message — seulement le type et l'identifiant de la ligne créée.
    await logActivity({
      actorId: null,
      actorEmail: null,
      action: "submission.received",
      targetType: "form_submission",
      targetId: String(id),
      targetLabel: type,
    });
    return NextResponse.json({ ok: true });
  } catch {
    console.error("[forms/submit] Échec d'enregistrement de la soumission (détails omis) :", type);
    return NextResponse.json({ ok: false, error: "Échec de l'enregistrement. Réessayez ou contactez-nous directement." }, { status: 500 });
  }
}
