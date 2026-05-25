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
  Award
} from 'lucide-react';
import { 
  skillMapRadarData, 
  skillGapList, 
  departmentMatrixData 
} from '../data/analyticsData';
import { SkillsRadarChart } from '../components/charts/CustomCharts';

export default function SkillMapping() {
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState('All');
  const [selectedGap, setSelectedGap] = useState<any>(null);

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
      <section id="mapping-intro" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="px-2.5 py-1 text-[9px] font-bold font-mono rounded-full bg-brand-green text-brand-primary uppercase tracking-wider">SKILLS INTELLIGENCE HUB</span>
          <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono">Workforce Competency Mapping Centre</h3>
          <p className="text-xs text-brand-text-body">Inspect structural resource scores across core intelligence groups. Drill down to configure customized, rapid role alignments.</p>
        </div>

        {/* Selection quick highlights */}
        <div className="flex space-x-4">
          <div className="px-4 py-3 bg-brand-off-white border border-brand-border rounded-xl">
            <span className="text-[10px] text-brand-text-muted font-bold font-mono uppercase block">Active Gaps Detected</span>
            <span className="text-lg font-black font-mono text-red-600 mt-1 block">5 Critical</span>
          </div>

          <div className="px-4 py-3 bg-brand-off-white border border-brand-border rounded-xl">
            <span className="text-[10px] text-brand-text-muted font-bold font-mono uppercase block">Total Skill Nodes</span>
            <span className="text-lg font-black font-mono text-brand-green-mid mt-1 block">182 Active</span>
          </div>
        </div>
      </section>

      {/* Grid of analysis radar and heatmap */}
      <section id="radar-heatmap-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar score division - lg:span-5 */}
        <div className="lg:col-span-5 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Overall Competency Projections</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-primary-light text-brand-primary-dark font-bold">RADAR VISUAL</span>
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
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider font-mono">Departmental Skill Heatmap Matrix</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-green-light text-brand-green-border font-bold">GRID HEAT INDICATOR</span>
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

          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-brand-text-muted">
            <span>Heat indicators derived from final Workday certificates audits.</span>
            <div className="flex space-x-3">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-brand-green mr-1" /> &gt;85% High</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-brand-primary-light mr-1" /> &lt;70% Area to Optimize</span>
            </div>
          </div>
        </div>

      </section>

      {/* Skills Gap Analytics & Role Alignment Segment */}
      <section id="skills-gaps" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Real gap list monitor - lg:span-7 */}
        <div className="lg:col-span-7 bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-border/60">
            <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider">Enterprise Skills Gap Analytics queue</h3>
            <span className="text-[10px] font-mono text-red-600 bg-red-50 border border-red-150 px-2 py-0.5 rounded-full font-bold">GAP SYSTEM ALERTS</span>
          </div>

          <div className="space-y-3.5">
            {skillGapList.map((gap) => (
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
            ))}
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
                  onClick={() => alert(`Synchronized alignment for: ${selectedGap.skillName}`)}
                  className="w-full mt-2 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid hover:underline text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm"
                >
                  <Award className="h-4 w-4 text-brand-primary" />
                  <span>Execute Gap Alignment</span>
                </button>
              </div>
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
