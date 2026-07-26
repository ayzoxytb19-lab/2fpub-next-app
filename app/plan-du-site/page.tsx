// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps } from "../../lib/interactions";
import { useEffect } from "react";

export default function PlanPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-plan">

  <section style={{background: 'var(--dark)', minHeight: '100vh', padding: '120px 0 80px'}}>
    <div className="container" style={{maxWidth: '860px'}}>
      <button onClick={(e) => { history.back() } } style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: '\'Righteous\',sans-serif', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', marginBottom: '48px', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.1)' } } onMouseOut={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)' } }>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg> Retour
      </button>
      <h1 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: '400', color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', textTransform: 'uppercase'}}>Plan <span style={{color: 'rgba(255,255,255,0.65)'}}>du site</span></h1>
      <div style={{width: '60px', height: '3px', background: 'var(--gradient)', borderRadius: '2px', marginBottom: '48px'}}></div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '32px'}}>
        <div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px'}}>Pages principales</h2>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><Link href="/" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Accueil</Link></li>
            <li><Link href="/services" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Nos services</Link></li>
            <li><Link href="/realisations" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Réalisations</Link></li>
            <li><Link href="/a-propos" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>À propos</Link></li>
            <li><Link href="/devis" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Demande de devis</Link></li>
          </ul>
        </div>
        <div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px'}}>Fiches produit</h2>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><Link href="/fiches/textile" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Textile professionnel</Link></li>
            <li><Link href="/fiches/enseignes" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Enseignes lumineuses</Link></li>
            <li><Link href="/fiches/vitrophanies" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Vitrophanies</Link></li>
            <li><Link href="/fiches/plaques-panneaux" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Plaques & Panneaux</Link></li>
            <li><Link href="/fiches/logo-lumineux" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Logo lumineux</Link></li>
          </ul>
        </div>
        <div>
          <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px'}}>Légal</h2>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <li><Link href="/mentions-legales" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Mentions légales</Link></li>
            <li><Link href="/confidentialite" style={{color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--brand)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.7)' } }><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

    </div>
  );
}
