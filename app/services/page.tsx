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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Marquage <span className="gradient-text">véhicule</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l2-5a2 2 0 0 1 2-1.3h10a2 2 0 0 1 2 1.3l2 5" /><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></svg></div>
            <span className="sfi-text">Covering total, partiel ou magnétique repositionnable</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l8.5 8.5" /><circle cx="4.5" cy="4.5" r="2.5" /><circle cx="4.5" cy="19.5" r="2.5" /><path d="M14.5 9.5L20 4" /><path d="M6 18l14-14" /></svg></div>
            <span className="sfi-text">Semi-covering, lettrage adhésif, adhésif découpe</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3.5v6c0 5-3.4 8.9-8 10.5-4.6-1.6-8-5.5-8-10.5v-6z" /></svg></div>
            <span className="sfi-text">Résistant aux UV, lavages et intempéries</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
            <span className="sfi-text">Pose professionnelle en atelier à Aubervilliers</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Vêtements <span className="gradient-text">personnalisés</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8h1.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg></div>
            <span className="sfi-text">Broderie haute densité pour un rendu premium</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
            <span className="sfi-text">Flocage vinyle ou flex, sérigraphie selon les volumes</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg></div>
            <span className="sfi-text">Large gamme de vêtements professionnels</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg></div>
            <span className="sfi-text">Dès 1 pièce, remise volume à partir de 10 pièces</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Enseignes <span className="gradient-text">lumineuses</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4 2.5 5s1.5 2 1.5 3h4c0-1 .5-2 1.5-3s2.5-2.5 2.5-5a6 6 0 0 0-6-6z" /></svg></div>
            <span className="sfi-text">Enseignes lumineuses LED basse consommation, caissons</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
            <span className="sfi-text">Enseignes non lumineuses (PVC, dibond, aluminium)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg></div>
            <span className="sfi-text">Drapeaux enseigne</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg></div>
            <span className="sfi-text">Pose et installation par nos techniciens</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Adhésifs / <span className="gradient-text">vitrophanies</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l8.5 8.5" /><circle cx="4.5" cy="4.5" r="2.5" /><circle cx="4.5" cy="19.5" r="2.5" /><path d="M14.5 9.5L20 4" /><path d="M6 18l14-14" /></svg></div>
            <span className="sfi-text">Autocollant classique ou découpé à la forme (découpe numérique)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 6-12 6-12z" /></svg></div>
            <span className="sfi-text">Film confidentiel (dépoli, givré)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 21a9 9 0 1 1 9-9c0 1.5-1.5 2-3 2h-2a2 2 0 0 0-2 2c0 1.5-1 3-2 5z" /></svg></div>
            <span className="sfi-text">Film décoratif</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18Z" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /></svg></div>
            <span className="sfi-text">Application intérieure ou extérieure</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Plaques /<br /><span className="gradient-text">panneaux</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg></div>
            <span className="sfi-text">Panneaux grand format</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></div>
            <span className="sfi-text">Panneaux de chantier</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
            <span className="sfi-text">Plaques transparentes ou professionnelles (plexiglas, dibond, alu)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3.5v6c0 5-3.4 8.9-8 10.5-4.6-1.6-8-5.5-8-10.5v-6z" /></svg></div>
            <span className="sfi-text">Impression HD, résistance extérieure</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Logo <span className="gradient-text">lumineux</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><circle cx="17.5" cy="6.5" r="3.5" /><path d="M3 21l7-11 7 11z" /></svg></div>
            <span className="sfi-text">Toute forme, toute taille</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7L12 12l8.7-5" /><path d="M12 22V12" /></svg></div>
            <span className="sfi-text">Version comptoir (présentoir)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18Z" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /></svg></div>
            <span className="sfi-text">Version murale intérieure ou extérieure</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4 2.5 5s1.5 2 1.5 3h4c0-1 .5-2 1.5-3s2.5-2.5 2.5-5a6 6 0 0 0-6-6z" /></svg></div>
            <span className="sfi-text">Rétroéclairage LED, fabrication sur mesure en atelier</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Impressions<br /><span className="gradient-text">tous formats</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg></div>
            <span className="sfi-text">Bâches (chantier, événement, façade)</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg></div>
            <span className="sfi-text">Autocollant mural, étiquettes</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 21a9 9 0 1 1 9-9c0 1.5-1.5 2-3 2h-2a2 2 0 0 0-2 2c0 1.5-1 3-2 5z" /></svg></div>
            <span className="sfi-text">Vinyles décoratifs</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg></div>
            <span className="sfi-text">Roll-up, kakémono, drapeau plume</span>
          </li>
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
        <h2 className="service-title" style={{fontSize: 'clamp(34px,4.2vw,52px)'}}>Petite <span className="gradient-text">papeterie</span></h2>
        <ul className="service-features-icons">
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
            <span className="sfi-text">Flyers A5, A4, formats personnalisés</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="6" y1="9" x2="10" y2="9" /><line x1="6" y1="13" x2="14" y2="13" /></svg></div>
            <span className="sfi-text">Cartes de visite mat, brillant, soft-touch, dorure</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
            <span className="sfi-text">Papier qualité supérieure dès 170g, petites et grandes séries</span>
          </li>
          <li className="sfi-item">
            <div className="sfi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div>
            <span className="sfi-text">Livraison rapide partout en France</span>
          </li>
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
