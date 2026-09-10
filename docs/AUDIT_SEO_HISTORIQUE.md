# Audit SEO historique — Ancien site Axomedia (2fpub.fr)

Document produit le 09/09/2026, Phase B du cahier des charges (`DOSSIER_2FPUB_CLAUDE_CODE/REFONTE_2FPUB_CLAUDE_CODE.md`, §3). Croise les exports fournis (`DOSSIER_2FPUB_CLAUDE_CODE/sources/` et `audit/`) avec un crawl HTTP réel, en lecture seule, du domaine historique `www.2fpub.fr`, qui sert aujourd'hui encore l'ancien site Axomedia en production.

**Aucune décision de fusion, suppression ou redirection définitive n'est prise dans ce document.** Chaque proposition est marquée « à valider ». Les originaux dans `DOSSIER_2FPUB_CLAUDE_CODE/audit/` et `DOSSIER_2FPUB_CLAUDE_CODE/sources/` n'ont pas été modifiés.

---

## 1. Ce qui a été fait

1. Import et vérification des totaux des sources fournies (sitemap XML 2024, exports GSC/GA4/Semrush, inventaires provisoires).
2. Crawl HTTP en lecture seule, respectueux de `robots.txt`, des 352 URL de l'inventaire consolidé, avec `outils/crawl_historique.py` (fourni dans le dossier, non modifié) : délai de 2 s entre requêtes sur un même hôte, User-Agent identifié, aucune soumission de formulaire, aucune authentification, redirections suivies sans dépasser 10 sauts.
3. Priorisation du crawl par clics GSC + impressions + backlinks Semrush + présence au sitemap 2024, pour couvrir en premier les URL les plus importantes en cas d'interruption.
4. Constat des statuts HTTP, chaînes de redirection, canonicals déclarés, meta robots et titles réellement observés — comparés aux hypothèses de l'inventaire provisoire.
5. Analyse par famille et par ville des 133 groupes locaux, croisée avec les clics/impressions GSC.

**Ce qui n'a pas été fait à ce stade** : accès direct Axomedia (identifiants, export serveur), export Semrush payant complet, association fine requête → URL au-delà des 1 000 lignes GSC disponibles, décision de destination finale pour une quelconque URL.

---

## 2. Couverture du crawl

| Indicateur | Valeur |
|---|---|
| URL de l'inventaire consolidé | 352 |
| URL effectivement crawlées | 352 (100%) |
| Réponses HTTP 200 | 347 |
| Erreurs / cas particuliers | 5 (détail §5) |
| Codes de redirection rencontrés | 307 (160 cas), 302 (3 cas) — aucun 301 |
| `robots.txt` du domaine | Accessible (`User-agent: *`, `Disallow: /mentions.php`, sitemap déclaré) — respecté par le crawl |

Le crawl et son détail complet sont conservés dans `DOSSIER_2FPUB_CLAUDE_CODE/audit_enrichi/controle_http.csv` (352 lignes, une par URL, avec statut, chaîne de redirection, canonical déclaré, meta robots, title). Un inventaire enrichi fusionnant ces résultats avec `audit/inventaire_urls_exactes.csv` d'origine est dans `audit_enrichi/inventaire_urls_exactes_enrichi.csv` — l'original n'a pas été touché.

---

## 3. Constat majeur — canonicalisation contradictoire sur l'ancien site

**Constaté par crawl réel, sur 352 URL, le 09/09/2026 :**

- **163 des 164 URL `.php` crawlées (99%) redirigent** vers leur équivalent sans `.php`, via un code **307 (redirection temporaire)**, jamais 301.
- **Sur 178 URL sans `.php` crawlées directement, 172 (97%) déclarent pourtant une balise `<link rel="canonical">` pointant vers la variante `.php`** — c'est-à-dire exactement l'URL dont elles viennent d'éloigner le visiteur par redirection.

Exemple vérifié par crawl (2F PUB App, section 3.2 du cahier des charges) :

| URL demandée | Statut | Redirige vers | Canonical déclaré sur la page finale |
|---|---|---|---|
| `enseignes-lumineuses-et-led-aubervilliers.php` | 200 (via 307) | `.../enseignes-lumineuses-et-led-aubervilliers` | `.../enseignes-lumineuses-et-led-aubervilliers.php` |
| `covering-et-marquage-vehicule-aulnay-sous-bois.php` | 200 (via 307) | `.../covering-et-marquage-vehicule-aulnay-sous-bois` | `.../covering-et-marquage-vehicule-aulnay-sous-bois.php` |
| `vetements-professionnels.php` | 200 (via 307) | `.../vetements-professionnels` | `.../vetements-professionnels.php` |
| `contact.php` | 200 (via 307) | `.../contact` | `.../contact.php` |

**Interprétation (déduite, à confirmer par Search Console)** : ce comportement contredit directement l'hypothèse par défaut envisagée dans le cahier des charges (§3.3) selon laquelle la variante sans `.php` serait canonique. Sur l'ancien site, c'est le signal inverse : le code source déclare la variante `.php` comme référence, alors que le serveur redirige activement les visiteurs (et les robots) vers la variante sans extension, avec un code temporaire qui n'transmet pas de signal fort de changement permanent à Google. Les 163 lignes du rapport GSC « Pages » utilisent d'ailleurs très majoritairement les URL `.php` (cohérent avec ce constat : c'est probablement la version que Google a choisi d'indexer malgré la redirection, ou que Google affiche dans les rapports par habitude historique).

**Ce que cela signifie pour la migration (à valider, pas une décision)** : les URL historiques `.php` semblent être la référence la plus stable à cibler individuellement dans la future table de redirections (301 propres depuis le nouveau site), plutôt que les variantes sans extension qui n'ont jamais été le signal canonique déclaré. Ceci reste à confirmer via l'Inspection d'URL de Search Console avant toute validation finale, conformément à la consigne du cahier des charges de ne pas déduire une équivalence sans vérification par cas.

### 3.1 Vérification complémentaire — ce que Google affiche réellement (recherche publique, pas Search Console)

L'accès Search Console (Inspection d'URL) n'est toujours pas disponible dans cette session. En complément, une **vérification par recherche publique** (`site:2fpub.fr ...`) a été effectuée le 09/09/2026 sur les 6 pages les plus prioritaires. **Important : ceci n'est PAS équivalent à l'outil d'Inspection d'URL de Search Console** — un résultat de recherche public ne révèle pas la « Canonical sélectionnée par Google » au sens strict, seulement l'URL que Google choisit d'afficher dans les résultats à un instant donné. C'est un indice complémentaire, pas une preuve définitive.

| Page vérifiée | URL déclarée canonique dans le HTML | URL affichée par Google dans les résultats publics |
|---|---|---|
| Enseignes · Aubervilliers | `.../enseignes-lumineuses-et-led-aubervilliers.php` | `.../enseignes-lumineuses-et-led-aubervilliers` (**sans** `.php`) |
| Covering · Aulnay-sous-Bois | `.../covering-et-marquage-vehicule-aulnay-sous-bois.php` | `.../covering-et-marquage-vehicule-aulnay-sous-bois` (**sans** `.php`) |
| Vêtements professionnels (famille) | `.../vetements-professionnels.php` | `.../vetements-professionnels` (**sans** `.php`) |
| Marquage véhicule (famille) | `.../marquages-vehicules.php` | `.../marquages-vehicules` (**sans** `.php`) |
| Contact | `.../contact.php` | `.../contact` (**sans** `.php`) |
| Covering · Torcy | `.../covering-et-marquage-vehicule-torcy.php` | `.../covering-et-marquage-vehicule-torcy` (**sans** `.php`) |

**Sur les 6 pages vérifiées, Google affiche la variante SANS `.php`** dans les résultats publics — c'est-à-dire l'URL vers laquelle le serveur redirige (307), et non celle déclarée comme canonique dans le code HTML (`.php`).

**Correction demandée par le propriétaire (09/09/2026) : ce constat ne doit PAS servir de base à une conclusion ou une recommandation.** Un résultat de recherche public reflète l'affichage à un instant donné, pas la canonical réellement retenue par l'algorithme de Google, et peut différer par requête, localisation ou évolution de l'index. La seule source faisant foi est l'outil d'Inspection d'URL de Search Console (§3.2 ci-dessous prépare cette vérification). Aucune redirection n'est ni proposée ni appliquée sur la seule base de cette recherche publique — elle est conservée ici uniquement comme donnée brute, pour mémoire.

Sources consultées le 09/09/2026 (données brutes uniquement, aucune conclusion tirée) : [2fpub.fr/enseignes-lumineuses-et-led-aubervilliers](https://www.2fpub.fr/enseignes-lumineuses-et-led-aubervilliers), [2fpub.fr/covering-et-marquage-vehicule-aulnay-sous-bois](https://www.2fpub.fr/covering-et-marquage-vehicule-aulnay-sous-bois), [2fpub.fr/vetements-professionnels](https://www.2fpub.fr/vetements-professionnels), [2fpub.fr/marquages-vehicules](https://www.2fpub.fr/marquages-vehicules), [2fpub.fr/contact](https://www.2fpub.fr/contact), [2fpub.fr/covering-et-marquage-vehicule-torcy](https://www.2fpub.fr/covering-et-marquage-vehicule-torcy).

### 3.2 Vérification Search Console — préparée, à exécuter par le propriétaire (accès non disponible dans cette session)

Liste prête à l'emploi pour l'outil **Inspection d'URL** de Search Console (Search Console → Inspection de l'URL → coller chaque URL → onglet « Couverture » pour voir la canonical retenue par Google). À faire pour chaque paire `.php` / sans `.php` des 15 pages prioritaires (§4) au minimum, dans cet ordre (par clics GSC décroissants) :

1. `https://www.2fpub.fr/` (référence, canonical déjà cohérente par crawl)
2. `https://www.2fpub.fr/enseignes-lumineuses-et-led-aubervilliers` et `.../enseignes-lumineuses-et-led-aubervilliers.php`
3. `https://www.2fpub.fr/covering-et-marquage-vehicule-aulnay-sous-bois` et `.php`
4. `https://www.2fpub.fr/vetements-professionnels` et `.php`
5. `https://www.2fpub.fr/marquages-vehicules` et `.php`
6. `https://www.2fpub.fr/covering-et-marquage-vehicule-torcy` et `.php`
7. `https://www.2fpub.fr/enseignes-lumineuses-et-led-la-courneuve` et `.php`
8. `https://www.2fpub.fr/covering-et-marquage-vehicule-villiers-sur-marne` et `.php`
9. `https://www.2fpub.fr/vetements-de-travail-personnalises-aubervilliers` et `.php`
10. `https://www.2fpub.fr/covering-et-marquage-vehicule-la-courneuve` et `.php`
11. `https://www.2fpub.fr/contact` et `.php`
12. `https://www.2fpub.fr/panneaux-publicitaires-chelles` et `.php`
13. `https://www.2fpub.fr/stores` et `.php` (voir §6ter)
14. `https://www.2fpub.fr/covering-et-marquage-vehicule-chelles` et `.php`
15. `https://www.2fpub.fr/covering-et-marquage-vehicule-gonesse` et `.php`

Pour chaque paire, relever : l'URL indexée par Google, la « canonical déclarée par l'utilisateur » et la « canonical sélectionnée par Google » (ces deux dernières peuvent différer — c'est précisément ce qui manque dans cet audit). Une fois ces données obtenues, je les intégrerai ici avant toute proposition de table de redirections.

---

## 4. Pages à protéger en priorité (vérifiées par crawl)

Top 15 groupes par clics GSC cumulés, avec vérification HTTP réelle au 09/09/2026 :

| Groupe / famille / ville | Clics GSC | Impressions | `.php` crawlé | Statut & redirection réels |
|---|---:|---:|---|---|
| `/` (accueil) | 1 318 | 29 687 | — | 200, canonical = soi-même (`https://www.2fpub.fr/`) |
| Enseignes · Aubervilliers | 169 | 5 949 | oui | 307 → non-.php, canonical = `.php` |
| Marquage véhicule · Aulnay-sous-Bois | 74 | 1 615 | oui | idem |
| Vêtements professionnels (page famille) | 73 | 7 029 | oui | idem |
| Marquage véhicule (page famille) | 52 | 8 779 | oui | idem |
| Marquage véhicule · Torcy | 47 | 2 261 | oui | idem |
| Enseignes · La Courneuve | 47 | 1 219 | oui | idem |
| Marquage véhicule · Villiers-sur-Marne | 43 | 2 507 | oui | idem |
| Textile · Aubervilliers | 40 | 1 609 | oui | idem |
| Marquage véhicule · La Courneuve | 37 | 1 148 | oui | idem |
| Contact | 36 | 4 239 | oui | idem |
| Panneaux · Chelles | 36 | 1 367 | oui | idem |
| Stores (page famille, hors périmètre actuel) | 36 | 1 441 | oui | idem |
| Marquage véhicule · Chelles | 35 | 1 405 | oui | idem |
| Marquage véhicule · Gonesse | 35 | 2 039 | oui | idem |

Ces 15 groupes représentent une part importante des 1 690 clics GSC cumulés attribués aux 133 groupes locaux (voir `synthese_provenance.json`). **Aucune de ces URL ne doit être redirigée vers l'accueil ou fusionnée sans destination équivalente identifiée**, conformément à la règle impérative du cahier des charges (§3.1). La correspondance avec les routes Next.js actuelles (`/fiches/covering`, `/fiches/enseignes`, etc., sans variante locale existante à ce jour) reste à valider avec le propriétaire — voir §7.

---

## 5. Anomalies détectées sur l'ancien site (constatées par crawl, pas par déduction)

1. **`https://2fpub.fr/` (sans www) — échec TLS** (`SSL: SSLV3_ALERT_HANDSHAKE_FAILURE`). Le domaine racine sans `www` ne répond pas correctement en HTTPS au 09/09/2026. À vérifier côté DNS/certificat avant toute campagne de redirection basée sur ce domaine.
2. **`https://www.2fpub.fr/email.php` et `.../email?Ok=wrong&message=-Captcha..`** : boucle de redirection détectée (le crawl s'arrête après 10 sauts par sécurité). Probablement un point de traitement de formulaire de contact cassé ou mal configuré ; sans valeur de contenu à migrer.
3. **`https://www.2fpub.fr/mentions.php`** : bloqué par `robots.txt` (`Disallow: /mentions.php`) — non crawlé, conformément à la consigne de respecter les refus d'accès. La page `/mentions` (sans `.php`) existe séparément et porte un `meta robots: noindex` — c'est la seule URL noindex détectée sur les 352.
4. **`https://www.2fpub.fr/habillages-vitrine.php`** : répond HTTP 200 mais affiche le contenu « Oups... Page introuvable » — un **soft 404** (le serveur ne renvoie pas de vrai code 404, contrairement à ce que recommande Google). Cette page n'a donc plus de contenu réel malgré un code de succès ; à vérifier individuellement si elle a des clics/impressions avant toute décision.
5. **`https://www.2fpub.fr/photocall` (page famille/hub, singulier) partage exactement le même `<title>` et le même contenu que `.../marquages-vehicules`** — c'est cette page hub précisément qui est mal configurée sur l'ancien site (constat corrigé par rapport à une première lecture trop large : voir §6bis, **les 13 pages locales `/photocalls-[ville]` (pluriel) sont, elles, individuellement correctes**, chacune avec un title unique « PHOTOCALL SUR MESURE À [VILLE] »).
6. **`/index` et `/index.php`** dupliquent intégralement le contenu et le title de l'accueil (`/`) — confirmé par crawl, cohérent avec la mise en garde du cahier des charges (§3.3) sur les entrées techniques du sitemap 2024.
7. **`/sitemap` et `/sitemap.php`** (l'ancien « plan du site » Axomedia) répondent 200 avec un contenu propre — à ne pas confondre avec le fichier `sitemap.xml` technique.
8. **`/suppression-donnees` et `/email_suppr.php`** partagent le même title (« Suppression données ») — deux URL historiques pour une fonctionnalité RGPD déjà présente à l'identique dans le nouveau site (`/suppression-donnees`), avec une continuité de nommage encourageante pour cette route précise.
9. **Un seul PDF n'a pas pu être vérifié automatiquement** (`2f_Catalogue_MAJ_Mai2024 INTERACTIF.pdf`) : son nom de fichier contient un espace non encodé, ce qui bloque l'outil de crawl utilisé (limite technique du script, pas un problème du site). À vérifier manuellement si ce catalogue doit être conservé.

---

## 6. Répartition par famille (133 groupes locaux, 19 villes)

| Famille | Groupes locaux | Villes couvertes | Clics GSC cumulés | Impressions cumulées |
|---|---:|---:|---:|---:|
| Marquage véhicule | 25 | 19 | 543 | 25 675 |
| Enseignes | 19 | 19 | 381 | 24 828 |
| Panneaux | 19 | 19 | 268 | 13 037 |
| Textile | 19 | 19 | 232 | 17 387 |
| Bâches / banderoles | 19 | 19 | 134 | 4 332 |
| Adhésifs / vitrophanie | 19 | 19 | 120 | 4 919 |
| Photocall | 13 | 13 | 12 | 1 389 |

Les 19 villes identifiées dans les groupes locaux : Aubervilliers, Aulnay-sous-Bois, Bobigny, Boulogne-Billancourt, Chelles, Gonesse, Goussainville, La Courneuve, Levallois, Montreuil, Nanterre, Noisy-le-Grand, Pantin, Roissy-en-France, Saint-Denis, Sarcelles, Torcy, Villepinte, Villiers-sur-Marne.

**Observation (à valider) :** la famille « Photocall » se distingue nettement des 6 autres par un volume de clics 10 à 45 fois inférieur. Elle n'a par ailleurs pas de fiche équivalente dans le nouveau site Next.js actuel (les 8 fiches couvrent covering, textile, enseignes, vitrophanie, plaques-panneaux, logo lumineux, impression, flyers — pas de photocall). Ceci est une observation, pas une recommandation de suppression : la décision revient au propriétaire, notamment au regard de l'activité commerciale actuelle sur ce type de prestation (non mentionnée dans l'annexe A du cahier des charges). Documentation complète ci-dessous (§6bis), conformément à votre demande de ne pas trancher son sort sur le seul critère du trafic.

---

## 6bis. Documentation de la famille Photocall (aucune décision — état des lieux)

### Ce qu'est ce produit sur l'ancien site

Un « photocall » est un mur/fond personnalisé pour photos (type tapis rouge/événementiel), présenté par 2F PUB comme « photocall sur mesure ». Sur l'ancien site, cette famille est classée aux côtés du roll-up, du logo mural et des stickers, sous la rubrique **« publicité intérieure »** (constat obtenu par recherche publique `site:2fpub.fr`, page `/publicite-interieure` — non crawlée en détail dans cette phase, à vérifier individuellement si besoin). **Ce produit n'est mentionné nulle part dans l'annexe A du cahier des charges** (qui liste les 9 familles actuelles de 2F PUB sans inclure le photocall) — son statut d'activité commerciale actuelle est donc réellement inconnu de ce document et doit être confirmé par vous.

### Pages recensées (13 pages locales + 1 page famille)

| Page | Clics GSC | Impressions | Position moyenne | État constaté par crawl |
|---|---:|---:|---:|---|
| `/photocall` (page famille, hub) | 0 | 397 | 26,4 | **Cassée** : sert le contenu de `/marquages-vehicules` (même title, même page) au lieu de son propre contenu |
| `/photocalls-torcy` | 2 | 249 | 34,8 | OK — title et contenu propres |
| `/photocalls-aulnay-sous-bois` | 2 | 234 | 36,6 | OK |
| `/photocalls-aubervilliers` | 2 | 135 | 20,2 | OK |
| `/photocalls-villiers-sur-marne` | 2 | 121 | 42,4 | OK |
| `/photocalls-pantin` | 0 | 102 | 29,8 | OK |
| `/photocalls-goussainville` | 0 | 100 | 40,7 | OK |
| `/photocalls-chelles` | 0 | 98 | 24,1 | OK |
| `/photocalls-bobigny` | 1 | 89 | 42,2 | OK |
| `/photocalls-la-courneuve` | 1 | 79 | 29,4 | OK |
| `/photocalls-sarcelles` | 1 | 46 | 27,2 | OK |
| `/photocalls-villepinte` | 0 | 51 | 37,7 | OK |
| `/photocalls-gonesse` | 0 | 55 | 28,9 | OK |
| `/photocalls-noisy-le-grand` | 1 | 30 | 57,6 | OK |
| **Total famille** | **12** | **1 786** | — | — |

### Anomalies et précisions

- **Seule la page famille `/photocall` (singulier) est cassée** — elle affiche le contenu de la page « Marquage véhicules » au lieu de présenter le produit photocall. **Les 13 pages locales (pluriel `/photocalls-[ville]`) sont, elles, techniquement correctes** : chacune a un title unique (« PHOTOCALL SUR MESURE À [VILLE] »), répond 200, et suit le même schéma de redirection `.php` → sans extension que le reste du site (§3).
- Position moyenne Google (20 à 58) globalement moins bonne que les autres familles (qui tournent plutôt entre 10 et 25 sur leurs meilleures villes) — cohérent avec le faible volume de clics, mais n'indique pas nécessairement une absence de demande réelle : ce sont des mots-clés à faible volume de recherche par nature (produit plus rare que covering/enseignes).
- Aucune information sur les tarifs, délais ou modalités de ce produit n'a été trouvée dans l'annexe A ni dans le code du nouveau site — toute fiche future devrait attendre une validation de contenu de votre part plutôt que d'être improvisée.

### Ce que ce document NE tranche PAS

Conformément à votre consigne, aucune décision n'est prise ici. Les options possibles pour votre arbitrage (aucune n'est recommandée par défaut) :
1. Maintenir la famille avec ses 13 pages locales, en corrigeant uniquement la page hub cassée — si le photocall reste une prestation active.
2. Regrouper le contenu photocall dans une section de la future fiche « Impression » ou « Plaques & panneaux » plutôt qu'une fiche dédiée, si le volume ne justifie pas une fiche séparée mais que le produit reste proposé.
3. Ne pas migrer cette famille vers de nouvelles pages dédiées si le produit n'est plus proposé commercialement — dans ce cas, prévoir des redirections vers la page la plus pertinente (accueil déconseillé par le cahier des charges — plutôt vers `/services` ou `/fiches/impression`), jamais une suppression sans redirection.

---

## 6ter. Documentation de la famille Stores (aucune décision — état des lieux)

Point identifié en préparant les correspondances de redirection (§7bis) : un produit de plus, absent des 9 familles listées dans l'annexe A.

### Ce qu'est ce produit sur l'ancien site

D'après le title et la meta description réels de la page (crawl du 09/09/2026) : **stores extérieurs** — « fabrication et pose de stores vénitien, store terrasse », avec personnalisation. Contrairement à Photocall, **il n'existe qu'une seule page pour ce produit** (pas de déclinaison par ville) : `/stores` et `/stores.php`.

### Pages recensées (1 page, pas de déclinaison locale)

| Page | Clics GSC | Impressions | État constaté par crawl |
|---|---:|---:|---|
| `/stores.php` | 36 | 1 441 | 200, redirige (307) vers `/stores`, canonical déclarée = `.php` (même schéma que le reste du site, §3) |
| `/stores` | — (mesuré uniquement côté `.php` dans les exports fournis) | — | 200, contenu identique à `.php`, canonical déclarée = `.php` |

Avec 36 clics et 1 441 impressions sur la seule variante `.php` mesurée, `/stores` fait partie des 15 groupes les plus prioritaires de tout l'inventaire (§4) — comparable en volume à `contact.php` ou aux meilleures pages locales de covering.

### Anomalies et précisions

- Aucune anomalie technique détectée (contrairement à Photocall) : la page répond correctement et a un contenu propre à elle, ni dupliqué ni cassé.
- **Absent des 9 familles listées dans l'annexe A** du cahier des charges — comme pour Photocall, son statut d'activité commerciale actuelle (produit toujours proposé ou non) est inconnu de ce document.
- Le mot « store » recoupe potentiellement d'autres prestations actuelles (vitrophanie, enseignes) sans certitude — à clarifier si vous confirmez que ce produit reste proposé.

### Ce que ce document NE tranche PAS

Mêmes options qu'au §6bis pour Photocall (maintien, intégration à une fiche existante, ou non-migration avec redirection) — aucune n'est recommandée par défaut, votre confirmation métier est nécessaire avant toute décision.

---

## 7. Statuts proposés par groupe — À VALIDER, aucune décision définitive

Conformément au cahier des charges (§3.5.8), voici une proposition de statut par grande catégorie. **Aucun de ces statuts n'est appliqué** ; ils servent de base de discussion.

| Catégorie | Statut proposé | Justification |
|---|---|---|
| Accueil, Contact, pages famille avec clics significatifs (marquage véhicule, textile, enseignes, panneaux) | Conserver, avec nouvelle URL équivalente + redirection 301 propre depuis l'URL `.php` historique | Trafic GSC réel et significatif ; les routes Next.js actuelles (`/`, `/devis`, `/fiches/*`) sont déjà les destinations fonctionnelles les plus proches, mais le mapping fiche ↔ ancienne page famille doit être confirmé un par un |
| 128 groupes locaux avec ≥1 clic GSC (sur 133 recensés) | Analyse individuelle avant toute fusion — candidates à une page locale dédiée si le propriétaire souhaite maintenir la stratégie locale, sinon à un maillage renforcé depuis la fiche famille correspondante | Valeur SEO démontrée par clics/impressions réels ; le cahier des charges interdit une fusion sans analyse individuelle pour ce cas |
| Famille Photocall (13 pages locales, techniquement correctes) + 1 page hub (cassée) | Maintenir temporairement + demander confirmation métier — voir documentation complète §6bis | Volume de trafic inférieur aux 6 autres familles, mais les 13 pages locales sont individuellement saines ; seule la page hub `/photocall` sert le mauvais contenu ; pas de fiche équivalente dans le nouveau site ; nécessite une décision commerciale, pas seulement technique |
| `/index`, `/index.php`, `/sitemap`, `/sitemap.php` | Ne pas reproduire dans le nouveau sitemap ; rediriger `/index*` vers `/`, `/sitemap*` vers `/plan-du-site` | Entrées techniques/dupliquées, pas de contenu propre |
| `/page-404` | Ne pas migrer comme page de contenu — le nouveau site a sa propre page 404 (`app/not-found.tsx`, créée en Phase D) | Contenu générique sans valeur SEO propre |
| `/habillages-vitrine.php` (soft-404) | À vérifier individuellement (clics/impressions/backlinks) avant toute décision — actuellement sans contenu réel sur l'ancien site | Peut avoir eu de la valeur passée malgré son état actuel cassé ; absence de contenu actuel n'est pas une preuve d'absence de valeur historique |
| `/email.php`, `/email?...` (boucle de redirection) | Ne pas migrer | Points techniques de traitement de formulaire, sans contenu |
| `/mentions` (noindex), `/mentions.php` (bloqué robots.txt) | Faire correspondre vers `/mentions-legales` du nouveau site avec redirection, sans set noindex par défaut sur l'équivalent (déjà indexable dans le nouveau site) | Continuité fonctionnelle simple, faible enjeu SEO |
| PDF (catalogue, etc.) | Vérifier individuellement s'ils doivent être re-servis à la même URL ou migrés vers `/assets/pdf/...` du nouveau site | Le cahier des charges demande explicitement de prendre en compte les PDF ayant des performances ou des liens |

---

## 7bis. Correspondances de redirection proposées — PRÉPARÉES, NON APPLIQUÉES

**Principe directeur confirmé par le propriétaire (09/09/2026) :** privilégier la **conservation des URL historiques qui performent** plutôt que de changer systématiquement toutes les adresses vers une nouvelle arborescence. Une URL `.php` ou sans extension qui a des clics/impressions réels ne doit pas être remplacée par une nouvelle URL « plus propre » sans raison technique ou commerciale précise — voir aussi §3.6 du cahier des charges (« La future URL ne doit pas être choisie uniquement parce qu'elle paraît plus courte »). La structure finale sera proposée avec ses avantages, ses risques et la correspondance URL par URL avant toute validation — ce tableau §7bis n'est qu'une préparation, pas cette proposition finale.

Conformément à votre consigne (§Priorité 2), ces correspondances sont préparées pour discussion, **aucune redirection n'a été codée dans le nouveau site**. Elles portent sur les 15 pages les plus prioritaires (§4). Pour les pages « famille », une destination existe déjà dans le nouveau site. **Pour les pages locales, aucune route dédiée n'existe encore dans le Next.js actuel** (pas de `/fiches/[famille]/[ville]`) — la colonne « Destination proposée » pointe donc vers la fiche famille correspondante à titre provisoire, en attendant votre décision sur la structure cible (décision #5, §9).

| URL historique (cible pour 301) | Clics GSC | Destination proposée dans le nouveau site | Statut |
|---|---:|---|---|
| `enseignes-lumineuses-et-led-aubervilliers.php` | 169 | `/fiches/enseignes` (pas de page locale dédiée à ce jour) | À valider |
| `covering-et-marquage-vehicule-aulnay-sous-bois.php` | 74 | `/fiches/covering` (idem) | À valider |
| `vetements-professionnels.php` (page famille) | 73 | `/fiches/textile` | À valider |
| `marquages-vehicules.php` (page famille) | 52 | `/fiches/covering` | À valider |
| `covering-et-marquage-vehicule-torcy.php` | 47 | `/fiches/covering` (idem local) | À valider |
| `enseignes-lumineuses-et-led-la-courneuve.php` | 47 | `/fiches/enseignes` (idem local) | À valider |
| `covering-et-marquage-vehicule-villiers-sur-marne.php` | 43 | `/fiches/covering` (idem local) | À valider |
| `vetements-de-travail-personnalises-aubervilliers.php` | 40 | `/fiches/textile` (idem local) | À valider |
| `covering-et-marquage-vehicule-la-courneuve.php` | 37 | `/fiches/covering` (idem local) | À valider |
| `contact.php` | 36 | `/devis` (le nouveau site n'a pas de page « contact » distincte — `/devis` porte les coordonnées) | À valider |
| `panneaux-publicitaires-chelles.php` | 36 | `/fiches/plaques-panneaux` (idem local) | À valider |
| `stores.php` (produit hors périmètre annexe A actuel — documenté §6ter) | 36 | Aucune fiche équivalente dans le nouveau site — à arbitrer | **Décision commerciale requise** |
| `covering-et-marquage-vehicule-chelles.php` | 35 | `/fiches/covering` (idem local) | À valider |
| `covering-et-marquage-vehicule-gonesse.php` | 35 | `/fiches/covering` (idem local) | À valider |

**Point d'attention supplémentaire** : `stores.php` (36 clics, 1 441 impressions) correspond à un produit — les stores/protections solaires — qui n'apparaît dans aucune des 9 familles actuelles listées dans l'annexe A. À l'instar du photocall (§6bis), son statut d'activité commerciale actuelle doit être confirmé avant toute correspondance de redirection définitive.

---

## 8. Fichiers produits (Phase B)

- `docs/AUDIT_SEO_HISTORIQUE.md` — ce document.
- `DOSSIER_2FPUB_CLAUDE_CODE/audit_enrichi/controle_http.csv` — résultat complet du crawl (352 lignes), un par URL, avec statut, redirection, canonical, meta robots, title.
- `DOSSIER_2FPUB_CLAUDE_CODE/audit_enrichi/inventaire_priorise_pour_crawl.csv` — copie de travail de l'inventaire, triée par priorité pour le crawl (ne remplace pas l'original).
- `DOSSIER_2FPUB_CLAUDE_CODE/audit_enrichi/inventaire_urls_exactes_enrichi.csv` — fusion de `audit/inventaire_urls_exactes.csv` (non modifié) avec les résultats du crawl.
- `DOSSIER_2FPUB_CLAUDE_CODE/audit_enrichi/crawl_log.txt` — journal brut d'exécution du crawl.

Les fichiers originaux (`DOSSIER_2FPUB_CLAUDE_CODE/audit/*.csv`, `DOSSIER_2FPUB_CLAUDE_CODE/sources/*`) n'ont pas été modifiés.

---

## 9. Décisions et informations nécessaires du propriétaire

1. **Confirmer via Search Console (Inspection d'URL)** si Google indexe réellement les URL `.php` ou leurs équivalents sans extension pour les pages à fort trafic — le crawl ne peut pas se substituer à cette vérification (accès Search Console non disponible dans cette session). Une vérification complémentaire par recherche publique (§3.1) suggère que Google affiche la variante **sans** `.php` sur les 6 pages testées, mais ce n'est pas une confirmation Search Console.
2. **Décider du sort de la famille Photocall** (12 clics, page famille probablement cassée) — activité commerciale actuelle ou non ?
3. **Confirmer si des pages locales supplémentaires** (au-delà des 19 villes/133 groupes déjà identifiées) doivent être ajoutées, une fois les informations Axomedia disponibles.
4. **Fournir un accès Search Console (Inspection d'URL) ou un export serveur Axomedia**, pour aller au-delà des limites de ce crawl en lecture seule (le crawl ne prouve pas la canonical choisie par Google, seulement celle déclarée dans le HTML).
5. **Valider la structure de destination** (une route Next.js unique par fiche vs. `/services/[famille]/[ville]` par exemple) avant toute table de redirections définitive — non tranchée par ce document, conformément au cahier des charges (§4).

**Point additionnel identifié depuis la première version de ce document (Priorité 2, à ajouter à votre arbitrage) :**

6. **`stores.php`** (36 clics, 1 441 impressions — l'un des 15 groupes les plus prioritaires, §7bis, documenté en détail §6ter) correspond à un produit (stores extérieurs, vénitien/terrasse) absent des 9 familles actuelles listées dans l'annexe A. Comme pour Photocall : est-ce une activité commerciale toujours proposée ? Les deux familles (Photocall et Stores) restent conservées intégralement dans l'inventaire, sans décision de regroupement ni de suppression.

---

*Ce document est un audit, pas un plan d'exécution. Aucune redirection, suppression ou fusion n'a été appliquée au nouveau site à partir de ces constats — voir `docs/ENVIRONNEMENT_ET_DEPLOIEMENT.md` pour l'état du dépôt Next.js et le compte rendu séparé des corrections techniques déjà appliquées en Phase D.*
