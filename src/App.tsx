import { useState } from 'react';
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
import Settings from './pages/Settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');

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
      case 'settings':
        return 'Control & Organization Settings';
      default:
        return 'Platform Control';
    }
  };

  const renderActivePage = (tab: NavItemKey) => {
    switch (tab) {
      case 'overview':
        return <Overview setTab={setCurrentTab} />;
      case 'learning-engine':
        return <AdaptiveLearning />;
      case 'skill-mapping':
        return <SkillMapping />;
      case 'analytics':
        return <Analytics />;
      case 'infrastructure':
        return <Infrastructure />;
      case 'integrations':
        return <Integrations />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview setTab={setCurrentTab} />;
    }
  };

  return (
    <div id="skillora-root-container" className="min-h-screen bg-brand-off-white flex text-brand-text-dark font-sans selection:bg-brand-primary-light selection:text-brand-primary-dark antialiased">
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} setTab={setCurrentTab} />

      {/* Main Layout Area */}
      <div id="main-content-wrapper" className="flex-1 pl-72 min-h-screen flex flex-col">
        {/* Top Header Widget */}
        <Header title={getPageTitle(currentTab)} />

        {/* Dynamic Route Container Box */}
        <main id="main-viewport" className="flex-grow p-8 max-w-7xl w-full mx-auto relative focus:outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderActivePage(currentTab)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
