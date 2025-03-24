import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { stockPriceData, volatilityData } from '@/lib/visualizationData';
import DataVisualization from './DataVisualization';

const FinancialVisualization = () => {
  const [view, setView] = useState<'price' | 'volatility'>('price');

  useEffect(() => {
    const interval = setInterval(() => {
      setView(prev => prev === 'price' ? 'volatility' : 'price');
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const renderStockPrice = () => (
    <motion.div
      key="price"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Stock Price Prediction</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={stockPriceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            name="Actual Price"
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#82ca9d" 
            strokeDasharray="5 5" 
            strokeWidth={2}
            name="Predicted Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const renderVolatility = () => (
    <motion.div
      key="volatility"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <h3 className="text-center text-md mb-4">Market Volatility Analysis</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={volatilityData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Volatility']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#ff7300" 
            fill="#ff7300" 
            fillOpacity={0.3}
            name="Volatility Index"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <DataVisualization title="Financial Market Analysis">
      <div className="flex flex-col h-full">
        <div className="flex justify-center space-x-2 mb-2">
          <button 
            onClick={() => setView('price')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'price' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Stock Prediction
          </button>
          <button 
            onClick={() => setView('volatility')}
            className={`text-xs px-2 py-1 rounded-full ${view === 'volatility' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Volatility
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          {view === 'price' && renderStockPrice()}
          {view === 'volatility' && renderVolatility()}
        </AnimatePresence>
      </div>
    </DataVisualization>
  );
};

export default FinancialVisualization;