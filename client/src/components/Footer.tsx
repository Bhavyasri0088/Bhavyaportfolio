import { Link } from "wouter";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <a
            href="https://drive.google.com/file/d/1RQtAGJ06bE7F_Kvk7efD5g1VmtC8FmRf/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            <FileDown className="h-4 w-4" />
            <span>Download Resume</span>
          </a>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="mailto:your.email@example.com">
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const Footer = () => {
  return (
    <footer className="py-8 bg-secondary/5 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Goddati Bhavyasri. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a 
              href="mailto:goddatibhavyasri@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/goddati-bhavyasri-b67a23253/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/Bhavyasri0088" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
