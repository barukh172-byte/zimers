"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Zimmer {
  id?: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  imageUrl?: string | null;
  amenities: string;
  isAvailable?: boolean;
  poolType?: string | null;
  suitableFor?: string | null;
}

export default function ZimmerForm({ initialData }: { initialData?: Zimmer }) {
  const [formData, setFormData] = useState<Zimmer>(initialData || {
    name: "",
    description: "",
    price: 0,
    capacity: 2,
    imageUrl: "",
    amenities: "",
    isAvailable: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = initialData?.id ? `/api/zimmers/${initialData.id}` : "/api/zimmers";
    const method = initialData?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save zimmer data");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: 'var(--border-radius-md)', fontSize: '0.875rem', border: '1px solid var(--color-error)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <label className="label-base">שם הצימר</label>
          <input 
            name="name" 
            className="input-base" 
            required 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="לדוגמה: בקתת האלון המלכותי"
          />
        </div>
        <div>
          <label className="label-base">מחיר ללילה (₪)</label>
          <input 
            name="price" 
            type="number" 
            className="input-base" 
            required 
            value={formData.price} 
            onChange={handleChange} 
            style={{ direction: 'ltr', textAlign: 'right' }}
          />
        </div>
        <div>
          <label className="label-base">תפוסה מקסימלית (אורחים)</label>
          <input 
            name="capacity" 
            type="number" 
            className="input-base" 
            required 
            value={formData.capacity} 
            onChange={handleChange} 
            style={{ direction: 'ltr', textAlign: 'right' }}
          />
        </div>
        <div>
          <label className="label-base">סוג בריכה</label>
          <select 
            name="poolType" 
            className="input-base" 
            value={formData.poolType || "ללא"} 
            onChange={handleChange}
          >
            <option value="ללא">ללא</option>
            <option value="פרטית">פרטית</option>
            <option value="מחוממת ומקורה">מחוממת ומקורה</option>
            <option value="משותפת">משותפת</option>
          </select>
        </div>
        <div>
          <label className="label-base">מתאים ל...</label>
          <select 
            name="suitableFor" 
            className="input-base" 
            value={formData.suitableFor || "גם וגם"} 
            onChange={handleChange}
          >
            <option value="גם וגם">גם וגם</option>
            <option value="זוגות בלבד">זוגות בלבד</option>
            <option value="משפחות">משפחות</option>
          </select>
        </div>
        <div>
          <label className="label-base">קישור לתמונה</label>
          <input 
            name="imageUrl" 
            className="input-base" 
            value={formData.imageUrl || ""} 
            onChange={handleChange} 
            placeholder="https://images.unsplash.com/..."
            style={{ direction: 'ltr', textAlign: 'left' }}
          />
        </div>
      </div>

      <div>
        <label className="label-base">מתקנים (מופרדים בפסיקים)</label>
        <input 
          name="amenities" 
          className="input-base" 
          required 
          value={formData.amenities} 
          onChange={handleChange} 
          placeholder="Wi-Fi, ג'קוזי, נוף להרים..."
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>יוצגו כתגיות נפרדות.</p>
      </div>

      <div>
        <label className="label-base">תיאור</label>
        <textarea 
          name="description" 
          className="input-base" 
          required 
          rows={6} 
          value={formData.description} 
          onChange={handleChange} 
          style={{ resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button type="button" onClick={() => router.back()} className="btn btn-secondary">ביטול</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "שומר..." : initialData?.id ? "עדכן צימר" : "צור צימר"}
        </button>
      </div>

      <style jsx>{`
        .label-base {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
        }
      `}</style>
    </form>
  );
}
