import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileText } from "lucide-react";

export interface ProjectProps {
  title: string;
  description: string;
  insights: string[];
  technologies: string[];
  githubUrl: string;
  reportUrl?: string;
  visualizationComponent: React.ReactNode;
}

const ProjectCard = ({
  title,
  description,
  insights,
  technologies,
  githubUrl,
  reportUrl,
  visualizationComponent,
}: ProjectProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-border hover:border-primary/50 transition-all duration-300 mb-8 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-4">{description}</p>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Key Insights:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full hover:bg-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    View on GitHub
                  </a>
                </Button>
                
                {reportUrl && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={reportUrl} target="_blank" rel="noopener noreferrer">
                      <FileText size={16} />
                      Download Report
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
          
          <div className="p-6">
            {visualizationComponent}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
