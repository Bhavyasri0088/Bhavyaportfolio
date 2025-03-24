import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoleAnimationProps {
  roles: string[];
  interval?: number;
}

const RoleAnimation = ({ roles, interval = 3000 }: RoleAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out and in sequence
    const fadeOutTimer = setInterval(() => {
      setIsVisible(false);
      
      // Change role after fade out completes
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsVisible(true);
      }, 500); // Wait for exit animation to complete
    }, interval);

    return () => clearInterval(fadeOutTimer);
  }, [roles.length, interval]);

  return (
    <div className="h-10 relative mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={`role-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 text-xl md:text-2xl font-medium text-primary"
          >
            {roles[currentIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleAnimation;
