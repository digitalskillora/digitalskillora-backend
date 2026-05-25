import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Activity, 
  Cpu, 
  Clock, 
  ArrowRight, 
  CornerDownRight, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  HardDriveDownload 
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import { 
  kpiCards, 
  recentActivities, 
  departmentMetrics, 
  growthChartData, 
  systemHealthMetrics, 
  aiRecommendations 
} from '../data/dashboardData';
import { GrowthLineChart, DepartmentBarChart } from '../components/charts/CustomCharts';

export default function Overview({ setTab, searchQuery = '' }: { setTab: (tab: any) => void; searchQuery?: string }) {
  const [health, setHealth] = useState(systemHealthMetrics);
  const [activities, setActivities] = useState(recentActivities);
  const [recommendations, setRecommendations] = useState(aiRecommendations);

  const filteredRecommendations = recommendations.filter(rec => 
    rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activities.filter(act => 
    act.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    act.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
    act.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate a live hardware pulse on the command center metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setHealth(prev => {
        const deltaGpu = (Math.random() - 0.5) * 4;
        const deltaLatency = Math.random() > 0.8 ? (Math.random() - 0.5) * 2 : 0;
        const deltaSpeed = (Math.random() - 0.5) * 30;
        
        return {
          ...prev,
          gpuUsage: Math.min(Math.max(parseFloat((prev.gpuUsage + deltaGpu).toFixed(1)), 70), 95),
          latencyMs: Math.min(Math.max(Math.round(prev.latencyMs + deltaLatency), 8), 18),
          modelInferenceSpeedTokensSec: Math.round(prev.modelInferenceSpeedTokensSec + deltaSpeed),
          recommendationLoadPct: Math.min(Math.max(prev.recommendationLoadPct + Math.round((Math.random() - 0.5) * 2), 58), 75)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Quick activity action trigger
  const handleTriggerReconciliation = (recId: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== recId));
    
    // Output a simulated new activity
    const newAct = {
      id: `act-${Date.now()}`,
      employeeName: 'Admin Console',
      avatar: 'AC',
      role: 'Automatic Trigger Office',
      department: 'Operations',
      action: 'Initiated GPU Path optimization',
      target: recId === 'rec-1' ? 'Kubernetes Resource Slices' : 'Global Policy Rollouts',
      timestamp: 'Just now',
      status: 'ongoing' as const
    };
    setActivities(prev => [newAct, ...prev.slice(0, 4)]);
  };

  return (
    <div id="overview-page" className="space-y-8 animate-fade-in">
      
      {/* KPI Cards Row */}
      <section id="overview-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card) => (
          <KPICard key={card.id} data={card} />
        ))}
      </section>

      {/* Analytics Charts Grid */}
      <section id="overview-charts" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth line */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono">Workforce Learning Growth Track</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-green-light text-brand-green-border font-bold">HISTORICAL TREND</span>
            </div>
            <p className="text-xs text-brand-text-body mb-6">Visual tracking of active system learners versus overall course completions indices.</p>
          </div>
          <div className="h-[280px]">
            <GrowthLineChart data={growthChartData} />
          </div>
        </div>

        {/* Department bar distribution */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono mr-2">Department Readiness Matrix</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-primary-light text-brand-primary-dark font-bold whitespace-nowrap shrink-0">DEPT PROFILES</span>
            </div>
            <p className="text-xs text-brand-text-body mb-6">Cross-comparison of overall skill density and average path progress by division.</p>
          </div>
          <div className="h-[280px]">
            <DepartmentBarChart data={departmentMetrics} />
          </div>
        </div>
      </section>

      {/* Core Insights & Monitoring Split Panel */}
      <section id="overview-widgets" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Recommendation Feed & Logs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Recommendation Panel */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-brand-border pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="h-6 w-6 bg-brand-primary-light rounded flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-brand-primary-dark" />
                </div>
                <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">AI Training Path Recommendations</h3>
              </div>
              <span className="text-[10px] font-mono text-brand-primary-dark font-bold bg-brand-primary-light px-2 py-0.5 rounded-full animate-pulse whitespace-nowrap shrink-0 ml-2">{recommendations.length} Pending Actions</span>
            </div>

            {filteredRecommendations.length > 0 ? (
              <div className="space-y-4">
                {filteredRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-xl border border-brand-border bg-brand-off-white hover:border-brand-primary transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          rec.priority === 'Critical' 
                            ? 'bg-red-50 text-red-600 border border-red-150' 
                            : rec.priority === 'High' 
                            ? 'bg-brand-primary-light text-brand-primary-dark' 
                            : 'bg-brand-green-light text-brand-green-mid'
                        }`}>
                          {rec.priority} Priority
                        </span>
                        <span className="text-[10px] font-bold font-mono text-brand-text-muted">{rec.category}</span>
                      </div>
                      <h4 className="text-xs font-bold font-sans text-brand-text-dark group-hover:text-brand-primary-dark transition-colors">{rec.title}</h4>
                      <p className="text-[11px] text-brand-text-body">{rec.description}</p>
                      <span className="flex items-center text-[10px] font-mono font-bold text-brand-green-mid mt-1">
                        <CornerDownRight className="h-3.5 w-3.5 mr-1" />
                        Platform Projection: {rec.impact}
                      </span>
                    </div>

                    <div className="flex items-center justify-end shrink-0">
                      <button
                        onClick={() => handleTriggerReconciliation(rec.id)}
                        className="px-3.5 py-2 bg-brand-green text-white hover:bg-brand-green-mid text-[11px] font-bold rounded-lg transition-all duration-150 flex items-center space-x-1.5 shadow whitespace-nowrap shrink-0"
                      >
                        <Play className="h-3 w-3 fill-current text-brand-primary" />
                        <span>Deploy Solution</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-brand-border rounded-xl">
                <CheckCircle className="h-8 w-8 text-brand-nvidia mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-text-dark">All path recommendation queues optimized</p>
                <p className="text-[11px] text-brand-text-muted mt-1">AI models suggest maintaining current corporate streams.</p>
              </div>
            )}
          </div>

          {/* Recent Activity List widget */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Recent Learning Activity Monitor</h3>
              <button 
                onClick={() => setTab('analytics')}
                className="text-[11px] font-bold text-brand-green-mid hover:text-brand-primary-dark transition-colors flex items-center whitespace-nowrap shrink-0 ml-2"
              >
                View full leaderboards
                <ChevronRight className="h-3.5 w-3.5 ml-0.5 shrink-0" />
              </button>
            </div>

            <div className="divide-y divide-brand-border/60">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act) => (
                <div key={act.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-brand-off-white/50 -mx-6 px-6 transition-colors gap-2 sm:gap-0">
                  <div className="flex items-start space-x-3.5">
                    {/* Fake avatar */}
                    <div className="h-9 w-9 bg-brand-green text-brand-primary flex items-center justify-center font-bold text-xs rounded-xl shadow-sm shrink-0">
                      {act.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span className="text-xs font-bold text-brand-text-dark">{act.employeeName}</span>
                        <span className="text-[10px] font-mono bg-brand-off-white text-brand-text-muted px-1.5 py-0.2 rounded whitespace-nowrap">
                          {act.department}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-text-body mt-0.5">
                        {act.action} <span className="font-semibold text-brand-text-dark">"{act.target}"</span>
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto pl-[50px] sm:pl-0">
                    <span className="text-[10px] text-brand-text-muted font-mono whitespace-nowrap">{act.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase whitespace-nowrap ${
                      act.status === 'completed' 
                        ? 'bg-brand-green-light text-brand-green-border' 
                        : act.status === 'ongoing' 
                        ? 'bg-yellow-50 text-brand-primary-dark border border-yellow-100' 
                        : act.status === 'verified'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {act.status}
                    </span>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-xs text-brand-text-muted p-4 text-center">No matching activities found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Platform Status & Monitoring */}
        <div id="overview-telemetry" className="lg:col-span-4 space-y-6">
          
          {/* System Health Card */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-brand-nvidia" />
                  <span className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Command Center Telemetry</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-brand-nvidia animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-brand-nvidia uppercase">LIVE SECURE</span>
                </div>
              </div>

              {/* Progress and numbers widgets */}
              <div className="space-y-4">
                {/* GPU Load Indicator */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-brand-text-body font-sans">NVIDIA Enterprise GPU Cluster load</span>
                    <span className="font-mono font-bold text-brand-green-mid">{health.gpuUsage}%</span>
                  </div>
                  <div className="h-2 w-full bg-brand-off-white border border-brand-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-green-mid to-brand-nvidia transition-all duration-1000 ease-out" 
                      style={{ width: `${health.gpuUsage}%` }}
                    />
                  </div>
                </div>

                {/* API / Latency Indicator */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl">
                    <span className="text-[10px] text-brand-text-muted font-bold font-mono block uppercase">Query Latency</span>
                    <span className="text-lg font-black font-mono text-brand-text-dark mt-1 block">{health.latencyMs}ms</span>
                    <span className="text-[9px] text-brand-nvidia font-bold font-mono">Platform target ok</span>
                  </div>

                  <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl">
                    <span className="text-[10px] text-brand-text-muted font-bold font-mono block uppercase">AI Model Load</span>
                    <span className="text-lg font-black font-mono text-brand-text-dark mt-1 block">{health.recommendationLoadPct}%</span>
                    <span className="text-[9px] text-brand-primary-dark font-bold font-mono">4 queue channels</span>
                  </div>
                </div>

                {/* Inference speeds */}
                <div className="p-3.5 bg-brand-green text-brand-white rounded-xl border border-brand-green-border/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-brand-text-on-green uppercase font-semibold">Model Inference Speed</span>
                    <Cpu className="h-3.5 w-3.5 text-brand-primary" />
                  </div>
                  <span className="text-xl font-bold font-mono text-white block">
                    {health.modelInferenceSpeedTokensSec.toLocaleString()} <span className="text-[10px] text-brand-text-on-green-muted font-normal">t/sec</span>
                  </span>
                  <p className="text-[10px] text-brand-text-on-green-muted mt-2 leading-relaxed">
                    Powered by dual TensorRT FP8 compiler pipelines. Active stream: {health.contentEngineActivity}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
              <span>NVIDIA A100-MIG Config: Active</span>
              <button 
                onClick={() => setTab('infrastructure')}
                className="text-brand-green-mid hover:text-brand-primary-dark font-bold hover:underline"
              >
                Inspect Infrastructure
              </button>
            </div>
          </div>

          {/* Platform Performance metrics summary */}
          <div className="bg-brand-primary-light/40 border border-brand-primary/20 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold font-sans text-brand-primary-dark uppercase tracking-wider mb-2">Platform Readiness Score</h4>
            <div className="flex items-baseline space-x-1.5 mb-2">
              <span className="text-3xl font-black text-brand-text-dark font-mono">78.2</span>
              <span className="text-xs font-bold text-brand-text-muted">/ 100 max</span>
            </div>
            <p className="text-[11px] text-brand-text-body leading-relaxed mb-4">
              Your overall corporate learning readiness has improved by <strong className="text-brand-green-border font-extrabold">+5.7%</strong> this month. Deploy recommended pipelines to reach target 85 benchmark.
            </p>
            <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary rounded-full" style={{ width: '78.2%' }} />
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
