"use client";

import { useState } from "react";

export default function ReviewForm({ zimmerId, onReviewAdded }: { zimmerId: string; onReviewAdded: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("אנא בחרו דירוג");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zimmerId, name, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "שגיאה");
      }

      setSuccess(true);
      setName("");
      setRating(0);
      setComment("");
      onReviewAdded();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    }}>
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-text-muted)'
        }}>
          שם מלא
        </label>
        <input
          type="text"
          required
          className="input-base"
          placeholder="השם שלכם"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-text-muted)'
        }}>
          דירוג
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', direction: 'ltr' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: star <= (hoverRating || rating) ? 'var(--color-primary)' : 'var(--color-border)',
                transition: 'color 0.15s ease, transform 0.15s ease',
                transform: star <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-text-muted)'
        }}>
          הביקורת שלכם
        </label>
        <textarea
          required
          className="input-base"
          placeholder="ספרו לנו על החוויה שלכם..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--color-error)',
          color: 'var(--color-error)',
          padding: '0.75rem',
          borderRadius: 'var(--border-radius-md)',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid var(--color-success)',
          color: 'var(--color-success)',
          padding: '0.75rem',
          borderRadius: 'var(--border-radius-md)',
          fontSize: '0.875rem'
        }}>
          ✓ הביקורת שלכם נשמרה בהצלחה! תודה רבה.
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? "שולח..." : "שלחו ביקורת"}
      </button>
    </form>
  );
}
