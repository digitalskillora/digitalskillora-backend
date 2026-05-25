import React, { useState } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  AlertTriangle, 
  ArrowUpRight, 
  PieChart, 
  CornerDownRight, 
  ChevronRight, 
  Sliders,
  Users,
  Eye,
  Activity,
  Award,
  RefreshCcw
} from 'lucide-react';
import { 
  skillMapRadarData, 
  skillGapList, 
  departmentMatrixData 
} from '../data/analyticsData';
import { SkillsRadarChart } from '../components/charts/CustomCharts';

export default function SkillMapping({ searchQuery = '' }: { searchQuery?: string }) {
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState('All');
  const [selectedGap, setSelectedGap] = useState<any>(null);

  // Dynamic Gap Alignment state machine variables
  const [isAligning, setIsAligning] = useState(false);
  const [alignmentSuccess, setAlignmentSuccess] = useState(false);
  const [alignmentSteps, setAlignmentSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Sync alignment state triggers when selection changes
  React.useEffect(() => {
    setIsAligning(false);
    setAlignmentSuccess(false);
    setCurrentStepIndex(0);
  }, [selectedGap]);

  // Stepper sequence animation for database synchronization
  React.useEffect(() => {
    if (isAligning) {
      if (currentStepIndex < alignmentSteps.length) {
        const timer = setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        setIsAligning(false);
        setAlignmentSuccess(true);
      }
    }
  }, [isAligning, currentStepIndex]);

  const startGapAlignment = () => {
    setIsAligning(true);
    setAlignmentSuccess(false);
    setCurrentStepIndex(0);
    const steps = [
      'Scanning employee skill profiles in operations & tech teams...',
      'Compiling NVIDIA Accelerator baseline syllabus options...',
      'Mapping pathway requirements to Workday employee records...',
      'Synchronizing enterprise learning database logs...'
    ];
    setAlignmentSteps(steps);
  };

  const filteredGaps = skillGapList.filter(gap => 
    gap.skillName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    gap.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter skills or gaps based on departments
  const gapSeverityColors = {
    critical: 'bg-red-50 text-red-600 border-red-200',
    high: 'bg-amber-50 text-amber-700 border-amber-200',
    medium: 'bg-blue-50 text-blue-700 border-blue-200',
    low: 'bg-brand-green-light text-brand-green-border border-brand-green-border/30'
  };

  const gapSeverityPings = {
    critical: 'bg-red-500',
    high: 'bg-amber-500',
    medium: 'bg-blue-500',
    low: 'bg-brand-nvidia'
  };

  return (
    <div id="skill-mapping-page" className="space-y-8 animate-fade-in">
      
      {/* Skill Mapping Header */}
      <section id="mapping-intro" className="bg-white border-l-4 border-l-brand-green-mid border-y border-r border-brand-border rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(26,92,63,0.06)] hover:shadow-[0_6px_24px_-4px_rgba(26,92,63,0.09)] transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-black font-mono rounded-full bg-brand-green-light text-brand-green-border border border-brand-green-border/20 uppercase tracking-wider">
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
              SKILLS INTELLIGENCE HUB
            </span>
          </div>
          <h3 className="text-base font-black text-brand-text-dark uppercase tracking-wider font-mono">
            Workforce Competency Mapping Centre
          </h3>
          <p className="text-xs text-brand-text-body leading-relaxed">
            Inspect structural resource scores across core intelligence groups. Drill down to configure customized, rapid role alignments.
          </p>
        </div>

        {/* Selection quick highlights */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          {/* Active Gaps Scorecard */}
          <div className="group relative px-5 py-4 bg-white border-l-4 border-l-red-500 border-y border-r border-brand-border rounded-xl shadow-sm hover:shadow-[0_8px_30px_rgba(239,68,68,0.06)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-between min-w-[200px] overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-brand-text-muted font-black font-mono uppercase tracking-wider block">Active Gaps Detected</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-black font-mono text-red-600">5</span>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Critical</span>
              </div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-300 z-10 ml-4">
              <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
            </div>
          </div>

          {/* Total Skill Nodes Scorecard */}
          <div className="group relative px-5 py-4 bg-white border-l-4 border-l-brand-green-mid border-y border-r border-brand-border rounded-xl shadow-sm hover:shadow-[0_8px_30px_rgba(26,92,63,0.06)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-between min-w-[200px] overflow-hidden">
            {/* Ambient Background Accent */}
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-brand-green-mid/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-brand-text-muted font-black font-mono tracking-wider uppercase block">Total Skill Nodes</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-black font-mono text-brand-green-mid">182</span>
                <span className="text-xs font-bold text-brand-green-border uppercase tracking-wider">Active</span>
              </div>
            </div>
            <div className="p-2 bg-brand-green-light rounded-lg group-hover:bg-brand-green/20 transition-colors duration-300 z-10 ml-4">
              <GitBranch className="h-5 w-5 text-brand-green-border" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of analysis radar and heatmap */}
      <section id="radar-heatmap-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar score division - lg:span-5 */}
        <div className="lg:col-span-5 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider mr-2">Overall Competency Projections</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-primary-light text-brand-primary-dark font-bold whitespace-nowrap shrink-0 ml-2">RADAR VISUAL</span>
            </div>
            <p className="text-xs text-brand-text-body mb-6">Proportionate alignment of current workforce skills vs targeted benchmarks.</p>
          </div>
          <div className="h-[320px] flex items-center justify-center">
            <SkillsRadarChart data={skillMapRadarData} />
          </div>
        </div>

        {/* Interactive Heatmap matrix grid - lg:span-7 */}
        <div className="lg:col-span-7 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider font-mono mr-2">Departmental Skill Heatmap Matrix</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-green-light text-brand-green-border font-bold whitespace-nowrap shrink-0 ml-2">GRID HEAT INDICATOR</span>
            </div>
            <p className="text-xs text-brand-text-body mb-6">Darker colors reflect high competency density. Lighter grids indicate focal areas for training.</p>
          </div>

          <div className="overflow-x-auto border border-brand-border rounded-2xl bg-brand-off-white/40">
            <table className="min-w-full divide-y divide-brand-border">
              <thead className="bg-brand-off-white">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold font-mono text-brand-text-muted uppercase">Division</th>
                  <th scope="col" className="px-4 py-3 text-center text-[10px] font-bold font-mono text-brand-text-muted uppercase">AI/ML</th>
                  <th scope="col" className="px-4 py-3 text-center text-[10px] font-bold font-mono text-brand-text-muted uppercase">Cloud Ops</th>
                  <th scope="col" className="px-4 py-3 text-center text-[10px] font-bold font-mono text-brand-text-muted uppercase">Data Eng</th>
                  <th scope="col" className="px-4 py-3 text-center text-[10px] font-bold font-mono text-brand-text-muted uppercase">SecOps</th>
                  <th scope="col" className="px-4 py-3 text-center text-[10px] font-bold font-mono text-brand-text-muted uppercase">UI/UX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white text-xs">
                {departmentMatrixData.map((row) => (
                  <tr key={row.department} className="hover:bg-brand-off-white/50">
                    <td className="px-4 py-3.5 font-bold text-brand-text-dark whitespace-nowrap">{row.department}</td>
                    
                    {/* Render Heat cells with dynamic color background densities */}
                    <td className="px-2 py-3.5 text-center">
                      <div className="mx-auto rounded font-bold font-mono py-1.5 w-14 bg-brand-green text-brand-text-on-green text-[11px]">
                        {row.aiML}%
                      </div>
                    </td>

                    <td className="px-2 py-3.5 text-center">
                      <div className="mx-auto rounded font-bold font-mono py-1.5 w-14 bg-brand-green-mid text-brand-text-on-green text-[11px]">
                        {row.cloudDevOps}%
                      </div>
                    </td>

                    <td className="px-2 py-3.5 text-center">
                      <div className="mx-auto rounded font-bold font-mono py-1.5 w-14 bg-brand-green-mid/80 text-brand-text-on-green text-[11px]">
                        {row.dataEngineering}%
                      </div>
                    </td>

                    <td className="px-2 py-3.5 text-center">
                      <div className="mx-auto rounded font-bold font-mono py-1.5 w-14 bg-brand-green-mid/90 text-brand-text-on-green text-[11px]">
                        {row.securityCompliance}%
                      </div>
                    </td>

                    <td className="px-2 py-3.5 text-center">
                      <div className="mx-auto rounded font-bold font-mono py-1.5 w-14 bg-brand-primary-light text-brand-primary-dark text-[11px]">
                        {row.uxDesign}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-brand-text-muted">
            <span>Heat indicators derived from final Workday certificates audits.</span>
            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <span className="flex items-center whitespace-nowrap"><span className="w-2.5 h-2.5 rounded bg-brand-green mr-1.5 shrink-0" /> &gt;85% High</span>
              <span className="flex items-center whitespace-nowrap"><span className="w-2.5 h-2.5 rounded bg-brand-primary-light mr-1.5 shrink-0" /> &lt;70% Area to Optimize</span>
            </div>
          </div>
        </div>

      </section>

      {/* Skills Gap Analytics & Role Alignment Segment */}
      <section id="skills-gaps" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real gap list monitor - lg:span-7 */}
        <div className="lg:col-span-7 bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-border/60">
            <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider mr-2">Enterprise Skills Gap Analytics queue</h3>
            <span className="text-[10px] font-mono text-red-600 bg-red-50 border border-red-150 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0 ml-2">GAP SYSTEM ALERTS</span>
          </div>

          <div className="space-y-3.5">
            {filteredGaps.length > 0 ? (
              filteredGaps.map((gap) => (
                <div 
                key={gap.skillName} 
                onClick={() => setSelectedGap(gap)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 select-none ${
                  selectedGap?.skillName === gap.skillName 
                    ? 'border-brand-primary bg-brand-primary-light/10 ring-1 ring-brand-primary shadow-sm' 
                    : 'border-brand-border bg-brand-off-white hover:border-brand-text-muted'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${gapSeverityPings[gap.gapSeverity]}`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${gapSeverityPings[gap.gapSeverity]}`} />
                    </span>
                    <h4 className="text-xs font-bold text-brand-text-dark">{gap.skillName}</h4>
                    <span className="text-[10px] text-brand-text-muted font-mono">{gap.category}</span>
                  </div>
                  <p className="text-[11px] text-brand-text-body">
                    Required additional employees: <strong className="text-brand-text-dark font-black">{gap.countNeeded}</strong> • Active on path: <span className="font-semibold text-brand-green-mid">{gap.activeLearners}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-brand-text-muted font-mono uppercase block">Severity</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${gapSeverityColors[gap.gapSeverity]} border`}>
                      {gap.gapSeverity}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-brand-text-muted" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-brand-text-muted p-4 text-center">No matching skill gaps found.</p>
          )}
        </div>
        </div>

        {/* Role alignment system box - lg:span-5 */}
        <div className="lg:col-span-5 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sliders className="h-4.5 w-4.5 text-brand-primary" />
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Dynamic Competency Alignment</h3>
            </div>
            
            {selectedGap ? (
              isAligning ? (
                /* Dynamic Interactive Aligning Console Terminal */
                <div className="bg-brand-text-dark text-brand-white border border-brand-primary rounded-2xl p-5 space-y-4 font-mono text-[10px] shadow-lg animate-pulse">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <span className="text-[9px] font-bold text-brand-primary tracking-wider uppercase flex items-center">
                      <RefreshCcw className="h-3 w-3 mr-1 animate-spin" />
                      Deploying Alignment Sync
                    </span>
                    <span className="text-[9px] opacity-60">Step {currentStepIndex + 1}/{alignmentSteps.length}</span>
                  </div>
                  <div className="space-y-2 py-2 text-left">
                    {alignmentSteps.map((st, idx) => {
                      const isDone = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div key={idx} className={`flex items-start space-x-2 transition-opacity duration-200 ${
                          isDone ? 'opacity-50' : isCurrent ? 'opacity-100 font-bold text-brand-primary' : 'opacity-25'
                        }`}>
                          <span>{isDone ? '✓' : isCurrent ? '►' : '•'}</span>
                          <p className="leading-tight">{st}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-primary transition-all duration-300"
                      style={{ width: `${(currentStepIndex / alignmentSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              ) : alignmentSuccess ? (
                /* Alignment Success Metrics Scorecard */
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-brand-green-light border border-brand-green-border/20 rounded-xl p-4 text-center space-y-2.5 shadow-sm">
                    <div className="mx-auto h-8 w-8 rounded-full bg-brand-green text-brand-primary flex items-center justify-center shadow-inner">
                      <Award className="h-4.5 w-4.5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-brand-green-mid">Alignment Successful!</h4>
                      <p className="text-[10px] text-brand-text-body mt-1 leading-relaxed">
                        Competency baseline is fully synchronized across system targets.
                      </p>
                    </div>
                  </div>

                  <div className="bg-brand-off-white/80 border border-brand-border rounded-xl p-3.5 space-y-2 text-[10px] font-mono shadow-inner">
                    <span className="text-[9px] text-brand-text-muted uppercase font-bold tracking-wider block">Deployed Telemetry Matrix</span>
                    <div className="space-y-1.5 text-brand-text-body">
                      <div className="flex justify-between">
                        <span>Resolved Deficit:</span>
                        <span className="font-bold text-brand-green-mid truncate max-w-[120px]" title={selectedGap.skillName}>{selectedGap.skillName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pushed Syllabus:</span>
                        <span className="font-bold text-brand-green-mid">NVIDIA Accelerator v2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Cohort:</span>
                        <span className="font-bold text-brand-green-mid">{(selectedGap.countNeeded - selectedGap.activeLearners).toLocaleString()} Members</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setAlignmentSuccess(false)}
                    className="w-full py-2.5 bg-brand-off-white hover:bg-brand-border border border-brand-border text-brand-text-dark text-[10px] font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Close & Manage Gaps
                  </button>
                </div>
              ) : (
                /* Default Parameters Panel */
                <div className="space-y-4">
                  <div className="bg-brand-off-white p-4 rounded-xl border border-brand-border space-y-3">
                    <span className="text-[10px] font-mono text-brand-text-muted uppercase font-bold">Active Selection parameters</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-brand-text-dark">{selectedGap.skillName}</h4>
                      <p className="text-[11px] text-brand-text-body">Optimization pipeline index target. Platform impact rating is substantial.</p>
                    </div>
                    <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary" style={{ width: `${selectedGap.impactPercentage}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                      <span className="text-brand-text-muted font-semibold">Active Deficit Ratio</span>
                      <span className="font-bold text-red-600 font-mono">{(selectedGap.countNeeded - selectedGap.activeLearners).toLocaleString()} specialists</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-brand-border/60">
                      <span className="text-brand-text-muted font-semibold">System Impact Rating</span>
                      <span className="font-bold text-brand-green-mid font-mono">{selectedGap.impactPercentage}% Acceleration</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-brand-primary-light/55 border border-brand-primary/20 rounded-xl">
                    <div className="flex items-center space-x-2 text-brand-primary-dark font-sans font-bold text-xs mb-1">
                      <Sparkles className="h-4 w-4" />
                      <span>AI Suggested Alignment</span>
                    </div>
                    <p className="text-[11px] text-brand-text-body font-medium leading-relaxed">
                      Automatically trigger and push "NVIDIA Accelerator Courses v2" module as a baseline training route for operations and tech partners.
                    </p>
                  </div>

                  <button 
                    onClick={startGapAlignment}
                    className="w-full mt-2 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid hover:underline text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <Award className="h-4 w-4 text-brand-primary" />
                    <span>Execute Gap Alignment</span>
                  </button>
                </div>
              )
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-brand-border rounded-2xl bg-brand-off-white/40 my-auto h-full flex flex-col items-center justify-center min-h-[220px]">
                <GitBranch className="h-8 w-8 text-brand-primary mb-2 animate-bounce" />
                <p className="text-xs font-bold text-brand-text-dark">Select a Skill Gap to Deploy Alignment</p>
                <p className="text-[10px] text-brand-text-muted mt-1 px-4 leading-normal">
                  Click on any recorded skill deficit on the left queue to view and execute specific corporate alignment packages.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 p-3 bg-brand-off-white rounded-xl border border-brand-border">
            <div className="flex items-center justify-between text-[10px] font-mono text-brand-text-muted">
              <span>Next Global Audit Scheduled:</span>
              <span className="font-semibold text-brand-green-mid">In 3 hours</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
