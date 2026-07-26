// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps, setCovTab, toggleFaq } from "../../../lib/interactions";
import { useEffect } from "react";

export default function FicheCoveringPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-fiche-covering">


  {/*Breadcrumb */}
  <div className="fiche-breadcrumb">
    <div className="container" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <Link href="/">Accueil</Link>
      <span className="sep">›</span>
      <Link href="/services">Nos services</Link>
      <span className="sep">›</span>
      <span className="current">Covering & Marquage véhicule</span>
    </div>
  </div>

  {/*HERO */}
  <section className="fiche-hero">
    <div className="fiche-hero-blob"></div>
    <div className="fiche-hero-blob2"></div>
    <div className="container">
      <div className="fiche-hero-grid">
        <div className="reveal">
          <div className="fiche-kicker"><span className="k-dot"></span>Covering · Marquage · Vitrophanie</div>
          <h1>Vos véhicules,<br /><span className="gradient-text">votre pub en mouvement</span></h1>
          <p className="fiche-hero-desc">Du simple adhésif découpe au semi-covering total — transformez votre flotte en support publicitaire mobile. Pose réalisée dans notre atelier à Aubervilliers, sur tous types de véhicules professionnels.</p>
          <div className="fiche-hero-ctas">
            <Link className="btn-primary" href="/devis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              Demander un devis
            </Link>
            <a className="btn-outline-svc" onClick={(e) => { document.getElementById('cov-tarifs').scrollIntoView({behavior:'smooth',block:'start'}) } }>Voir les tarifs →</a>
          </div>
          <div className="fiche-hero-meta">
            <div><strong>5</strong><span>types de véhicules</span></div>
            <div><strong>4</strong><span>techniques</span></div>
            <div><strong>48h</strong><span>délai de devis</span></div>
            <div><strong>Pose</strong><span>en atelier Aubervilliers</span></div>
          </div>
        </div>
        {/*Visuel hero */}
        <div className="fiche-visual reveal" style={{background: 'linear-gradient(160deg,#0a1628,#1A3A7A,#0D2B6E)', overflow: 'hidden'}}>
          <img loading="lazy" src="/fond covering.png" alt="Covering véhicule 2F Publicité" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', opacity: '0.85'}} onError={(e) => { e.currentTarget.style.display='none' } } />
          <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(to bottom,transparent 50%,rgba(10,22,40,0.7))', zIndex: '1'}}></div>
          <div style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: '5'}}>
            <span style={{fontSize: '12px', fontWeight: '600', color: 'white'}}>Pose en atelier Aubervilliers</span>
          </div>
          <div style={{position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: '5', whiteSpace: 'nowrap'}}>
            <span style={{padding: '5px 12px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', color: 'white', letterSpacing: '.06em', textTransform: 'uppercase'}}>Découpe · Impression · Semi-Covering</span>
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
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><line x1="10" y1="6" x2="14" y2="6" /><line x1="10" y1="10" x2="14" y2="10" /><line x1="10" y1="14" x2="14" y2="14" /><line x1="10" y1="18" x2="14" y2="18" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Pose en atelier</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Maîtrisée par nos poseurs Aubervilliers</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Impression HD</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Couleurs vives, résistance UV garantie</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Tous véhicules</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Voiture, utilitaire, camion, vitrine</div>
        </div>
        <div style={{padding: '20px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '14px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
          <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '16px', color: 'var(--text-main)', marginBottom: '4px', textTransform: 'uppercase'}}>Prix clairs</div>
          <div style={{fontSize: '13.5px', color: 'var(--text-secondary)'}}>Tarifs fixes par véhicule, sans surprise</div>
        </div>
      </div>
    </div>
  </div>

  {/*TECHNIQUES */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '60px'}} className="reveal">
        <div className="section-tag">✦ Nos 4 techniques</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>La bonne technique<br />pour chaque budget</h2>
        <p style={{marginTop: '16px', fontSize: '17.5px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Du marquage sobre au covering complet — on adapte la solution à votre image, votre flotte et votre budget.</p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px'}} className="reveal">
        {/*Technique 1 */}
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg,#0a1628,#1A3A7A)', overflow: 'hidden'}}>
            <img loading="lazy" src="/mockup-decoupe.jpg" alt="Pub Adhésif Découpe" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display='none' } } />
            <div style={{position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: '0.5'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span style={{fontSize: '11px', color: 'white', fontWeight: '400', fontFamily: '\'Righteous\',sans-serif', textTransform: 'uppercase'}}>mockup-decoupe.jpg</span>
            </div>
          </div>
          <div style={{padding: '24px 28px 28px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Pub Adhésif Découpe</h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.65'}}>Vinyle découpé monochrome appliqué directement sur la carrosserie. Sans fond, idéal pour textes, logos et formes simples. Sobre et efficace.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Sans fond</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>1 couleur / multicolore</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>À partir de 280€</span>
            </div>
          </div>
        </div>
        {/*Technique 2 */}
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg,#0D2B6E,var(--brand))', overflow: 'hidden'}}>
            <img loading="lazy" src="/mockup-impression.jpg" alt="Pub Adhésif & Impression" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display='none' } } />
            <div style={{position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: '0.5'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span style={{fontSize: '11px', color: 'white', fontWeight: '400', fontFamily: '\'Righteous\',sans-serif', textTransform: 'uppercase'}}>mockup-impression.jpg</span>
            </div>
          </div>
          <div style={{padding: '24px 28px 28px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Pub Adhésif & Impression</h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.65'}}>Impression numérique haute définition sur vinyle. Photos, dégradés, illustrations multicolores. Rendu professionnel sur véhicule léger.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Images & photos</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Multicolore HD</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>À partir de 540€</span>
            </div>
          </div>
        </div>
        {/*Technique 3 */}
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg,#1a1230,#4B21A0)', overflow: 'hidden'}}>
            <img loading="lazy" src="/mockup-3panneaux.jpg" alt="Pub 3 Panneaux" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display='none' } } />
            <div style={{position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: '0.5'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span style={{fontSize: '11px', color: 'white', fontWeight: '400', fontFamily: '\'Righteous\',sans-serif', textTransform: 'uppercase'}}>mockup-3panneaux.jpg</span>
            </div>
          </div>
          <div style={{padding: '24px 28px 28px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Pub 3 Panneaux</h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.65'}}>Covering des 3 faces principales (2 côtés + arrière) en impression multicolore. Couverture maximale pour utilitaires, forte visibilité urbaine.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Images, multicouleurs</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>3 faces couvertes</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>À partir de 470€</span>
            </div>
          </div>
        </div>
        {/*Technique 4 */}
        <div style={{background: 'var(--gray-light)', borderRadius: '20px', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)'}}>
          <div style={{position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg,#0a0a1a,var(--accent))', overflow: 'hidden'}}>
            <img loading="lazy" src="/mockup-semicovering.jpg" alt="Pub Semi-Covering" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display='none' } } />
            <div style={{position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: '0.5'}}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span style={{fontSize: '11px', color: 'white', fontWeight: '400', fontFamily: '\'Righteous\',sans-serif', textTransform: 'uppercase'}}>mockup-semicovering.jpg</span>
            </div>
          </div>
          <div style={{padding: '24px 28px 28px'}}>
            <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Pub Semi-Covering</h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.65'}}>Couverture totale ou partielle de la carrosserie en vinyle imprimé. Résultat spectaculaire, transformation complète du véhicule. Notre offre la plus impactante.</p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Images, multicouleurs</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>Impact maximal</span>
              <span style={{padding: '4px 10px', background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', borderRadius: '50px', fontSize: '12px', fontWeight: '600'}}>À partir de 890€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*TARIFS PAR VÉHICULE */}
  <section id="cov-tarifs" style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div style={{maxWidth: '680px', marginBottom: '48px'}} className="reveal">
        <div className="section-tag">✦ Tarifs</div>
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Prix par type de véhicule</h2>
        <p style={{marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Tous les tarifs sont HT, pose en atelier incluse. Sélectionnez votre véhicule pour afficher les prix.</p>
      </div>

      {/*Tabs véhicules */}
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px'}} id="covTabs">
        <button className="cov-tab active" data-cov="voiture" onClick={(e) => { setCovTab('voiture') } }>Voiture</button>
        <button className="cov-tab" data-cov="kangoo" onClick={(e) => { setCovTab('kangoo') } }>Kangoo / Berlingo</button>
        <button className="cov-tab" data-cov="trafic" onClick={(e) => { setCovTab('trafic') } }>Trafic / Vito</button>
        <button className="cov-tab" data-cov="sprinter" onClick={(e) => { setCovTab('sprinter') } }>Sprinter / Master</button>
        <button className="cov-tab" data-cov="caisse" onClick={(e) => { setCovTab('caisse') } }>20m3</button>
      </div>

      {/*Panel Voiture */}
      <div className="cov-panel" id="cov-voiture">
        <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
          <div style={{padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '18px', textTransform: 'uppercase'}}>Voiture</div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px'}}>Berline, break, SUV — tarifs à partir de</div>
            </div>
            <span style={{background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '700'}}>Pose incluse</span>
          </div>
          <div style={{padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px'}}>
            <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '22px', textAlign: 'center'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Adhésif Découpe</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Sans fond</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--blue)text-transform:uppercase'}}>280 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
            <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '22px', textAlign: 'center'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Adhésif & Impression</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Images, multicouleurs</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--blue)text-transform:uppercase'}}>540 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
            <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.06),rgba(43,106,239,0.06))', borderRadius: '14px', padding: '22px', textAlign: 'center', border: '1.5px solid rgba(43,106,239,0.12)'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Semi-Covering</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Images, multicouleurs</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--violet)text-transform:uppercase'}}>890 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
          </div>
          <div style={{padding: '20px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarif flotte dès 3 véhicules · Devis sous 48h</span>
            <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
          </div>
        </div>
      </div>

      {/*Panel Kangoo */}
      <div className="cov-panel" id="cov-kangoo" style={{display: 'none'}}>
        <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
          <div style={{padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '18px', textTransform: 'uppercase'}}>Kangoo / Berlingo</div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px'}}>Petit utilitaire compact</div>
            </div>
            <span style={{background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '700'}}>Pose incluse</span>
          </div>
          <div style={{padding: '28px 32px'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px'}}>
              {/*Adhésif Découpe */}
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Adhésif Découpe</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>310 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>370 €</span></div>
              </div>
              {/*3 Panneaux */}
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>3 Panneaux</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>470 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>510 €</span></div>
              </div>
              {/*Semi-Covering */}
              <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.06),rgba(43,106,239,0.06))', borderRadius: '14px', padding: '20px', border: '1.5px solid rgba(43,106,239,0.12)'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Semi-Covering</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>950 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>1 090 €</span></div>
              </div>
            </div>
            <div style={{marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)'}}>* L1 = version courte · L2 = version longue — Tous tarifs HT, pose en atelier incluse</div>
          </div>
          <div style={{padding: '20px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarif flotte dès 3 véhicules · Devis sous 48h</span>
            <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
          </div>
        </div>
      </div>

      {/*Panel Trafic */}
      <div className="cov-panel" id="cov-trafic" style={{display: 'none'}}>
        <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
          <div style={{padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '18px', textTransform: 'uppercase'}}>Trafic / Vito</div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px'}}>Fourgon moyen, vitrophanie</div>
            </div>
            <span style={{background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '700'}}>Pose incluse</span>
          </div>
          <div style={{padding: '28px 32px'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px'}}>
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Adhésif Découpe</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>370 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>420 €</span></div>
              </div>
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>3 Panneaux</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>490 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>580 €</span></div>
              </div>
              <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.06),rgba(43,106,239,0.06))', borderRadius: '14px', padding: '20px', border: '1.5px solid rgba(43,106,239,0.12)'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Semi-Covering</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>1 310 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>1 460 €</span></div>
              </div>
            </div>
            <div style={{marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)'}}>* L1 = version courte · L2 = version longue — Tous tarifs HT, pose en atelier incluse</div>
          </div>
          <div style={{padding: '20px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarif flotte dès 3 véhicules · Devis sous 48h</span>
            <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
          </div>
        </div>
      </div>

      {/*Panel Sprinter */}
      <div className="cov-panel" id="cov-sprinter" style={{display: 'none'}}>
        <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
          <div style={{padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '18px', textTransform: 'uppercase'}}>Sprinter / Master</div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px'}}>Grand utilitaire, fourgon L3H2</div>
            </div>
            <span style={{background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '700'}}>Pose incluse</span>
          </div>
          <div style={{padding: '28px 32px'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px'}}>
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Adhésif Découpe</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>460 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>520 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L3</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>580 €</span></div>
              </div>
              <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '20px'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>3 Panneaux</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>620 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>740 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L3</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--blue)text-transform:uppercase'}}>950 €</span></div>
              </div>
              <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.06),rgba(43,106,239,0.06))', borderRadius: '14px', padding: '20px', border: '1.5px solid rgba(43,106,239,0.12)'}}>
                <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.07)'}}>Semi-Covering</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L1</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>1 630 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L2</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>1 740 €</span></div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>L3</span><span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '17px', color: 'var(--violet)text-transform:uppercase'}}>2 100 €</span></div>
              </div>
            </div>
            <div style={{marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)'}}>* L1 = court · L2 = standard · L3 = long — Tous tarifs HT, pose en atelier incluse</div>
          </div>
          <div style={{padding: '20px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarif flotte dès 3 véhicules · Devis sous 48h</span>
            <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
          </div>
        </div>
      </div>

      {/*Panel Caisse 20m3 */}
      <div className="cov-panel" id="cov-caisse" style={{display: 'none'}}>
        <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden'}}>
          <div style={{padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'}}>
            <div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '18px', textTransform: 'uppercase'}}>Caisse 20m3</div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px'}}>Grand fourgon, camion porteur — tarifs à partir de</div>
            </div>
            <span style={{background: 'rgba(43,106,239,0.08)', color: 'var(--blue)', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '700'}}>Pose incluse</span>
          </div>
          <div style={{padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px'}}>
            <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '22px', textAlign: 'center'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Adhésif Découpe</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Sans fond</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--blue)text-transform:uppercase'}}>790 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
            <div style={{background: 'var(--gray-light)', borderRadius: '14px', padding: '22px', textAlign: 'center'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Adhésif & Impression</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Images, multicouleurs</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--blue)text-transform:uppercase'}}>1 130 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
            <div style={{background: 'linear-gradient(135deg,rgba(43,106,239,0.06),rgba(43,106,239,0.06))', borderRadius: '14px', padding: '22px', textAlign: 'center', border: '1.5px solid rgba(43,106,239,0.12)'}}>
              <div style={{fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px'}}>Pub Complète Côtés</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px'}}>Couverture totale</div>
              <div style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '24px', color: 'var(--violet)text-transform:uppercase'}}>1 490 €</div>
              <div style={{fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px'}}>HT · à partir de</div>
            </div>
          </div>
          <div style={{padding: '20px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Tarif flotte dès 3 véhicules · Devis sous 48h</span>
            <Link href="/devis" className="btn-primary" style={{padding: '12px 26px', fontSize: '15px'}}>Demander un devis →</Link>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*GALERIE */}
  <section style={{padding: '96px 0', background: '#fff'}}>
    <div className="container">
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '48px', flexWrap: 'wrap'}} className="reveal">
        <div>
          <div className="section-tag" style={{marginBottom: '12px'}}>✦ Réalisations</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Nos réalisations<br />covering</h2>
        </div>
        <Link className="btn-outline-svc" href="/realisations">Voir toutes les réalisations →</Link>
      </div>
      <div className="fiche-gallery-grid reveal">
        <div className="fiche-tile fiche-tile-tall" style={{"--tbg": 'linear-gradient(135deg,#0A1628,var(--brand))', "--ang": '35deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Covering total · Flotte BTP</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0D2B6E,var(--brand))', "--ang": '-25deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Semi-covering · Livraison</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#1A3A7A,var(--accent))', "--ang": '60deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Lettrage adhésif · Artisan</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,var(--brand),var(--accent))', "--ang": '0deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Covering total · Restauration</span></div></div>
        <div className="fiche-tile" style={{"--tbg": 'linear-gradient(135deg,#0D1B3E,#2B6AEF)', "--ang": '75deg'}}><div className="fiche-tile-inner"></div><div className="t-overlay"></div><div className="t-meta"><span className="t-cat">Vitrophanie · Commerce</span></div></div>
      </div>
    </div>
  </section>

  {/*PROCESSUS */}
  <section className="process">
    <div className="container">
      <div className="section-header reveal">
        <div className="section-tag">✦ Comment ça marche</div>
        <h2 className="section-title">De la conception à la pose</h2>
        <p className="section-sub">Devis, BAT, impression, pose — on gère tout de A à Z dans notre atelier.</p>
      </div>
      <div className="process-row">
        <div className="process-line"></div>
        <div className="p-step reveal delay-1"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg></div><span className="p-num">1</span></div><h3 className="p-title">Devis en ligne</h3><p className="p-desc">Remplissez le formulaire — type de véhicule, technique, quantité. Réponse sous 48h.</p></div>
        <div className="p-step reveal delay-2"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg></div><span className="p-num">2</span></div><h3 className="p-title">Validation du BAT</h3><p className="p-desc">Maquette sur le gabarit de votre véhicule. Vous validez avant toute impression.</p></div>
        <div className="p-step reveal delay-3"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg></div><span className="p-num">3</span></div><h3 className="p-title">Impression & découpe</h3><p className="p-desc">Production sur traceurs grand format. Vinyle certifié UV, résistant aux intempéries.</p></div>
        <div className="p-step reveal delay-4"><div className="p-circle"><div className="p-circle-inner"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div><span className="p-num">4</span></div><h3 className="p-title">Pose en atelier</h3><p className="p-desc">Vos véhicules posés par nos techniciens à Aubervilliers. Résultat impeccable, sans bulle.</p></div>
      </div>
    </div>
  </section>

  {/*FAQ */}
  <section style={{padding: '96px 0', background: 'var(--gray-light)'}}>
    <div className="container">
      <div className="fiche-faq-grid">
        <div className="reveal">
          <div className="section-tag" style={{marginBottom: '16px'}}>✦ FAQ</div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Vos questions<br />sur le covering</h2>
          <p style={{marginTop: '20px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65'}}>Technique, délais, pose — on répond à tout.</p>
          <a href="https://wa.me/33615147464" target="_blank" style={{marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '13px 24px', borderRadius: 'var(--radius-pill)', background: '#25D366', color: 'white', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '15px', textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,211,102,0.35)', transition: 'all .22s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='#1ebe5d';e.currentTarget.style.transform='translateY(-2px)' } } onMouseOut={(e) => { e.currentTarget.style.background='#25D366';e.currentTarget.style.transform='translateY(0)' } }><svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px', flexShrink: '0'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>Poser une question</a>
        </div>
        <div className="fiche-faq-list reveal">
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Combien de temps dure la pose d'un covering ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Comptez entre 2h et une journée selon la surface couverte. Un adhésif découpe simple prend 2 à 3h. Un semi-covering complet peut nécessiter une journée entière. Votre véhicule vous est rendu le jour même ou le lendemain.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Le covering abîme-t-il la peinture du véhicule ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Non, au contraire : le vinyle protège la peinture d'origine des UV, micro-rayures et intempéries. À la dépose, la peinture est préservée. Nos techniciens utilisent des produits et techniques adaptés pour ne laisser aucune trace.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Quelle est la durée de vie d'un covering ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Le vinyle de marquage a une durée de vie de 4 à 7 ans selon l'exposition au soleil. Les couleurs restent vives et les adhésifs tiennent parfaitement sur la durée. Un entretien régulier (lavage à la main ou haute pression douce) suffit.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Puis-je apporter mon propre design ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Oui, parfaitement. Fournissez vos fichiers en haute résolution (AI, PDF vectoriel ou EPS) et nos équipes adaptent le gabarit à votre véhicule. Si vous n'avez pas de fichier, notre studio crée votre design depuis zéro sur devis.</div></div>
          </div>
          <div className="fiche-faq-item">
            <button className="fiche-faq-q" onClick={(e) => { toggleFaq(e.currentTarget) } }>
              <span className="fiche-faq-q-text">Avez-vous des tarifs dégressifs pour une flotte ?</span>
              <span className="fiche-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></span>
            </button>
            <div className="fiche-faq-a"><div className="fiche-faq-a-inner">Oui, tarifs dégressifs à partir de 3 véhicules. Plus la flotte est importante, plus le coût unitaire diminue. Contactez-nous pour un devis flotte personnalisé avec simulation de prix.</div></div>
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
        <h2 style={{marginTop: '16px', fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: '400', letterSpacing: '-0.022em', textTransform: 'uppercase'}}>Complétez votre image</h2>
      </div>
      <div className="fiche-related-grid reveal">
        <div className="fiche-related-card" href="/fiches/textile">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-vetements.jpg" alt="Textile pro" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Textile pro</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Vêtements personnalisés</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Broderie et flocage pour habiller vos équipes.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/enseignes">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-enseignes.jpg" alt="Enseignes lumineuses" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Signalétique</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Enseignes lumineuses</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Boîtes lumineuses, lettres découpées, néons LED.</p></div>
        </div>
        <div className="fiche-related-card" href="/fiches/impression">
          <div style={{height: '160px', position: 'relative', overflow: 'hidden'}}><img loading="lazy" src="/photos-services/service-impression.jpg" alt="Impression" style={{position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover'}} /><div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,transparent 30%,rgba(10,15,30,0.55) 100%)'}}></div></div>
          <div style={{padding: '20px'}}><div style={{fontSize: '11px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '8px'}}>Impression</div><h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '6px', textTransform: 'uppercase'}}>Flyers & supports print</h3><p style={{fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>Affiches, kakémonos, stickers — livrés partout en France.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*CTA FINAL */}
  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Besoin d'un marquage ?<br />Parlons-en autour d'un café.</h2>
          <p className="cta-card-sub">Passez à l'atelier au 217 av. Jean Jaurès, Aubervilliers, ou envoyez-nous vos gabarits — devis chiffré sous 48h, tarif flotte dès 3 véhicules.</p>
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
