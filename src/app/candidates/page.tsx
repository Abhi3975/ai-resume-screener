"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCandidates } from '@/context/CandidateContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CandidatesList() {
  const { candidates } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All Statuses' ||
                          (statusFilter.includes('High') && c.status === 'high') ||
                          (statusFilter.includes('Medium') && c.status === 'medium') ||
                          (statusFilter.includes('Low') && c.status === 'low');
      return matchSearch && matchStatus;
    });
  }, [candidates, searchTerm, statusFilter]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <header>
        <div>
          <h1 className="gradient-text">Candidate Database</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Review your AI-parsed candidate pipeline.</p>
        </div>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel" style={{ marginBottom: '24px', display: 'flex', gap: '16px', padding: '20px 32px' }}>
         <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Filter by Name or Role..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--panel-border)', padding: '12px 20px', borderRadius: '12px', color: 'white', flex: 1, outline: 'none' }} />
         <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--panel-border)', color: 'white', padding: '12px 20px', borderRadius: '12px', outline: 'none' }}>
            <option>All Statuses</option>
            <option>High Match (&gt;85%)</option>
            <option>Medium Match (70-84%)</option>
            <option>Low Match (&lt;70%)</option>
         </select>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel">
        <motion.div layout className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          <AnimatePresence>
            {filteredCandidates.map((c) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                key={c.id}
              >
                <Link href={`/candidates/${c.id}`} className="list-item" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="user-avatar">{c.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{c.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '4px 0 0', textTransform: 'capitalize' }}>{c.role}</p>
                    </div>
                  </div>
                  <div className="match-score">
                    <div className={`score-circle score-${c.status}`} style={{ width: '48px', height: '48px', fontSize: '1rem' }}>
                      {c.score}%
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredCandidates.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No candidates found matching your criteria.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
