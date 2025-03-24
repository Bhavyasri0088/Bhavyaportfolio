import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ChurnVisualization from "@/components/ChurnVisualization";
import FakeNewsVisualization from "@/components/FakeNewsVisualization";
import FinancialVisualization from "@/components/FinancialVisualization";
import { projects } from "@/lib/constants";

const Projects = () => {
  return (
    <section className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my data science projects with interactive visualizations and insightful analyses.
          </p>
        </motion.div>
        
        <div className="space-y-12">
          <ProjectCard 
            title={projects[0].title}
            description={projects[0].description}
            insights={projects[0].insights}
            technologies={projects[0].technologies}
            githubUrl={projects[0].githubUrl}
            reportUrl={projects[0].reportUrl}
            visualizationComponent={<ChurnVisualization />}
          />
          
          <ProjectCard 
            title={projects[1].title}
            description={projects[1].description}
            insights={projects[1].insights}
            technologies={projects[1].technologies}
            githubUrl={projects[1].githubUrl}
            reportUrl={projects[1].reportUrl}
            visualizationComponent={<FakeNewsVisualization />}
          />
          
          <ProjectCard 
            title={projects[2].title}
            description={projects[2].description}
            insights={projects[2].insights}
            technologies={projects[2].technologies}
            githubUrl={projects[2].githubUrl}
            reportUrl={projects[2].reportUrl}
            visualizationComponent={<FinancialVisualization />}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
