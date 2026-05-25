export interface LearningPathNode {
  id: string;
  label: string;
  type: 'analysis' | 'ai_engine' | 'module' | 'tracking';
  status: 'completed' | 'active' | 'pending';
  description: string;
  duration?: string;
  confidenceMatch?: string;
}

export interface LearningRecommendation {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  skillsAcquired: string[];
  relevanceMatch: number;
  learningFlow: LearningPathNode[];
}

export interface RoleSkillMapping {
  role: string;
  department: string;
  targetSkills: string[];
  recommendations: LearningRecommendation[];
}

export const departmentOptions = [
  'Engineering',
  'Marketing',
  'Operations',
  'Finance',
  'Human Resources'
];

export const rolesByDepartment: Record<string, string[]> = {
  Engineering: [
    'Senior AI/ML Engineer',
    'Full Stack Systems Architect',
    'Infrastructure & GPU Administrator',
    'QA Automation Engineer'
  ],
  Marketing: [
    'Growth & Performance Specialist',
    'SaaS Brand Strategist',
    'Product Marketer (AI DevTools)'
  ],
  Operations: [
    'SRE Orchestration Engineer',
    'Security Officer & Systems Auditor',
    'Procurement & Enterprise Scale Lead'
  ],
  Finance: [
    'Quantitative & Strategy Analyst',
    'Risk Management Supervisor',
    'Enterprise Financial Auditor'
  ],
  'Human Resources': [
    'Workforce Development Lead',
    'Talent Acquisition Specialist',
    'HR Compliance Architect'
  ]
};

export const learningMockDataByRole: Record<string, RoleSkillMapping> = {
  'Senior AI/ML Engineer': {
    role: 'Senior AI/ML Engineer',
    department: 'Engineering',
    targetSkills: ['NVIDIA TensorRT Optimizations', 'PyTorch Distributed Training', 'LLM Fine-Tuning'],
    recommendations: [
      {
        id: 'eng-ai-1',
        title: 'NVIDIA TensorRT Inference Compilations and Pruning',
        difficulty: 'Advanced',
        duration: '14 hrs',
        skillsAcquired: ['TensorRT Compiler', 'Model Quantization', 'GPU Kernels'],
        relevanceMatch: 98,
        learningFlow: [
          { id: 'node1', label: 'CUDA Core & GigaFLOP Profile', type: 'analysis', status: 'completed', description: 'Assessing compute bottlenecks and hardware compatibility on NVIDIA Ampere.' },
          { id: 'node2', label: 'Gemini Generative Quant Pruner', type: 'ai_engine', status: 'completed', description: 'AI evaluates weights to select 8-bit integer quantization targets.' },
          { id: 'node3', label: 'FP16 vs INT8 Execution Kernels', type: 'module', status: 'active', description: 'Interactive coding lab on FP16 execution graphs, custom CUDA callbacks, and latency benchmarking.', duration: '5 hrs' },
          { id: 'node4', label: 'Production Micro-Service Observability', type: 'tracking', status: 'pending', description: 'Simulated profiling through Prometheus/Grafana dashboards for real-time model memory footprint.' }
        ]
      },
      {
        id: 'eng-ai-2',
        title: 'High-Performance PyTorch Multi-Node Scaling',
        difficulty: 'Advanced',
        duration: '22 hrs',
        skillsAcquired: ['PyTorch FSDP', 'NCLL Collective Comm', 'DeepSpeed'],
        relevanceMatch: 95,
        learningFlow: [
          { id: 'node1', label: 'Inter-Node Bandwidth Assessment', type: 'analysis', status: 'completed', description: 'Testing InfiniBand network speeds and multi-GPU latency bottlenecks.' },
          { id: 'node2', label: 'DeepSpeed Stage 3 Optimizer Selection', type: 'ai_engine', status: 'completed', description: 'Platform recommends Zero-Redundancy Optimizer configurations.' },
          { id: 'node3', label: 'Collective Communication Implementation', type: 'module', status: 'active', description: 'Distributed Data Parallel training labs covering all-reduce techniques.', duration: '12 hrs' },
          { id: 'node4', label: 'Telemetry Evaluation & Token Speeds', type: 'tracking', status: 'pending', description: 'Automated monitoring of model losses, hyperparameter curves, and memory leaks.' }
        ]
      }
    ]
  },
  'Full Stack Systems Architect': {
    role: 'Full Stack Systems Architect',
    department: 'Engineering',
    targetSkills: ['Cognitive UI Frameworks', 'React 19 Concurrent States', 'Server-Driven Components'],
    recommendations: [
      {
        id: 'fs-arch-1',
        title: 'Architecting Real-Time Enterprise AI Interfaces',
        difficulty: 'Intermediate',
        duration: '16 hrs',
        skillsAcquired: ['React Server Components', 'WebSocket Canvas Rendering', 'Edge Layout Routing'],
        relevanceMatch: 92,
        learningFlow: [
          { id: 'node1', label: 'UX Interaction Performance Profiling', type: 'analysis', status: 'completed', description: 'Analyzing client-side responsiveness, DOM density limits, and component rerender delays.' },
          { id: 'node2', label: 'Layout Strategy Allocator', type: 'ai_engine', status: 'completed', description: 'AI maps optimal streaming chunk targets for complex visual models.' },
          { id: 'node3', label: 'Concurrent Streaming UI Labs', type: 'module', status: 'active', description: 'Building low-latency responsive control interfaces leveraging React 19 Suspense hooks.', duration: '8 hrs' },
          { id: 'node4', label: 'Client-Timing Analytics Pipeline', type: 'tracking', status: 'pending', description: 'Continuous integration of user latency statistics and interface frame rate reports.' }
        ]
      }
    ]
  },
  'Infrastructure & GPU Administrator': {
    role: 'Infrastructure & GPU Administrator',
    department: 'Engineering',
    targetSkills: ['Kubernetes vGPU Allocations', 'Prometheus GPU Metrics', 'NVIDIA MIG Configuration'],
    recommendations: [
      {
        id: 'infra-gpu-1',
        title: 'Multi-Instance GPU (MIG) Slicing & Resource Isolation',
        difficulty: 'Advanced',
        duration: '18 hrs',
        skillsAcquired: ['MIG Profiles', 'vGPU Scheduling', 'K8s Device Plugin'],
        relevanceMatch: 99,
        learningFlow: [
          { id: 'node1', label: 'Compute Unit Profile Audit', type: 'analysis', status: 'completed', description: 'Scanning and mapping current hardware utilization levels across NVLink networks.' },
          { id: 'node2', label: 'Adaptive Resource Allocation Optimizer', type: 'ai_engine', status: 'completed', description: 'Dynamic recommendation engine splits single physical A100/H100 cards into customized slices.' },
          { id: 'node3', label: 'Configuring Namespaces for vGPU Slices', type: 'module', status: 'active', description: 'Hands-on orchestration scripts allocating isolated workloads into Kubernetes YAML environments.', duration: '9 hrs' },
          { id: 'node4', label: 'Hardware Telemetry Continuous Streams', type: 'tracking', status: 'pending', description: 'Connecting automated scrapers for temperature profiles, power draws, and kernel execution logs.' }
        ]
      }
    ]
  },
  'QA Automation Engineer': {
    role: 'QA Automation Engineer',
    department: 'Engineering',
    targetSkills: ['Synthesized Regression Suites', 'Playwright Parallelization', 'Mock LLM Evaluators'],
    recommendations: [
      {
        id: 'qa-eng-1',
        title: 'Automated Playwright Architectures for Dynamic Applications',
        difficulty: 'Intermediate',
        duration: '10 hrs',
        skillsAcquired: ['Parallel Runners', 'Flakiness Detection', 'Synthetic Data Mocking'],
        relevanceMatch: 86,
        learningFlow: [
          { id: 'node1', label: 'Regression Suite Auditing', type: 'analysis', status: 'completed', description: 'Identifying high-duration manual triggers and flaky elements inside login flows.' },
          { id: 'node2', label: 'Suite Optimizer & Execution Sorter', type: 'ai_engine', status: 'completed', description: 'Auto-clustering similar workflows to run fast end-to-end regression scripts concurrently.' },
          { id: 'node3', label: 'Building Playwright Multi-Worker Orchestrations', type: 'module', status: 'active', description: 'Setting up headless browser automation matrices reporting through Docker containers.', duration: '5 hrs' },
          { id: 'node4', label: 'Automated Status and Execution Logs Output', type: 'tracking', status: 'pending', description: 'Real-time alert reporting synced directly to Slack and Slack notifications.' }
        ]
      }
    ]
  },
  'Growth & Performance Specialist': {
    role: 'Growth & Performance Specialist',
    department: 'Marketing',
    targetSkills: ['AI Growth Multipliers', 'SaaS Funnel Analytics', 'Dynamic Personalization Engines'],
    recommendations: [
      {
        id: 'mkt-gro-1',
        title: 'Architecting Behavioral User Loops & Algorithmic Attribution',
        difficulty: 'Intermediate',
        duration: '12 hrs',
        skillsAcquired: ['Funnel Science', 'Personalized Prompts', 'Cohorte Modeling'],
        relevanceMatch: 91,
        learningFlow: [
          { id: 'node1', label: 'Customer Conversion Flow Scanning', type: 'analysis', status: 'completed', description: 'Evaluating sign-up exit nodes and user interaction drop-off zones.' },
          { id: 'node2', label: 'Intent Classifier Engine', type: 'ai_engine', status: 'completed', description: 'AI categorizes audience behavioral signals into distinct cohorts.' },
          { id: 'node3', label: 'Targeted Growth Trigger Deployment', type: 'module', status: 'active', description: 'Customizing content prompts based on real-time referral attributes and session signals.', duration: '6 hrs' },
          { id: 'node4', label: 'Dynamic AB Retention Scorer', type: 'tracking', status: 'pending', description: 'Monitoring conversion uplifts, click-through margins, and client churn indexes.' }
        ]
      }
    ]
  }
};

// Fallback logic for roles not explicitly mapped
export const getRecommendationForRole = (roleName: string, deptName: string): RoleSkillMapping => {
  if (learningMockDataByRole[roleName]) {
    return learningMockDataByRole[roleName];
  }
  
  // Return dynamic template
  const skillsMap: Record<string, string[]> = {
    Marketing: ['SaaS Copy Generation', 'Ad Campaign Personalization', 'Brand Voice Consistency'],
    Finance: ['Enterprise Resource Sorter', 'Portfolio Rebalancer', 'Generative Risk Assessor'],
    Operations: ['Service Resilience', 'SLA Tracking', 'Log Auditing Systems'],
    'Human Resources': ['Employee Experience Index', 'Internal Mobility Algorithms', 'Unconscious Bias Guards']
  };

  const selectedSkills = skillsMap[deptName] || ['Enterprise Automation Core', 'Platform Navigation', 'Technical Audit Foundations'];

  return {
    role: roleName,
    department: deptName,
    targetSkills: selectedSkills,
    recommendations: [
      {
        id: 'dynamic-rec-1',
        title: `Advanced Masterclass in ${selectedSkills[0] || 'Enterprise Strategy'}`,
        difficulty: 'Intermediate',
        duration: '12 hrs',
        skillsAcquired: selectedSkills,
        relevanceMatch: 90,
        learningFlow: [
          { id: 'node1', label: 'Pre-Audit Evaluation', type: 'analysis', status: 'completed', description: `Analyzing active performance statistics concerning ${selectedSkills[0]}.` },
          { id: 'node2', label: 'Dynamic AI Target Planner', type: 'ai_engine', status: 'completed', description: 'AI evaluates competency gaps to structure a personalized module order.' },
          { id: 'node3', label: `Interactive Core: ${selectedSkills[0]}`, type: 'module', status: 'active', description: 'Engage with practical simulations and sandboxed problem-solving scenarios.', duration: '6 hrs' },
          { id: 'node4', label: 'Adaptive Mastery Verification', type: 'tracking', status: 'pending', description: 'Reviewing completion scores and automatically certifying target skills.' }
        ]
      }
    ]
  };
};
