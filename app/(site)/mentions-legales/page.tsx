import type { Metadata } from "next";
import MentionsPageClient from "./MentionsPageClient";

export const metadata: Metadata = {
  title: { absolute: "Mentions légales | 2F PUB" },
  description: "Mentions légales du site 2fpub.fr : éditeur, hébergeur et conditions d'utilisation.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsPage() {
  return <MentionsPageClient />;
}
