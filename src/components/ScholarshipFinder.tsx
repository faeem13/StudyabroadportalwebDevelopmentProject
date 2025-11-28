import { useState } from 'react';
import { Award, DollarSign, Calendar, Users, CheckCircle, Search, Heart, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface ScholarshipFinderProps {
  savedItems: { universities: any[]; scholarships: any[] };
  setSavedItems: (items: any) => void;
}

export function ScholarshipFinder({ savedItems, setSavedItems }: ScholarshipFinderProps) {
  const [filters, setFilters] = useState({
    country: '',
    level: '',
    type: '',
  });

  const scholarships = [
    {
      name: 'Fulbright Foreign Student Program',
      country: 'USA',
      amount: 'Full funding',
      level: 'Masters/PhD',
      type: 'Merit-based',
      deadline: 'October 2025',
      coverage: ['Tuition', 'Living expenses', 'Health insurance', 'Airfare'],
      eligibility: ['Outstanding academic record', 'Leadership potential', 'English proficiency', 'Bachelor\'s degree'],
      description: 'Prestigious scholarship for international students to pursue graduate studies in the USA.',
    },
    {
      name: 'Chevening Scholarships',
      country: 'UK',
      amount: 'Full funding',
      level: 'Masters',
      type: 'Merit-based',
      deadline: 'November 2025',
      coverage: ['Tuition fees', 'Monthly stipend', 'Travel costs', 'Visa fees'],
      eligibility: ['2+ years work experience', 'Strong academic background', 'Leadership qualities', 'Return to home country'],
      description: 'UK government scholarship for future leaders and influencers.',
    },
    {
      name: 'DAAD Scholarships',
      country: 'Germany',
      amount: '€850 - €1,200/month',
      level: 'Masters/PhD',
      type: 'Merit-based',
      deadline: 'Various deadlines',
      coverage: ['Monthly stipend', 'Health insurance', 'Travel allowance', 'German course'],
      eligibility: ['Bachelor\'s degree', 'Good academic performance', 'German or English proficiency', 'Research proposal for PhD'],
      description: 'Comprehensive scholarship program by German Academic Exchange Service.',
    },
    {
      name: 'Australia Awards Scholarships',
      country: 'Australia',
      amount: 'Full funding',
      level: 'Masters/PhD',
      type: 'Merit-based',
      deadline: 'April 2025',
      coverage: ['Full tuition', 'Living allowance', 'Health cover', 'Return airfare'],
      eligibility: ['From eligible countries', 'Minimum 2 years work experience', 'Academic excellence', 'Development goals'],
      description: 'Australian government scholarships for students from developing countries.',
    },
    {
      name: 'Vanier Canada Graduate Scholarships',
      country: 'Canada',
      amount: 'CAD $50,000/year for 3 years',
      level: 'PhD',
      type: 'Merit-based',
      deadline: 'November 2025',
      coverage: ['Doctoral research funding', 'No tuition coverage'],
      eligibility: ['Nominated by Canadian institution', 'Outstanding research potential', 'Leadership skills', 'PhD program'],
      description: 'Prestigious doctoral scholarship to attract top-tier students to Canada.',
    },
    {
      name: 'Erasmus Mundus Joint Masters',
      country: 'Europe (Multiple)',
      amount: '€1,400/month + tuition',
      level: 'Masters',
      type: 'Merit-based',
      deadline: 'January 2025',
      coverage: ['Tuition fees', 'Monthly allowance', 'Travel costs', 'Installation costs'],
      eligibility: ['Bachelor\'s degree', 'Academic excellence', 'Study in multiple EU countries', 'Language requirements'],
      description: 'Study a joint master\'s program across multiple European universities.',
    },
  ];

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Europe (Multiple)'];
  const levels = ['Masters', 'PhD', 'Masters/PhD'];
  const types = ['Merit-based', 'Need-based', 'Research'];

  const filteredScholarships = scholarships.filter((scholarship) => {
    if (filters.country && scholarship.country !== filters.country) return false;
    if (filters.level && !scholarship.level.includes(filters.level)) return false;
    if (filters.type && scholarship.type !== filters.type) return false;
    return true;
  });

  const toggleSave = (scholarship: any) => {
    const isSaved = savedItems.scholarships.some((s) => s.name === scholarship.name);
    if (isSaved) {
      setSavedItems({
        ...savedItems,
        scholarships: savedItems.scholarships.filter((s) => s.name !== scholarship.name),
      });
    } else {
      setSavedItems({
        ...savedItems,
        scholarships: [...savedItems.scholarships, scholarship],
      });
    }
  };

  const [reminders, setReminders] = useState<string[]>([]);

  const toggleReminder = (name: string) => {
    if (reminders.includes(name)) {
      setReminders(reminders.filter((r) => r !== name));
    } else {
      setReminders([...reminders, name]);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Scholarship Finder</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover funding opportunities from around the world to make your study abroad dreams a reality
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl text-gray-900">Filter Scholarships</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Study Level</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="space-y-6">
          {filteredScholarships.map((scholarship, index) => {
            const isSaved = savedItems.scholarships.some((s) => s.name === scholarship.name);
            const hasReminder = reminders.includes(scholarship.name);

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl text-white mb-2">{scholarship.name}</h2>
                    <p className="text-yellow-50">{scholarship.description}</p>
                  </div>
                  <Award className="w-12 h-12 text-white flex-shrink-0" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Amount</div>
                      <div className="text-gray-900">{scholarship.amount}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Level</div>
                      <div className="text-gray-900">{scholarship.level}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="text-gray-900">{scholarship.type}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Deadline</div>
                      <div className="text-gray-900">{scholarship.deadline}</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-900 mb-3">Coverage Includes</h3>
                    <ul className="space-y-2">
                      {scholarship.coverage.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      {scholarship.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 flex-wrap">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                  <motion.button
                    onClick={() => toggleSave(scholarship)}
                    className={`px-6 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                      isSaved
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </motion.button>
                  <motion.button
                    onClick={() => toggleReminder(scholarship.name)}
                    className={`px-6 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                      hasReminder
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className={`w-4 h-4 ${hasReminder ? 'fill-current' : ''}`} />
                    {hasReminder ? 'Reminder Set' : 'Set Reminder'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl text-gray-900 mb-6 text-center">Scholarship Application Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Start Early</h3>
              <p className="text-gray-700">
                Begin your scholarship search and application process at least 12-18 months before your intended start date. Many scholarships have early deadlines.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Strong Application</h3>
              <p className="text-gray-700">
                Craft compelling personal statements, secure strong recommendation letters, and highlight your unique experiences and achievements.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Apply Broadly</h3>
              <p className="text-gray-700">
                Don't limit yourself to one scholarship. Apply to multiple opportunities to increase your chances of securing funding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
