-- Référence lisible du schéma. Depuis le 10/09/2026, la source de vérité
-- EXÉCUTÉE est `scripts/migrate.mjs` (lancé uniquement via `npm run
-- db:migrate`, jamais automatiquement — voir docs/MIGRATIONS_DB.md).
-- `ensureSchema()` dans lib/db/index.ts ne touche plus la base. Ce fichier
-- n'est pas exécuté automatiquement, il documente juste la structure pour
-- s'y retrouver — à garder synchronisé avec scripts/migrate.mjs à la main.

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  is_owner BOOLEAN NOT NULL DEFAULT FALSE,
  permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  actor_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  actor_email TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  target_label TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS realisations (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Une réalisation a une ou plusieurs photos (carrousel) ; sort_order = 0 est
-- la vignette affichée sur la carte. category ne référence aucune table :
-- validée côté application via lib/realisations/categories.ts.
CREATE TABLE IF NOT EXISTS realisation_images (
  id SERIAL PRIMARY KEY,
  realisation_id INTEGER NOT NULL REFERENCES realisations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Magasin clé/valeur générique pour les réglages admin (ex: contenu
-- /llms.txt personnalisé, clé "llms_txt_override").
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Soumissions des formulaires publics (devis, RGPD, catalogue) — voir
-- lib/forms/data.ts et app/forms/submit/route.ts. `payload` peut contenir
-- des données personnelles (nom/email/message) : volontairement absentes
-- d'activity_logs, qui ne doit recevoir aucune donnée personnelle.
CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  form_type TEXT NOT NULL CHECK (form_type IN ('devis', 'rgpd', 'catalogue')),
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_realisations_status ON realisations(status);
CREATE INDEX IF NOT EXISTS idx_realisations_category ON realisations(category);
CREATE INDEX IF NOT EXISTS idx_realisation_images_realisation_id ON realisation_images(realisation_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
