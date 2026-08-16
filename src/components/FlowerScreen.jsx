import React, { useRef, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export default function FlowerScreen({ onRestart }) {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.3)' }
    );

    // Initial Confetti celebration
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });

    // Continuous falling petals animation
    petalsRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: '105vh',
          x: `+=${Math.random() * 80 - 40}`,
          rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 6 + Math.random() * 4,
          repeat: -1,
          ease: 'none',
          delay: i * 0.4
        });
      }
    });
  }, []);

  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 95}%`,
    size: 14 + Math.random() * 12,
    emoji: ['🤎', '🌸', '✨', '🍂', '🤍'][i % 5]
  }));

  return (
    <div className="stage stage--scroll" style={{ width: '100%', maxWidth: 430, margin: '0 auto', position: 'relative' }}>
      
      {/* ── FALLING PETALS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {petals.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => (petalsRef.current[i] = el)}
            style={{
              position: 'absolute', top: -30, left: p.left,
              fontSize: p.size, opacity: 0.75
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* ── MAIN CARD ── */}
      <div
        ref={containerRef}
        className="glass"
        style={{
          width: '100%', maxWidth: 360, margin: '0 auto 24px',
          padding: '28px 20px', textAlign: 'center', position: 'relative',
          zIndex: 1, borderRadius: 32
        }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 30, marginBottom: 12,
          background: 'rgba(212,163,89,0.12)', border: '1px solid rgba(212,163,89,0.25)'
        }}>
          <Sparkles size={14} color="var(--brown-mid)" />
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--brown-deep)', letterSpacing: 1.5, textTransform: 'uppercase'
          }}>
            Special Gift for Achel
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2.4rem',
          color: 'var(--brown-dark)', marginBottom: 4
        }}>
          Buket Bunga Cantik 💐🤎
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
          color: 'var(--brown-deep)', marginBottom: 20
        }}>
          Bunga virtual yang mekar abadi untuk Achel tersayang 🤍✨
        </p>

        {/* Bouquet Illustration */}
        <div style={{
          position: 'relative', width: 230, height: 230, margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="anim-breathe" style={{ width: '100%', height: '100%' }}>
            <img
              src="/bucket bunga 2 no bg.png"
              alt="Buket Bunga Achel"
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                filter: 'drop-shadow(0 12px 24px rgba(110,63,25,0.25))'
              }}
              onError={(e) => { e.target.src = '/bunga bucket no bg.png'; }}
            />
          </div>
        </div>

        {/* Dedicated Message Note */}
        <div style={{
          background: 'rgba(255,255,255,0.9)', padding: '16px 14px',
          borderRadius: 20, border: '1px solid rgba(212,163,89,0.3)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)', marginBottom: 24
        }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '1.4rem',
            color: 'var(--brown-dark)', marginBottom: 6
          }}>
            "May your days always bloom with joy and happiness" 🌸
          </p>
          <p style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
            color: 'var(--brown-deep)', fontWeight: 600
          }}>
            Happy 19th Birthday Achel 🤎✨ — From Caca 🤍
          </p>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
        >
          <RotateCcw size={18} /> Ulangi Pameran dari Awal 🔄
        </button>
      </div>

    </div>
  );
}
