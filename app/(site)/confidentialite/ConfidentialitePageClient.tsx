// @ts-nocheck
"use client";

import Link from "next/link";
import { initGlobalKeydown, initRevealAndCountUps } from "../../../lib/interactions";
import { useEffect } from "react";

export default function ConfidentialitePage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-confidentialite">

  <section style={{background: 'var(--dark)', minHeight: '100vh', padding: '120px 0 80px'}}>
    <div className="container" style={{maxWidth: '860px'}}>
      <button onClick={(e) => { history.back() } } style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: '\'Righteous\',sans-serif', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', marginBottom: '48px', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.1)' } } onMouseOut={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)' } }>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg> Retour
      </button>
      <h1 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: '400', color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', textTransform: 'uppercase'}}>Politique de <span style={{color: 'rgba(255,255,255,0.65)'}}>confidentialité</span></h1>
      <div style={{width: '60px', height: '3px', background: 'var(--gradient)', borderRadius: '2px', marginBottom: '48px'}}></div>

      <div style={{color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <p>L'utilisateur dispose d'un droit d'accès, de modification, de rectification et de suppression des données qui le concernent (article 34 de la loi « Informatique et Libertés »).</p>

        <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px', textTransform: 'uppercase'}}>Traitement de vos données personnelles</h2>
        <ul style={{paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <li>Responsable du traitement des données : <strong style={{color: '#fff'}}>2F Publicité</strong></li>
          <li>Destinataires des données : Gestionnaire du site – Directeur de la publication</li>
          <li>Finalités du traitement : Information et Relation commerciale</li>
          <li>Durée de rétention des données : 6 mois</li>
          <li>Droit d'accès, modification ou effacement des données, droit de demander une copie des données : <Link href="/suppression-donnees" style={{color: 'var(--brand)', cursor: 'pointer'}}>www.2fpub.fr/suppression-donnees</Link></li>
          <li>Droit de réclamation : <a href="https://www.cnil.fr/fr/plaintes/internet" target="_blank" style={{color: 'var(--brand)'}}>https://www.cnil.fr/fr/plaintes/internet</a></li>
        </ul>

        <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '8px', textTransform: 'uppercase'}}>POLITIQUE LIÉE AU DÉMARCHAGE TÉLÉPHONIQUE</h2>
        <p>Nous vous informons de votre droit d'inscription à la liste d'opposition pour le démarchage téléphonique et vous suggérons de vous inscrire sur Bloctel. Bloctel est la liste d'opposition au démarchage téléphonique sur laquelle tout consommateur peut s'inscrire gratuitement afin de ne plus être démarché téléphoniquement par un professionnel avec lequel il n'a pas de relation contractuelle en cours, conformément à la loi n°2014-344 du 17 mars 2014 relative à la consommation.</p>
        <p>Pour plus d'informations : <a href="http://www.bloctel.gouv.fr/" target="_blank" style={{color: 'var(--brand)'}}>http://www.bloctel.gouv.fr/</a></p>
        <p>Pour vous inscrire : <a href="https://conso.bloctel.fr/" target="_blank" style={{color: 'var(--brand)'}}>https://conso.bloctel.fr/</a></p>

        <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '18px', fontWeight: '400', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '8px', textTransform: 'uppercase'}}>Qu'est-ce qu'un « cookie » ?</h2>
        <p>Nous utilisons différents cookies pour améliorer l'interactivité du site et nos services. Les informations récoltées sont uniquement utilisées sur le site <a href="https://www.2fpub.fr" target="_blank" style={{color: 'var(--brand)'}}>www.2fpub.fr</a>.</p>
        <p>Un « cookie » est une suite d'informations, généralement de petite taille et identifié par un nom, qui peut être transmis à votre navigateur par un site web sur lequel vous vous connectez. Votre navigateur web le conservera pendant une certaine durée, et le renverra au serveur web chaque fois que vous vous y reconnectez. Les cookies ont de multiples usages : ils peuvent servir à mémoriser votre identifiant client auprès d'un site marchand, le contenu courant de votre panier d'achat, un identifiant permettant de tracer votre navigation pour des finalités statistiques ou publicitaires, etc.</p>
      </div>
    </div>
  </section>

    </div>
  );
}
