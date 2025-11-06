import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaVideo, FaTimes } from 'react-icons/fa';

const Chatbot = ({ exhibitName, videoContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [videoLink, setVideoLink] = useState(null);

  const handleAgeSelect = (ageGroup) => {
    setSelectedAge(ageGroup);
    
    // 1. Get the video array for the selected age group
    const videos = videoContent[ageGroup];

    if (videos && videos.length > 0) {
      // 2. Select the first video URL
      setVideoLink(videos[0]);
    } else {
      setVideoLink("No video available for this age group.");
    }
  };
  
  const ageGroups = Object.keys(videoContent);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="fixed bottom-10 right-10 z-[100] bg-secondary text-white p-4 rounded-full shadow-xl hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chatbot Window */}
      <motion.div
        className="fixed bottom-28 right-5 w-80 bg-white rounded-lg-fancy shadow-2xl border-t-4 border-accent z-[100]"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="p-4 bg-primary text-white rounded-t-lg-fancy flex justify-between items-center">
          <h3 className="font-display text-xl">Virtual Guide</h3>
          <button onClick={() => setIsOpen(false)}><FaTimes /></button>
        </div>

        <div className="p-4">
          <p className="text-text-dark/90 mb-4">
            Hi! I can find the best video about **{exhibitName}** for you. How old is the scientist?
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {ageGroups.map((group) => (
              <motion.button
                key={group}
                onClick={() => handleAgeSelect(group)}
                className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${
                  selectedAge === group ? 'bg-secondary text-white' : 'bg-bg-light text-primary hover:bg-secondary/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {group}
              </motion.button>
            ))}
          </div>

          {videoLink && (
            <div className="mt-4 p-3 border-l-4 border-highlight bg-yellow-50">
              <p className="font-semibold text-sm mb-2">Result for Age {selectedAge}:</p>
              {videoLink.startsWith("/") ? (
                <a 
                  href={videoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-highlight hover:underline flex items-center gap-2"
                >
                  <FaVideo /> Watch Video Now!
                </a>
              ) : (
                <p className="text-sm text-red-500">{videoLink}</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Chatbot;