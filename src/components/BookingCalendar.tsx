"use client";

import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import { he } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface BookingCalendarProps {
  pricePerNight: number;
  zimmerId: string;
}

export default function BookingCalendar({ pricePerNight, zimmerId }: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const numberOfNights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const totalPrice = numberOfNights * pricePerNight;

  const handleBooking = async () => {
    if (!range?.from || !range?.to) return;
    setBookingStatus('loading');
    
    // In a real app, this would call an API to create a reservation
    // For now, we simulate success as per current phase requirements
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  if (bookingStatus === 'success') {
    return (
      <div className="glass" style={{ padding: '2rem', textAlign: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-success)' }}>
        <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>בקשת ההזמנה נשלחה!</h3>
        <p style={{ fontSize: '0.875rem' }}>הקונסיירז' שלנו יצור איתך קשר טלפוני בהקדם לאישור ההזמנה ותשלום.</p>
        <button onClick={() => setBookingStatus('idle')} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>חזרה</button>
      </div>
    );
  }

  return (
    <div className="glass" style={{ 
      padding: '2rem', 
      borderRadius: 'var(--border-radius-lg)', 
      border: '1px solid var(--color-primary)',
      boxShadow: '0 0 30px rgba(212, 175, 55, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.25rem' }}>הזמנת חופשה</h3>
      
      <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--color-surface)', borderRadius: 'var(--border-radius-md)', padding: '0.5rem' }}>
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          locale={he}
          dir="rtl"
          modifiersClassNames={{
            selected: 'rdp-selected-custom',
            range_start: 'rdp-range-start-custom',
            range_end: 'rdp-range-end-custom'
          }}
          disabled={{ before: new Date() }}
        />
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>₪{pricePerNight} x {numberOfNights || 0} לילות</span>
          <span>₪{totalPrice}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', marginTop: '1rem', color: 'var(--color-primary)' }}>
          <span>סה"כ</span>
          <span>₪{totalPrice}</span>
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
        disabled={!range?.from || !range?.to || bookingStatus === 'loading'}
        onClick={handleBooking}
      >
        {bookingStatus === 'loading' ? 'מעבד...' : 'בקש שריון תאריכים'}
      </button>
      
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        * התשלום יבוצע טלפונית לאחר אישור הזמינות.
      </p>

      <style jsx global>{`
        .rdp {
          --rdp-accent-color: var(--color-primary);
          --rdp-background-color: var(--color-surface-hover);
          margin: 0;
        }
        .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
          background-color: var(--color-primary) !important;
          color: black !important;
        }
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
           background-color: var(--color-surface-hover);
        }
      `}</style>
    </div>
  );
}
