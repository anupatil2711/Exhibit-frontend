import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.2 } },
  };

  return (
    <motion.nav
      className="bg-white shadow-fancy-sm sticky top-0 z-50 py-4"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-display text-3xl font-extrabold text-primary">
          SciSpark
        </Link>
        <ul className="flex gap-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold text-lg transition-colors relative group ${isActive ? 'text-secondary' : 'text-text-dark hover:text-secondary'}`
              }
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/exhibits"
              className={({ isActive }) =>
                `font-semibold text-lg transition-colors relative group ${isActive ? 'text-secondary' : 'text-text-dark hover:text-secondary'}`
              }
            >
              Exhibits
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </NavLink>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <NavLink
                to="/diy-lab"
                className="bg-highlight text-white font-bold py-2 px-6 rounded-full shadow-md text-lg"
              >
                DIY Lab!
              </NavLink>
            </motion.div>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;