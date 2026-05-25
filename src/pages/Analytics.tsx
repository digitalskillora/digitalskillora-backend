import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  ChevronRight, 
  Search, 
  Award, 
  Flame, 
  Compass, 
  TrendingUp, 
  Tv, 
  Calendar,
  Layers,
  CheckSquare
} from 'lucide-react';
import { 
  learningVelocityData, 
  leaderboardData 
} from '../data/analyticsData';
import { LearningVelocityChart } from '../components/charts/CustomCharts';

export default function Analytics({ searchQuery = '' }: { searchQuery?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Filter leaderboard
  const filteredLeaderboard = leaderboardData.filter(item => {
    const activeSearch = searchTerm || searchQuery;
    const matchesSearch = item.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
                          item.role.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesDept = selectedDeptFilter === 'All' || item.department === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div id="analytics-page" className="space-y-8 animate-fade-in">
      
      {/* Top statistics summary widget row */}
      <section id="analytics-scorecards" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1 */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase tracking-wider block">Total Training Logged</span>
            <h3 className="text-2xl font-black text-brand-text-dark font-mono">72,450 <span className="text-xs font-normal text-brand-text-muted font-sans">Hrs</span></h3>
            <span className="text-[10px] font-mono text-brand-nvidia font-bold flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +14.2% acceleration target
            </span>
          </div>

          <div className="p-3 bg-brand-green-light rounded-xl border border-brand-green-border/30 text-brand-green-mid group-hover:scale-105 transition-transform">
            <Compass className="h-5.5 w-5.5" />
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase tracking-wider block">Completed Path Certs</span>
            <h3 className="text-2xl font-black text-brand-text-dark font-mono">4,120 <span className="text-xs font-normal text-brand-text-muted font-sans">Issued</span></h3>
            <span className="text-[10px] font-mono text-brand-primary-dark font-bold flex items-center">
              <Award className="h-3 w-3 mr-1" /> Verified against Workday records
            </span>
          </div>

          <div className="p-3 bg-brand-primary-light rounded-xl border border-brand-primary/20 text-brand-primary-dark group-hover:scale-105 transition-transform">
            <Award className="h-5.5 w-5.5" />
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase tracking-wider block">Continuous Learning Streak</span>
            <h3 className="text-2xl font-black text-brand-text-dark font-mono">18.4 <span className="text-xs font-normal text-brand-text-muted font-sans">Days avg</span></h3>
            <span className="text-[10px] font-mono text-brand-green-mid font-bold flex items-center">
              <Flame className="h-3 w-3 mr-1 text-brand-primary" /> Max peak at 42 days (Staff-ML)
            </span>
          </div>

          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-brand-primary group-hover:scale-105 transition-transform">
            <Flame className="h-5.5 w-5.5 fill-current" />
          </div>
        </div>

      </section>

      {/* Analytics Charts Grid */}
      <section id="analytics-visuals" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Multi line learning Velocity - lg:span-8 */}
        <div className="lg:col-span-8 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono mr-2">Weekly Learning Velocity Curve</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-brand-green-light text-brand-green-mid border border-brand-green-border/25 font-bold whitespace-nowrap shrink-0 ml-2">RECHARTS ENGINE</span>
            </div>
            <p className="text-xs text-brand-text-body mb-6">Comparative trend of average training completion velocities by company divisions.</p>
          </div>
          <div className="h-[280px]">
            <LearningVelocityChart data={learningVelocityData} />
          </div>
        </div>

        {/* Performance metrics breakdown - lg:span-4 */}
        <div className="lg:col-span-4 bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
              <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider mr-2">Training Effectiveness Index</h3>
              <span className="px-2 py-0.5 text-[9px] font-mono bg-brand-primary-light text-brand-primary-dark rounded font-bold whitespace-nowrap shrink-0 ml-2">ANALYSING MODEL</span>
            </div>

            <p className="text-xs text-brand-text-body leading-relaxed mb-6">
              AI analysis comparing course engagement speeds against direct performance scores on active projects.
            </p>

            {/* Simulated indicators */}
            <div className="space-y-5">
              
              {/* Factor 1 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-brand-text-dark">Knowledge Retention Score</span>
                  <span className="font-bold font-mono text-brand-green-mid">94.2%</span>
                </div>
                <div className="h-1.5 w-full bg-brand-off-white border border-brand-border rounded-full overflow-hidden">
                  <div className="h-full bg-brand-green" style={{ width: '94.2%' }} />
                </div>
              </div>

              {/* Factor 2 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-brand-text-dark">Post-Class Code Accuracy</span>
                  <span className="font-bold font-mono text-brand-nvidia">88.6%</span>
                </div>
                <div className="h-1.5 w-full bg-brand-off-white border border-brand-border rounded-full overflow-hidden">
                  <div className="h-full bg-brand-nvidia" style={{ width: '88.6%' }} />
                </div>
              </div>

              {/* Factor 3 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-brand-text-dark">Dynamic Platform Engagement</span>
                  <span className="font-bold font-mono text-brand-primary-dark">82.1%</span>
                </div>
                <div className="h-1.5 w-full bg-brand-off-white border border-brand-border rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: '82.1%' }} />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-brand-border/60 text-[10px] font-mono text-brand-text-muted flex justify-between">
            <span>Overall Score: <strong>88.3/100</strong></span>
            <span className="text-brand-green-mid font-extrabold flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green mr-1 animate-ping" />
              Verified Ok
            </span>
          </div>
        </div>

      </section>

      {/* Leaderboard segment */}
      <section id="analytics-leaderboard" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
        
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border/60 mb-6 gap-4">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase text-brand-text-dark tracking-wider flex items-center">
              <Award className="h-4.5 w-4.5 text-brand-primary mr-1 bg-brand-primary-light/40 rounded p-0.5" />
              Corporate Learner Leaderboard Matrix
            </h3>
            <p className="text-[11px] text-brand-text-body mt-0.5">Top-performing employees categorized by path completion indices and streak multipliers.</p>
          </div>

          {/* Search and filters split */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Dept tab switcher */}
            <div className="flex bg-brand-off-white border border-brand-border rounded-xl p-1 text-xs">
              {['All', 'Engineering', 'Operations', 'Finance'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedDeptFilter(tab)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    selectedDeptFilter === tab 
                      ? 'bg-brand-green text-white shadow' 
                      : 'text-brand-text-muted hover:text-brand-text-dark'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search leaderboard..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-brand-off-white border border-brand-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary w-48 font-medium"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-brand-text-muted" />
            </div>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto border border-brand-border rounded-xl">
          <table className="min-w-full divide-y divide-brand-border">
            <thead className="bg-brand-off-white font-mono text-[10px] text-brand-text-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">Employee</th>
                <th scope="col" className="px-6 py-3 text-left font-bold uppercase tracking-wider">Division</th>
                <th scope="col" className="px-6 py-3 text-center font-bold uppercase tracking-wider">Completed Paths</th>
                <th scope="col" className="px-6 py-3 text-center font-bold uppercase tracking-wider">Daily Streak</th>
                <th scope="col" className="px-6 py-3 text-right font-bold uppercase tracking-wider">Skill Rating Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-xs text-brand-text-dark font-sans">
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard.map((item) => (
                  <tr key={item.rank} className="hover:bg-brand-off-white/40 transition-colors">
                    {/* Rank with styling badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className={`h-6 w-6 font-mono font-bold flex items-center justify-center text-xs rounded-lg ${
                          item.rank === 1 
                            ? 'bg-brand-primary-light text-brand-primary-dark font-extrabold ring-1 ring-brand-primary/20' 
                            : item.rank === 2 
                            ? 'bg-brand-green-light text-brand-green-border border border-brand-green-border/20'
                            : 'bg-brand-off-white text-brand-text-muted border border-brand-border'
                        }`}>
                          {item.rank}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-lg bg-brand-green text-brand-primary flex items-center justify-center font-bold text-xs shadow-sm">
                          {item.avatar}
                        </div>
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-[10px] text-brand-text-muted font-mono">{item.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department name badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-off-white text-brand-text-body font-semibold">
                        {item.department}
                      </span>
                    </td>

                    {/* Completed */}
                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold font-mono">
                      {item.completedPaths} paths
                    </td>

                    {/* Streak */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-1 text-orange-600 font-bold font-mono">
                        <Flame className="h-3.5 w-3.5 fill-current" />
                        <span>{item.streakDays} days</span>
                      </div>
                    </td>

                    {/* High scores */}
                    <td className="px-6 py-4 whitespace-nowrap text-right font-black font-mono text-brand-green-mid">
                      {item.skillScore} pts
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-brand-text-muted font-mono">
                    No enterprise data found matching active criteria parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </section>

    </div>
  );
}
