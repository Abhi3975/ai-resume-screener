"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  status: 'high' | 'medium' | 'low';
};

const INITIAL_CANDIDATES: Candidate[] = [
  { id: 'abhijeet-resume-id', name: 'Abhijeet Portfolio', role: 'Full Stack Engineer', score: 98, status: 'high' },
  { id: '1', name: 'Marcus Chen', role: 'Frontend Engineer', score: 96, status: 'high' },
  { id: '2', name: 'Diana Ross', role: 'UX Designer', score: 88, status: 'high' },
  { id: '3', name: 'James Wilson', role: 'Backend Lead', score: 82, status: 'medium' },
  { id: '4', name: 'Sophie Taylor', role: 'Product Manager', score: 71, status: 'medium' },
  { id: '5', name: 'Alex Mercer', role: 'React Native Dev', score: 55, status: 'low' },
  { id: '6', name: 'Emma Watson', role: 'Data Scientist', score: 94, status: 'high' },
  { id: '7', name: 'Liam Neeson', role: 'Security Analyst', score: 85, status: 'high' },
  { id: '8', name: 'John Doe', role: 'DevOps Engineer', score: 79, status: 'medium' },
  { id: '9', name: 'Jane Smith', role: 'UI Developer', score: 45, status: 'low' },
  { id: '10', name: 'Sarah Connor', role: 'AI Researcher', score: 99, status: 'high' },
  { id: '11', name: 'Kyle Reese', role: 'Full Stack Dev', score: 88, status: 'high' },
  { id: '12', name: 'Tony Stark', role: 'Hardware Eng', score: 92, status: 'high' }
];

type CandidateContextType = {
  candidates: Candidate[];
  addCandidate: (c: Omit<Candidate, 'id'>) => void;
  totalProcessed: number;
};

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [totalProcessed, setTotalProcessed] = useState(12842);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate on mount
  useEffect(() => {
    const saved = localStorage.getItem('nova_candidates');
    const savedCount = localStorage.getItem('nova_total');
    if (saved) setCandidates(JSON.parse(saved));
    if (savedCount) setTotalProcessed(JSON.parse(savedCount));
    setIsLoaded(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nova_candidates', JSON.stringify(candidates));
      localStorage.setItem('nova_total', JSON.stringify(totalProcessed));
    }
  }, [candidates, totalProcessed, isLoaded]);

  const addCandidate = (newCandidate: Omit<Candidate, 'id'>) => {
    setCandidates(prev => [{ ...newCandidate, id: crypto.randomUUID() }, ...prev]);
    setTotalProcessed(prev => prev + 1);
  };

  return (
    <CandidateContext.Provider value={{ candidates, addCandidate, totalProcessed }}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidates() {
  const context = useContext(CandidateContext);
  if (!context) throw new Error('useCandidates must be used within CandidateProvider');
  return context;
}
