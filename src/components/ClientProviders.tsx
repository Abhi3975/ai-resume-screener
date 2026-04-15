"use client";
import React from 'react';
import { Toaster } from 'sonner';
import { CandidateProvider } from '@/context/CandidateContext';
import { JobProvider } from '@/context/JobContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <JobProvider>
      <CandidateProvider>
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: 'var(--panel-bg)', border: '1px solid var(--accent-color)', color: '#fff' } }} />
        {children}
      </CandidateProvider>
    </JobProvider>
  );
}
