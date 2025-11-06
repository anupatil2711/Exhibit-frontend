import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDiyProjects } from '../api/api';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function DiyLab() {
    const [diyProjects, setDiyProjects] = useState([]);

    useEffect(() => {
        // Synchronous data access
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
        className="font-display text-4xl font-bold text-primary mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Welcome to the DIY Lab!
      </motion.h2>
      <motion.p
        className="text-xl text-text-dark/90 mb-8 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Get ready to build, experiment, and create amazing things with our step-by-step guides.
        Your next big invention starts here!
      </motion.p>
      
      <div className="my-8">
        {diyProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {diyProjects.map(project => (
                    <motion.div
                        key={project.id}
                        className="bg-white p-6 rounded-lg-fancy shadow-fancy-sm text-left"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                    >
                        <img src={project.image} alt={project.name} className="w-full h-40 object-cover rounded-lg-fancy mb-3" />
                        <h3 className="font-display text-xl font-bold text-secondary">{project.name}</h3>
                        <p className="text-sm text-text-dark/80">{project.description}</p>
                    </motion.div>
                ))}
            </div>
        ) : (
            <>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="text-secondary text-6xl my-8"
                >
                    💡
                </motion.div>
                <p className="text-lg text-text-dark/70">
                    No DIY projects available yet! Time to get inventing...
                </p>
            </>
        )}
      </div>
    </motion.div>
  );
}

export default DiyLab;