// src/pages/Preorder.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Preorder.css";

// Same-origin by default when running under Vercel dev (http://localhost:3000)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export default function Preorder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bottles, setBottles] = useState(1);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  // Simple lang detection; if you're using i18n, you can swap this for i18n.language
  const lang =
    (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("de"))
      ? "de"
      : "en";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // Basic client validation
    const fullName = name.trim();
    if (!fullName) return setErr(lang === "de" ? "Bitte geben Sie Ihren Namen ein." : "Please enter your name.");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return setErr(lang === "de" ? "Bitte geben Sie eine gültige E-Mail ein." : "Please enter a valid email.");

    const qty = Number(bottles);
    if (!Number.isInteger(qty) || qty < 1 || qty > 12) {
      return setErr(lang === "de" ? "Flaschenanzahl muss zwischen 1 und 12 liegen." : "Bottle count must be between 1 and 12.");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/preorders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: email.trim(),
          bottles: qty,
          lang,
          note: note.trim() || undefined,
        }),
      });

      // Try to surface server error text clearly
      if (!res.ok) {
        const text = await res.text();
        let message = "Something went wrong. Please try again.";
        try {
          const data = JSON.parse(text);
          message = data?.error || message;
        } catch {
          // non-JSON error; keep default message but log the raw text
          console.warn("Preorder API error (raw):", text);
        }
        throw new Error(message);
      }

      setOk(true);
    } catch (e) {
      setErr(e?.message || (lang === "de" ? "Netzwerkfehler. Bitte erneut versuchen." : "Network error. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <section className="preorder">
        <header className="po-hero">
          <div className="po-eyebrow">{lang === "de" ? "Einladungsanfrage" : "Invitation Request"}</div>
          <h1 className="po-title">
            {lang === "de" ? "Bitte E-Mail bestätigen" : "Check your email to confirm"}
          </h1>
          <p className="po-lead">
            {lang === "de"
              ? <>Wir haben einen Bestätigungslink an <strong>{email}</strong> gesendet. Nach der Bestätigung erhalten Sie automatisch die Rechnung mit IBAN und PayPal-QR-Code.</>
              : <>We’ve sent a verification link to <strong>{email}</strong>. Once confirmed, you’ll receive the invoice with our IBAN and a PayPal QR code.</>}
          </p>
        </header>

        <div className="po-card po-success">
          <div className="po-success-icon" aria-hidden>✓</div>
          <div className="po-success-copy">
            <p>{lang === "de" ? "Nicht erhalten? Spam prüfen oder in ein paar Minuten erneut versuchen." : "Didn’t receive it? Check your spam folder or try again in a few minutes."}</p>
            <p>{lang === "de" ? "Sie können den Tab schließen – wir melden uns." : "You can close this tab — we’ll take it from here."}</p>
          </div>
        </div>

        <div className="po-actions">
          <Link to="/" className="po-ghost">{lang === "de" ? "Zur Startseite" : "Back to Home"}</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="preorder">
      <header className="po-hero">
        <div className="po-eyebrow">{lang === "de" ? "Erste Ernte" : "First Harvest Release"}</div>
        <h1 className="po-title">{lang === "de" ? "Reservieren Sie Ihre Flasche" : "Reserve Your Bottle"}</h1>
        <p className="po-lead">
          {lang === "de"
            ? "Haouzia • Von Hand gepflückt • Innerhalb einer Stunde gepresst • Marrakech. Tragen Sie unten Ihre Daten ein, um eine Einladung anzufordern."
            : "Haouzia • Hand-picked • Pressed within the hour • Marrakech. Drop your details below to request an invitation."}
        </p>
      </header>

      <form className="po-form" onSubmit={onSubmit} noValidate>
        <div className="po-grid">
          <label className="po-field">
            <span>{lang === "de" ? "Name" : "Name"}</span>
            <input
              type="text"
              placeholder={lang === "de" ? "Ihr vollständiger Name" : "Your full name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>

          <label className="po-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="po-field">
            <span>{lang === "de" ? "Flaschen" : "Bottles"}</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={12}
              step={1}
              value={bottles}
              onChange={(e) => {
                const v = e.target.valueAsNumber;
                setBottles(Number.isFinite(v) ? v : 1);
              }}
              required
            />
          </label>

          <label className="po-field po-col-span">
            <span>{lang === "de" ? "Nachricht (optional)" : "Message (optional)"}</span>
            <textarea
              rows={4}
              placeholder={
                lang === "de"
                  ? "Alles, was wir wissen sollten (Versandland, bevorzugtes Erntefenster, etc.)"
                  : "Tell us anything we should know (shipping country, preferred harvest window, etc.)"
              }
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>

        {err && (
          <div className="po-error" role="alert" aria-live="polite">
            {err}
          </div>
        )}

        <div className="po-actions">
          <button className="po-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" aria-hidden /> : (lang === "de" ? "Einladung anfragen" : "Request Invitation")}
          </button>
          <Link to="/" className="po-ghost">{lang === "de" ? "Zur Startseite" : "Back to Home"}</Link>
        </div>
      </form>
    </section>
  );
}


