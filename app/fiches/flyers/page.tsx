// @ts-nocheck
"use client";

import Link from "next/link";
import { flyersScrollTo, initGlobalKeydown, initImpNavBarScrollSpy, initRevealAndCountUps } from "../../../lib/interactions";
import { useEffect } from "react";

export default function FicheFlyersPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    const cleanupNav = initImpNavBarScrollSpy(['flyers-sec','cdv-sec','depliants-sec']);
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
            cleanupNav();
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-flyers">


  <div className="fiche-breadcrumb">
    <div className="container" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Link href="/">Accueil</Link>
      <span className="sep">›</span>
      <Link href="/services">Nos services</Link>
      <span className="sep">›</span>
      <span className="current">Flyers & Imprimés</span>
    </div>
  </div>

  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Flyers · Cartes de visite · Dépliants · Brochures</div>
          <h1>Supports print<br /><span className="gradient-text">qui marquent les esprits</span></h1>
          <p className="fiche-hero-desc">Flyers, cartes de visite, dépliants, brochures — imprimés en interne à Aubervilliers. Petites et grandes séries, finitions premium, livraison rapide.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
            <a className="btn-outline-svc" onClick={(e) => { document.getElementById('flyers-sec').scrollIntoView({behavior:'smooth',block:'start'}) } }>Voir les tarifs →</a>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>Dès 1 000</strong><span>flyers</span></div>
            <div><strong>Dès 500</strong><span>cartes de visite</span></div>
            <div><strong>48h</strong><span>délai de devis</span></div>
            <div><strong>Atelier</strong><span>Aubervilliers</span></div>
          </div>
        </div>
        <div className="fiche-visual reveal" style={{background: 'linear-gradient(160deg,#0a1628,#1a3a7a,#0d2b6e)'}}>
          <img loading="lazy" src="/photos-services/service-flyers-imprimes.jpg" alt="Flyers & Imprimés 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.85'}} onError={(e) => { e.currentTarget.style.display='none' } } />
          <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(to bottom,transparent 50%,rgba(10,22,40,0.7))', zIndex: '1'}}></div>
          <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '12px', zIndex: '5'}}>
            <span style={{fontSize: '12px', fontWeight: '600', color: 'white'}}>Impression offset & numérique</span>
          </div>
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: '5', whiteSpace: 'nowrap'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase'}}>Flyers · Cartes de visite · Dépliants</span>
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
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Couleurs vives, rendu net et précis</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Finitions premium</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Mat, brillant, soft-touch, dorure…</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Prix dégressifs</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Plus la quantité augmente, moins c'est cher</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Livraison rapide</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Production & livraison express possible</div>
        </div>
      </div>
    </div>
  </div>

  {/*BARRE NAVIGATION */}
  <div id="flyersNavBar" style={{background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(0,0,0,0.06)', position: 'fixed', top: '72px', left: '0', right: '0', zIndex: '200', opacity: '0', transform: 'translateY(-8px)', pointerEvents: 'none', transition: 'opacity .3s,transform .3s,box-shadow .3s'}}>
    <div className="container" style={{display: 'flex', gap: '4px', overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none', justifyContent: 'center'}}>
      <button className="imp-nav-btn active" onClick={(e) => { flyersScrollTo('flyers-sec') } }>Flyers</button>
      <button className="imp-nav-btn" onClick={(e) => { flyersScrollTo('cdv-sec') } }>Cartes de visite</button>
      <button className="imp-nav-btn" onClick={(e) => { flyersScrollTo('depliants-sec') } }>Dépliants & Brochures</button>
    </div>
  </div>

  {/*── FLYERS ── */}
  <section id="flyers-sec" style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Flyers</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Flyers 135g demi-mat</h2>
        <p style={{marginTop: '14px', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Papier 135g demi-mat — impression recto ou recto/verso. Tous tarifs <strong>hors taxes</strong>.</p>
      </div>
      <div className="reveal" style={{background: 'white', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(5,1fr)', background: 'var(--dark)', padding: '16px 24px', gap: '8px'}}>
          <div style={{fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '.08em'}}>Quantité</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>1 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>2 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>3 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>5 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>10 000</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(5,1fr)', padding: '18px 24px', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'center'}}>
          <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-main)'}}>Recto</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>140€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>210€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>260€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>320€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>450€</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(5,1fr)', padding: '18px 24px', gap: '8px', alignItems: 'center'}}>
          <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-main)'}}>Recto Verso</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>150€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>230€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>290€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>370€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>550€</div>
        </div>
      </div>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '20px'}} className="reveal">
        <div style={{flex: '1', minWidth: '220px', padding: '18px 22px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(43,106,239,0.12)', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
          <div><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '2px'}}>Création du design</div><div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--text-main)'}}>Recto 60€ · R/V 90€</div></div>
        </div>
      </div>
      <div style={{marginTop: '24px', padding: '18px 28px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Autre format ou quantité spéciale ? Devis sur mesure.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*── CARTES DE VISITE ── */}
  <section id="cdv-sec" style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Cartes de visite</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Format 85×54 mm</h2>
        <p style={{marginTop: '14px', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Finitions spéciales disponibles : vernis sélectif, doré, argenté, sablé… Tous tarifs <strong>hors taxes</strong>.</p>
      </div>
      <div className="reveal" style={{background: 'white', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(4,1fr)', background: 'var(--dark)', padding: '16px 24px', gap: '8px'}}>
          <div style={{fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '.08em'}}>Quantité</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>500</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>1 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>2 000</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: 'white', textAlign: 'center'}}>5 000</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(4,1fr)', padding: '18px 24px', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'center'}}>
          <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-main)'}}>Recto</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>130€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>150€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>180€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--blue)', textAlign: 'center'}}>270€</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr repeat(4,1fr)', padding: '18px 24px', gap: '8px', alignItems: 'center'}}>
          <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-main)'}}>Recto Verso</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>160€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>190€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>230€</div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--accent)', textAlign: 'center'}}>300€</div>
        </div>
      </div>
      <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '20px'}} className="reveal">
        <div style={{flex: '1', minWidth: '220px', padding: '18px 22px', background: 'white', borderRadius: '14px', border: '1.5px solid rgba(43,106,239,0.12)', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
          <div><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '2px'}}>Création du design</div><div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', color: 'var(--text-main)'}}>50€</div></div>
        </div>
        <div style={{flex: '1', minWidth: '220px', padding: '18px 22px', background: 'white', borderRadius: '14px', border: '1.5px solid rgba(43,106,239,0.12)', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: '10px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0'}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg></div>
          <div><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '2px'}}>Finitions spéciales</div><div style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Vernis sélectif, doré, argenté, sablé…</div></div>
        </div>
      </div>
      <div style={{marginTop: '24px', padding: '18px 28px', background: 'white', borderRadius: '14px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Format personnalisé ou finition spéciale ? Devis sur mesure.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
      </div>
    </div>
  </section>

  {/*── DÉPLIANTS & BROCHURES ── */}
  <section id="depliants-sec" style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Dépliants & Brochures</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Dépliants 2 & 3 volets,<br />brochures agrafées</h2>
        <p style={{marginTop: '14px', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Présentez vos produits et services avec des supports de qualité. Tous formats sur mesure, papiers premium, pliage et façonnage en atelier. Tarifs <strong>sur devis</strong>.</p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} className="reveal">
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Dépliant 2 volets</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Format A4 plié en A5, ou A5 plié en A6. Papier 170g mat ou couché brillant, recto/verso.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>A4 → A5</span>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>170g mat</span>
          </div>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Dépliant 3 volets</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>Format A4 plié en triptyque (3 volets). Papier 150g ou 170g, pliage accordéon ou roulé.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>A4 triptyque</span>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>150g / 170g</span>
          </div>
        </div>
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', padding: '28px', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg></div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Brochure agrafée</h3>
          <p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px'}}>De 4 à 48 pages, format A4 ou A5. Couverture 300g, intérieur 130g mat ou brillant, agrafage dos carré.</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '7px'}}>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>4 à 48 pages</span>
            <span style={{padding: '3px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>A4 / A5</span>
          </div>
        </div>
      </div>
      <div style={{marginTop: '24px', padding: '18px 28px', background: 'var(--gray-light)', borderRadius: '14px', border: '1.5px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}} className="reveal">
        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarifs sur devis selon format, papier et quantité.</span>
        <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
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
        <div className="p-step reveal delay-1"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div><span className="p-num">1</span></div><h3 className="p-title">Envoyez votre fichier</h3><p className="p-desc">Logo, visuel, texte — on accepte AI, PDF vectoriel, PNG haute résolution (min. 300 dpi).</p></div>
        <div className="p-step reveal delay-2"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div><span className="p-num">2</span></div><h3 className="p-title">Validation du BAT</h3><p className="p-desc">Bon à tirer envoyé avant toute mise en production — on n'imprime qu'après votre accord.</p></div>
        <div className="p-step reveal delay-3"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div><span className="p-num">3</span></div><h3 className="p-title">Impression en atelier</h3><p className="p-desc">Production dans notre atelier à Aubervilliers — contrôle qualité sur chaque lot.</p></div>
        <div className="p-step reveal delay-4"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10" /><path d="M1 6h22v4H1z" /><path d="M12 22V6" /></svg></div><span className="p-num">4</span></div><h3 className="p-title">Retrait ou livraison</h3><p className="p-desc">Récupérez à l'atelier ou optez pour la livraison partout en France.</p></div>
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
        <div className="fiche-related-card" href="/fiches/impression">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impression" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 78%'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Impression</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Grand format & vinyle adhésif</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Affiches, bâches, micro-perforé, impression découpe.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/covering">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vehicules.jpg" alt="Covering" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Covering</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Marquage véhicule</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Adhésif découpe, semi-covering, covering total.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/enseignes">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Enseignes lumineuses</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Boîtes lumineuses, lettres découpées, totems.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*CTA FINAL */}
  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Un projet print ?<br />Parlons-en autour d'un café.</h2>
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
