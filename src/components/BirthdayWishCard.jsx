import React, { useRef, useEffect } from 'react';
import { Sparkles, Heart, Crown, RotateCcw, Share2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

export default function BirthdayWishCard({ onNext, onRestart }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.88, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
    );
    tl.fromTo('.reveal-el',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    );

    // Confetti pop
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Continuous floating for decorative elements
    gsap.to('.card-deco-float', {
      y: -6, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.2
    });
  }, []);

  return (
    <div className="stage stage--scroll" style={{ width: '100%', maxWidth: 430, margin: '0 auto' }}>
      
      {/* ── CARD SHELL ── */}
      <div
        ref={cardRef}
        style={{
          width: '100%', maxWidth: 360, margin: '0 auto 24px',
          background: 'linear-gradient(180deg, #fdfbf7 0%, #f4ebe1 100%)',
          borderRadius: 32, padding: '24px 20px',
          boxShadow: '0 20px 50px rgba(110,63,25,0.18)',
          border: '2px solid rgba(212,163,89,0.4)',
          position: 'relative', overflow: 'hidden', textAlign: 'center'
        }}
      >
        {/* Decorative Luxury Border Pattern */}
        <div style={{
          position: 'absolute', inset: 8, border: '1.5px dashed rgba(184,134,11,0.3)',
          borderRadius: 24, pointerEvents: 'none'
        }} />

        {/* Floating Stickers / Accents */}
        <div className="card-deco-float" style={{ position: 'absolute', top: 20, left: 20, fontSize: '1.3rem' }}>
          🤎
        </div>
        <div className="card-deco-float" style={{ position: 'absolute', top: 24, right: 22, fontSize: '1.2rem' }}>
          ✨
        </div>
        <div className="card-deco-float" style={{ position: 'absolute', bottom: 20, left: 22, fontSize: '1.2rem' }}>
          🧸
        </div>
        <div className="card-deco-float" style={{ position: 'absolute', bottom: 20, right: 20, fontSize: '1.3rem' }}>
          🌸
        </div>

        {/* Inner Card Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '10px 4px' }}>
          
          {/* Top Crown Badge */}
          <div className="reveal-el" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #b8864e, #6e3f19)',
            boxShadow: '0 6px 16px rgba(110,63,25,0.3)', marginBottom: 16
          }}>
            <Crown size={22} color="#fff" />
          </div>

          {/* Photo Frame with Avatar (acel 8.jpeg) */}
          <div className="reveal-el" style={{
            position: 'relative', width: 140, height: 140, margin: '0 auto 18px',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              overflow: 'hidden', border: '4px solid #fff',
              boxShadow: '0 10px 25px rgba(110,63,25,0.2)',
              background: '#eeded1'
            }}>
              <img
                src="/acel 8.jpeg"
                alt="Achel"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/acel 8.jpeg'; }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 4,
              background: '#b8864e', borderRadius: '50%', width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <Heart size={16} color="#fff" fill="#fff" />
            </div>
          </div>

          {/* Card Headings */}
          <p className="reveal-el" style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.78rem', fontWeight: 700,
            color: 'var(--brown-mid)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4
          }}>
            Kartu Ucapan Ulang Tahun 🤎
          </p>

          <h1 className="reveal-el" style={{
            fontFamily: 'var(--font-display)', fontSize: '2.5rem',
            color: 'var(--brown-dark)', lineHeight: 1.1, marginBottom: 12,
            textShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            Achel 🤎✨
          </h1>

          {/* Quote Container */}
          <div className="reveal-el" style={{
            background: 'rgba(255,255,255,0.9)', padding: '16px 14px',
            borderRadius: 18, border: '1px solid rgba(212,163,89,0.25)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)', marginBottom: 20
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: '#3a2318', lineHeight: 1.65, fontStyle: 'italic'
            }}>
              "happy birthday maaii beiibiiikuu tersayangg... cacaa beruntung bangett bisaa menjadi bagian perjalanan achell saat inii thatss makee im always happyyyy 🤍"
            </p>
          </div>

          {/* Signoff */}
          <div className="reveal-el" style={{ marginBottom: 10 }}>
            <p style={{
              fontFamily: 'var(--font-cute)', fontSize: '0.72rem',
              color: 'var(--brown-mid)', fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase', marginBottom: 4
            }}>
              With Warmest Love & Best Wishes — Caca 🤍✨
            </p>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '1.7rem',
              color: 'var(--brown-dark)'
            }}>
              Happy 19th Birthday, Achel 🤎✨
            </p>
          </div>

        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        width: '100%', maxWidth: 360, margin: '0 auto'
      }}>
        <button
          onClick={onNext}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
        >
          <Sparkles size={18} /> Lihat Buket Bunga Spesial 💐
        </button>

        <button
          onClick={onRestart}
          className="btn-ghost"
          style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
        >
          <RotateCcw size={15} /> Ulangi Pameran dari Awal 🔄
        </button>
      </div>

    </div>
  );
}
