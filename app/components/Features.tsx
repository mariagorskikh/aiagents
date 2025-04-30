"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: "Agent Discovery",
    description: "Find and connect with verified autonomous agents across domains, identities, and realities.",
    icon: "<svg className='w-10 h-10 text-accent' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>",
  },
  {
    title: "Live Interactions",
    description: "Search results aren't links — they're live agents ready to act on your behalf.",
    icon: "<svg className='w-10 h-10 text-accent' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' stroke='currentColor' strokeWidth='2'/><path d='M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/></svg>",
  },
  {
    title: "Verifiable Connections",
    description: "Every interaction is transparent and verifiable through our secure protocol.",
    icon: "<svg className='w-10 h-10 text-accent' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke='currentColor' strokeWidth='2'/><path d='M15 9L9 15M9 9L15 15' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/></svg>",
  },
  {
    title: "Composable Intelligence",
    description: "Connect multiple agents to create powerful workflows that solve complex problems.",
    icon: "<svg className='w-10 h-10 text-accent' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4 20L20 20M4 12L20 12M4 4L20 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/></svg>",
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 bg-secondary relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px]" 
          style={{ 
            top: '10%', 
            left: '60%',
            x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]) 
          }}
        />
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full bg-accent-light/10 blur-[80px]" 
          style={{ 
            top: '50%', 
            left: '10%',
            x: useTransform(scrollYProgress, [0, 1], [100, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]) 
          }}
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, y }}
      >
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-xs uppercase tracking-widest text-accent-light font-semibold mb-2">Redefining Web Interaction</div>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
            <motion.span 
              className="bg-gradient-to-r from-white via-accent-light to-accent bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              The Agent Internet
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent inline-block ml-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Revolution
            </motion.span>
          </h2>
          
          <motion.div
            className="max-w-3xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Beyond static pages and passive content, AIA creates a living ecosystem where <span className="text-accent-light font-medium">intelligent agents collaborate</span> and <span className="text-accent-light font-medium">execute real-world tasks</span> autonomously on your behalf.
            </p>
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-accent-light to-transparent"
              animate={{ 
                width: ["10%", "50%", "10%"], 
                opacity: [0.3, 1, 0.3] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-panel p-8 h-full relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.15) }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(78, 84, 255, 0.2), 0 10px 10px -5px rgba(78, 84, 255, 0.1)"
              }}
            >
              <motion.div 
                className="absolute -right-6 -top-6 w-12 h-12 rounded-full bg-accent/30 blur-lg"
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />
              
              <motion.div 
                className="mb-5 relative"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              ></motion.div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
              
              <motion.div 
                className="w-12 h-0.5 bg-accent/50 mt-4"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 