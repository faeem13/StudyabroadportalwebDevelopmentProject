import { useState } from 'react';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CostCalculator() {
  const [country, setCountry] = useState('USA');
  const [tuition, setTuition] = useState(50000);
  const [duration, setDuration] = useState(2);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const livingCosts = {
    USA: { monthly: 1500, currency: '$' },
    UK: { monthly: 1200, currency: '£' },
    Canada: { monthly: 1000, currency: 'CAD $' },
    Australia: { monthly: 1400, currency: 'AUD $' },
    Germany: { monthly: 900, currency: '€' },
  };

  const otherCosts = {
    visa: 500,
    insurance: 1200,
    books: 1000,
    travel: 2000,
  };

  const calculateTotal = () => {
    const living = livingCosts[country as keyof typeof livingCosts].monthly * 12 * duration;
    const tuitionTotal = tuition * duration;
    const others = Object.values(otherCosts).reduce((a, b) => a + b, 0) * duration;
    return {
      tuition: tuitionTotal,
      living,
      others,
      total: tuitionTotal + living + others,
    };
  };

  const costs = calculateTotal();

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl text-gray-900">Cost Calculator</h2>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Select Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Annual Tuition: {livingCosts[country as keyof typeof livingCosts].currency}{tuition.toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={tuition}
            onChange={(e) => setTuition(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10K</span>
            <span>100K</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Program Duration: {duration} {duration === 1 ? 'year' : 'years'}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 year</span>
            <span>5 years</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={costs.total}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6"
      >
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 mb-1">Total Estimated Cost</div>
          <motion.div
            className="text-4xl text-gray-900"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {livingCosts[country as keyof typeof livingCosts].currency}
            {costs.total.toLocaleString()}
          </motion.div>
        </div>

        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {showBreakdown ? 'Hide' : 'Show'} Cost Breakdown
        </button>
      </motion.div>

      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            <CostBar
              label="Tuition Fees"
              amount={costs.tuition}
              percentage={(costs.tuition / costs.total) * 100}
              currency={livingCosts[country as keyof typeof livingCosts].currency}
              color="bg-blue-600"
            />
            <CostBar
              label="Living Expenses"
              amount={costs.living}
              percentage={(costs.living / costs.total) * 100}
              currency={livingCosts[country as keyof typeof livingCosts].currency}
              color="bg-green-600"
            />
            <CostBar
              label="Other Costs"
              amount={costs.others}
              percentage={(costs.others / costs.total) * 100}
              currency={livingCosts[country as keyof typeof livingCosts].currency}
              color="bg-purple-600"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CostBar({ label, amount, percentage, currency, color }: {
  label: string;
  amount: number;
  percentage: number;
  currency: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{label}</span>
        <span>{currency}{amount.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total</div>
    </div>
  );
}
