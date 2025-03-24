import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Boxes, 
  BarChart, 
  Database, 
  Brain, 
  GitBranch 
} from "lucide-react";
import { skills } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="text-primary" />,
  Boxes: <Boxes className="text-secondary" />,
  BarChart: <BarChart className="text-tertiary" />,
  Database: <Database className="text-primary" />,
  Brain: <Brain className="text-secondary" />,
  GitBranch: <GitBranch className="text-tertiary" />
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My expertise in data science tools, programming languages, and frameworks that I utilize to deliver impactful results.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-border hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-3">
                      {iconMap[skill.icon]}
                    </span>
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skill.items.map((item, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setHoveredSkill(item)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          backgroundColor: hoveredSkill === item ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
