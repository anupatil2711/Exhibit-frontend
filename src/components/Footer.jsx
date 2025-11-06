import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
  const footerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.5 } },
  };

  return (
    <motion.footer
      className="bg-primary text-white py-10"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-2xl font-bold mb-2">SciSpark</p>
        <p>&copy; 2025 SciSpark. All rights reserved. Keep exploring, stay curious!</p>
      </div>
    </motion.footer>
  );
}

export default Footer;