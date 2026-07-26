// @ts-nocheck
"use client";

import Link from "next/link";
import { initCarousel, initGlobalKeydown, initReaFilter, initRevealAndCountUps } from "../../lib/interactions";
import { useEffect } from "react";

export default function RealisationsPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    initReaFilter()
    const cleanupCarousel = initCarousel();
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
            cleanupCarousel();
    };
  }, []);

  return (
    <div className="page active" id="page-realisations">


  <section className="rea-hero">
    <div className="container">
      <div className="page-tag">✦ Portfolio</div>
      <h1>Nos <span className="gradient-text">réalisations</span></h1>
      <p>Plus de 500 projets réalisés pour des entreprises de toutes tailles. Covering, textile, enseignes, impression — voyez notre savoir-faire en images.</p>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px'}}>
        <Link href="/devis" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gradient)', color: '#fff', fontFamily: '\'Red Hat Display\',sans-serif', fontWeight: '700', fontSize: '15px', padding: '14px 28px', borderRadius: '50px', textDecoration: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(43,106,239,0.3)', transition: 'transform 0.2s,box-shadow 0.2s'}} onMouseOver={(e) => { e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 12px 36px rgba(43,106,239,0.4)' } } onMouseOut={(e) => { e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 8px 28px rgba(43,106,239,0.3)' } }>Demander un devis gratuit →</Link>
        <a href="tel:0143522424" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-main)', fontFamily: '\'Red Hat Display\',sans-serif', fontWeight: '700', fontSize: '15px', padding: '14px 24px', borderRadius: '50px', textDecoration: 'none', border: '1.5px solid rgba(0,0,0,0.12)', transition: 'border-color 0.2s'}} onMouseOver={(e) => { e.currentTarget.style.borderColor='var(--blue)' } } onMouseOut={(e) => { e.currentTarget.style.borderColor='rgba(0,0,0,0.12)' } }>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>
          01 43 52 24 24
        </a>
      </div>
    </div>
  </section>

  {/*FILTER BAR REA — fixed, visible seulement dans la grille */}
  <div className="rea-filter-bar" id="reaFilterBar">
    <div className="container">
      <div className="rea-filters" id="reaFilters">
        <button className="rea-tab active" data-rfilter="all">Tous</button>
        <button className="rea-tab" data-rfilter="covering">Covering véhicule</button>
        <button className="rea-tab" data-rfilter="textile">Textile pro</button>
        <button className="rea-tab" data-rfilter="enseignes">Enseignes</button>
        <button className="rea-tab" data-rfilter="impression">Impression</button>
        <button className="rea-tab" data-rfilter="stickers">Stickers & vitro</button>
      </div>
    </div>
  </div>

  <section id="reaGridSection" style={{padding: '0 0 96px', background: 'white'}}>
    <div className="container">
      <div className="rea-grid" id="reaGrid">

        {/*COVERING */}
        <div className="rea-card span-2h reveal" data-rcat="covering" data-desc="Covering total de 8 utilitaires pour une entreprise de BTP du 93. Pose en atelier à Aubervilliers, film vinyle haute résistance, délai 5 jours.">
          <div className="rea-bg" style={{background: '#111'}}>
            <img loading="lazy" src="/photos-realisations/vehicule-semi-covering-1.jpg" alt="Semi covering flotte BTP" />
          </div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Covering total — Flotte utilitaires BTP</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card span-2v reveal delay-1" data-rcat="covering" data-desc="Semi covering véhicule utilitaire — film vinyle haute résistance, pose en atelier à Aubervilliers.">
          <div className="rea-bg" style={{background: '#111'}}>
            <img loading="lazy" src="/photos-realisations/vehicule-semi-covering-3.jpg" alt="Semi covering véhicule" />
          </div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Semi covering — Utilitaire entreprise</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-2" data-rcat="covering" data-desc="Lettrage vinyle sur camion 20m³ pour une société de livraison express. Pose en moins de 48h, résistant aux lavages haute pression.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/vehicule-semi-covering-2.jpg" alt="Semi covering camionnette" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Lettrage camion — Société de livraison express</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-3" data-rcat="enseignes" data-desc="Enseigne LED caisson lumineux sur mesure pour un restaurant parisien. Rétroéclairage LED basse consommation, pose et câblage inclus.">
          <div className="rea-bg" style={{background: '#111'}}>
            <img loading="lazy" src="/photos-realisations/enseigne-boitier-plexi-1.jpg" alt="Enseigne boîtier plexi" />
          </div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Enseignes</span>
            <div className="rea-project-title">Enseigne LED — Restaurant Paris 11e</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-1" data-rcat="covering" data-desc="Panneaux adhésifs sur véhicule — marquage professionnel, pose en atelier Aubervilliers.">
          <div className="rea-bg" style={{background: '#111'}}>
            <img loading="lazy" src="/photos-realisations/vehicule-panneaux-1.jpg" alt="Panneaux véhicule" />
          </div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Panneaux adhésifs — Marquage véhicule pro</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card span-2h reveal delay-2" data-rcat="enseignes" data-desc="Caisson lumineux double face de 2×1,2m pour l'entrée d'un centre commercial. Structure aluminium, modules LED IP65, garantie 2 ans pièces et main d'œuvre.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/enseigne-pvc-retroeclaire-1.jpg" alt="Enseigne PVC rétroéclairée" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Enseignes</span>
            <div className="rea-project-title">Caisson lumineux double face — Centre commercial Île-de-France</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-1" data-rcat="stickers" data-desc="Vitrophanie opaque dépoli sur vitrine de 4m². Application intérieure, finition givré, découpe sur mesure au logo de la boutique.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/sticker-vitrophanie-1.jpg" alt="Vitrophanie vitrine" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Stickers & vitro</span>
            <div className="rea-project-title">Vitrophanie opaque — Boutique mode Paris</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-2" data-rcat="enseignes" data-desc="Enseigne lettre boîtier — lettres en relief rétroéclairées, structure aluminium, installation en façade.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/enseigne-lettre-boitier-1.png" alt="Enseigne lettre boîtier" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Enseignes</span>
            <div className="rea-project-title">Lettres boîtier rétroéclairées — Façade commerce</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-3" data-rcat="covering" data-desc="12 plaques magnétiques repositionnables pour une flotte partagée. Fixation/dépose en 30 secondes, résistants à 130 km/h, réutilisables.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/vehicule-adhesif-decoupe-1.jpg" alt="Adhésif découpe véhicule" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Magnétiques repositionnables — Flotte partagée 12 véhicules</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-1" data-rcat="covering" data-desc="Adhésif découpe sur véhicule utilitaire. Pose en atelier à Aubervilliers, film vinyle haute résistance.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/vehicule-adhesif-decoupe-2.jpeg" alt="Adhésif découpe véhicule" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Adhésif découpe — Utilitaire entreprise</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card span-2h reveal delay-2" data-rcat="stickers" data-desc="Décoration complète de façade sur 12m linéaires pour une agence immobilière. Vinyle backlit, découpe numérique, pose en une journée sans fermeture.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/sticker-adhesif-mural-1.jpg" alt="Adhésif mural façade" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Stickers & vitro</span>
            <div className="rea-project-title">Décoration de façade — Agence immobilière Aubervilliers</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-3" data-rcat="enseignes" data-desc="Enseigne relief PMMA — lettres découpées en acrylique, finition chromée, fixation murale.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/enseigne-relief-pmma-1.jpg" alt="Enseigne relief PMMA" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Enseignes</span>
            <div className="rea-project-title">Relief PMMA — Lettres acrylique façade</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-1" data-rcat="covering" data-desc="Adhésif découpe sur véhicule — marquage professionnel pour entreprise locale.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/vehicule-adhesif-decoupe-3.jpeg" alt="Adhésif découpe véhicule" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Covering véhicule</span>
            <div className="rea-project-title">Adhésif découpe — Marquage entreprise locale</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

        <div className="rea-card reveal delay-2" data-rcat="enseignes" data-desc="Totem extérieur 3m en aluminium laqué avec caisson LED et socle béton scellé. Résistant aux intempéries IP65, entretien annuel inclus la première année.">
          <div className="rea-bg" style={{background: '#111'}}><img loading="lazy" src="/photos-realisations/enseigne-drapeau-lumineux-1.jpg" alt="Drapeau lumineux totem" /></div>
          <div className="rea-overlay">
            <span className="rea-cat-badge">Enseignes</span>
            <div className="rea-project-title">Totem extérieur 3m — Hôtel 4 étoiles Seine-Saint-Denis</div>
            <span className="rea-cta-mini">Voir le projet →</span>
          </div>
        </div>

      </div>{/*/rea-grid */}

      {/*Stats bande */}
      <div className="rea-stats-row reveal">
        <div className="rea-stat"><strong data-target="500" data-prefix="+">+500</strong><span>Projets réalisés</span></div>
        <div className="rea-stat"><strong data-target="25" data-suffix=" ans">25 ans</strong><span>D'expérience</span></div>
        <div className="rea-stat"><strong data-target="5">5</strong><span>Expertises métier</span></div>
        <div className="rea-stat"><strong data-target="48" data-suffix="h">48h</strong><span>Délai de production express</span></div>
      </div>
    </div>
  </section>

  {/*══ CAROUSEL AVIS ══ */}
  <section className="carousel-section">
    <div className="container">
      <div className="carousel-header reveal">
        <div className="section-tag" style={{margin: '0 auto 20px', display: 'table'}}>✦ Ce qu'ils disent</div>
        <h2 className="section-title">Ils nous ont fait confiance,<br />ils en parlent mieux que nous</h2>
        <p className="section-sub">Des entreprises de toutes tailles, tous secteurs, dans toute l'Île-de-France.</p>
      </div>
      <div className="carousel-viewport" id="carouselViewport">
        <div className="carousel-track" id="carouselTrack">

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">Atelier sérieux, on sent le vrai savoir-faire. Le devis est arrivé en 24h et la pose s'est faite le weekend pour ne pas fermer la boutique. Je recommande sans hésiter.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,var(--brand),var(--accent))'}}>MC</div>
              <div><div className="c-name">Marie C.</div><div className="c-meta">Commerce · Pantin</div><span className="c-service-tag">Vitrophanie</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">Covering complet sur nos 4 véhicules. Qualité impeccable, tient depuis 3 ans même après de nombreux lavages haute pression. On revient cette année pour les vêtements.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,var(--brand),#0EA5E9)'}}>JD</div>
              <div><div className="c-name">Julien D.</div><div className="c-meta">Artisan · Aubervilliers</div><span className="c-service-tag">Covering véhicule</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">Notre enseigne LED a été livrée et posée en une semaine. Le résultat est spectaculaire. Nos clients nous trouvent beaucoup plus facilement depuis. Un investissement qui vaut le coup.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,var(--accent),#A855F7)'}}>SK</div>
              <div><div className="c-name">Sofia K.</div><div className="c-meta">Restauration · Saint-Denis</div><span className="c-service-tag">Enseigne LED</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">On a fait marquer toute notre flotte de 12 camions. Délais respectés, rendu professionnel. L'équipe a été disponible du devis jusqu'à la pose. Partenaire de confiance.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,#0A3A8C,var(--brand))'}}>TB</div>
              <div><div className="c-name">Thomas B.</div><div className="c-meta">Transport · Bobigny</div><span className="c-service-tag">Marquage flotte</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">Décoration de notre agence avec des vitrophanies sur mesure. Rendu élégant, professionnel et durable. 2F a su conseiller sur les matériaux et les finitions. Très satisfaite.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,#4A14AA,var(--accent))'}}>AL</div>
              <div><div className="c-name">Amira L.</div><div className="c-meta">Immobilier · Saint-Ouen</div><span className="c-service-tag">Stickers & vitro</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">50 polos brodés pour notre équipe chantier, rendu impeccable et livraison rapide. Le logo est parfaitement reproduit, les couleurs fidèles. On repassera commande sans hésitation.</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,#0D2054,#1A4A9C)'}}>PM</div>
              <div><div className="c-name">Pierre M.</div><div className="c-meta">BTP · Montreuil</div><span className="c-service-tag">Textile pro</span></div>
            </div>
          </div>

          <div className="c-card">
            <div className="c-top"><div className="c-stars">★★★★★</div><div className="c-quote-icon">"</div></div>
            <p className="c-text">Roll-ups et kakémonos pour notre congrès annuel, produits et livrés en 48h chrono. Qualité d'impression remarquable, les visuels ressortent vraiment bien. Merci à toute l'équipe 2F !</p>
            <div className="c-divider"></div>
            <div className="c-author">
              <div className="c-avatar" style={{background: 'linear-gradient(135deg,#5A10CC,#9B2FFF)'}}>CR</div>
              <div><div className="c-name">Céline R.</div><div className="c-meta">Événementiel · Paris 19e</div><span className="c-service-tag">Impression</span></div>
            </div>
          </div>

        </div>{/*/track */}
      </div>{/*/viewport */}
      <div className="carousel-controls">
        <button className="c-btn" id="carouselPrev" aria-label="Précédent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div className="c-dots" id="carouselDots"></div>
        <button className="c-btn" id="carouselNext" aria-label="Suivant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  </section>

  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Un projet ?<br />Parlons-en autour d'un café.</h2>
          <p className="cta-card-sub">Passez à l'atelier au 217 av. Jean Jaurès, ou envoyez-nous un plan / une photo — on revient vers vous avec un devis chiffré sous 48h.</p>
        </div>
        <div className="cta-card-btns">
          <a href="tel:0143522424" className="btn-cta-phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg> 01 43 52 24 24</a>
          <Link className="btn-cta-devis" href="/devis">Demander un devis →</Link>
        </div>
      </div>
    </div>
  </section>


    </div>
  );
}
