import { BookOpen, Lightbulb, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { InteractiveQuiz } from './InteractiveQuiz';
import { CostCalculator } from './CostCalculator';
import { motion } from 'motion/react';

export function PreparationTips() {
  const skillTips = [
    {
      category: 'Academic Skills',
      icon: BookOpen,
      tips: [
        'Develop strong writing skills for essays and research papers',
        'Improve critical thinking and analytical abilities',
        'Practice time management and organizational skills',
        'Enhance presentation and public speaking abilities',
      ],
    },
    {
      category: 'Research Preparation',
      icon: Target,
      tips: [
        'Read extensively in your field of interest',
        'Learn to use academic databases and research tools',
        'Understand citation formats (APA, MLA, Chicago)',
        'Develop a research question and methodology',
      ],
    },
    {
      category: 'Language Proficiency',
      icon: TrendingUp,
      tips: [
        'Practice English daily through reading and listening',
        'Join language exchange programs or conversation groups',
        'Watch academic lectures and take notes',
        'Write essays on diverse topics regularly',
      ],
    },
    {
      category: 'Professional Development',
      icon: Lightbulb,
      tips: [
        'Build a strong LinkedIn profile',
        'Gain relevant internship or work experience',
        'Develop technical skills relevant to your field',
        'Network with professionals and alumni',
      ],
    },
  ];

  const timeline = [
    { phase: '12-18 Months Before', tasks: ['Research universities and programs', 'Start test preparation', 'Build academic profile'] },
    { phase: '9-12 Months Before', tasks: ['Take standardized tests', 'Request recommendation letters', 'Draft personal statement'] },
    { phase: '6-9 Months Before', tasks: ['Complete applications', 'Apply for scholarships', 'Prepare financial documents'] },
    { phase: '3-6 Months Before', tasks: ['Accept admission offer', 'Apply for visa', 'Arrange accommodation'] },
    { phase: '1-3 Months Before', tasks: ['Book flights', 'Attend pre-departure sessions', 'Pack and prepare'] },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Skill & Research Preparation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prepare yourself for success with our comprehensive guide to developing essential skills and research capabilities
          </p>
        </div>

        {/* Interactive Quiz */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl text-gray-900 mb-4">Find Your Perfect Study Path</h2>
            <p className="text-gray-600">Take our interactive quiz to get personalized recommendations</p>
          </motion.div>
          <InteractiveQuiz />
        </div>

        {/* Cost Calculator */}
        <div className="mb-16">
          <CostCalculator />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillTips.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl text-gray-900">{section.category}</h2>
              </div>
              <ul className="space-y-3">
                {section.tips.map((tip, tipIndex) => (
                  <motion.li
                    key={tipIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: tipIndex * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl text-gray-900 mb-8 text-center">Preparation Timeline</h2>
          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl text-gray-900 mb-3">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
