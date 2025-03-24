import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface DataVisualizationProps {
  title: string;
  children: React.ReactNode;
}

const DataVisualization = ({ title, children }: DataVisualizationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full"
    >
      <h4 className="text-lg font-medium mb-4">{title}</h4>
      <div className="flex-1 bg-secondary/5 p-4 rounded-lg border border-border overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default DataVisualization;
