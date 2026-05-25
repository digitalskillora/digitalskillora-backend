import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  TrendingDown,
  Award,
  Sparkles
} from 'lucide-react';
import { KPICardData } from '../../data/dashboardData';

interface KPICardProps {
  key?: string;
  data: KPICardData;
}

export default function KPICard({ data }: KPICardProps) {
  // Unified, high-end single brand green theme matching the DigitalSkillora corporate identity
  const theme = {
    accent: 'bg-brand-green-mid',
    iconBg: 'bg-brand-green-light border-brand-green-light',
    iconText: 'text-brand-green-mid',
    iconShadow: 'shadow-brand-green-light/40',
    gradient: 'from-brand-green-light/10 via-transparent to-transparent'
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'employees':
        return <Users className={`h-5.5 w-5.5 ${theme.iconText}`} />;
      case 'completion':
        return <CheckCircle2 className={`h-5.5 w-5.5 ${theme.iconText}`} />;
      case 'readiness':
        return <Award className={`h-5.5 w-5.5 ${theme.iconText}`} />;
      case 'confidence':
        return <Cpu className={`h-5.5 w-5.5 ${theme.iconText}`} />;
      default:
        return <Sparkles className={`h-5.5 w-5.5 ${theme.iconText}`} />;
    }
  };

  return (
    <div 
      id={`kpi-card-${data.id}`}
      className="bg-white border border-brand-border/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,112,184,0.05)] hover:-translate-y-1 relative overflow-hidden group select-none cursor-default"
    >
      {/* Premium left accent boundary strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${theme.accent} rounded-l-2xl transition-all duration-300 group-hover:w-2`} />

      {/* Subtle radial ambient background glow */}
      <div className={`absolute -right-4 -top-4 w-28 h-28 bg-gradient-to-br ${theme.gradient} rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:scale-125`} />

      <div className="flex items-start justify-between">
        {/* Title and Value */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold font-sans text-brand-text-muted uppercase tracking-wider leading-none">{data.title}</p>
          <h3 className="text-3xl font-extrabold text-brand-text-dark tracking-tight leading-none pt-0.5 transition-colors group-hover:text-brand-text-dark/90">
            {data.value}
          </h3>
        </div>

        {/* Dynamic circular icon wrapper with shadow glow */}
        <div className={`p-3 rounded-xl bg-white border ${theme.iconBg} ${theme.iconShadow} shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          {getIcon(data.metricType)}
        </div>
      </div>

      {/* Trend indicators */}
      <div className="flex items-center space-x-2.5 mt-5 pt-4 border-t border-brand-border/50">
        <div className={`flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
          data.isPositive 
            ? 'bg-brand-green-light text-brand-green-border' 
            : 'bg-red-50 text-red-600'
        }`}>
          {data.isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {data.change}
        </div>
        <span className="text-[11px] font-medium text-brand-text-muted">{data.timeframe}</span>
      </div>

      {/* Micro-animated bottom highlight progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-border/30 overflow-hidden">
        <div className={`h-full w-0 group-hover:w-full transition-all duration-500 ease-out ${theme.accent}`} />
      </div>
    </div>
  );
}
