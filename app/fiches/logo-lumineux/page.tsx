// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps } from "../../../lib/interactions";
import { useEffect } from "react";

export default function FicheLogoLumineuxPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-logo-lumineux">


  <div className="fiche-breadcrumb">
    <div className="container" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Link href="/">Accueil</Link>
      <span className="sep">›</span>
      <Link href="/services">Nos services</Link>
      <span className="sep">›</span>
      <span className="current">Logo lumineux</span>
    </div>
  </div>

  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Comptoir · Mural · Intérieur & extérieur</div>
          <h1>Votre logo en relief<br /><span className="gradient-text">lumineux & impactant</span></h1>
          <p className="fiche-hero-desc">Logo lumineux en toute forme — pour comptoir, mural, intérieur ou extérieur. Un support de communication premium qui valorise votre marque en toutes circonstances.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>Toute forme</strong><span>sur mesure</span></div>
            <div><strong>LED</strong><span>basse consommation</span></div>
            <div><strong>48h</strong><span>délai de devis</span></div>
            <div><strong>Atelier</strong><span>Aubervilliers</span></div>
          </div>
        </div>
        <div className="fiche-visual reveal" style={{background: 'linear-gradient(160deg,#0a1628,#1a3a7a,#0d2b6e)'}}>
          <img loading="lazy" src="/photos-services/service-logo-lumineux.png" alt="Logo lumineux 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 70%', opacity: '0.85'}} onError={(e) => { e.currentTarget.style.display='none' } } />
          <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(to bottom,transparent 50%,rgba(10,22,40,0.7))', zIndex: '1'}}></div>
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: '5', whiteSpace: 'nowrap'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase'}}>Rétroéclairage LED</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*CE QUE NOUS PROPOSONS */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Nos prestations</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Deux versions, toute forme</h2>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px'}} className="reveal">
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Version comptoir</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Présentoir posé, idéal pour accueil, boutique ou salon professionnel.</p>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Version murale</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Fixation intérieure ou extérieure, pour façade, hall ou vitrine.</p>
        </div>
      </div>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '20px'}} className="reveal">
        <div style={{flex: '1', minWidth: '220px', padding: '18px 22px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(43,106,239,0.12)', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" /><path d="M9 21h6" /></svg></div>
          <div><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '2px'}}>Rétroéclairage LED</div><div style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Basse consommation, longue durée de vie</div></div>
        </div>
        <div style={{flex: '1', minWidth: '220px', padding: '18px 22px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(43,106,239,0.12)', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
          <div><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '2px'}}>Fabrication sur mesure</div><div style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Toute forme, toute taille, en atelier</div></div>
        </div>
      </div>
      <div style={{marginTop: '24px', padding: '18px 28px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarifs sur devis selon taille, forme et version.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*PROCESSUS */}
  <section className="process">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Comment ça marche</div>
        <h2 className="section-title">De l'idée à l'installation</h2>
        <p className="section-sub">Conception, fabrication, pose — on gère tout.</p>
      </div>
      <div className="process-row">
        <div className="process-line"></div>
        <div className="p-step reveal delay-1"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div><span className="p-num">1</span></div><h3 className="p-title">Envoyez votre logo</h3><p className="p-desc">Fichier vectoriel de préférence — on étudie la faisabilité du relief lumineux.</p></div>
        <div className="p-step reveal delay-2"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div><span className="p-num">2</span></div><h3 className="p-title">Validation du BAT</h3><p className="p-desc">Rendu 3D et BAT envoyés avant toute mise en production.</p></div>
        <div className="p-step reveal delay-3"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div><span className="p-num">3</span></div><h3 className="p-title">Fabrication en atelier</h3><p className="p-desc">Découpe du relief et intégration LED dans notre atelier à Aubervilliers.</p></div>
        <div className="p-step reveal delay-4"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 8h1m4 0h1M9 12h1m4 0h1M9 16h1m4 0h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" /></svg></div><span className="p-num">4</span></div><h3 className="p-title">Livraison ou pose</h3><p className="p-desc">Retrait à l'atelier ou pose par nos techniciens.</p></div>
      </div>
    </div>
  </section>

  {/*SERVICES LIÉS */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '560px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Autres prestations</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Complétez votre communication</h2>
      </div>
      <div className="fiche-related-grid reveal">
        <div className="fiche-related-card" href="/fiches/enseignes">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Enseignes lumineuses</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Boîtes lumineuses, lettres découpées, totems.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/plaques-panneaux">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/serivce-Plaques & Panneaux.jpeg" alt="Plaques & Panneaux" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Plaques & Panneaux</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Panneaux grand format, plaques dibond et aluminium.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/textile">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Textile" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Textile pro</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Vêtements personnalisés</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Broderie, flocage, sérigraphie.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*CTA FINAL */}
  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Un projet de logo lumineux ?<br />Parlons-en autour d'un café.</h2>
          <p className="cta-card-sub">Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers — devis chiffré sous 48h.</p>
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
