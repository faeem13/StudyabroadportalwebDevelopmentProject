import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: { name: string; email: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Navigation({ activeSection, setActiveSection, user, onLoginClick, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'preparation', label: 'Preparation Tips' },
    { id: 'tests', label: 'Test Prep' },
    { id: 'universities', label: 'Universities' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'visa', label: 'Visa Guide' },
    { id: 'jobs', label: 'Job Prospects' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl text-gray-900">Study Abroad Portal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Saved Items
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </button>
                    <div className="border-t border-gray-200 mt-2">
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.button
                onClick={onLoginClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Login/User */}
            <div className="mt-4 px-4">
              {user ? (
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
