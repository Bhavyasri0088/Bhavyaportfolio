import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { churnData, churnByTenure, modelMetrics } from '@/lib/visualizationData';
import DataVisualization from './DataVisualization';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

const ChurnVisualization = () => {
  const [view, setView] = useState<'distribution' | 'model'>('distribution');

  useEffect(() => {
    const interval = setInterval(() => {
      setView(prev => prev === 'distribution' ? 'model' : 'distribution');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderChurnDistribution = () => (
    <motion.div
      key="distribution"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Customer Churn Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={churnData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={handlePieEnter}
          >
            {churnData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke={activeIndex === index ? '#fff' : 'transparent'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Percentage']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const renderChurnByTenure = () => (
    <motion.div
      key="tenure"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Churn Rate by Tenure</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={churnByTenure}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Churn Rate']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Bar dataKey="value" name="Churn Rate" fill="#FF6B6B" radius={[4, 4, 0, 0]}>
            {churnByTenure.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const renderModelPerformance = () => (
    <motion.div
      key="model"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Model Performance Metrics</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={modelMetrics}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}`, 'Score']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Bar dataKey="value" name="Score" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {modelMetrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <DataVisualization title="Telecom Customer Churn Analysis">
      <div className="flex flex-col h-full">
        <div className="flex justify-center space-x-2 mb-2">
          <button 
            onClick={() => setView('distribution')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'distribution' ? 'bg-primary text-white' : 'bg-muted text-white'}`}
          >
            Distribution
          </button>
          <button 
            onClick={() => setView('model')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'model' ? 'bg-primary text-white' : 'bg-muted text-white'}`}
          >
            Model Metrics
          </button>
        </div>

        {view === 'distribution' && renderChurnDistribution()}
        {view === 'model' && renderModelPerformance()}
      </div>
    </DataVisualization>
  );
};

export default ChurnVisualization;