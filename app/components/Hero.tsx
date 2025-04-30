"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Stagger animation for children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0F0F1A] opacity-90"></div>
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent opacity-20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        className="z-10 max-w-5xl text-center space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity, scale, y }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight glow"
          variants={item}
        >
          <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">AIA Browser</span>
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light"
          variants={item}
        >
          The first true portal into the Agent Internet — a living interface where autonomous agents can be discovered, verified, and interacted with across domains.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
          variants={item}
        >
          <motion.button 
            className="accent-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore the Browser
          </motion.button>
          <motion.button 
            className="glass-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Mouse scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div 
          className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-3"
          animate={{ boxShadow: ["0 0 5px rgba(255,255,255,0.1)", "0 0 20px rgba(255,255,255,0.3)", "0 0 5px rgba(255,255,255,0.1)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-white rounded-full"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5 
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 