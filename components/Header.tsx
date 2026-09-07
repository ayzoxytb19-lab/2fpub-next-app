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

const SERVICES_MENU: { href: string; label: string; icon: string; subcategories: string[] }[] = [
  {
    href: "/fiches/covering",
    label: "Marquage véhicule",
    icon: "/Asset Navbar/Logos_produits/sports-car_67994.svg",
    subcategories: ["Adhésif découpe", "Adhésif & impression", "3 panneaux", "Semi-covering"],
  },
  {
    href: "/fiches/textile",
    label: "Vêtements personnalisés",
    icon: "/Asset Navbar/Logos_produits/shirt_1023978.svg",
    subcategories: ["Broderie", "Flocage"],
  },
  {
    href: "/fiches/enseignes",
    label: "Enseignes",
    icon: "/Asset Navbar/Logos_produits/direction_4830565.svg",
    subcategories: ["Ajouré (creusé)", "PVC rétroéclairé", "Alu rétroéclairé", "Relief PMMA", "Relief PMMA + alu", "Boîtier plexi", "Boîtier plexi (côtés opaques)"],
  },
  {
    href: "/fiches/vitrophanies",
    label: "Vitrophanies",
    icon: "/Asset Navbar/Logos_produits/nicotine-patch_7433589.svg",
    subcategories: ["Autocollant classique", "Film confidentiel", "Film décoratif", "Découpe adhésive"],
  },
  {
    href: "/fiches/plaques-panneaux",
    label: "Plaques & Panneaux",
    icon: "/Asset Navbar/Logos_produits/pharmacy_2212179.svg",
    subcategories: ["Panneaux grand format", "Panneaux de chantier", "Plaques transparentes", "Plaques professionnelles"],
  },
  {
    href: "/fiches/logo-lumineux",
    label: "Logo lumineux",
    icon: "/Asset Navbar/Logos_produits/sun_2893114.svg",
    subcategories: ["Version comptoir", "Version murale"],
  },
  {
    href: "/fiches/impression",
    label: "Impressions",
    icon: "/Asset Navbar/Logos_produits/stickers_1025477.svg",
    subcategories: ["Papier qualité supérieure", "Vinyle adhésif", "Découpe numérique", "Affiches & posters", "Bâches chantier & banderoles", "Micro-perforé", "Roll-up & kakémonos", "Drapeau plume"],
  },
  {
    href: "/fiches/flyers",
    label: "Petite papeterie",
    icon: "/Asset Navbar/Logos_produits/profile_8200202.svg",
    subcategories: ["Flyers", "Cartes de visite", "Dépliant 2 volets", "Dépliant 3 volets", "Brochure agrafée"],
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
  const [hoverTop, setHoverTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSubcat, setActiveSubcat] = useState<string | null>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carte du méga-menu Services actuellement "élargie" au survol. Piloté en
  // JS (et non en pur CSS :hover) avec un léger débounce : sans ça, dès que
  // la carte grandit sous le curseur, la souris se retrouve sur la carte
  // voisine (qui rétrécit) et les deux cartes se remettent à s'échanger le
  // survol en boucle très rapide. Le délai laisse la géométrie se stabiliser
  // avant de changer de carte active.
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const hoveredCardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleHoverCard = (href: string) => {
    if (hoveredCardTimer.current) clearTimeout(hoveredCardTimer.current);
    if (hoveredCard === href) return;
    hoveredCardTimer.current = setTimeout(() => setHoveredCard(href), 120);
  };
  const scheduleUnhoverCard = (href: string) => {
    if (hoveredCardTimer.current) clearTimeout(hoveredCardTimer.current);
    hoveredCardTimer.current = setTimeout(() => {
      setHoveredCard((cur) => (cur === href ? null : cur));
    }, 120);
  };

  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setServicesOpen(true);
  };
  const closeServicesDelayed = () => {
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      setActiveSubcat(null);
    }, 200);
  };

  const openHoverTop = () => {
    if (hoverTopCloseTimer.current) clearTimeout(hoverTopCloseTimer.current);
    setHoverTop(true);
  };
  const closeHoverTopDelayed = () => {
    hoverTopCloseTimer.current = setTimeout(() => setHoverTop(false), 250);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 12) openHoverTop();
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setActiveSubcat(null);
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
  }, [pathname]);

  return (
    <>
      <nav
        className={`navbar${scrolled || hoverTop ? " scrolled" : ""}${activePage === "about" && !scrolled && !hoverTop ? " navbar-on-dark" : ""}`}
        id="navbar"
        onMouseEnter={openHoverTop}
        onMouseLeave={closeHoverTopDelayed}
      >
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
            <div
              className={`services-dropdown${servicesOpen ? " open" : ""}`}
              onMouseEnter={openServices}
              onMouseLeave={closeServicesDelayed}
            >
              <div className="services-dropdown-card">
                <div className="services-dropdown-columns">
                  {SERVICES_MENU.map((s) => (
                    <div
                      key={s.href}
                      className={`sdc-col-wrap${hoveredCard === s.href ? " sdc-hovered" : ""}`}
                      onMouseEnter={() => scheduleHoverCard(s.href)}
                      onMouseLeave={() => scheduleUnhoverCard(s.href)}
                    >
                      <button
                        type="button"
                        className={`sdc-col-title${activeSubcat === s.href ? " active" : ""}`}
                        aria-label={s.label}
                        onClick={() => setActiveSubcat((cur) => (cur === s.href ? null : s.href))}
                      >
                        <span
                          className="sdc-icon"
                          style={{ ["--sdc-mask" as any]: `url("${s.icon}")` }}
                        />
                        <span className="sdc-label">{s.label}</span>
                      </button>
                      <div className={`sdc-subpanel${activeSubcat === s.href ? " open" : ""}`}>
                        <div className="sdc-subpanel-inner">
                          <Link href={s.href} className="sdc-sublink sdc-sublink-all">
                            Tout voir : {s.label} →
                          </Link>
                          {s.subcategories.map((sub) => (
                            <Link key={sub} href={s.href} className="sdc-sublink">
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="navbar-cta-group">
              {/*TODO: remplacer "#" par l'URL de la boutique en ligne une fois disponible */}
              <a className="btn-nav-shop" href="#">
                Boutique en ligne
              </a>
              <Link className="btn-nav-cta" href="/devis">
                Devis gratuit →
              </Link>
            </div>
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
