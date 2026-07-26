// @ts-nocheck
"use client";

import { handleDevisSubmit, initGlobalKeydown, initRevealAndCountUps } from "../../lib/interactions";
import { useEffect } from "react";

export default function DevisPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-devis">


  {/*── HERO BAND + FORMULAIRE ── */}
  <section className="devis-hero-band">
    <div className="container">
      <div className="devis-hero-inner">
        <div className="devis-tag">✦ Devis gratuit</div>
        <h1 className="devis-title">Parlons de votre <span style={{color: 'var(--brand)'}}>projet</span></h1>
        <p className="devis-sub">Remplissez le formulaire — réponse personnalisée sous 24h, sans engagement.</p>
      </div>
    </div>
  </section>

  {/*── FORMULAIRE CENTRÉ ── */}
  <section className="devis-section">
    <div className="devis-form-wrap">
      <div className="devis-card">
        <div id="formWrap">
          <div className="form-title">Votre demande de devis</div>
          <div className="form-sub">Réponse garantie sous 24h.</div>
          {/*╔══════════════════════════════════════════════════════════════╗
               ║  AXOMEDIA — FORMULAIRE DEVIS                               ║
               ║  1. Créez un compte sur formspree.io                       ║
               ║  2. Créez un nouveau formulaire → copiez votre Form ID     ║
               ║  3. Remplacez VOTRE_FORM_ID_ICI dans l'action ci-dessous   ║
               ║  Les soumissions arriveront à l'email lié à ce formulaire  ║
               ╚══════════════════════════════════════════════════════════════╝ */}
          <form id="devisForm" onSubmit={(e) => { handleDevisSubmit(e) } }
                action="https://formspree.io/f/VOTRE_FORM_ID_ICI"
                method="POST">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div className="form-group"><label htmlFor="f-prenom">Prénom</label><input id="f-prenom" type="text" name="prenom" className="form-control" placeholder="Votre prénom" /></div>
              <div className="form-group"><label htmlFor="f-nom">Nom</label><input id="f-nom" type="text" name="nom" className="form-control" placeholder="Votre nom" /></div>
            </div>
            <div className="form-group"><label htmlFor="f-email">Email <span aria-hidden="true">*</span><span className="sr-only">(obligatoire)</span></label><input id="f-email" type="email" name="email" className="form-control" placeholder="vous@entreprise.fr" required aria-required="true" /></div>
            <div className="form-group"><label htmlFor="f-tel">Téléphone</label><input id="f-tel" type="tel" name="telephone" className="form-control" placeholder="06 XX XX XX XX" /></div>
            <div className="form-group"><label htmlFor="f-entreprise">Entreprise</label><input id="f-entreprise" type="text" name="entreprise" className="form-control" placeholder="Nom de votre société" /></div>
            <fieldset className="form-group" style={{border: 'none', padding: '0', margin: '0'}}>
              <legend style={{fontSize: '13.5px', fontWeight: '600', marginBottom: '7px', color: 'var(--text-main)'}}>Service(s) souhaité(s)</legend>
              <div className="services-check">
                <label className="check-item"><input type="checkbox" name="service_covering" value="Covering véhicule" /> Covering véhicule</label>
                <label className="check-item"><input type="checkbox" name="service_textile" value="Textile pro" /> Textile pro</label>
                <label className="check-item"><input type="checkbox" name="service_enseignes" value="Enseignes" /> Enseignes</label>
                <label className="check-item"><input type="checkbox" name="service_impression" value="Impression" /> Impression</label>
              </div>
            </fieldset>
            <div className="form-group"><label htmlFor="f-message">Décrivez votre projet</label><textarea id="f-message" name="message" className="form-control" placeholder="Ex : covering partiel sur 2 véhicules..."></textarea></div>
            <button type="submit" className="btn-submit">Envoyer ma demande →</button>
            <p className="form-note">🔒 Vos données sont confidentielles.</p>
          </form>
        </div>
        <div className="success-msg" id="successMsg">
          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(43,106,239,0.12),rgba(43,106,239,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px'}}>✅</div>
          <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '22px', fontWeight: '400', marginBottom: '10px', color: 'var(--text-main)', textTransform: 'uppercase'}}>Demande bien reçue !</h3>
          <p style={{fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px'}}>Notre équipe a reçu votre demande et reviendra vers vous <strong style={{color: 'var(--text-main)'}}>sous 24h</strong> avec un devis personnalisé.</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', background: 'var(--gray-light)', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--text-secondary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Confirmé par email à l'adresse fournie
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--text-secondary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Réponse sous 24h, lun–ven 9h–18h
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--text-secondary)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Un conseiller dédié pour votre projet
            </div>
          </div>
          <p style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Besoin urgent ? <a href="tel:0143522424" style={{color: 'var(--blue)', fontWeight: '700', textDecoration: 'none'}}>01 43 52 24 24</a></p>
        </div>
      </div>
    </div>
  </section>

  {/*── 4 BADGES ── */}
  {/*── COORDONNÉES DIRECTES ── */}
  <div className="devis-direct-contact">
    <div style={{maxWidth: '660px', margin: '0 auto', padding: '0 20px'}}>
      <div className="devis-direct-inner">
        <a href="tel:0143522424" className="devis-direct-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg>
          01 43 52 24 24
        </a>
        <div className="devis-direct-divider"></div>
        <a href="mailto:contact@2fpub.fr" className="devis-direct-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
          contact@2fpub.fr
        </a>
        <div className="devis-direct-divider"></div>
        <div className="devis-direct-item devis-direct-static">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          217 Av. Jean Jaurès — Aubervilliers
        </div>
        <div className="devis-direct-divider"></div>
        <div className="devis-direct-item devis-direct-static">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          Lun–Ven 9h–18h
        </div>
      </div>
    </div>
  </div>

  <section className="cta-card-wrap">
    <div className="container">
      <div className="cta-card reveal">
        <div className="cta-card-content">
          <h2 className="cta-card-title">Préférez nous appeler<br />directement ?</h2>
          <p className="cta-card-sub">Notre équipe est disponible du lundi au vendredi, 9h–18h. On répond vite et on parle vrai.</p>
        </div>
        <div className="cta-card-btns">
          <a href="tel:0143522424" className="btn-cta-phone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" /></svg> 01 43 52 24 24</a>
          <a href="mailto:contact@2fpub.fr" className="btn-cta-devis">Envoyer un email →</a>
        </div>
      </div>
    </div>
  </section>

    </div>
  );
}
