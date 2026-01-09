import { BookOpen, Clock, CheckCircle, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TestPreparation() {
  const [expandedTest, setExpandedTest] = useState(0);
  const tests = [
    {
      name: 'IELTS',
      fullName: 'International English Language Testing System',
      duration: '2 hours 45 minutes',
      sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
      score: 'Band 0-9',
      validity: '2 years',
      tips: [
        'Practice with authentic IELTS materials',
        'Focus on time management in each section',
        'Record yourself speaking to identify weaknesses',
        'Read academic articles and newspapers daily',
        'Practice writing Task 1 and Task 2 essays regularly',
      ],
      resources: [
        'Official IELTS practice materials',
        'British Council IELTS prep',
        'Cambridge IELTS series (Books 1-18)',
        'IELTS Liz (free online resources)',
      ],
    },
    {
      name: 'TOEFL',
      fullName: 'Test of English as a Foreign Language',
      duration: '3 hours',
      sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
      score: '0-120 points',
      validity: '2 years',
      tips: [
        'Familiarize yourself with the computer-based format',
        'Practice integrated tasks (combining multiple skills)',
        'Build stamina for the 3-hour test',
        'Take full-length practice tests under timed conditions',
        'Master note-taking techniques for listening and reading',
      ],
      resources: [
        'ETS Official TOEFL Guide',
        'TOEFL iBT Practice Sets',
        'Magoosh TOEFL Prep',
        'TST Prep TOEFL resources',
      ],
    },
    {
      name: 'GRE',
      fullName: 'Graduate Record Examination',
      duration: '3 hours 45 minutes',
      sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
      score: 'Verbal: 130-170, Quant: 130-170, Writing: 0-6',
      validity: '5 years',
      tips: [
        'Build a strong vocabulary (use flashcards)',
        'Practice quantitative reasoning problems daily',
        'Analyze sample essays to understand scoring criteria',
        'Take adaptive practice tests to simulate exam conditions',
        'Focus on both speed and accuracy',
      ],
      resources: [
        'ETS Official GRE Guide',
        'Manhattan Prep GRE series',
        'Magoosh GRE Prep',
        'Gregmat (online prep course)',
      ],
    },
    {
      name: 'PTE',
      fullName: 'Pearson Test of English Academic',
      duration: '2 hours',
      sections: ['Speaking & Writing', 'Reading', 'Listening'],
      score: '10-90 points',
      validity: '2 years',
      tips: [
        'Get comfortable with computer-based testing',
        'Practice speaking into a microphone clearly',
        'Master the unique PTE question types',
        'Use official PTE scored practice tests',
        'Focus on pronunciation and fluency for speaking',
      ],
      resources: [
        'Pearson Official Practice',
        'PTE Academic Testbuilder',
        'E2Language PTE',
        'APEUni practice platform',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Test Preparation Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources and tips for IELTS, TOEFL, GRE, and PTE to help you achieve your target score
          </p>
        </div>

        {/* Test Cards */}
        <div className="space-y-8">
          {tests.map((test, index) => {
            const isExpanded = expandedTest === index;
            
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 cursor-pointer"
                onClick={() => setExpandedTest(isExpanded ? null : index)}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-3xl mb-2">{test.name}</h2>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <p className="text-blue-100">{test.fullName}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span>{test.validity} validity</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Test Structure */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Test Structure
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Sections:</span>
                        <span className="text-gray-900">{test.sections.join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Score Range:</span>
                        <span className="text-gray-900">{test.score}</span>
                      </div>
                    </div>

                    <h3 className="text-xl text-gray-900 mb-4">Recommended Resources</h3>
                    <ul className="space-y-2">
                      {test.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preparation Tips */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4">Preparation Tips</h3>
                    <ul className="space-y-3">
                      {test.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
          })}
        </div>

        {/* General Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl text-gray-900 mb-6 text-center">General Test-Taking Strategies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Before the Test</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Start preparation 3-6 months in advance</li>
                <li>• Take diagnostic tests to identify weaknesses</li>
                <li>• Create a structured study schedule</li>
                <li>• Join study groups or online communities</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">During the Test</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Read instructions carefully</li>
                <li>• Manage time effectively for each section</li>
                <li>• Don't spend too long on difficult questions</li>
                <li>• Stay calm and focused throughout</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">After the Test</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Review your performance honestly</li>
                <li>• Identify areas for improvement</li>
                <li>• Consider retaking if needed</li>
                <li>• Send scores to universities promptly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}