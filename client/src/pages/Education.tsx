import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Briefcase, FileText } from "lucide-react";
import { education } from "@/lib/constants";

const iconMap = {
  degree: <GraduationCap className="text-primary text-xl" />,
  certification: <Award className="text-secondary text-xl" />,
  internship: <Briefcase className="text-tertiary text-xl" />
};

const Education = () => {
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
              animate="show"
            >
              {education
                .filter(item => item.type === "degree")
                .map((edu, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="border-border hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="bg-primary/20 p-3 rounded-lg mr-4">
                            {iconMap[edu.type]}
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
                .filter(item => item.type === "certification" && item.title === "Data Science Certification")
                .map((edu, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="border-border hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                            {iconMap[edu.type]}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                            <p className="text-muted-foreground text-sm mb-2">
                              {edu.description}
                            </p>
                            {edu.certificateUrl && (
                              <a href={edu.certificateUrl} className="text-primary hover:text-primary/80 text-sm inline-flex items-center">
                                <FileText size={14} className="mr-1" /> View Certificate
                              </a>
                            )}
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
              animate="show"
            >
              {education
                .filter(item => item.type === "internship")
                .map((edu, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="border-border hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="bg-tertiary/20 p-3 rounded-lg mr-4">
                            {iconMap[edu.type]}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                            <p className="text-muted-foreground text-sm mb-2">
                              {edu.description}
                            </p>
                            {edu.certificateUrl && (
                              <a href={edu.certificateUrl} className="text-primary hover:text-primary/80 text-sm inline-flex items-center">
                                <FileText size={14} className="mr-1" /> View Certificate
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              
              {education
                .filter(item => item.type === "certification" && item.title !== "Data Science Certification")
                .map((edu, index) => (
                  <motion.div key={index} variants={item}>
                    <Card className="border-border hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="bg-primary/20 p-3 rounded-lg mr-4">
                            {iconMap[edu.type]}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-1">{edu.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{edu.institution}, {edu.period}</p>
                            <p className="text-muted-foreground text-sm mb-2">
                              {edu.description}
                            </p>
                            {edu.certificateUrl && (
                              <a href={edu.certificateUrl} className="text-primary hover:text-primary/80 text-sm inline-flex items-center">
                                <FileText size={14} className="mr-1" /> View Certificate
                              </a>
                            )}
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
  );
};

export default Education;
