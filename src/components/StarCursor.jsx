import React from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { MdOutlineRocketLaunch } from "react-icons/md";

function StarCursor() {
  // 1. Get raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Smooth the coordinates using Framer Motion springs (the "trail" effect)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // 3. Update the raw coordinates on mouse move
  React.useEffect(() => {
    const moveCursor = (e) => {
      // Offset by approx half the icon size (24px / 2 = 12px)
      cursorX.set(e.clientX - 12); 
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener('mousemove', moveCursor);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    // The animated, styled cursor element
    <motion.div
      // Remove old styling (w-5, h-5, rounded-full, bg-accent, shadow)
      // Add text size and color for the icon
      className="fixed top-0 left-0 text-4xl text-blue-950 pointer-events-none z-[9999]"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      {/* Render the icon instead of the div */}
      <MdOutlineRocketLaunch />
    </motion.div>
  );
}

export default StarCursor;