import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  RefreshCcw, 
  Play, 
  CheckCircle, 
  Clock, 
  Layers, 
  ChevronRight, 
  Bookmark, 
  Gauge, 
  AlertCircle,
  TrendingUp,
  Workflow,
  Activity,
  Award
} from 'lucide-react';
import { 
  departmentOptions, 
  rolesByDepartment, 
  getRecommendationForRole 
} from '../data/learningData';

export default function AdaptiveLearning({ searchQuery = '' }: { searchQuery?: string }) {
  const [selectedDept, setSelectedDept] = useState('Engineering');
  const [selectedRole, setSelectedRole] = useState('Senior AI/ML Engineer');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState<string[]>([]);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'flow' | 'modules'>('flow');

  // Live Sandbox Workspace Activation State
  const [isInitializing, setIsInitializing] = useState(false);
  const [isTrackingStarted, setIsTrackingStarted] = useState(false);

  // Trigger evaluation path state
  const [currentPathData, setCurrentPathData] = useState(
    getRecommendationForRole('Senior AI/ML Engineer', 'Engineering')
  );

  const roles = rolesByDepartment[selectedDept] || [];

  // Reset live tracking active indicators when division/role shifts
  useEffect(() => {
    setIsTrackingStarted(false);
    setIsInitializing(false);
  }, [selectedDept, selectedRole]);

  // Sync role dropdown when department changes
  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0]);
    }
  }, [selectedDept]);

  // Sync target skills selection when role or department changes
  useEffect(() => {
    const data = getRecommendationForRole(selectedRole, selectedDept);
    setCurrentPathData(data);
    if (data.targetSkills.length > 0) {
      setSelectedSkill(data.targetSkills[0]);
    }
  }, [selectedRole]);

  // Simulate AI evaluation loading screen
  const runAdaptiveAnalysis = () => {
    setIsLoading(true);
    setCurrentStatusIndex(0);
    const statuses = [
      'Scanning active employee performance records...',
      'Mapping technical competency indices to system models...',
      'Evaluating hardware constraints & optimization clusters...',
      'Structuring personalized adaptive curricula levels...',
      'Compiling final visual training nodes map...'
    ];
    setLoadingStatuses(statuses);
  };

  useEffect(() => {
    if (isLoading) {
      if (currentStatusIndex < loadingStatuses.length) {
        const timer = setTimeout(() => {
          setCurrentStatusIndex(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false);
        const nextData = getRecommendationForRole(selectedRole, selectedDept);
        setCurrentPathData(nextData);
      }
    }
  }, [isLoading, currentStatusIndex]);

  const activeRecommendation = currentPathData.recommendations[0];

  return (
    <div id="learning-engine-page" className="space-y-8 animate-fade-in">
      
      {/* Controls & Configuration Segment */}
      <section id="engine-filters" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border/60">
          <div>
            <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono flex items-center">
              <Sparkles className="h-4.5 w-4.5 text-brand-primary mr-2 animate-pulse" />
              Simulated Adaptive Path Planner
            </h3>
            <p className="text-xs text-brand-text-body mt-1">Configure user cohorts to view adaptive pathway structures compiled dynamically by DigitalSkillora models.</p>
          </div>
          <button
            onClick={runAdaptiveAnalysis}
            disabled={isLoading}
            className="px-4 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid disabled:opacity-50 text-xs font-bold rounded-xl transition-all duration-150 flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <RefreshCcw className={`h-3.5 w-3.5 text-brand-primary ${isLoading ? 'animate-spin' : ''}`} />
            <span>Generate Adaptive Path</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Department Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-mono text-brand-text-muted uppercase">Select Division</label>
            <select
              id="dept-selector"
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
              }}
              className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary font-medium"
            >
              {departmentOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Role Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-mono text-brand-text-muted uppercase">Select Current Role</label>
            <select
              id="role-selector"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary font-medium"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Primary Target Skills Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold font-mono text-brand-text-muted uppercase">Optimizing Focal Skill</label>
            <div className="flex items-center space-x-2">
              <select
                id="skill-selector"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-brand-off-white border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary font-bold text-brand-green-mid"
              >
                {currentPathData.targetSkills.map((sk) => (
                  <option key={sk} value={sk}>{sk}</option>
                ))}
              </select>
              <div className="px-3 py-2.5 bg-brand-green-light rounded-xl border border-brand-green-border text-[11px] font-mono font-bold text-brand-green-mid">
                Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Overlay state */}
      {isLoading ? (
        <section id="analysis-loading-console" className="bg-brand-text-dark border-2 border-brand-primary rounded-2xl p-8 text-white shadow-xl min-h-[350px] flex flex-col justify-between animate-pulse">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <Cpu className="h-5 w-5 text-brand-primary animate-spin" />
              <span className="text-xs font-mono font-bold text-brand-primary tracking-wider uppercase">Running Adaptive Analysis...</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">Status: Running compilation</span>
          </div>

          <div className="space-y-4 py-8 max-w-xl mx-auto text-left">
            {loadingStatuses.map((st, idx) => {
              const isDone = idx < currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;
              return (
                <div key={idx} className={`flex items-start space-x-3 transition-opacity duration-300 ${
                  isDone ? 'opacity-50' : isCurrent ? 'opacity-100 font-bold' : 'opacity-20'
                }`}>
                  <span className="font-mono text-brand-primary mt-0.5">{isDone ? '✓' : isCurrent ? '►' : '•'}</span>
                  <p className="text-xs font-mono">{st}</p>
                </div>
              );
            })}
          </div>

          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary transition-all duration-300 ease-out"
              style={{ width: `${(currentStatusIndex / loadingStatuses.length) * 100}%` }}
            />
          </div>
        </section>
      ) : (
        /* Final Output Content Segment */
        <section id="adaptive-results" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual flow panel: Simulated React Flow - lg:span-8 */}
          <div className="lg:col-span-8 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border/60 pb-4 mb-6 gap-3">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider flex items-center">
                  <Workflow className="h-4.5 w-4.5 text-brand-green mr-1.5" />
                  Visual Interactive Skill Pathway Node Map
                </h3>
                <p className="text-[11px] text-brand-text-body mt-0.5">Real-time model connections routing. Click nodes to trace pipeline dependencies.</p>
              </div>

              {/* Toggle switch */}
              <div className="bg-brand-off-white border border-brand-border rounded-xl p-1 flex space-x-1">
                <button
                  onClick={() => setActiveTab('flow')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    activeTab === 'flow' ? 'bg-brand-green text-white shadow-sm' : 'text-brand-text-muted hover:text-brand-text-dark'
                  }`}
                >
                  Interactive Tree
                </button>
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                    activeTab === 'modules' ? 'bg-brand-green text-white shadow-sm' : 'text-brand-text-muted hover:text-brand-text-dark'
                  }`}
                >
                  Module Breakdown
                </button>
              </div>
            </div>

            {activeTab === 'flow' ? (
              /* Simulated React Flow diagram utilizing high-quality SVGs */
              <div className="relative border border-brand-border rounded-xl bg-brand-off-white/40 p-6 pb-20 flex flex-col items-center justify-center min-h-[520px] overflow-hidden">
                {/* SVG connection lines overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                  {/* Line from node1 to node2 */}
                  <path d="M 120,110 L 260,110" stroke="#0D3B2A" strokeWidth="2.5" strokeDasharray="5,5" fill="none" />
                  <path d="M 260,110 L 260,250" stroke="#1A5C3F" strokeWidth="2.5" fill="none" />
                  <path d="M 260,250 L 520,250" stroke="#E5E7EB" strokeWidth="2.5" strokeDasharray="6,4" fill="none" />
                  {/* Marker arrows */}
                  <polygon points="260,248 256,242 264,242" fill="#1A5C3F" />
                  <polygon points="518,250 512,246 512,254" fill="#E5E7EB" />
                </svg>

                <div className="relative w-full z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-4 items-start">
                  {/* Node 1: Skill Analysis (Completed) */}
                  <div className="bg-white border-2 border-brand-green-mid rounded-xl p-4 shadow-sm hover:ring-2 hover:ring-brand-green-mid/20 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-brand-green-light text-brand-green-border font-bold font-mono text-[9px] rounded uppercase">Completed</span>
                      <span className="text-[9px] font-mono text-brand-text-muted">Node ID: 10A</span>
                    </div>
                    <h4 className="text-xs font-bold text-brand-text-dark">User Skill Audit</h4>
                    <p className="text-[10px] text-brand-text-body mt-1">{activeRecommendation?.learningFlow[0]?.description || 'Gaps identified.'}</p>
                    <div className="mt-3 pt-2 border-t border-brand-border/65 flex flex-col gap-1 text-[10px] font-mono text-brand-green-mid">
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">Ref Score:</span>
                        <span className="font-bold">82.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">Status:</span>
                        <span className="font-bold">Verified ✓</span>
                      </div>
                    </div>

                    {/* Audit Metrics Sub-card to fill vertical space */}
                    <div className="mt-4 bg-brand-off-white/60 border border-brand-border/50 rounded-lg p-2.5 space-y-2 text-[10px] transition-all hover:bg-brand-off-white">
                      <div className="font-mono font-bold text-brand-text-dark uppercase tracking-wider text-[8px] flex items-center">
                        <Activity className="h-3 w-3 mr-1 text-brand-green" />
                        Audit Performance
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div>
                          <span className="text-brand-text-muted block text-[8px] uppercase leading-none">Rate</span>
                          <span className="text-brand-green font-bold text-[10px] mt-0.5 block">100%</span>
                        </div>
                        <div>
                          <span className="text-brand-text-muted block text-[8px] uppercase leading-none">Prereqs</span>
                          <span className="text-brand-green font-bold text-[10px] mt-0.5 block">Fully Met</span>
                        </div>
                      </div>
                      <div className="w-full bg-brand-border/70 h-1 rounded-full overflow-hidden mt-1">
                        <div className="bg-brand-green h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
 
                  {/* Node 2: AI Engine (Completed) */}
                  <div className="bg-white border-2 border-brand-primary rounded-xl p-4 shadow-sm hover:ring-2 hover:ring-brand-primary/20 transition-all md:translate-y-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-brand-primary-light text-brand-primary-dark font-bold font-mono text-[9px] rounded uppercase">Active System</span>
                      <span className="text-[9px] font-mono text-brand-text-muted">Node ID: 04B</span>
                    </div>
                    <h4 className="text-xs font-bold text-brand-text-dark">AI Matching Engine</h4>
                    <p className="text-[10px] text-brand-text-body mt-1">{activeRecommendation?.learningFlow[1]?.description || 'Dynamic syllabus mapping.'}</p>
                    <div className="mt-3 pt-2 border-t border-brand-border/65 flex flex-col gap-1 text-[10px] font-mono text-brand-primary-dark">
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">Confidence:</span>
                        <span className="font-bold">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-text-muted">Status:</span>
                        <span className="font-bold">Resolved ✓</span>
                      </div>
                    </div>

                    {/* Engine Efficiency Sub-card to fill vertical space */}
                    <div className="mt-4 bg-brand-off-white/60 border border-brand-border/50 rounded-lg p-2.5 space-y-2 text-[10px] transition-all hover:bg-brand-off-white">
                      <div className="font-mono font-bold text-brand-text-dark uppercase tracking-wider text-[8px] flex items-center">
                        <Award className="h-3 w-3 mr-1 text-brand-primary" />
                        Optimization Matrix
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div>
                          <span className="text-brand-text-muted block text-[8px] uppercase leading-none">Format</span>
                          <span className="text-brand-primary font-bold text-[10px] mt-0.5 block leading-tight">FP16 / INT8</span>
                        </div>
                        <div>
                          <span className="text-brand-text-muted block text-[8px] uppercase leading-none">Latency</span>
                          <span className="text-brand-primary font-bold text-[10px] mt-0.5 block leading-tight">&lt; 1.2ms</span>
                        </div>
                      </div>
                      <div className="w-full bg-brand-border/70 h-1 rounded-full overflow-hidden mt-1">
                        <div className="bg-brand-primary h-full rounded-full animate-pulse" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
 
                  {/* Node 3 & 4 stacking vertical */}
                  <div className="space-y-4">
                    {/* Node 3: Active Course Module */}
                    <div className="bg-white border-2 border-brand-primary-dark rounded-xl p-4 shadow-sm hover:ring-2 hover:ring-brand-primary-dark/20 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-brand-primary-light/50 text-brand-primary-dark font-bold font-mono text-[9px] rounded uppercase animate-pulse">In Progress</span>
                        <span className="text-[9px] font-mono text-brand-primary font-bold">Lab Module</span>
                      </div>
                      <h4 className="text-xs font-bold text-brand-text-dark">{activeRecommendation?.learningFlow[2]?.label || 'Active Lab'}</h4>
                      <p className="text-[10px] text-brand-text-body mt-1">{activeRecommendation?.learningFlow[2]?.description || 'Interactive execution.'}</p>
                      <div className="mt-3 pt-2 border-t border-brand-border/65 flex flex-col gap-1 text-[10px] font-mono text-brand-text-muted">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-bold">{activeRecommendation?.learningFlow[2]?.duration || '6 hrs'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Workspace:</span>
                          <span className="flex items-center text-brand-primary font-bold hover:underline cursor-pointer">
                            <Clock className="h-3 w-3 mr-1" /> Run Lab
                          </span>
                        </div>
                      </div>
                    </div>
 
                    {/* Node 4: Future Tracking */}
                    <div className="bg-white border border-brand-border/60 rounded-xl p-4 shadow-sm opacity-60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 bg-brand-off-white text-brand-text-muted font-bold font-mono text-[9px] rounded uppercase">Pending</span>
                        <span className="text-[9px] font-mono text-brand-text-muted">Monitoring</span>
                      </div>
                      <h4 className="text-xs font-bold text-brand-text-dark">{activeRecommendation?.learningFlow[3]?.label || 'Production Validation'}</h4>
                      <p className="text-[10px] text-brand-text-body mt-1">{activeRecommendation?.learningFlow[3]?.description || 'Post-class tracking.'}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-brand-text-muted font-mono bg-white/80 p-2 rounded border border-brand-border">
                  <span>Legend: Solid line = Done | Dashed = Pending</span>
                  <span className="text-brand-nvidia font-bold">NVIDIA CUDA Accelerated Nodes</span>
                </div>
              </div>
            ) : (
              /* List of modules text */
              <div className="space-y-4">
                {activeRecommendation?.learningFlow.map((flowNode, index) => (
                  <div key={flowNode.id} className="p-4 rounded-xl border border-brand-border bg-brand-off-white flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="h-5 w-5 rounded-full bg-brand-green text-brand-primary text-[10px] font-bold flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <h4 className="text-xs font-bold text-brand-text-dark">{flowNode.label}</h4>
                      </div>
                      <p className="text-[11px] text-brand-text-body pl-7">{flowNode.description}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      flowNode.status === 'completed'
                        ? 'bg-brand-green-light text-brand-green-border'
                        : flowNode.status === 'active'
                        ? 'bg-brand-primary-light text-brand-primary-dark animate-pulse'
                        : 'bg-brand-border text-brand-text-muted'
                    }`}>
                      {flowNode.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Recommendation details - lg:span-4 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recommendation summary brief card */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
              <div className="pb-3 border-b border-brand-border mb-4">
                <span className="px-2 py-0.5 bg-brand-primary-light text-brand-primary-dark font-bold font-mono text-[9px] rounded-full uppercase">RECOMMENDED TRACK</span>
                <h3 className="text-sm font-bold text-brand-text-dark mt-2">{activeRecommendation?.title || 'Advanced Masterclass'}</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-brand-text-muted font-mono font-semibold uppercase text-[10px]">COHORT FIT</span>
                  <span className="font-bold text-brand-green-mid bg-brand-green-light px-2 py-0.5 rounded font-mono text-[11px]">
                    {activeRecommendation?.relevanceMatch || 90}% MATCH
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-brand-text-muted font-mono font-semibold uppercase text-[10px]">TIME ALLOCATION</span>
                  <span className="font-black font-sans text-brand-text-dark">{activeRecommendation?.duration || '12 hrs'} total</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-brand-text-muted font-mono font-semibold uppercase text-[10px]">DIFFICULTY RATING</span>
                  <span className="font-bold text-brand-primary-dark bg-brand-primary-light px-2 py-0.5 rounded font-mono text-[10px] uppercase">
                    {activeRecommendation?.difficulty || 'Advanced'}
                  </span>
                </div>

                {/* Scope of target skills */}
                <div className="space-y-2 pt-3 border-t border-brand-border">
                  <span className="text-brand-text-muted font-mono font-semibold uppercase text-[10px] block">SKILLS TO BE ACQUIRED</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeRecommendation?.skillsAcquired.map((sk) => (
                      <span key={sk} className="px-2 py-1 bg-brand-off-white text-brand-text-dark font-bold font-mono text-[10px] rounded border border-brand-border">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {isTrackingStarted ? (
                  <div className="w-full mt-4 p-3 bg-brand-green-light border border-brand-green-border/20 text-brand-green-mid text-[11px] font-bold rounded-xl flex items-center justify-center space-x-2 animate-pulse select-none">
                    <CheckCircle className="h-4 w-4 text-brand-green-mid" />
                    <span>Live Learning Sandbox Session Activated!</span>
                  </div>
                ) : isInitializing ? (
                  <button 
                    disabled
                    className="w-full mt-4 py-3 bg-brand-green/70 text-white text-[11px] font-bold rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed select-none"
                  >
                    <RefreshCcw className="h-3.5 w-3.5 animate-spin text-brand-primary" />
                    <span>Allocating CUDA Sandbox Workspace...</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsInitializing(true);
                      setTimeout(() => {
                        setIsInitializing(false);
                        setIsTrackingStarted(true);
                      }, 1500);
                    }}
                    className="w-full mt-4 py-3 bg-brand-green text-white hover:bg-brand-green-mid hover:scale-[1.01] active:scale-[0.99] text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm cursor-pointer select-none"
                  >
                    <Play className="h-3.5 w-3.5 fill-current text-white" />
                    <span>Start Live Learning Track</span>
                  </button>
                )}
              </div>
            </div>

            {/* Simulated System Intelligence logs */}
            <div className="bg-brand-green text-brand-white rounded-2xl p-6 shadow-sm border border-brand-green-border">
              <div className="flex items-center space-x-2.5 mb-3">
                <Cpu className="h-4 w-4 text-brand-primary" />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-primary">Adaptive Intelligence Core</h4>
              </div>
              <p className="text-[11px] text-brand-text-on-green leading-relaxed">
                Platform agents scan competencies on daily Workday pulls. Gaps trigger micro-optimizations directly into user screens.
              </p>
              
              <div className="mt-4 pt-3 border-t border-brand-green-border text-[10px] font-mono text-brand-text-on-green-muted space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Inference Mode:</span>
                  <span className="text-brand-nvidia font-bold">TensorRT FP8 Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Syllabus Version:</span>
                  <span>v2026.5</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
