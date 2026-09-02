// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps, initTimeline } from "../../lib/interactions";
import { useEffect } from "react";

export default function AboutPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    initTimeline()
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-about">


  {/*── HERO DARK ── */}
  <section className="about-hero">
    <img loading="lazy" src="/2Fdevanture.png" alt="Boutique 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', filter: 'saturate(0.65)'}} />
    <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(135deg,rgba(10,12,28,0.96) 0%,rgba(15,16,32,0.92) 45%,rgba(15,16,32,0.88) 70%,rgba(26,60,120,0.85) 100%)'}}></div>
    <div className="container" style={{width: '100%', maxWidth: '1200px'}}>
      <div className="about-hero-inner">
        <div className="about-hero-left reveal">
          <div className="about-hero-eyebrow">✦ Qui sommes-nous</div>
          <h1 className="about-hero-title">L'agence qui donne<br />de la voix à <span className="ah-accent">votre marque</span></h1>
          <p className="about-hero-sub">Depuis 1999, nous accompagnons les entreprises d'Île-de-France sur tous leurs projets de communication visuelle — du vêtement pro à l'enseigne lumineuse.</p>
          <div className="about-hero-chips">
            <span className="ah-chip"><span className="ah-chip-dot"></span>Fondée en 1999</span>
            <span className="ah-chip"><span className="ah-chip-dot"></span>+500 clients</span>
            <span className="ah-chip"><span className="ah-chip-dot"></span>Aubervilliers (93)</span>
            <span className="ah-chip"><span className="ah-chip-dot"></span>Devis sous 24h</span>
          </div>
        </div>
        <div className="about-hero-right reveal delay-2">
          <div className="about-year-display">
            <span className="about-year-num">1999</span>
            <div className="about-year-label">Depuis notre création</div>
            <div className="about-year-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*── STATS DARK ── */}
  <section className="stats-section">
    <div className="container" style={{position: 'relative', zIndex: '1'}}>
      <div className="section-header reveal">
        <div className="section-tag">✦ 2F en chiffres</div>
        <h2 className="section-title">25 ans d'expertise,<br />des résultats concrets</h2>
      </div>
      <div className="stats-row-4">
        <div className="stat-box-sm reveal delay-1"><span className="stat-num" data-target="25" data-suffix="+">25+</span><div className="stat-name">Ans d'expérience</div></div>
        <div className="stat-box-sm reveal delay-2"><span className="stat-num" data-target="300" data-suffix="m²">300m²</span><div className="stat-name">D'ateliers</div></div>
        <div className="stat-box-sm reveal delay-3"><span className="stat-num" data-target="10" data-suffix="k+">10k+</span><div className="stat-name">Projets réalisés</div></div>
        <div className="stat-box-sm reveal delay-4"><span className="stat-num" data-target="100" data-suffix="%">100%</span><div className="stat-name">Fabrication France</div></div>
      </div>
    </div>
  </section>

  {/*── NOTRE ADN ── */}
  <section className="about-adn">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Notre ADN</div>
        <h2 className="section-title">Trois piliers, une promesse</h2>
        <p className="section-sub">Ce qui fait la différence depuis 25 ans.</p>
      </div>
      <div className="about-adn-grid">
        <div className="adn-pilier reveal delay-1">
          <span className="adn-num">01</span>
          <div className="adn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /><path d="M12 8v4l3 3" /></svg>
          </div>
          <h3 className="adn-title">Réactivité sans égale</h3>
          <p className="adn-desc">Devis sous 24h, production express possible. Votre projet n'attend pas — nous non plus. Un interlocuteur dédié, joignable, qui répond.</p>
        </div>
        <div className="adn-pilier reveal delay-2">
          <span className="adn-num">02</span>
          <div className="adn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <h3 className="adn-title">Maîtrise de bout en bout</h3>
          <p className="adn-desc">Conseil, création graphique, fabrication, pose, livraison. Tout sous un même toit, sans sous-traitance cachée. Vous savez exactement ce qu'il se passe.</p>
        </div>
        <div className="adn-pilier reveal delay-3">
          <span className="adn-num">03</span>
          <div className="adn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </div>
          <h3 className="adn-title">Partenariat durable</h3>
          <p className="adn-desc">On ne cherche pas à vendre une commande, on cherche à construire une relation. Plus de 80 % de nos clients reviennent. La confiance, ça se mérite — et ça s'entretient.</p>
        </div>
      </div>
    </div>
  </section>

  {/*── CITATION FONDATEUR ── */}
  <section style={{padding: '80px 0', background: 'var(--white)', borderTop: '1px solid rgba(0,0,0,0.06)'}}>
    <div className="container">
      <div className="reveal" style={{maxWidth: '860px', margin: '0 auto', textAlign: 'center'}}>
        <svg viewBox="0 0 48 36" fill="none" style={{width: '48px', height: '36px', margin: '0 auto 28px', display: 'block'}} aria-hidden="true">
          <path d="M0 36V22.5C0 14.1 5.1 7.2 15.3 1.8L18 6C13.2 8.6 10.2 11.8 9 15.6h6V36H0zm26 0V22.5C26 14.1 31.1 7.2 41.3 1.8L44 6c-4.8 2.6-7.8 5.8-9 9.6h6V36H26z" fill="url(#quote-grad)" />
          <defs>
            <linearGradient id="quote-grad" x1="0" y1="0" x2="44" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--brand)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        <blockquote style={{fontFamily: '\'Red Hat Display\',sans-serif', fontSize: 'clamp(18px,2.4vw,26px)', fontWeight: '500', lineHeight: '1.6', letterSpacing: '-0.01em', color: 'var(--text-main)', margin: '0 0 36px', fontStyle: 'italic'}}>
          « Depuis le premier jour, notre mission est simple&nbsp;: fabriquer nous-mêmes, sans intermédiaire, pour garantir une qualité et une réactivité que personne d'autre ne peut offrir en Île-de-France.&nbsp;»
        </blockquote>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
          <div style={{width: '40px', height: '2px', background: 'var(--gradient)', borderRadius: '2px', marginBottom: '12px'}}></div>
          <span style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '15px', fontWeight: '400', color: 'var(--text-main)', textTransform: 'uppercase'}}>Le fondateur, 2F Publicité</span>
          <span style={{fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', letterSpacing: '0.03em'}}>Aubervilliers · Depuis 1999</span>
        </div>
      </div>
    </div>
  </section>

  {/*── HISTOIRE ── */}
  <section className="histoire-v2">
    <div className="container">

      {/*HEADER CENTRÉ */}
      <div className="reveal" style={{textAlign: 'center', marginBottom: '72px'}}>
        <div className="section-tag" style={{marginBottom: '20px'}}>✦ Notre histoire</div>
        <h2 className="section-title" style={{maxWidth: '480px', margin: '0 auto 20px'}}>Nés à Aubervilliers,<br />présents partout<br />en France</h2>
        <p style={{fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7'}}>Depuis 1999, nous accompagnons les professionnels dans leur communication visuelle. Une histoire d'artisanat, de passion et de croissance.</p>
      </div>

      {/*STATS BAND */}
      <div className="reveal" style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(0,0,0,0.07)', borderRadius: '20px', overflow: 'hidden', marginBottom: '72px'}}>
        <div style={{background: '#fff', padding: '32px 24px', textAlign: 'center'}}>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: '400', lineHeight: '1', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px'}}>25+</div>
          <div style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Ans d'expérience</div>
        </div>
        <div style={{background: '#fff', padding: '32px 24px', textAlign: 'center'}}>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: '400', lineHeight: '1', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px'}}>300m²</div>
          <div style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>D'ateliers</div>
        </div>
        <div style={{background: '#fff', padding: '32px 24px', textAlign: 'center'}}>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: '400', lineHeight: '1', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px'}}>10k+</div>
          <div style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Projets réalisés</div>
        </div>
        <div style={{background: '#fff', padding: '32px 24px', textAlign: 'center'}}>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(36px,4vw,52px)', fontWeight: '400', lineHeight: '1', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px'}}>100%</div>
          <div style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Fabrication France</div>
        </div>
      </div>

      {/*TIMELINE HORIZONTALE */}
      <div className="histoire-timeline-wrap">
        <div className="histoire-tl-line"></div>
        <div className="histoire-tl-items">

          <div className="histoire-tl-item reveal">
            <div className="histoire-tl-year">1999</div>
            <div className="histoire-tl-dot"></div>
            <div className="histoire-tl-card">
              <div className="histoire-tl-card-title">Création de l'agence</div>
              <p className="histoire-tl-card-desc">70 m² à Aubervilliers. Spécialisation enseigne & vitrophanie pour le BTP et la restauration.</p>
            </div>
          </div>

          <div className="histoire-tl-item reveal delay-1">
            <div className="histoire-tl-year">2006</div>
            <div className="histoire-tl-dot"></div>
            <div className="histoire-tl-card">
              <div className="histoire-tl-card-title">1 000ème enseigne</div>
              <p className="histoire-tl-card-desc">Cap symbolique franchi — référence incontournable en Île-de-France.</p>
            </div>
          </div>

          <div className="histoire-tl-item reveal delay-2">
            <div className="histoire-tl-year">2012</div>
            <div className="histoire-tl-dot"></div>
            <div className="histoire-tl-card">
              <div className="histoire-tl-card-title">150 m² & véhicules</div>
              <p className="histoire-tl-card-desc">Extension des ateliers et lancement du marquage & flocage véhicule.</p>
            </div>
          </div>

          <div className="histoire-tl-item reveal delay-3">
            <div className="histoire-tl-year">2018</div>
            <div className="histoire-tl-dot"></div>
            <div className="histoire-tl-card">
              <div className="histoire-tl-card-title">300 m² — 10 000 projets</div>
              <p className="histoire-tl-card-desc">Nouveau palier d'espace et 10 000 projets livrés partout en France.</p>
            </div>
          </div>

          <div className="histoire-tl-item reveal delay-4">
            <div className="histoire-tl-year">2023</div>
            <div className="histoire-tl-dot"></div>
            <div className="histoire-tl-card">
              <div className="histoire-tl-card-title">Naissance de 2F Publicité</div>
              <p className="histoire-tl-card-desc">Nouvelle direction, nouveau nom — ouverts à tous les secteurs.</p>
            </div>
          </div>

          <div className="histoire-tl-item reveal delay-4">
            <div className="histoire-tl-year">2024</div>
            <div className="histoire-tl-dot histoire-tl-dot--active"></div>
            <div className="histoire-tl-card histoire-tl-card--active">
              <div className="histoire-tl-card-title">Lauréats Réseau Entreprendre 93</div>
              <p className="histoire-tl-card-desc">Distinction récompensant l'entrepreneuriat local et la croissance de l'agence.</p>
            </div>
          </div>

        </div>
      </div>

      {/*ADRESSE */}
      <div className="reveal" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '56px', fontSize: '14px', color: 'var(--text-secondary)'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
        217, Av. Jean Jaurès — 93300 Aubervilliers
        <span style={{width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)'}}></span>
        <a href="tel:0143522424" style={{fontWeight: '700', color: 'var(--text-main)', textDecoration: 'none'}}>01 43 52 24 24</a>
      </div>

    </div>
  </section>

  {/*── ÉQUIPE ── */}
  <section className="equipe">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Notre équipe</div>
        <h2 className="section-title">Des experts à votre service</h2>
        <p className="section-sub">Une équipe passionnée qui met tout son savoir-faire au service de votre visibilité.</p>
      </div>
      <div className="equipe-grid">
        <div className="team-card reveal delay-1">
          <div className="team-avatar-wrap">
            <div className="team-avatar-bg" style={{background: '#111'}}>
              <img src="/photos-equipe/equipe-direction.png" alt="Direction 2F Publicité" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
            </div>
            <div className="team-avatar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
          </div>
          <div className="team-stripe"></div>
          <div className="team-info">
            <div className="team-name">Direction</div>
            <div className="team-role">Fondateur & Gérant</div>
            <p className="team-bio">À la tête de 2F Publicité depuis 1999. Une vision claire : accompagner les entreprises avec des solutions visuelles qui font la différence, à chaque commande.</p>
          </div>
        </div>
        <div className="team-card reveal delay-2">
          <div className="team-avatar-wrap">
            <div className="team-avatar-bg" style={{background: '#111'}}>
              <img src="/photos-equipe/equipe-studio-creation.jpeg" alt="Studio Création" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
            </div>
            <div className="team-avatar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
            </div>
          </div>
          <div className="team-stripe"></div>
          <div className="team-info">
            <div className="team-name">Studio Création</div>
            <div className="team-role">Designers graphiques</div>
            <p className="team-bio">Notre équipe créative transforme vos idées en visuels percutants. Maîtrise de tous les formats : print, covering, enseigne, broderie numérique.</p>
          </div>
        </div>
        <div className="team-card reveal delay-3">
          <div className="team-avatar-wrap">
            <div className="team-avatar-bg" style={{background: '#111'}}>
              <img src="/photos-equipe/equipe-atelier-production.jpeg" alt="Atelier Production" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
            </div>
            <div className="team-avatar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
            </div>
          </div>
          <div className="team-stripe"></div>
          <div className="team-info">
            <div className="team-name">Atelier Production</div>
            <div className="team-role">Techniciens & Poseurs</div>
            <p className="team-bio">Les artisans qui donnent vie à vos projets. Impression grand format, découpe, pose vinyle, broderie — chaque réalisation est traitée avec précision.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*── ATELIER DÉFILANT ── */}
  <section style={{padding: '88px 0 0', background: 'var(--gray-light)', overflow: 'hidden'}}>
    <div className="container">
      <div className="section-header reveal" style={{textAlign: 'center', marginBottom: '52px'}}>
        <div className="section-tag">✦ Notre atelier</div>
        <h2 className="section-title">100% production interne</h2>
        <p className="section-sub">Broderie, flocage, impression, découpe, pose — tout se passe ici, à Aubervilliers. Pas d'intermédiaire, pas de sous-traitance.</p>
      </div>
    </div>
    {/*Row unique */}
    <div style={{overflow: 'hidden', paddingBottom: '80px'}}>
      <div style={{display: 'flex', gap: '16px', width: 'max-content', animation: 'marquee 40s linear infinite'}}>
        <div style={{flexShrink: '0', width: '380px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-front.jpeg" alt="Façade atelier 2F" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '320px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-back.jpeg" alt="Intérieur atelier" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '340px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-back-2.jpeg" alt="Atelier production" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '300px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/machine-broderie.jpg" alt="Machine broderie" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '320px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/machine-flocage.jpg" alt="Machine flocage" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '360px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/imprimante-front.jpeg" alt="Imprimante grand format" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '300px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/tracer-front.jpeg" alt="Traceur découpe" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '380px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/fond-covering.png" alt="Zone covering véhicules" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        {/*duplicate pour loop infini */}
        <div style={{flexShrink: '0', width: '380px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-front.jpeg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '320px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-back.jpeg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '340px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/atelier-back-2.jpeg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '300px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/machine-broderie.jpg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '320px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/machine-flocage.jpg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '360px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/imprimante-front.jpeg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '300px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/tracer-front.jpeg" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        <div style={{flexShrink: '0', width: '380px', height: '260px', borderRadius: '16px', overflow: 'hidden'}}><img loading="lazy" src="/photos-atelier/fond-covering.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
      </div>
    </div>
  </section>

  {/*── VALEURS ── */}
  <section className="valeurs">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Nos valeurs</div>
        <h2 className="section-title">Ce qui nous guide chaque jour</h2>
        <p className="section-sub">Des valeurs ancrées depuis notre création.</p>
      </div>
      <div className="valeurs-grid">
        <div className="valeur-card reveal delay-1">
          <div className="valeur-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></svg>
          </div>
          <h3 className="valeur-title">Qualité sans compromis</h3>
          <p className="valeur-desc">Chaque commande est traitée avec la même exigence. Nos matériaux sont sélectionnés pour leur durabilité et leur rendu visuel impeccable.</p>
        </div>
        <div className="valeur-card reveal delay-2">
          <div className="valeur-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <h3 className="valeur-title">Réactivité</h3>
          <p className="valeur-desc">Devis sous 24h, production express si besoin. Nous savons que votre temps est précieux et que les délais comptent dans votre activité.</p>
        </div>
        <div className="valeur-card reveal delay-3">
          <div className="valeur-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#adn-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <h3 className="valeur-title">Relation de confiance</h3>
          <p className="valeur-desc">Un seul interlocuteur dédié pour tous vos projets. On construit une relation sur le long terme — pas une simple transaction.</p>
        </div>
      </div>
    </div>
  </section>

  {/*── CTA ── */}
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
