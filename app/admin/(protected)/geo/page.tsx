import { requirePermissionForPage } from "@/lib/admin/dal";
import { getLlmsTxtOverride, getDefaultLlmsTxt } from "@/lib/admin/geo";
import GeoForm from "@/components/admin/GeoForm";

export default async function AdminGeoPage() {
  await requirePermissionForPage("settings.manage", "/admin");

  const override = await getLlmsTxtOverride();
  const isCustom = Boolean(override && override.trim());
  const content = isCustom ? (override as string) : getDefaultLlmsTxt();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Configuration IA (GEO)</h1>
          <p className="admin-page-sub">
            Contenu servi sur /llms.txt aux moteurs de réponse (ChatGPT, Perplexity, Gemini). Laissez vide pour
            utiliser la version générée automatiquement à partir du site.
          </p>
        </div>
        <div className="admin-page-header-links">
          <a href="/llms.txt" target="_blank" rel="noopener" className="btn-text-link">
            /llms.txt ↗
          </a>
          <a href="/llms-full.txt" target="_blank" rel="noopener" className="btn-text-link">
            /llms-full.txt ↗
          </a>
        </div>
      </div>

      <GeoForm defaultContent={content} isCustom={isCustom} />
    </div>
  );
}
