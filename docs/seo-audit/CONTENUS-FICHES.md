# Contenus intégraux — pages commerciales

Extraction du texte visible (JSX) des pages listées dans la mission. Le texte est reproduit tel quel (orthographe, ponctuation, emphases `**`/`<span>` non conservées, mais le contenu verbal est fidèle). Le code de style inline (couleurs, tailles, animations) n'est pas reproduit ici — voir les fichiers sources pour le détail visuel. Rien n'est inventé ni complété : toute information absente du code n'est pas mentionnée.

---

## Accueil (`app/(site)/page.tsx` + `app/(site)/HomeClient.tsx`)

### Hero carrousel (3 slides)
1. **Covering & marquage** — H1 : "Votre véhicule, votre pub" — "Covering complet ou semi-covering, conçu et posé par notre atelier, partout en France." — CTA "Voir nos coverings →" → `/fiches/covering`
2. **Signalétique** — H1 : "Votre enseigne, votre vitrine" — "Fabrication sur mesure, boîtiers lumineux, pose comprise — visible jour et nuit." — CTA "Découvrir nos enseignes →" → `/fiches/enseignes`
3. **Textile pro** — H1 : "Votre équipe, vos couleurs" — "Broderie, flocage, vêtements personnalisés — toute l'équipe habillée à vos couleurs." — CTA "Voir le catalogue textile →" → `/fiches/textile`

### Bandeau logos clients (social proof)
Logos affichés (en boucle) : Bouygues Construction, OLT, Sixt, Chez Apou, Clicar, GCC, Entra Fauché, Plaine Commune Habitat.

### Section boutique en ligne
- H2 : "Commandez en ligne, en toute simplicité"
- "Casquettes, textile, adhésifs, enseignes — parcourez notre catalogue et commandez directement depuis notre boutique."
- Carte "Bientôt..." (boutique non encore disponible)
- CTA : "Découvrir la boutique →" → `#` (lien placeholder, commentaire code : `TODO: remplacer "#" par l'URL de la boutique en ligne une fois disponible`)

### Section "Pourquoi 2F Publicité ?"
- H2 : "Pourquoi 2F Publicité ?"
- Stats : **+500** "Clients B2B accompagnés" (entreprises de toutes tailles) · **25 ans** "D'expertise" (en communication visuelle) · **24h** "Délai de réponse" (pour votre devis personnalisé)

### Section réalisations
- H2 : "Nos dernières réalisations"
- Galerie dynamique (DB), CTA "Voir toutes nos réalisations →" → `/realisations`

### Section avis
- H2 : "Ils nous font confiance, des retours concrets."
- Score : **4,9/5** ★★★★★ Google
- "Note moyenne sur **80+ avis** clients vérifiés"
- Bandeau défilant de 12 mini-avis (2 rangées, texte intégral) :
  1. "Flocage réalisé sur mes ambulances. Le rendu vraiment propre, professionnel et bien visible sur la route. Au top !" — M. M. · Transport sanitaire · Aubervilliers
  2. "Impression d'étiquettes rapide et de très bonne qualité, classiques et holographiques. Je recommande." — Mme M. · Étiquetage · Saint-Denis
  3. "Super travail. Je recommande au niveau graphisme tout autant que la pose de lettrage sur mon utilitaire." — M. Z. · Artisan · Bobigny
  4. "Flocage d'un de nos utilitaires pour notre entreprise de déménagement. Équipe rapide et sérieuse." — M. N. · Déménagement · Bondy
  5. "J'ai fait confiance à 2F Pub pour la réalisation de plaques alu pour la façade de mon entreprise et je ne regrette rien !" — M. E. · Entreprise · Saint-Ouen
  6. "Je suis passée par 2F pour installer des panneaux publicitaires pour notre garage. Travail rapide et sérieux, de la conception jusqu'à la pose." — Mme I. · Garage automobile · Villepinte
  7. "Très sérieux. Merci pour les vêtements et le panneau publicitaire." — M. D. · Commerce · Clichy
  8. "Flocage sur mon utilitaire. Service sérieux et rapide." — Mme S. · Artisan · Drancy
  9. "J'ai réalisé chez 2F l'intégralité des vêtements brodés pour l'entreprise familiale, ainsi que le marquage des pulls, et le travail effectué est impeccable !" — Mme L. · Entreprise familiale · Pantin
  10. "Je fais faire tous mes camions chez eux, ainsi que mes panneaux de chantier. Équipe très professionnelle et réactive." — M. J. · BTP · Montreuil
  11. "Super marquage sur mon utilitaire. La publicité sur le véhicule est ressortie comme sur la maquette. Je recommande." — M. S. · Commerce · Aulnay-sous-Bois
  12. "Équipe au top, à l'écoute, multiples services proposés le tout réalisé avec professionnalisme. Merci." — M. T. · Commerce · Romainville

### CTA devis
- H2 : "Obtenez votre devis gratuit en 3 minutes"
- CTA "Démarrer mon devis gratuit →" → `/devis`

### Processus
- H2 : "Simple, rapide, efficace" — "De votre demande à la livraison, un processus pensé pour vous."
- 1. "Remplissez le formulaire" — "Choisissez votre prestation et décrivez votre besoin en quelques clics."
- 2. "On vous contacte" — "Un expert 2F vous rappelle sous 24h pour affiner votre projet."
- 3. "Recevez votre devis" — "Devis détaillé et personnalisé, sans surprise ni frais cachés."
- 4. "On s'occupe de tout" — "Production, finitions et livraison gérées de A à Z."

### CTA café
- H2 : "Un projet ? Parlons-en autour d'un café."
- "Passez à l'atelier au 217 av. Jean Jaurès, ou envoyez-nous un plan / une photo — on revient vers vous avec un devis chiffré sous 48h."
- CTA tel `01 43 52 24 24` + "Demander un devis →" → `/devis`

### Bloc "Nous trouver"
- H2 : "Venez nous voir à l'atelier."
- "Showroom ouvert du lundi au vendredi — devis sur place, sans rendez-vous."
- Adresse : "217 avenue Jean Jaurès<br/>93300 Aubervilliers"
- Horaires : "Lun – Ven · 9h00 – 18h00 · Fermé 12h30 – 14h00 · Fermé le week-end"
- Accès : "Métro ligne 7 — Fort d'Aubervilliers · Bus 234, 173, 250, 152, 330, 609 · Parking disponible"
- CTA "Obtenir l'itinéraire" → Google Maps (externe)

---

## Services (`app/(site)/services/page.tsx`)

- H1 : "Une offre complète pour votre visibilité"
- Sous-titre : "Du covering véhicule à l'enseigne lumineuse — tout ce dont votre entreprise a besoin, géré par un seul interlocuteur."
- Barre de filtres (8 onglets) : Marquage véhicule · Vêtements personnalisés · Enseignes · Vitrophanies · Plaques & Panneaux · Logo lumineux · Impressions · Petite papeterie

### 1. Marquage véhicule
H2 : "Marquage véhicule"
- "Covering total, partiel ou magnétique repositionnable"
- "Semi-covering, lettrage adhésif, adhésif découpe"
- "Résistant aux UV, lavages et intempéries"
- "Pose professionnelle en atelier à Aubervilliers"

### 2. Vêtements personnalisés
H2 : "Vêtements personnalisés"
- "Broderie haute densité pour un rendu premium"
- "Flocage vinyle ou flex, sérigraphie selon les volumes"
- "Large gamme de vêtements professionnels"
- "Dès 1 pièce, remise volume à partir de 10 pièces"

### 3. Enseignes lumineuses
H2 : "Enseignes lumineuses"
- "Enseignes lumineuses LED basse consommation, caissons"
- "Enseignes non lumineuses (PVC, dibond, aluminium)"
- "Drapeaux enseigne"
- "Pose et installation par nos techniciens"

### 4. Adhésifs / vitrophanies
H2 : "Adhésifs / vitrophanies"
- "Autocollant classique ou découpé à la forme (découpe numérique)"
- "Film confidentiel (dépoli, givré)"
- "Film décoratif"
- "Application intérieure ou extérieure"

### 5. Plaques / panneaux
H2 : "Plaques / panneaux"
- "Panneaux grand format"
- "Panneaux de chantier"
- "Plaques transparentes ou professionnelles (plexiglas, dibond, alu)"
- "Impression HD, résistance extérieure"

### 6. Logo lumineux
H2 : "Logo lumineux"
- "Toute forme, toute taille"
- "Version comptoir (présentoir)"
- "Version murale intérieure ou extérieure"
- "Rétroéclairage LED, fabrication sur mesure en atelier"

### 7. Impressions tous formats
H2 : "Impressions tous formats"
- "Bâches (chantier, événement, façade)"
- "Autocollant mural, étiquettes"
- "Vinyles décoratifs"
- "Roll-up, kakémono, drapeau plume"

### 8. Petite papeterie
H2 : "Petite papeterie"
- "Flyers A5, A4, formats personnalisés"
- "Cartes de visite mat, brillant, soft-touch, dorure"
- "Papier qualité supérieure dès 170g, petites et grandes séries"
- "Livraison rapide partout en France"

### CTA café (identique à celui de l'accueil)
"Un projet ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, ou envoyez-nous un plan / une photo — on revient vers vous avec un devis chiffré sous 48h."

### Modales fiches produit (4 modales cachées dans le DOM)

**Modale Covering véhicule**
- Tag : "Covering & marquage"
- Description : "Du lettrage adhésif simple au covering total, nous transformons vos véhicules en supports publicitaires mobiles qui travaillent pour vous 24h/24, partout où vous roulez."
- Tarifs indicatifs :
  - Lettrage simple : "À partir de 150€ HT"
  - Covering partiel : "400€ – 900€ HT"
  - Covering total : "900€ – 2 800€ HT"
  - Délai de pose : "3 à 7 jours ouvrés"
- Ce qui est inclus :
  - "Prise de gabarit & BAT couleur avant validation"
  - "Vinyles 3M ou Avery certifiés, résistants UV & lavage HP"
  - "Pose professionnelle par nos techniciens certifiés"
  - "**Garantie 5 ans** sur les matériaux et la pose"
  - "Démontage possible sans endommager la carrosserie"

**Modale Vêtements personnalisés**
- Tag : "Textile pro"
- Description : "Polos, t-shirts, vestes, casquettes, tabliers, sacs — personnalisés à votre image par broderie ou flocage, dès 1 pièce. Idéal pour habiller vos équipes et renforcer votre image de marque."
- Tarifs indicatifs :
  - Flocage vinyle : "Dès 12€ HT/pièce"
  - Broderie : "Dès 18€ HT/pièce"
  - Sérigraphie : "À partir de 20 pièces"
  - Délai de livraison : "5 à 10 jours ouvrés"
- Ce qui est inclus :
  - "Vectorisation de votre logo si nécessaire (offerte)"
  - "BAT numérique avant lancement de la production"
  - "Large choix de marques : B&C, Stanley/Stella, Gildan…"
  - "Remise dégressive à partir de 10 pièces"
  - "Livraison partout en France, emballage individuel disponible"

**Modale Enseignes & signalétique**
- Tag : "Signalétique"
- Description : "Enseignes LED, caissons lumineux, lettres boîtier, totems, panneaux directionnels — nous concevons, fabriquons et installons votre signalétique pour renforcer votre visibilité."
- Tarifs indicatifs :
  - Enseigne simple : "À partir de 300€ HT"
  - Caisson lumineux : "800€ – 3 500€ HT"
  - Lettres LED relief : "1 200€ – 6 000€ HT"
  - Délai de pose : "2 à 4 semaines"
- Ce qui est inclus :
  - "Étude technique et plan de pose offerts"
  - "Accompagnement pour la déclaration préalable de travaux"
  - "Éclairage LED basse consommation (économies jusqu'à 70%)"
  - "Installation par techniciens habilités travaux en hauteur"
  - "**Garantie 2 ans** pièces & main-d'œuvre"

**Modale Impression & supports print**
- Tag : "Impression"
- Description : "Flyers, affiches, cartes de visite, bâches, roll-ups, kakémonos — tous vos supports print conçus et imprimés en interne, avec des finitions premium et des délais express."
- Tarifs indicatifs :
  - 500 flyers A5 : "À partir de 29€ HT"
  - 250 cartes de visite : "À partir de 39€ HT"
  - Bâche grand format : "À partir de 25€/m² HT"
  - Délai express : "24 à 48h disponible"
- Ce qui est inclus :
  - "Relecture et contrôle technique de vos fichiers (offerts)"
  - "Papiers certifiés : mat, glacé, recyclé, offset"
  - "Finitions : pelliculage soft-touch, vernis sélectif, dorure à chaud"
  - "Découpe spéciale (die-cut) sur devis"
  - "Livraison express nationale 24-48h disponible"

**Note importante** : ces tarifs de modales `/services` (ex. covering total "900€ – 2 800€ HT") sont **différents des tarifs détaillés par véhicule** de la fiche `/fiches/covering` (ex. Semi-Covering voiture "890 €"). Voir POINTS-A-VALIDER.md pour la mise en vis-à-vis complète.

---

## À propos (`app/(site)/a-propos/page.tsx`)

### Hero
- H1 : "L'agence qui donne de la voix à votre marque"
- "Depuis 1999, nous accompagnons les entreprises d'Île-de-France sur tous leurs projets de communication visuelle — du vêtement pro à l'enseigne lumineuse."
- Chips : "Fondée en 1999" · "+500 clients" · "Aubervilliers (93)" · "Devis sous 24h"

### Histoire
- H2 : "Nés à Aubervilliers, présents partout en France"
- "Depuis 1999, nous accompagnons les professionnels dans leur communication visuelle. Une histoire d'artisanat, de passion et de croissance."
- Stats band : **25+** "Ans d'expérience" · **300m²** "D'ateliers" · **10k+** "Projets réalisés" · **100%** "Fabrication France"
- Timeline :
  - **1999** — "Création de l'agence" — "70 m² à Aubervilliers. Spécialisation enseigne & vitrophanie pour le BTP et la restauration."
  - **2006** — "1 000ème enseigne" — "Cap symbolique franchi — référence incontournable en Île-de-France."
  - **2012** — "150 m² & véhicules" — "Extension des ateliers et lancement du marquage & flocage véhicule."
  - **2018** — "300 m² — 10 000 projets" — "Nouveau palier d'espace et 10 000 projets livrés partout en France."
  - **2023** — "Naissance de 2F Publicité" — "Nouvelle direction, nouveau nom — ouverts à tous les secteurs."
  - **2024** — "Lauréats Réseau Entreprendre 93" — "Distinction récompensant l'entrepreneuriat local et la croissance de l'agence."

### Citation du fondateur
> « Ce n'est pas juste une agence de publicité, c'est aussi les ateliers. Nous produisons nous-mêmes pour être en mesure de proposer des produits de qualité. Cette qualité fait qu'aujourd'hui nous n'avons pas de commercial : ce sont nos clients qui parlent de nous. »
— "Le fondateur, 2F Publicité" — "Aubervilliers · Depuis 1999"

### Trois piliers
- H2 : "Trois piliers, une promesse" — "Ce qui fait la différence depuis 25 ans."
- **01 Réactivité sans égale** — "Devis sous 24h, production express possible. Votre projet n'attend pas — nous non plus. Un interlocuteur dédié, joignable, qui répond."
- **02 Maîtrise de bout en bout** — "Conseil, création graphique, fabrication, pose, livraison. Tout sous un même toit, sans sous-traitance cachée. Vous savez exactement ce qu'il se passe."
- **03 Partenariat durable** — "On ne cherche pas à vendre une commande, on cherche à construire une relation. **Plus de 80 % de nos clients reviennent.** La confiance, ça se mérite — et ça s'entretient."

### Équipe
- H2 : "Des experts à votre service" — "Une équipe engagée qui met tout son savoir-faire au service de votre visibilité."
- **Direction** — Fondateur & Gérant — "À la tête de 2F Publicité depuis 1999. Une vision claire : accompagner les entreprises avec des solutions visuelles qui font la différence, à chaque commande."
- **Création** — Designers graphiques — "Notre équipe créative transforme vos idées en visuels percutants. Maîtrise de tous les formats : print, covering, enseigne, broderie numérique."
- **Atelier Production** — Techniciens & Poseurs — "Les artisans qui donnent vie à vos projets. Impression grand format, découpe, pose vinyle, broderie — chaque réalisation est traitée avec précision."
(Aucun nom individuel de personne n'est mentionné — postes uniquement.)

### Atelier défilant
- H2 : "100% production interne" — "Broderie, flocage, impression, découpe, pose — tout se passe ici, à Aubervilliers. Pas d'intermédiaire, pas de sous-traitance."

### CTA café (identique)

---

## Devis (`app/(site)/devis/page.tsx`)

- H1 : "Parlons de votre projet"
- Sous-titre : "Remplissez le formulaire — réponse personnalisée sous 24h, sans engagement."
- Titre formulaire : "Votre demande de devis" / "Réponse garantie sous 24h."
- Champs : Prénom, Nom, Email (obligatoire), Téléphone, Entreprise, cases à cocher services (Covering véhicule, Textile pro, Enseignes, Impression), message libre.
- Note formulaire : "🔒 Vos données sont confidentielles."
- Message de succès (caché par défaut) : "Demande bien reçue !" — "Notre équipe a reçu votre demande et reviendra vers vous sous 24h avec un devis personnalisé." — 3 points : "Confirmé par email à l'adresse fournie" / "Réponse sous 24h, lun–ven 9h–18h" / "Un conseiller dédié pour votre projet" — "Besoin urgent ? 01 43 52 24 24"
- Bloc coordonnées directes : tel `01 43 52 24 24`, email `contact@2fpub.fr`, adresse "217 Av. Jean Jaurès — Aubervilliers", horaires "Lun–Ven 9h–18h"
- CTA final : "Préférez nous appeler directement ? Notre équipe est disponible du lundi au vendredi, 9h–18h. On répond vite et on parle vrai."

---

## Fiche Covering (`app/(site)/fiches/covering/page.tsx`)

### Hero
- Kicker : "Covering · Marquage · Vitrophanie"
- H1 : "Vos véhicules, votre pub en mouvement"
- "De l'adhésif découpe au semi-covering total — transformez votre flotte en support publicitaire mobile. Pose en atelier à Aubervilliers."
- Meta : "5 types de véhicules" · "4 techniques" · "48h délai de devis" · "Pose en atelier Aubervilliers"

### Bandeau avantages
"Pose en atelier" (Maîtrisée par nos poseurs Aubervilliers) · "Impression HD" (Couleurs vives, résistance UV garantie) · "Tous véhicules" (Voiture, utilitaire, camion, vitrine) · "Prix clairs" (Tarifs fixes par véhicule, sans surprise)

### Les 4 techniques
1. **Pub Adhésif Découpe** — "Vinyle découpé monochrome, sans fond — idéal textes et logos. Sobre et efficace." — Sans fond · 1 couleur/multicolore · **À partir de 280€**
2. **Pub Adhésif & Impression** — "Impression HD sur vinyle — photos, dégradés, multicolore. Rendu pro sur véhicule léger." — Images & photos · Multicolore HD · **À partir de 540€**
3. **Pub 3 Panneaux** — "2 côtés + arrière en impression multicolore. Couverture maximale, forte visibilité urbaine." — Images, multicouleurs · 3 faces couvertes · **À partir de 470€**
4. **Pub Semi-Covering** — "Couverture totale ou partielle en vinyle imprimé. Notre offre la plus impactante." — Images, multicouleurs · Impact maximal · **À partir de 890€**

### Tarifs par type de véhicule (tous HT, pose en atelier incluse)

**Voiture** (berline, break, SUV) :
| Technique | Prix |
|---|---|
| Adhésif Découpe (sans fond) | 280 € |
| Adhésif & Impression | 540 € |
| Semi-Covering | 890 € |

**Kangoo / Berlingo** (L1 = court, L2 = long) :
| Technique | L1 | L2 |
|---|---|---|
| Adhésif Découpe | 310 € | 370 € |
| 3 Panneaux | 470 € | 510 € |
| Semi-Covering | 950 € | 1 090 € |

**Trafic / Vito** :
| Technique | L1 | L2 |
|---|---|---|
| Adhésif Découpe | 370 € | 420 € |
| 3 Panneaux | 490 € | 580 € |
| Semi-Covering | 1 310 € | 1 460 € |

**Sprinter / Master** (L1 court, L2 standard, L3 long) :
| Technique | L1 | L2 | L3 |
|---|---|---|---|
| Adhésif Découpe | 460 € | 520 € | 580 € |
| 3 Panneaux | 620 € | 740 € | 950 € |
| Semi-Covering | 1 630 € | 1 740 € | 2 100 € |

**Caisse 20m3** (grand fourgon, camion porteur) :
| Technique | Prix |
|---|---|
| Adhésif Découpe (sans fond) | 790 € |
| Adhésif & Impression | 1 130 € |
| Pub Complète Côtés (couverture totale) | 1 490 € |

Mention constante : "Tarif flotte dès 3 véhicules · Devis sous 48h"

### Galerie réalisations
"Covering total · Flotte BTP" · "Semi-covering · Livraison" · "Lettrage adhésif · Artisan" · "Covering total · Restauration" · "Vitrophanie · Commerce"

### Processus
"Devis en ligne" (Véhicule, technique, quantité — réponse sous 48h) → "Validation du BAT" (Maquette sur le gabarit de votre véhicule, à valider avant impression) → "Impression & découpe" (Vinyle certifié UV, résistant aux intempéries) → "Pose en atelier" (Posé à Aubervilliers, résultat impeccable, sans bulle)

### FAQ
- **Combien de temps dure la pose ?** "Entre 2h et une journée selon la surface. Adhésif découpe : 2-3h. Semi-covering complet : jusqu'à une journée. Véhicule rendu le jour même ou le lendemain."
- **Le covering abîme-t-il la peinture ?** "Non, au contraire : le vinyle protège la peinture d'origine des UV et micro-rayures. À la dépose, elle est préservée."
- **Avez-vous des tarifs dégressifs pour une flotte ?** "Oui, dès 3 véhicules. Plus la flotte est importante, plus le coût unitaire diminue — contactez-nous pour un devis personnalisé."

### CTA final
"Besoin d'un marquage ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous vos gabarits — devis chiffré sous 48h, tarif flotte dès 3 véhicules."

---

## Fiche Enseignes (`app/(site)/fiches/enseignes/page.tsx`)

### Hero
- Kicker : "Enseignes & Signalétique · LED & Relief"
- H1 : "Des enseignes qui marquent les esprits"
- "7 techniques lumineuses fabriquées à Aubervilliers, exposées dans notre showroom. Venez voir avant de commander."
- Meta : "7 techniques" · "Showroom à Aubervilliers" · "LED basse conso" · "48h délai de devis"

### Bandeau avantages
"Showroom ouvert" · "7 techniques LED" — "LED basse consommation" (Économique et durable, **50 000h de durée de vie**) · "Fabrication locale" (Atelier à Aubervilliers, contrôle qualité à chaque étape) · "Installation incluse" (Pose par nos techniciens, toute l'Île-de-France) · "Showroom physique" (Venez toucher et voir les échantillons avant de choisir)

### Les 7 techniques
1. **Ajouré (creusé)** — "La lumière ne passe qu'à travers la forme des lettres évidées — effet design, très lisible de nuit." — Contraste fort, look contemporain · Idéal en façade
2. **PVC Rétroéclairé** (10 à 20 mm d'épaisseur) — "Lettres décollées du support — halo lumineux effet néon doux tout autour." — Meilleur rapport qualité/prix · Idéal commerces & restaurants
3. **Alu Rétroéclairé** (3 mm · finition miroir/or) — "Lettres métal fines, reflets lumineux à l'arrière — rendu premium ultra élégant." — Finition miroir, brossé ou doré · Idéal hôtels, bureaux, showrooms
4. **Relief PMMA** (10 · 15 · 20 mm) — "Lettres en relief plein — diffusion lumineuse franche et épurée sur toute la face avant." — Volume clean, toutes couleurs · Résistant aux intempéries
5. **Relief PMMA + Alu** (10 · 15 · 20 mm · alu brossé) — "Face aluminium brossé, lumière subtile sur les chants — design très haut de gamme." — Face métallique opaque & mate · Parfait bureaux & enseignes premium
6. **Boîtier Plexi** (60 mm · volume maximal) — "Grand relief, diffusion intégrale face avant et chants lumineux — impact visuel maximum." — Idéal grandes façades · Excellent rendu jour et nuit
7. **Boîtier Plexi (côtés opaques)** (60 mm · chants opaques) — "Chants opaques, lumière projetée vers l'avant seulement — contraste et lisibilité maximale." — Lisibilité parfaite en journée · Idéal enseignes commerciales

### Processus
"Consultation & relevé" (On mesure votre façade et vous conseille la technique la plus adaptée) → "Conception & BAT 3D" (Visualisez le rendu final avant production) → "Fabrication en atelier" (Câblage LED intégré, contrôle qualité à chaque étape) → "Installation" (Pose, raccordement et test — livraison clé en main)

### FAQ
- **Comment choisir la bonne technique ?** "Venez au showroom toucher et comparer les 7 techniques. On vous conseille selon votre budget, votre façade et votre image. Devis gratuit et sans engagement."
- **Faut-il un permis pour installer une enseigne ?** "En dessous de 1 m², une déclaration en mairie suffit souvent. Au-delà, on vous accompagne dans les démarches d'autorisation."
- **Quel délai entre commande et pose ?** "7 à 15 jours ouvrés après validation du BAT. Installation planifiée avec vous, intervention rapide en Île-de-France."

### CTA final
"Un projet d'enseigne ? Visitez notre showroom." — "217 av. Jean Jaurès, Aubervilliers — venez voir et toucher les 7 techniques avant de choisir. Devis gratuit sous 48h."

---

## Fiche Flyers / petite papeterie (`app/(site)/fiches/flyers/page.tsx`)

### Hero
- Kicker : "Flyers · Cartes de visite · Dépliants · Brochures"
- H1 : "Supports print qui marquent les esprits"
- "Flyers, cartes de visite, dépliants, brochures — imprimés en interne à Aubervilliers. Finitions premium, livraison rapide."
- Meta : "Dès 1 000 flyers" · "Dès 500 cartes de visite" · "48h délai de devis" · "Atelier Aubervilliers"

### Flyers (papier 135g demi-mat, tarifs HT)
| Quantité | Recto | Recto Verso |
|---|---|---|
| 1 000 | 140€ | 150€ |
| 2 000 | 210€ | 230€ |
| 3 000 | 260€ | 290€ |
| 5 000 | 320€ | 370€ |
| 10 000 | 450€ | 550€ |

Création du design : "Recto 60€ · R/V 90€"

### Cartes de visite (format 85×54 mm, tarifs HT)
| Quantité | Recto | Recto Verso |
|---|---|---|
| 500 | 130€ | 160€ |
| 1 000 | 150€ | 190€ |
| 2 000 | 180€ | 230€ |
| 5 000 | 270€ | 300€ |

Création du design : "50€" — Finitions spéciales : "Vernis sélectif, doré, argenté, sablé…"

### Dépliants & brochures (tarifs sur devis)
- Dépliant 2 volets : format A4→A5 ou A5→A6, papier 170g mat/couché brillant, recto/verso
- Dépliant 3 volets : format A4 triptyque, papier 150g/170g, pliage accordéon ou roulé
- Brochure agrafée : 4 à 48 pages, format A4/A5, couverture 300g, intérieur 130g mat/brillant, agrafage dos carré

### Processus
"Envoyez votre fichier" (AI, PDF vectoriel ou PNG haute résolution) → "Validation du BAT" (On n'imprime qu'après votre accord) → "Impression en atelier" (Contrôle qualité sur chaque lot) → "Retrait ou livraison" (À l'atelier ou livré partout en France)

### CTA final
"Un projet print ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous votre fichier — devis chiffré sous 48h."

---

## Fiche Impression (`app/(site)/fiches/impression/page.tsx`)

### Hero
- Kicker : "Petit format · Stickers & Étiquettes · Grand format"
- H1 : "Impression numérique très haute qualité"
- "Du petit format au grand format (jusqu'à 1m58 de large) — impression HD sur tous supports, produite à Aubervilliers."
- Meta : "Jusqu'à 1m58 de large" · "HD qualité supérieure" · "48h délai de devis" · "Atelier Aubervilliers"

### Petit format
"Impression numérique de haute qualité, rendu premium dès la 1ère pièce."
- Papier qualité supérieure (couché mat ou brillant)
- Vinyle adhésif (repositionnable ou permanent)
- Découpe numérique (impression + découpe en une étape)

### Grand format ("jusqu'à 1m58 de large, longueur indéfinie")
- Affiches & posters : A3, A2, A1, 40×60 cm et sur mesure jusqu'à 1m58 de large, papier couché mat/brillant, norme M1
- Bâches chantier & banderoles : sur mesure, avec œillets, norme M1
- Micro-perforé : vitrine ou véhicule
- Roll-up & Kakémonos : formats 85×200 cm et 100×200 cm, norme M1, pieds inclus
- Drapeau plume : extérieur, mât inclus, tissu polyester

### Stickers & Étiquettes (format base 6×6 cm ou 10×5 cm, prix par quantité 50/100/500/1000, TTC)
4 finitions :
1. **La Classique** — vinyle mat ou brillant, fond blanc opaque
2. **La Classique + protection** — vernis de protection, résistance accrue eau/UV
3. **La Transparente** — support transparent, effet vitrine haut de gamme
4. **L'Holographique** (Premium) — film holographique irisé, "effet wow garanti"
(Grille de prix par tranche de quantité affichée dynamiquement en JS selon la sélection — montants exacts non visibles en dur dans le JSX statique extrait.)

### Processus
"Envoyez votre fichier" (AI, PDF vectoriel ou PNG haute résolution) → "Validation du BAT" (Bon à tirer à valider avant mise en production) → "Impression en atelier" (Traceurs HD, découpe précise au mm) → "Retrait ou livraison" (À l'atelier ou livré partout en France)

### FAQ
- **Quel format de fichier fournir ?** "Idéalement un fichier vectoriel AI ou PDF. On accepte aussi les PNG haute résolution (min. 300 dpi). Si vous n'avez pas de fichier prêt, notre studio peut créer ou adapter votre visuel sur devis."
- **Quel est le délai de production ?** "3 à 5 jours ouvrés pour stickers et étiquettes, 5 à 7 jours pour les grands formats. Besoin urgent ? Contactez-nous."
- **Les stickers résistent-ils à l'extérieur ?** "Oui, nos vinyles résistent aux UV, à la pluie et aux écarts de température. La Classique + protection tient mieux en extérieur intensif."

### CTA final
"Un projet d'impression ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous votre fichier — devis chiffré sous 48h."

---

## Fiche Logo lumineux (`app/(site)/fiches/logo-lumineux/page.tsx`)

### Hero
- Kicker : "Comptoir · Mural · Intérieur & extérieur"
- H1 : "Votre logo en relief lumineux & impactant"
- "Logo lumineux en toute forme, pour comptoir, mural, intérieur ou extérieur — un support premium qui valorise votre marque."
- Meta : "Toute forme sur mesure" · "LED basse consommation" · "48h délai de devis" · "Atelier Aubervilliers"

### Deux versions
- **Version comptoir** — "Présentoir posé, idéal pour accueil, boutique ou salon professionnel."
- **Version murale** — "Fixation intérieure ou extérieure, pour façade, hall ou vitrine."
- "Rétroéclairage LED" (Basse consommation, longue durée de vie) · "Fabrication sur mesure" (Toute forme, toute taille, en atelier)
- Aucun tarif chiffré : "Tarifs sur devis selon taille, forme et version."

### Processus
"Envoyez votre logo" (Fichier vectoriel de préférence — on étudie la faisabilité du relief lumineux) → "Validation du BAT" (Rendu 3D et BAT envoyés avant toute mise en production) → "Fabrication en atelier" (Découpe du relief et intégration LED dans notre atelier à Aubervilliers) → "Livraison ou pose" (Retrait à l'atelier ou pose par nos techniciens)

### CTA final
"Un projet de logo lumineux ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers — devis chiffré sous 48h."

---

## Fiche Plaques & Panneaux (`app/(site)/fiches/plaques-panneaux/page.tsx`)

### Hero
- Kicker : "Panneaux · Plaques · Signalétique"
- H1 : "Plaques & panneaux tous supports"
- "Panneaux grand format, plaques pro et transparentes — fabriqués en atelier pour une signalétique durable."
- Meta : "Dibond & aluminium" · "Plexiglas & PVC" · "48h délai de devis" · "Atelier Aubervilliers"

### Quatre types de supports
- **Panneaux grand format** — "Signalétique extérieure grande taille, impression HD résistante aux intempéries."
- **Panneaux de chantier** — "Signalétique de chantier robuste, fixation sur pieds ou clôture."
- **Plaques transparentes** — "Plexiglas ou PVC transparent, pour un rendu épuré et moderne."
- **Plaques professionnelles** — "Dibond ou aluminium, pour une signalétique de façade ou d'accueil durable."
- Aucun tarif chiffré : "Tarifs sur devis selon format, matière et quantité."

### Processus
"Envoyez votre visuel" → "Validation du BAT" → "Fabrication en atelier" (Découpe et impression HD dans notre atelier à Aubervilliers) → "Livraison ou pose"

### CTA final
"Un projet signalétique ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers — devis chiffré sous 48h."

---

## Fiche Textile (`app/(site)/fiches/textile/page.tsx`)

### Hero
- Kicker : "Textile professionnel · Broderie & Flocage"
- H1 : "Vêtements pro à votre image"
- "Broderie et flocage — habillez votre équipe à votre image. Fabriqué à Aubervilliers, contrôlé par **Aqua Pressing**."
- Meta : "Dès 10 pièces minimum" · "48h délai de devis" · "techniques" (nombre non précisé dans l'extrait)
- Mention "Aqua Pressing certifié" (★★★★★)

### Bandeau avantages
"Broderie HD" (Relief 3D premium, résiste au lavage industriel) · "Couleurs vives" (Flocage avec dégradés, sans limite de couleur) · "Atelier local" (Fabrication à Aubervilliers, contrôle sur chaque pièce) · "Tous supports" (Polos, t-shirts, vestes, casquettes, bonnets)

### Les 3 techniques (le titre annonce "3 techniques" mais seules 2 sont détaillées dans le texte extrait)
- **Broderie** — 12 pièces minimum — "La technique la plus qualitative — relief 3D, rendu premium sur tout support." — Résiste au lavage industriel · Idéal logo et monogramme
- **Flocage** — 10 pièces minimum — "Pose à chaud, grands formats, couleurs vives et dégradés sans limite." — Idéal visuels complexes · Ne s'applique pas sur nylon

### Supports compatibles
T-shirt, Polo, Sweat à capuche, Pull, Veste zippée, Bodywarmer, Polaire, Softshell, Blouson, Doudoune, Parka, Casquette, Bonnet, Cache-cou, Pantalon, Combinaison, Blouse, Tablier, Ambulancier, Haute visibilité

### Mentions qualité
- "★★★★★ 40 ans d'expérience"
- "Partenaire qualité certifié" — "Chaque vêtement contrôlé et testé par Pressing professionnel" — "Lavage industriel · Entretien textile"
- Catalogue PDF téléchargeable : "Téléchargez notre catalogue vêtements professionnels" — "Toutes nos gammes, techniques de personnalisation, grilles tarifaires et délais — en un seul document PDF. Gratuit, téléchargement immédiat."

### Processus
"Échange & devis" (Envoyez votre logo — devis gratuit sous 48h) → "Création graphique" (Vectorisation et optimisation pour la technique choisie) → "Fabrication en atelier" (Contrôle qualité sur chaque pièce, testé par Aqua Pressing) → "Retrait à l'atelier" (Prêt en 5 à 7 jours ouvrés)

### FAQ
- **Quelle est la quantité minimum pour commander ?** "12 pièces pour la broderie (hors casquettes/bonnets) et 10 pièces pour le flocage. Pour les casquettes et bonnets, contactez-nous directement — la quantité est flexible."
- **Quel est le délai de fabrication ?** "5 à 7 jours ouvrés après validation du bon à tirer. Commande urgente ? Contactez-nous, on s'adapte."
- **La broderie résiste-t-elle au lavage machine ?** "Absolument, elle résiste à des centaines de lavages sans s'effriter — idéale pour les vêtements de travail quotidiens."
- **Tarifs dégressifs pour grandes quantités ?** "Oui, dès 50 pièces. Demandez un devis personnalisé pour une simulation."

### CTA final
"Un projet textile ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous votre logo — devis chiffré sous 48h."

---

## Fiche Vitrophanies (`app/(site)/fiches/vitrophanies/page.tsx`)

### Hero
- Kicker : "Vitrines · Baies vitrées · Cloisons"
- H1 : "Vitrophanies & films adhésifs"
- "Autocollant, film confidentiel ou décoratif — on habille vos vitrines, baies vitrées et cloisons."
- Meta : "Sur mesure toute forme" · "Intérieur & extérieur" · "48h délai de devis" · "Atelier Aubervilliers"

### Quatre types de films adhésifs
- **Autocollant classique** — "Format rectangulaire ou découpé à la forme de votre logo/visuel. Pose intérieure ou extérieure."
- **Film confidentiel** — "Dépoli ou givré, pour préserver la confidentialité tout en laissant passer la lumière."
- **Film décoratif** — "Motifs, teintes ou textures pour habiller une surface vitrée à des fins esthétiques."
- **Découpe adhésive** — "Découpe numérique précise pour lettrages, logos et formes complexes sans support blanc visible."
- Aucun tarif chiffré : "Tarifs sur devis selon surface, forme et type de film."

### Processus
"Prise de mesure" (Sur place ou par vos plans) → "Validation du visuel" (BAT envoyé avant production) → "Découpe en atelier" → "Pose sur site" (Application par nos techniciens, sans bulle ni pli)

### CTA final
"Un projet vitrine ? Parlons-en autour d'un café." — "Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers — devis chiffré sous 48h."
