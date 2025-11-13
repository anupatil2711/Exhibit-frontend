import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getExhibitById, getQuizById } from '../api/api';
import Quiz from '../components/Quiz';
import Chatbot from '../components/Chatbot';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, delay: 0.3 } }
}

function ExhibitPage() {
  const { exhibitId } = useParams();
  const [exhibit, setExhibit] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (!exhibitId) return;

    // Synchronous data access
    const exhibitData = getExhibitById(exhibitId);
    setExhibit(exhibitData);

    if (exhibitData && exhibitData.quiz_id) {
        const quizId = exhibitData.quiz_id;
        const quizData = getQuizById(quizId);
        
        if (quizData) {
            setQuiz({
                ...quizData,
                title: `Quiz: ${exhibitData.name} Knowledge Test!`
            });
        }
    }
  }, [exhibitId]);

  if (!exhibit) {
    return <div className="container mx-auto p-6 text-center text-xl text-text-dark">Exhibit Not Found.</div>;
  }

  return (
    <motion.div
      className="container mx-auto px-6 py-12"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Outer container with a decorative border and shadow */}
      <motion.div 
        variants={contentVariants} 
        initial="hidden" 
        animate="visible"
        className="bg-white rounded-sm shadow-fancy-md overflow-hidden border-8 border-secondary/50 border-dashed p-4 relative" >
        
        {/* Main Exhibit Image and Info Wrapper */}
        <div className=" rounded-lg overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src={exhibit.cover} 
              alt={exhibit.name} 
              className="w-full h-96 object-cover rounded-sm" // Decorative border under image
            />
        </div>
        
        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Column 1: Description */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-4 border-b-4 border-accent/50 pb-2">
              {exhibit.name}
            </h1>
            <p className="text-lg text-text-dark/90 leading-relaxed mb-6">
              {exhibit.description}
            </p>
            
            {/* Decorated Video Content List */}
            {exhibit.video_content && (
              <motion.div 
                initial={{ rotateZ: -2 }}
                whileHover={{ rotateZ: 0, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-8 p-6 bg-accent/10 rounded-xl-fancy border-4 border-highlight shadow-inner" // Highly decorated box
              >
                <h3 className="font-display text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                    🚀 Video Launch Pad!
                </h3>
                <ul className="list-none space-y-3">
                  {Object.keys(exhibit.video_content).map(ageGroup => (
                    <li key={ageGroup} className="text-text-dark text-lg flex items-center justify-between bg-white p-2 rounded-full border shadow-sm">
                      <span className="font-semibold text-primary">Age {ageGroup}</span>
                      <a 
                        href={exhibit.video_content[ageGroup][0]} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-secondary py-1 px-4 rounded-full font-bold hover:bg-secondary/80 transition-colors"
                      >
                        Watch Now!
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

          </motion.div>

          {/* Column 2: Quiz */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            className="lg:col-span-1"
          >
            {quiz ? <Quiz quizData={quiz} /> : <p className="text-center text-lg text-text-dark/70">Quiz not found for this exhibit.</p>}
          </motion.div>
        </div>
      </motion.div>
      
      {/* RENDER THE CHATBOT (Virtual Guide) */}
      {exhibit && exhibit.video_content && (
          <Chatbot 
              exhibitName={exhibit.name} 
              videoContent={exhibit.video_content} 
          />
      )}
    </motion.div>
  );
}

export default ExhibitPage;