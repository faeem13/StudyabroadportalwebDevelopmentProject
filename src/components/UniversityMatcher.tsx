import { useState } from 'react';
import { Search, MapPin, DollarSign, Star, BookOpen, Users, Heart, GitCompare } from 'lucide-react';
import { ComparisonTool } from './ComparisonTool';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export function UniversityMatcher() {
  const { user, saveUniversity, unsaveUniversity, isUniversitySaved } = useAuth();
  const [filters, setFilters] = useState({
    country: '',
    field: '',
    budget: '',
    ranking: '',
  });
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const universities = [
    {
      name: 'Massachusetts Institute of Technology',
      country: 'USA',
      location: 'Cambridge, MA',
      ranking: 1,
      tuition: '$55,000 - $60,000/year',
      programs: ['Engineering', 'Computer Science', 'Business', 'Sciences'],
      acceptance: '7%',
      students: '11,500+',
      highlights: ['World-class research facilities', 'Strong industry connections', 'Innovation hub'],
    },
    {
      name: 'University of Oxford',
      country: 'UK',
      location: 'Oxford, England',
      ranking: 2,
      tuition: '£25,000 - £40,000/year',
      programs: ['Humanities', 'Medicine', 'Sciences', 'Law'],
      acceptance: '17%',
      students: '24,000+',
      highlights: ['Historic institution', 'Tutorial system', 'Extensive library resources'],
    },
    {
      name: 'Stanford University',
      country: 'USA',
      location: 'Stanford, CA',
      ranking: 3,
      tuition: '$56,000 - $62,000/year',
      programs: ['Engineering', 'Business', 'Medicine', 'Computer Science'],
      acceptance: '4%',
      students: '17,000+',
      highlights: ['Silicon Valley location', 'Entrepreneurship culture', 'Top faculty'],
    },
    {
      name: 'University of Toronto',
      country: 'Canada',
      location: 'Toronto, ON',
      ranking: 21,
      tuition: 'CAD $45,000 - $55,000/year',
      programs: ['Engineering', 'Business', 'Medicine', 'Computer Science'],
      acceptance: '43%',
      students: '90,000+',
      highlights: ['Diverse student body', 'Research-intensive', 'Urban campus'],
    },
    {
      name: 'National University of Singapore',
      country: 'Singapore',
      location: 'Singapore',
      ranking: 11,
      tuition: 'SGD $30,000 - $40,000/year',
      programs: ['Engineering', 'Business', 'Computer Science', 'Sciences'],
      acceptance: '5%',
      students: '40,000+',
      highlights: ['Asian hub', 'Strong employment outcomes', 'Modern facilities'],
    },
    {
      name: 'University of Melbourne',
      country: 'Australia',
      location: 'Melbourne, VIC',
      ranking: 14,
      tuition: 'AUD $35,000 - $50,000/year',
      programs: ['Medicine', 'Engineering', 'Law', 'Business'],
      acceptance: '70%',
      students: '50,000+',
      highlights: ['Graduate employability', 'Quality of life', 'Research excellence'],
    },
  ];

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Germany'];
  const fields = ['Engineering', 'Computer Science', 'Business', 'Medicine', 'Sciences', 'Humanities', 'Law'];

  const filteredUniversities = universities.filter((uni) => {
    if (filters.country && uni.country !== filters.country) return false;
    if (filters.field && !uni.programs.includes(filters.field)) return false;
    return true;
  });

  const toggleCompare = (uni) => {
    const isInList = compareList.some((u) => u.name === uni.name);
    if (isInList) {
      setCompareList(compareList.filter((u) => u.name !== uni.name));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, { ...uni, type: 'university' }]);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <AnimatePresence>
        {showComparison && (
          <ComparisonTool
            items={compareList}
            onRemove={(index) => setCompareList(compareList.filter((_, i) => i !== index))}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">University Matcher</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect university based on your profile, preferences, and goals
          </p>
        </div>

        {/* Compare Bar */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-4 z-40 bg-white rounded-xl shadow-xl p-4 max-w-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900">Compare List ({compareList.length}/4)</h3>
                <button
                  onClick={() => setCompareList([])}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2 mb-3">
                {compareList.map((uni, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700 truncate">{uni.name}</span>
                    <button
                      onClick={() => toggleCompare(uni)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowComparison(true)}
                disabled={compareList.length < 2}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Compare Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl text-gray-900">Filter Universities</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
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
              <label className="block text-sm text-gray-700 mb-2">Field of Study</label>
              <select
                value={filters.field}
                onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Fields</option>
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Budget Range</label>
              <select
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Budget</option>
                <option value="low">Under $30,000</option>
                <option value="medium">$30,000 - $50,000</option>
                <option value="high">$50,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Ranking</label>
              <select
                value={filters.ranking}
                onChange={(e) => setFilters({ ...filters, ranking: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Ranking</option>
                <option value="top10">Top 10</option>
                <option value="top50">Top 50</option>
                <option value="top100">Top 100</option>
              </select>
            </div>
          </div>
        </div>

        {/* University Cards */}
        <div className="space-y-6">
          {filteredUniversities.map((uni, index) => {
            const isSaved = isUniversitySaved(uni.name);
            const isComparing = compareList.some((u) => u.name === uni.name);

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl text-gray-900 mb-2">{uni.name}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{uni.location}, {uni.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Rank #{uni.ranking}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Acceptance Rate</div>
                      <div className="text-2xl text-blue-600">{uni.acceptance}</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Annual Tuition</div>
                      <div className="text-gray-900">{uni.tuition}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Popular Programs</div>
                      <div className="text-gray-900">{uni.programs.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Student Population</div>
                      <div className="text-gray-900">{uni.students}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Key Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {uni.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 flex-wrap">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <motion.button
                    onClick={() => toggleCompare(uni)}
                    className={`px-6 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                      isComparing
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GitCompare className="w-4 h-4" />
                    {isComparing ? 'Remove from Compare' : 'Compare'}
                  </motion.button>
                  <motion.button
                    onClick={() => isSaved ? unsaveUniversity(uni.name) : saveUniversity(uni.name)}
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
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </div>
    </div>
  );
}