import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RoleAnimation from "@/components/RoleAnimation";
import { ArrowDown, FileDown, Mail, Linkedin, Github } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ChurnVisualization from "@/components/ChurnVisualization";
import FakeNewsVisualization from "@/components/FakeNewsVisualization";
import FinancialVisualization from "@/components/FinancialVisualization";
import { projects as defaultProjects, skills, education, contactInfo } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectInfo } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Boxes, 
  BarChart, 
  Database, 
  Brain, 
  GitBranch,
  GraduationCap, 
  Award, 
  Briefcase, 
  FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="text-primary" />,
  Boxes: <Boxes className="text-secondary" />,
  BarChart: <BarChart className="text-tertiary" />,
  Database: <Database className="text-primary" />,
  Brain: <Brain className="text-secondary" />,
  GitBranch: <GitBranch className="text-tertiary" />
};

const educationIconMap = {
  degree: <GraduationCap className="text-primary text-xl" />,
  certification: <Award className="text-secondary text-xl" />,
  internship: <Briefcase className="text-tertiary text-xl" />
};

const Home = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    "Data Scientist",
    "Machine Learning Enthusiast",
    "Data Visualization Expert"
  ];

  // Projects Section - Fetch projects
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

  // Contact form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });

        // Clear form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Animation variants
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/images/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >

        <div className="container mx-auto px-4 pt-24 text-left relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 font-sans tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            I'm Goddati Bhavyasri
          </motion.h1>

          <RoleAnimation roles={roles} />

          <motion.p 
            className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hello! I'm a passionate data scientist dedicated to transforming complex data into actionable insights. With expertise in Python, MySQL, and machine learning, I specialize in building predictive models and creating interactive visualizations that drive data-driven decisions.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button asChild className="gap-2">
              <a href="#projects">
                View Projects
              </a>
            </Button>

            <Button asChild variant="outline" className="gap-2">
              <a href="#contact">
                <Mail size={16} />
                Contact Me
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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
            whileInView="show"
            viewport={{ once: true }}
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

      {/* Education Section */}
      <section id="education" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My academic background and professional certifications in data science and related fields.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-border pb-2">Education</h3>

              <motion.div
                className="space-y-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {education
                  .filter(item => item.type === "degree")
                  .map((edu, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="border-border hover:border-primary/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="bg-primary/20 p-3 rounded-lg mr-4">
                              {educationIconMap[edu.type]}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                              <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                              <p className="text-muted-foreground text-sm">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                {education
                  .filter(item => item.type === "certification" && item.title === "DATA SCIENCE Certification")
                  .map((edu, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="border-border hover:border-primary/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                              {educationIconMap[edu.type]}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                              <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                              <p className="text-muted-foreground text-sm">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </div>

            {/* Certifications & Internships Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-border pb-2">Certifications & Internships</h3>

              <motion.div
                className="space-y-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {education
                  .filter(item => item.type === "internship")
                  .map((edu, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="border-border hover:border-primary/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="bg-tertiary/20 p-3 rounded-lg mr-4">
                              {educationIconMap[edu.type]}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                              <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                              <p className="text-muted-foreground text-sm">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                {education
                  .filter(item => item.type === "certification" && item.title !== "DATA SCIENCE Certification")
                  .map((edu, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="border-border hover:border-primary/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="bg-primary/20 p-3 rounded-lg mr-4">
                              {educationIconMap[edu.type]}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                              <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                              <p className="text-muted-foreground text-sm">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential collaborations? Reach out to me through any of these channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/20 p-3 rounded-lg mr-4">
                        <Mail className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a 
                          href={`mailto:${contactInfo.email}`} 
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                        <Linkedin className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                        <a 
                          href={contactInfo.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-foreground hover:text-secondary transition-colors"
                        >
                          linkedin.com/in/goddati-bhavyasri
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-tertiary/20 p-3 rounded-lg mr-4">
                        <Github className="text-tertiary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">GitHub</p>
                        <a 
                          href={contactInfo.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-foreground hover:text-tertiary transition-colors"
                        >
                          github.com/Bhavyasri0088
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button asChild className="flex items-center gap-2">
                      <a href={contactInfo.resumeUrl} download>
                        <FileDown size={16} />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={4}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          <Mail size={16} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;