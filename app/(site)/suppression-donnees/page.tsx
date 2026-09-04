// @ts-nocheck
"use client";

import { handleRgpdSubmit, initGlobalKeydown, initRevealAndCountUps } from "../../../lib/interactions";
import { useEffect } from "react";

export default function SuppressionDonneesPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-suppression-donnees">

  <div style={{maxWidth: '700px', margin: '0 auto', padding: '60px 24px 80px'}}>

    {/*Retour */}
    <button onClick={(e) => { history.back() } } style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '\'Righteous\',sans-serif', fontSize: '14px', fontWeight: '400', color: 'var(--text-secondary)', marginBottom: '40px', padding: '0', transition: 'color .2s', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.color='var(--blue)' } } onMouseOut={(e) => { e.currentTarget.style.color='var(--text-secondary)' } }>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      Retour
    </button>

    {/*Titre */}
    <div style={{marginBottom: '40px'}}>
      <span style={{display: 'inline-block', fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', background: 'rgba(43,106,239,.09)', padding: '6px 14px', borderRadius: '50px', marginBottom: '18px'}}>RGPD</span>
      <h1 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: '400', letterSpacing: '-.03em', lineHeight: '1.15', marginBottom: '14px', textTransform: 'uppercase'}}>Vos droits sur vos données</h1>
      <p style={{fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7'}}>Conformément au RGPD, vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données personnelles.</p>
    </div>

    {/*Vos droits */}
    <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)', padding: '36px 40px', marginBottom: '24px'}}>
      <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Ce que vous pouvez demander</h2>
      <p style={{fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6'}}>Vos droits garantis par le RGPD — UE 2016/679.</p>
      <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px'}}>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}>👁</span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit d'accès</strong> — Obtenir une copie de toutes vos données personnelles que nous détenons.</span>
        </li>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}>✏️</span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit de rectification</strong> — Faire corriger toute information inexacte ou incomplète.</span>
        </li>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}>🗑</span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit à l'effacement</strong> — Demander la suppression de vos données (« droit à l'oubli »).</span>
        </li>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}>⏸</span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit à la limitation</strong> — Restreindre temporairement le traitement de vos données.</span>
        </li>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit à la portabilité</strong> — Recevoir vos données dans un format structuré et lisible.</span>
        </li>
        <li style={{display: 'flex', alignItems: 'flex-start', gap: '13px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          <span style={{flexShrink: '0', width: '28px', height: '28px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', marginTop: '1px'}}>🚫</span>
          <span><strong style={{color: 'var(--text-main)'}}>Droit d'opposition</strong> — Vous opposer au traitement de vos données à des fins de prospection.</span>
        </li>
      </ul>
    </div>

    {/*Formulaire */}
    <div style={{background: '#fff', borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.07)', padding: '36px 40px', marginBottom: '24px'}}>
      <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '17px', fontWeight: '400', marginBottom: '8px', textTransform: 'uppercase'}}>Soumettre une demande</h2>
      <p style={{fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6'}}>Nous traitons votre demande dans un délai maximum de <strong>30 jours</strong>.</p>

      <div id="rgpdFormWrap">
        {/*Remplacez VOTRE_RGPD_FORM_ID_ICI par votre ID Formspree */}
        <form id="rgpdForm" onSubmit={(e) => { handleRgpdSubmit(e) } }
              action="https://formspree.io/f/VOTRE_RGPD_FORM_ID_ICI"
              method="POST">
          <div className="form-group"><label>Votre nom complet *</label><input type="text" name="nom" className="form-control" placeholder="Prénom Nom" required /></div>
          <div className="form-group"><label>Adresse email *</label><input type="email" name="email" className="form-control" placeholder="vous@email.fr" required /></div>
          <div className="form-group">
            <label>Type de demande *</label>
            <select name="type_demande" className="form-control" required>
              <option value="" disabled selected>Choisissez votre droit…</option>
              <option value="Accès à mes données">Accès à mes données</option>
              <option value="Rectification de mes données">Rectification de mes données</option>
              <option value="Suppression de mes données">Suppression (effacement) de mes données</option>
              <option value="Limitation du traitement">Limitation du traitement</option>
              <option value="Portabilité de mes données">Portabilité de mes données</option>
              <option value="Opposition au traitement">Opposition au traitement</option>
            </select>
          </div>
          <div className="form-group"><label>Précisez votre demande</label><textarea name="message" className="form-control" placeholder="Donnez-nous tout contexte utile…" style={{minHeight: '100px', resize: 'vertical'}}></textarea></div>
          <button type="submit" className="btn-submit" id="rgpdBtn">Envoyer ma demande →</button>
        </form>
      </div>

      <div id="rgpdSuccessMsg" style={{display: 'none', textAlign: 'center', padding: '20px 0'}}>
        <div style={{width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(43,106,239,.12),rgba(43,106,239,.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 20px'}}>✅</div>
        <h3 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '20px', fontWeight: '400', marginBottom: '10px', textTransform: 'uppercase'}}>Demande bien reçue</h3>
        <p style={{fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7'}}>Nous traitons votre demande sous <strong style={{color: 'var(--text-main)'}}>30 jours</strong>.<br />Vous recevrez une réponse à l'adresse email indiquée.</p>
      </div>
    </div>

    {/*Contact direct */}
    <div style={{background: 'var(--gray-light)', borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px'}}>
      <p style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', flex: '1', minWidth: '200px'}}>Vous préférez nous contacter directement ? Notre responsable traitement des données est joignable par email.</p>
      <a href="mailto:contact@2fpub.fr" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gradient)', color: '#fff', fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '14px', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity .2s', flexShrink: '0', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.opacity='.88' } } onMouseOut={(e) => { e.currentTarget.style.opacity='1' } }>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
        contact@2fpub.fr
      </a>
    </div>

    <p style={{fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center'}}>En cas de litige non résolu, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener" style={{color: 'var(--blue)'}}>CNIL</a>.</p>
  </div>

    </div>
  );
}
