import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, X, Maximize2, Award } from 'lucide-react';
import gsap from 'gsap';

export default function MemoryGallery({ onNext }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);

  const exhibits = [
    { src: '/acel 2.jpeg', tag: 'EXHIBIT #01', title: 'Sweet Achel ✨' },
    { src: '/acel 3.jpeg', tag: 'EXHIBIT #02', title: 'Cute Smile 🤎' },
    { src: '/acel 4.jpeg', tag: 'EXHIBIT #03', title: 'Lovely Moments 🌟' },
    { src: '/acel 5.jpeg', tag: 'EXHIBIT #04', title: 'Precious Memories 🌸' },
    { src: '/acel 6.jpeg', tag: 'EXHIBIT #05', title: 'Beauty in Simplicity 🤍' },
    { src: '/acel 7.jpeg', tag: 'EXHIBIT #06', title: 'Warm Atmosphere ☀️' },
    { src: '/acel 8.jpeg', tag: 'EXHIBIT #07', title: 'Charming View 🥐' },
    { src: '/acel 9.jpeg', tag: 'EXHIBIT #08', title: 'Joyful Heart 🧸' },
    { src: '/acel 10.jpeg', tag: 'EXHIBIT #09', title: 'Favorite Smile 💖' },
    { src: '/acel 11.jpeg', tag: 'EXHIBIT #10', title: 'Golden Hour 🍂' },
    { src: '/acel 12.jpeg', tag: 'EXHIBIT #11', title: 'Special Moment 💫' },
    { src: '/acel 13.jpeg', tag: 'EXHIBIT #12', title: 'Adorable Look 🎀' },
    { src: '/acel 14.jpeg', tag: 'EXHIBIT #13', title: 'Sweet Heart 💐' },
    { src: '/acel 15.jpeg', tag: 'EXHIBIT #14', title: 'Radiant Glow 💎' },
    { src: '/acel 16.jpeg', tag: 'EXHIBIT #15', title: 'Happy Vibe ✨' },
    { src: '/acel 17.jpeg', tag: 'EXHIBIT #16', title: 'Pure Delight 🤎' },
    { src: '/acel 18.jpeg', tag: 'EXHIBIT #17', title: 'Shining Bright 🌟' },
    { src: '/acel 19.jpeg', tag: 'EXHIBIT #18', title: 'Love of My Life 🤍' },
    { src: '/acel 20.jpeg', tag: 'EXHIBIT #19', title: 'Pure Joy ✨' },
    { src: '/acel 21.jpeg', tag: 'EXHIBIT #20', title: 'Sweet Memory 🤎' },
    { src: '/acel 22.jpeg', tag: 'EXHIBIT #21', title: 'Golden Smile 🌟' },
    { src: '/acel 23.jpeg', tag: 'EXHIBIT #22', title: 'Forever & Always 🤍' },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.gallery-header', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
    );
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)' },
      '-=0.3'
    );
    tl.fromTo('.gallery-thumbnails',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    if (isLightbox) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIdx, isLightbox]);

  const changeSlide = (newIdx, direction = 1) => {
    if (!imageContainerRef.current) {
      setCurrentIdx(newIdx);
      return;
    }

    gsap.to(imageContainerRef.current, {
      opacity: 0,
      x: -direction * 40,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIdx(newIdx);
        requestAnimationFrame(() => {
          gsap.fromTo(imageContainerRef.current,
            { opacity: 0, x: direction * 40, scale: 0.96 },
            { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
          );
        });
      }
    });
  };

  const handlePrev = () => {
    const next = currentIdx === 0 ? exhibits.length - 1 : currentIdx - 1;
    changeSlide(next, -1);
  };

  const handleNext = () => {
    const next = currentIdx === exhibits.length - 1 ? 0 : currentIdx + 1;
    changeSlide(next, 1);
  };

  const current = exhibits[currentIdx];

  return (
    <div className="stage stage--scroll" style={{ width: '100%', maxWidth: 430, margin: '0 auto' }}>
      
      {/* ── HEADER ── */}
      <div className="gallery-header" style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 30, marginBottom: 8,
          background: 'rgba(212,163,89,0.12)', border: '1px solid rgba(212,163,89,0.25)',
        }}>
          <Sparkles size={14} color="var(--brown-mid)" />
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--brown-deep)', letterSpacing: 1.5, textTransform: 'uppercase'
          }}>
            Exclusive Art Gallery
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2.4rem',
          color: 'var(--brown-dark)', lineHeight: 1.15, marginBottom: 4,
          textShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          Achel's Gallery 🤎
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
          color: 'var(--brown-deep)', fontWeight: 500
        }}>
          Setiap momen dan senyuman Achel yang selalu berharga ✨
        </p>
      </div>

      {/* ── MAIN EXHIBIT FRAME ── */}
      <div
        ref={cardRef}
        className="glass"
        style={{
          width: '100%', maxWidth: 360, padding: '16px 16px 20px',
          margin: '0 auto 24px', position: 'relative',
          borderRadius: 28, border: '1.5px solid rgba(255,255,255,0.8)',
          boxShadow: '0 20px 40px rgba(110,63,25,0.12)'
        }}
      >
        {/* Frame Top Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 12, padding: '0 4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--brown-deep), var(--brown-soft))',
              color: '#fff', fontSize: '0.68rem', fontWeight: 800,
              padding: '3px 8px', borderRadius: 8, letterSpacing: 0.5
            }}>
              {current.tag}
            </span>
            <span style={{
              fontSize: '0.75rem', fontWeight: 700, color: 'var(--brown-deep)',
              fontFamily: 'var(--font-cute)'
            }}>
              {current.title}
            </span>
          </div>

          <button
            onClick={() => setIsLightbox(true)}
            style={{
              background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(212,163,89,0.2)',
              borderRadius: '50%', width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--brown-deep)'
            }}
            title="Perbesar Foto"
          >
            <Maximize2 size={13} />
          </button>
        </div>

        {/* Image Display Area */}
        <div
          ref={imageContainerRef}
          onClick={() => setIsLightbox(true)}
          style={{
            position: 'relative', width: '100%', height: 340,
            borderRadius: 20, overflow: 'hidden',
            background: 'linear-gradient(180deg, #f5efe6 0%, #e8dfd8 100%)',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)',
            cursor: 'pointer'
          }}
        >
          <img
            src={current.src}
            alt={current.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center center'
            }}
            onError={(e) => { e.target.src = '/acel 2.jpeg'; }}
          />

          {/* Luxury Corner Ornaments */}
          <div style={{
            position: 'absolute', inset: 8, border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 14, pointerEvents: 'none'
          }} />
        </div>

        {/* Controls Navigation Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 16, padding: '0 4px'
        }}>
          <button
            onClick={handlePrev}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none',
              background: 'linear-gradient(135deg, var(--brown-deep), var(--brown-soft))',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(110,63,25,0.25)',
              transition: 'transform 0.15s'
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
              fontWeight: 700, color: 'var(--brown-dark)'
            }}>
              {currentIdx + 1} / {exhibits.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none',
              background: 'linear-gradient(135deg, var(--brown-deep), var(--brown-soft))',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(110,63,25,0.25)',
              transition: 'transform 0.15s'
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ── THUMBNAILS HORIZONTAL SCROLL ── */}
      <div className="gallery-thumbnails" style={{
        width: '100%', maxWidth: 360, margin: '0 auto 28px',
        overflowX: 'auto', display: 'flex', gap: 10, padding: '4px 6px 12px',
        scrollbarWidth: 'none', msOverflowStyle: 'none'
      }}>
        {exhibits.map((item, idx) => (
          <div
            key={idx}
            onClick={() => changeSlide(idx, idx > currentIdx ? 1 : -1)}
            style={{
              width: 54, height: 54, borderRadius: 14, overflow: 'hidden',
              flexShrink: 0, cursor: 'pointer',
              border: idx === currentIdx ? '2.5px solid var(--brown-deep)' : '1.5px solid rgba(255,255,255,0.8)',
              boxShadow: idx === currentIdx ? '0 4px 12px rgba(110,63,25,0.3)' : '0 2px 6px rgba(0,0,0,0.06)',
              transform: idx === currentIdx ? 'scale(1.06)' : 'scale(1)',
              opacity: idx === currentIdx ? 1 : 0.65,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src={item.src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/acel 2.jpeg'; }}
            />
          </div>
        ))}
      </div>

      {/* ── ACTION BUTTON TO NEXT STAGE ── */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 360, margin: '0 auto' }}>
        <button
          onClick={onNext}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
        >
          <Award size={18} /> Buka Kartu Ucapan Spesial 🤎
        </button>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {isLightbox && (
        <div
          onClick={() => setIsLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(28, 14, 8, 0.92)', backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 20
          }}
        >
          <button
            onClick={() => setIsLightbox(false)}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 380, width: '100%', maxHeight: '80vh',
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <img
              src={current.src}
              alt={current.title}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '70vh', objectFit: 'contain' }}
            />
            <div style={{
              background: 'rgba(43, 24, 16, 0.95)', padding: '12px 16px',
              textAlign: 'center', color: '#fff'
            }}>
              <p style={{ fontFamily: 'var(--font-cute)', fontSize: '0.88rem', fontWeight: 700 }}>
                {current.title}
              </p>
              <p style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: 2 }}>
                {current.tag}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
