// @ts-nocheck
"use client";

import Link from "next/link";
import { impScrollTo, initGlobalKeydown, initImpNavBarScrollSpy, initRevealAndCountUps, setImpQty, toggleFaq } from "../../../lib/interactions";
import { useEffect } from "react";

export default function FicheImpressionPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    const cleanupNav = initImpNavBarScrollSpy(['imp-petit','imp-stickers','imp-grand']);
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
            cleanupNav();
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-impression">


  {/*Breadcrumb */}
  <div className="fiche-breadcrumb">
    <div className="container" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Link href="/">Accueil</Link>
      <span className="sep">›</span>
      <Link href="/services">Nos services</Link>
      <span className="sep">›</span>
      <span className="current">Impression & Autocollants</span>
    </div>
  </div>

  {/*HERO */}
  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Petit format · Stickers & Étiquettes · Grand format</div>
          <h1>Impression numérique<br /><span className="gradient-text">très haute qualité</span></h1>
          <p className="fiche-hero-desc">Du petit format au grand format jusqu'à 1m58 de large — impression HD sur papier, adhésif, bâche chantier, micro-perforé et plus. Production dans notre atelier à Aubervilliers.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
            <a className="btn-outline-svc" onClick={(e) => { document.getElementById('imp-petit').scrollIntoView({behavior:'smooth',block:'start'}) } }>Voir les formats →</a>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>Jusqu'à</strong><span>1m58 de large</span></div>
            <div><strong>HD</strong><span>qualité supérieure</span></div>
            <div><strong>48h</strong><span>délai de devis</span></div>
            <div><strong>Atelier</strong><span>Aubervilliers</span></div>
          </div>
        </div>
        <div className="fiche-visual reveal" style={{background: 'linear-gradient(160deg,#0a1628,#1a3a7a,#0d2b6e)'}}>
          <img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impression 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 78%', opacity: '0.85'}} onError={(e) => { e.currentTarget.style.display='none' } } />
          <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(to bottom,transparent 50%,rgba(10,22,40,0.7))', zIndex: '1'}}></div>
          <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '12px', zIndex: '5'}}>
            <span style={{fontSize: '12px', fontWeight: '600', color: 'white'}}>Impression HD en atelier</span>
          </div>
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: '5', whiteSpace: 'nowrap'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase'}}>Petit format · Stickers · Grand format · Roll-up · Drapeau plume</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*BANDEAU AVANTAGES */}
  <div style={{background: 'var(--gray-light)', padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.06)'}}>
    <div className="container">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center'}} className="reveal">
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Impression HD</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Couleurs vives, rendu net, qualité supérieure</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Grand format</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Jusqu'à 1m58 de large, longueur indéfinie</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Multi-supports</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Papier, adhésif, bâche, micro-perforé…</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Découpe numérique</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Toutes formes, précision au millimètre</div>
        </div>
      </div>
    </div>
  </div>

  {/*── BARRE NAVIGATION PRODUITS ── */}
  <div id="impNavBar" style={{background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'fixed', top: '72px', left: '0', right: '0', zIndex: '200', opacity: '0', transform: 'translateY(-8px)', pointerEvents: 'none', transition: 'opacity .3s,transform .3s,box-shadow .3s'}}>
    <div className="container" style={{display: 'flex', gap: '4px', overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none', justifyContent: 'center'}}>
      <button className="imp-nav-btn active" onClick={(e) => { impScrollTo('imp-petit') } }>Petit format</button>
      <button className="imp-nav-btn" onClick={(e) => { impScrollTo('imp-stickers') } }>Stickers & Étiquettes</button>
      <button className="imp-nav-btn" onClick={(e) => { impScrollTo('imp-grand') } }>Grand format</button>
    </div>
  </div>

  {/*── PETIT FORMAT ── */}
  <section id="imp-petit" style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Petit format</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Impression numérique<br />petit format</h2>
        <p style={{marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Impression de haute qualité sur nos machines numériques — pour tous vos supports de format standard. Quantités minimales recommandées, rendu premium dès la 1ère pièce.</p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginBottom: '32px'}} className="reveal">
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Papier qualité supérieure</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Couché mat ou brillant, grammages variés. Rendu des couleurs exceptionnel, net et précis.</p>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Vinyle adhésif</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Impression sur vinyle adhésif repositionnable ou permanent — idéal pour signalétiques intérieures, décorations murales et habillages.</p>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Découpe numérique</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Traceur de découpe au millimètre — toutes formes, contours personnalisés, impression + découpe en une seule étape.</p>
        </div>
      </div>
      <div style={{padding: '20px 32px', background: 'white', borderRadius: '16px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarifs sur devis selon format, support et quantité.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*── GRAND FORMAT (déplacé après stickers via nav) ── */}
  <section id="imp-grand" style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Grand format</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Jusqu'à 1m58 de large,<br />longueur indéfinie</h2>
        <p style={{marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Impression grand format très haute qualité — affiches, bâches chantier, banderoles, roll-ups, micro-perforé, toile. Sur mesure, tous supports certifiés norme M1 pour les ERP.</p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px'}} className="reveal">
        <div style={{background: 'white', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.07)'}}>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Affiches & posters</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>A3, A2, A1, 40×60 cm et sur mesure jusqu'à 1m58 de large. Papier couché mat ou brillant haute qualité, norme M1.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Jusqu'à 1m58</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Norme M1</span></div>
        </div>
        <div style={{background: 'white', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.07)'}}>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Bâches chantier & banderoles</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Bâches grand format avec œillets, résistantes aux intempéries. Idéales pour les chantiers, événements et façades.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Sur mesure</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Avec œillets</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Norme M1</span></div>
        </div>
        <div style={{background: 'white', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.07)'}}>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Micro-perforé</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Impression sur film micro-perforé — visibilité de l'extérieur, transparence de l'intérieur. Idéal pour vitrines et véhicules.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Vitrine</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Véhicule</span></div>
        </div>
        <div style={{background: 'white', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.07)'}}>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Roll-up & Kakémonos</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Supports d'exposition pour salons, congrès et events. Formats 85×200 cm et 100×200 cm, norme M1, pieds inclus.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>85×200 cm</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>100×200 cm</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Norme M1</span></div>
        </div>
        <div style={{background: 'white', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.07)'}}>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Drapeau plume</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Drapeau de forme plume ou oriflamme, idéal pour attirer l'attention en extérieur. Impression HD sur tissu polyester, mât et base inclus.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Extérieur</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Mât inclus</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Tissu polyester</span></div>
        </div>
      </div>
      <div style={{marginTop: '24px', padding: '20px 32px', background: 'white', borderRadius: '16px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarifs au m² — devis sous 48h selon dimensions et support.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*── STICKERS & ÉTIQUETTES ── */}
  <section id="imp-stickers" style={{padding: '96px 0', background: 'white'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Stickers & Étiquettes</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Choisissez votre quantité<br />pour voir les prix</h2>
        <p style={{marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Format de base : 6×6 cm (rond) ou 10×5 cm (rectangulaire). Découpe numérique au millimètre — toutes formes possibles, contour du logo. Sur devis pour format personnalisé.</p>
      </div>

      <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px'}} id="impQtyBtns">
        <button className="imp-qty-btn" data-qty="50"  onClick={(e) => { setImpQty(50) } }>× 50</button>
        <button className="imp-qty-btn" data-qty="100" onClick={(e) => { setImpQty(100) } }>× 100</button>
        <button className="imp-qty-btn" data-qty="500" onClick={(e) => { setImpQty(500) } }>× 500</button>
        <button className="imp-qty-btn" data-qty="1000" onClick={(e) => { setImpQty(1000) } }>× 1 000</button>
      </div>

      <div id="imp-qty-hint" style={{padding: '32px', background: 'var(--gray-light)', borderRadius: '16px', textAlign: 'center', border: '2px dashed rgba(43,106,239,0.15)'}}>
        <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--text-main)', marginBottom: '6px', textTransform: 'uppercase'}}>Sélectionnez une quantité</div>
        <div style={{fontSize: '14px', color: 'var(--text-secondary)'}}>Les prix des 4 finitions s'afficheront ici.</div>
      </div>

      <div id="imp-techniques-grid" style={{display: 'none', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px'}}>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{padding: '28px 28px 20px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '19px', fontWeight: '400', marginBottom: '4px', textTransform: 'uppercase'}}>La Classique</h3>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px'}}>Vinyle mat ou brillant, fond blanc opaque. La finition standard pour tout usage pro.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Vinyle mat / brillant</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Fond blanc opaque</span></div>
          </div>
          <div style={{margin: '0 28px 28px', padding: '20px', background: 'white', borderRadius: '14px', textAlign: 'center', border: '1.5px solid rgba(0,0,0,0.07)'}}>
            <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '6px'}}>Pour <span className="imp-qty-label">—</span> pièces</div>
            <div className="imp-price" data-50="30" data-100="50" data-500="110" data-1000="180" style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '36px', color: 'var(--blue)'}}>—</div>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px'}}>TTC · toutes taxes comprises</div>
          </div>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{padding: '28px 28px 20px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '19px', fontWeight: '400', marginBottom: '4px', textTransform: 'uppercase'}}>La Classique + protection</h3>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px'}}>Même base avec un vernis de protection. Résistance accrue à l'eau et aux UV.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Vernis protection</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Résistance UV</span></div>
          </div>
          <div style={{margin: '0 28px 28px', padding: '20px', background: 'white', borderRadius: '14px', textAlign: 'center', border: '1.5px solid rgba(0,0,0,0.07)'}}>
            <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '6px'}}>Pour <span className="imp-qty-label">—</span> pièces</div>
            <div className="imp-price" data-50="40" data-100="60" data-500="150" data-1000="250" style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '36px', color: 'var(--blue)'}}>—</div>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px'}}>TTC · toutes taxes comprises</div>
          </div>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{padding: '28px 28px 20px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '19px', fontWeight: '400', marginBottom: '4px', textTransform: 'uppercase'}}>La Transparente</h3>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px'}}>Support transparent, les couleurs paraissent directement sur la surface collée. Effet vitrine haut de gamme.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Support transparent</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Effet vitrine</span></div>
          </div>
          <div style={{margin: '0 28px 28px', padding: '20px', background: 'white', borderRadius: '14px', textAlign: 'center', border: '1.5px solid rgba(0,0,0,0.07)'}}>
            <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '6px'}}>Pour <span className="imp-qty-label">—</span> pièces</div>
            <div className="imp-price" data-50="40" data-100="60" data-500="150" data-1000="250" style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '36px', color: 'var(--blue)'}}>—</div>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px'}}>TTC · toutes taxes comprises</div>
          </div>
        </div>
        <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.04),rgba(43,106,239,0.04))', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(43,106,239,0.12)'}}>
          <div style={{padding: '28px 28px 20px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px'}}><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '19px', fontWeight: '400', textTransform: 'uppercase'}}>L'Holographique</h3><span style={{padding: '3px 9px', background: 'var(--gradient)', color: 'white', borderRadius: '50px', fontSize: '11px', fontWeight: '700'}}>Premium</span></div>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px'}}>Film holographique irisé qui change de couleur selon l'angle de vue. Effet wow garanti.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--violet)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Film holographique</span><span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--violet)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Effet irisé</span></div>
          </div>
          <div style={{margin: '0 28px 28px', padding: '20px', background: 'white', borderRadius: '14px', textAlign: 'center', border: '1.5px solid rgba(43,106,239,0.15)'}}>
            <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '6px'}}>Pour <span className="imp-qty-label">—</span> pièces</div>
            <div className="imp-price" data-50="60" data-100="100" data-500="240" data-1000="370" style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '36px', color: 'var(--violet)'}}>—</div>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px'}}>TTC · toutes taxes comprises</div>
          </div>
        </div>
      </div>

      <div style={{marginTop: '28px', padding: '20px 32px', background: 'var(--gray-light)', borderRadius: '16px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Format personnalisé ou contour du logo ? Devis sur mesure sous 48h.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*GALERIE */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '48px', flexWrap: 'wrap'}} className="reveal">
        <div>
          <div className="section-tag" style={{marginBottom: '12px'}}>✦ Réalisations</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Nos réalisations<br />impression</h2>
        </div>
        <Link className="btn-outline-svc" href="/realisations">Voir toutes les réalisations →</Link>
      </div>
      <div className="fiche-gallery-grid reveal">
        <div className="fiche-tile fiche-tile-tall" style={{"--tbg": 'linear-gradient(135deg,#0A1628,var(--brand))', "--ang": '35deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Stickers · Grande série</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0D2B6E,var(--brand))', "--ang": '-25deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Flyers · Événementiel</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,var(--brand),var(--accent))', "--ang": '60deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Cartes de visite · Premium</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#1A3A7A,var(--accent))', "--ang": '0deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Grand format · Commerce</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0D1B3E,#2B6AEF)', "--ang": '75deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Roll-up · Événement</span></div></div>
      </div>
    </div>
  </section>

  {/*PROCESSUS */}
  <section className="process">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Comment ça marche</div>
        <h2 className="section-title">De la commande à la livraison</h2>
        <p className="section-sub">Fichier, validation, impression, retrait — on gère tout.</p>
      </div>
      <div className="process-row">
        <div className="process-line"></div>
        <div className="p-step reveal delay-1"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg></div><span className="p-num">1</span></div><h3 className="p-title">Envoyez votre fichier</h3><p className="p-desc">Logo, visuel, texte — on accepte AI, PDF vectoriel, PNG haute résolution.</p></div>
        <div className="p-step reveal delay-2"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div><span className="p-num">2</span></div><h3 className="p-title">Validation du BAT</h3><p className="p-desc">On vous envoie un bon à tirer à valider avant toute mise en production.</p></div>
        <div className="p-step reveal delay-3"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div><span className="p-num">3</span></div><h3 className="p-title">Impression en atelier</h3><p className="p-desc">Production sur nos traceurs HD à Aubervilliers. Découpe numérique précise au mm.</p></div>
        <div className="p-step reveal delay-4"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10" /><path d="M1 6h22v4H1z" /><path d="M12 22V6" /></svg></div><span className="p-num">4</span></div><h3 className="p-title">Retrait ou livraison</h3><p className="p-desc">Récupérez à l'atelier ou optez pour la livraison partout en France.</p></div>
      </div>
    </div>
  </section>

  {/*FAQ */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div className="fiche-faq-grid">
        <div className="reveal">
          <div className="section-tag" style={{marginBottom: '16px'}}>✦ FAQ</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Vos questions<br />sur l'impression</h2>
          <p style={{marginTop: '20px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Format, délai, fichiers — on répond à tout.</p>
          <a href="https://wa.me/33615147464" target="_blank" style={{marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 24px', borderRadius: 'var(--radius-pill)', background: '#25D366', color: 'white', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,211,102,0.35)', transition: 'all .22s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='#1ebe5d';e.currentTarget.style.transform='translateY(-2px)' } } onMouseOut={(e) => { e.currentTarget.style.background='#25D366';e.currentTarget.style.transform='translateY(0)' } }><svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>Poser une question</a>
        </div>
        <div className="fiche-faq-list reveal">
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Quel format de fichier fournir ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Idéalement un fichier vectoriel AI ou PDF. On accepte aussi les PNG haute résolution (min. 300 dpi). Si vous n'avez pas de fichier prêt, notre studio peut créer ou adapter votre visuel sur devis.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Puis-je commander un format personnalisé ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Oui. Les tarifs affichés correspondent aux formats standards (6×6 cm et 10×5 cm). Pour un format sur mesure — toute forme, toute dimension — contactez-nous pour un devis personnalisé.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Quel est le délai de production ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Comptez 3 à 5 jours ouvrés après validation du BAT pour les étiquettes et stickers. Pour les grands formats (affiches, bâches), compter 5 à 7 jours. Besoin urgent ? Contactez-nous directement.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Les stickers résistent-ils à l'extérieur ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Oui, nos vinyles sont traités pour résister aux UV, à la pluie et aux variations de température. La Classique + protection offre une durabilité accrue pour une utilisation extérieure intensive.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*SERVICES LIÉS */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '560px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Autres prestations</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Complétez votre communication</h2>
      </div>
      <div className="fiche-related-grid reveal">
        <div className="fiche-related-card" href="/fiches/covering">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vehicules.jpg" alt="Covering véhicule" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Covering</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Marquage véhicule</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Adhésif découpe, impression, semi-covering.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/textile">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Textile pro" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Textile pro</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Vêtements personnalisés</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Broderie et flocage pour vos équipes.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/enseignes">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes lumineuses" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Enseignes lumineuses</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Boîtes lumineuses, lettres découpées.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*CTA FINAL */}
  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Un projet d'impression ?<br />Parlons-en autour d'un café.</h2>
          <p className="cta-card-sub">Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous votre fichier — devis chiffré sous 48h.</p>
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
