import { requirePermissionForPage, hasPermission } from "@/lib/admin/dal";
import { createRealisation } from "@/lib/admin/actions/realisations";
import RealisationForm from "@/components/admin/RealisationForm";

export default async function NewRealisationPage() {
  const user = await requirePermissionForPage("realisations.create", "/admin/realisations");

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Nouvelle réalisation</h1>
      <RealisationForm
        action={createRealisation}
        canPublish={hasPermission(user, "realisations.publish")}
        submitLabel="Enregistrer"
      />
    </div>
  );
}
