// src/pages/DiyDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDiyProjectById } from '../api/api';
import { FaHourglassHalf, FaHammer, FaClipboardList, FaArrowLeft } from 'react-icons/fa';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function DiyDetailPage() {
    const { diyId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Synchronous data access
        const projectData = getDiyProjectById(diyId);
        setProject(projectData);
    }, [diyId]);

    if (!project) {
        return <div className="container mx-auto py-12 text-center text-xl">Project not found.</div>;
    }

    return (
        <motion.div
            className="container mx-auto px-6 py-12"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
            {/* Back Button */}
            <Link to="/diy-lab" className="flex items-center text-secondary font-semibold hover:underline mb-8">
                <FaArrowLeft className="mr-2" /> Back to DIY Lab
            </Link>

            {/* Main Content Area */}
            <div className="bg-white rounded-xl-fancy shadow-fancy-md p-8 lg:p-12">
                <h1 className="font-display text-5xl font-extrabold text-primary mb-2">
                    {project.title}
                </h1>
                <p className="text-lg text-text-light mb-6 font-sans border-b border-accent pb-4">
                    {project.concept}
                </p>

                {/* Info Bar */}
                <div className="flex justify-start items-center gap-6 mb-10 text-text-dark/80">
                    <div className="flex items-center gap-2">
                        <FaHourglassHalf className="text-secondary" />
                        <span className="font-semibold text-sm">Time: {project.time_required}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaHammer className="text-secondary" />
                        <span className="font-semibold text-sm">Focus: {project.exhibit_name}</span>
                    </div>
                </div>

                {/* Materials & Instructions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Materials Column (1/3) */}
                    <motion.div 
                        className="lg:col-span-1 bg-accent p-6 rounded-lg-fancy border-l-4 border-secondary"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="font-display text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                            <FaClipboardList /> Materials List
                        </h2>
                        <ul className="list-disc ml-6 space-y-3 text-text-dark font-sans">
                            {project.materials.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Instructions Column (2/3) */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="font-display text-3xl font-bold text-primary mb-6">
                            Step-by-Step Instructions
                        </h2>
                        <ol className="space-y-6">
                            {project.instructions.map((item, index) => (
                                <li key={item.step} className="flex flex-col items-start gap-4 p-4 border-b border-accent">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                                            {item.step}
                                        </div>
                                        <p className="text-lg text-text-dark/90 font-sans pt-1">
                                            {item.action}
                                        </p>
                                    </div>

                                    {/* --- IMAGE INTEGRATION --- */}
                                    {/* The image array is indexed 0, 1, 2, etc., matching the instruction step index */}
                                    {project.images_guide && project.images_guide[index] && (
                                        <img 
                                            src={project.images_guide[index]} 
                                            alt={`Step ${item.step} illustration`} 
                                            className="w-full md:w-3/4 max-h-80 object-contain rounded-lg mt-2 shadow-md border border-secondary/10" 
                                        />
                                    )}
                                    
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default DiyDetailPage;