"use client";

import { useEffect, useRef } from "react";

export default function FloatingWidgets() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function isDarkBehindBar(bar: HTMLElement) {
      const rect = bar.getBoundingClientRect();
      const testX = rect.left - 8;
      const testY = window.innerHeight / 2;
      bar.style.pointerEvents = "none";
      const el = document.elementFromPoint(testX, testY);
      bar.style.pointerEvents = "";
      if (!el) return false;
      let node: Element | null = el;
      while (node && node !== document.documentElement) {
        const st = window.getComputedStyle(node);
        const bgImg = st.backgroundImage;
        const bgCol = st.backgroundColor;
        if (bgImg && bgImg !== "none" && bgImg.indexOf("gradient") !== -1) return true;
        if (bgCol && bgCol !== "rgba(0, 0, 0, 0)" && bgCol !== "transparent") {
          const m = bgCol.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
            return lum < 0.55;
          }
        }
        node = node.parentElement;
      }
      return false;
    }

    function updateSocialBar() {
      const bar = barRef.current;
      if (!bar) return;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearTop = scrollY < 180;
      const nearBottom = scrollY + winH > docH - 180;
      if (nearTop || nearBottom) {
        bar.style.opacity = "0";
        bar.style.visibility = "hidden";
      } else {
        bar.style.opacity = "1";
        bar.style.visibility = "visible";
        if (isDarkBehindBar(bar)) {
          bar.classList.add("on-dark");
        } else {
          bar.classList.remove("on-dark");
        }
      }
    }

    window.addEventListener("scroll", updateSocialBar, { passive: true });
    window.addEventListener("resize", updateSocialBar);
    updateSocialBar();
    return () => {
      window.removeEventListener("scroll", updateSocialBar);
      window.removeEventListener("resize", updateSocialBar);
    };
  }, []);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <linearGradient id="social-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <linearGradient id="adn-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
      <div
        id="social-bar"
        ref={barRef}
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1500,
          opacity: 0,
          visibility: "hidden",
          transition: "opacity .4s,visibility .4s",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "22px 14px" }}>
          <a
            href="https://www.linkedin.com/company/2fpub"
            target="_blank"
            aria-label="LinkedIn"
            style={{ display: "flex", transition: "transform .22s" }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg viewBox="0 0 24 24" fill="url(#social-grad)" style={{ width: 20, height: 20 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/2fpublicite/"
            target="_blank"
            aria-label="Instagram"
            style={{ display: "flex", transition: "transform .22s" }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg viewBox="0 0 24 24" fill="url(#social-grad)" style={{ width: 20, height: 20 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a
            href="https://www.tiktok.com/@2fpub?lang=fr"
            target="_blank"
            aria-label="TikTok"
            style={{ display: "flex", transition: "transform .22s" }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg viewBox="0 0 24 24" fill="url(#social-grad)" style={{ width: 20, height: 20 }}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          <div className="social-sep" style={{ width: 1, height: 28, background: "linear-gradient(to bottom,var(--brand),var(--accent))", opacity: 0.6, transition: "background .3s,opacity .3s" }}></div>
          <span
            className="social-label"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              fontFamily: "'Righteous',sans-serif",
              whiteSpace: "nowrap",
              color: "var(--brand)",
              transition: "all .3s",
            }}
          >
            Suivez-nous
          </span>
        </div>
      </div>

      <a
        href="https://wa.me/33615147464"
        target="_blank"
        id="wa-float"
        title="Nous contacter sur WhatsApp"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          transition: "transform .22s,box-shadow .22s",
          textDecoration: "none",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" style={{ width: 30, height: 30 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", animation: "wa-pulse 2s ease-out infinite", zIndex: -1 }}></span>
      </a>
    </>
  );
}
