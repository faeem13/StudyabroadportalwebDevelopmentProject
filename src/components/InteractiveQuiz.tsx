import { useState } from 'react';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = [
    {
      question: "What is your primary goal for studying abroad?",
      options: [
        "Career advancement",
        "Academic excellence",
        "Cultural experience",
        "Research opportunities"
      ]
    },
    {
      question: "What is your preferred study destination?",
      options: [
        "USA",
        "UK",
        "Canada",
        "Australia"
      ]
    },
    {
      question: "What is your field of interest?",
      options: [
        "Engineering/Technology",
        "Business/Management",
        "Sciences",
        "Arts/Humanities"
      ]
    },
    {
      question: "What is your budget range for annual tuition?",
      options: [
        "Under $20,000",
        "$20,000 - $40,000",
        "$40,000 - $60,000",
        "Above $60,000"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const getRecommendation = () => {
    const destination = answers[1];
    const field = answers[2];
    
    return {
      message: `Based on your preferences, we recommend exploring ${destination} universities with strong ${field} programs.`,
      nextSteps: [
        "Browse our university matcher",
        "Check scholarship opportunities",
        "Review visa requirements",
        "Explore test preparation resources"
      ]
    };
  };

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-md p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Award className="w-10 h-10 text-green-600" />
          </motion.div>
          <h3 className="text-2xl text-gray-900 mb-2">Your Personalized Recommendation</h3>
          <p className="text-gray-600">{recommendation.message}</p>
        </div>

        <div className="mb-8">
          <h4 className="text-gray-900 mb-4">Recommended Next Steps:</h4>
          <div className="space-y-3">
            {recommendation.nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Take Quiz Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl text-gray-900 mb-6">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{option}</span>
                  {selectedAnswer === option && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
