import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Quiz({ quizData }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  if (!quizData || !quizData.questions) {
    return <p>Loading quiz...</p>;
  }

  return (
    <motion.div
      className="bg-accent/10 border-4 border-accent/30 rounded-lg-fancy p-6 shadow-inner"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <h2 className="font-display text-3xl font-bold text-primary text-center mb-6">
        {quizData.title}
      </h2>

      <AnimatePresence mode="wait">
        {showResults ? (
          <motion.div
            key="results"
            variants={quizItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center"
          >
            <h3 className="font-display text-2xl font-bold text-text-dark mb-4">
              You scored {score} out of {quizData.questions.length}!
            </h3>
            <motion.button
              onClick={restartQuiz}
              whileHover={{ scale: 1.05, backgroundColor: '#FFD700' }}
              whileTap={{ scale: 0.95, rotate: -3 }}
              className="bg-secondary text-white font-bold py-2 px-6 rounded-full shadow-md text-lg"
            >
              Try Again!
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            variants={quizItemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="quiz-question"
          >
            <p className="font-sans text-xl font-semibold text-text-dark mb-5 text-center">
              {currentQuestion + 1}. {quizData.questions[currentQuestion].questionText}
            </p>
            <ul className="flex flex-col gap-3">
              {quizData.questions[currentQuestion].options.map((option, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98, x: -5 }}
                >
                  <button
                    onClick={() => handleAnswer(option.isCorrect)}
                    className="w-full bg-white border-2 border-primary/20 rounded-full py-3 px-5 text-left font-semibold text-primary-dark transition-all duration-200 hover:bg-highlight/10 hover:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
                  >
                    {option.optionText}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Quiz;