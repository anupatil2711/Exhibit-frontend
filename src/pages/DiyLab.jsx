// src/pages/DiyLab.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getDiyProjects } from '../api/api';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function DiyLab() {
    const [diyProjects, setDiyProjects] = useState([]);

    useEffect(() => {
        // Synchronous data access via API function
        const data = getDiyProjects();
        setDiyProjects(data);
    }, []);

  return (
    <motion.div
      className="container mx-auto px-6 py-12 text-center"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        className="font-display text-5xl font-bold text-primary mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Welcome to the DIY Lab!
      </motion.h2>
      <motion.p
        className="text-xl text-text-dark/90 mb-12 max-w-2xl mx-auto font-sans"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Get ready to build, experiment, and create amazing things with our step-by-step guides.
      </motion.p>
      
      <div className="my-8">
        {diyProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {diyProjects.map(project => (
                    <motion.div
                        key={project.id}
                        // --- DOTTED BORDER ADDED HERE ---
                        className="bg-white p-6 rounded-sm shadow-sm text-left border-2 border-dashed border-primary/50 transition-all duration-300 hover:shadow-fancy-md hover:-translate-y-1 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Link to={`/diy-lab/${project.id}`}>
                            {/* Image Wrapper to handle overflow */}
                            <div className="overflow-hidden rounded-sm mb-3 border border-accent">
                                <img 
                                    // --- IMAGE SCALE ON HOVER ADDED HERE ---
                                    src={project.cover} 
                                    alt={project.title} 
                                    className="w-full h-40 object-cover rounded-lg-fancy transition-transform duration-300 hover:scale-[1.05]" 
                                />
                            </div>
                            
                            {/* --- MAPPED DATA FIELDS --- */}
                            <span className="text-xs uppercase tracking-widest text-text-light">{project.time_required || 'Quick Project'}</span>
                            <h3 className="font-display text-2xl font-bold text-primary mt-1 mb-2">{project.title}</h3>
                            <p className="text-sm text-text-dark/80 font-sans">{project.concept}</p> 
                            
                            <span className="block mt-4 text-secondary font-semibold hover:underline">View Instructions &rarr;</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        ) : (
            <div className="mt-16">
                <p className="text-lg text-text-dark/70">
                    No DIY projects loaded yet!
                </p>
            </div>
        )}
      </div>
    </motion.div>
  );
}

export default DiyLab;