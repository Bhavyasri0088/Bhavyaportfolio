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
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { modelMetrics } from "@/lib/visualizationData";

const COLORS = ["#F97316", "#3B82F6", "#10B981"];

const FakeNewsVisualization = () => {
  const [progress, setProgress] = useState(0);
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

  // ROC curve data
  const rocCurveData = [
    { fpr: 0, tpr: 0 },
    { fpr: 0.05, tpr: 0.4 * progress },
    { fpr: 0.1, tpr: 0.6 * progress },
    { fpr: 0.2, tpr: 0.7 * progress },
    { fpr: 0.3, tpr: 0.8 * progress },
    { fpr: 0.4, tpr: 0.85 * progress },
    { fpr: 0.5, tpr: 0.88 * progress },
    { fpr: 0.6, tpr: 0.9 * progress },
    { fpr: 0.7, tpr: 0.93 * progress },
    { fpr: 0.8, tpr: 0.95 * progress },
    { fpr: 0.9, tpr: 0.97 * progress },
    { fpr: 1, tpr: 1 * progress }
  ];

  // Random classifier line data
  const baselineData = [
    { fpr: 0, tpr: 0 },
    { fpr: 1, tpr: 1 }
  ];

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-4">Model Performance Visualization</h4>
        
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">ROC Curve Analysis</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rocCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="fpr" 
                  label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fontSize: 12, fill: '#777' }} 
                  tick={{ fontSize: 10, fill: '#777' }}
                  domain={[0, 1]}
                />
                <YAxis 
                  label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', offset: 10, fontSize: 12, fill: '#777' }} 
                  tick={{ fontSize: 10, fill: '#777' }}
                  domain={[0, 1]}
                />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(2), 'Value']}
                  contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="#F97316" 
                  dot={false} 
                  strokeWidth={2} 
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  data={baselineData} 
                  dataKey="tpr" 
                  stroke="#555" 
                  dot={false} 
                  strokeDasharray="5 5" 
                  strokeWidth={1} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="none" 
                  fill="#F97316" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Model Performance Metrics</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelMetrics}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#777' }} />
                <Tooltip 
                  formatter={(value: number) => [`${(value * 100 * progress).toFixed(0)}%`, 'Score']}
                  contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {modelMetrics.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
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
        
        <div className="mt-6 border border-border rounded p-3 text-center">
          <motion.div 
            className="flex flex-wrap justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[
              { text: "election", size: 18, color: "#3B82F6" },
              { text: "breaking", size: 22, color: "#F97316" },
              { text: "source", size: 12, color: "#10B981" },
              { text: "official", size: 16, color: "#8B5CF6" },
              { text: "shocking", size: 20, color: "#EAB308" },
              { text: "report", size: 14, color: "#EC4899" },
              { text: "exclusive", size: 24, color: "#F97316" },
              { text: "confirmed", size: 16, color: "#3B82F6" },
              { text: "sources", size: 12, color: "#94A3B8" },
              { text: "scandal", size: 18, color: "#10B981" }
            ].map((word, index) => (
              <motion.span 
                key={index}
                className="inline-block"
                style={{ 
                  fontSize: `${word.size}px`, 
                  color: word.color,
                  opacity: 0
                }}
                animate={{ 
                  opacity: 1,
                  scale: [1, 1.1, 1],
                  transition: { 
                    opacity: { delay: index * 0.1, duration: 0.5 },
                    scale: { delay: index * 0.1, duration: 0.5 }
                  }
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-xs text-muted-foreground mt-2">Common words in fake news</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FakeNewsVisualization;
