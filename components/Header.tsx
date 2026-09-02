"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS: { href: string; page: string; label: string }[] = [
  { href: "/services", page: "services", label: "Nos services" },
  { href: "/realisations", page: "realisations", label: "Réalisations" },
  { href: "/a-propos", page: "about", label: "À propos" },
  { href: "/devis", page: "devis", label: "Contact" },
];

const SERVICES_MENU: { href: string; label: string; icon: React.ReactNode; subcategories: string[] }[] = [
  {
    href: "/fiches/covering",
    label: "Marquage véhicule",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l2-5a2 2 0 0 1 2-1.3h10a2 2 0 0 1 2 1.3l2 5" /><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/textile",
    label: "Vêtements personnalisés",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8h1.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/enseignes",
    label: "Enseignes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4 2.5 5s1.5 2 1.5 3h4c0-1 .5-2 1.5-3s2.5-2.5 2.5-5a6 6 0 0 0-6-6z" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/vitrophanies",
    label: "Vitrophanies",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l8.5 8.5" /><circle cx="4.5" cy="4.5" r="2.5" /><circle cx="4.5" cy="19.5" r="2.5" /><path d="M14.5 9.5L20 4" /><path d="M6 18l14-14" /></svg>
    ),
    subcategories: ["Stickers personnalisés", "Stickers muraux personnalisés", "Stickers vitrine personnalisés", "Stickers sol"],
  },
  {
    href: "/fiches/plaques-panneaux",
    label: "Plaques & Panneaux",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/logo-lumineux",
    label: "Logo lumineux",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><circle cx="17.5" cy="6.5" r="3.5" /><path d="M3 21l7-11 7 11z" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/impression",
    label: "Impressions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
    ),
    subcategories: [],
  },
  {
    href: "/fiches/flyers",
    label: "Petite papeterie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
    ),
    subcategories: [],
  },
];

function pageForPath(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/realisations")) return "realisations";
  if (pathname.startsWith("/a-propos")) return "about";
  if (pathname.startsWith("/devis")) return "devis";
  return "";
}

export default function Header() {
  const pathname = usePathname();
  const activePage = pageForPath(pathname || "/");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 200);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
  }, [pathname]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}${activePage === "about" ? " navbar-on-dark" : ""}`} id="navbar">
        <div className="container">
          <div className="navbar-inner">
            <Link className="navbar-logo" href="/">
              <span className="logo-name">2F Publicité</span>
            </Link>
            <ul className="navbar-nav">
              {NAV_LINKS.map((l) =>
                l.page === "services" ? (
                  <li
                    key={l.href}
                    className="navbar-services-item"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesDelayed}
                  >
                    <Link
                      href={l.href}
                      data-page={l.page}
                      className={activePage === l.page ? "active" : ""}
                    >
                      {l.label}
                    </Link>
                    <div
                      className={`services-dropdown${servicesOpen ? " open" : ""}`}
                      onMouseEnter={openServices}
                      onMouseLeave={closeServicesDelayed}
                    >
                      <div className="services-dropdown-columns">
                        {SERVICES_MENU.map((s) => (
                          <Link key={s.href} href={s.href} className="sdc-col-title">
                            <span className="sdc-icon">{s.icon}</span>
                            <span>{s.label}</span>
                          </Link>
                        ))}
                        <div className="sdc-full-divider"></div>
                        {SERVICES_MENU.map((s) => (
                          <ul key={s.href} className="sdc-col-list">
                            {s.subcategories.map((sub) => (
                              <li key={sub}>{sub}</li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-page={l.page}
                      className={activePage === l.page ? "active" : ""}
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <Link className="btn-nav-cta" href="/devis">
              Devis gratuit →
            </Link>
            <button
              className={`hamburger${mobileOpen ? " open" : ""}`}
              id="hamburger"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav${mobileOpen ? " open" : ""}`} id="mobileNav">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link className="btn-nav-cta" href="/devis" onClick={() => setMobileOpen(false)}>
          Devis gratuit →
        </Link>
      </div>
    </>
  );
}
