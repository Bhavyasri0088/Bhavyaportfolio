import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { churnData, churnByTenure } from "@/lib/visualizationData";

const COLORS = ["#F97316", "#3B82F6", "#10B981", "#8B5CF6"];

const ChurnVisualization = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedChurnData, setAnimatedChurnData] = useState(
    churnData.map(item => ({ ...item, value: 0 }))
  );
  const [animatedTenureData, setAnimatedTenureData] = useState(
    churnByTenure.map(item => ({ ...item, churnRate: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedChurnData(churnData);
    }, 500);

    const tenureTimer = setTimeout(() => {
      setAnimatedTenureData(churnByTenure);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tenureTimer);
    };
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h4 className="text-lg font-medium mb-4">Churn Analysis Dashboard</h4>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={animatedChurnData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={0}
                dataKey="value"
                animationDuration={1000}
                animationBegin={0}
              >
                {animatedChurnData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    opacity={hoveredIndex === index ? 1 : 0.8}
                    stroke={hoveredIndex === index ? "#fff" : "none"}
                    strokeWidth={2}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}%`, name]} 
                contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#B3B3B3' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Churn Rate by Customer Tenure</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={animatedTenureData}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#B3B3B3' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Churn Rate']} 
                  contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '4px' }}
                  labelStyle={{ color: '#B3B3B3' }}
                />
                <Bar 
                  dataKey="churnRate" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {animatedTenureData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="#3B82F6" 
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

export default ChurnVisualization;
