"use client";
import React, { useState } from 'react';
import { Save, Shield, Cpu, Database, Bell, Lock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'ai' | 'retention' | 'access';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('ai');

  const renderContent = () => {
    switch (activeTab) {
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="ai">
            <h2 style={{ marginBottom: '32px' }}>AI Model Configuration</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Scoring Strictness Threshold (ATS)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                   <input type="range" min="1" max="100" defaultValue="75" style={{ width: '100%', accentColor: 'var(--accent-color)' }} />
                   <span style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '8px', fontWeight: 600 }}>75%</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px' }}>Determines how aggressively the NLP engine filters out candidate resumes lacking explicit keywords.</p>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)' }} />
              <div>
                <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>NLP Processing Engine</label>
                <select style={{ width: '100%', padding: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--panel-border)', color: 'white', borderRadius: '12px', fontSize: '1rem', outline: 'none' }}>
                  <option>GPT-4o (High Accuracy, Entity Extraction)</option>
                  <option>Claude 3.5 Sonnet (Balanced, Nuanced)</option>
                  <option>Local Llama-3 (Privacy First, On-Premise)</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 'retention':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="retention">
            <h2 style={{ marginBottom: '32px' }}>Data Retention Policies</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: 0, marginBottom: '8px' }}>Resume Persistence</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Automatically purge unselected candidate data after:</p>
                <select style={{ marginTop: '12px', width: '100%', padding: '12px', background: 'rgba(0,0,0,0.4)', color: 'white', border: '1px solid var(--panel-border)', borderRadius: '8px' }}>
                  <option>30 Days (Compliance Recommended)</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Never</option>
                </select>
              </div>
              <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', padding: '20px', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: '#fbbf24', fontSize: '0.9rem' }}>⚠️ Data retention settings must comply with local GDPR/CCPA regulations for candidate privacy.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'access':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="access">
            <h2 style={{ marginBottom: '32px' }}>Access Control & Permissions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Admin (Full Control)', 'Recruiter (Read/Write)', 'Interviewer (Read Only)'].map(role => (
                <div key={role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                  <span style={{ fontWeight: 500 }}>{role}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', cursor: 'pointer' }}>Manage Users</span>
                </div>
              ))}
              <button className="btn btn-outline" style={{ marginTop: '12px' }}><Lock size={16} /> Audit Success Logs</button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="animate-enter">
      <header>
        <h1 className="gradient-text">System Settings</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Configure your ATS parsing engine and security protocols.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
           <button 
             onClick={() => setActiveTab('ai')} 
             className={`nav-link ${activeTab === 'ai' ? 'active' : ''}`}
             style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent' }}
           >
             <Cpu size={20} /> AI Engine Config
           </button>
           <button 
             onClick={() => setActiveTab('retention')} 
             className={`nav-link ${activeTab === 'retention' ? 'active' : ''}`}
             style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent' }}
           >
             <Database size={20} /> Data Retention
           </button>
           <button 
             onClick={() => setActiveTab('access')} 
             className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
             style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent' }}
           >
             <Shield size={20} /> Access Control
           </button>
        </div>

        <div className="glass-panel" style={{ minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>

          <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn" style={{ fontSize: '1rem', padding: '12px 24px' }}><Save size={20} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
