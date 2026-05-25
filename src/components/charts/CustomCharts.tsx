import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Custom tooltip renderer for a sleek, dark enterprise experience
export const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-text-dark border border-brand-green-border text-white text-xs p-3.5 rounded-xl shadow-xl font-sans">
        <p className="font-bold tracking-tight mb-1.5 border-b border-white/10 pb-1 font-mono">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, idx: number) => (
            <p key={idx} className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
              <span className="text-[11px] opacity-85 uppercase font-medium">{entry.name}:</span>
              <span className="font-black font-mono text-[11px] ml-auto">{entry.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Growth Line Chart
interface GrowthLineProps {
  data: any[];
}
export function GrowthLineChart({ data }: GrowthLineProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          dx={-5}
        />
        <Tooltip content={<CustomChartTooltip />} />
        <Legend 
          iconType="circle" 
          iconSize={8} 
          wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }}
        />
        <Line 
          type="monotone" 
          dataKey="activeLearners" 
          name="Active Learners" 
          stroke="#0D3B2A" 
          strokeWidth={3} 
          activeDot={{ r: 6 }} 
          dot={{ r: 3, strokeWidth: 1 }} 
        />
        <Line 
          type="monotone" 
          dataKey="modulesCompleted" 
          name="Modules Completed" 
          stroke="#F5A623" 
          strokeWidth={3} 
          activeDot={{ r: 6 }} 
          dot={{ r: 3, strokeWidth: 1 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Department Column Bar Chart
interface DepartmentBarProps {
  data: any[];
}
export function DepartmentBarChart({ data }: DepartmentBarProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          dx={-5}
        />
        <Tooltip content={<CustomChartTooltip />} />
        <Legend 
          iconType="rect" 
          iconSize={10} 
          wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }}
        />
        <Bar 
          dataKey="readinessScore" 
          name="Readiness Index (%)" 
          fill="#0D3B2A" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={30} 
        />
        <Bar 
          dataKey="averageProgress" 
          name="Average Path Completion %" 
          fill="#76B900" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={30} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Radar Chart
interface SkillsRadarProps {
  data: any[];
}
export function SkillsRadarChart({ data }: SkillsRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="subject" stroke="#4B5563" fontSize={10} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" fontSize={9} />
        <Radar 
          name="Company Average Score" 
          dataKey="departmentScore" 
          stroke="#0D3B2A" 
          fill="#0D3B2A" 
          fillOpacity={0.25} 
        />
        <Radar 
          name="Target Enterprise Benchmark" 
          dataKey="targetBenchmark" 
          stroke="#F5A623" 
          fill="#F5A623" 
          fillOpacity={0.15} 
        />
        <Radar 
          name="SaaS Industry Average" 
          dataKey="industryAverage" 
          stroke="#76B900" 
          fill="#76B900" 
          fillOpacity={0.05} 
        />
        <Legend 
          iconType="circle" 
          iconSize={8} 
          wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
        />
        <Tooltip content={<CustomChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// Learning Velocity Multi-Line Chart
export function LearningVelocityChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" vertical={false} />
        <XAxis 
          dataKey="month" 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          dy={10}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          dx={-5}
        />
        <Tooltip content={<CustomChartTooltip />} />
        <Legend 
          iconType="circle" 
          iconSize={8} 
          wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }}
        />
        <Line type="monotone" dataKey="engineeringVelocity" name="Engineering" stroke="#0D3B2A" strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="operationsVelocity" name="Operations" stroke="#1A5C3F" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="financeVelocity" name="Finance" stroke="#F5A623" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="marketingVelocity" name="Marketing" stroke="#76B900" strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="hrVelocity" name="HR" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
