# Points à valider par les dirigeants avant publication finale

Ce document recense toutes les affirmations commerciales, chiffres clés, dates, garanties et mentions trouvées dans le code, qui nécessitent une confirmation explicite des dirigeants de 2F Publicité avant publication finale. Rien n'est corrigé ici — seulement signalé, avec citation exacte et fichier source.

---

## 1. Année de fondation / ancienneté de l'entreprise

Plusieurs pages affichent des chiffres d'ancienneté **qui ne sont pas rigoureusement cohérents entre eux** selon l'année de référence :

- **`app/(site)/a-propos/page.tsx`** :
  - Hero : "Depuis **1999**, nous accompagnons les entreprises d'Île-de-France..." et chip "Fondée en **1999**"
  - Timeline : "**1999** — Création de l'agence — 70 m² à Aubervilliers."
  - Timeline : "**2023** — Naissance de 2F Publicité — Nouvelle direction, nouveau nom — ouverts à tous les secteurs."
  - Stats band : "**25+** Ans d'expérience"
  - Section "Trois piliers" : "Ce qui fait la différence depuis **25 ans**."
- **`app/(site)/HomeClient.tsx`** : stat "**25 ans** — D'expertise — en communication visuelle"
- **`app/(site)/realisations/page.tsx`** : stat "**25 ans** — D'expérience"
- **`app/(site)/fiches/textile/page.tsx`** : "★★★★★ **40 ans d'expérience**"
- **`app/(site)/footer` (`components/Footer.tsx`)** : "Votre partenaire en communication visuelle B2B **depuis 1999**."

**Pourquoi valider** : "40 ans d'expérience" (fiche textile) est incohérent avec "1999" comme date de création (soit ~25-27 ans en 2026) affiché partout ailleurs (a-propos, accueil, réalisations, footer). Écart d'environ 15 ans à clarifier : s'agit-il d'une erreur de saisie sur la fiche textile, ou d'une antériorité réelle de l'activité (avant la structuration juridique en 1999, ou expérience cumulée d'un partenaire comme Aqua Pressing) qui mériterait d'être expliquée plutôt que juxtaposée sans contexte ?

Par ailleurs, la mention "**Naissance de 2F Publicité**" en **2023** (nouvelle direction, nouveau nom) coexiste avec "depuis 1999" utilisé comme si c'était la même entité continue sur toutes les autres pages — à confirmer : le discours commercial doit-il distinguer l'activité historique (1999) du nom actuel "2F Publicité" (2023) ou les présenter comme une continuité sans rupture (ce qui est fait actuellement) ?

---

## 2. Chiffres clés à confirmer

| Chiffre | Fichier | Citation exacte |
|---|---|---|
| +500 clients | `app/(site)/HomeClient.tsx` | "+500 — Clients B2B accompagnés — entreprises de toutes tailles" |
| +500 clients | `app/(site)/a-propos/page.tsx` | chip "+500 clients" |
| +500 projets | `app/(site)/realisations/page.tsx` | "Plus de 500 projets réalisés pour des entreprises de toutes tailles." et stat "+500 — Projets réalisés" |
| 10k+ projets | `app/(site)/a-propos/page.tsx` | stat "10k+ — Projets réalisés" |
| 10 000 projets | `app/(site)/a-propos/page.tsx` | timeline 2018 : "300 m² — 10 000 projets — Nouveau palier d'espace et 10 000 projets livrés partout en France." |
| 300m² d'ateliers | `app/(site)/a-propos/page.tsx` | stat "300m² — D'ateliers" |
| 100% fabrication France | `app/(site)/a-propos/page.tsx` | stat "100% — Fabrication France" |
| 80% de clients fidèles | `app/(site)/a-propos/page.tsx` | "Plus de **80 %** de nos clients reviennent." |
| Note Google 4,9/5 | `app/(site)/HomeClient.tsx` | "**4,9/5** ★★★★★ Google" et "Note moyenne sur **80+ avis** clients vérifiés" |
| 1000ème enseigne (2006) | `app/(site)/a-propos/page.tsx` | timeline 2006 : "1 000ème enseigne — Cap symbolique franchi — référence incontournable en Île-de-France." |
| Lauréats Réseau Entreprendre 93 (2024) | `app/(site)/a-propos/page.tsx` | timeline 2024 : "Lauréats Réseau Entreprendre 93 — Distinction récompensant l'entrepreneuriat local et la croissance de l'agence." |

**Pourquoi valider** : "+500 clients" (accueil, à-propos) et "+500 projets réalisés" (réalisations) sont deux métriques différentes (clients ≠ projets) utilisées avec le même chiffre "+500" à trois endroits différents — à vérifier qu'il ne s'agit pas d'une confusion entre les deux notions. De même, "10k+" et "10 000" (projets) sont cohérents entre eux mais datés de 2018 dans la timeline — faut-il actualiser ce chiffre pour 2026 (8 ans plus tard) ? La note Google "4,9/5 sur 80+ avis" doit être vérifiée comme étant la note réellement affichée sur la fiche Google Business actuelle au moment de la mise en ligne (ces chiffres évoluent).

---

## 3. Garanties et engagements chiffrés (délais, garanties matériaux)

| Fichier | Citation exacte | Pourquoi valider |
|---|---|---|
| `app/(site)/services/page.tsx` (modale Covering) | "**Garantie 5 ans** sur les matériaux et la pose" | Engagement contractuel fort — à confirmer que cette garantie est bien effective et formalisée (durée, conditions, exclusions) avant publication. |
| `app/(site)/services/page.tsx` (modale Enseignes) | "**Garantie 2 ans** pièces & main-d'œuvre" | Idem — engagement contractuel, durée à confirmer. |
| `app/(site)/services/page.tsx` (modale Enseignes) | "Éclairage LED basse consommation (**économies jusqu'à 70%**)" | Chiffre d'économie d'énergie à sourcer/valider (base de comparaison non précisée : par rapport à quel éclairage ?). |
| `app/(site)/fiches/enseignes/page.tsx` | "LED basse consommation — Économique et durable, **50 000h de durée de vie**" | Donnée technique fournisseur à confirmer (dépend du modèle LED utilisé). |
| `app/(site)/devis/page.tsx` + nombreuses pages | "Réponse sous **24h**", "Devis sous **24h**" (répété sur quasi toutes les pages) | Engagement de délai répété partout — à confirmer qu'il est tenable en toutes circonstances (période de forte affluence, congés...). |
| `app/(site)/HomeClient.tsx` / plusieurs fiches | "devis chiffré sous **48h**" | Coexiste avec "24h" ailleurs — voir incohérence ci-dessous. |
| `app/(site)/fiches/covering/page.tsx` | "Tarif flotte dès **3 véhicules**" | Seuil commercial à confirmer. |
| `app/(site)/fiches/textile/page.tsx` | "Tarifs dégressifs pour grandes quantités ? Oui, **dès 50 pièces**." + "**12 pièces** minimum" (broderie) / "**10 pièces** minimum" (flocage) | Seuils à confirmer, cohérents entre eux dans le fichier mais à valider comme politique commerciale actuelle. |
| `app/(site)/fiches/enseignes/page.tsx` | "En dessous de **1 m²**, une déclaration en mairie suffit souvent." | **Affirmation réglementaire** (droit de l'urbanisme/enseignes) — à faire valider par un professionnel du droit ou à sourcer précisément avant publication, le seuil réel dépendant aussi du PLU local et non uniquement de la surface. |

---

## 4. Incohérence des délais "24h" vs "48h"

**Constat détaillé** (mise en vis-à-vis) :
- `app/(site)/a-propos/page.tsx` : chip "**Devis sous 24h**" ; pilier "**Réactivité sans égale** — Devis sous 24h, production express possible."
- `app/(site)/devis/page.tsx` : "Remplissez le formulaire — réponse personnalisée **sous 24h**, sans engagement." ; "Réponse garantie **sous 24h**." ; message succès : "reviendra vers vous **sous 24h** avec un devis personnalisé" ; "Réponse **sous 24h**, lun–ven 9h–18h"
- `app/(site)/HomeClient.tsx` : stat "**24h** — Délai de réponse — pour votre demande de devis personnalisé" ; process étape 2 : "Un expert 2F vous rappelle **sous 24h**"
- **VS.** `app/(site)/HomeClient.tsx` : bloc CTA café : "on revient vers vous avec **un devis chiffré sous 48h**"
- **VS.** `app/(site)/services/page.tsx` : bloc CTA café (identique) : "devis chiffré **sous 48h**"
- **VS.** `app/(site)/a-propos/page.tsx` : bloc CTA café : "devis chiffré **sous 48h**"
- **VS.** `app/(site)/realisations/page.tsx` : bloc CTA café : "devis chiffré **sous 48h**"
- **VS.** quasiment toutes les fiches produit (`covering`, `enseignes`, `flyers`, `impression`, `logo-lumineux`, `plaques-panneaux`, `textile`, `vitrophanies`) : meta "**48h** délai de devis" (bandeau hero) + CTA final "devis chiffré **sous 48h**"

**Pourquoi valider** : le site affiche systématiquement "24h" pour le formulaire `/devis` et les stats génériques, mais **systématiquement "48h" sur toutes les fiches produit et blocs CTA café**. Ce n'est pas nécessairement une erreur (24h pourrait désigner un délai de première réponse, 48h un délai de devis chiffré définitif), mais cette nuance n'est **jamais explicitée dans le texte** — un visiteur consultant deux pages différentes peut légitimement percevoir une incohérence. À clarifier et harmoniser le discours (ou expliciter la différence entre "réponse sous 24h" et "devis chiffré sous 48h").

---

## 5. Sous-traitance : affirmations contradictoires potentielles

- `app/(site)/a-propos/page.tsx`, pilier "Maîtrise de bout en bout" : "Conseil, création graphique, fabrication, pose, livraison. Tout sous un même toit, **sans sous-traitance cachée**. Vous savez exactement ce qu'il se passe."
- `app/(site)/a-propos/page.tsx`, section "100% production interne" : "Broderie, flocage, impression, découpe, pose — tout se passe ici, à Aubervilliers. **Pas d'intermédiaire, pas de sous-traitance.**"
- `app/(site)/a-propos/page.tsx`, citation du fondateur : "Ce n'est pas juste une agence de publicité, c'est aussi les ateliers. **Nous produisons nous-mêmes**..."
- **VS.** `app/(site)/fiches/textile/page.tsx` : mention répétée d'un partenaire externe nommé — "**Aqua Pressing**" : "Fabriqué à Aubervilliers, contrôlé par **Aqua Pressing**", "★★★★★ Aqua Pressing certifié", "Partenaire qualité certifié — Chaque vêtement contrôlé et testé par **Pressing professionnel** — Lavage industriel · Entretien textile", et dans le processus : "Fabrication en atelier — Contrôle qualité sur chaque pièce, **testé par Aqua Pressing**."

**Pourquoi valider** : la page à-propos affirme sans ambiguïté "pas de sous-traitance", "pas d'intermédiaire", "nous produisons nous-mêmes" — alors que la fiche textile présente **Aqua Pressing** comme un partenaire externe explicitement nommé qui contrôle/teste les vêtements (lavage industriel, entretien textile — activité normalement distincte de la fabrication/broderie/flocage). Il est possible que ce contrôle qualité externe ne soit pas perçu comme de la "sous-traitance" au sens où l'entend la page à-propos (fabrication vs. contrôle qualité), mais **cette nuance n'est pas explicitée** et les deux discours pourraient être lus comme contradictoires par un client ou un concurrent. À faire trancher par les dirigeants : le partenariat avec Aqua Pressing doit-il être présenté différemment, ou la mention "pas de sous-traitance" doit-elle être nuancée ?

---

## 6. Tarifs différents entre `/services` (modales) et `/fiches/*` (grilles détaillées)

**Covering véhicule** — mise en vis-à-vis :
- `app/(site)/services/page.tsx` (modale) : "Covering partiel : **400€ – 900€ HT**" / "Covering total : **900€ – 2 800€ HT**" / "Délai de pose : **3 à 7 jours ouvrés**"
- `app/(site)/fiches/covering/page.tsx` (grille détaillée par véhicule) : pour une **Voiture**, "Semi-Covering" (équivalent le plus proche de "covering total/partiel") est affiché à "**890 €**" HT (à partir de) — soit un montant **inférieur** à la fourchette basse "900€" de la modale `/services` pour un "covering partiel". Pour un fourgon Sprinter/Master, le Semi-Covering va de **1 630 € à 2 100 €** — cohérent avec la fourchette haute de la modale mais sans que la modale ne précise qu'il s'agit d'une moyenne tous véhicules confondus.

**Textile** — mise en vis-à-vis :
- `app/(site)/services/page.tsx` (modale) : "Flocage vinyle : **Dès 12€ HT/pièce**" / "Broderie : **Dès 18€ HT/pièce**" / "Sérigraphie : **À partir de 20 pièces**" / "Délai de livraison : **5 à 10 jours ouvrés**"
- `app/(site)/fiches/textile/page.tsx` : aucun tarif chiffré par pièce n'est affiché sur la fiche dédiée (contenu orienté techniques/FAQ, pas de grille de prix) ; délai annoncé en FAQ : "**5 à 7 jours ouvrés** après validation du bon à tirer" — **différent** du "5 à 10 jours ouvrés" affiché dans la modale `/services`.

**Enseignes** — mise en vis-à-vis :
- `app/(site)/services/page.tsx` (modale) : "Enseigne simple : **À partir de 300€ HT**" / "Caisson lumineux : **800€ – 3 500€ HT**" / "Lettres LED relief : **1 200€ – 6 000€ HT**" / "Délai de pose : **2 à 4 semaines**"
- `app/(site)/fiches/enseignes/page.tsx` : aucun tarif chiffré (uniquement les 7 techniques décrites qualitativement) ; délai annoncé en FAQ : "**7 à 15 jours ouvrés** après validation du BAT" — **différent** du "2 à 4 semaines" (soit ~14 à 28 jours) affiché dans la modale `/services`. Les deux fourchettes se recoupent partiellement (7-15 j ouvrés ≈ 10-21 j calendaires vs 14-28 j) mais ne sont pas identiques.

**Impression** — mise en vis-à-vis :
- `app/(site)/services/page.tsx` (modale) : "500 flyers A5 : **À partir de 29€ HT**" / "250 cartes de visite : **À partir de 39€ HT**" / "Bâche grand format : **À partir de 25€/m² HT**" / "Délai express : **24 à 48h disponible**"
- `app/(site)/fiches/flyers/page.tsx` (grille détaillée) : le tarif le plus proche est **1 000 flyers A5** (pas 500) à **140€** recto (soit un ratio ~14€/100 flyers, cohérent en ordre de grandeur avec "29€ pour 500" annoncé côté modale : 500×0.056=28€, cohérent) — mais **la modale annonce un tarif pour 500 exemplaires qui n'existe pas dans la grille officielle de la fiche** (la grille flyers commence à 1 000 exemplaires). De même pour les cartes de visite : modale "250 cartes : 39€", fiche "500 cartes : 130€ (recto)" — pas de palier à 250 dans la grille officielle.

**Pourquoi valider** : ces écarts de tarifs, seuils de quantité et délais entre `/services` et les fiches produit dédiées doivent être arbitrés par les dirigeants — laquelle des deux sources fait foi ? Un client comparant les deux pages pourrait légitimement s'interroger sur la fiabilité des prix affichés.

---

## 7. Avis clients avec noms/initiales — à valider avant publication

Le site affiche de nombreux témoignages avec initiale de nom, secteur d'activité et ville. Ces avis sont-ils réels, vérifiés, et les personnes citées ont-elles consenti à cette publication (RGPD/droit à l'image commercial) ? Liste complète des identités citées :

**Accueil (`HomeClient.tsx`)**, bandeau défilant (12 avis) :
- M. M. · Transport sanitaire · Aubervilliers
- Mme M. · Étiquetage · Saint-Denis
- M. Z. · Artisan · Bobigny
- M. N. · Déménagement · Bondy
- M. E. · Entreprise · Saint-Ouen
- Mme I. · Garage automobile · Villepinte
- M. D. · Commerce · Clichy
- Mme S. · Artisan · Drancy
- Mme L. · Entreprise familiale · Pantin
- M. J. · BTP · Montreuil
- M. S. · Commerce · Aulnay-sous-Bois
- M. T. · Commerce · Romainville

**Réalisations (`app/(site)/realisations/page.tsx`)**, carrousel (7 avis, prénom + initiale visibles cette fois) :
- Marie C. · Commerce · Pantin
- Julien D. · Artisan · Aubervilliers
- Sofia K. · Restauration · Saint-Denis
- Thomas B. · Transport · Bobigny
- Amira L. · Immobilier · Saint-Ouen
- Pierre M. · BTP · Montreuil
- Céline R. · Événementiel · Paris 19e

**Pourquoi valider** : au-delà du contenu même des avis (à confirmer comme authentiques et non inventés pour la maquette), la présence de **prénoms complets** (Marie C., Julien D., etc.) sur `/realisations`, plus identifiants que les simples initiales de l'accueil, augmente le niveau de donnée personnelle publiée et le besoin de consentement formel. Ce point est also croisé avec `app/(site)/confidentialite/page.tsx` qui affiche une "Durée de rétention des données : **6 mois**" — à vérifier la cohérence avec la conservation de ces témoignages publiés dans le code (donc potentiellement bien au-delà de 6 mois).

---

## 8. Autres mentions à faire valider

| Fichier | Citation | Pourquoi valider |
|---|---|---|
| `app/(site)/mentions-legales/page.tsx` | "Crédits photographiques : **Adobe Stock**" | À confirmer que **toutes** les photos du site (atelier, équipe, réalisations) proviennent bien d'Adobe Stock, ou si certaines sont des photos réelles de l'entreprise/des employés — la mention actuelle laisse entendre une origine unique et générique alors que le site affiche par ailleurs des photos présentées comme celles de l'atelier réel ("Façade atelier 2F", "Intérieur atelier", équipe "Direction", "Création", "Atelier Production"). Si ces photos sont réelles (personnel, locaux), la mention de crédits devrait probablement le refléter plutôt que renvoyer exclusivement à une banque d'images. |
| `app/(site)/mentions-legales/page.tsx` | "Directeur de la publication : **2F Publicité**" | Nom d'une entité et non d'une personne physique — à confirmer si conforme aux obligations légales (le directeur de publication doit généralement être une personne physique identifiée). |
| `components/Footer.tsx` | "© **2026** 2F Publicité — Tous droits réservés" | Année codée en dur (non calculée dynamiquement) — à vérifier qu'elle sera mise à jour chaque année, sinon deviendra rapidement obsolète/inexacte. |
| `app/(site)/HomeClient.tsx` / `components/Header.tsx` | "Découvrir la boutique →" / "Boutique en ligne" → lien `#` (placeholder, commentaire TODO explicite dans le code) | La boutique en ligne est annoncée comme fonctionnelle dans la navigation et sur l'accueil ("Commandez en ligne, en toute simplicité... Casquettes, textile, adhésifs, enseignes — parcourez notre catalogue et commandez directement depuis notre boutique.") mais le lien ne mène nulle part. Le site AGENTS.md mentionne d'ailleurs qu'un projet Shopify séparé est prévu plus tard — à confirmer que ce texte promotionnel ("Commandez en ligne, en toute simplicité") ne doit pas être publié tel quel avant que la boutique existe réellement, pour éviter de frustrer les visiteurs. |
| `app/(site)/devis/page.tsx` | `action="https://formspree.io/f/VOTRE_FORM_ID_ICI"` | Le formulaire de devis principal du site est **non fonctionnel en l'état** (ID Formspree placeholder). À ne pas publier tel quel — voir AUDIT-TECHNIQUE.md et INVENTAIRE-PAGES.md. |
| `app/(site)/suppression-donnees/page.tsx` | `action="https://formspree.io/f/VOTRE_RGPD_FORM_ID_ICI"` | Même problème pour le formulaire de demande RGPD — non fonctionnel en l'état. |
