import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Camera, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export default function BirthdayCake({ onShowGallery }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true]);
  const cakeRef = useRef(null);
  const flamesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cakeRef.current,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }
    );

    // Continuous flame flickering animation
    const tl = gsap.timeline({ repeat: -1 });
    flamesRef.current.forEach((flame) => {
      if (flame) {
        gsap.to(flame, {
          scaleY: 1.15,
          scaleX: 0.9,
          y: -2,
          duration: 0.3 + Math.random() * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
  }, []);

  const blowCandle = (idx) => {
    if (candlesBlown) return;
    const next = [...candles];
    next[idx] = false;
    setCandles(next);

    // If all blown
    if (next.every(c => !c)) {
      setCandlesBlown(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
      });
    }
  };

  const blowAll = () => {
    setCandles([false, false, false]);
    setCandlesBlown(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.55 },
    });
  };

  return (
    <div className="stage">
      <div
        ref={cakeRef}
        className="glass"
        style={{
          width: '100%', maxWidth: 360, padding: '32px 20px',
          textAlign: 'center', position: 'relative',
        }}
      >
        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 20, marginBottom: 8,
          background: 'rgba(139,90,43,0.12)',
        }}>
          <Sparkles size={14} color="var(--brown-mid)" />
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--brown-deep)', letterSpacing: 1, textTransform: 'uppercase',
          }}>
            Make a Wish 🤎✨
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2.1rem',
          color: 'var(--brown-dark)', marginBottom: 4,
        }}>
          Tiup Lilinnya, Achel! 🎂
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.8rem',
          color: 'var(--brown-deep)', marginBottom: 24,
        }}>
          {candlesBlown
            ? 'Yay! Semua lilin padam! Semoga semua doa dan impian Achel terwujud! 🤍✨'
            : 'Ketuk lilin atau tombol tiup untuk memadamkan apinya 🤎'}
        </p>

        {/* ── 3D Birthday Cake Visual ── */}
        <div style={{
          position: 'relative', width: 250, height: 210, margin: '0 auto 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        }}>
          {/* Candles */}
          <div style={{
            display: 'flex', gap: 24, marginBottom: -6, zIndex: 10,
          }}>
            {[0, 1, 2].map((idx) => {
              const isLit = candles[idx];
              return (
                <div
                  key={idx}
                  onClick={() => blowCandle(idx)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', position: 'relative',
                  }}
                >
                  {/* Flame */}
                  <div
                    ref={(el) => (flamesRef.current[idx] = el)}
                    style={{
                      width: 14, height: 22,
                      borderRadius: '50% 50% 35% 35%',
                      background: 'radial-gradient(circle at center bottom, #fff 0%, #ffd700 40%, #ff4500 100%)',
                      boxShadow: '0 0 16px #ff8c00, 0 0 30px #ffa500',
                      opacity: isLit ? 1 : 0,
                      transform: isLit ? 'scale(1)' : 'scale(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      marginBottom: 2,
                    }}
                  />

                  {/* Candle Wick */}
                  <div style={{ width: 2, height: 6, background: '#444' }} />

                  {/* Candle Body */}
                  <div style={{
                    width: 12, height: 38, borderRadius: '4px 4px 2px 2px',
                    background: 'repeating-linear-gradient(45deg, #b8864e, #b8864e 6px, #eeded1 6px, #eeded1 12px)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }} />
                </div>
              );
            })}
          </div>

          {/* Cake Top Tier */}
          <div style={{
            width: 150, height: 50, borderRadius: '18px',
            background: 'linear-gradient(180deg, #eeded1 0%, #d4a373 100%)',
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 6px 16px rgba(110,63,25,0.15)',
            position: 'relative', zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>🤎 ✨ 🤎</span>
          </div>

          {/* Cake Bottom Tier */}
          <div style={{
            width: 216, height: 72, borderRadius: '22px',
            marginTop: -10,
            background: 'linear-gradient(180deg, #b8864e 0%, #6e3f19 100%)',
            border: '2px solid rgba(255,255,255,0.7)',
            boxShadow: '0 12px 28px rgba(110,63,25,0.25)',
            position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem',
              color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.4)',
            }}>
              Happy Birthday Achel! 🤎
            </span>
          </div>

          {/* Cake Plate */}
          <div style={{
            width: 250, height: 14, borderRadius: '50%',
            background: '#ffffff', marginTop: -6, zIndex: 1,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            border: '1.5px solid rgba(212,163,89,0.3)',
          }} />
        </div>

        {/* Action Button */}
        {candlesBlown ? (
          <button
            onClick={onShowGallery}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
          >
            <Camera size={18} /> Buka Galeri Kenangan Achel 📸
          </button>
        ) : (
          <button
            onClick={blowAll}
            className="btn-ghost"
            style={{ width: '100%', padding: '12px', fontSize: '0.88rem' }}
          >
            <Flame size={16} /> Tiup Semua Lilin Sekaligus 💨
          </button>
        )}
      </div>
    </div>
  );
}
