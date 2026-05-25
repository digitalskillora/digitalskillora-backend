export interface KPICardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  metricType: string;
}

export interface RecentActivity {
  id: string;
  employeeName: string;
  avatar: string;
  role: string;
  department: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'completed' | 'ongoing' | 'failed' | 'verified';
}

export interface DepartmentMetric {
  name: string;
  employees: number;
  readinessScore: number;
  averageProgress: number;
  completedHours: number;
}

export interface GrowthData {
  time: string;
  activeLearners: number;
  skillCompliance: number;
  modulesCompleted: number;
}

export const kpiCards: KPICardData[] = [
  {
    id: 'kpi-1',
    title: 'Active Employees on Platform',
    value: '14,282',
    change: '+12.4%',
    isPositive: true,
    timeframe: 'vs last month',
    metricType: 'employees'
  },
  {
    id: 'kpi-2',
    title: 'Adaptive Learning Completion Rate',
    value: '84.6%',
    change: '+3.2%',
    isPositive: true,
    timeframe: 'vs last month',
    metricType: 'completion'
  },
  {
    id: 'kpi-3',
    title: 'Organization Skill Readiness Index',
    value: '78.2 / 100',
    change: '+5.7%',
    isPositive: true,
    timeframe: 'vs last month',
    metricType: 'readiness'
  },
  {
    id: 'kpi-4',
    title: 'AI Training Confidence Match',
    value: '94.8%',
    change: '+1.5%',
    isPositive: true,
    timeframe: 'vs last quarter',
    metricType: 'confidence'
  }
];

export const recentActivities: RecentActivity[] = [
  {
    id: 'act-1',
    employeeName: 'Sarah Jenkins',
    avatar: 'SJ',
    role: 'Senior ML Engineer',
    department: 'Engineering',
    action: 'Completed path certification',
    target: 'NVIDIA TensorRT Optimization Techniques',
    timestamp: '4 mins ago',
    status: 'completed'
  },
  {
    id: 'act-2',
    employeeName: 'Marcus Chen',
    avatar: 'MC',
    role: 'UX Architect',
    department: 'Design & Frontend',
    action: 'Unlocked Skill Level 4',
    target: 'Cognitive Interface Architectures',
    timestamp: '18 mins ago',
    status: 'verified'
  },
  {
    id: 'act-3',
    employeeName: 'Elena Rostova',
    avatar: 'ER',
    role: 'Infrastructure Lead',
    department: 'Operations',
    action: 'Triggered adaptive path',
    target: 'Kubernetes Multi-GPU Orchestration',
    timestamp: '1 hour ago',
    status: 'ongoing'
  },
  {
    id: 'act-4',
    employeeName: 'David Kojo',
    avatar: 'DK',
    role: 'HR Business Partner',
    department: 'Human Resources',
    action: 'Verified competency gap',
    target: 'AI Policy Compliance Guide',
    timestamp: '3 hours ago',
    status: 'completed'
  },
  {
    id: 'act-5',
    employeeName: 'Tariq Al-Fayed',
    avatar: 'TF',
    role: 'Financial Analyst',
    department: 'Finance',
    action: 'Failed certification attempt',
    target: 'Algorithmic Financial Audit',
    timestamp: '5 hours ago',
    status: 'failed'
  }
];

export const departmentMetrics: DepartmentMetric[] = [
  { name: 'Engineering', employees: 4200, readinessScore: 88, averageProgress: 89, completedHours: 24500 },
  { name: 'Operations', employees: 3400, readinessScore: 79, averageProgress: 81, completedHours: 19800 },
  { name: 'Finance', employees: 1500, readinessScore: 76, averageProgress: 74, completedHours: 8900 },
  { name: 'Marketing', employees: 2100, readinessScore: 72, averageProgress: 68, completedHours: 12100 },
  { name: 'Human Resources', employees: 1200, readinessScore: 84, averageProgress: 85, completedHours: 7200 },
  { name: 'Product Management', employees: 1882, readinessScore: 82, averageProgress: 80, completedHours: 11400 },
];

export const growthChartData: GrowthData[] = [
  { time: 'Q1 2025', activeLearners: 8100, skillCompliance: 62, modulesCompleted: 4200 },
  { time: 'Q2 2025', activeLearners: 9400, skillCompliance: 68, modulesCompleted: 5900 },
  { time: 'Q3 2025', activeLearners: 11200, skillCompliance: 71, modulesCompleted: 7800 },
  { time: 'Q4 2025', activeLearners: 12600, skillCompliance: 74, modulesCompleted: 9300 },
  { time: 'Q1 2026', activeLearners: 14282, skillCompliance: 78, modulesCompleted: 11400 },
];

export const systemHealthMetrics = {
  gpuUsage: 78.4,
  latencyMs: 12,
  modelInferenceSpeedTokensSec: 1450,
  recommendationLoadPct: 64,
  contentEngineActivity: 'Optimizing standard training pipelines (4 parallel)',
  lastRefreshed: 'Just now'
};

export const aiRecommendations = [
  {
    id: 'rec-1',
    title: 'Bridge Kubernetes Gaps in Operations',
    description: '45 employees are struggling with GPU scheduling. AI recommends deploying the "Vulkan Core Optimization" module.',
    impact: 'Elevates Ops Readiness +8.4%',
    priority: 'Critical',
    category: 'Competency Gap'
  },
  {
    id: 'rec-2',
    title: 'Deploy Advanced Security Compliance to HR',
    description: 'New regulatory frameworks for AI systems require compliance training. Group deployment saves 120 training hours.',
    impact: 'Keeps HR Compliance at 100%',
    priority: 'High',
    category: 'Regulatory'
  },
  {
    id: 'rec-3',
    title: 'Adaptive Acceleration for Product Leads',
    description: 'PMs in SaaS lines show accelerated strategic learning speeds. Up-level courses automatically unlocked.',
    impact: 'Velocity Improvement +15%',
    priority: 'Medium',
    category: 'Fast-Track'
  }
];
