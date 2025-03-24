import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { modelComparisonData } from '@/lib/visualizationData';
import DataVisualization from './DataVisualization';

const keyTerms = [
  { name: "Clickbait", value: 90 },
  { name: "Sensationalism", value: 85 },
  { name: "Exaggeration", value: 78 },
  { name: "Political Bias", value: 72 },
  { name: "Source Credibility", value: 95 },
  { name: "Factual Accuracy", value: 98 }
];

const accuracyData = [
  { name: 'Training', fake: 94.2, real: 92.7 },
  { name: 'Validation', fake: 90.1, real: 89.5 },
  { name: 'Testing', fake: 88.6, real: 87.9 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

const FakeNewsVisualization = () => {
  const [view, setView] = useState<'accuracy' | 'comparison'>('accuracy');

  useEffect(() => {
    const interval = setInterval(() => {
      setView(prev => prev === 'accuracy' ? 'comparison' : 'accuracy');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderFeatureImportance = () => (
    <motion.div
      key="features"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Key Feature Importance</h3>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={keyTerms}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar 
            name="Feature Importance" 
            dataKey="value" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.6} 
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Importance']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const renderClassificationAccuracy = () => (
    <motion.div
      key="performance"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Classification Accuracy</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={accuracyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 20]} />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Accuracy']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Legend />
          <Bar dataKey="fake" name="Fake News" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="real" name="Real News" fill="#36A2EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const renderModelComparison = () => (
    <motion.div
      key="comparison"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Model Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={modelComparisonData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Score']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Bar dataKey="value" name="Accuracy" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {modelComparisonData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <DataVisualization title="Fake & Real News Detection">
      <div className="flex flex-col h-full">
        <div className="flex justify-center space-x-2 mb-2">
          <button 
            onClick={() => setView('features')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'features' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Features
          </button>
          <button 
            onClick={() => setView('performance')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'performance' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Accuracy
          </button>
          <button 
            onClick={() => setView('comparison')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'comparison' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Models
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'features' && renderFeatureImportance()}
          {view === 'performance' && renderClassificationAccuracy()}
          {view === 'comparison' && renderModelComparison()}
        </AnimatePresence>
      </div>
    </DataVisualization>
  );
};

export default FakeNewsVisualization;