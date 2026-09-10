// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps, toggleFicheFaq } from "../../../../lib/interactions";
import { useEffect } from "react";

export default function FicheEnseignesPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-enseignes">

  {/*HERO */}
  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">

        {/*Copy */}
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Enseignes & Signalétique · LED & Relief</div>
          <h1>Des enseignes qui<br /><span className="gradient-text">marquent les esprits</span></h1>
          <p className="fiche-hero-desc">7 techniques lumineuses fabriquées à Aubervilliers, exposées dans notre <strong>showroom</strong>. Venez voir avant de commander.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
            <a className="btn-outline-svc" onClick={(e) => { document.getElementById('ens-techniques').scrollIntoView({behavior:'smooth',block:'start'}) } }>Voir les 7 techniques →</a>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>7</strong><span>techniques</span></div>
            <div><strong>Showroom</strong><span>à Aubervilliers</span></div>
            <div><strong>LED</strong><span>basse conso</span></div>
            <div><strong>24h</strong><span>délai de devis</span></div>
          </div>
        </div>

        {/*Visuel hero */}
        <div className="fiche-visual reveal" style={{background: '#0D1B3E', padding: '0', overflow: 'hidden'}}>
          <img loading="lazy" src="/showroom-enseignes.jpg" alt="Showroom enseignes 2F Publicité — 7 techniques LED" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block'}} />
          {/*Overlay dégradé bas */}
          <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(to top,rgba(10,20,60,0.7) 0%,transparent 50%)', zIndex: '1'}}></div>
          {/*Badge showroom */}
          <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: '5'}}>
            <span style={{width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80'}}></span>
            <span style={{fontSize: '13px', fontWeight: '600', color: 'white'}}>Showroom ouvert</span>
          </div>
          {/*Badge techniques */}
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: '5'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap'}}>7 techniques LED</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*INTRO SHOWROOM */}
  <div style={{background: 'var(--gray-light)', padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.06)'}}>
    <div className="container">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center'}} className="reveal">
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>LED basse consommation</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Économique et durable, 50 000h de durée de vie</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><line x1="10" y1="6" x2="14" y2="6" /><line x1="10" y1="10" x2="14" y2="10" /><line x1="10" y1="14" x2="14" y2="14" /><line x1="10" y1="18" x2="14" y2="18" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Fabrication locale</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Atelier à Aubervilliers, contrôle qualité à chaque étape</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Installation incluse</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Pose par nos techniciens, toute l'Île-de-France</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Showroom physique</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Venez toucher et voir les échantillons avant de choisir</div>
        </div>
      </div>
    </div>
  </div>

  {/*7 TECHNIQUES */}
  <section style={{padding: '96px 0', background: '#fff'}} id="ens-techniques">
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '60px'}} className="reveal">
        <div className="section-tag">✦ Nos 7 techniques</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Toutes exposées dans<br />notre showroom</h2>
        <p style={{marginTop: '16px', fontSize: '17.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Chaque technique crée un effet lumineux unique. On vous guide vers la plus adaptée à votre façade et votre budget.</p>
      </div>

      {/*Grid 3 colonnes */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px'}} id="ens-tech-grid">

        {/*A — Ajouré */}
        <div className="fiche-tech-card reveal" style={{"--accent": 'var(--brand)'}}>
          <div className="fiche-tech-vis" style={{background: '#F0F4FF', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_A.png" alt="Enseigne Ajouré — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_A</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>A</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>Ajouré (creusé)</h3>
            </div>
            <p>La lumière ne passe qu'à travers la forme des lettres évidées — effet design, très lisible de nuit.</p>
            <ul>
              <li>Contraste fort, look contemporain</li>
              <li>Idéal en façade</li>
            </ul>
          </div>
        </div>

        {/*B — PVC Rétroéclairé */}
        <div className="fiche-tech-card c2 reveal" style={{}}>
          <div className="fiche-tech-vis" style={{background: '#F3F0FF', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_B.png" alt="Enseigne PVC Rétroéclairé — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_B</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,var(--accent),var(--brand))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>B</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>PVC Rétroéclairé</h3>
            </div>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--violet)', background: 'rgba(43,106,239,0.08)', padding: '3px 10px', borderRadius: '20px'}}>10 à 20 mm d'épaisseur</span></p>
            <p>Lettres décollées du support — halo lumineux effet néon doux tout autour.</p>
            <ul>
              <li>Meilleur rapport qualité/prix</li>
              <li>Idéal commerces & restaurants</li>
            </ul>
          </div>
        </div>

        {/*C — Alu Rétroéclairé */}
        <div className="fiche-tech-card reveal">
          <div className="fiche-tech-vis" style={{background: '#F5F5F5', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_C.png" alt="Enseigne Alu Rétroéclairé — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_C</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#888,#444)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>C</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>Alu Rétroéclairé</h3>
            </div>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.06)', padding: '3px 10px', borderRadius: '20px'}}>3 mm · finition miroir/or</span></p>
            <p>Lettres métal fines, reflets lumineux à l'arrière — rendu premium ultra élégant.</p>
            <ul>
              <li>Finition miroir, brossé ou doré</li>
              <li>Idéal hôtels, bureaux, showrooms</li>
            </ul>
          </div>
        </div>

        {/*D — Relief PMMA */}
        <div className="fiche-tech-card c2 reveal">
          <div className="fiche-tech-vis" style={{background: '#F0F4FF', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_D.png" alt="Enseigne Relief PMMA — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_D</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,var(--brand),var(--accent))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>D</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>Relief PMMA</h3>
            </div>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--blue)', background: 'rgba(43,106,239,0.08)', padding: '3px 10px', borderRadius: '20px'}}>10 · 15 · 20 mm</span></p>
            <p>Lettres en relief plein — diffusion lumineuse franche et épurée sur toute la face avant.</p>
            <ul>
              <li>Volume clean, toutes couleurs</li>
              <li>Résistant aux intempéries</li>
            </ul>
          </div>
        </div>

        {/*E — Relief PMMA + Alu */}
        <div className="fiche-tech-card reveal">
          <div className="fiche-tech-vis" style={{background: '#F5F5F5', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_E.png" alt="Enseigne Relief PMMA + Alu — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_E</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#555,#888)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>E</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>Relief PMMA + Alu</h3>
            </div>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.06)', padding: '3px 10px', borderRadius: '20px'}}>10 · 15 · 20 mm · alu brossé</span></p>
            <p>Face aluminium brossé, lumière subtile sur les chants — design très haut de gamme.</p>
            <ul>
              <li>Face métallique opaque & mate</li>
              <li>Parfait bureaux & enseignes premium</li>
            </ul>
          </div>
        </div>

        {/*F — Boîtier Plexi */}
        <div className="fiche-tech-card c2 reveal">
          <div className="fiche-tech-vis" style={{background: '#F0F4FF', position: 'relative', minHeight: '200px'}}>
            <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_F.png" alt="Enseigne Boîtier Plexi — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
            <span className="mono-tag">technique_F</span>
          </div>
          <div className="fiche-tech-body">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
              <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,var(--brand),#0D4ECC)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>F</span>
              <h3 style={{fontSize: '17px', margin: '0'}}>Boîtier Plexi</h3>
            </div>
            <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--blue)', background: 'rgba(43,106,239,0.08)', padding: '3px 10px', borderRadius: '20px'}}>60 mm · volume maximal</span></p>
            <p>Grand relief, diffusion intégrale face avant et chants lumineux — impact visuel maximum.</p>
            <ul>
              <li>Idéal grandes façades</li>
              <li>Excellent rendu jour et nuit</li>
            </ul>
          </div>
        </div>

        {/*G — Boîtier Plexi côtés opaques (full width last) */}
        <div className="fiche-tech-card reveal" style={{gridColumn: '1/-1', maxWidth: 'calc(66.66% - 8px)', margin: '0 auto', width: '100%'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div className="fiche-tech-vis" style={{background: '#F5F5F5', position: 'relative', minHeight: '200px', aspectRatio: 'unset'}}>
              <img loading="lazy" src="/2D%20ENSEIGNE/2F_VIsuels_Techniques_Enseignes_G.png" alt="Enseigne Boîtier Plexi côtés opaques — 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'contain', padding: '20px', display: 'block'}} />
              <span className="mono-tag">technique_G</span>
            </div>
            <div className="fiche-tech-body" style={{borderTop: 'none'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                <span style={{width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#1A1A1A,#444)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '400', fontSize: '13px', color: 'white', fontFamily: '\'Righteous\',sans-serif', flexShrink: '0', textTransform: 'uppercase'}}>G</span>
                <h3 style={{fontSize: '17px', margin: '0'}}>Boîtier Plexi (côtés opaques)</h3>
              </div>
              <p style={{marginBottom: '10px'}}><span style={{display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.06)', padding: '3px 10px', borderRadius: '20px'}}>60 mm · chants opaques</span></p>
              <p>Chants opaques, lumière projetée vers l'avant seulement — contraste et lisibilité maximale.</p>
              <ul>
                <li>Lisibilité parfaite en journée</li>
                <li>Idéal enseignes commerciales</li>
              </ul>
            </div>
          </div>
        </div>

      </div>{/*/grid */}

      <div style={{textAlign: 'center', marginTop: '48px'}} className="reveal">
        <p style={{fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '20px'}}>Vous voulez voir ces techniques en vrai avant de décider ?</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=2F+PUB,+217+Av.+Jean+Jaur%C3%A8s,+93300+Aubervilliers" target="_blank" className="btn-primary"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: '0'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> Visiter le showroom</a>
      </div>
    </div>
  </section>

  {/*PROCESSUS */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '52px'}} className="reveal">
        <div className="section-tag">✦ Notre processus</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>De votre concept à l'installation</h2>
        <p style={{marginTop: '16px', fontSize: '17.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Un interlocuteur unique de la conception à la pose — pas de sous-traitance.</p>
      </div>
      <div className="fiche-process-steps">
        <div className="fiche-process-line"></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" /></svg></div><span className="p-num">1</span></div><h4 className="p-title">Consultation & relevé</h4><p className="p-desc">On mesure votre façade et vous conseille la technique la plus adaptée.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div><span className="p-num">2</span></div><h4 className="p-title">Conception & BAT 3D</h4><p className="p-desc">Visualisez le rendu final avant production.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div><span className="p-num">3</span></div><h4 className="p-title">Fabrication en atelier</h4><p className="p-desc">Câblage LED intégré, contrôle qualité à chaque étape.</p></div>
        <div className="p-step reveal"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M20 12h-2M4 12H2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 20v-2M12 4V2" /></svg></div><span className="p-num">4</span></div><h4 className="p-title">Installation</h4><p className="p-desc">Pose, raccordement et test — livraison clé en main.</p></div>
      </div>
    </div>
  </section>

  {/*GALERIE */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '48px', flexWrap: 'wrap'}} className="reveal">
        <div>
          <div className="section-tag" style={{marginBottom: '12px'}}>✦ Réalisations</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Nos réalisations<br />enseignes</h2>
        </div>
        <Link className="btn-outline-svc" href="/realisations">Voir toutes les réalisations →</Link>
      </div>
      <div className="fiche-gallery-grid reveal">
        <div className="fiche-tile fiche-tile-tall" style={{"--tbg": 'linear-gradient(135deg,#0D1B4E,var(--brand))', "--ang": '35deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Boîtier Plexi · Technique F</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#1A0A3C,#5A1A9A)', "--ang": '-30deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Alu rétroéclairé · Technique C</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0A2060,var(--brand))', "--ang": '60deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Relief PMMA · Technique D</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,var(--brand),var(--accent))', "--ang": '0deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">PVC rétroéclairé · Technique B</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#1A1A1A,#3A3A3A)', "--ang": '75deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">PMMA + Alu · Technique E</span></div></div>
      </div>
    </div>
  </section>

  {/*FAQ */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div className="fiche-faq-grid">
        <div className="reveal">
          <div className="section-tag" style={{marginBottom: '16px'}}>✦ FAQ</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Vos questions<br />sur les enseignes</h2>
          <p style={{marginTop: '20px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Démarches administratives, entretien, budget — on répond à tout.</p>
          <a href="https://wa.me/33615147464" target="_blank" style={{marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 24px', borderRadius: 'var(--radius-pill)', background: '#25D366', color: 'white', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,211,102,0.35)', transition: 'all .22s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='#1ebe5d';e.currentTarget.style.transform='translateY(-2px)' } } onMouseOut={(e) => { e.currentTarget.style.background='#25D366';e.currentTarget.style.transform='translateY(0)' } }><svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>Poser une question</a>
        </div>
        <div className="fiche-faq-list reveal">
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Comment choisir la bonne technique ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Venez au showroom toucher et comparer les 7 techniques. On vous conseille selon votre budget, votre façade et votre image. Devis gratuit et sans engagement.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Faut-il un permis pour installer une enseigne ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">En dessous de 1 m², une déclaration en mairie suffit souvent. Au-delà, on vous accompagne dans les démarches d'autorisation.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFicheFaq(e.currentTarget) } }><span className="fiche-faq-q-text">Quel délai entre commande et pose ?</span><span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span></button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">7 à 10 jours ouvrés après validation du BAT. Installation planifiée avec vous, intervention rapide en Île-de-France.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*SERVICES LIÉS */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '52px'}} className="reveal">
        <div className="section-tag">✦ Autres prestations</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Complétez votre communication</h2>
      </div>
      <div className="fiche-related-grid">
        <div className="fiche-related-card reveal" href="/fiches/textile">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Textile pro" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Textile pro</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Vêtements personnalisés</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Broderie et flocage pour habiller vos équipes à votre image.</p></div>
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
          <h2 className="cta-card-title">Un projet d'enseigne ?<br />Visitez notre showroom.</h2>
          <p className="cta-card-sub">217 av. Jean Jaurès, Aubervilliers — venez voir et toucher les 7 techniques avant de choisir. Devis gratuit sous 24h.</p>
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
