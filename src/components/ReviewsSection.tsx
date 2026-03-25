"use client";

import { useState, useEffect, useCallback } from "react";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsSection({ zimmerId }: { zimmerId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?zimmerId=${zimmerId}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [zimmerId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewAdded = () => {
    fetchReviews();
    setShowForm(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <span style={{ direction: 'ltr', display: 'inline-flex', gap: '0.15rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              color: star <= rating ? 'var(--color-primary)' : 'var(--color-border)',
              fontSize: '1rem',
            }}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontSize: '2rem' }}>
          ביקורות <span style={{ color: 'var(--color-primary)' }}>אורחים</span>
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? "סגור" : "✍ כתבו ביקורת"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="glass-card" style={{
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
            שתפו את החוויה שלכם
          </h3>
          <ReviewForm zimmerId={zimmerId} onReviewAdded={handleReviewAdded} />
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          טוען ביקורות...
        </div>
      ) : reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass"
              style={{
                padding: '1.5rem 2rem',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Avatar */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), #b8972e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#000',
                    fontSize: '1rem',
                  }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{review.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p style={{
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                marginRight: '3.5rem',
              }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass" style={{
          padding: '3rem',
          textAlign: 'center',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            עדיין אין ביקורות לנכס זה.
          </p>
          <button onClick={() => setShowForm(true)} className="btn btn-secondary">
            היו הראשונים לכתוב ביקורת!
          </button>
        </div>
      )}
    </div>
  );
}
