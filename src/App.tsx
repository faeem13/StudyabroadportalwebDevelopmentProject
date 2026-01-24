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
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth();

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
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={logout}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
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
            <UniversityMatcher />
          )}
          {activeSection === 'scholarships' && (
            <ScholarshipFinder />
          )}
          {activeSection === 'visa' && <VisaGuide />}
          {activeSection === 'jobs' && <JobProspects />}
          {activeSection === 'profile' && user && <UserProfile />}
        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}