import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  GraduationCap, 
  Award, 
  Users, 
  Layers, 
  Plus, 
  ArrowUpRight,
  Sliders
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  skills: string[];
  enrolledCount: number;
  rating: number;
}

const initialCourses: Course[] = [
  {
    id: 'crs-1',
    title: 'NVIDIA TensorRT Inference Optimization',
    description: 'Learn to optimize deep learning models for high-throughput, low-latency deployments using TensorRT compilers.',
    category: 'AI & Acceleration',
    difficulty: 'Advanced',
    duration: '24 Hours',
    skills: ['TensorRT', 'CUDA', 'Optimization'],
    enrolledCount: 1420,
    rating: 4.9
  },
  {
    id: 'crs-2',
    title: 'PyTorch Deep Learning Foundations',
    description: 'Master neural network architecture design, loss functions, optimizers, and automated training pipelines.',
    category: 'Machine Learning',
    difficulty: 'Beginner',
    duration: '32 Hours',
    skills: ['PyTorch', 'Neural Networks', 'Python'],
    enrolledCount: 3450,
    rating: 4.7
  },
  {
    id: 'crs-3',
    title: 'Enterprise MLOps & Model Versioning',
    description: 'Build robust Continuous Integration and Deployment models for models using Kubernetes and MLflow registry containers.',
    category: 'MLOps',
    difficulty: 'Intermediate',
    duration: '28 Hours',
    skills: ['MLflow', 'Kubernetes', 'CI/CD'],
    enrolledCount: 840,
    rating: 4.6
  },
  {
    id: 'crs-4',
    title: 'CUDA Parallel Architecture Design',
    description: 'Unlock maximum parallelism on NVIDIA GPUs. Deep dive into shared memory, thread blocks, and memory coalescing rules.',
    category: 'AI & Acceleration',
    difficulty: 'Advanced',
    duration: '40 Hours',
    skills: ['CUDA', 'GPU Hardware', 'C++'],
    enrolledCount: 650,
    rating: 4.9
  },
  {
    id: 'crs-5',
    title: 'React Enterprise Architecture & Scale',
    description: 'Master micro-frontends, state machines, context-based caching, and responsive design systems for modern SaaS systems.',
    category: 'Frontend Engineering',
    difficulty: 'Intermediate',
    duration: '20 Hours',
    skills: ['React', 'TypeScript', 'TailwindCSS'],
    enrolledCount: 2280,
    rating: 4.8
  },
  {
    id: 'crs-6',
    title: 'Generative AI & LLM Fine-Tuning v2',
    description: 'Fine-tune large language models using LoRA and PEFT parameter-efficient techniques for enterprise domain datasets.',
    category: 'Machine Learning',
    difficulty: 'Advanced',
    duration: '30 Hours',
    skills: ['LLMs', 'LoRA', 'PEFT'],
    enrolledCount: 1980,
    rating: 4.9
  }
];

export default function Curriculum({ searchQuery = '' }: { searchQuery?: string }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredCourses = courses.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = activeDifficulty === 'All' || item.difficulty === activeDifficulty;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div id="curriculum-page" className="space-y-8 animate-fade-in">
      
      {/* Intro Banner */}
      <section id="curriculum-intro" className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="px-2.5 py-1 text-[9px] font-bold font-mono rounded-full bg-brand-primary-light text-brand-primary-dark uppercase tracking-wider">CURRICULUM REGISTRY</span>
          <h3 className="text-sm font-bold text-brand-text-dark uppercase tracking-wider font-mono">Enterprise Learning Syllabus Center</h3>
          <p className="text-xs text-brand-text-body">Browse, customize, and allocate target learning pathways to engineering cohorts to proactively eliminate identified skill deficits.</p>
        </div>

        <button 
          onClick={() => showToast('Initiated interactive Curriculum Designer to publish new syllabus templates.')}
          className="px-4 py-2.5 bg-brand-green text-white hover:bg-brand-green-mid text-xs font-bold rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer shrink-0"
        >
          <Plus className="h-3.5 w-3.5 text-brand-primary" />
          <span>Publish Course</span>
        </button>
      </section>

      {/* Filter Controls Panel */}
      <section id="curriculum-filters" className="bg-white border border-brand-border rounded-2xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-bold font-mono text-brand-text-muted uppercase flex items-center">
            <Sliders className="h-3.5 w-3.5 mr-1 text-brand-primary" />
            Filters:
          </span>
          
          {/* Difficulty Toggles */}
          <div className="flex rounded-xl bg-brand-off-white p-1 border border-brand-border">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeDifficulty === diff 
                    ? 'bg-white text-brand-green-mid shadow-sm' 
                    : 'text-brand-text-muted hover:text-brand-text-dark'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Category Select Dropdown */}
          <div className="relative">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-brand-off-white border border-brand-border rounded-xl px-3 py-1.5 text-[10px] font-bold text-brand-text-dark focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-[10px] font-mono font-semibold text-brand-text-muted">
          Showing <strong>{filteredCourses.length}</strong> active course blueprints
        </div>
      </section>

      {/* Course Cards Grid */}
      <section id="curriculum-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((crs) => (
            <div 
              key={crs.id} 
              className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-350 relative overflow-hidden group"
            >
              {/* Category & Rating */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 bg-brand-off-white text-brand-text-muted font-bold font-mono text-[9px] rounded uppercase tracking-wider">
                    {crs.category}
                  </span>

                  <div className="flex items-center space-x-1 font-mono text-[10px] font-bold text-brand-nvidia">
                    <Award className="h-3.5 w-3.5" />
                    <span>{crs.rating} / 5.0</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5 mb-5">
                  <h4 className="text-xs font-black text-brand-text-dark group-hover:text-brand-primary-dark transition-colors">{crs.title}</h4>
                  <p className="text-[11px] text-brand-text-body leading-normal">{crs.description}</p>
                </div>
              </div>

              {/* Skills Tags list */}
              <div className="mb-5 flex flex-wrap gap-1.5">
                {crs.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-2 py-0.5 bg-brand-primary-light text-brand-primary-dark font-semibold font-mono text-[9px] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Metadata details */}
              <div className="pt-4 border-t border-brand-border/60 text-xs text-brand-text-muted space-y-4">
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div>
                    <span className="block uppercase font-semibold text-[8px] text-brand-text-muted">Duration</span>
                    <span className="font-extrabold text-brand-text-dark mt-0.5 block flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-brand-primary" />
                      {crs.duration}
                    </span>
                  </div>

                  <div>
                    <span className="block uppercase font-semibold text-[8px] text-brand-text-muted">Level</span>
                    <span className="font-extrabold text-brand-text-dark mt-0.5 block flex items-center">
                      <Layers className="h-3 w-3 mr-1 text-brand-nvidia" />
                      {crs.difficulty}
                    </span>
                  </div>

                  <div>
                    <span className="block uppercase font-semibold text-[8px] text-brand-text-muted">Students</span>
                    <span className="font-extrabold text-brand-green-mid mt-0.5 block flex items-center">
                      <Users className="h-3 w-3 mr-1 text-brand-green-mid" />
                      {crs.enrolledCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => showToast(`Successfully allocated course "${crs.title}" to target employee groups.`)}
                  className="w-full py-2 border border-brand-border bg-brand-off-white hover:bg-brand-border/30 hover:border-brand-text-muted text-[10px] font-bold text-brand-text-dark rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-brand-primary" />
                  <span>Assign Pathway</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center border-2 border-dashed border-brand-border bg-white rounded-2xl">
            <p className="text-xs font-bold text-brand-text-dark">No course blueprints found matching search filters.</p>
          </div>
        )}
      </section>

      {/* Floating Monospaced Toast Portal */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-text-dark text-white border border-brand-border/60 px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_-6px_rgba(0,0,0,0.15)] flex items-center space-x-3 font-mono text-[10px] animate-fade-in hover:shadow-2xl transition-all duration-300">
          <span className="h-2 w-2 rounded-full bg-brand-nvidia animate-ping shrink-0" />
          <p className="font-semibold">{toast}</p>
        </div>
      )}

    </div>
  );
}
