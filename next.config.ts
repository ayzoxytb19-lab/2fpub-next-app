import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Active l'intégration de la View Transitions API (React <ViewTransition>)
    // pour animer les changements de page — voir app/(site)/layout.tsx.
    viewTransition: true,
  },
  images: {
    // Autorise next/image à optimiser les photos uploadées depuis l'admin
    // (articles de blog, réalisations), stockées sur Vercel Blob — l'ID du
    // store varie par projet, d'où le sous-domaine générique en wildcard.
    // Voir app/admin/media/upload/route.ts (@vercel/blob `put()`).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
