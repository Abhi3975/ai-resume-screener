"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StreamingRationale({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setIsDone(true);
      }
    }, 15); // Adjust speed here

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="glass-panel" style={{ marginTop: '32px', gridColumn: 'span 2' }}>
      <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
         AI Executive Rationale
      </h3>
      <div style={{ fontFamily: 'monospace', lineHeight: 1.6, color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.4)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
        {displayedText}
        {!isDone && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--accent-color)', marginLeft: '4px', verticalAlign: 'middle' }} />}
      </div>
    </div>
  );
}
