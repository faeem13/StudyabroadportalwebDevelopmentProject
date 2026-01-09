import { ArrowRight, Globe, BookOpen, Award, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useState } from 'react';

export function Hero({ setActiveSection }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: BookOpen,
      title: 'Test Preparation',
      description: 'Comprehensive guides for IELTS, GRE, TOEFL and more',
      action: 'tests',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'University Matching',
      description: 'Find the perfect university for your profile',
      action: 'universities',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Scholarships',
      description: 'Discover funding opportunities worldwide',
      action: 'scholarships',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Briefcase,
      title: 'Job Prospects',
      description: 'Explore career opportunities by country',
      action: 'jobs',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { value: 150, label: 'Countries Covered', suffix: '+' },
    { value: 5000, label: 'Universities', suffix: '+' },
    { value: 10000, label: 'Scholarships', suffix: '+' },
    { value: 24, label: 'Support', suffix: '/7' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwYWJyb2FkJTIwY2FtcHVzfGVufDF8fHx8MTc2NDMyNzc3OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Students studying abroad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1 
              className="text-5xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Journey to Study Abroad Starts Here
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Complete guidance for international education - from test prep to landing your dream job
            </motion.p>
            <motion.button
              onClick={() => setActiveSection('preparation')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <span className="text-xl">→</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl text-gray-900 mb-4">Everything You Need in One Place</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From preparation to placement, we guide you through every step of your study abroad journey
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setActiveSection(feature.action)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer border border-gray-100 relative overflow-hidden"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0`}
                animate={{ opacity: hoveredCard === index ? 0.05 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <motion.span 
                className="text-blue-600 flex items-center gap-1"
                animate={{ gap: hoveredCard === index ? '0.5rem' : '0.25rem' }}
                transition={{ duration: 0.3 }}
              >
                Explore <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-4xl mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);

  useState(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  });

  return <>{count.toLocaleString()}{suffix}</>;
}
