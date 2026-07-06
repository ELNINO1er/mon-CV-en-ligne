"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />

        <nav className="nav-links" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/contact" className="btn btn-primary nav-cta">
            Demander un devis
            <Icon name="ArrowRight" size={17} />
          </Link>
          <button
            className="nav-burger"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="nav-drawer-links">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-drawer-link ${isActive(l.href) ? "is-active" : ""}`}
            >
              {l.label}
              <Icon name="ArrowUpRight" size={18} />
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: 12 }}>
            Demander un devis gratuit
          </Link>
        </nav>
      </div>

      <style>{`
        .nav {
          position: sticky; top: 0; z-index: 60;
          transition: background .35s ease, border-color .35s ease, backdrop-filter .35s ease;
          border-bottom: 1px solid transparent;
        }
        .nav--scrolled {
          background: rgba(6,8,14,.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner { display:flex; align-items:center; justify-content:space-between; gap:20px; height:74px; }
        .nav-links { display:flex; align-items:center; gap:4px; }
        .nav-link {
          position:relative; font-size:.94rem; font-weight:500; color:var(--muted);
          padding:9px 15px; border-radius:10px; transition:color .2s, background .2s;
        }
        .nav-link:hover { color:#fff; background:var(--surface); }
        .nav-link.is-active { color:#fff; }
        .nav-link.is-active::after {
          content:""; position:absolute; left:15px; right:15px; bottom:2px; height:2px; border-radius:2px;
          background:linear-gradient(90deg,var(--violet),var(--cyan));
        }
        .nav-actions { display:flex; align-items:center; gap:12px; }
        .nav-cta { padding:11px 18px; font-size:.9rem; min-height:auto; }
        .nav-burger {
          display:none; align-items:center; justify-content:center;
          width:44px; height:44px; border-radius:12px;
          background:var(--surface); border:1px solid var(--border); color:#fff; cursor:pointer;
        }
        .nav-drawer {
          position:fixed; inset:74px 0 0 0; z-index:55;
          background:rgba(5,6,11,.96); backdrop-filter:blur(20px);
          padding:24px clamp(20px,5vw,40px);
          transform:translateY(-12px); opacity:0; pointer-events:none;
          transition:opacity .3s ease, transform .3s ease;
        }
        .nav-drawer.is-open { opacity:1; transform:none; pointer-events:auto; }
        .nav-drawer-links { display:flex; flex-direction:column; gap:8px; }
        .nav-drawer-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 18px; border-radius:14px; font-size:1.1rem; font-weight:600; color:var(--text);
          border:1px solid var(--border); background:var(--surface);
        }
        .nav-drawer-link.is-active { color:#fff; border-color:rgba(124,92,255,.5); }
        @media (max-width: 900px) {
          .nav-links { display:none; }
          .nav-cta { display:none; }
          .nav-burger { display:inline-flex; }
        }
      `}</style>
    </header>
  );
}
