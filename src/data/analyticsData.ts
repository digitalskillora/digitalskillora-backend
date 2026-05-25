export interface SkillMapItem {
  subject: string;
  departmentScore: number;
  targetBenchmark: number;
  industryAverage: number;
}

export interface SkillGapItem {
  skillName: string;
  category: string;
  countNeeded: number;
  activeLearners: number;
  gapSeverity: 'low' | 'medium' | 'high' | 'critical';
  impactPercentage: number;
}

export interface DepartmentMatrixCell {
  department: string;
  aiML: number; // score 1-100
  cloudDevOps: number;
  dataEngineering: number;
  securityCompliance: number;
  uxDesign: number;
}

export interface VelocityItem {
  month: string;
  engineeringVelocity: number;
  operationsVelocity: number;
  financeVelocity: number;
  marketingVelocity: number;
  hrVelocity: number;
}

export interface EmployeeLeaderboardItem {
  rank: number;
  name: string;
  avatar: string;
  role: string;
  department: string;
  completedPaths: number;
  skillScore: number;
  streakDays: number;
}

export const skillMapRadarData: SkillMapItem[] = [
  { subject: 'AI Models & Finetunes', departmentScore: 84, targetBenchmark: 95, industryAverage: 65 },
  { subject: 'GPU Infrastructure Ops', departmentScore: 78, targetBenchmark: 90, industryAverage: 58 },
  { subject: 'SaaS Architecture & Edge', departmentScore: 86, targetBenchmark: 88, industryAverage: 70 },
  { subject: 'Data Pipelining & ETL', departmentScore: 72, targetBenchmark: 85, industryAverage: 62 },
  { subject: 'Risk, Privacy & Security', departmentScore: 88, targetBenchmark: 92, industryAverage: 74 },
  { subject: 'Adaptive UI Engineering', departmentScore: 80, targetBenchmark: 85, industryAverage: 68 },
];

export const skillGapList: SkillGapItem[] = [
  {
    skillName: 'TensorRT Acceleration',
    category: 'NVIDIA Hardware Alignment',
    countNeeded: 182,
    activeLearners: 94,
    gapSeverity: 'critical',
    impactPercentage: 92
  },
  {
    skillName: 'K8s GPU Partitioning',
    category: 'Infrastructure',
    countNeeded: 120,
    activeLearners: 85,
    gapSeverity: 'high',
    impactPercentage: 84
  },
  {
    skillName: 'SecOps AI Shield Compliance',
    category: 'Governance & Privacy',
    countNeeded: 350,
    activeLearners: 310,
    gapSeverity: 'medium',
    impactPercentage: 76
  },
  {
    skillName: 'Vector Database Indexing',
    category: 'Data Science & Search',
    countNeeded: 95,
    activeLearners: 42,
    gapSeverity: 'high',
    impactPercentage: 81
  },
  {
    skillName: 'Multi-Modal Prompt Tuning',
    category: 'Enterprise Efficiency',
    countNeeded: 640,
    activeLearners: 580,
    gapSeverity: 'low',
    impactPercentage: 45
  }
];

export const departmentMatrixData: DepartmentMatrixCell[] = [
  { department: 'Engineering', aiML: 92, cloudDevOps: 86, dataEngineering: 89, securityCompliance: 84, uxDesign: 78 },
  { department: 'Operations', aiML: 76, cloudDevOps: 90, dataEngineering: 74, securityCompliance: 85, uxDesign: 62 },
  { department: 'Finance', aiML: 68, cloudDevOps: 70, dataEngineering: 80, securityCompliance: 88, uxDesign: 54 },
  { department: 'Marketing', aiML: 72, cloudDevOps: 64, dataEngineering: 68, securityCompliance: 74, uxDesign: 84 },
  { department: 'Human Resources', aiML: 82, cloudDevOps: 58, dataEngineering: 60, securityCompliance: 92, uxDesign: 70 },
];

export const learningVelocityData: VelocityItem[] = [
  { month: 'Nov', engineeringVelocity: 68, operationsVelocity: 54, financeVelocity: 42, marketingVelocity: 48, hrVelocity: 50 },
  { month: 'Dec', engineeringVelocity: 74, operationsVelocity: 58, financeVelocity: 46, marketingVelocity: 52, hrVelocity: 55 },
  { month: 'Jan', engineeringVelocity: 82, operationsVelocity: 64, financeVelocity: 52, marketingVelocity: 58, hrVelocity: 62 },
  { month: 'Feb', engineeringVelocity: 88, operationsVelocity: 71, financeVelocity: 59, marketingVelocity: 62, hrVelocity: 70 },
  { month: 'Mar', engineeringVelocity: 94, operationsVelocity: 76, financeVelocity: 64, marketingVelocity: 68, hrVelocity: 74 },
  { month: 'Apr', engineeringVelocity: 98, operationsVelocity: 82, financeVelocity: 68, marketingVelocity: 72, hrVelocity: 78 },
];

export const leaderboardData: EmployeeLeaderboardItem[] = [
  { rank: 1, name: 'Alexei Volkov', avatar: 'AV', role: 'Staff ML Scientist', department: 'Engineering', completedPaths: 14, skillScore: 994, streakDays: 42 },
  { rank: 2, name: 'Ananya Nair', avatar: 'AN', role: 'Ops Architect', department: 'Operations', completedPaths: 11, skillScore: 978, streakDays: 31 },
  { rank: 3, name: 'Brandon Cole', avatar: 'BC', role: 'SecOps Director', department: 'Operations', completedPaths: 10, skillScore: 965, streakDays: 28 },
  { rank: 4, name: 'Claire Dubois', avatar: 'CD', role: 'FinTech Strategist', department: 'Finance', completedPaths: 9, skillScore: 948, streakDays: 14 },
  { rank: 5, name: 'Emi Tanaka', avatar: 'ET', role: 'Cognitive Lead Designer', department: 'Engineering', completedPaths: 9, skillScore: 942, streakDays: 25 },
  { rank: 6, name: 'James O’Connor', avatar: 'JO', role: 'Talent Growth Mgr', department: 'Human Resources', completedPaths: 8, skillScore: 915, streakDays: 19 },
];
