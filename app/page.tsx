// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps, scrollToSection } from "../lib/interactions";
import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-home">


  <section className="hero">
    <div className="hero-bg-blob hero-bg-blob-1"></div>
    <div className="hero-bg-blob hero-bg-blob-2"></div>
    <div className="container">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-h1"><span className="h1-votre">Votre</span><span className="h1-pub">Publicité</span><span className="h1-line2">au même endroit !</span></h1>
          <div className="hero-ctas" id="heroCtas">
            <Link className="btn-primary-lg" href="/devis">Obtenir mon devis gratuit →</Link>
            <a className="btn-text-link" onClick={(e) => { scrollToSection('realisations') } }>Voir nos réalisations <span>→</span></a>
          </div>
          <div className="hero-reassurance" id="heroReassurance">
            <div className="reassurance-item"><div className="r-check"><svg viewBox="0 0 10 9" fill="none"><path d="M1 4.5L3.8 7.5L9 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>Réponse sous 24h</div>
            <div className="reassurance-item"><div className="r-check"><svg viewBox="0 0 10 9" fill="none"><path d="M1 4.5L3.8 7.5L9 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>Devis 100% gratuit</div>
            <div className="reassurance-item"><div className="r-check"><svg viewBox="0 0 10 9" fill="none"><path d="M1 4.5L3.8 7.5L9 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>Livraison partout en France</div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-composition">
            <img src="/hero-composition.png" alt="2F Publicité — covering, textile, enseignes" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="social-proof reveal">
    <div className="container"><p className="sp-label">Ils nous font confiance</p></div>
    <div className="logos-wrap">
      <div className="logos-track">
        <div className="logo-chip"><img src="/logo carroussel/bouygues construction logo.svg" alt="Bouygues Construction" /></div>
        <div className="logo-chip"><img src="/logo carroussel/OLT LOGO.svg" alt="OLT" /></div>
        <div className="logo-chip"><img src="/logo carroussel/Sixt_Logo.svg" alt="Sixt" /></div>
        <div className="logo-chip"><img src="/logo carroussel/chez apou logo.svg" alt="Chez Apou" /></div>
        <div className="logo-chip"><img src="/logo carroussel/clicar logo .svg" alt="Clicar" /></div>
        <div className="logo-chip"><img src="/logo carroussel/logo GCC.svg" alt="GCC" /></div>
        <div className="logo-chip"><img src="/logo carroussel/logo entra fauché.svg" alt="Entra Fauché" /></div>
        <div className="logo-chip"><img src="/logo carroussel/plaine commune habitat logo.svg" alt="Plaine Commune Habitat" /></div>
        {/*doublon pour boucle infinie */}
        <div className="logo-chip"><img src="/logo carroussel/bouygues construction logo.svg" alt="Bouygues Construction" /></div>
        <div className="logo-chip"><img src="/logo carroussel/OLT LOGO.svg" alt="OLT" /></div>
        <div className="logo-chip"><img src="/logo carroussel/Sixt_Logo.svg" alt="Sixt" /></div>
        <div className="logo-chip"><img src="/logo carroussel/chez apou logo.svg" alt="Chez Apou" /></div>
        <div className="logo-chip"><img src="/logo carroussel/clicar logo .svg" alt="Clicar" /></div>
        <div className="logo-chip"><img src="/logo carroussel/logo GCC.svg" alt="GCC" /></div>
        <div className="logo-chip"><img src="/logo carroussel/logo entra fauché.svg" alt="Entra Fauché" /></div>
        <div className="logo-chip"><img src="/logo carroussel/plaine commune habitat logo.svg" alt="Plaine Commune Habitat" /></div>
      </div>
    </div>
  </section>

  <section className="services" id="services-home">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Nos expertises</div>
        <h2 className="section-title">Une offre complète pour votre visibilité</h2>
        <p className="section-sub">Tout ce dont votre entreprise a besoin, géré par un seul interlocuteur.</p>
      </div>
      <div className="services-grid">
        <article className="svc-card reveal delay-1">
          <img loading="lazy" src="/photos-services/service-vehicules.jpg" alt="Covering véhicule" className="svc-img" />
          <div className="svc-overlay"><div className="svc-top"><span className="svc-tag">Covering & marquage</span><h3 className="svc-img-title">Covering<br />véhicules</h3></div><div className="svc-bottom"><Link className="svc-cta-btn" href="/devis">Devis gratuit →</Link></div></div>
        </article>
        <article className="svc-card reveal delay-2">
          <img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Vêtements pro" className="svc-img" />
          <div className="svc-overlay"><div className="svc-top"><span className="svc-tag">Textile pro</span><h3 className="svc-img-title">Vêtements<br />personnalisés</h3></div><div className="svc-bottom"><Link className="svc-cta-btn" href="/fiches/textile">Voir les produits →</Link></div></div>
        </article>
        <article className="svc-card reveal delay-3">
          <img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes" className="svc-img" />
          <div className="svc-overlay"><div className="svc-top"><span className="svc-tag">Signalétique</span><h3 className="svc-img-title">Enseignes<br />lumineuses</h3></div><div className="svc-bottom"><Link className="svc-cta-btn" href="/fiches/enseignes">Découvrir →</Link></div></div>
        </article>
        <article className="svc-card reveal delay-4">
          <img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impression" className="svc-img" />
          <div className="svc-overlay"><div className="svc-top"><span className="svc-tag">Impression</span><h3 className="svc-img-title">Flyers, affiches<br />&amp; supports print</h3></div><div className="svc-bottom"><Link className="svc-cta-btn" href="/devis">Commander →</Link></div></div>
        </article>
      </div>
      <div style={{textAlign: 'center', marginTop: '28px'}}>
        <Link href="/services" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', textDecoration: 'none', padding: '12px 28px', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: '100px', transition: 'border-color 0.2s,color 0.2s', cursor: 'pointer'}} onMouseOver={(e) => { e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.color='var(--blue)' } } onMouseOut={(e) => { e.currentTarget.style.borderColor='rgba(0,0,0,0.12)';e.currentTarget.style.color='var(--text-main)' } }>Voir tous les services →</Link>
      </div>
    </div>
  </section>

  <section className="why-us">
    <div className="container">
      <div className="section-header reveal"><div className="section-tag">✦ Pourquoi nous choisir</div><h2 className="section-title">Pourquoi 2F Publicité ?</h2></div>
      <div className="stats-row">
        <div className="stat-box reveal delay-1"><span className="stat-num" data-target="500" data-prefix="+">+500</span><div className="stat-name">Clients B2B accompagnés</div><div className="stat-detail">entreprises de toutes tailles</div></div>
        <div className="stat-box reveal delay-2"><span className="stat-num" data-target="25" data-suffix=" ans">25 ans</span><div className="stat-name">D'expertise</div><div className="stat-detail">en communication visuelle</div></div>
        <div className="stat-box reveal delay-3"><span className="stat-num" data-target="24" data-suffix="h">24h</span><div className="stat-name">Délai de réponse</div><div className="stat-detail">pour votre devis personnalisé</div></div>
      </div>
    </div>
  </section>

  <section className="realisations" id="realisations">
    <div className="container">
      <div className="section-header reveal"><div className="section-tag">✦ Portfolio</div><h2 className="section-title">Nos dernières réalisations</h2><p className="section-sub">Ils ont fait confiance à 2F Publicité</p></div>
      <div className="filter-row reveal">
        <button className="ftab active" data-filter="all">Tous</button>
        <button className="ftab" data-filter="vehicules">Véhicules</button>
        <button className="ftab" data-filter="textile">Textile</button>
        <button className="ftab" data-filter="enseignes">Enseignes</button>
        <button className="ftab" data-filter="stickers">Stickers</button>
      </div>
      <div className="gallery" id="gallery">
        <div className="g-item" data-cat="vehicules"><div className="g-bg"><img loading="lazy" src="/photos-realisations/vehicule-semi-covering-1.jpg" alt="Semi covering véhicule" /></div><div className="g-overlay"><span className="g-badge">Semi covering camionnette</span></div></div>
        <div className="g-item" data-cat="enseignes"><div className="g-bg"><img loading="lazy" src="/photos-realisations/enseigne-boitier-plexi-1.jpg" alt="Boîtier plexi lumineux" /></div><div className="g-overlay"><span className="g-badge">Signalétique boîtier plexi</span></div></div>
        <div className="g-item" data-cat="enseignes"><div className="g-bg"><img loading="lazy" src="/photos-realisations/enseigne-pvc-retroeclaire-1.jpg" alt="Enseigne PVC rétroéclairée" /></div><div className="g-overlay"><span className="g-badge">Enseigne PVC rétroéclairée</span></div></div>
        <div className="g-item" data-cat="stickers"><div className="g-bg"><img loading="lazy" src="/photos-realisations/sticker-vitrophanie-1.jpg" alt="Vitrophanie adhésif" /></div><div className="g-overlay"><span className="g-badge">Vitrophanie vitrine</span></div></div>
        <div className="g-item" data-cat="vehicules"><div className="g-bg"><img loading="lazy" src="/photos-realisations/vehicule-adhesif-decoupe-1.jpg" alt="Adhésif découpe véhicule" /></div><div className="g-overlay"><span className="g-badge">Adhésif découpe véhicule</span></div></div>
        <div className="g-item" data-cat="enseignes"><div className="g-bg"><img loading="lazy" src="/photos-realisations/enseigne-drapeau-lumineux-1.jpg" alt="Drapeau lumineux" /></div><div className="g-overlay"><span className="g-badge">Drapeau lumineux</span></div></div>
      </div>
      <div style={{textAlign: 'center', marginTop: '40px'}} className="reveal">
        <Link href="/realisations" style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', background: 'var(--gradient)', color: 'white', fontSize: '15px', fontWeight: '700', borderRadius: '100px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(43,106,239,0.35)', transition: 'transform 0.2s,box-shadow 0.2s'}} onMouseOver={(e) => { e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(43,106,239,0.45)' } } onMouseOut={(e) => { e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 20px rgba(43,106,239,0.35)' } }>
          Voir toutes nos réalisations →
        </Link>
      </div>
    </div>
  </section>

  {/*SECTION AVIS */}
  <section className="avis-section">
    {/*BACKGROUND : 2 rows of scrolling review cards */}
    <div className="avis-bg" aria-hidden="true">
      {/*row 1 → left */}
      <div className="avis-row">
        <div className="avis-row-track fwd">
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Atelier sérieux, le devis est arrivé en 24h et la pose le weekend pour ne pas fermer la boutique."</p><div className="avis-mini-author">Marie C. · Commerce · Pantin</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Covering complet sur nos 4 véhicules. Qualité impeccable, tient depuis 3 ans."</p><div className="avis-mini-author">Julien D. · Artisan · Aubervilliers</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Enseigne lumineuse posée en 48h. Résultat bluffant, les passants s'arrêtent."</p><div className="avis-mini-author">Sonia R. · Restauration · Saint-Denis</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Vêtements brodés pour toute l'équipe livrés en une semaine. Parfait."</p><div className="avis-mini-author">Thomas M. · BTP · Bobigny</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Signalétique intérieure refaite entièrement. Très pros du début à la fin."</p><div className="avis-mini-author">Karim B. · Immobilier · Clichy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Réactivité incroyable. Commande passée le lundi, livrée le jeudi. Merci !"</p><div className="avis-mini-author">Laura M. · Événementiel · Paris</div></div>
          {/*duplicate for seamless loop */}
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Atelier sérieux, le devis est arrivé en 24h et la pose le weekend pour ne pas fermer la boutique."</p><div className="avis-mini-author">Marie C. · Commerce · Pantin</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Covering complet sur nos 4 véhicules. Qualité impeccable, tient depuis 3 ans."</p><div className="avis-mini-author">Julien D. · Artisan · Aubervilliers</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Enseigne lumineuse posée en 48h. Résultat bluffant, les passants s'arrêtent."</p><div className="avis-mini-author">Sonia R. · Restauration · Saint-Denis</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Vêtements brodés pour toute l'équipe livrés en une semaine. Parfait."</p><div className="avis-mini-author">Thomas M. · BTP · Bobigny</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Signalétique intérieure refaite entièrement. Très pros du début à la fin."</p><div className="avis-mini-author">Karim B. · Immobilier · Clichy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Réactivité incroyable. Commande passée le lundi, livrée le jeudi. Merci !"</p><div className="avis-mini-author">Laura M. · Événementiel · Paris</div></div>
        </div>
      </div>
      {/*row 2 ← right (reverse) */}
      <div className="avis-row">
        <div className="avis-row-track rev">
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Un seul interlocuteur du devis à la pose. C'est rare et c'est ce qui fait la différence."</p><div className="avis-mini-author">Nadia F. · Pharmacie · Villepinte</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Caisson lumineux fabriqué sur mesure, résultat exactement comme demandé."</p><div className="avis-mini-author">Rachid S. · Commerce · Montreuil</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"T-shirts brodés et flocés pour nos 30 collaborateurs. Super rendu, délai tenu."</p><div className="avis-mini-author">Claire P. · Association · Saint-Ouen</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Très bonne agence, prix compétitifs et qualité au rendez-vous. Je recommande."</p><div className="avis-mini-author">Mehdi T. · Transport · Drancy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Covering van livré sans défaut. L'équipe de pose est propre et efficace."</p><div className="avis-mini-author">Antoine L. · BTP · Bondy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Totems et roll-ups pour notre salon. Rendu pro, monté en 20 min. Top !"</p><div className="avis-mini-author">Sophie V. · Santé · Pantin</div></div>
          {/*duplicate */}
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Un seul interlocuteur du devis à la pose. C'est rare et c'est ce qui fait la différence."</p><div className="avis-mini-author">Nadia F. · Pharmacie · Villepinte</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Caisson lumineux fabriqué sur mesure, résultat exactement comme demandé."</p><div className="avis-mini-author">Rachid S. · Commerce · Montreuil</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"T-shirts brodés et flocés pour nos 30 collaborateurs. Super rendu, délai tenu."</p><div className="avis-mini-author">Claire P. · Association · Saint-Ouen</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Très bonne agence, prix compétitifs et qualité au rendez-vous. Je recommande."</p><div className="avis-mini-author">Mehdi T. · Transport · Drancy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Covering van livré sans défaut. L'équipe de pose est propre et efficace."</p><div className="avis-mini-author">Antoine L. · BTP · Bondy</div></div>
          <div className="avis-mini-card"><div className="avis-mini-stars">★★★★★</div><p className="avis-mini-text">"Totems et roll-ups pour notre salon. Rendu pro, monté en 20 min. Top !"</p><div className="avis-mini-author">Sophie V. · Santé · Pantin</div></div>
        </div>
      </div>
    </div>
    {/*OVERLAY */}
    <div className="avis-overlay"></div>
    {/*FOREGROUND */}
    <div className="avis-fg">
      <div className="section-tag">✦ Ils nous font confiance</div>
      <h2>Des retours concrets<br />de clients du quartier.</h2>
      <div className="avis-hero">
        <div className="avis-logo-wrap">
          <img loading="lazy" src="/logo-2f-3d.png" alt="2F Publicité" />
        </div>
        <div className="avis-score-block">
          <span className="avis-score-num">4,9/5</span>
          <span className="avis-score-stars">★★★★★</span>
          <span className="avis-score-label">Google</span>
        </div>
      </div>
      <p className="avis-sub-note">Note moyenne sur <strong>80+ avis</strong> clients vérifiés</p>
    </div>
  </section>

  <section className="cta-section">
    <div className="container"><div className="cta-inner">
      <h2 className="cta-title reveal">Obtenez votre devis gratuit<br />en 3 minutes</h2>
      <Link className="btn-white reveal delay-2" href="/devis">Démarrer mon devis gratuit →</Link>
    </div></div>
  </section>

  <section className="process">
    <div className="container">
      <div className="section-header reveal"><div className="section-tag">✦ Comment ça marche</div><h2 className="section-title">Simple, rapide, efficace</h2><p className="section-sub">De votre demande à la livraison, un processus pensé pour vous.</p></div>
      <div className="process-row">
        <div className="process-line"></div>
        <div className="p-step reveal delay-1"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></div><span className="p-num">1</span></div><h3 className="p-title">Remplissez le formulaire</h3><p className="p-desc">Choisissez votre prestation et décrivez votre besoin en quelques clics.</p></div>
        <div className="p-step reveal delay-2"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div><span className="p-num">2</span></div><h3 className="p-title">On vous contacte</h3><p className="p-desc">Un expert 2F vous rappelle sous 24h pour affiner votre projet.</p></div>
        <div className="p-step reveal delay-3"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg></div><span className="p-num">3</span></div><h3 className="p-title">Recevez votre devis</h3><p className="p-desc">Devis détaillé et personnalisé, sans surprise ni frais cachés.</p></div>
        <div className="p-step reveal delay-4"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><span className="p-num">4</span></div><h3 className="p-title">On s'occupe de tout</h3><p className="p-desc">Production, finitions et livraison gérées de A à Z.</p></div>
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

  {/*── NOUS TROUVER ── */}
  <section style={{background: 'var(--dark)', padding: '100px 0 0'}}>
    <div className="container">
      {/*Header */}
      <div className="reveal" style={{textAlign: 'center', marginBottom: '64px'}}>
        <div className="section-tag" style={{color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)'}}>✦ Nous trouver</div>
        <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: '400', color: '#fff', marginTop: '12px', letterSpacing: '-0.03em', textTransform: 'uppercase'}}>Venez nous voir à l'atelier.</h2>
        <p style={{color: 'rgba(255,255,255,0.45)', fontSize: '16px', marginTop: '10px'}}>Showroom ouvert du lundi au vendredi — devis sur place, sans rendez-vous.</p>
      </div>
      {/*Grid carte + infos */}
      <div className="reveal" style={{display: 'grid', gridTemplateColumns: '1fr 420px', gap: '0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.45)'}}>
        {/*Carte Google Maps */}
        <div style={{minHeight: '440px', position: 'relative'}}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.0!2d2.3706!3d48.9168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d8a6c4e9b0f%3A0x0!2s217+Avenue+Jean+Jaur%C3%A8s%2C+93300+Aubervilliers!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            width="100%" height="100%" style={{border: '0', display: 'block', minHeight: '440px', filter: 'saturate(0.8) contrast(1.05)'}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        {/*Infos pratiques */}
        <div style={{background: '#13152b', padding: '48px 44px', display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center'}}>
          {/*Adresse */}
          <div style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
            <div style={{width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(43,106,239,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', color: '#fff', fontSize: '15px', marginBottom: '4px', textTransform: 'uppercase'}}>Adresse</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: '1.6'}}>217 avenue Jean Jaurès<br />93300 Aubervilliers</div>
            </div>
          </div>
          {/*Horaires */}
          <div style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
            <div style={{width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(43,106,239,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', color: '#fff', fontSize: '15px', marginBottom: '4px', textTransform: 'uppercase'}}>Horaires</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: '1.7'}}>Lun – Ven &nbsp;·&nbsp; 9h00 – 18h00<br /><span style={{color: 'rgba(255,255,255,0.3)'}}>Fermé le week-end</span></div>
            </div>
          </div>
          {/*Accès */}
          <div style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
            <div style={{width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(43,106,239,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            </div>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', color: '#fff', fontSize: '15px', marginBottom: '4px', textTransform: 'uppercase'}}>Accès</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: '1.7'}}>Métro ligne 12 — <strong style={{color: 'rgba(255,255,255,0.75)'}}>Front Populaire</strong><br />Bus 65, 239 · Parking disponible</div>
            </div>
          </div>
          {/*CTA itinéraire */}
          <a href="https://maps.google.com/?q=217+avenue+Jean+Jaurès+93300+Aubervilliers" target="_blank" rel="noopener" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--gradient)', color: '#fff', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', padding: '14px 24px', borderRadius: '12px', textDecoration: 'none', marginTop: '4px', transition: 'opacity 0.2s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.opacity='0.85' } } onMouseOut={(e) => { e.currentTarget.style.opacity='1' } }>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
            Obtenir l'itinéraire
          </a>
        </div>
      </div>
    </div>
    {/*Transition vers le footer */}
    <div style={{height: '80px', background: 'linear-gradient(to bottom,var(--dark),var(--dark))', marginTop: '0'}}></div>
  </section>


    </div>
  );
}
