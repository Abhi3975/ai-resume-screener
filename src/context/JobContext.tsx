"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  skillsRequired: string[];
};

const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Architect',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead our React foundations and system architecture.',
    skillsRequired: ['React', 'TypeScript', 'Node.js', 'System Design', 'Framer Motion']
  },
  {
    id: 'job-2',
    title: 'NLP Research Scientist',
    department: 'AI Research',
    location: 'Hybrid',
    type: 'Contract',
    description: 'Optimization of fine-tuning pipelines for resume extraction.',
    skillsRequired: ['Python', 'PyTorch', 'Transformers', 'LLMs', 'Vector DBs']
  },
  {
    id: 'job-3',
    title: 'Product Designer (UX/UI)',
    department: 'Design',
    location: 'On-site',
    type: 'Full-time',
    description: 'Design the future of AI-driven recruitment interfaces.',
    skillsRequired: ['Figma', 'Prototyping', 'User Research', 'CSS', 'Visual Design']
  }
];

type JobContextType = {
  jobs: Job[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  selectedJob: Job | undefined;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nova_selected_job');
    if (saved) setSelectedJobId(saved);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nova_selected_job', selectedJobId);
    }
  }, [selectedJobId, isLoaded]);

  const selectedJob = INITIAL_JOBS.find(j => j.id === selectedJobId);

  return (
    <JobContext.Provider value={{ jobs: INITIAL_JOBS, selectedJobId, setSelectedJobId, selectedJob }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) throw new Error('useJobs must be used within JobProvider');
  return context;
}
