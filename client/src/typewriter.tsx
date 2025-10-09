import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';


interface TypewriterProps {
  text: string;
  startDelay?: number;  
  typingSpeed?: number; 
  className?: string;
}

const Typewriter = ({ 
    text, 
    startDelay = 0.5, 
    typingSpeed = 0.05, 
    className = "" 
}: TypewriterProps) => {
  
  const characters = Array.from(text);

  // 1. Container Variant (Controls Staggering)
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: typingSpeed, 
        delayChildren: startDelay, 
      },
    },
  };

  // 2. Child Variant (Controls Single Letter Appearance)
  const child: Variants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01, 
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      // 💥 THE FIX: Use the 'text' prop as the key.
      // When 'text' changes, React treats this component instance as new,
      // forcing Framer Motion to re-run the initial -> animate sequence.
      key={text} 
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span 
          key={index} 
          variants={child}
          style={{ display: char === " " ? "inline" : "inline-block" }} 
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Typewriter;