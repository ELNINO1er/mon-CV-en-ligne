"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site, whatsappUrl, mailtoUrl } from "@/lib/site";

const subjects = [
  "Site web professionnel",
  "Application web / métier",
  "Plateforme SaaS / portail client",
  "Automatisation IA",
  "E-commerce",
  "Refonte UI/UX",
  "Autre",
];

export default function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(
    defaultSubject && subjects.includes(defaultSubject) ? defaultSubject : subjects[0],
  );
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = name.trim().length >= 2 && message.trim().length >= 10;

  const compose = () =>
    `Bonjour Romaric,\n\nJe suis ${name || "…"}${email ? ` (${email})` : ""}.\nSujet : ${subject}\n\n${message}`;

  const onWhatsApp = () => {
    setTouched(true);
    if (!valid) return;
    window.open(whatsappUrl(compose()), "_blank", "noopener,noreferrer");
  };

  const onEmail = () => {
    setTouched(true);
    if (!valid) return;
    window.location.href = mailtoUrl(`Projet — ${subject}`, compose());
  };

  return (
    <form className="cform card" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="cform-row">
        <label className="field">
          <span className="field-label">Votre nom *</span>
          <input
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom / entreprise"
            autoComplete="name"
          />
          {touched && name.trim().length < 2 && (
            <span className="field-err">Indiquez votre nom (2 caractères min.).</span>
          )}
        </label>
        <label className="field">
          <span className="field-label">Votre email</span>
          <input
            className="field-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="field">
        <span className="field-label">Sujet</span>
        <div className="field-select">
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Icon name="ArrowRight" size={16} />
        </div>
      </label>

      <label className="field">
        <span className="field-label">Votre message *</span>
        <textarea
          className="field-input field-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Décrivez votre besoin, votre idée ou votre projet en quelques lignes…"
        />
        {touched && message.trim().length < 10 && (
          <span className="field-err">Décrivez votre besoin (10 caractères min.).</span>
        )}
      </label>

      <div className="cform-actions">
        <button type="button" className="btn btn-whatsapp" onClick={onWhatsApp}>
          <Icon name="MessageCircle" size={18} /> Envoyer via WhatsApp
        </button>
        <button type="button" className="btn btn-ghost" onClick={onEmail}>
          <Icon name="Mail" size={18} /> Envoyer par email
        </button>
      </div>
      <p className="cform-note mono">
        Réponse rapide — généralement sous 24h. Ou directement : {site.phoneDisplay}
      </p>

      <style>{`
        .cform { padding:clamp(22px,3vw,34px); display:flex; flex-direction:column; gap:18px; }
        .cform-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .field { display:flex; flex-direction:column; gap:8px; }
        .field-label { font-size:.82rem; font-weight:600; color:var(--muted); }
        .field-input, .field-select select {
          width:100%; background:rgba(0,0,0,.25); border:1px solid var(--border); border-radius:12px;
          padding:13px 15px; color:#fff; font-size:.95rem; font-family:inherit; transition:border-color .2s, box-shadow .2s;
        }
        .field-input::placeholder { color:var(--faint); }
        .field-input:focus, .field-select select:focus { outline:none; border-color:rgba(124,92,255,.6); box-shadow:0 0 0 3px rgba(124,92,255,.15); }
        .field-textarea { resize:vertical; min-height:120px; line-height:1.6; }
        .field-select { position:relative; }
        .field-select select { appearance:none; cursor:pointer; }
        .field-select svg { position:absolute; right:14px; top:50%; transform:translateY(-50%) rotate(90deg); color:var(--muted); pointer-events:none; }
        .field-err { color:#fca5a5; font-size:.8rem; }
        .cform-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:4px; }
        .cform-note { color:var(--faint); font-size:.8rem; }
        @media (max-width:560px){ .cform-row{ grid-template-columns:1fr; } }
      `}</style>
    </form>
  );
}
