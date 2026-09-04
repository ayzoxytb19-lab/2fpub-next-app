import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingWidgets from "../../components/FloatingWidgets";

// Ce groupe de routes (parenthèses = invisible dans l'URL) rassemble toutes
// les pages publiques du site. /admin garde volontairement le header/footer
// et le widget WhatsApp du site vitrine — c'est une interface à part, voir
// app/admin/layout.tsx.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingWidgets />
    </>
  );
}
