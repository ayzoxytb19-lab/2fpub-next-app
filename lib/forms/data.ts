import "server-only";
import { getSql, ensureSchema } from "@/lib/db";

export type FormType = "devis" | "rgpd" | "catalogue";

export type SubmissionRow = {
  id: number;
  form_type: FormType;
  payload: Record<string, string>;
  status: "new" | "read";
  created_at: string;
};

// Écrit une soumission de formulaire public en base — remplace Formspree
// (jamais configuré, voir docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md). `payload`
// peut contenir des données personnelles (nom, email, message) : elles ne
// sont écrites QUE dans cette table, jamais dans activity_logs (voir
// app/forms/submit/route.ts, qui journalise l'évènement sans les données).
export async function createSubmission(formType: FormType, payload: Record<string, string>): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO form_submissions (form_type, payload)
    VALUES (${formType}, ${sql.json(payload)})
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function listSubmissions(page: number, pageSize: number): Promise<{ rows: SubmissionRow[]; total: number }> {
  await ensureSchema();
  const sql = getSql();
  const offset = (page - 1) * pageSize;
  const [rows, countRows] = await Promise.all([
    sql`
      SELECT id, form_type, payload, status, created_at
      FROM form_submissions
      ORDER BY created_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `,
    sql`SELECT count(*) AS total FROM form_submissions`,
  ]);
  const total = Number((countRows[0] as { total: string } | undefined)?.total ?? 0);
  return { rows: rows as unknown as SubmissionRow[], total };
}

export async function markSubmissionRead(id: number): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE form_submissions SET status = 'read' WHERE id = ${id}`;
}

export async function countNewSubmissions(): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT count(*) AS total FROM form_submissions WHERE status = 'new'`;
  return Number((rows[0] as { total: string } | undefined)?.total ?? 0);
}
