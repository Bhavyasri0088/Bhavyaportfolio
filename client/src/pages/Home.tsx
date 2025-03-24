import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RoleAnimation from "@/components/RoleAnimation";
import { ArrowDown, FileDown, Mail } from "lucide-react";

const Home = () => {
  const roles = [
    "Data Scientist",
    "Machine Learning Enthusiast",
    "Data Visualization Expert"
  ];

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/90 z-0"></div>
      
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
            <Link href="/projects">
              View Projects
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="gap-2">
            <Link href="/contact">
              <Mail size={16} />
              Contact Me
            </Link>
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
  );
};

export default Home;
