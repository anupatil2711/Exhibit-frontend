import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { getExhibits } from '../api/api';
import { FaFlask, FaPuzzlePiece, FaTools } from 'react-icons/fa';
import BackgroundImageFile from '../assets/bg.webp'; 

// --- DATA ARRAYS ---
const instantFacts = [
  "A snail can sleep for three years! We bet they're dreaming about science.",
  "If you shouted for 8 years, 7 months, and 6 days, you would produce enough energy to heat one cup of coffee. Don't try this at home!",
  "A group of flamingos is called a 'flamboyance.' How stylish!",
  "Humans and bananas share about 50% of the same DNA. You're half fruit!",
  "The loudest animal on Earth is the sperm whale. It clicks are louder than a jet engine.",
];

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
    },
  },
};

const headlineWords = "Unleash Your Inner Genius!".split(" ");


function Home() {
  const [featuredExhibit, setFeaturedExhibit] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // --- MOUSE TRACKING FOR WACKY WIDGETS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // 1. Get featured exhibit (synchronous)
    const data = getExhibits();
    if (data && data.length > 0) {
      setFeaturedExhibit(data[0]);
    }

    // 2. Fact Machine Timer
    const factTimer = setInterval(() => {
        setCurrentFactIndex(prevIndex => (prevIndex + 1) % instantFacts.length);
    }, 5000);

    // 3. Mouse Tracking Listener
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(factTimer);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="overflow-hidden bg-bg-light"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. ELEGANT HERO SECTION with Background Image */}
      <div 
        className="relative overflow-hidden pt-20 pb-40 md:py-40 text-white border-b-8 border-primary"
        style={{
            backgroundImage: `url(${BackgroundImageFile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}
      >
        
      {/* Dark overlay only on left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>


        {/* Hero Content (Highest Z-index) */}
        <div className="relative container mx-auto px-6 z-30"> 
            <div className="max-w-xl text-left"> {/* Wrapper controls alignment and width */}
                <motion.h1
                    className="font-display text-5xl md:text-7xl font-extrabold mb-4 leading-tight inline-block"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ originX: 0.5, originY: 0.5 }}
                >
                    {headlineWords.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={{
                        hidden: { opacity: 0, y: 50, rotate: 10 },
                        visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 120 } },
                        }}
                        className="inline-block mx-1 text-white" 
                    >
                        {word}
                        {index < headlineWords.length - 1 ? ' ' : ''}
                    </motion.span>
                    ))}
                </motion.h1>

                {/* --- Sub-headline --- */}
                <motion.p
                    variants={itemVariants}
                    className="text-md md:text-xl text-white/90 mb-10 font-light"
                >
                    Welcome to a place where curiosity comes to play. 
                    Explore, learn, and create in a world of hands-on wonders.
                </motion.p>
                
                <motion.div variants={itemVariants}>
                    {/* --- Button --- */}
                    <Link
                    to="/exhibits"
                    className="inline-block bg-secondary text-white font-bold text-xl py-4 px-8 rounded-md shadow-lg relative overflow-hidden group border-2 border-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Begin Your Discovery! 🚀
                    </Link>
                </motion.div>
                
                {/* Funnier Element: The Punch Me Button
                <motion.div variants={itemVariants} className="mt-6">
                    <motion.button
                    onClick={() => alert("Ouch! That tickles! Go explore instead!")}
                    className="bg-accent/80 text-primary font-bold text-md py-2 px-6 rounded-lg-fancy shadow-md border-2 border-white/50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.8, rotate: -5, backgroundColor: "#FF0000" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                    DON'T CLICK ME!
                    </motion.button>
                </motion.div> */}
            </div>
        </div>
      </div>

     

      {/* 3. "WHAT TO DO" ICON SECTION */}
      <div className="container mx-auto px-6 py-10 pt-20">
        {/* --- "Lovely" and "Sensible" section title --- */}
        <motion.h2
          variants={itemVariants}
          className="font-display text-4xl font-bold text-primary text-center mb-12"
        >
          Your Journey Starts Here ✨
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1: Explore - DOTTED BORDER */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-8 rounded-lg-fancy shadow-fancy-md transition-all transform flex flex-col items-center border-2 border-dashed border-secondary hover:shadow-fancy-md"
          >
            <motion.div
              className="bg-secondary/10 p-5 rounded-full mb-4"
              animate={{ y: ["0%", "-10%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <FaFlask size={50} className="text-secondary" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-primary mt-2 mb-2">
              Explore Our Wonders
            </h3>
            <p className="text-text-dark/90 text-lg">See all the mind-blowing exhibits.</p>
            <Link to="/exhibits" className="mt-4 text-highlight font-semibold hover:underline">
              See Exhibits &rarr;
            </Link>
          </motion.div>

          {/* Card 2: Quiz - DOTTED BORDER */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-8 rounded-lg-fancy shadow-fancy-md transition-all transform flex flex-col items-center border-2 border-dashed border-highlight hover:shadow-fancy-md"
          >
            <motion.div
              className="bg-highlight/10 p-5 rounded-full mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <FaPuzzlePiece size={50} className="text-highlight" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-primary mt-2 mb-2">
              Test Your Knowledge
            </h3>
            <p className="text-text-dark/90 text-lg">Take fun quizzes after you learn.</p>
            <Link to="/exhibits" className="mt-4 text-highlight font-semibold hover:underline">
              Take a Quiz &rarr;
            </Link>
          </motion.div>

          {/* Card 3: Build - DOTTED BORDER */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-8 rounded-lg-fancy shadow-fancy-md transition-all transform flex flex-col items-center border-2 border-dashed border-accent hover:shadow-fancy-md"
          >
            <motion.div
              className="bg-accent/10 p-5 rounded-full mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
            >
              <FaTools size={50} className="text-accent" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-primary mt-2 mb-2">
              Create & Build
            </h3>
            <p className="text-text-dark/90 text-lg">Make your own amazing science projects.</p>
            <Link to="/diy-lab" className="mt-4 text-highlight font-semibold hover:underline">
              Find a Project &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. INSTANT FACT MACHINE */}
      <div className="bg-linear-to-r from-secondary/10 to-primary/10 py-20 mt-10">
          <div className="container mx-auto px-6">
              <motion.h2
                  variants={itemVariants}
                  className="font-display text-4xl font-bold text-primary text-center mb-12"
              >
                  🤯 Instant Science Blast! 🤯
              </motion.h2>

              <div className="bg-white p-8 rounded-xl-fancy shadow-fancy-md border-t-8 border-accent text-center max-w-4xl mx-auto min-h-[150px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                      <motion.p
                          key={currentFactIndex}
                          initial={{ y: 20, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -20, opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="font-sans text-2xl font-semibold text-text-dark leading-snug"
                      >
                          {instantFacts[currentFactIndex]}
                      </motion.p>
                  </AnimatePresence>
              </div>

              <div className="text-center mt-6">
                  <Link 
                      to="/exhibits"
                      className="inline-block text-secondary font-bold hover:underline"
                  >
                      Want more amazing facts? See all exhibits! &rarr;
                  </Link>
              </div>
          </div>
      </div>
      
      {/* 5. FEATURED EXHIBIT */}
      {featuredExhibit && (
        <div className="bg-bg-light py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl font-bold text-primary text-center mb-12"
            >
              Today's Quirky Highlight: <span className="text-secondary">{featuredExhibit.name}!</span>
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 lg:p-12 rounded-xl-fancy shadow-fancy-md border-t-8 border-accent"
            >
              <motion.div
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
                className="w-full h-80 overflow-hidden rounded-lg-fancy shadow-lg border-4 border-primary/20"
              >
                <img
                  src={featuredExhibit.image}
                  alt={featuredExhibit.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div>
                <h3 className="font-display text-4xl font-extrabold text-primary mb-4">
                  {featuredExhibit.name}
                </h3>
                <p className="text-lg text-text-dark/90 leading-relaxed mb-6">
                  {featuredExhibit.description.substring(0, 150)}... **It's cooler than it sounds!**
                </p>
                <Link
                  to={`/exhibits/${featuredExhibit.id}`}
                  className="inline-block bg-secondary text-white font-bold text-lg py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform"
                >
                  Discover More! 🔎
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Home;