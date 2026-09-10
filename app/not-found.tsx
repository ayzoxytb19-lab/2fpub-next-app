import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

// Fichier de convention Next.js : rend l'UI pour toute URL non trouvée
// (route inexistante, ou appel explicite à notFound() dans une page comme
// /blog/[slug]). Placé à la racine de app/ car c'est le seul not-found.tsx
// du projet qui gère les URL non appariées à l'échelle du site (voir
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md) :
// un not-found.tsx niché dans app/(site)/ ne couvrirait pas les URL qui ne
// correspondent à aucune route du tout. Le header/footer/widgets du site
// vitrine sont donc importés directement ici plutôt qu'hérités d'un layout.
export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou plus sur 2fpub.fr.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section style={{ background: "var(--dark)", minHeight: "80vh", padding: "160px 0 100px", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "680px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Righteous',sans-serif", fontSize: "clamp(64px,10vw,120px)", fontWeight: 400, color: "rgba(255,255,255,0.12)", lineHeight: 1, marginBottom: "8px" }}>
            404
          </div>
          <h1 style={{ fontFamily: "'Righteous',sans-serif", fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px", textTransform: "uppercase" }}>
            Page introuvable
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.7, marginBottom: "40px" }}>
            La page que vous cherchez n&apos;existe pas ou plus. Elle a peut-être changé d&apos;adresse — voici où aller à la place :
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--gradient)",
                color: "#fff",
                fontFamily: "'Red Hat Display',sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 28px",
                borderRadius: "50px",
                textDecoration: "none",
              }}
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#fff",
                fontFamily: "'Red Hat Display',sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              Nos services
            </Link>
            <Link
              href="/devis"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#fff",
                fontFamily: "'Red Hat Display',sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              Demander un devis
            </Link>
          </div>
          <p style={{ marginTop: "32px" }}>
            <Link href="/plan-du-site" style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "underline" }}>
              Voir le plan du site
            </Link>
          </p>
        </div>
      </section>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
