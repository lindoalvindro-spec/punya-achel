import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Disc, ChevronUp, ChevronDown, Heart, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

export default function SpotifyPlayer({ autoPlay = false }) {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:00');
  
  const audioRef = useRef(null);
  const pillRef = useRef(null);
  const widgetRef = useRef(null);

  // Auto-play on mount if prop is true
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser policy until interaction
        setPlaying(false);
      });
    }
  }, [autoPlay]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(err => console.log('Audio play error:', err));
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    const format = (s) => {
      const min = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };
    setCurrentTime(format(cur));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    const min = Math.floor(dur / 60);
    const sec = Math.floor(dur % 60);
    setDurationTime(`${min}:${sec < 10 ? '0' : ''}${sec}`);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const restartSong = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setPlaying(true));
  };

  const minimizeWidget = (e) => {
    if (e) e.stopPropagation();
    if (widgetRef.current) {
      gsap.to(widgetRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setExpanded(false);
        }
      });
    } else {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded && widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { scale: 0.85, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
      );
    }
  }, [expanded]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 900,
      width: 'calc(100% - 32px)',
      maxWidth: 390,
      pointerEvents: 'auto',
    }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/Akad_spotdown.org.mp3"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      {/* ── MODE 1: Sleek Floating Mini Pill (default) ── */}
      {!expanded && (
        <div
          ref={pillRef}
          onClick={() => setExpanded(true)}
          style={{
            background: 'rgba(18, 18, 18, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 50,
            padding: '6px 14px 6px 8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(29, 185, 84, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#ffffff',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            userSelect: 'none',
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Mini Album Cover */}
          <div style={{
            width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
            position: 'relative', background: '#282828',
            border: '1.5px solid #1DB954',
          }}>
            <img
              src="/acel 2.jpeg"
              alt="Akad - Payung Teduh"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/acel 2.jpeg'; }}
            />
            {playing && (
              <div className="anim-spin" style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Disc size={16} color="#1DB954" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div style={{ overflow: 'hidden', paddingRight: 4 }}>
            <div style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, whiteSpace: 'nowrap'
            }}>
              Akad
            </div>
            <div style={{
              fontSize: '0.66rem', color: '#1DB954', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 3, marginTop: 1
            }}>
              {playing ? '🎵 Payung Teduh' : '▶ Tap for Player'}
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              background: '#ffffff', color: '#000000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {playing ? <Pause size={13} fill="#000" /> : <Play size={13} fill="#000" style={{ marginLeft: 1 }} />}
          </button>

          {/* Expand Indicator */}
          <div style={{ color: '#b3b3b3', display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <ChevronUp size={16} />
          </div>
        </div>
      )}

      {/* ── MODE 2: GSAP Animated Pop-up Spotify Widget UI ── */}
      {expanded && (
        <div
          ref={widgetRef}
          style={{
            background: 'rgba(18, 18, 18, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '12px 14px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(29, 185, 84, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
          }}
        >
          {/* Close/Minimize Button at Top-Right */}
          <button
            onClick={minimizeWidget}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 24, height: 24, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: 'none',
              color: '#b3b3b3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10, transition: 'background 0.2s'
            }}
            title="Minimize"
          >
            <ChevronDown size={16} />
          </button>

          {/* Left Side: Album Cover */}
          <div style={{
            width: 76, height: 76, borderRadius: 16, overflow: 'hidden', flexShrink: 0,
            position: 'relative', boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
            background: '#282828',
          }}>
            <img
              src="/acel 2.jpeg"
              alt="Akad - Payung Teduh"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/acel 2.jpeg'; }}
            />
            {playing && (
              <div style={{
                position: 'absolute', bottom: 4, right: 4, width: 18, height: 18,
                borderRadius: '50%', background: '#1DB954', display: 'flex',
                alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
              }}>
                <Disc size={11} color="#000" className="anim-spin" />
              </div>
            )}
          </div>

          {/* Right Side: Info, Progress & Controls */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, paddingRight: 24 }}>
            
            {/* Top Row: Song Title, Singer & Heart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ overflow: 'hidden', paddingRight: 4 }}>
                <div style={{
                  fontSize: '0.88rem', fontWeight: 700, color: '#ffffff',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  letterSpacing: '-0.2px'
                }}>
                  Akad
                </div>
                <div style={{
                  fontSize: '0.74rem', color: '#b3b3b3', fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1
                }}>
                  Payung Teduh
                </div>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: liked ? '#1DB954' : '#b3b3b3', padding: 2,
                  display: 'flex', alignItems: 'center'
                }}
              >
                <Heart size={16} fill={liked ? '#1DB954' : 'none'} />
              </button>
            </div>

            {/* Custom Interactive Scrub Bar */}
            <div>
              <div
                onClick={handleSeek}
                style={{
                  width: '100%', height: 4, background: '#4d4d4d',
                  borderRadius: 2, cursor: 'pointer', position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{
                  height: '100%', width: `${progress}%`,
                  background: '#1DB954', borderRadius: 2
                }} />
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.62rem', color: '#b3b3b3', marginTop: 3
              }}>
                <span>{currentTime}</span>
                <span>{durationTime}</span>
              </div>
            </div>

            {/* Bottom Row: Player Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Restart Button */}
              <button
                onClick={restartSong}
                style={{
                  background: 'none', border: 'none', color: '#b3b3b3',
                  cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center'
                }}
                title="Restart Song"
              >
                <RotateCcw size={14} />
              </button>

              {/* Main Play/Pause Button */}
              <button
                onClick={togglePlay}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: 'none',
                  background: '#ffffff', color: '#000000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  transition: 'transform 0.15s'
                }}
                onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
                onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {playing ? <Pause size={15} fill="#000" /> : <Play size={15} fill="#000" style={{ marginLeft: 2 }} />}
              </button>

              {/* Volume / Mute Button */}
              <button
                onClick={toggleMute}
                style={{
                  background: 'none', border: 'none', color: '#b3b3b3',
                  cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center'
                }}
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={15} color="#e11d48" /> : <Volume2 size={15} />}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
