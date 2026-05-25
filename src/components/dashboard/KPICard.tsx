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
  const getIcon = (type: string) => {
    switch (type) {
      case 'employees':
        return <Users className="h-6 w-6 text-brand-green-mid" />;
      case 'completion':
        return <CheckCircle2 className="h-6 w-6 text-brand-nvidia" />;
      case 'readiness':
        return <Award className="h-6 w-6 text-brand-primary" />;
      case 'confidence':
        return <Cpu className="h-6 w-6 text-brand-primary-dark" />;
      default:
        return <Sparkles className="h-6 w-6 text-brand-primary" />;
    }
  };

  const getBackgroundCircle = (type: string) => {
    switch (type) {
      case 'employees':
        return 'bg-brand-green-light';
      case 'completion':
        return 'bg-brand-green-light/60';
      case 'readiness':
        return 'bg-brand-primary-light';
      case 'confidence':
        return 'bg-brand-primary-light/55';
      default:
        return 'bg-brand-off-white';
    }
  };

  return (
    <div 
      id={`kpi-card-${data.id}`}
      className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group hover:-translate-y-0.5"
    >
      {/* Visual background gradient glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary-light/10 rounded-full blur-2xl group-hover:bg-brand-primary-light/20 transition-all duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        {/* Metric labels */}
        <div className="space-y-2">
          <p className="text-xs font-bold font-sans text-brand-text-muted uppercase tracking-wider">{data.title}</p>
          <h3 className="text-2xl font-black text-brand-text-dark tracking-tight">{data.value}</h3>
        </div>

        {/* Dynamic circular icon wrapper */}
        <div className={`p-3 rounded-xl ${getBackgroundCircle(data.metricType)} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          {getIcon(data.metricType)}
        </div>
      </div>

      {/* Trend indicators */}
      <div className="flex items-center space-x-2.5 mt-4 pt-4 border-t border-brand-border/60">
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
    </div>
  );
}
