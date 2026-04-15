"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, Bell, UploadCloud, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useCandidates } from '@/context/CandidateContext';
import { useJobs } from '@/context/JobContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import GlowCard from '@/components/GlowCard';
import CommandPalette from '@/components/CommandPalette';

export default function Home() {
  const { candidates, totalProcessed, addCandidate } = useCandidates();
  const { jobs, selectedJobId, setSelectedJobId, selectedJob } = useJobs();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => { fileInputRef.current?.click(); };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
               setIsUploading(false);
                const randomScore = Math.floor(Math.random() * 40) + 60; // Bias higher for demo
                const status = randomScore > 85 ? 'high' : randomScore > 70 ? 'medium' : 'low';
                const generatedName = file.name.split('.')[0].replace(/[-_]/g, ' ');
                addCandidate({ 
                  name: generatedName || 'New Applicant', 
                  role: selectedJob?.title || 'Extracted Role', 
                  score: randomScore, 
                  status 
                });
                toast.success(`Applicant parsed successfully!`, { 
                  description: `Scoped against '${selectedJob?.title}'. Match: ${randomScore}%`
                });
            }, 500);
            return 100;
          }
          return prev + 4;
        });
      }, 80);
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 25 }
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.header variants={item}>
        <div>
          <h1 className="gradient-text">Welcome back, Sarah</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Active Project: <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{selectedJob?.title}</span></p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)' }}>
             <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Target Req:</label>
             <select 
               value={selectedJobId} 
               onChange={(e) => setSelectedJobId(e.target.value)}
               style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', fontWeight: 600 }}
             >
               {jobs.map(j => (
                 <option key={j.id} value={j.id} style={{ background: '#111' }}>{j.title}</option>
               ))}
             </select>
          </div>
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search..." />
            <CommandPalette />
          </div>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
            <Bell size={24} />
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'var(--danger-color)', width: '10px', height: '10px', borderRadius: '50%' }}></span>
          </button>
        </div>
      </motion.header>

      <motion.div variants={item} className="dashboard-grid">
        <GlowCard glowColor="139,92,246">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Processed</h3>
            <CheckCircle size={20} color="var(--success-color)" />
          </div>
          <motion.p
            key={totalProcessed}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '2.8rem', fontWeight: 700, margin: '8px 0', fontVariantNumeric: 'tabular-nums' }}
          >
            {totalProcessed.toLocaleString()}
          </motion.p>
          <p style={{ color: 'var(--success-color)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +14% from last week
          </p>
        </GlowCard>

        <GlowCard glowColor="251,191,36">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Average Match</h3>
          </div>
          <p style={{ fontSize: '2.8rem', fontWeight: 700, margin: '8px 0' }}>76<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>%</span></p>
          <p style={{ color: 'var(--warning-color)', fontSize: '0.9rem' }}>✦ Optimal Range</p>
        </GlowCard>

        <GlowCard glowColor="52,211,153">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Processing Time</h3>
            <Clock size={20} color="var(--accent-color)" />
          </div>
          <p style={{ fontSize: '2.8rem', fontWeight: 700, margin: '8px 0' }}>1.2<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>s</span></p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Per 100 resumes</p>
        </GlowCard>
      </motion.div>

      <motion.div variants={item} className="bento-grid">
        <GlowCard glowColor="139,92,246">
          <h2 style={{ marginBottom: '24px' }}>Quick ATS Upload</h2>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.doc,.docx" multiple />
          <div className="upload-area" onClick={!isUploading ? handleUploadClick : undefined}>
            {isUploading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${uploadProgress}%` }}
                    style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '4px' }}
                  />
                </div>
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Parsing NLP Entities... {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <UploadCloud size={40} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Drag &amp; Drop Resumes</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>AI will extract skills and rank against job descriptions.</p>
                <div className="btn">Select Files</div>
              </>
            )}
          </div>
        </GlowCard>

        <GlowCard glowColor="52,211,153">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Recent Matches</h2>
            <Link href="/candidates" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {candidates.slice(0, 4).map(c => (
              <Link href={`/candidates/${c.id}`} key={c.id} className="list-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{c.name}</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.8rem', textTransform: 'capitalize' }}>{c.role}</p>
                  </div>
                </div>
                <span className="badge" style={{
                  background: c.status === 'high' ? 'rgba(52, 211, 153, 0.15)' : c.status === 'medium' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                  color: c.status === 'high' ? 'var(--success-color)' : c.status === 'medium' ? 'var(--warning-color)' : 'var(--danger-color)'
                }}>
                  {c.score}%
                </span>
              </Link>
            ))}
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
}
