import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ClientProviders from '@/components/ClientProviders';
import { CursorSpotlight, GlobalTicker } from '@/components/AwwwardsEffects';

export const metadata: Metadata = {
  title: 'Nova AI Resume Screener',
  description: 'Intelligent resume parsing and candidate ranking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="app-layout">
          <ClientProviders>
            <CursorSpotlight color="rgba(139,92,246,0.8)" />
            <Sidebar />
            <div className="main-content">
              {children}
            </div>
            <GlobalTicker prefix="Live NLP Parsing Matrix" />
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
