"use client";

import Link from "next/link";

export default function Footer() {
  return (
<footer className="footer">
  <div className="footer-giant-wordmark" aria-hidden="true">2F PUBLICITÉ</div>
  <div className="container">
    <div className="footer-grid">
      <div>
        <Link className="footer-brand-logo" href="/" style={{cursor: 'pointer'}}>
          <span style={{fontFamily: '\'Righteous\',sans-serif', fontWeight: '400', fontSize: '22px', letterSpacing: '-0.02em', color: 'white', textTransform: 'uppercase'}}>2F Publicité</span>
        </Link>
        <p className="footer-tagline">Votre partenaire en communication visuelle B2B depuis 1999. Une seule agence pour tous vos besoins publicitaires.</p>
        <div className="socials">
          <a href="https://www.linkedin.com/company/2fpub" target="_blank" aria-label="LinkedIn" className="s-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href="https://www.instagram.com/2fpublicite/" target="_blank" aria-label="Instagram" className="s-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          </a>
          <a href="https://www.tiktok.com/@2fpub?lang=fr" target="_blank" aria-label="TikTok" className="s-link">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
          </a>
        </div>
      </div>
      <div>
        <h4 className="f-col-title">Nos services</h4>
        <ul className="f-links">
          <li><Link href="/fiches/covering">Covering véhicule</Link></li>
          <li><Link href="/fiches/textile">Textile pro</Link></li>
          <li><Link href="/fiches/enseignes">Enseignes</Link></li>
          <li><Link href="/fiches/impression">Impression</Link></li>
          <li><Link href="/devis">Devis gratuit</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="f-col-title">L'agence</h4>
        <ul className="f-links">
          <li><Link href="/a-propos">Qui sommes-nous</Link></li>
          <li><Link href="/realisations">Nos réalisations</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/devis">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="f-col-title">Contact</h4>
        <div className="f-contact-item">
          <svg className="f-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span>217, Av. Jean Jaurès<br />93300 Aubervilliers</span>
        </div>
        <div className="f-contact-item">
          <svg className="f-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.33 2 2 0 013.6 1.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006 6l.92-.92a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          <span><a href="tel:0143522424" style={{color: 'inherit', textDecoration: 'none'}}>01 43 52 24 24</a></span>
        </div>
        <div className="f-contact-item">
          <svg className="f-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
          <span><a href="mailto:contact@2fpub.fr" style={{color: 'inherit', textDecoration: 'none'}}>contact@2fpub.fr</a></span>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="container" style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', width: '100%'}}>
      <p>© {new Date().getFullYear()} 2F Publicité — Tous droits réservés | Agence de communication visuelle B2B</p>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap'}}>
        <Link href="/mentions-legales" style={{fontSize: '12px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', textDecoration: 'none'}} onMouseOver={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.6)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.3)' } }>Mentions légales</Link>
        <Link href="/confidentialite" style={{fontSize: '12px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', textDecoration: 'none'}} onMouseOver={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.6)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.3)' } }>Confidentialité</Link>
        <Link href="/plan-du-site" style={{fontSize: '12px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', textDecoration: 'none'}} onMouseOver={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.6)' } } onMouseOut={(e) => { e.currentTarget.style.color='rgba(255,255,255,0.3)' } }>Plan du site</Link>
        <span className="footer-bottom-badge">🇫🇷 Fabriqué en France</span>
      </div>
    </div>
  </div>
</footer>
  );
}
