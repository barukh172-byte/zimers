"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="container" style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>כניסת <span style={{ color: 'var(--color-primary)' }}>מנהל</span></h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>הזן את פרטייך לניהול הצימרים.</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--color-error)', 
            color: 'var(--color-error)', 
            padding: '0.75rem', 
            borderRadius: 'var(--border-radius-md)', 
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            פרטי התחברות שגויים. הגישה נדחתה.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              כתובת אימייל
            </label>
            <input 
              type="email" 
              required 
              className="input-base" 
              placeholder="admin@zimmerlux.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ direction: 'ltr', textAlign: 'left' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              סיסמה
            </label>
            <input 
              type="password" 
              required 
              className="input-base" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ direction: 'ltr', textAlign: 'left' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ marginTop: '1rem', width: '100%' }}
            disabled={loading}
          >
            {loading ? "מתחבר..." : "התחבר לפאנל הניהול"}
          </button>
        </form>
      </div>
    </div>
  );
}
