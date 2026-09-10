import { ViewTransition } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingWidgets from "../../components/FloatingWidgets";
import OrganizationJsonLd from "../../components/OrganizationJsonLd";

// Ce groupe de routes (parenthèses = invisible dans l'URL) rassemble toutes
// les pages publiques du site. /admin garde volontairement le header/footer
// et le widget WhatsApp du site vitrine — c'est une interface à part, voir
// app/admin/layout.tsx.
//
// Le contenu de page (hors header/footer, qui restent fixes) est enveloppé
// dans <ViewTransition> : à chaque navigation, Next.js anime la sortie de
// l'ancienne page et l'entrée de la nouvelle (slide + fondu). Voir les
// classes .page-slide-out/.page-slide-in dans globals.css, et active
// experimental.viewTransition dans next.config.ts.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <Header />
      <ViewTransition enter="page-slide-in" exit="page-slide-out">
        {children}
      </ViewTransition>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
