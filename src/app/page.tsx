"use client";
import { useState, useEffect } from "react";
import VIPDinnerCards from "@/components/RasaVipDinnerCards";

const PASSCODE = "RASA2026";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("vip-access") === "granted") {
      setAuthorized(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      sessionStorage.setItem("vip-access", "granted");
      setAuthorized(true);
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  if (checking) return null;
  if (authorized) return <VIPDinnerCards />;

  return (
    <div style={{
      background: "#0a0b10", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: 24,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ textAlign: "center", maxWidth: 360, width: "100%" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.3em", color: "#7c5cfc", marginBottom: 12,
        }}>Rasa — VIP Dinner</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 28, fontWeight: 700, color: "#f0f0f5", marginBottom: 8,
        }}>Guest Intelligence</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4a4d60",
          marginBottom: 40,
        }}>Enter passcode to continue</div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Passcode"
            autoFocus
            style={{
              width: "100%", padding: "14px 18px",
              background: "#13141f", border: `1px solid ${error ? "#f87171" : "#1e2030"}`,
              borderRadius: 10, color: "#f0f0f5", fontSize: 16,
              fontFamily: "'JetBrains Mono', monospace",
              outline: "none", textAlign: "center",
              letterSpacing: "0.15em",
              transition: "border-color 0.2s ease",
              boxSizing: "border-box",
            }}
          />
          <button type="submit" style={{
            width: "100%", marginTop: 12, padding: "12px 18px",
            background: "#7c5cfc", border: "none", borderRadius: 10,
            color: "#ffffff", fontSize: 13, fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer", letterSpacing: "0.05em",
          }}>Access Briefing</button>
        </form>

        {error && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "#f87171", marginTop: 16,
          }}>Incorrect passcode</div>
        )}
      </div>
    </div>
  );
}
