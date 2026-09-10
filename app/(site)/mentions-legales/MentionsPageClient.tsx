// @ts-nocheck
"use client";

import { initGlobalKeydown, initRevealAndCountUps } from "../../../lib/interactions";
import { useEffect } from "react";

export default function MentionsPage() {

  useEffect(() => {
    const cleanupReveal = initRevealAndCountUps();
    
    const cleanupKeydown = initGlobalKeydown();
    return () => {
      cleanupReveal();
      cleanupKeydown();
      
    };
  }, []);

  return (
    <div className="page active" id="page-mentions">

  <section style={{background: 'var(--dark)', minHeight: '100vh', padding: '120px 0 80px'}}>
    <div className="container" style={{maxWidth: '860px'}}>
      <button onClick={(e) => { history.back() } } style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: '\'Righteous\',sans-serif', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', marginBottom: '48px', textTransform: 'uppercase'}} onMouseOver={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.1)' } } onMouseOut={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)' } }>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg> Retour
      </button>
      <h1 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: '400', color: '#fff', letterSpacing: '-0.03em', marginBottom: '8px', textTransform: 'uppercase'}}>Mentions <span style={{color: 'rgba(255,255,255,0.65)'}}>légales</span></h1>
      <div style={{width: '60px', height: '3px', background: 'var(--gradient)', borderRadius: '2px', marginBottom: '48px'}}></div>

      <div style={{color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <p>
          Nom du site : <a href="https://www.2fpub.fr" target="_blank" style={{color: 'var(--brand)'}}>www.2fpub.fr</a><br />
          Email : <a href="mailto:contact@2fpub.fr" style={{color: 'var(--brand)'}}>contact@2fpub.fr</a>
        </p>
        <p>Directeur de la publication : <strong style={{color: '#fff'}}>2F Publicité</strong></p>
        <p>
          Adresse : 217, avenue Jean Jaurès – 93300 Aubervilliers<br />
          Tél : <a href="tel:0143522424" style={{color: 'inherit'}}>01 43 52 24 24</a>
        </p>
        <p>Crédits photographiques : Adobe Stock</p>

        <h2 style={{fontFamily: '\'Righteous\',sans-serif', fontSize: '22px', fontWeight: '400', color: '#fff', marginTop: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase'}}>Hébergement</h2>
        <p>
          <strong style={{color: '#fff'}}>GANDI SAS</strong>, Société par Actions Simplifiée au capital de 2 300 000 € ayant son siège social au<br />
          63–65 boulevard Masséna Paris (75013) FRANCE<br />
          Siren 423 093 459 RCS PARIS<br />
          n. de TVA FR81423093459<br />
          Tel +33 (0) 1 70.37.76.61<br />
          Fax +33. (0) 1 43 73 18 51<br />
          E-mail : <a href="mailto:direction@gandi.net" style={{color: 'var(--brand)'}}>direction@gandi.net</a>
        </p>
        <p>L'utilisateur du site Internet reconnaît disposer de la compétence et des moyens nécessaires pour accéder et utiliser ce site. Il reconnaît également avoir pris connaissance de la présente notice légale et s'engage à la respecter.</p>
        <p>Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l'autorisation expresse de l'exploitant du site Internet est interdite et constituerait une contrefaçon sanctionnée par les articles L 335-2 et suivants du Code de la propriété intellectuelle.<br />
        Il en est de même des éventuelles bases de données figurant sur le site Internet qui sont protégées par les dispositions de la loi du 11 juillet 1998 portant transposition dans le Code de la propriété intellectuelle (CPI) de la directive européenne du 11 mars 1996 relative à la protection juridique des bases de données.</p>
        <p>Les marques de l'exploitant du site Internet et de ses partenaires, ainsi que les logos figurant sur le site sont des marques (semi figuratives ou non) déposées.<br />
        Les liens hypertextes mis en place dans le cadre du site Internet en direction d'autres ressources présentes sur le réseau de l'Internet, et notamment vers ses partenaires ont fait l'objet d'une autorisation préalable expresse et écrite.</p>
        <p>Les utilisateurs visiteurs du site Internet ne peuvent mettre en place un hyperlien en direction de ces sites sans l'autorisation expresse et préalable de l'exploitant du site Internet.</p>
      </div>
    </div>
  </section>

    </div>
  );
}
