import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  education: string;
  targetCountries: string[];
  targetDegree: string;
  savedScholarships: string[];
  savedUniversities: string[];
  profilePicture?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveScholarship: (scholarshipName: string) => void;
  unsaveScholarship: (scholarshipName: string) => void;
  saveUniversity: (universityName: string) => void;
  unsaveUniversity: (universityName: string) => void;
  isScholarshipSaved: (scholarshipName: string) => boolean;
  isUniversitySaved: (universityName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: UserProfile) => u.id === currentUserId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In production, this would be an API call to your MySQL backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
    
    const foundUser = users.find((u: UserProfile) => u.email === email);
    
    if (foundUser && passwords[foundUser.id] === password) {
      setUser(foundUser);
      localStorage.setItem('currentUserId', foundUser.id);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // In production, this would be an API call to your MySQL backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const passwords = JSON.parse(localStorage.getItem('passwords') || '{}');
    
    // Check if user already exists
    if (users.find((u: UserProfile) => u.email === email)) {
      return false;
    }

    const newUser: UserProfile = {
      id: Date.now().toString(),
      email,
      name,
      phone: '',
      country: '',
      dateOfBirth: '',
      education: '',
      targetCountries: [],
      targetDegree: '',
      savedScholarships: [],
      savedUniversities: []
    };

    users.push(newUser);
    passwords[newUser.id] = password;
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('passwords', JSON.stringify(passwords));
    localStorage.setItem('currentUserId', newUser.id);
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUserId');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: UserProfile) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const saveScholarship = (scholarshipName: string) => {
    if (!user) return;
    if (!user.savedScholarships.includes(scholarshipName)) {
      updateProfile({ 
        savedScholarships: [...user.savedScholarships, scholarshipName] 
      });
    }
  };

  const unsaveScholarship = (scholarshipName: string) => {
    if (!user) return;
    updateProfile({ 
      savedScholarships: user.savedScholarships.filter(s => s !== scholarshipName) 
    });
  };

  const saveUniversity = (universityName: string) => {
    if (!user) return;
    if (!user.savedUniversities.includes(universityName)) {
      updateProfile({ 
        savedUniversities: [...user.savedUniversities, universityName] 
      });
    }
  };

  const unsaveUniversity = (universityName: string) => {
    if (!user) return;
    updateProfile({ 
      savedUniversities: user.savedUniversities.filter(u => u !== universityName) 
    });
  };

  const isScholarshipSaved = (scholarshipName: string): boolean => {
    return user?.savedScholarships.includes(scholarshipName) || false;
  };

  const isUniversitySaved = (universityName: string): boolean => {
    return user?.savedUniversities.includes(universityName) || false;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    saveScholarship,
    unsaveScholarship,
    saveUniversity,
    unsaveUniversity,
    isScholarshipSaved,
    isUniversitySaved
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
