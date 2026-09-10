"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
// Behavioral helpers ported from the original site's inline <script> blocks.
// Each Next.js page is now a real route (mounted fresh on navigation), so the
// old SPA router (goTo) is gone — everything else is reproduced as-is,
// operating on the DOM via ids/classes exactly like the original.

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

// ══ REVEAL ══
export function runReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>(".reveal:not(.visible)");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => obs.observe(el));
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) el.classList.add("visible");
  });
  return obs;
}

// ══ COUNT-UP ══
function countUp(el: HTMLElement) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const target = parseInt(el.dataset.target || "0", 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initCountUps(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".stat-num[data-target]:not([data-done])").forEach((el) => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          countUp(el);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
  });
}

export function initRevealAndCountUps(root: ParentNode = document) {
  runReveals(root);
  initCountUps(root);
  const onScroll = () => runReveals(root);
  window.addEventListener("scroll", onScroll, { passive: true });
  const t = setTimeout(() => runReveals(root), 200);
  return () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(t);
  };
}

// ══ FAQ ACCORDIONS ══
export function toggleFaq(btn: HTMLElement) {
  const item = btn.closest(".fiche-faq-item") as HTMLElement | null;
  if (!item) return;
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".fiche-faq-item.open").forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}
export const toggleFicheFaq = toggleFaq;

// ══ MODALES ══
export function openModal(id: string) {
  const overlay = document.getElementById("modal-" + id);
  if (!overlay) return;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
export function closeModal(event: any, idOrEl: string | HTMLElement) {
  let overlay: HTMLElement | null;
  if (typeof idOrEl === "string") {
    overlay = document.getElementById(idOrEl);
  } else {
    overlay = idOrEl;
  }
  if (!overlay) return;
  if (event && event.target !== overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// ══ TIMELINE (à propos) ══
export function initTimeline() {
  const tlItems = document.querySelectorAll<HTMLElement>("#page-about .timeline-item");
  const tlFill = document.getElementById("tlFill");
  if (!tlItems.length) return;
  const obs = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      tlItems.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add("tl-visible");
          if (tlFill) tlFill.style.height = ((i + 1) / tlItems.length) * 100 + "%";
        }, i * 220);
      });
      obs.disconnect();
    },
    { threshold: 0.1 }
  );
  const tl = document.querySelector("#page-about .timeline");
  if (tl) obs.observe(tl);
}

// ══ CAROUSEL (réalisations) ══
export function initCarousel() {
  const viewport = document.getElementById("carouselViewport");
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  if (!track || !viewport || !dotsWrap) return () => {};
  const cards = track.querySelectorAll(".c-card");

  let timer: ReturnType<typeof setInterval> | null = null;
  let current = 0;

  function getVisible() {
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  }
  function getMax() {
    return Math.max(0, cards.length - getVisible());
  }
  function getCardW() {
    if (!cards[0]) return 0;
    return cards[0].getBoundingClientRect().width + 24;
  }
  function buildDots() {
    dotsWrap!.innerHTML = "";
    for (let i = 0; i <= getMax(); i++) {
      const d = document.createElement("span");
      d.className = "c-dot" + (i === current ? " active" : "");
      d.addEventListener("click", () => slideTo(i));
      dotsWrap!.appendChild(d);
    }
  }
  function slideTo(idx: number) {
    current = Math.max(0, Math.min(idx, getMax()));
    track!.style.transform = "translateX(-" + current * getCardW() + "px)";
    dotsWrap!.querySelectorAll(".c-dot").forEach((d, i) => d.classList.toggle("active", i === current));
  }
  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => slideTo(current >= getMax() ? 0 : current + 1), 1500);
  }

  buildDots();
  startAuto();

  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const onPrev = () => {
    if (timer) clearInterval(timer);
    slideTo(current - 1);
    startAuto();
  };
  const onNext = () => {
    if (timer) clearInterval(timer);
    slideTo(current + 1);
    startAuto();
  };
  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  const onEnter = () => {
    if (timer) clearInterval(timer);
  };
  const onLeave = () => startAuto();
  viewport.addEventListener("mouseenter", onEnter);
  viewport.addEventListener("mouseleave", onLeave);

  const onResize = () => {
    buildDots();
    slideTo(Math.min(current, getMax()));
  };
  window.addEventListener("resize", onResize);

  return () => {
    if (timer) clearInterval(timer);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    viewport.removeEventListener("mouseenter", onEnter);
    viewport.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("resize", onResize);
  };
}

// ══ SERVICES TABS ══
export function setActiveTab(id: string) {
  document.querySelectorAll<HTMLElement>("#page-services .svc-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.target === id);
  });
}

export function initSvcTabs() {
  const tabs = document.querySelectorAll<HTMLElement>("#page-services .svc-tab");
  const filterBar = document.getElementById("svcFilterBar");
  const svcIds = ["covering", "textile", "enseignes", "impression"];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target!;
      const el = document.getElementById(targetId);
      if (!el) return;
      const barH = targetId === "covering" ? 72 : (filterBar ? filterBar.offsetHeight : 0) + 72;
      const top = el.getBoundingClientRect().top + window.scrollY - barH;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveTab(targetId);
    });
  });

  const coveringEl = document.getElementById("covering");
  const impressionEl = document.getElementById("impression");
  function updateSvcBarVisibility() {
    if (!filterBar || !coveringEl || !impressionEl) return;
    const top = coveringEl.getBoundingClientRect().top;
    const bottom = impressionEl.getBoundingClientRect().bottom;
    const inZone = top <= 72 && bottom > 72;
    filterBar.classList.toggle("svc-bar-visible", inZone);
    filterBar.classList.toggle("shadowed", inZone);
  }
  window.addEventListener("scroll", updateSvcBarVisibility, { passive: true });
  updateSvcBarVisibility();

  const svcObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveTab(e.target.id);
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  );
  svcIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) svcObs.observe(el);
  });
}

// ══ GALLERY FILTER (services fiches) ══
export function initGalleryFilter() {
  document.querySelectorAll<HTMLElement>(".ftab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const f = tab.dataset.filter;
      document.querySelectorAll<HTMLElement>(".g-item").forEach((item) => {
        item.classList.toggle("hidden", f !== "all" && item.dataset.cat !== f);
      });
    });
  });
}

// ══ FICHE TEXTILE SLIDER ══
const ficheSlides = [
  { label: "Technique premium", title: "Broderie", color: "linear-gradient(135deg,var(--brand),var(--accent))" },
  { label: "Technique", title: "Flocage", color: "linear-gradient(135deg,var(--accent),var(--brand))" },
  { label: "Accessoires", title: "Casquettes", color: "linear-gradient(135deg,var(--brand),#0D4ECC)" },
];
let ficheCur = 0;
let ficheTimer: ReturnType<typeof setInterval> | null = null;

export function ficheGoSlide(idx: number) {
  ficheCur = idx;
  const track = document.getElementById("ficheTrack");
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  const lbl = document.getElementById("ficheBadgeLabel");
  const ttl = document.getElementById("ficheBadgeTitle");
  const sw = document.getElementById("ficheSwatch");
  if (lbl) lbl.textContent = ficheSlides[idx].label;
  if (ttl) ttl.textContent = ficheSlides[idx].title;
  if (sw) sw.style.background = ficheSlides[idx].color;
  document.querySelectorAll("#page-fiche-textile .fiche-dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });
  if (ficheTimer) clearInterval(ficheTimer);
  ficheTimer = setInterval(() => ficheGoSlide((ficheCur + 1) % 3), 3200);
}

export function initFicheSlider() {
  if (ficheTimer) clearInterval(ficheTimer);
  ficheCur = 0;
  ficheGoSlide(0);
  return () => {
    if (ficheTimer) clearInterval(ficheTimer);
  };
}

// ══ CATALOGUE EMAIL GATE ══
export function openCatalogueGate() {
  const modal = document.getElementById("catalogueGate");
  const card = document.getElementById("catalogueGateCard");
  const form = document.getElementById("catalogueGateForm");
  const success = document.getElementById("catalogueGateSuccess");
  const error = document.getElementById("catalogueGateError");
  const email = document.getElementById("catalogueGateEmail") as HTMLInputElement | null;
  if (form) form.style.display = "block";
  if (success) success.style.display = "none";
  if (error) error.style.display = "none";
  if (email) email.value = "";
  if (modal) {
    modal.style.opacity = "1";
    modal.style.pointerEvents = "all";
  }
  if (card) card.style.transform = "scale(1) translateY(0)";
  document.body.style.overflow = "hidden";
  setTimeout(() => email?.focus(), 200);
}

export function closeCatalogueGate() {
  const modal = document.getElementById("catalogueGate");
  if (!modal) return;
  modal.style.opacity = "0";
  modal.style.pointerEvents = "none";
  const card = document.getElementById("catalogueGateCard");
  if (card) card.style.transform = "scale(0.94) translateY(16px)";
  document.body.style.overflow = "";
}

// Soumission envoyée à app/forms/submit/route.ts (même backend que devis/RGPD
// — voir plus bas). Pas de déclenchement de téléchargement automatique ici :
// le fichier /2F_CATALOGUE.pdf n'existe pas dans public/ à ce jour (aucun
// PDF n'a été fourni) — le message affiché après capture de l'email ne
// promet donc pas un fichier reçu "instantanément", seulement que la demande
// est enregistrée. Ne PAS réintroduire un lien de téléchargement tant que
// le vrai fichier n'a pas été ajouté à public/.
export async function submitCatalogueGate() {
  const emailInput = document.getElementById("catalogueGateEmail") as HTMLInputElement | null;
  const email = emailInput?.value.trim() || "";
  const errEl = document.getElementById("catalogueGateError");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errEl) errEl.style.display = "block";
    return;
  }
  if (errEl) errEl.style.display = "none";

  const form = document.getElementById("catalogueGateForm") as HTMLFormElement | null;
  const submitBtn = form?.querySelector("button[type=submit]") as HTMLButtonElement | null;
  const originalText = submitBtn?.textContent || "";
  if (submitBtn) {
    submitBtn.textContent = "Envoi en cours…";
    submitBtn.disabled = true;
  }

  try {
    const body = new FormData();
    body.set("form_type", "catalogue");
    body.set("email", email);
    const honeypot = form?.querySelector<HTMLInputElement>('[name="societe_web"]');
    body.set("societe_web", honeypot?.value || "");

    const res = await fetch("/forms/submit", { method: "POST", body, headers: { Accept: "application/json" } });
    if (res.ok) {
      if (form) form.style.display = "none";
      const success = document.getElementById("catalogueGateSuccess");
      if (success) success.style.display = "block";
      setTimeout(closeCatalogueGate, 3200);
    } else {
      console.error("[catalogueGate] Échec de soumission, statut:", res.status);
      if (errEl) {
        errEl.textContent = "Une erreur est survenue, réessayez ou écrivez-nous à contact@2fpub.fr.";
        errEl.style.display = "block";
      }
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  } catch {
    console.error("[catalogueGate] Erreur réseau — la demande n'a pas été transmise.");
    if (errEl) {
      errEl.textContent = "Connexion impossible. Écrivez-nous directement à contact@2fpub.fr.";
      errEl.style.display = "block";
    }
    if (submitBtn) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }
}

// ══ IMPRESSION NAV BAR ══
export function impScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 72 - 48;
  window.scrollTo({ top: offset, behavior: "smooth" });
  document.querySelectorAll<HTMLElement>(".imp-nav-btn").forEach((b) => {
    b.classList.toggle("active", !!b.dataset.target && b.dataset.target === id);
  });
}
export const flyersScrollTo = impScrollTo;

export function initImpNavBarScrollSpy(sections: string[]) {
  function onScroll() {
    const impBar = document.getElementById("impNavBar");
    const firstEl = document.getElementById(sections[0]);
    const lastEl = document.getElementById(sections[sections.length - 1]);
    if (impBar && firstEl && lastEl) {
      const inZone = firstEl.getBoundingClientRect().top <= 72 && lastEl.getBoundingClientRect().bottom > 72;
      impBar.style.opacity = inZone ? "1" : "0";
      impBar.style.transform = inZone ? "translateY(0)" : "translateY(-8px)";
      impBar.style.pointerEvents = inZone ? "auto" : "none";
      impBar.style.boxShadow = inZone ? "0 4px 16px rgba(0,0,0,0.07)" : "none";
    }
    let current = sections[0];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 160) current = id;
    });
    document.querySelectorAll<HTMLElement>(".imp-nav-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.target === current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

// ══ QUANTITÉ (flyers / cartes de visite / impression) ══
export function setFlyerQty(qty: number) {
  document.querySelectorAll<HTMLElement>("#flyerQtyBtns .imp-qty-btn").forEach((b) => b.classList.toggle("active", +((b.dataset.qty) || 0) === qty));
  const hint = document.getElementById("flyer-hint");
  const grid = document.getElementById("flyer-grid");
  const cta = document.getElementById("flyer-cta-row");
  if (hint) hint.style.display = "none";
  if (grid) grid.style.display = "grid";
  if (cta) cta.style.display = "flex";
  document.querySelectorAll(".flyer-qty-label").forEach((el) => (el.textContent = qty >= 1000 ? "1 000" : String(qty)));
  document.querySelectorAll<HTMLElement>(".flyer-price").forEach((el) => {
    const v = el.dataset[String(qty)];
    el.textContent = v && v !== "XX" ? v + " €" : "—";
  });
}

export function setCdvQty(qty: number) {
  document.querySelectorAll<HTMLElement>("#cdvQtyBtns .imp-qty-btn").forEach((b) => b.classList.toggle("active", +((b.dataset.qty) || 0) === qty));
  const hint = document.getElementById("cdv-hint");
  const grid = document.getElementById("cdv-grid");
  const cta = document.getElementById("cdv-cta-row");
  if (hint) hint.style.display = "none";
  if (grid) grid.style.display = "grid";
  if (cta) cta.style.display = "flex";
  document.querySelectorAll(".cdv-qty-label").forEach((el) => (el.textContent = String(qty)));
  document.querySelectorAll<HTMLElement>(".cdv-price").forEach((el) => {
    const v = el.dataset[String(qty)];
    el.textContent = v && v !== "XX" ? v + " €" : "—";
  });
}

export function setImpQty(qty: number) {
  document.querySelectorAll<HTMLElement>(".imp-qty-btn").forEach((b) => b.classList.toggle("active", +((b.dataset.qty) || 0) === qty));
  const hint = document.getElementById("imp-qty-hint");
  const grid = document.getElementById("imp-techniques-grid");
  const cta = document.getElementById("imp-cta-row");
  if (hint) hint.style.display = "none";
  if (grid) grid.style.display = "grid";
  if (cta) cta.style.display = "flex";
  document.querySelectorAll(".imp-qty-label").forEach((el) => (el.textContent = qty >= 1000 ? "1 000" : String(qty)));
  document.querySelectorAll<HTMLElement>(".imp-price").forEach((el) => {
    el.textContent = (el.dataset[String(qty)] || "") + " €";
  });
}

// ══ COVERING TABS ══
export function setCovTab(id: string) {
  document.querySelectorAll<HTMLElement>(".cov-tab").forEach((t) => t.classList.toggle("active", t.dataset.cov === id));
  document.querySelectorAll<HTMLElement>(".cov-panel").forEach((p) => {
    p.style.display = p.id === "cov-" + id ? "block" : "none";
  });
}

// ══ HERO BADGES WIDTH SYNC ══
export function syncHeroBadges() {
  const ctas = document.getElementById("heroCtas");
  const r = document.getElementById("heroReassurance");
  if (ctas && r) r.style.width = ctas.offsetWidth + "px";
}

// ══ DEVIS FORM ══
// Soumission envoyée à app/forms/submit/route.ts (base Postgres existante,
// pas de service externe — voir lib/forms/data.ts). Ne JAMAIS afficher le
// message de succès si la requête échoue : erreur serveur → invite à
// réessayer ; échec réseau total → invite à contacter 2F PUB directement.
export async function handleDevisSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = document.getElementById("devisForm") as HTMLFormElement | null;
  if (!form) return;
  const btn = form.querySelector("button[type=submit]") as HTMLButtonElement | null;
  const originalText = btn?.textContent || "";
  if (btn) {
    btn.textContent = "Envoi en cours…";
    btn.disabled = true;
  }
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const wrap = document.getElementById("formWrap");
      const success = document.getElementById("successMsg");
      if (wrap) wrap.style.display = "none";
      if (success) success.style.display = "block";
    } else {
      console.error("[devisForm] Échec de soumission, statut:", res.status);
      if (btn) {
        btn.textContent = "Erreur — réessayez";
        btn.disabled = false;
      }
    }
  } catch {
    console.error("[devisForm] Erreur réseau — la demande n'a pas été transmise.");
    const wrap = document.getElementById("formWrap");
    const unavailable = document.getElementById("unavailableMsg");
    if (wrap) wrap.style.display = "none";
    if (unavailable) unavailable.style.display = "block";
    if (btn) {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }
}

// ══ RGPD FORM ══
// Même règle et même backend que handleDevisSubmit ci-dessus.
export async function handleRgpdSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = document.getElementById("rgpdForm") as HTMLFormElement | null;
  const btn = document.getElementById("rgpdBtn") as HTMLButtonElement | null;
  if (!form) return;
  if (btn) {
    btn.textContent = "Envoi en cours…";
    btn.disabled = true;
  }
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const wrap = document.getElementById("rgpdFormWrap");
      const success = document.getElementById("rgpdSuccessMsg");
      if (wrap) wrap.style.display = "none";
      if (success) success.style.display = "block";
    } else {
      console.error("[rgpdForm] Échec de soumission, statut:", res.status);
      if (btn) {
        btn.textContent = "Erreur — réessayez";
        btn.disabled = false;
      }
    }
  } catch {
    console.error("[rgpdForm] Erreur réseau — la demande n'a pas été transmise.");
    const wrap = document.getElementById("rgpdFormWrap");
    const unavailable = document.getElementById("rgpdUnavailableMsg");
    if (wrap) wrap.style.display = "none";
    if (unavailable) unavailable.style.display = "block";
    if (btn) {
      btn.textContent = "Envoyer ma demande →";
      btn.disabled = false;
    }
  }
}

// ══ NAVBAR SCROLL / KEYDOWN GLOBAL ══
export function initGlobalKeydown() {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeCatalogueGate();
      document.querySelectorAll(".modal-overlay.open").forEach((m) => {
        m.classList.remove("open");
        document.body.style.overflow = "";
      });
    }
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}
