import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  GitBranch, 
  BarChart3, 
  Activity, 
  Link2, 
  Settings as SettingsIcon,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export type NavItemKey = 
  | 'overview' 
  | 'learning-engine' 
  | 'skill-mapping' 
  | 'analytics' 
  | 'infrastructure' 
  | 'integrations' 
  | 'settings';

interface SidebarProps {
  currentTab: NavItemKey;
  setTab: (tab: NavItemKey) => void;
}

interface NavItem {
  key: NavItemKey;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

export default function Sidebar({ currentTab, setTab }: SidebarProps) {
  const navItems: NavItem[] = [
    { key: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { key: 'learning-engine', label: 'Adaptive Learning Engine', icon: Cpu, badge: 'AI' },
    { key: 'skill-mapping', label: 'Skill Mapping', icon: GitBranch },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'infrastructure', label: 'Infrastructure', icon: Activity, badge: 'Live' },
    { key: 'integrations', label: 'Integrations Hub', icon: Link2 },
    { key: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside id="sidebar-container" className="fixed top-0 left-0 bottom-0 w-72 bg-brand-green text-brand-white flex flex-col z-30 shadow-2xl border-r border-brand-green-border">
      {/* Brand Header */}
      <div id="sidebar-logo" className="h-20 flex items-center px-6 border-b border-brand-green-border">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Sparkles className="h-5 w-5 text-brand-green font-bold animate-pulse" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block">DigitalSkillora</span>
            <span className="text-[10px] font-mono tracking-widest text-brand-text-on-green-muted uppercase block">Adaptive Learning Intell</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav id="sidebar-nav" className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold tracking-wider text-brand-text-on-green-muted uppercase mb-3">Enterprise Workspace</p>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              id={`sidebar-nav-${item.key}`}
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-brand-green-mid text-white border-l-4 border-brand-primary shadow-inner'
                  : 'text-brand-text-on-green hover:bg-brand-green-border/40 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComponent className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-brand-primary' : 'text-brand-text-on-green-muted group-hover:text-brand-primary'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>
              
              <div className="flex items-center space-x-1.5">
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold uppercase ${
                    item.badge === 'AI' 
                      ? 'bg-brand-primary text-brand-green' 
                      : 'bg-brand-nvidia text-brand-green animate-pulse'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  isActive ? 'translate-x-0 opacity-100 text-brand-primary' : 'translate-x--1 text-brand-text-on-green-muted'
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Dedicated Brand Bottom Bar */}
      <div id="sidebar-footer" className="p-5 border-t border-brand-green-border bg-brand-green/80">
        <div className="bg-brand-green-mid/50 rounded-lg p-3 border border-brand-green-border">
          <div className="flex items-center space-x-2.5 mb-2">
            <ShieldCheck className="h-4 w-4 text-brand-nvidia" />
            <span className="text-[11px] font-bold font-mono text-white tracking-wide">NVIDIA STACK STATUS</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-brand-text-on-green-muted">Engine: TensorRT AI</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-nvidia opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-nvidia"></span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
