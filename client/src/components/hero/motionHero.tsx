import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function TypingText({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setVisibleText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here (in milliseconds)
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold"
    >
      {visibleText}
    </motion.div>
  );
}