import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  SearchCode, 
  Sparkles,
  ChevronDown,
  LogOut,
  Sliders,
  CalendarDays
} from 'lucide-react';

interface HeaderProps {
  title: string;
  onSearch?: (term: string) => void;
}

export default function Header({ title, onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI training pipeline for Engineering completed with high confidence.", isNew: true, time: "4 mins ago" },
    { id: 2, text: "Critial skill gap alert: Multi-MIG GPU configurations required.", isNew: true, time: "2 hrs ago" },
    { id: 3, text: "Integration sync with Workday completed (14,282 profiles parsed).", isNew: false, time: "24 mins ago" }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
  };

  const newCount = notifications.filter(n => n.isNew).length;

  return (
    <header id="main-header" className="h-20 border-b border-brand-border bg-white sticky top-0 px-8 z-20 flex items-center justify-between">
      {/* Left side description */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 id="header-page-title" className="text-xl font-bold tracking-tight text-brand-text-dark">{title}</h1>
          <p className="text-[11px] font-mono text-brand-text-muted flex items-center mt-0.5">
            <CalendarDays className="h-3.5 w-3.5 mr-1 text-brand-primary" />
            Platform Active • Last sync: <span className="font-semibold text-brand-green-mid ml-1">May 25, 2026 03:26 UTC</span>
          </p>
        </div>
      </div>

      {/* Right side widgets */}
      <div className="flex items-center space-x-6">
        {/* Search bar */}
        <div className="relative w-80 max-md:hidden">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-brand-text-muted" />
          </div>
          <input
            id="header-search-input"
            type="text"
            placeholder="Search employees, skills, paths..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-brand-off-white border border-brand-border rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-brand-text-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-200"
          />
        </div>

        {/* Notification bell panel */}
        <div className="relative">
          <button
            id="notification-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl border border-brand-border bg-brand-off-white hover:bg-brand-border/30 hover:border-brand-text-muted transition-all duration-200 relative group"
          >
            <Bell className="h-4.5 w-4.5 text-brand-text-dark group-hover:scale-105 transition-transform duration-200" />
            {newCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-brand-primary rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div id="notifications-dropdown" className="absolute right-0 mt-3 w-80 bg-white border border-brand-border shadow-xl rounded-2xl p-4 z-50 text-xs animate-fade-in/10">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <span className="font-bold text-sm text-brand-text-dark flex items-center">
                  <Sparkles className="h-4 w-4 text-brand-primary mr-1 animate-spin" />
                  Active Notifications ({newCount})
                </span>
                {newCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="py-2 divide-y divide-brand-border max-h-60 overflow-y-auto">
                {notifications.map(item => (
                  <div key={item.id} className={`py-3 ${item.isNew ? 'bg-brand-primary-light/30 -mx-4 px-4' : ''}`}>
                    <p className={`${item.isNew ? 'font-semibold' : ''} text-brand-text-dark leading-normal`}>{item.text}</p>
                    <span className="text-[10px] mt-1 block font-mono text-brand-text-muted">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-brand-border text-center">
                <p className="text-[10px] text-brand-text-muted font-medium">Enterprise command center feed monitoring.</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Widget */}
        <div className="relative">
          <button
            id="profile-dropdown-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-1.5 pr-3 rounded-xl border border-brand-border bg-brand-off-white hover:border-brand-text-muted transition-all duration-150 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg bg-brand-green flex items-center justify-center font-bold text-sm text-brand-primary shadow shadow-brand-green/30">
              TM
            </div>
            <div className="text-left max-sm:hidden">
              <span className="text-xs font-bold text-brand-text-dark block leading-none">T. Maxwell</span>
              <span className="text-[10px] font-mono text-brand-nvidia block leading-none mt-1">Global HR Admin</span>
            </div>
            <ChevronDown className="h-3 w-3 text-brand-text-muted" />
          </button>

          {showProfileMenu && (
            <div id="profile-dropdown-menu" className="absolute right-0 mt-3 w-56 bg-white border border-brand-border shadow-xl rounded-2xl p-2.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-brand-border mb-1.5">
                <p className="font-bold text-brand-text-dark text-[11px] uppercase tracking-wider font-mono">Organization</p>
                <p className="text-xs text-brand-text-body mt-0.5 font-semibold">Stark Enterprises Int.</p>
              </div>
              
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark rounded-lg transition-all duration-150">
                <Sliders className="h-3.5 w-3.5 text-brand-primary" />
                <span>Control Panel</span>
              </button>

              <button className="w-full flex items-center space-x-2 px-3 py-2 text-brand-text-body hover:bg-brand-off-white hover:text-brand-text-dark rounded-lg transition-all duration-150">
                <SearchCode className="h-3.5 w-3.5 text-brand-nvidia" />
                <span>Auditing Console</span>
              </button>

              <div className="border-t border-brand-border my-1.5"></div>

              <button className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 text-left font-medium">
                <LogOut className="h-3.5 w-3.5" />
                <span>Lock Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
