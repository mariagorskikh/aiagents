"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import EmailPopup from './EmailPopup';

export default function Hero() {
  const heroRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
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
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Enhanced Dark & Cool Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black opacity-95" />
        
        {/* Slower animated gradient background */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 85% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 60%),
              radial-gradient(circle at 45% 85%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
              linear-gradient(145deg, rgba(15, 15, 26, 0.9) 0%, rgba(30, 41, 59, 0.7) 35%, rgba(51, 65, 85, 0.6) 70%, rgba(15, 15, 26, 0.9) 100%)
            `
          }}
          animate={{
            background: [
              `radial-gradient(circle at 15% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
               radial-gradient(circle at 85% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 60%),
               radial-gradient(circle at 45% 85%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
               linear-gradient(145deg, rgba(15, 15, 26, 0.9) 0%, rgba(30, 41, 59, 0.7) 35%, rgba(51, 65, 85, 0.6) 70%, rgba(15, 15, 26, 0.9) 100%)`,
              `radial-gradient(circle at 75% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
               radial-gradient(circle at 25% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 60%),
               radial-gradient(circle at 65% 25%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
               linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 15, 26, 0.9) 35%, rgba(51, 65, 85, 0.6) 70%, rgba(30, 41, 59, 0.7) 100%)`,
              `radial-gradient(circle at 15% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
               radial-gradient(circle at 85% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 60%),
               radial-gradient(circle at 45% 85%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
               linear-gradient(145deg, rgba(15, 15, 26, 0.9) 0%, rgba(30, 41, 59, 0.7) 35%, rgba(51, 65, 85, 0.6) 70%, rgba(15, 15, 26, 0.9) 100%)`
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle floating orbs - slower and darker */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 100%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [-30, 30, -30],
            y: [-20, 20, -20],
            rotate: [0, 120, 240, 360]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)',
            filter: 'blur(50px)'
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [20, -20, 20],
            y: [15, -15, 15],
            rotate: [360, 240, 120, 0]
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
            filter: 'blur(45px)'
          }}
          animate={{
            scale: [0.95, 1.2, 0.95],
            x: [-25, 25, -25],
            y: [-18, 18, -18],
            rotate: [0, -120, -240, -360]
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Slower floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.6)' : 
                         i % 3 === 1 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(139, 92, 246, 0.6)'
            }}
            animate={{
              y: [-15, -80, -15],
              x: [-8, 8, -8],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Subtle mesh gradient overlay - very slow */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                rgba(59, 130, 246, 0.03) 0deg,
                rgba(99, 102, 241, 0.02) 120deg,
                rgba(139, 92, 246, 0.03) 240deg,
                rgba(59, 130, 246, 0.03) 360deg
              )
            `,
            filter: 'blur(2px)'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        />
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
          <span className="bg-gradient-to-r from-slate-100 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
            AIA Interface
          </span>
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light"
          variants={item}
        >
          The first true portal into the Agent Internet — a living interface where autonomous agents can be discovered, verified, and interacted with across domains.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mt-10"
          variants={item}
        >
          <motion.button 
            onClick={() => setIsPopupOpen(true)}
            className="accent-button px-8 py-4 text-lg font-semibold relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            Join Beta Waitlist
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Email Popup */}
      <EmailPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </section>
  );
} 