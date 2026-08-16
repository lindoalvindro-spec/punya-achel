import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Mail, Cake, Star, Sparkle } from 'lucide-react';
import gsap from 'gsap';

export default function LoveLetter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('letter');
  const letterRef = useRef(null);
  const envelopeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(envelopeRef.current,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
    );
  }, []);

  const handleOpen = () => {
    gsap.to(envelopeRef.current, {
      scale: 0.95, opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        setIsOpen(true);
        requestAnimationFrame(() => {
          gsap.fromTo(letterRef.current,
            { scale: 0.9, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.3)' }
          );
        });
      }
    });
  };

  const impianList = [
    { title: 'Cita-Cita Terwujud ✨', desc: 'semogaa citaa citaa achell terwujudd yaa sayangkuu aaminn' },
    { title: 'Dikelilingi Orang Baik 🌸', desc: 'semogaa harii harii achell dikelikingii pipell pipell baaikk aaminnn' },
    { title: 'Kesehatan & Kekuatan 💪', desc: 'semogaaa achell diberikan kesehatan kekuatannn aaaminnn' },
    { title: 'Cinta Abadi 🤍', desc: 'semogaa achell selalu mencintaii cacaa aaminnn sjjsjsjsnsjsjsjjsjs' },
    { title: 'Pribadi Yang Makin Baik 🌟', desc: 'semogaa achell menjadii pribadii yang makinn baikk aaaminnn' },
    { title: 'Mama Papa Engineer 🎓', desc: 'terwujudd nyaa mamaapapaenjinerr aaaminnn' },
    { title: 'Selalu Bahagia 🧸', desc: 'acheell bahagiaa selaluu aaaminnn' },
    { title: 'Always in Your Story 📖', desc: 'involve me in every episode of your story, beiibiii i loveee uuu soo muchh sayaangggg🤍🤍' },
  ];

  const wishesList = [
    { text: 'semogaa cacaa masii menjadii partner perjalanan hidup achell terusss 🤍' },
    { text: 'semogaa hubungann kitaa makinn eratt n tidaak adaa yang bisaa menjauhkan kita selain jarak sjsbsbsbnsjd 🪐' },
    { text: 'semogaa achell selaluu bahagiaa saat bersamaa cacaaa ✨' },
    { text: 'semogaa achell mencintaii cacaa selamaa lamaa lamaaa lamaa laamaanyaaa aaaminnn i wsihh zksjsjnsjsjsjsjs 🤎' },
  ];

  return (
    <div className="stage stage--scroll">
      {/* ── ENVELOPE STAGE ── */}
      {!isOpen && (
        <div
          ref={envelopeRef}
          className="glass"
          style={{
            width: '100%', maxWidth: 350, padding: '40px 24px',
            textAlign: 'center', margin: 'auto 0',
          }}
        >
          {/* Animated Wax Seal Envelope Icon */}
          <div
            onClick={handleOpen}
            className="anim-breathe"
            style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brown-deep) 0%, var(--brown-soft) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', cursor: 'pointer',
              boxShadow: '0 12px 32px rgba(110,63,25,0.3)',
              border: '3px solid rgba(255,255,255,0.9)',
            }}
          >
            <Mail size={44} color="#fff" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '2.2rem',
            color: 'var(--brown-dark)', marginBottom: 6,
          }}>
            Surat Cinta untuk Achel 🤎💌
          </h2>
          <p style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
            color: 'var(--brown-deep)', marginBottom: 24, lineHeight: 1.4,
          }}>
            Ada pesan dan doa tulus dari Caca yang ditulis khusus untuk Achel... 🤍
          </p>

          <button onClick={handleOpen} className="btn-primary">
            <Heart size={16} fill="#fff" /> Buka Suratnya 🤎
          </button>
        </div>
      )}

      {/* ── OPEN LETTER STAGE (Scrollable Document) ── */}
      {isOpen && (
        <div
          ref={letterRef}
          className="glass"
          style={{
            width: '100%', maxWidth: 380, padding: '28px 20px',
            position: 'relative',
          }}
        >
          {/* Navigation Tabs (Surat, Impian, Doa) */}
          <div style={{
            display: 'flex', gap: 6, background: 'rgba(212,163,89,0.12)',
            padding: 4, borderRadius: 30, marginBottom: 20,
          }}>
            <button
              onClick={() => setActiveTab('letter')}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 24, border: 'none',
                fontFamily: 'var(--font-cute)', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === 'letter' ? '#fff' : 'transparent',
                color: activeTab === 'letter' ? 'var(--brown-dark)' : 'var(--brown-deep)',
                boxShadow: activeTab === 'letter' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              💌 Surat
            </button>
            <button
              onClick={() => setActiveTab('impian')}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 24, border: 'none',
                fontFamily: 'var(--font-cute)', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === 'impian' ? '#fff' : 'transparent',
                color: activeTab === 'impian' ? 'var(--brown-dark)' : 'var(--brown-deep)',
                boxShadow: activeTab === 'impian' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              🌿 Impian
            </button>
            <button
              onClick={() => setActiveTab('wishes')}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 24, border: 'none',
                fontFamily: 'var(--font-cute)', fontSize: '0.78rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === 'wishes' ? '#fff' : 'transparent',
                color: activeTab === 'wishes' ? 'var(--brown-dark)' : 'var(--brown-deep)',
                boxShadow: activeTab === 'wishes' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              ✨ Doa
            </button>
          </div>

          {/* ── TAB 1: LOVE LETTER CONTENT ── */}
          {activeTab === 'letter' && (
            <div>
              {/* Polaroid Photo (acel 17.jpeg) */}
              <div style={{
                background: '#fff', padding: '10px 10px 24px',
                borderRadius: 16, boxShadow: '0 8px 24px rgba(110,63,25,0.12)',
                transform: 'rotate(-2deg)', marginBottom: 20,
              }}>
                <div style={{
                  width: '100%', height: 210, borderRadius: 10,
                  overflow: 'hidden', background: '#f5f5f5',
                }}>
                  <img
                    src="/acel 17.jpeg"
                    alt="Achel & Caca"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/acel 17.jpeg'; }}
                  />
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                  color: 'var(--brown-dark)', textAlign: 'center', marginTop: 10,
                }}>
                  My Beautiful Achel 🤎✨
                </p>
              </div>

              {/* Salutation */}
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                color: 'var(--brown-dark)', marginBottom: 12,
              }}>
                Dearest Achel, 🤎✨
              </p>

              {/* Letter Paragraphs */}
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: '#3a2318', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <p>
                  ciee cieee adaa yangg bdayyy niichhh sksnsnsnsnsnsjjsj, haappy birthday maaii beiibiiikuu tersayangg! 🤍🎉
                </p>
                <p>
                  wahhh first time ngerayaain level up bebiii xixixiiixiiii sebagaii pacal achell xixixiii, sehatt selaluu yaaa sayangkuu cintakuu...
                </p>
                <p>
                  makasii yaa sayangg udaa ngebikin hari cacaa berwarnaa bahagiaaa senangg happyyy xixixixixiiii i likeee thattt, cacaa beruntung bangett bisaa menjadi bagian perjalanan achell saat inii thatss makee im always happyyyy 🥺🤎
                </p>
                <p>
                  semogaa dengann bertambahh naaa umurr achell membuat achell semakin baik, makin sayang amaa cacaa, makin cintaa xixixixii semogaa kitaa memilikii ribuan cara untuk saling cintaa yaa sayangkuu...
                </p>
                <p style={{ fontWeight: 700, color: 'var(--brown-deep)' }}>
                  i lovee uuu moreee n moreee n moreeee n moreee rachell azzahara salfetri 🤍✨
                </p>
              </div>

              {/* Sign Off */}
              <div style={{
                textAlign: 'right', marginTop: 24, paddingTop: 14,
                borderTop: '1px dashed rgba(212,163,89,0.3)',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--brown-dark)' }}>
                  Happy Birthday Achel! 🤎✨
                </p>
                <p style={{ fontFamily: 'var(--font-cute)', fontSize: '0.8rem', color: 'var(--brown-deep)' }}>
                  Forever Loving You — Caca 🤍
                </p>
              </div>
            </div>
          )}

          {/* ── TAB 2: IMPIAN ── */}
          {activeTab === 'impian' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {impianList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.85)', padding: '14px 16px',
                    borderRadius: 16, border: '1px solid rgba(212,163,89,0.25)',
                    boxShadow: '0 4px 12px rgba(110,63,25,0.04)',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-cute)', fontSize: '0.85rem',
                    fontWeight: 700, color: 'var(--brown-dark)', marginBottom: 4,
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                    color: 'var(--brown-deep)', lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ── TAB 3: WISHES ── */}
          {activeTab === 'wishes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {wishesList.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.85)', padding: '14px 16px',
                    borderRadius: 16, border: '1px solid rgba(212,163,89,0.25)',
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🤎</span>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#3a2318', lineHeight: 1.5, fontWeight: 500,
                  }}>
                    {w.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Next Stage Button */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              onClick={onNext}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
            >
              <Cake size={18} /> Tiup Lilin Kue Ulang Tahun 🎂
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
