"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS: { href: string; page: string; label: string }[] = [
  { href: "/services", page: "services", label: "Nos services" },
  { href: "/realisations", page: "realisations", label: "Réalisations" },
  { href: "/a-propos", page: "about", label: "À propos" },
  { href: "/devis", page: "devis", label: "Contact" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="container">
          <div className="navbar-inner">
            <Link className="navbar-logo" href="/">
              <span className="logo-name">2F Publicité</span>
            </Link>
            <ul className="navbar-nav">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-page={l.page}
                    className={activePage === l.page ? "active" : ""}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
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
