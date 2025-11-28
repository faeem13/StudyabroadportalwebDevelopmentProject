import { TrendingUp, Briefcase, DollarSign, Clock, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function JobProspects() {
  const countries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      workPermit: 'OPT (1 year) + STEM Extension (2 years)',
      averageSalary: '$60,000 - $120,000',
      topIndustries: ['Technology', 'Healthcare', 'Finance', 'Engineering'],
      jobMarket: 'Strong',
      prospects: [
        'Optional Practical Training allows 12 months of work',
        'STEM graduates can extend to 3 years total',
        'H1-B visa pathway for long-term employment',
        'Competitive salaries across industries',
        'Strong startup ecosystem',
      ],
      challenges: [
        'H1-B visa lottery system is competitive',
        'Work authorization tied to employer',
        'High cost of living in major cities',
      ],
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      workPermit: 'Graduate Route (2-3 years)',
      averageSalary: '£25,000 - £50,000',
      topIndustries: ['Finance', 'Technology', 'Consulting', 'Healthcare'],
      jobMarket: 'Good',
      prospects: [
        'Graduate visa allows 2 years of work (3 for PhD)',
        'No sponsorship needed for initial 2 years',
        'Strong financial services sector',
        'Path to Skilled Worker visa',
        'Access to European markets',
      ],
      challenges: [
        'Brexit impact on EU market access',
        'Skilled Worker visa requires sponsorship',
        'Minimum salary requirements for visa',
      ],
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      workPermit: 'PGWP (up to 3 years)',
      averageSalary: 'CAD $45,000 - $85,000',
      topIndustries: ['Technology', 'Healthcare', 'Engineering', 'Natural Resources'],
      jobMarket: 'Excellent',
      prospects: [
        'Post-Graduation Work Permit up to 3 years',
        'Clear pathway to permanent residence',
        'Express Entry system favors graduates',
        'Growing tech sector (especially Toronto, Vancouver)',
        'Provincial Nominee Programs available',
      ],
      challenges: [
        'Cold climate in many regions',
        'Competition in major cities',
        'Some industries require Canadian credentials',
      ],
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      workPermit: 'Temporary Graduate Visa (2-4 years)',
      averageSalary: 'AUD $60,000 - $95,000',
      topIndustries: ['Mining', 'Healthcare', 'Technology', 'Construction'],
      jobMarket: 'Strong',
      prospects: [
        'Temporary Graduate visa for 2-4 years',
        'Points-based system for permanent residence',
        'Strong demand in healthcare and engineering',
        'High minimum wage and good work-life balance',
        'Regional opportunities with extra benefits',
      ],
      challenges: [
        'Geographic isolation from other markets',
        'High cost of living in major cities',
        'Skills assessment required for PR',
      ],
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      workPermit: 'Job Search Visa (18 months)',
      averageSalary: '€45,000 - €70,000',
      topIndustries: ['Engineering', 'Automotive', 'Technology', 'Manufacturing'],
      jobMarket: 'Good',
      prospects: [
        '18-month job search visa after graduation',
        'EU Blue Card for highly skilled workers',
        'Strong engineering and manufacturing sector',
        'No tuition fees at public universities',
        'Path to permanent residence after 4 years',
      ],
      challenges: [
        'German language often required for work',
        'Bureaucratic processes',
        'Lower salaries compared to US/UK in some fields',
      ],
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      workPermit: 'Orientation Year (1 year)',
      averageSalary: '€35,000 - €60,000',
      topIndustries: ['Technology', 'Finance', 'Logistics', 'Agriculture'],
      jobMarket: 'Good',
      prospects: [
        'One-year search visa after graduation',
        'English widely spoken in workplace',
        'Strong international business presence',
        '30% tax ruling for skilled migrants',
        'High quality of life',
      ],
      challenges: [
        'Competitive job market in major cities',
        'Dutch language beneficial for integration',
        'High housing costs in Amsterdam',
      ],
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      workPermit: 'Employment Pass / S Pass',
      averageSalary: 'SGD $50,000 - $90,000',
      topIndustries: ['Finance', 'Technology', 'Biotech', 'Logistics'],
      jobMarket: 'Competitive',
      prospects: [
        'Strategic location in Asia-Pacific',
        'Tax-friendly environment',
        'Strong financial and tech sectors',
        'English as business language',
        'High standard of living',
      ],
      challenges: [
        'No automatic post-study work visa',
        'Requires job offer before visa',
        'High cost of living',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Job Prospects by Country</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore post-graduation employment opportunities, work permits, and career prospects in popular study destinations
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-xl overflow-hidden h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758610702484-b5126b2b50ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBncmFkdWF0aW9ufGVufDF8fHx8MTc2NDM0MjAxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Graduation celebration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Country Cards */}
        <div className="space-y-8">
          {countries.map((country, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{country.flag}</span>
                    <div>
                      <h2 className="text-3xl mb-1">{country.name}</h2>
                      <p className="text-green-100">Job Market: {country.jobMarket}</p>
                    </div>
                  </div>
                  <div className="hidden md:block text-right">
                    <div className="text-sm text-green-100">Average Salary</div>
                    <div className="text-2xl">{country.averageSalary}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Key Information */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Post-Study Work</div>
                      <div className="text-gray-900">{country.workPermit}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg md:hidden">
                    <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Average Salary</div>
                      <div className="text-gray-900">{country.averageSalary}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg md:col-span-2">
                    <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Top Industries</div>
                      <div className="text-gray-900">{country.topIndustries.join(', ')}</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Career Prospects */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Career Prospects
                    </h3>
                    <ul className="space-y-3">
                      {country.prospects.map((prospect, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                          <Award className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{prospect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4">Challenges to Consider</h3>
                    <ul className="space-y-3">
                      {country.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                          <span className="text-orange-500 text-xl flex-shrink-0">⚠️</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl text-gray-900 mb-6 text-center">Maximizing Your Job Prospects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">During Studies</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Pursue internships and co-op programs</li>
                <li>• Build a professional network</li>
                <li>• Develop in-demand skills</li>
                <li>• Attend career fairs and events</li>
                <li>• Join professional associations</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Job Search Strategy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Leverage university career services</li>
                <li>• Use LinkedIn effectively</li>
                <li>• Tailor resume to local standards</li>
                <li>• Apply for jobs 3-6 months before graduation</li>
                <li>• Prepare for technical interviews</li>
              </ul>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <h3 className="text-xl text-gray-900 mb-3">Long-term Planning</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Understand visa requirements</li>
                <li>• Research permanent residence pathways</li>
                <li>• Consider industry certifications</li>
                <li>• Plan for tax obligations</li>
                <li>• Build emergency savings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
