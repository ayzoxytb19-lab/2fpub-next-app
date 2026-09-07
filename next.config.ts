import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Active l'intégration de la View Transitions API (React <ViewTransition>)
    // pour animer les changements de page — voir app/(site)/layout.tsx.
    viewTransition: true,
  },
};

export default nextConfig;
