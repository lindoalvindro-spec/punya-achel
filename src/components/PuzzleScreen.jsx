import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Check, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

// 3x3 Grid Puzzle
const GRID_SIZE = 3;
const TOTAL_TILES = 9;

function isSolvable(arr) {
  let invCount = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) {
        invCount++;
      }
    }
  }
  return invCount % 2 === 0;
}

function getInitialTiles() {
  let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  do {
    // Shuffle tiles except last one or randomly
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles) || tiles.every((val, i) => val === i));
  return tiles;
}

export default function PuzzleScreen({ onComplete }) {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [moves, setMoves] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    setTiles(getInitialTiles());
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
    );
  }, []);

  const handleTileClick = (index) => {
    if (solved) return;
    const emptyIndex = tiles.indexOf(8);
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    // Check if adjacent
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const next = [...tiles];
      [next[index], next[emptyIndex]] = [next[emptyIndex], next[index]];
      setTiles(next);
      setMoves(m => m + 1);

      // Check win condition
      const isWin = next.every((val, i) => val === i);
      if (isWin) {
        setSolved(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    setTiles(getInitialTiles());
    setSolved(false);
    setMoves(0);
  };

  const handleAutoSolve = () => {
    setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setSolved(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="stage">
      <div
        ref={cardRef}
        className="glass"
        style={{
          width: '100%', maxWidth: 360, padding: '24px 20px',
          textAlign: 'center', position: 'relative',
        }}
      >
        {/* Title */}
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
            Mini Games
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2rem',
          color: 'var(--brown-dark)', marginBottom: 4,
        }}>
          Susun Puzzle Achel 🤎✨
        </h2>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.8rem',
          color: 'var(--brown-deep)', marginBottom: 16,
        }}>
          Geser kepingan puzzle untuk melihat foto manis Achel! 🧸
        </p>

        {/* Status Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 14, padding: '0 8px',
        }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--brown-deep)', border: '1px solid rgba(212,163,89,0.25)',
            padding: '3px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.7)',
          }}>
            Langkah: {moves}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-ghost"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              <Eye size={13} /> {showPreview ? 'Tutup' : 'Intip'}
            </button>
            <button
              onClick={handleReset}
              className="btn-ghost"
              style={{ padding: '4px 8px' }}
              title="Acak Ulang"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Puzzle Board (3x3) */}
        <div style={{
          position: 'relative', width: 270, height: 270, margin: '0 auto 20px',
          background: 'rgba(212,163,89,0.08)', padding: 6, borderRadius: 24,
          border: '2px solid rgba(212,163,89,0.3)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(110,63,25,0.08)',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4, width: '100%', height: '100%',
          }}>
            {tiles.map((tileIndex, position) => {
              if (tileIndex === 8 && !solved) {
                return (
                  <div
                    key="empty"
                    style={{
                      background: 'rgba(212,163,89,0.1)',
                      borderRadius: 14, border: '2px dashed rgba(212,163,89,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>🤎</span>
                  </div>
                );
              }

              const row = Math.floor(tileIndex / GRID_SIZE);
              const col = tileIndex % GRID_SIZE;
              // Background position percentage (0%, 50%, 100%)
              const bgX = (col / (GRID_SIZE - 1)) * 100;
              const bgY = (row / (GRID_SIZE - 1)) * 100;

              return (
                <div
                  key={tileIndex}
                  onClick={() => handleTileClick(position)}
                  style={{
                    borderRadius: 14,
                    backgroundImage: 'url("/acel 1.jpeg")',
                    backgroundSize: '258px 258px',
                    backgroundPosition: `${bgX}% ${bgY}%`,
                    cursor: solved ? 'default' : 'pointer',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onPointerDown={(e) => {
                    if (!solved) e.currentTarget.style.transform = 'scale(0.96)';
                  }}
                  onPointerUp={(e) => {
                    if (!solved) e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              );
            })}
          </div>

          {/* Preview Overlay */}
          {showPreview && (
            <div style={{
              position: 'absolute', inset: 6, borderRadius: 18,
              backgroundImage: 'url("/acel 1.jpeg")',
              backgroundSize: 'cover', backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              zIndex: 10, border: '2px solid #fff',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              padding: 10,
            }}>
              <span style={{
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                padding: '3px 10px', borderRadius: 12, fontSize: '0.7rem',
                backdropFilter: 'blur(4px)',
              }}>
                Foto Asli 🤎
              </span>
            </div>
          )}
        </div>

        {/* Actions Bottom */}
        {solved ? (
          <div style={{ animation: 'breathe 2s infinite' }}>
            <button
              onClick={onComplete}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
            >
              <Check size={18} /> Lanjut Buka Surat Cinta 💌
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleAutoSolve}
              style={{
                background: 'none', border: 'none',
                color: 'var(--brown-soft)', fontSize: '0.72rem',
                textDecoration: 'underline', cursor: 'pointer',
              }}
            >
              Langsung Selesaikan Puzzle ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
