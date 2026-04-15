"use client";
import { useEffect, useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useJobs } from '@/context/JobContext';

export default function ClientChart() {
  const [mounted, setMounted] = useState(false);
  const { selectedJob } = useJobs();

  useEffect(() => { setMounted(true); }, []);

  const radarData = useMemo(() => {
    const skills = selectedJob?.skillsRequired || ['Experience', 'Tech stack', 'Leadership', 'Culture', 'Design'];
    return skills.map(skill => ({
      subject: skill,
      Candidate: 70 + Math.floor(Math.random() * 25),
      Benchmark: 80 + Math.floor(Math.random() * 15),
      fullMark: 100
    }));
  }, [selectedJob]);

  const pipelineData = [
    { name: 'NLP Score', score: 94 },
    { name: 'Req Fit', score: 88 },
    { name: 'Velocity', score: 91 },
    { name: 'Experience', score: 85 },
  ];

  if (!mounted) return null;
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '32px' }}>
      <div className="glass-panel">
        <h3 style={{ marginBottom: '32px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
          Bi-Axial Skill Comparison
        </h3>
        <div style={{ width: '100%', height: '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Candidate" dataKey="Candidate" stroke="var(--accent-color)" fill="var(--accent-color)" fillOpacity={0.3} />
              <Radar name="Market Benchmark" dataKey="Benchmark" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.1)" fillOpacity={0.1} />
              <Tooltip 
                contentStyle={{ background: '#111', border: '1px solid var(--panel-border)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '32px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)' }}></div>
           Standardized Performance Index
        </h3>
        <div style={{ width: '100%', height: '380px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 11}} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.03)'}} 
                  contentStyle={{ background: '#111', border: '1px solid var(--panel-border)', borderRadius: '12px' }} 
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={35}>
                   {pipelineData.map((entry, index) => (
                      <rect key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--accent-color)' : 'var(--success-color)'} fillOpacity={0.8} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        </div>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px' }}>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>Avg Engagement</p>
               <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '4px 0 0' }}>84.2%</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px' }}>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0 }}>Review Confidence</p>
               <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '4px 0 0' }}>High</p>
            </div>
        </div>
      </div>
    </div>
  );
}
