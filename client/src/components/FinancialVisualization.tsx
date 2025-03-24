import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { stockPriceData, volatilityData, modelComparisonData } from "@/lib/visualizationData";

const FinancialVisualization = () => {
  const [progress, setProgress] = useState(0);
  const [animatedStockData, setAnimatedStockData] = useState<any[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(timer);
          return 1;
        }
        return prev + 0.02;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate the data points gradually
    const actualData = stockPriceData.slice(0, 15);
    const predictionData = stockPriceData.slice(15);
    
    const newAnimatedData = [
      ...actualData.map(point => ({
        ...point,
        actual: point.actual * progress
      })),
      ...predictionData.map(point => ({
        ...point,
        actual: point.actual * progress,
        prediction: point.prediction * progress,
        upperBound: point.upperBound * progress,
        lowerBound: point.lowerBound * progress
      }))
    ];
    
    setAnimatedStockData(newAnimatedData);
  }, [progress]);

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-4">Stock Price Prediction</h4>
        
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={animatedStockData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#777' }} />
              <YAxis tick={{ fontSize: 10, fill: '#777' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 5 }}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="prediction" 
                stroke="#F97316" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={{ r: 2 }} 
                activeDot={{ r: 5 }}
                name="Prediction" 
              />
              <Line 
                type="monotone" 
                dataKey="upperBound" 
                stroke="#F97316" 
                strokeWidth={1}
                strokeDasharray="3 3" 
                dot={false}
                name="Upper Bound"
              />
              <Line 
                type="monotone" 
                dataKey="lowerBound" 
                stroke="#F97316" 
                strokeWidth={1}
                strokeDasharray="3 3" 
                dot={false}
                name="Lower Bound"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Market Volatility Heatmap</p>
          <div className="grid grid-cols-7 gap-1">
            {volatilityData.map((day, index) => (
              <motion.div
                key={index}
                className="h-8 rounded transition-colors"
                style={{ 
                  backgroundColor: `rgba(59, 130, 246, ${day.level * progress * 0.7})`,
                  cursor: 'pointer'
                }}
                whileHover={{ backgroundColor: `rgba(59, 130, 246, ${day.level * progress * 0.9})` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Model Comparison (RMSE)</p>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparisonData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#777' }} />
                <Tooltip 
                  formatter={(value: number) => [`${(value * progress).toFixed(2)}`, 'RMSE Score']}
                  contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {modelComparisonData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? "#10B981" : index === 1 ? "#3B82F6" : "#F97316"} 
                      opacity={hoveredIndex === index ? 1 : 0.8}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialVisualization;
