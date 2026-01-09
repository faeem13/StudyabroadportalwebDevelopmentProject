import { FileText, Clock, DollarSign, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function VisaGuide() {
  const [expandedCountry, setExpandedCountry] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const countries = [
    {
      name: 'United States',
      visaType: 'F-1 Student Visa',
      processingTime: '3-5 weeks',
      cost: '$185 (SEVIS fee: $350)',
      documents: [
        'Valid passport',
        'Form I-20 from university',
        'DS-160 confirmation page',
        'SEVIS fee payment receipt',
        'Visa application fee receipt',
        'Passport-sized photographs',
        'Academic transcripts',
        'Financial documents',
        'Test scores (TOEFL/IELTS)',
      ],
      process: [
        'Receive I-20 from university',
        'Pay SEVIS fee online',
        'Complete DS-160 form online',
        'Pay visa application fee',
        'Schedule visa interview',
        'Attend interview at embassy',
        'Wait for visa processing',
      ],
      tips: [
        'Schedule interview early as slots fill quickly',
        'Demonstrate strong ties to home country',
        'Show proof of sufficient funding',
        'Be prepared to explain your study plans',
      ],
    },
    {
      name: 'United Kingdom',
      visaType: 'Student Visa (Tier 4)',
      processingTime: '3 weeks',
      cost: '£363 + healthcare surcharge',
      documents: [
        'Current passport',
        'CAS from university',
        'Proof of English proficiency',
        'Financial evidence (28 days)',
        'TB test certificate',
        'Academic qualifications',
        'Passport photographs',
        'Visa application form',
      ],
      process: [
        'Receive CAS from university',
        'Complete online application',
        'Pay visa fee and healthcare surcharge',
        'Book biometrics appointment',
        'Attend biometrics appointment',
        'Submit documents',
        'Wait for decision',
      ],
      tips: [
        'Ensure funds have been in account for 28 days',
        'Get TB test done at approved clinic',
        'Apply no earlier than 6 months before course',
        'Keep all original documents ready',
      ],
    },
    {
      name: 'Canada',
      visaType: 'Study Permit',
      processingTime: '4-6 weeks (online)',
      cost: 'CAD $150',
      documents: [
        'Valid passport',
        'Letter of acceptance',
        'Proof of financial support',
        'Statement of purpose',
        'Police certificates',
        'Medical exam (if required)',
        'Passport photos',
        'Academic documents',
      ],
      process: [
        'Receive acceptance letter',
        'Create online account',
        'Complete application form',
        'Upload required documents',
        'Pay application fee',
        'Submit biometrics (if required)',
        'Medical exam (if required)',
        'Wait for decision',
      ],
      tips: [
        'Apply online for faster processing',
        'Get police certificates from all countries lived in',
        'Provide detailed study plan',
        'Show proof of ties to home country',
      ],
    },
    {
      name: 'Australia',
      visaType: 'Student Visa (Subclass 500)',
      processingTime: '4-6 weeks',
      cost: 'AUD $650',
      documents: [
        'Valid passport',
        'CoE from institution',
        'Genuine Temporary Entrant statement',
        'Financial evidence',
        'English proficiency proof',
        'Health insurance (OSHC)',
        'Health examination',
        'Character documents',
      ],
      process: [
        'Receive CoE from university',
        'Purchase OSHC',
        'Create ImmiAccount',
        'Complete online application',
        'Upload documents',
        'Health examination',
        'Pay visa fee',
        'Wait for decision',
      ],
      tips: [
        'Write a strong GTE statement',
        'Purchase OSHC before applying',
        'Complete health exam at approved panel',
        'Apply after receiving CoE',
      ],
    },
    {
      name: 'Germany',
      visaType: 'Student Visa (Visum zu Studienzwecken)',
      processingTime: '6-12 weeks',
      cost: '€75',
      documents: [
        'Valid passport',
        'University admission letter',
        'Proof of financial resources (blocked account)',
        'Health insurance',
        'German language proficiency (if required)',
        'Motivation letter',
        'Academic records',
        'CV/Resume',
      ],
      process: [
        'Receive admission letter',
        'Open blocked account (€11,208)',
        'Get health insurance',
        'Schedule appointment at embassy',
        'Complete application form',
        'Attend visa interview',
        'Submit documents',
        'Wait for processing',
      ],
      tips: [
        'Open blocked account well in advance',
        'Book embassy appointment early',
        'Get health insurance that meets requirements',
        'Learn basic German if possible',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">Visa Information Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive visa requirements, application processes, and tips for popular study abroad destinations
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12 rounded-xl overflow-hidden h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1655722725332-9925c96dd627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMHRyYXZlbCUyMHZpc2F8ZW58MXx8fHwxNzY0MzIyMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Passport and visa"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Country Visa Information */}
        <div className="space-y-8">
          {countries.map((country, index) => {
            const isExpanded = expandedCountry === index;
            const countryKey = country.name.replace(/\s/g, '');
            const completed = completedSteps[countryKey] || [];

            const toggleStep = (stepIndex) => {
              const current = completedSteps[countryKey] || [];
              const newCompleted = current.includes(stepIndex)
                ? current.filter(i => i !== stepIndex)
                : [...current, stepIndex];
              setCompletedSteps({ ...completedSteps, [countryKey]: newCompleted });
            };

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 cursor-pointer"
                onClick={() => setExpandedCountry(isExpanded ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl mb-2">{country.name}</h2>
                    <p className="text-blue-100">{country.visaType}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-8 h-8" />
                  </motion.div>
                </div>
                {completed.length > 0 && (
                  <div className="mt-3 text-sm text-blue-100">
                    Progress: {completed.length}/{country.process.length} steps completed
                  </div>
                )}
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
                {/* Key Information */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600">Processing Time</div>
                      <div className="text-gray-900">{country.processingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600">Application Cost</div>
                      <div className="text-gray-900">{country.cost}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <FileText className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600">Documents</div>
                      <div className="text-gray-900">{country.documents.length} required</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Required Documents */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Required Documents
                    </h3>
                    <ul className="space-y-2">
                      {country.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Process */}
                  <div>
                    <h3 className="text-xl text-gray-900 mb-4">Application Process</h3>
                    <div className="space-y-3">
                      {country.process.map((step, idx) => {
                        const isCompleted = completed.includes(idx);
                        return (
                        <motion.div
                          key={idx}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            isCompleted ? 'bg-green-50' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleStep(idx)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                              isCompleted
                                ? 'bg-green-600 text-white'
                                : 'bg-blue-600 text-white'
                            }`}
                            animate={{ scale: isCompleted ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {isCompleted ? '✓' : idx + 1}
                          </motion.div>
                          <span className={`pt-0.5 ${isCompleted ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                            {step}
                          </span>
                        </motion.div>
                      );
                      })}
                    </div>
                  </div>
                </div>

                {/* Important Tips */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-xl text-gray-900">Important Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {country.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-yellow-600">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
          })}
        </div>

        {/* General Tips */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl text-gray-900 mb-6 text-center">General Visa Application Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Apply Early</h3>
              <p className="text-sm text-gray-700">
                Start your visa application process as soon as you receive your admission letter.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Complete Documentation</h3>
              <p className="text-sm text-gray-700">
                Ensure all documents are complete, authentic, and meet the specified requirements.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Be Honest</h3>
              <p className="text-sm text-gray-700">
                Provide truthful information and never submit fake or fraudulent documents.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Track Application</h3>
              <p className="text-sm text-gray-700">
                Monitor your application status regularly and respond promptly to any requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}