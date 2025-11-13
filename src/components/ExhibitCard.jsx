import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ExhibitCard({ title, imageUrl, description, link }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      
      // Card Container Styling
      className="bg-white rounded-lg-fancy shadow-fancy-sm overflow-hidden border-2 border-dashed border-primary/50 transition-all duration-300"
    >
      {/* Image Wrapper: Added Padding to create margin effect around the image */}
      <div className="p-3 overflow-hidden"> 
        <img
          src={imageUrl}
          alt={title}
          // Image Styling: Reduced h-56 slightly and added rounded-lg to enhance aesthetic
          className="w-full h-52 object-cover transition-transform duration-300 hover:scale-96 rounded-lg" 
        />
      </div>
      
      {/* Content Area */}
      <div className="p-6 pt-3"> {/* Adjusted padding to compensate for wrapper padding */}
        <h3 className="font-display text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-text-dark/90 mb-4 h-24 overflow-hidden text-lg font-sans">
          {description.substring(0, 100)}...
        </p>
        <Link 
          to={link} 
          className="font-bold text-secondary text-lg hover:underline transition-colors"
        >
          Dive In! &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

export default ExhibitCard;