import type { Metadata } from "next";
import PlanPageClient from "./PlanPageClient";

export const metadata: Metadata = {
  title: { absolute: "Plan du site | 2F PUB" },
  description: "Toutes les pages du site 2fpub.fr : services, fiches produit, réalisations et informations légales.",
  alternates: { canonical: "/plan-du-site" },
};

export default function PlanPage() {
  return <PlanPageClient />;
}
