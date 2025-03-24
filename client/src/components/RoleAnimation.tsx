import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RoleAnimationProps {
  roles: string[];
  interval?: number;
}

const RoleAnimation = ({ roles, interval = 4000 }: RoleAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [roles.length, interval]);

  return (
    <div className="h-10 relative mb-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 text-xl md:text-2xl font-medium"
        >
          {roles[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default RoleAnimation;
