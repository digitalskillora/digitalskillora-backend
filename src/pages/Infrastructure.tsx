import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Network, 
  Database, 
  Terminal, 
  Sparkles, 
  Play, 
  RefreshCcw, 
  Zap, 
  Gauge, 
  ShieldAlert, 
  Settings,
  HardDrive
} from 'lucide-react';

export default function Infrastructure() {
  const [logs, setLogs] = useState<string[]>([
    "[03:26:01] INBOUND: Workday employee-sync handshake authorized.",
    "[03:26:10] MODEL_INF: Gemini fine-tune engine loaded on Cluster Node 2.",
    "[03:26:15] SYS_MIG: Slicing 4x NVIDIA A100 Core 2 (MIG slice ID: sg0.8gb).",
    "[03:26:22] PLATFORM: Sync scheduler verified 14,282 active profiles.",
    "[03:26:30] SEC_AUD: SSL certificates validated through Security Engine."
  ]);

  const [sysMetrics, setSysMetrics] = useState({
    cpu: 42,
    gpu: 78,
    mem: 59,
    lat: 12,
    inf: 1450,
    rec: 64,
    apiSuccess: 99.89
  });

  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  // Live simulation ticker for API logs and loads
  useEffect(() => {
    const logInterval = setInterval(() => {
      const endpoints = ["GET /api/v1/recommendations", "POST /api/v1/adaptive-path", "GET /api/v1/skills/gaps", "POST /api/v1/auth/sync"];
      const statuses = ["200 OK", "201 Created", "304 Not Modified"];
      const randomIp = `10.128.4${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 254)}`;
      const randomNode = `Cluster-0${Math.floor(Math.random() * 4) + 1}`;
      const randomLatency = Math.floor(Math.random() * 25) + 5;
      
      const newLog = `[${new Date().toLocaleTimeString()}] ${randomNode} - ${randomIp} - ${endpoints[Math.floor(Math.random() * endpoints.length)]} - ${statuses[Math.floor(Math.random() * statuses.length)]} (${randomLatency}ms)`;
      
      setLogs(prev => [newLog, ...prev.slice(0, 10)]);

      // Mutate load values slightly
      setSysMetrics(prev => {
        const deltaFactor = isSimulatingLoad ? 8 : 2;
        const targetCpu = isSimulatingLoad ? 88 : 42;
        const targetGpu = isSimulatingLoad ? 94 : 78;

        return {
          ...prev,
          cpu: Math.min(Math.max(prev.cpu + Math.round((Math.random() - 0.5) * deltaFactor + (targetCpu - prev.cpu) * 0.1), 30), 100),
          gpu: Math.min(Math.max(prev.gpu + Math.round((Math.random() - 0.5) * deltaFactor + (targetGpu - prev.gpu) * 0.1), 50), 100),
          mem: Math.min(Math.max(prev.mem + Math.round((Math.random() - 0.5) * 1.5), 50), 75),
          lat: Math.min(Math.max(prev.lat + Math.round((Math.random() - 0.5) * 2), 6), 25),
          inf: Math.round(prev.inf + (Math.random() - 0.5) * (isSimulatingLoad ? 200 : 50)),
          rec: Math.min(Math.max(prev.rec + Math.round((Math.random() - 0.5) * 1), 60), 70)
        };
      });
    }, 3000);

    return () => clearInterval(logInterval);
  }, [isSimulatingLoad]);

  const toggleStressTest = () => {
    setIsSimulatingLoad(!isSimulatingLoad);
    const logAction = !isSimulatingLoad ? "Abrupt loading stress test initialized..." : "Stress test deactivated. Cluster levels settling.";
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] [SYSTEM] ${logAction}`, ...prev]);
  };

  return (
    <div id="infrastructure-page" className="space-y-8 animate-fade-in">
      
      {/* Infrastructure summary hero panel */}
      <section id="infra-hero" className="bg-brand-green text-brand-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-brand-green-border">
        <div className="space-y-2 max-w-2xl">
          {/* NVIDIA System indicator label */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-[10px] font-bold font-mono rounded bg-brand-nvidia text-brand-green shadow uppercase tracking-wider animate-pulse">
              Powered by NVIDIA AI Stack
            </span>
            <span className="h-2 w-2 rounded-full bg-brand-nvidia" />
            <span className="text-[10px] font-mono text-brand-text-on-green-muted uppercase">Hardware: H100 MIG Array</span>
          </div>

          <h3 className="text-xl font-bold text-white uppercase tracking-tight font-mono">Enterprise AI Supercomputing Command Center</h3>
          <p className="text-xs text-brand-text-on-green leading-relaxed">
            Real-time telemetry feeds monitoring physical silicon optimization metrics, active deep learning tensor processes, pipeline compiler speeds, and API health indicators.
          </p>
        </div>

        {/* Stress simulator switch */}
        <div className="shrink-0">
          <button
            onClick={toggleStressTest}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-2 shadow cursor-pointer uppercase font-mono border ${
              isSimulatingLoad 
                ? 'bg-red-600 text-white border-red-500 animate-pulse' 
                : 'bg-brand-primary text-brand-green border-brand-primary-dark hover:bg-brand-primary-dark hover:text-white'
            }`}
          >
            <Zap className="h-4 w-4 text-brand-green shrink-0 fill-current" />
            <span>{isSimulatingLoad ? "Engage Normal Idle" : "Simulate Heavy AI Load"}</span>
          </button>
        </div>
      </section>

      {/* Main hardware monitoring dials grid */}
      <section id="hardware-dials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core GPU Cluster load */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5 pb-4 border-b border-brand-border">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Silicon Cluster</span>
              <Cpu className="h-4.5 w-4.5 text-brand-nvidia" />
            </div>
            <h4 className="text-base font-black text-brand-text-dark">GPU Utilization</h4>
          </div>

          <div className="py-6 text-center space-y-4">
            {/* Massive visual indicator */}
            <div className="relative inline-flex items-center justify-center">
              {/* Fake progress ring ring */}
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#F1F3F5" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="#76B900" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - sysMetrics.gpu / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute font-mono text-lg font-black text-brand-text-dark">{sysMetrics.gpu}%</div>
            </div>

            <p className="text-[11px] text-brand-text-body font-mono">Active cores: 512 Tensor RT Cores</p>
          </div>

          <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
            <span>Hardware Model: A100 MIG-80</span>
            <span className="text-brand-nvidia font-bold">MIG config active ✓</span>
          </div>
        </div>

        {/* Core CPU Cluster load */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5 pb-4 border-b border-brand-border">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">Host Controller</span>
              <Cpu className="h-4.5 w-4.5 text-brand-primary" />
            </div>
            <h4 className="text-base font-black text-brand-text-dark">CPU Host Load</h4>
          </div>

          <div className="py-6 text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#F1F3F5" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="#F5A623" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - sysMetrics.cpu / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute font-mono text-lg font-black text-brand-text-dark">{sysMetrics.cpu}%</div>
            </div>

            <p className="text-[11px] text-brand-text-body font-mono">128-core AMD EPYC processors</p>
          </div>

          <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
            <span>Overall Sockets: 2 Physical</span>
            <span className="text-brand-green-mid font-semibold">Healthy</span>
          </div>
        </div>

        {/* Core Memory utilization */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1.5 pb-4 border-b border-brand-border">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase">HBM Buffer</span>
              <HardDrive className="h-4.5 w-4.5 text-brand-green-mid" />
            </div>
            <h4 className="text-base font-black text-brand-text-dark">Memory Allocation</h4>
          </div>

          <div className="py-6 text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#F1F3F5" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke="#0D3B2A" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - sysMetrics.mem / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute font-mono text-lg font-black text-brand-text-dark">{sysMetrics.mem}%</div>
            </div>

            <p className="text-[11px] text-brand-text-body font-mono">320GB Silicon High-Bandwidth VRAM</p>
          </div>

          <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
            <span>Bandwidth: 1.6 TB/sec</span>
            <span className="text-brand-green-mid font-semibold">Ok</span>
          </div>
        </div>

      </section>

      {/* Latency and logging split */}
      <section id="latency-logs-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left indicators: Stats details - lg:span-5 */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Detailed stats checklist */}
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider mb-4 border-b border-brand-border pb-3">Platform Endpoint Performance</h3>
            
            <div className="space-y-4">
              {/* Bench 1 */}
              <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-brand-text-muted block uppercase">System Latency Target</span>
                  <span className="text-base font-black text-brand-text-dark font-mono">{sysMetrics.lat} ms</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-brand-green-light text-brand-green-border border border-brand-green-border/20 uppercase font-mono">Optimized</span>
              </div>

              {/* Bench 2 */}
              <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-brand-text-muted block uppercase">Model Inference Speed</span>
                  <span className="text-base font-black text-brand-text-dark font-mono">{sysMetrics.inf.toLocaleString()} tok/s</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-brand-primary-light text-brand-primary-dark uppercase font-mono">Duo channel</span>
              </div>

              {/* Bench 3 */}
              <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-brand-text-muted block uppercase">API Connect Success</span>
                  <span className="text-base font-black text-brand-text-dark font-mono">{sysMetrics.apiSuccess}%</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-brand-nvidia/20 text-brand-green-mid border border-brand-green-border/20 uppercase font-mono">99.99 Target</span>
              </div>

              {/* Bench 4 */}
              <div className="p-3 bg-brand-off-white border border-brand-border rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-brand-text-muted block uppercase">Recommendation Queue channels</span>
                  <span className="text-base font-black text-brand-text-dark font-mono">{sysMetrics.rec}% load</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-teal-50 text-teal-700 uppercase font-mono">Active</span>
              </div>
            </div>
          </div>

          {/* Secure system indicator */}
          <div className="p-4 bg-brand-primary-light/50 border border-brand-primary/20 rounded-2xl">
            <div className="flex items-center space-x-2 text-brand-primary-dark font-sans font-extrabold text-xs mb-1">
              <Zap className="h-4 w-4" />
              <span>GPU Acceleration Active</span>
            </div>
            <p className="text-[11px] text-brand-text-body font-medium leading-relaxed">
              MIG slices partition the physical silicon directly. Core security tokens run isolated under secure container rules, preventing any visual data leakage between student cohorts.
            </p>
          </div>

        </div>

        {/* Right log streams panel: Terminal simulator - xspan-7 */}
        <div className="lg:col-span-8 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-brand-text-muted" />
                <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Command Center Active API log stream</h3>
              </div>
              <span className="text-[10px] font-mono text-brand-text-muted leading-none">Simulation running...</span>
            </div>

            {/* Custom styled console grid */}
            <div className="bg-brand-text-dark text-brand-white p-5 rounded-2xl font-mono text-[11px] space-y-2.5 shadow-inner min-h-[290px] overflow-y-auto border border-brand-green-border">
              {logs.map((logLine, index) => {
                let textCol = 'text-gray-300';
                if (logLine.includes('INBOUND')) textCol = 'text-brand-primary';
                if (logLine.includes('MODEL_INF')) textCol = 'text-brand-nvidia';
                if (logLine.includes('Verified') || logLine.includes('healthy') || logLine.includes('success')) textCol = 'text-emerald-400';
                if (logLine.includes('SYSTEM')) textCol = 'text-yellow-400 animate-pulse font-bold';
                
                return (
                  <div key={index} className={`leading-relaxed border-l-2 pl-2 border-white/5 hover:border-brand-primary/40 py-0.5 transition-colors ${textCol}`}>
                    {logLine}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-brand-border flex items-center justify-between text-[11px] font-mono text-brand-text-muted">
            <span>Query source monitoring: REST / GRPC streams</span>
            <button 
              onClick={() => {
                const manualLog = `[${new Date().toLocaleTimeString()}] MANUAL_TRIGGER: Operational audit logs forced sync.`;
                setLogs(prev => [manualLog, ...prev]);
              }}
              className="text-brand-green-mid hover:text-brand-primary-dark font-extrabold"
            >
              Clear & Poll Logs
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
