"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/candidates', label: 'Candidates', icon: Users },
    { href: '/ats-scoring', label: 'ATS Scoring Engine', icon: Activity },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontWeight: 900, color: '#fff', fontSize: '18px' }}>N</span>
        </div>
        <h2 className="sidebar-text" style={{ fontSize: '1.2rem', margin: 0 }}>Nova Screener</h2>
      </div>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={20} />
              <span className="sidebar-text">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div style={{ marginTop: 'auto' }}>
        <div className="sidebar-text" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
          <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>HR</div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', margin: 0 }}>HR Admin</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Enterprise Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
