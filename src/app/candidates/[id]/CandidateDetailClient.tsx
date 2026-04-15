"use client";
import ClientChart from './ClientChart';
import Link from 'next/link';
import { ArrowLeft, Download, Mail, Star, ShieldCheck } from 'lucide-react';
import StreamingRationale from './StreamingRationale';
import { useCandidates } from '@/context/CandidateContext';
import { useJobs } from '@/context/JobContext';
import React, { use } from 'react';

export default function CandidateProfileClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { candidates } = useCandidates();
  const { selectedJob } = useJobs();
  
  const candidate = candidates.find(c => c.id === resolvedParams.id);

  if (!candidate) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Candidate Not Found</h2>
        <Link href="/candidates" className="btn" style={{ marginTop: '20px' }}>Return to Database</Link>
      </div>
    );
  }

  const jobTitle = selectedJob?.title || "Generic Role";

  return (
    <div className="animate-enter">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/candidates" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="gradient-text">Candidate Deep-Dive</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Detailed Match Analysis for {candidate.name}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={18} /> Send Brief</button>
          <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Download Dossier</button>
        </div>
      </header>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="glass-panel delay-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div className="user-avatar" style={{ width: '100px', height: '100px', fontSize: '2rem', flexShrink: 0 }}>
              {candidate.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h2 style={{ margin: 0 }}>{candidate.name}</h2>
                {candidate.score > 90 && <Star size={20} fill="var(--warning-color)" color="var(--warning-color)" />}
              </div>
              <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px' }}>Current Bench: <span style={{ color: '#fff' }}>{candidate.role}</span></p>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Exp: 8.5 Yrs</span>
                 <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>SF, CA</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Scoped Match Against <strong>{jobTitle}</strong></p>
             <h2 style={{ color: candidate.status === 'high' ? 'var(--success-color)' : 'var(--warning-color)', fontSize: '4.5rem', margin: 0, lineHeight: 1 }}>{candidate.score}%</h2>
          </div>
        </div>

        <div className="glass-panel delay-2" style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <ShieldCheck color="var(--success-color)" size={24} />
              <h4 style={{ margin: 0 }}>AI Verified Skills</h4>
           </div>
           <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>NLP extraction confirmed 14/15 required entities for this requisition.</p>
        </div>
      </div>

      <ClientChart />
      
      <StreamingRationale text={`[SYSTEM START] Entity ID ${candidate.id} (${candidate.name}) evaluation suite initialized. \n> Matching against Requisition: "${jobTitle}"\n> Calculating skill gap matrix based on ${selectedJob?.skillsRequired.length || 0} required facets...\n> High affinity detected for: ${selectedJob?.skillsRequired.slice(0, 3).join(', ') || 'Core Skills'}.\n> Rationale: Candidate demonstrates exceptional depth in architectural paradigms matching the Senior roadmap.\n> Recommendation: IMMEDIATE INTERVIEW SEQUENCE.\n[SYSTEM EVENT] Recursive parsing complete. Report generated.`} />
    </div>
  );
}
