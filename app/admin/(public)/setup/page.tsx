import { redirect } from "next/navigation";
import { getSql, ensureSchema } from "@/lib/db";
import SetupForm from "./SetupForm";

// Cette page interroge la base à chaque visite : jamais de pré-rendu figé
// au build (ce qui échouerait aussi tant qu'aucune base n'est connectée).
export const dynamic = "force-dynamic";

// N'est accessible que tant qu'aucun compte propriétaire n'existe. Dès que
// le premier compte "2F" est créé, cette page redirige vers /admin/login —
// impossible d'y revenir pour créer un second propriétaire par cette voie
// (voir aussi la revérification côté serveur dans setupOwner()).
export default async function AdminSetupPage() {
  await ensureSchema();
  const sql = getSql();
  const existing = await sql`SELECT id FROM admin_users WHERE is_owner = TRUE LIMIT 1`;

  if (existing.length > 0) {
    redirect("/admin/login");
  }

  return <SetupForm />;
}
