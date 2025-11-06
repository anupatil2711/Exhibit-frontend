import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaBolt, FaRocket, FaBacteria } from 'react-icons/fa';

// Define the icons and colors for variety
const widgetTypes = [
  { icon: FaBolt, color: 'text-accent', size: 40, initialRot: 15 },
  { icon: FaRocket, color: 'text-highlight', size: 55, initialRot: -10 },
  { icon: FaBacteria, color: 'text-secondary', size: 45, initialRot: 5 },
];

const WackyWidget = ({ typeIndex, mouseX, mouseY, style }) => {
  const { icon: Icon, color, size, initialRot } = widgetTypes[typeIndex % widgetTypes.length];
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // --- MOUSE REPEL EFFECT ---
  const repelledX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const repelledY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  // Combine floating and repelling in the spring
  springX.set(repelledX.get());
  springY.set(repelledY.get());
  
  // Animation for continuous float
  const floatVariants = {
    float: {
      y: [0, -15, 0],
      rotate: [initialRot, initialRot + 10, initialRot],
      transition: {
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={floatVariants}
      animate="float"
      style={{
        ...style, // Apply initial fixed positioning
        x: springX,
        y: springY,
      }}
      className={`absolute ${color} opacity-80`}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default WackyWidget;