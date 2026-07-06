import { trustedBrands } from "@/lib/content";

export default function TrustedBrands() {
  const items = [...trustedBrands, ...trustedBrands];
  return (
    <div className="trust">
      <p className="trust-label mono">Ils m&apos;ont fait confiance</p>
      <div className="marquee-mask">
        <div className="marquee">
          {items.map((b, i) => (
            <span key={b + i} className="trust-item">
              <span className="trust-mark" aria-hidden="true">
                {"</>"}
              </span>
              {b}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .trust { display:flex; flex-direction:column; gap:20px; align-items:center; }
        .trust-label { font-size:.72rem; letter-spacing:.18em; text-transform:uppercase; color:var(--faint); }
        .trust-item {
          display:inline-flex; align-items:center; gap:10px; white-space:nowrap;
          font-family:var(--font-display); font-weight:600; font-size:1.05rem; color:var(--muted);
          padding:12px 22px; border:1px solid var(--border); border-radius:14px; background:var(--surface);
        }
        .trust-mark { font-family:var(--font-mono); font-weight:800; color:var(--cyan); letter-spacing:-.08em; }
      `}</style>
    </div>
  );
}
