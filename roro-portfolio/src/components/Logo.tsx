import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Romaric Bombade — RORO systems, accueil" className="logo">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-angle">&lt;</span>
        <span className="logo-slash">/</span>
        <span className="logo-angle">&gt;</span>
      </span>
      {!compact && (
        <span className="logo-copy">
          <span className="logo-title">RORO</span>
          <span className="logo-sub">systems</span>
        </span>
      )}
      <style>{`
        .logo { display:inline-flex; align-items:center; gap:11px; }
        .logo-mark {
          display:inline-flex; align-items:center;
          font-family: var(--font-mono), monospace;
          font-weight:800; font-size:1.15rem; letter-spacing:-0.06em;
          padding:6px 9px; border-radius:11px;
          background: linear-gradient(135deg,#0d0f1a,#141726);
          border:1px solid var(--border);
        }
        .logo-slash { color: var(--gold); text-shadow:0 0 10px rgba(245,197,66,.5); }
        .logo-angle { color: var(--cyan); }
        .logo-copy { display:flex; flex-direction:column; line-height:1; }
        .logo-title { font-family:var(--font-display); font-weight:700; font-size:1.02rem; color:#fff; letter-spacing:-0.02em; }
        .logo-sub { font-family:var(--font-mono); font-size:.62rem; letter-spacing:.28em; color:var(--gold); text-transform:uppercase; margin-top:2px; }
      `}</style>
    </Link>
  );
}
