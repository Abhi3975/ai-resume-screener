"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Users, FileText, Settings as GhostSettings, Globe } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}
      >
        <Command size={14} />
        <span>K</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} onClick={() => setIsOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '600px', padding: '0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--panel-border)' }}>
                <Search size={24} color="var(--accent-color)" />
                <input autoFocus placeholder="Search candidates, jobs, or docs..." style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px' }}>Quick Actions</p>
                <div className="hover-highlight" style={{ padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                   <Users size={18} /> <span>Go to Candidate Database</span>
                </div>
                <div className="hover-highlight" style={{ padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                   <FileText size={18} /> <span>Create New Requisition</span>
                </div>
                <div className="hover-highlight" style={{ padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                   <GhostSettings size={18} /> <span>Edit System Engine</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 20px', display: 'flex', justifyContent: 'flex-end', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                 <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>↵</kbd> to select</span>
                 <span><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>esc</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
