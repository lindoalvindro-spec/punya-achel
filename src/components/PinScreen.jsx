import React, { useState, useRef, useEffect } from 'react';
import { Lock, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

export default function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '160807';
  const cardRef = useRef(null);
  const dotsRef = useRef([]);
  const lockRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }
    );
    tl.fromTo(lockRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
      0.2
    );
  }, []);

  const handleDigit = (digit) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(false);

      const dotIdx = pin.length;
      if (dotsRef.current[dotIdx]) {
        gsap.fromTo(dotsRef.current[dotIdx],
          { scale: 0.5, backgroundColor: 'var(--brown-soft)' },
          { scale: 1.25, backgroundColor: 'var(--brown-deep)', duration: 0.15, yoyo: true, repeat: 1 }
        );
      }

      if (nextPin.length === 6) {
        if (nextPin === correctPin) {
          gsap.to(cardRef.current, {
            scale: 1.05, opacity: 0, duration: 0.4, ease: 'power2.in',
            onComplete: onUnlock,
          });
        } else {
          setError(true);
          gsap.timeline()
            .to(cardRef.current, { x: -12, duration: 0.08, repeat: 5, yoyo: true, ease: 'none' })
            .to(cardRef.current, { x: 0, duration: 0.1 });
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 900);
        }
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <div className="stage">
      <div
        ref={cardRef}
        className="glass"
        style={{
          width: '100%', maxWidth: 360, padding: '36px 24px',
          textAlign: 'center', position: 'relative',
        }}
      >
        {/* Animated Lock Icon Badge */}
        <div
          ref={lockRef}
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brown-deep) 0%, var(--brown-soft) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(110,63,25,0.3)',
          }}
        >
          {pin.length === 6 && pin === correctPin ? (
            <ShieldCheck size={28} color="#fff" />
          ) : (
            <Lock size={26} color="#fff" />
          )}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2rem',
          color: 'var(--brown-dark)', marginBottom: 4, lineHeight: 1.2,
        }}>
          Akses Galeri Spesial 🤎✨
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.8rem',
          color: 'var(--brown-deep)', marginBottom: 24, fontWeight: 500,
        }}>
          Masukkan kode sandi akses 🤎
        </p>

        {/* PIN Dots (6 digits) */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 10,
          marginBottom: error ? 12 : 28,
        }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const filled = i < pin.length;
            return (
              <div
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: filled ? 'none' : '2px dashed var(--brown-soft)',
                  background: filled
                    ? error ? '#e11d48' : 'var(--brown-deep)'
                    : 'transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {filled && !error && (
                  <span style={{ fontSize: 9, color: '#fff' }}>🤎</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 20, marginBottom: 16,
            background: 'rgba(212,69,108,0.12)', color: 'var(--brown-mid)',
            fontSize: '0.75rem', fontWeight: 600,
            border: '1px solid rgba(212,69,108,0.25)',
          }}>
            <AlertCircle size={13} />
            <span>Kode akses belum tepat! Coba lagi yaa 🥺</span>
          </div>
        )}

        {/* Number Keypad */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, maxWidth: 280, margin: '0 auto',
        }}>
          {keys.map((k, idx) => {
            if (k === '') return <div key={idx} />;
            const isAction = k === '⌫';
            return (
              <button
                key={idx}
                onClick={() => (isAction ? handleDelete() : handleDigit(k))}
                style={{
                  height: 54, borderRadius: 18,
                  border: isAction ? 'none' : '1px solid rgba(212,163,89,0.3)',
                  background: isAction ? 'transparent' : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  fontFamily: var(--font-cute), fontSize: isAction ? '1.1rem' : '1.35rem',
                  fontWeight: 600, color: 'var(--brown-dark)',
                  cursor: 'pointer',
                  boxShadow: isAction ? 'none' : '0 4px 12px rgba(110,63,25,0.06)',
                  transition: 'transform 0.15s, background 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  userSelect: 'none', WebkitUserSelect: 'none',
                }}
                onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
