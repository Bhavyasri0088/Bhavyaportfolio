import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ChurnVisualization from "@/components/ChurnVisualization";
import FakeNewsVisualization from "@/components/FakeNewsVisualization";
import FinancialVisualization from "@/components/FinancialVisualization";
import { projects as defaultProjects } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectInfo } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if we have any projects in the database, otherwise use the default ones
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        // If we have projects in the database, use them
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Otherwise use our default projects from constants
          setProjects(defaultProjects);
          
          // If database is empty, initialize it with our default projects
          // Only do this once - in a real app we'd have a better mechanism
          defaultProjects.forEach(async (project) => {
            try {
              await fetch('/api/projects', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
              });
            } catch (error) {
              console.error('Error seeding project:', error);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to fetch projects. Using default data.",
          variant: "destructive"
        });
        
        // Fallback to default projects
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [toast]);

  // Function to determine which visualization component to render based on project index
  const getVisualizationComponent = (index: number) => {
    switch (index) {
      case 0:
        return <ChurnVisualization />;
      case 1:
        return <FakeNewsVisualization />;
      case 2:
        return <FinancialVisualization />;
      default:
        return null;
    }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my data science projects with interactive visualizations and insightful analyses.
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {loading ? (
            // Skeleton loaders while loading
            <>
              <div className="rounded-lg border p-6">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="rounded-lg border p-6">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            </>
          ) : (
            // Display projects when loaded
            projects.map((project, index) => (
              <ProjectCard 
                key={project.id || index}
                title={project.title}
                description={project.description}
                insights={project.insights || []}
                technologies={project.technologies || []}
                githubUrl={project.githubUrl}
                reportUrl={project.reportUrl}
                visualizationComponent={getVisualizationComponent(index)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
