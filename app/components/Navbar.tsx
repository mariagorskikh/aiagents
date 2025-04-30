"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0.9, 0.95, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(8px)"]);
  
  const navItems = ["Features", "Demo", "Vision"];
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/40 backdrop-blur-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              AIA
            </span>
          </span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.a 
              key={i} 
              href={`#${item.toLowerCase()}`} 
              className="text-text-secondary hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                delay: i * 0.1 
              }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
} 