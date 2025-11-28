import { X, Check, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComparisonItem {
  name: string;
  country: string;
  ranking?: number;
  tuition?: string;
  acceptance?: string;
  programs?: string[];
  type?: 'university' | 'scholarship';
}

interface ComparisonToolProps {
  items: ComparisonItem[];
  onRemove: (index: number) => void;
  onClose: () => void;
}

export function ComparisonTool({ items, onRemove, onClose }: ComparisonToolProps) {
  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">Compare Options</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(300px, 1fr))` }}>
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 relative"
              >
                <button
                  onClick={() => onRemove(index)}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <h3 className="text-xl text-gray-900 mb-2 pr-8">{item.name}</h3>
                <p className="text-gray-600 mb-6">{item.country}</p>

                <div className="space-y-4">
                  {item.ranking && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">World Ranking</div>
                      <div className="text-lg text-gray-900">#{item.ranking}</div>
                    </div>
                  )}
                  {item.tuition && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Annual Tuition</div>
                      <div className="text-lg text-gray-900">{item.tuition}</div>
                    </div>
                  )}
                  {item.acceptance && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Acceptance Rate</div>
                      <div className="text-lg text-gray-900">{item.acceptance}</div>
                    </div>
                  )}
                  {item.programs && (
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Top Programs</div>
                      <div className="flex flex-wrap gap-2">
                        {item.programs.slice(0, 3).map((program, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {items.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-blue-50 rounded-xl p-6"
            >
              <h3 className="text-lg text-gray-900 mb-4">Quick Comparison</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Highest Ranked</div>
                  <div className="text-gray-900">
                    {items.reduce((prev, curr) =>
                      (prev.ranking || Infinity) < (curr.ranking || Infinity) ? prev : curr
                    ).name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Most Affordable</div>
                  <div className="text-gray-900">
                    {items[0]?.name || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Easiest Admission</div>
                  <div className="text-gray-900">
                    {items.reduce((prev, curr) => {
                      const prevRate = parseFloat(prev.acceptance || '100');
                      const currRate = parseFloat(curr.acceptance || '100');
                      return prevRate > currRate ? prev : curr;
                    }).name}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
