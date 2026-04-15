"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Activity } from 'lucide-react';

export function CursorSpotlight({ color }: { color: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX - 200);
      springY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0, top: 0,
        x: springX, y: springY,
        width: '400px', height: '400px',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        mixBlendMode: 'screen',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

export function GlobalTicker({ prefix }: { prefix: string }) {
  const [metric, setMetric] = useState(42);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetric(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--panel-border)', padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 50, backdropFilter: 'blur(10px)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
      <Activity size={14} color="var(--accent-color)" className="pulse" />
      <span>{prefix}: <strong style={{ color: '#fff' }}>{Math.max(12, metric)}</strong> ops/sec</span>
    </div>
  );
}
