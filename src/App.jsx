import { useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { TestPreparation } from './components/TestPreparation';
import { UniversityMatcher } from './components/UniversityMatcher';
import { ScholarshipFinder } from './components/ScholarshipFinder';
import { VisaGuide } from './components/VisaGuide';
import { JobProspects } from './components/JobProspects';
import { PreparationTips } from './components/PreparationTips';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [savedItems, setSavedItems] = useState({
    universities: [],
    scholarships: [],
  });
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
      
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
          {activeSection === 'preparation' && <PreparationTips />}
          {activeSection === 'tests' && <TestPreparation />}
          {activeSection === 'universities' && (
            <UniversityMatcher savedItems={savedItems} setSavedItems={setSavedItems} />
          )}
          {activeSection === 'scholarships' && (
            <ScholarshipFinder savedItems={savedItems} setSavedItems={setSavedItems} />
          )}
          {activeSection === 'visa' && <VisaGuide />}
          {activeSection === 'jobs' && <JobProspects />}
        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}
