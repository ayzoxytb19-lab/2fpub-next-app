// @ts-nocheck
"use client";

import Link from "next/link";
import { closeCatalogueGate, initFicheSlider, initGlobalKeydown, initRevealAndCountUps, submitCatalogueGate, toggleFicheFaq } from "../../../../lib/interactions";
import { useEffect } from "react";

export default function FicheTextilePage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    const cleanupSlider = initFicheSlider();
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
            cleanupSlider();
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-textile">

  {/*HERO */}
  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">

        {/*Copy */}
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Textile professionnel · Broderie & Flocage</div>
          <h1>Vêtements pro<br /><span className="gradient-text">à votre image</span></h1>
          <p className="fiche-hero-desc">Broderie et flocage — habillez votre équipe à votre image. Fabriqué à Aubervilliers, contrôlé par <strong>Aqua Pressing</strong>.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
            <a className="btn-outline-svc" onClick={(e) => { document.getElementById('txt-techniques').scrollIntoView({behavior:'smooth',block:'start'}) } }>Voir les techniques →</a>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>Dès 10</strong><span>pièces minimum</span></div>
            <div><strong>24h</strong><span>délai de devis</span></div>
            <div><strong>2</strong><span>techniques</span></div>
            <div><strong>Aqua</strong><span>Pressing certifié</span></div>
          </div>
        </div>

        {/*Visuel hero */}
        <div className="fiche-visual reveal" style={{background: 'linear-gradient(160deg,#0D1B3E,#1A3A7A,#2D1B69)'}}>
          {/*Pattern tissu simulé */}
          <div style={{position: 'absolute', inset: '0', background: 'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,0.03) 18px,rgba(255,255,255,0.03) 19px),repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(255,255,255,0.03) 18px,rgba(255,255,255,0.03) 19px)', zIndex: '0'}}></div>
          <div style={{position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '40px', zIndex: '1'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" style={{width: '80px', height: '80px'}}><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H7v10a2 2 0 002 2h6a2 2 0 002-2V10h3.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" /></svg>
            <span style={{fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '12px', color: 'rgba(255,255,255,0.65)', border: '1.5px dashed rgba(255,255,255,0.3)', padding: '7px 14px', borderRadius: '8px'}}>Photo textile à intégrer</span>
          </div>
          {/*Badge Aqua Pressing */}
          <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: '5'}}>
            <span style={{color: '#F59E0B', fontSize: '14px', lineHeight: '1'}}>★★★★★</span>
            <span style={{fontSize: '12px', fontWeight: '600', color: 'white'}}>Aqua Pressing certifié</span>
          </div>
          {/*Badge techniques */}
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: '5', whiteSpace: 'nowrap'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase'}}>Broderie · Flocage · Accessoires</span>
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
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Broderie HD</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Relief 3D premium, résiste au lavage industriel</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Couleurs vives</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Flocage avec dégradés, sans limite de couleur</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><line x1="10" y1="6" x2="14" y2="6" /><line x1="10" y1="10" x2="14" y2="10" /><line x1="10" y1="14" x2="14" y2="14" /><line x1="10" y1="18" x2="14" y2="18" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Atelier local</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Fabrication à Aubervilliers, contrôle sur chaque pièce</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10h3.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Tous supports</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Polos, t-shirts, vestes, casquettes, bonnets</div>
        </div>
      </div>
    </div>
  </div>

  {/*TECHNIQUES */}
  <section style={{padding: '96px 0', background: '#fff'}} id="txt-techniques">
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '60px'}} className="reveal">
        <div className="section-tag">✦ Nos 3 techniques</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>La bonne technique<br />pour chaque besoin</h2>
        <p style={{marginTop: '16px', fontSize: '17.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>On vous conseille selon le support, la quantité et le rendu souhaité — pas de mauvaise surprise sur la finition.</p>
      </div>

      <div className="tech-grid2">

        {/*A — Broderie */}
        <div className="fiche-tech-card reveal">
          <div className="fiche-tech-vis" style={{background: '#111', position: 'relative', minHeight: '220px', overflow: 'hidden'}}>
            <img loading="lazy" src="/broderie@150x-8.png" alt="Broderie 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block'}} />
          </div>
          <div className="fiche-tech-body">
            <h3>Broderie</h3>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--blue)', background: 'rgba(43,106,239,0.08)', padding: '3px 10px', borderRadius: '20px'}}>12 pièces minimum</span></p>
            <p>La technique la plus qualitative — relief 3D, rendu premium sur tout support.</p>
            <ul>
              <li>Résiste au lavage industriel</li>
              <li>Idéal logo et monogramme</li>
            </ul>
          </div>
        </div>

        {/*B — Flocage */}
        <div className="fiche-tech-card c2 reveal">
          <div className="fiche-tech-vis" style={{background: '#1a3aaa', position: 'relative', minHeight: '220px', overflow: 'hidden'}}>
            <img loading="lazy" src="/flocage@150x-8.png" alt="Flocage 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block'}} />
          </div>
          <div className="fiche-tech-body">
            <h3>Flocage</h3>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--violet)', background: 'rgba(43,106,239,0.08)', padding: '3px 10px', borderRadius: '20px'}}>10 pièces minimum</span></p>
            <p>Pose à chaud, grands formats, couleurs vives et dégradés sans limite.</p>
            <ul>
              <li>Idéal visuels complexes</li>
              <li>Ne s'applique pas sur nylon</li>
            </ul>
          </div>
        </div>

      </div>

      {/*Supports compatibles — carousel discret */}
      <div style={{marginTop: '48px'}} className="reveal">
        <p style={{fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px'}}>Supports compatibles</p>
        <div style={{position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: '0', top: '0', bottom: '0', width: '48px', background: 'linear-gradient(to right,white,transparent)', zIndex: '2', pointerEvents: 'none'}}></div>
          <div style={{position: 'absolute', right: '0', top: '0', bottom: '0', width: '48px', background: 'linear-gradient(to left,white,transparent)', zIndex: '2', pointerEvents: 'none'}}></div>
          <div style={{display: 'flex', gap: '10px', width: 'max-content', animation: 'marquee 28s linear infinite'}}>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>T-shirt</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Polo</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Sweat à capuche</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Pull</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Veste zippée</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Bodywarmer</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Polaire</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Softshell</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Blouson</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Doudoune</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Parka</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Casquette</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Bonnet</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Cache-cou</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Pantalon</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Combinaison</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Blouse</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Tablier</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Ambulancier</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,180,0,0.35)', fontSize: '13px', fontWeight: '500', color: '#92600A', whiteSpace: 'nowrap', flexShrink: '0'}}>Haute visibilité</span>
            {/*doublon pour boucle infinie */}
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>T-shirt</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Polo</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Sweat à capuche</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Pull</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Veste zippée</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Bodywarmer</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Polaire</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Softshell</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Blouson</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Doudoune</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Parka</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Casquette</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Bonnet</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Tablier</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(0,0,0,0.10)', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: '0'}}>Ambulancier</span>
            <span style={{padding: '5px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,180,0,0.35)', fontSize: '13px', fontWeight: '500', color: '#92600A', whiteSpace: 'nowrap', flexShrink: '0'}}>Haute visibilité</span>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '40px'}} className="reveal">
        <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px'}}>Vous ne savez pas quelle technique choisir ? On vous guide.</p>
        <a href="https://wa.me/33615147464" target="_blank" style={{display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 24px', borderRadius: 'var(--radius-pill)', background: '#25D366', color: 'white', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,211,102,0.35)', transition: 'all .22s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='#1ebe5d';e.currentTarget.style.transform='translateY(-2px)' } } onMouseOut={(e) => { e.currentTarget.style.background='#25D366';e.currentTarget.style.transform='translateY(0)' } }><svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>Parler à un conseiller</a>
      </div>
    </div>
  </section>

  {/*AQUA PRESSING */}
  <div className="aqua-band">
    <div className="container">
      <div className="aqua-inner">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14.5px'}}>
          <div><strong style={{display: 'block', color: '#fff', fontSize: '16px'}}>Gammes testées avant commercialisation</strong>Partenaire qualité</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginBottom: '14px', letterSpacing: '.04em'}}>Nos gammes textiles ont été sélectionnées et testées en amont avec l&apos;accompagnement de</p>
          <div className="aqua-logo-box"><img loading="lazy" src="/AQUA PRESSING.svg" alt="Aqua Pressing" style={{height: '64px', width: 'auto', display: 'block'}} /></div>
        </div>
        <div style={{textAlign: 'right', color: 'rgba(255,255,255,0.8)', fontSize: '14.5px'}}>
          <strong style={{display: 'block', color: '#fff', fontSize: '15px', marginBottom: '4px'}}>Pressing professionnel</strong>
          <span style={{fontSize: '13px', opacity: '.65'}}>Lavage industriel · Entretien textile</span>
        </div>
      </div>
    </div>
  </div>

  {/*GALERIE */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '48px', flexWrap: 'wrap'}} className="reveal">
        <div>
          <div className="section-tag" style={{marginBottom: '12px'}}>✦ Réalisations</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Nos réalisations<br />textile</h2>
        </div>
        <Link className="btn-outline-svc" href="/realisations">Voir toutes les réalisations →</Link>
      </div>
      <div className="fiche-gallery-grid reveal">
        <div className="fiche-tile fiche-tile-tall" style={{"--tbg": 'linear-gradient(135deg,#0D1B4E,var(--brand))', "--ang": '35deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Broderie · Technique A</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#2D1B69,var(--accent))', "--ang": '-30deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Flocage · Technique B</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0A2060,var(--brand))', "--ang": '60deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Broderie · Technique A</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#062A18,#1A8C48)', "--ang": '0deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Casquettes · Technique C</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,var(--brand),var(--accent))', "--ang": '75deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Flocage · Technique B</span></div></div>
      </div>
    </div>
  </section>

  {/*CATALOGUE DOWNLOAD */}
  <section style={{padding: '80px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div className="reveal" style={{background: 'linear-gradient(135deg,var(--dark) 0%,#1a1d38 100%)', borderRadius: 'var(--radius-lg)', padding: '56px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-60px', right: '220px', width: '320px', height: '320px', background: 'radial-gradient(circle,rgba(43,106,239,0.18) 0%,transparent 70%)', pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', bottom: '-80px', left: '-40px', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(43,106,239,0.12) 0%,transparent 70%)', pointerEvents: 'none'}}></div>
        <div style={{position: 'relative', zIndex: '1'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-pill)', fontSize: '11.5px', fontWeight: '700', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px'}}>✦ Catalogue textile</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(24px,3vw,38px)', fontWeight: '400', color: 'white', letterSpacing: '-0.022em', lineHeight: '1.15', marginBottom: '14px', textTransform: 'uppercase'}}>Téléchargez notre catalogue<br /><span style={{color: 'rgba(255,255,255,0.72)'}}>vêtements professionnels</span></h2>
          <p style={{fontSize: '15.5px', color: 'rgba(255,255,255,0.52)', lineHeight: '1.7', maxWidth: '480px', marginBottom: '0'}}>Toutes nos gammes, techniques de personnalisation, grilles tarifaires et délais — en un seul document PDF.</p>
          <div style={{display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap', alignItems: 'center'}}>
            {/* Catalogue PDF pas encore fourni (voir lib/interactions.ts, submitCatalogueGate) —
                bouton volontairement inactif tant que le fichier n'existe pas dans public/.
                Ne pas réactiver openCatalogueGate() ici sans le fichier réel. */}
            <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', borderRadius: 'var(--radius-pill)', fontSize: '15px', fontWeight: '400', fontFamily: '\'Righteous\',sans-serif', textTransform: 'uppercase', cursor: 'default'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Catalogue bientôt disponible
            </span>
            <a href="/devis" style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '6px'}}>
              En attendant, demandez un devis directement
            </a>
          </div>
        </div>
        <div style={{position: 'relative', zIndex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img loading="lazy" src="/mockup catalogue 2f.png" alt="Catalogue textile 2F Publicité" style={{width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.7)) drop-shadow(0 8px 24px rgba(43,106,239,0.4))', transform: 'rotate(4deg)'}} />
        </div>
      </div>
    </div>
  </section>

  {/*CATALOGUE EMAIL GATE MODAL */}
  <div className="modal-overlay" id="catalogueGate" style={{opacity: 0, pointerEvents: 'none'}} onClick={(e) => { if (e.target === e.currentTarget) closeCatalogueGate() } }>
    <div className="modal-box" id="catalogueGateCard" style={{maxWidth: '440px', transform: 'scale(0.94) translateY(16px)'}}>
      <button className="modal-close" onClick={() => { closeCatalogueGate() } }>✕</button>
      <span className="modal-service-tag">Catalogue textile</span>
      <h2 className="modal-title">Recevez le catalogue</h2>
      <p className="modal-desc">Indiquez votre email, nous vous envoyons le catalogue PDF (gammes, techniques, tarifs).</p>
      <div className="modal-divider"></div>
      <form id="catalogueGateForm" onSubmit={(e) => { e.preventDefault(); submitCatalogueGate() } }>
        <div className="form-group">
          <label htmlFor="catalogueGateEmail">Votre email</label>
          <input id="catalogueGateEmail" type="email" name="email" className="form-control" placeholder="vous@entreprise.fr" required />
        </div>
        {/* Piège à robots : champ caché, jamais rempli par un visiteur humain — voir app/forms/submit/route.ts */}
        <input type="text" name="societe_web" tabIndex={-1} autoComplete="off" style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0}} aria-hidden="true" />
        <p id="catalogueGateError" style={{display: 'none', color: '#B42318', fontSize: '13px', marginTop: '-8px', marginBottom: '16px'}}>Adresse email invalide.</p>
        <button type="submit" className="btn-submit">Recevoir le catalogue →</button>
        <p className="form-note">🔒 Utilisé uniquement pour vous envoyer le catalogue.</p>
      </form>
      <div id="catalogueGateSuccess" style={{display: 'none', textAlign: 'center', padding: '20px 0'}}>
        <div style={{width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(43,106,239,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px'}}>✅</div>
        <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Demande bien reçue</h3>
        <p style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7'}}>Nous vous envoyons le catalogue par email dans les plus brefs délais.</p>
      </div>
    </div>
  </div>

  {/*PROCESSUS */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '52px'}} className="reveal">
        <div className="section-tag">✦ Notre processus</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>De votre logo à la livraison</h2>
        <p style={{marginTop: '16px', fontSize: '17.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>4 étapes simples, un interlocuteur unique du début à la fin — sans surprise.</p>
      </div>
      <div className="fiche-process-steps">
        <div className="fiche-process-line"></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div><span className="p-num">1</span></div><h4 className="p-title">Échange & devis</h4><p className="p-desc">Envoyez votre logo — devis gratuit sous 24h.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg></div><span className="p-num">2</span></div><h4 className="p-title">Création graphique</h4><p className="p-desc">Vectorisation et optimisation pour la technique choisie.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg></div><span className="p-num">3</span></div><h4 className="p-title">Fabrication en atelier</h4><p className="p-desc">Contrôle qualité sur chaque pièce, testé par Aqua Pressing.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></div><span className="p-num">4</span></div><h4 className="p-title">Retrait à l'atelier</h4><p className="p-desc">Prêt en 5 à 7 jours ouvrés.</p></div>
      </div>
    </div>
  </section>

  {/*FAQ */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div className="fiche-faq-grid">
        <div className="reveal">
          <div className="section-tag" style={{marginBottom: '16px'}}>✦ FAQ</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Vos questions<br />sur le textile pro</h2>
          <p style={{marginTop: '20px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Quantités, délais, supports, prix — on répond à tout.</p>
          <a href="https://wa.me/33615147464" target="_blank" style={{marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 24px', borderRadius: 'var(--radius-pill)', background: '#25D366', color: 'white', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,211,102,0.35)', transition: 'all .22s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='#1ebe5d';e.currentTarget.style.transform='translateY(-2px)' } } onMouseOut={(e) => { e.currentTarget.style.background='#25D366';e.currentTarget.style.transform='translateY(0)' } }><svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>Poser une question</a>
        </div>
        <div className="fiche-faq-list reveal">
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Quelle est la quantité minimum pour commander ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner"><strong>12 pièces pour la broderie</strong> (hors casquettes/bonnets) et <strong>10 pièces pour le flocage</strong>. Pour les casquettes et bonnets, contactez-nous directement — la quantité est flexible.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Quel est le délai de fabrication ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">5 à 7 jours ouvrés après validation du bon à tirer. Commande urgente ? Contactez-nous, on s'adapte.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">La broderie résiste-t-elle au lavage machine ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Absolument, elle résiste à des centaines de lavages sans s'effriter — idéale pour les vêtements de travail quotidiens.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Tarifs dégressifs pour grandes quantités ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Oui, dès 50 pièces. Demandez un devis personnalisé pour une simulation.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*SERVICES LIÉS */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '52px'}} className="reveal">
        <div className="section-tag">✦ Autres prestations</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Complétez votre communication</h2>
      </div>
      <div className="fiche-related-grid">
        <div className="fiche-related-card reveal" href="/fiches/enseignes">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes lumineuses" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Enseignes lumineuses</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>7 techniques LED fabriquées dans notre showroom à Aubervilliers.</p></div>
        </div>
        <div className="fiche-related-card reveal" href="/fiches/covering">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vehicules.jpg" alt="Covering véhicule" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Covering</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Marquage véhicule</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Adhésif découpe, impression, semi-covering — pose pro en IDF.</p></div>
        </div>
        <div className="fiche-related-card reveal" href="/fiches/impression">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impression" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Impression</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Flyers & supports print</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Flyers, affiches, kakémonos, stickers — livrés partout en France.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*CTA */}
  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Un projet textile ?<br />Parlons-en autour d'un café.</h2>
          <p className="cta-card-sub">Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous votre logo — devis chiffré sous 24h.</p>
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
