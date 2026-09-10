import type { Metadata } from "next";

// Racine de tout /admin/* : uniquement la métadonnée noindex, partagée par
// l'écran de connexion (non protégé) et le tableau de bord (protégé, voir
// app/admin/(protected)/layout.tsx). Volontairement sans logique d'auth ici
// — un layout ne re-vérifie pas la session à chaque navigation côté client,
// donc chaque page/Server Action protégée revérifie elle-même (voir
// lib/admin/dal.ts).
export const metadata: Metadata = {
  title: { absolute: "Espace admin — 2F Publicité" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
