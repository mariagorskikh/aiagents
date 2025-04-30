"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Vision() {
  const sectionRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  const visionPoints = [
    "Verifiable agent identities and capabilities",
    "Seamless agent-to-agent communication",
    "Autonomous task orchestration across services",
    "User-controlled permission systems",
    "Decentralized agent marketplace"
  ];
  
  return (
    <section id="vision" ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-secondary to-primary">
      <motion.div 
        className="max-w-7xl mx-auto"
        style={{ opacity, y }}
      >
        <motion.div 
          className="glass-panel p-10 lg:p-16 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
                  The Command Center for Synthetic Cognition
                </span>
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                This isn't just a window to the web — it's a command center for the coming age of synthetic cognition. In the AIA Browser, every user is a node in a global intelligence mesh.
              </p>
              <ul className="space-y-4 mb-8">
                {visionPoints.map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="text-accent mr-3 mt-1">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.button 
                className="accent-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Waitlist
              </motion.button>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="aspect-square max-w-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent/30 to-accent-light/10 p-1">
                <div className="w-full h-full rounded-xl glass-panel flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-accent/20"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="absolute inset-4 rounded-full bg-accent/40"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="absolute inset-8 rounded-full bg-accent/60"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                      ></motion.div>
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Global Intelligence Mesh</h3>
                    <p className="text-text-secondary">
                      Connect with and utilize a network of specialized agents to solve complex problems.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 