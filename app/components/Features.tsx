"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DemoComponentProps {
  inView: boolean;
}

// New interactive features with mini-demos
const features = [
  {
    title: "Contextual Memory",
    description: "Agents understand your history and preferences, accessing prior interactions to provide personalized assistance.",
    demoComponent: ({ inView }: DemoComponentProps) => {
      const [typing, setTyping] = useState(inView);
      const [showMemory, setShowMemory] = useState(false);
      
      // Start the typing animation when component is in view
      if (inView && !typing) setTyping(true);
      
      // Simulate memory retrieval on animation completion
      if (typing && !showMemory) {
        setTimeout(() => setShowMemory(true), 2000);
      }
      
      return (
        <div className="demo-container bg-black/20 rounded-lg p-4 h-48 overflow-hidden">
          <div className="text-xs text-accent mb-2">USER REQUEST</div>
          <div className="font-mono text-sm bg-black/30 p-2 rounded mb-3">
            Find me car insurance for my new Tesla
          </div>
          
          {showMemory && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent/10 border border-accent/20 rounded p-2"
            >
              <div className="text-xs text-accent mb-1">AGENT MEMORY ACCESSED</div>
              <div className="text-xs grid grid-cols-2 gap-x-4 gap-y-1">
                <div>• Previous vehicle: BMW 330i</div>
                <div>• Clean driving record</div>
                <div>• Previous policy: AllState</div>
                <div>• Annual mileage: ~12,000</div>
                <div>• Preferred deductible: $500</div>
                <div>• Bundled with home insurance</div>
              </div>
            </motion.div>
          )}
        </div>
      );
    }
  },
  {
    title: "Agent Discovery Network",
    description: "Search and connect with verified autonomous agents through the NANDA vector database.",
    demoComponent: ({ inView }: DemoComponentProps) => {
      const [searchComplete, setSearchComplete] = useState(false);
      const [activeAgent, setActiveAgent] = useState<number | null>(null);
      
      // Initiate search animation when in view
      if (inView && !searchComplete) {
        setTimeout(() => setSearchComplete(true), 1500);
      }
      
      return (
        <div className="demo-container bg-black/20 rounded-lg p-4 h-48 overflow-hidden">
          <div className="flex items-center mb-3">
            <div className="bg-black/30 flex-1 rounded-full p-1 px-3 flex items-center text-sm">
              <span className="text-text-secondary mr-2">Search: </span>
              <span>Insurance providers</span>
            </div>
            <motion.div 
              animate={{ 
                rotate: searchComplete ? 0 : 360,
              }}
              transition={{ 
                duration: 1, 
                repeat: searchComplete ? 0 : Infinity,
                ease: "linear" 
              }}
              className="ml-2 p-1"
            >
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 16L11 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
          
          {searchComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {["Progressive Agent", "Geico Agent", "StateFarm Agent"].map((agent, idx) => (
                <motion.div 
                  key={agent}
                  className={`flex items-center justify-between py-1 px-2 rounded ${activeAgent === idx ? 'bg-accent/20' : 'bg-black/20'}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  onClick={() => setActiveAgent(idx)}
                  whileHover={{ backgroundColor: 'rgba(156, 39, 176, 0.2)' }}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">{agent}</span>
                  </div>
                  <div className="text-xs text-text-secondary">✓ Verified</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      );
    }
  },
  {
    title: "Agent Interactions",
    description: "Watch your agent negotiate, authorize transactions, and exchange data with other verified agents.",
    demoComponent: ({ inView }: DemoComponentProps) => {
      const [step, setStep] = useState(0);
      
      // Progress through conversation when in view
      if (inView && step < 4) {
        setTimeout(() => setStep(s => s + 1), 2000);
      }
      
      const conversation = [
        { agent: "UserAgent", message: "Requesting quotes for Tesla Model Y..." },
        { agent: "ProgressiveAgent", message: "Premium: $175/mo with EV discount" },
        { agent: "UserAgent", message: "Authorizing data sharing for verification..." },
        { agent: "ProgressiveAgent", message: "Policy #EV8294 confirmed ✓" }
      ];
      
      return (
        <div className="demo-container bg-black/20 rounded-lg p-4 h-48 overflow-y-auto">
          <div className="text-xs text-accent mb-2">AGENT CONVERSATION</div>
          
          <div className="space-y-2">
            {conversation.slice(0, step).map((message, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2 rounded-lg ${message.agent === "UserAgent" ? 'bg-accent/10 border-l-2 border-accent ml-4' : 'bg-black/30 mr-4'}`}
              >
                <div className="text-xs font-medium mb-1">{message.agent}</div>
                <div className="text-sm">{message.message}</div>
              </motion.div>
            ))}
            
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 border border-green-500/30 bg-green-500/10 rounded p-2 text-center"
              >
                <span className="text-sm text-green-400">Transaction Complete</span>
              </motion.div>
            )}
          </div>
        </div>
      );
    }
  },
  {
    title: "Responsive Visualization",
    description: "Agents return structured data that our browser instantly transforms into interactive interfaces.",
    demoComponent: ({ inView }: DemoComponentProps) => {
      const [step, setStep] = useState(0);
      
      // Progress through the visualization steps when in view
      if (inView && step < 4) {
        setTimeout(() => setStep(s => s + 1), 1200);
      }
      
      // Sample JSON data that will be visualized
      const jsonData = {
        policy: "EV8294",
        provider: "Progressive",
        coverage: "Full",
        premium: 175,
        startDate: "2024-06-01",
        endDate: "2025-06-01",
        vehicle: "Tesla Model Y"
      };
      
      return (
        <div className="demo-container bg-black/20 rounded-lg p-4 h-48 overflow-auto">
          {/* Step 1: Show JSON data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: step >= 1 ? 1 : 0,
              height: step >= 2 ? "auto" : "100%",
              scale: step >= 2 ? 0.95 : 1,
              y: step >= 2 ? -5 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="text-xs space-y-1 mb-2"
          >
            <div className="text-accent mb-1">AGENT JSON RESPONSE</div>
            <div className="font-mono text-xs bg-black/30 p-2 rounded overflow-hidden">
              {step >= 1 && (
                <>{JSON.stringify(jsonData, null, step === 1 ? 2 : 0)}</>
              )}
            </div>
          </motion.div>
          
          {/* Step 2: Show component structure being generated */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: step >= 2 ? 1 : 0,
                height: step >= 3 ? "auto" : "auto",
                scale: step >= 3 ? 0.9 : 1,
                y: step >= 3 ? -5 : 0
              }}
              transition={{ duration: 0.4 }}
              className="text-xs mb-2"
            >
              <div className="text-accent mb-1">GENERATING INTERFACE</div>
              <div className="font-mono text-xs bg-black/40 p-2 rounded overflow-hidden text-emerald-400">
                <span>{'<Card>'}</span><br/>
                <span className="ml-2">{'<PolicyHeader provider="'}<span className="text-accent">{jsonData.provider}</span>{'" />'}</span><br/>
                <span className="ml-2">{'<CoverageDetails'}</span><br/>
                <span className="ml-4">{'policy="'}<span className="text-accent">{jsonData.policy}</span>{'"'}</span><br/>
                <span className="ml-4">{'coverage="'}<span className="text-accent">{jsonData.coverage}</span>{'"'}</span><br/>
                <span className="ml-4">{'vehicle="'}<span className="text-accent">{jsonData.vehicle}</span>{'" />'}</span><br/>
                <span className="ml-2">{'<PaymentSchedule premium={'}<span className="text-accent">{jsonData.premium}</span>{'} />'}</span><br/>
                <span className="ml-2">{'<DownloadButton />'}</span><br/>
                <span>{'</Card>'}</span>
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Show the actual rendered UI with real UI components */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="mt-2"
            >
              {/* This is the actual card UI implementation */}
              <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-xl">
                {/* Card header with company branding */}
                <div className="bg-gradient-to-r from-purple-800/30 to-indigo-900/30 p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mr-2">
                      P
                    </div>
                    <div>
                      <div className="font-medium text-sm">{jsonData.provider} Insurance</div>
                      <div className="text-xs text-gray-400">Policy #{jsonData.policy}</div>
                    </div>
                  </div>
                  <div className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
                
                {/* Coverage details section */}
                <div className="p-3 border-b border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-400">Coverage Type</div>
                    <div className="text-sm font-medium">{jsonData.coverage}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Vehicle</div>
                    <div className="text-sm font-medium">
                      <motion.span
                        animate={{ color: ["#ffffff", "#9c27b0", "#ffffff"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        {jsonData.vehicle}
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                {/* Payment details section */}
                <div className="p-3 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Monthly Premium</div>
                    <div className="text-lg font-semibold">${jsonData.premium}</div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-400">Policy Period</div>
                    <div className="text-xs">
                      {new Date(jsonData.startDate).toLocaleDateString()} - {new Date(jsonData.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex p-3 space-x-2 justify-end">
                  <button className="text-xs bg-black/30 hover:bg-black/40 px-3 py-1.5 rounded transition-colors">
                    View Details
                  </button>
                  <button className="text-xs bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      );
    }
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  // Check if section is in view to trigger animations
  if (typeof window !== 'undefined') {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsInView(isVisible);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 500); // Initial check
  }
  
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
              The Interface
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
              Unlike traditional browsers built for static documents or social feeds, AIA is designed for <span className="text-accent-light font-medium">dynamic, intelligent entities</span> that collaborate to accomplish your goals.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-panel p-6 h-full relative overflow-hidden"
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
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-secondary mb-4">{feature.description}</p>
              
              {/* Mini interactive demo */}
              <div className="mt-3">
                {feature.demoComponent({ inView: isInView })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 