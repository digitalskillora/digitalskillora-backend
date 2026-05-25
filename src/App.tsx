import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar, { NavItemKey } from './components/dashboard/Sidebar';
import Header from './components/dashboard/Header';

// Page Imports
import Overview from './pages/Overview';
import AdaptiveLearning from './pages/AdaptiveLearning';
import SkillMapping from './pages/SkillMapping';
import Analytics from './pages/Analytics';
import Infrastructure from './pages/Infrastructure';
import Integrations from './pages/Integrations';
import Curriculum from './pages/Curriculum';
import Credentials from './pages/Credentials';
import Settings from './pages/Settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically restore scroll coordinates to the top when switching pages
  useEffect(() => {
    const viewport = document.getElementById('main-viewport');
    if (viewport) {
      viewport.scrollTop = 0;
    }
  }, [currentTab]);

  const getPageTitle = (tab: NavItemKey): string => {
    switch (tab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'learning-engine':
        return 'Adaptive Learning Engine';
      case 'skill-mapping':
        return 'Workforce Skill Mapping';
      case 'analytics':
        return 'Platform Analytics Dashboard';
      case 'infrastructure':
        return 'Enterprise Infrastructure Health';
      case 'integrations':
        return 'Integrations & Connectors Hub';
      case 'curriculum':
        return 'Enterprise Curriculum Registry';
      case 'credentials':
        return 'Compliance & Credential Center';
      case 'settings':
        return 'Control & Organization Settings';
      default:
        return 'Platform Control';
    }
  };

  const renderActivePage = (tab: NavItemKey, query: string) => {
    switch (tab) {
      case 'overview':
        return <Overview setTab={setCurrentTab} searchQuery={query} />;
      case 'learning-engine':
        return <AdaptiveLearning searchQuery={query} />;
      case 'skill-mapping':
        return <SkillMapping searchQuery={query} />;
      case 'analytics':
        return <Analytics searchQuery={query} />;
      case 'infrastructure':
        return <Infrastructure searchQuery={query} />;
      case 'integrations':
        return <Integrations searchQuery={query} />;
      case 'curriculum':
        return <Curriculum searchQuery={query} />;
      case 'credentials':
        return <Credentials searchQuery={query} />;
      case 'settings':
        return <Settings searchQuery={query} />;
      default:
        return <Overview setTab={setCurrentTab} searchQuery={query} />;
    }
  };

  return (
    <div id="skillora-root-container" className="h-screen bg-brand-off-white flex text-brand-text-dark font-sans selection:bg-brand-primary-light selection:text-brand-primary-dark antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} setTab={setCurrentTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Layout Area */}
      <div id="main-content-wrapper" className="flex-1 lg:pl-72 h-screen flex flex-col w-full overflow-hidden">
        {/* Top Header Widget */}
        <Header 
          title={getPageTitle(currentTab)} 
          onMenuClick={() => setSidebarOpen(true)} 
          onSearch={(term) => setSearchQuery(term)} 
          onNavigate={setCurrentTab}
        />

        {/* Dynamic Route Container Box */}
        <main id="main-viewport" className="flex-grow p-4 md:p-8 max-w-7xl w-full mx-auto relative focus:outline-none overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderActivePage(currentTab, searchQuery)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
