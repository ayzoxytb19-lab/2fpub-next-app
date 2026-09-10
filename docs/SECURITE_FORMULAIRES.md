# Sécurité, base de données et formulaires — 2fpub-next-app

Document produit le 09/09/2026, en réponse à une demande d'audit explicite. Porte sur `app/forms/submit/route.ts`, `app/admin/(protected)/soumissions/`, `lib/forms/data.ts`, `lib/db/index.ts` et la conformité RGPD du dispositif. Aucune modification touchant la production, les secrets ou une suppression de données n'a été effectuée à partir de ce document — tout ce qui suit est soit un constat, soit une proposition explicitement marquée comme telle.

---

## 1. Environnement de base de données — ce qui est confirmé et ce qui ne l'est pas

**Confirmé** :
- Le projet Vercel (`mx-s-projects4/2fpub-next-app`) n'a **qu'un seul jeu de variables d'environnement, sur l'environnement « Production »** (`npx vercel env ls`, noms uniquement, aucune valeur consultée) — pas de variables séparées pour Preview/Development sur Vercel. Créées il y a 5 jours (~04/09/2026).
- `.env.local` (fichier local du dépôt, non commité, présent avant mon intervention, dernière modification le 03/09/2026) contient une `DATABASE_URL` dont **l'hôte est `db.ezetrrhbdttsciqjaqez.supabase.co`** — c'est-à-dire **Supabase, pas Neon**. Ceci contredit la documentation du projet (`.env.example` et mon propre `docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md` du 09/09/2026, rédigés sur la foi du commentaire du fichier `.env.example` qui mentionne « Vercel Postgres propulsé par Neon ») — **à corriger, la base réellement utilisée en local est Supabase**.
- Toutes mes commandes `next build`/`next dev` de cette mission (y compris la création de la table `form_submissions` et mes tests d'écriture, nettoyés ensuite) ont utilisé **cette base Supabase de `.env.local`**, jamais une autre source.

**Non confirmé — bloqué par une restriction de sécurité de mon environnement d'exécution** : j'ai tenté de récupérer (`vercel env pull`) la valeur de la variable `DATABASE_URL` de l'environnement Production de Vercel, dans le seul but d'en comparer le nom d'hôte (jamais les identifiants) à celui de `.env.local`, pour vous dire avec certitude si les deux pointent vers la même base. **Cette action a été bloquée par le système de permissions de mon environnement** (extraction de secret vers un fichier), et je ne l'ai pas contournée. Je ne peux donc pas vous confirmer si :
- la base Supabase locale est la même que celle utilisée par le déploiement Vercel réel, ou une base distincte propre à cette machine de développement ;
- un provisionnement Neon existe réellement quelque part (dashboard Vercel → Storage) sans être branché sur `DATABASE_URL`.

**Ce que je vous demande** : vérifiez vous-même, dans le dashboard Vercel (Project → Storage) et/ou Supabase (recherchez le projet `ezetrrhbdttsciqjaqez`), laquelle de ces bases est utilisée en production réelle. Si vous préférez que je fasse cette comparaison moi-même (hôte uniquement, jamais les identifiants affichés), il faudra ajuster la permission bloquée — à vous de voir si vous le souhaitez.

**Risque identifié pendant que ce point reste incertain** : toute commande `next build`/`next dev` locale se connecte automatiquement à la base désignée par `.env.local`. Si cette base s'avérait être la production, un `ensureSchema()` (création de table idempotente, sans danger en soi) s'exécute silencieusement à chaque build ou premier appel — ce qui est le sujet du point suivant.

---

## 2. Création automatique de schéma — risque confirmé, proposition de correction

**Constaté** : `lib/db/index.ts` exécute `ensureSchema()` (blocs `CREATE TABLE IF NOT EXISTS`) au **premier appel réel** à la base — donc à chaque cold start de fonction serverless, et à chaque `next build` local (les pages `force-dynamic` et le sitemap y font appel). C'est un choix déjà présent avant cette mission (pattern répété pour `admin_users`, `posts`, `realisations`, etc.), auquel j'ai ajouté `form_submissions` en suivant le même pattern. **Ce n'est pas destructif** (`IF NOT EXISTS`, jamais de `DROP`/`ALTER` destructif) mais cela signifie effectivement qu'**un simple build peut modifier le schéma d'une base sans étape de validation explicite**, ce qui correspond exactement à votre inquiétude.

**Proposition (non appliquée, en attente de votre accord)** : séparer clairement la création de schéma du démarrage de l'application :
1. Retirer l'appel automatique à `ensureSchema()` du chemin de requête normal (pages, sitemap, route handlers).
2. Créer un script dédié (ex. `scripts/migrate.ts`, lancé via `npm run db:migrate`) que vous exécutez **volontairement**, en local ou en CI, jamais implicitement à chaque build/déploiement.
3. Documenter la procédure : avant toute mise en production, exécuter ce script manuellement contre la bonne base, avec confirmation explicite de la cible (afficher l'hôte, demander une confirmation si le nom ne contient pas « dev »/« preview »).

Je n'ai **pas implémenté** ce changement — c'est une proposition qui modifie un comportement central de l'application (toutes les pages dynamiques dépendent actuellement de `ensureSchema()` pour fonctionner au premier démarrage) et mérite votre validation avant modification.

---

## 3. Plan de sauvegarde et de restauration — préparation

Non exécutable sans accès aux dashboards (Neon/Supabase/Vercel selon la base réellement utilisée), mais voici la structure à suivre une fois la base identifiée (§1) :
1. **Avant toute mise en production** : vérifier que la base réellement ciblée dispose de sauvegardes automatiques activées (Neon et Supabase proposent tous deux des sauvegardes/point-in-time recovery selon le plan souscrit — à vérifier dans le dashboard du fournisseur concerné).
2. Faire un export manuel (`pg_dump`) de la base juste avant toute migration de schéma en production, conservé en dehors du dépôt.
3. Tester une restauration sur un environnement séparé avant d'en avoir besoin en urgence — non fait, à planifier avec vous.
4. Documenter qui a accès à déclencher une restauration (vous, ou moi sur instruction explicite).

Je n'ai accès à aucun de ces dashboards — cette section reste à compléter avec vous.

---

## 4. Audit de sécurité — `app/forms/submit/route.ts`

| Point vérifié | Constat |
|---|---|
| Authentification | Aucune — **volontaire**, c'est un endpoint public pour visiteurs anonymes. Pas de donnée sensible en lecture, uniquement en écriture. |
| Permissions serveur | Sans objet (public), mais le `form_type` est vérifié contre une liste blanche (`devis`, `rgpd`, `catalogue`) — aucun autre type ne peut être inséré. |
| Validation des champs | Champs obligatoires par type (email partout, +nom/type_demande pour RGPD) ; email vérifié par regex + longueur max 254 ; chaque champ tronqué à 5000 caractères ; maximum 30 champs acceptés par requête. |
| Limite de taille globale | **Pas de limite explicite dans le code applicatif** — `request.formData()` lit l'intégralité du corps avant toute validation. Vercel applique une limite de taille de requête au niveau plateforme pour les fonctions Node.js serverless (documentée à 4,5 Mo), qui agit en amont de mon code — mitigation réelle mais **pas garantie contractuellement dans le code lui-même**. |
| Anti-spam | Honeypot (champ caché `societe_web`, invisible et non focusable pour un humain, `tabIndex={-1}` + `aria-hidden`) — les soumissions le remplissant sont silencieusement acceptées (HTTP 200) sans être enregistrées, pour ne pas révéler la détection à un robot. **Pas de limite de fréquence (rate limiting) par IP** — un script pourrait soumettre en boucle sans déclencher le honeypot s'il ne le remplit pas. Risque réel mais mineur à l'échelle actuelle du site ; à surveiller via `/admin/soumissions`. |
| Injection SQL | Aucun risque identifié — toutes les requêtes utilisent les templates paramétrés de `postgres.js` (`sql\`...\``), jamais de concaténation de chaîne SQL. |
| Injection / XSS stockée | Le contenu du formulaire est stocké tel quel (JSONB) et réaffiché dans `/admin/soumissions` via JSX React standard (pas de `dangerouslySetInnerHTML`) — React échappe automatiquement le texte affiché, donc pas d'exécution de script possible même avec un contenu malveillant soumis. |
| Accès non autorisé aux données soumises | `/admin/soumissions` protégé à deux niveaux : `proxy.ts` (session valide requise, sinon redirection `/admin/login`) **et** `requirePermissionForPage("submissions.view", ...)` au niveau de la page (permission spécifique, pas seulement « être connecté »). Le propriétaire (`is_owner`) a cette permission implicitement ; tout autre compte doit se la voir attribuer explicitement (aucun compte ne l'a par défaut). |
| CSRF sur `markRead` | Protection native Next.js (Server Actions) : comparaison Origin/Host, requête POST uniquement — pas de protection supplémentaire nécessaire (vérifié dans la doc Next.js du dépôt). |
| Données personnelles dans les logs | Vérifié explicitement : `logActivity()` pour `submission.received` ne reçoit que le type de formulaire et l'ID de ligne — **jamais nom, email, téléphone ou message**. Le seul `console.error` en cas d'échec loggue le type de formulaire uniquement, jamais le contenu. |

**Risques restants, non corrigés (en attente de votre priorisation)** :
- Pas de limite de fréquence par IP → un acteur malveillant pourrait remplir `/admin/soumissions` de faux enregistrements (nuisance, pas de fuite de données).
- Pas de vérification d'email (double opt-in) → une adresse email erronée ou usurpée peut être soumise sans confirmation — pertinent pour le point RGPD ci-dessous.

---

## 5. RGPD — le formulaire `/suppression-donnees` ne déclenche aucune suppression automatique

**Constaté, à titre rassurant** : le code actuel **n'effectue aucune action automatique** sur une demande RGPD. `handleRgpdSubmit`/`app/forms/submit/route.ts` font uniquement un `INSERT` dans `form_submissions` avec `form_type = 'rgpd'`. Il n'existe **aucun code, nulle part dans le dépôt, qui lise cette table pour supprimer ou modifier automatiquement une donnée**. Une demande RGPD doit aujourd'hui être lue et traitée **manuellement** par une personne ayant accès à `/admin/soumissions` — ce qui répond déjà à votre exigence : *« elle ne doit pas entraîner automatiquement une suppression non vérifiée »*.

**Point à améliorer (proposition, non implémentée)** : le formulaire actuel ne vérifie pas que le demandeur est bien la personne concernée (n'importe qui peut soumettre un nom/email visant un tiers). Options possibles, à votre choix, aucune implémentée :
- (a) Répondre systématiquement à l'email fourni dans la demande pour confirmer l'identité avant tout traitement (procédure humaine, sans changement de code) — la plus simple, recommandée comme minimum.
- (b) Ajouter un lien de confirmation par email envoyé automatiquement (nécessite le module d'envoi d'email — voir §7 — donc à traiter après ce point).
- (c) Ne rien changer techniquement et documenter la procédure de vérification manuelle dans vos processus internes.

Je recommande (a) comme minimum immédiat, sans aucune modification de code nécessaire.

---

## 6. Durée de conservation et cohérence avec `/confidentialite`

**Incohérence détectée** : `app/(site)/confidentialite/ConfidentialitePageClient.tsx` affiche « Durée de rétention des données : 6 mois » (texte préexistant, non modifié par moi) comme règle générale pour tout traitement. **La nouvelle table `form_submissions` n'implémente aucune suppression ni anonymisation automatique** — les données y resteraient indéfiniment sans action manuelle. Le site affiche donc actuellement un engagement de 6 mois qui n'est pas techniquement tenu pour les soumissions de formulaire.

**Proposition de catégories de rétention (à valider ou ajuster par vous — je n'ai fixé aucune durée arbitrairement)** :

| Catégorie | Piste de durée | Justification |
|---|---|---|
| Devis (`form_type = 'devis'`) | Alignée sur le texte déjà publié : 6 mois après traitement, sauf si le devis débouche sur une relation commerciale suivie (auquel cas une base client distincte, hors périmètre actuel, prendrait le relais) | Cohérence avec la promesse déjà publiée sur `/confidentialite` |
| RGPD (`form_type = 'rgpd'`) | Conservation de la preuve de traitement (pas les données elles-mêmes) plus longue que 6 mois, car sert de justificatif en cas de contrôle — à confirmer avec un conseil juridique si vous le jugez utile, je ne suis pas qualifié pour trancher ce point | Obligation de traçabilité potentiellement différente d'une simple donnée commerciale |
| Catalogue (`form_type = 'catalogue'`) | Plus courte (ex. 3 mois) : simple email de contact marketing, faible sensibilité | Finalité limitée et ponctuelle |

**Mécanisme technique proposé (non implémenté)** : un script planifié (ex. tâche Vercel Cron déjà disponible sur la plateforme, ou action manuelle périodique) qui anonymise (remplace email/nom/téléphone par des valeurs neutres, conserve le type et la date à des fins statistiques) plutôt que de supprimer la ligne — réversible en cas d'erreur, contrairement à une suppression. **Aucune donnée réelle ne sera supprimée ou anonymisée sans votre validation explicite des durées ci-dessus.**

---

## 7. Notifications email — paramètres SMTP nécessaires

Aucun email n'a été envoyé, aucun code d'envoi n'a encore été activé. Ce qu'il me faut, **à configurer par vous directement dans les variables d'environnement Vercel** (jamais transmis dans le chat) :

| Paramètre | Exemple | Où le trouver |
|---|---|---|
| Serveur SMTP (host) | ex. `smtp.gmail.com`, `smtp.office365.com`, ou celui de votre hébergeur email | Paramètres de votre messagerie professionnelle actuelle |
| Port | `587` (STARTTLS, recommandé) ou `465` (SSL/TLS implicite) | Idem |
| Mode de chiffrement | STARTTLS ou SSL/TLS — dépend du port choisi | Idem |
| Adresse d'expédition | ex. `contact@2fpub.fr` ou une adresse dédiée type `notifications@2fpub.fr` si elle existe | À votre choix |
| Méthode d'authentification | Identifiant + mot de passe, ou mot de passe d'application si votre fournisseur l'exige (Gmail/Google Workspace l'imposent souvent) | Selon le fournisseur |

Variables d'environnement que je créerai dans `.env.example` (noms uniquement, valeurs à saisir par vous dans Vercel → Settings → Environment Variables, jamais dans le code ni dans le chat) : `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `NOTIFY_EMAIL` (adresse qui reçoit les alertes).

**Architecture prévue (à coder une fois les paramètres disponibles, pas avant)** :
- La ligne en base reste la source de vérité (déjà le cas) — l'email est une notification en plus, jamais un remplacement.
- Nouvelle colonne `notification_status` (`pending` / `sent` / `failed`) sur `form_submissions`.
- Envoi tenté juste après l'écriture en base ; en cas d'échec, le statut reste `failed` et **la demande n'est jamais perdue** (déjà visible dans `/admin/soumissions` quoi qu'il arrive).
- Une nouvelle tentative n'est déclenchée que manuellement (bouton dans `/admin/soumissions`) ou par un job périodique limité, jamais en boucle automatique — pour éviter les envois multiples du même message.
- **Aucun email de test n'ira à une adresse cliente réelle** — les tests utiliseront une adresse que vous me désignerez (la vôtre, ou une adresse de test dédiée).

---

## 8. Catalogue — conforme à votre demande

`app/(site)/fiches/textile/FicheTextilePageClient.tsx` : le bouton n'ouvre plus la fenêtre de capture d'email ; il affiche un badge statique « Catalogue bientôt disponible » (non cliquable) avec un lien de repli vers `/devis`. Aucune promesse de téléchargement ni de fichier inventé. Le formulaire de capture d'email (fonctionnel, testé lors de la mission précédente) reste dans le code mais n'est plus accessible tant que vous n'avez pas tranché entre accès libre ou après formulaire, et fourni le PDF.
