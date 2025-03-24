import { motion } from 'framer-motion';

interface DataVisualizationProps {
  title: string;
  children: React.ReactNode;
}

const DataVisualization = ({ title, children }: DataVisualizationProps) => {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden bg-card shadow-lg h-[350px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
      
      <div className="relative z-10 p-4 h-full flex flex-col">
        <div className="border-b border-border pb-2 mb-4">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default DataVisualization;