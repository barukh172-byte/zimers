"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteZimmerButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("האם אתה בטוח שברצונך למחוק צימר זה?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/zimmers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete zimmer");
      }

      router.refresh();
    } catch (error) {
      alert("שגיאה במחיקת הצימר. אנא נסה שוב.");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      style={{ 
        color: 'var(--color-error)', 
        fontSize: '0.875rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1
      }}
    >
      {loading ? "מוחק..." : "מחק"}
    </button>
  );
}
