"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Zap, Search, Shield, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LOGS = [
  { time: '14:22:01', event: 'NLP_EXTRACTION', details: 'Extracted "Rust", "Distributed Systems" from candidate 821', status: 'success' },
  { time: '14:22:05', event: 'SCORE_CALC', details: 'Match score 94% computed for Senior Backend Role', status: 'success' },
  { time: '14:22:12', event: 'ENTITY_RECOGNITION', details: 'Detected ambiguous "Lead" title. Resolving via context...', status: 'warning' },
  { time: '14:22:18', event: 'MATRIX_PROCESSING', details: 'Cross-referencing skill graph via Llama-3-70b', status: 'info' },
  { time: '14:22:25', event: 'EXTRACTION_COMPLETE', details: 'Dossier generated for Sophie Taylor', status: 'success' },
];

export default function AtsScoring() {
  const [logs, setLogs] = useState(MOCK_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
       const newLog = {
         time: new Date().toLocaleTimeString('en-GB'),
         event: 'LIVE_PARSE',
         details: `Processing stream component ${Math.floor(Math.random() * 999)}...`,
         status: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)] as any
       };
       setLogs(prev => [newLog, ...prev.slice(0, 10)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-enter">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text">ATS Scoring Engine</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Real-time monitoring of the NLP extraction and scoring matrix.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <Activity color="var(--accent-color)" size={24} />
             <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Active</span>
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 700 }}>42<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>ops/sec</span></div>
             <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Parse Velocity</p>
           </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <Cpu color="var(--accent-color)" size={24} />
             <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Model v4.2</span>
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 700 }}>99.8<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>%</span></div>
             <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Entity Recall Accuracy</p>
           </div>
        </div>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
             <Shield color="var(--accent-color)" size={24} />
             <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GDPR Compliant</span>
           </div>
           <div>
             <div style={{ fontSize: '2rem', fontWeight: 700 }}>0<span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>ms</span></div>
             <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Data Leak Window</p>
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <TerminalIcon size={18} color="var(--accent-color)" />
             <h3 style={{ margin: 0 }}>Engine Interaction Logs</h3>
           </div>
           <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
        </div>
        <div style={{ padding: '24px 32px', fontFamily: 'monospace', fontSize: '0.9rem', maxHeight: '450px', overflowY: 'auto' }}>
           {logs.map((log, i) => (
             <motion.div 
               initial={{ opacity: 0, x: -10 }} 
               animate={{ opacity: 1, x: 0 }} 
               key={log.time + i} 
               style={{ padding: '8px 0', display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
             >
                <span style={{ color: 'var(--text-secondary)', minWidth: '85px' }}>[{log.time}]</span>
                <span style={{ 
                  color: log.status === 'success' ? '#10b981' : log.status === 'warning' ? '#f59e0b' : 'var(--accent-color)',
                  fontWeight: 600,
                  minWidth: '150px'
                }}>
                  {log.event}
                </span>
                <span style={{ color: '#fff' }}>{log.details}</span>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
