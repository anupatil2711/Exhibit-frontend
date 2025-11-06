import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ExhibitCard({ title, imageUrl, description, link }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)' }}
      className="bg-white rounded-lg-fancy shadow-fancy-sm overflow-hidden border-b-4 border-accent/30"
    >
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-text-dark/90 mb-4 h-24 overflow-hidden text-lg">
          {description.substring(0, 100)}...
        </p>
        <Link to={link} className="font-bold text-secondary text-lg hover:underline">
          Dive In! &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

export default ExhibitCard;