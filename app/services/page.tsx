// @ts-nocheck
"use client";

import Link from "next/link";
import { closeModal, initGlobalKeydown, initRevealAndCountUps, initSvcTabs } from "../../lib/interactions";
import { useEffect } from "react";

export default function ServicesPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    initSvcTabs()
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-services">

  <section className="page-hero-svc">
    <div className="container">
      <div className="page-tag">✦ Nos expertises</div>
      <h1 className="page-title">Une offre complète pour<br /><span className="gradient-text">votre visibilité</span></h1>
      <p className="page-sub">Du covering véhicule à l'enseigne lumineuse — tout ce dont votre entreprise a besoin, géré par un seul interlocuteur.</p>
    </div>
  </section>

  {/*FILTER BAR — fixed, visible seulement dans la zone services */}
  {/*FILTER BAR */}
  <div className="svc-filter-bar" id="svcFilterBar">
    <div className="container">
      <div className="svc-filters">
        <button className="svc-tab active" data-target="marquage-vehicule">Marquage véhicule</button>
        <button className="svc-tab" data-target="vetements">Vêtements personnalisés</button>
        <button className="svc-tab" data-target="enseignes">Enseignes</button>
        <button className="svc-tab" data-target="vitrophanies">Vitrophanies</button>
        <button className="svc-tab" data-target="plaques-panneaux">Plaques & Panneaux</button>
        <button className="svc-tab" data-target="logo-lumineux">Logo lumineux</button>
        <button className="svc-tab" data-target="impressions">Impressions</button>
        <button className="svc-tab" data-target="petite-papeterie">Petite papeterie</button>
      </div>
    </div>
  </div>

  {/*1. MARQUAGE VÉHICULE */}
  <section className="service-section svc-alt" id="marquage-vehicule">
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-services/service-vehicules.jpg" alt="Marquage véhicule" /></div>
      <div className="reveal">
        <span className="service-tag">Marquage véhicule</span>
        <h2 className="service-title">Votre véhicule devient<br /><span className="gradient-text">votre meilleure pub</span></h2>
        <p className="service-desc">Du simple logo adhésif au covering total — nous habillons vos véhicules pour qu'ils travaillent pour vous 24h/24 partout en France.</p>
        <ul className="service-features">
          <li>Covering total ou partiel</li>
          <li>Semi-covering, lettrage adhésif, adhésif découpe</li>
          <li>Magnétiques repositionnables pour flottes partagées</li>
          <li>Résistant aux UV, lavages et intempéries</li>
          <li>Pose professionnelle en atelier à Aubervilliers</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/covering">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*2. VÊTEMENTS PERSONNALISÉS */}
  <section className="service-section" id="vetements" style={{background: 'white'}}>
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Vêtements personnalisés" /></div>
      <div className="reveal">
        <span className="service-tag">Vêtements personnalisés</span>
        <h2 className="service-title">Habillez votre équipe à<br /><span className="gradient-text">votre image</span></h2>
        <p className="service-desc">Polos, t-shirts, vestes, casquettes, tabliers — personnalisés par broderie, flocage ou sérigraphie. Fabrication dans nos ateliers à Aubervilliers.</p>
        <ul className="service-features">
          <li>Broderie haute densité pour un rendu premium</li>
          <li>Flocage vinyle ou flex</li>
          <li>Sérigraphie selon les volumes</li>
          <li>Large gamme de vêtements professionnels</li>
          <li>Dès 1 pièce, remise volume à partir de 10 pièces</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/textile">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*3. ENSEIGNES */}
  <section className="service-section svc-alt" id="enseignes">
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes" /></div>
      <div className="reveal">
        <span className="service-tag">Enseignes</span>
        <h2 className="service-title">Enseignes lumineuses,<br /><span className="gradient-text">non lumineuses & drapeaux</span></h2>
        <p className="service-desc">Enseignes lumineuses LED, enseignes non lumineuses, drapeaux enseigne — nous concevons, fabriquons et installons tous types de signalétiques de façade.</p>
        <ul className="service-features">
          <li>Enseignes lumineuses LED basse consommation</li>
          <li>Enseignes non lumineuses (PVC, dibond, aluminium)</li>
          <li>Drapeaux enseigne</li>
          <li>Caissons lumineux simples ou doubles faces</li>
          <li>Pose et installation par nos techniciens</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/enseignes">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*4. VITROPHANIES */}
  <section className="service-section" id="vitrophanies" style={{background: 'white'}}>
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-realisations/sticker-vitrophanie-1.jpg" alt="Vitrophanies" /></div>
      <div className="reveal">
        <span className="service-tag">Vitrophanies</span>
        <h2 className="service-title">Adhésifs & films<br /><span className="gradient-text">sur toutes surfaces</span></h2>
        <p className="service-desc">Autocollant classique ou découpé à la forme, film confidentiel, film décoratif, découpe adhésive — nous habillons vitrines, baies vitrées et cloisons.</p>
        <ul className="service-features">
          <li>Autocollant classique ou découpé à la forme</li>
          <li>Film confidentiel (dépoli, givre)</li>
          <li>Film décoratif</li>
          <li>Découpe adhésive numérique</li>
          <li>Application intérieure ou extérieure</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/vitrophanies">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*5. PLAQUES & PANNEAUX */}
  <section className="service-section svc-alt" id="plaques-panneaux">
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal">
        <img src="/photos-services/serivce-Plaques & Panneaux.jpeg" alt="Plaques et panneaux professionnels" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: 'var(--radius-lg)'}} />
      </div>
      <div className="reveal">
        <span className="service-tag">Plaques & Panneaux</span>
        <h2 className="service-title">Signalétique professionnelle<br /><span className="gradient-text">tous supports</span></h2>
        <p className="service-desc">Panneaux grand format, panneaux de chantier, plaques transparentes, plaques professionnelles — fabriqués en atelier pour une signalétique durable et impactante.</p>
        <ul className="service-features">
          <li>Panneaux grand format</li>
          <li>Panneaux de chantier</li>
          <li>Plaques transparentes (plexiglas, PVC)</li>
          <li>Plaques professionnelles (dibond, aluminium)</li>
          <li>Impression HD, résistance extérieure</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/plaques-panneaux">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*6. LOGO LUMINEUX */}
  <section className="service-section" id="logo-lumineux" style={{background: 'white'}}>
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal">
        <img src="/photos-services/service-logo-lumineux.png" alt="Logo lumineux en relief" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 70%', display: 'block', borderRadius: 'var(--radius-lg)'}} />
      </div>
      <div className="reveal">
        <span className="service-tag">Logo lumineux</span>
        <h2 className="service-title">Votre logo en relief<br /><span className="gradient-text">lumineux & impactant</span></h2>
        <p className="service-desc">Logo lumineux en toute forme — pour comptoir, mural, intérieur ou extérieur. Un support de communication premium qui valorise votre marque en toutes circonstances.</p>
        <ul className="service-features">
          <li>Toute forme, toute taille</li>
          <li>Version comptoir (présentoir)</li>
          <li>Version murale intérieure ou extérieure</li>
          <li>Rétroéclairage LED basse consommation</li>
          <li>Fabrication sur mesure en atelier</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/logo-lumineux">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*7. IMPRESSIONS TOUS FORMATS */}
  <section className="service-section svc-alt" id="impressions">
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impressions tous formats" style={{objectPosition: 'center 78%'}} /></div>
      <div className="reveal">
        <span className="service-tag">Impressions tous formats</span>
        <h2 className="service-title">Bâches, autocollants,<br /><span className="gradient-text">roll-ups & plus</span></h2>
        <p className="service-desc">Impression numérique tous formats — du petit sticker à la grande bâche. Production dans notre atelier à Aubervilliers, qualité HD sur tous supports.</p>
        <ul className="service-features">
          <li>Bâches (chantier, événement, façade)</li>
          <li>Autocollant mural</li>
          <li>Étiquettes</li>
          <li>Vinyles décoratifs</li>
          <li>Roll-up, kakémono, drapeau plume</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/impression">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
  </section>

  {/*8. PETITE PAPETERIE */}
  <section className="service-section" id="petite-papeterie" style={{background: 'white'}}>
    <div className="container"><div className="service-inner">
      <div className="service-img-wrap reveal"><img loading="lazy" src="/photos-services/service-flyers-imprimes.jpg" alt="Petite papeterie" /></div>
      <div className="reveal">
        <span className="service-tag">Petite papeterie</span>
        <h2 className="service-title">Flyers & cartes de visite<br /><span className="gradient-text">qui marquent les esprits</span></h2>
        <p className="service-desc">Flyers, cartes de visite — imprimés en interne à Aubervilliers. Finitions premium, petites et grandes séries, livraison rapide.</p>
        <ul className="service-features">
          <li>Flyers A5, A4, formats personnalisés</li>
          <li>Cartes de visite mat, brillant, soft-touch, dorure</li>
          <li>Papier qualité supérieure dès 170g</li>
          <li>Petites et grandes séries</li>
          <li>Livraison rapide partout en France</li>
        </ul>
        <div className="svc-btn-group">
          <Link className="btn-gradient" href="/devis">Demander un devis →</Link>
          <Link className="btn-outline-svc" href="/fiches/flyers">Voir la fiche complète</Link>
        </div>
      </div>
    </div></div>
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

  {/*══ MODALES FICHES PRODUIT ══ */}
  <div className="modal-overlay" id="modal-covering" onClick={(e) => { closeModal(e, e.currentTarget) } }>
    <div className="modal-box">
      <button className="modal-close" onClick={(e) => { closeModal(null,'modal-covering') } }>✕</button>
      <span className="modal-service-tag">Covering & marquage</span>
      <h2 className="modal-title">Covering véhicule</h2>
      <p className="modal-desc">Du lettrage adhésif simple au covering total, nous transformons vos véhicules en supports publicitaires mobiles qui travaillent pour vous 24h/24, partout où vous roulez.</p>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Tarifs indicatifs</div>
      <div className="modal-info-grid">
        <div className="modal-info-item"><div className="modal-info-label">Lettrage simple</div><div className="modal-info-val">À partir de 150€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Covering partiel</div><div className="modal-info-val">400€ – 900€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Covering total</div><div className="modal-info-val">900€ – 2 800€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Délai de pose</div><div className="modal-info-val">3 à 7 jours ouvrés</div></div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Ce qui est inclus</div>
      <ul className="modal-features">
        <li>Prise de gabarit & BAT couleur avant validation</li>
        <li>Vinyles 3M ou Avery certifiés, résistants UV & lavage HP</li>
        <li>Pose professionnelle par nos techniciens certifiés</li>
        <li>Garantie 5 ans sur les matériaux et la pose</li>
        <li>Démontage possible sans endommager la carrosserie</li>
      </ul>
      <div className="modal-footer">
        <Link className="btn-gradient" href="/devis" onClick={(e) => { closeModal(null,'modal-covering') } }>Demander un devis gratuit →</Link>
        <a href="tel:0143522424" style={{fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>01 43 52 24 24</a>
      </div>
    </div>
  </div>

  <div className="modal-overlay" id="modal-textile" onClick={(e) => { closeModal(e, e.currentTarget) } }>
    <div className="modal-box">
      <button className="modal-close" onClick={(e) => { closeModal(null,'modal-textile') } }>✕</button>
      <span className="modal-service-tag">Textile pro</span>
      <h2 className="modal-title">Vêtements personnalisés</h2>
      <p className="modal-desc">Polos, t-shirts, vestes, casquettes, tabliers, sacs — personnalisés à votre image par broderie ou flocage, dès 1 pièce. Idéal pour habiller vos équipes et renforcer votre image de marque.</p>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Tarifs indicatifs</div>
      <div className="modal-info-grid">
        <div className="modal-info-item"><div className="modal-info-label">Flocage vinyle</div><div className="modal-info-val">Dès 12€ HT/pièce</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Broderie</div><div className="modal-info-val">Dès 18€ HT/pièce</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Sérigraphie</div><div className="modal-info-val">À partir de 20 pièces</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Délai de livraison</div><div className="modal-info-val">5 à 10 jours ouvrés</div></div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Ce qui est inclus</div>
      <ul className="modal-features">
        <li>Vectorisation de votre logo si nécessaire (offerte)</li>
        <li>BAT numérique avant lancement de la production</li>
        <li>Large choix de marques : B&C, Stanley/Stella, Gildan…</li>
        <li>Remise dégressive à partir de 10 pièces</li>
        <li>Livraison partout en France, emballage individuel disponible</li>
      </ul>
      <div className="modal-footer">
        <Link className="btn-gradient" href="/devis" onClick={(e) => { closeModal(null,'modal-textile') } }>Demander un devis gratuit →</Link>
        <a href="tel:0143522424" style={{fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>01 43 52 24 24</a>
      </div>
    </div>
  </div>

  <div className="modal-overlay" id="modal-enseignes" onClick={(e) => { closeModal(e, e.currentTarget) } }>
    <div className="modal-box">
      <button className="modal-close" onClick={(e) => { closeModal(null,'modal-enseignes') } }>✕</button>
      <span className="modal-service-tag">Signalétique</span>
      <h2 className="modal-title">Enseignes & signalétique</h2>
      <p className="modal-desc">Enseignes LED, caissons lumineux, lettres boîtier, totems, panneaux directionnels — nous concevons, fabriquons et installons votre signalétique pour renforcer votre visibilité.</p>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Tarifs indicatifs</div>
      <div className="modal-info-grid">
        <div className="modal-info-item"><div className="modal-info-label">Enseigne simple</div><div className="modal-info-val">À partir de 300€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Caisson lumineux</div><div className="modal-info-val">800€ – 3 500€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Lettres LED relief</div><div className="modal-info-val">1 200€ – 6 000€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Délai de pose</div><div className="modal-info-val">2 à 4 semaines</div></div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Ce qui est inclus</div>
      <ul className="modal-features">
        <li>Étude technique et plan de pose offerts</li>
        <li>Accompagnement pour la déclaration préalable de travaux</li>
        <li>Éclairage LED basse consommation (économies jusqu'à 70%)</li>
        <li>Installation par techniciens habilités travaux en hauteur</li>
        <li>Garantie 2 ans pièces & main-d'œuvre</li>
      </ul>
      <div className="modal-footer">
        <Link className="btn-gradient" href="/devis" onClick={(e) => { closeModal(null,'modal-enseignes') } }>Demander un devis gratuit →</Link>
        <a href="tel:0143522424" style={{fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>01 43 52 24 24</a>
      </div>
    </div>
  </div>

  <div className="modal-overlay" id="modal-impression" onClick={(e) => { closeModal(e, e.currentTarget) } }>
    <div className="modal-box">
      <button className="modal-close" onClick={(e) => { closeModal(null,'modal-impression') } }>✕</button>
      <span className="modal-service-tag">Impression</span>
      <h2 className="modal-title">Impression & supports print</h2>
      <p className="modal-desc">Flyers, affiches, cartes de visite, bâches, roll-ups, kakémonos — tous vos supports print conçus et imprimés en interne, avec des finitions premium et des délais express.</p>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Tarifs indicatifs</div>
      <div className="modal-info-grid">
        <div className="modal-info-item"><div className="modal-info-label">500 flyers A5</div><div className="modal-info-val">À partir de 29€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">250 cartes de visite</div><div className="modal-info-val">À partir de 39€ HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Bâche grand format</div><div className="modal-info-val">À partir de 25€/m² HT</div></div>
        <div className="modal-info-item"><div className="modal-info-label">Délai express</div><div className="modal-info-val">24 à 48h disponible</div></div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-section-title">Ce qui est inclus</div>
      <ul className="modal-features">
        <li>Relecture et contrôle technique de vos fichiers (offerts)</li>
        <li>Papiers certifiés : mat, glacé, recyclé, offset</li>
        <li>Finitions : pelliculage soft-touch, vernis sélectif, dorure à chaud</li>
        <li>Découpe spéciale (die-cut) sur devis</li>
        <li>Livraison express nationale 24-48h disponible</li>
      </ul>
      <div className="modal-footer">
        <Link className="btn-gradient" href="/devis" onClick={(e) => { closeModal(null,'modal-impression') } }>Demander un devis gratuit →</Link>
        <a href="tel:0143522424" style={{fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px'}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>01 43 52 24 24</a>
      </div>
    </div>
  </div>


    </div>
  );
}
