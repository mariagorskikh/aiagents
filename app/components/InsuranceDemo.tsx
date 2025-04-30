"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Insurance demo steps
const demoSteps = [
  {
    id: "input",
    title: "User Request",
    description: "Initial insurance request for your new vehicle.",
    content: {
      userInput: "I just bought a new Tesla Model Y. Can you find me the best insurance rates?",
      agentResponse: "I'll help you find the best insurance for your new Tesla Model Y. I'll need to gather some basic information first."
    }
  },
  {
    id: "info",
    title: "Information Gathering",
    description: "The agent collects necessary details for accurate quotes.",
    content: {
      questions: [
        { question: "Where is your primary residence?", answer: "San Francisco, CA" },
        { question: "What's your driving history like?", answer: "Clean record, no accidents in 5+ years" },
        { question: "Do you have any existing policies with insurers?", answer: "Home insurance with State Farm" },
        { question: "Estimated annual mileage?", answer: "12,000 miles" }
      ],
      agentResponse: "Thanks for providing these details. I'll now query multiple insurance providers for the best rates."
    }
  },
  {
    id: "searching",
    title: "Searching Providers",
    description: "The agent contacts multiple insurance companies in real-time.",
    content: {
      providers: [
        { name: "Progressive", status: "completed", icon: "✓" },
        { name: "Geico", status: "completed", icon: "✓" },
        { name: "State Farm", status: "completed", icon: "✓" },
        { name: "Allstate", status: "completed", icon: "✓" },
        { name: "Liberty Mutual", status: "completed", icon: "✓" },
        { name: "Farmers", status: "completed", icon: "✓" },
        { name: "Nationwide", status: "completed", icon: "✓" },
        { name: "USAA", status: "completed", icon: "✓" },
        { name: "Travelers", status: "completed", icon: "✓" },
        { name: "American Family", status: "completed", icon: "✓" }
      ],
      agentResponse: "I've contacted all major insurance providers. Now analyzing the quotes to find your best options."
    }
  },
  {
    id: "comparison",
    title: "Quote Comparison",
    description: "The agent analyzes and compares all quotes based on your preferences.",
    content: {
      quotes: [
        { 
          provider: "Progressive", 
          monthlyRate: "$175", 
          coverage: "Full coverage", 
          deductible: "$500",
          features: ["Roadside assistance", "Rental car coverage", "Gap insurance"], 
          rating: 4.3,
          bestFor: "Best overall value"
        },
        { 
          provider: "State Farm", 
          monthlyRate: "$168", 
          coverage: "Full coverage", 
          deductible: "$750",
          features: ["Accident forgiveness", "Diminishing deductible", "EV discount"], 
          rating: 4.5,
          bestFor: "Best for bundling with your existing policy"
        },
        { 
          provider: "USAA", 
          monthlyRate: "$155", 
          coverage: "Full coverage", 
          deductible: "$1,000",
          features: ["Military discount", "Safe driver rewards", "EV charging coverage"], 
          rating: 4.8,
          bestFor: "Lowest premium option"
        }
      ],
      agentResponse: "I've identified the three best policies based on value, coverage, and your existing home insurance with State Farm."
    }
  },
  {
    id: "recommendation",
    title: "Recommendation",
    description: "The agent recommends the best option with detailed explanation.",
    content: {
      recommendation: {
        provider: "State Farm",
        reasoning: [
          "15% bundling discount with your existing home policy",
          "Strong EV-specific coverage for Tesla",
          "Higher customer satisfaction ratings for Tesla owners",
          "Lower overall cost of ownership over 3 years"
        ]
      },
      agentResponse: "Based on my analysis, I recommend the State Farm policy. With your existing home insurance bundle, you'll save 15% annually while getting premium EV coverage."
    }
  },
  {
    id: "finalization",
    title: "Policy Finalization",
    description: "The agent completes the application and policy setup.",
    content: {
      steps: [
        { name: "Application submission", status: "completed" },
        { name: "Document verification", status: "completed" },
        { name: "Payment processing", status: "completed" },
        { name: "Policy activation", status: "completed" }
      ],
      policyDetails: {
        provider: "State Farm",
        policyNumber: "EV-24985-CA",
        startDate: "June 1, 2024",
        documentLink: "Tesla_ModelY_Insurance_Policy.pdf"
      },
      agentResponse: "Great news! I've finalized your State Farm policy. Your coverage begins June 1, 2024. I've saved the policy documents to your device and added the details to your calendar."
    }
  }
];

// Typing animation
const typingAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.03,
    }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 }
};

// Character by character text animation component
const AnimatedText = ({ text, className, delay = 0 }) => {
  return (
    <motion.p 
      className={className}
      initial="hidden"
      animate="visible"
      variants={typingAnimation}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterAnimation}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Provider status component
const ProviderStatus = ({ providers, className }) => {
  const [completedCount, setCompletedCount] = useState(0);
  
  useEffect(() => {
    if (completedCount < providers.length) {
      const timer = setTimeout(() => {
        setCompletedCount(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [completedCount, providers.length]);
  
  return (
    <div className={`${className} grid grid-cols-2 gap-2`}>
      {providers.map((provider, i) => (
        <motion.div 
          key={i}
          className={`p-2 rounded-lg flex items-center text-sm ${
            i < completedCount ? 'bg-accent/20' : 'bg-white/5'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div 
            className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
              i < completedCount ? 'bg-accent/50' : 'bg-white/10'
            }`}
            animate={i === completedCount - 1 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {i < completedCount ? provider.icon : ""}
          </motion.div>
          <span>{provider.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Quote card component
const QuoteCard = ({ quote, isSelected, onSelect, delay }) => (
  <motion.div 
    className={`p-4 rounded-lg ${isSelected ? 'bg-accent/30 border border-accent' : 'bg-white/5'}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 5 }}
    onClick={onSelect}
  >
    <div className="flex justify-between items-center mb-3">
      <span className="font-bold text-lg">{quote.provider}</span>
      <span className="text-accent font-bold text-xl">{quote.monthlyRate}/mo</span>
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">Coverage:</span>
        <span>{quote.coverage}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">Deductible:</span>
        <span>{quote.deductible}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">Rating:</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.floor(quote.rating) ? "text-accent" : "text-white/20"}>★</span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="text-xs font-medium text-accent mb-2">{quote.bestFor}</div>
      <div className="flex flex-wrap gap-1">
        {quote.features.map((feature, i) => (
          <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5">{feature}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Recommendation component
const RecommendationView = ({ recommendation }) => (
  <motion.div 
    className="bg-black/20 rounded-lg p-4 border border-accent/30"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <div className="flex items-center mb-4">
      <motion.div 
        className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: 3, duration: 1 }}
      >
        <span className="text-accent text-xl">✓</span>
      </motion.div>
      <div>
        <div className="font-medium text-lg">Recommended Provider</div>
        <div className="text-2xl font-bold">{recommendation.provider}</div>
      </div>
    </div>
    
    <div className="space-y-2 mt-4">
      <div className="text-sm font-medium text-text-secondary">Why this is your best option:</div>
      {recommendation.reasoning.map((reason, i) => (
        <motion.div 
          key={i}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + (i * 0.2) }}
        >
          <span className="text-accent mr-2">•</span>
          <span className="text-sm">{reason}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Policy finalization component
const PolicyFinalization = ({ steps, policyDetails }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);
  
  return (
    <motion.div 
      className="bg-black/20 rounded-lg p-4 border border-accent/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="mb-4">
        <div className="text-sm font-medium text-text-secondary mb-2">Policy Setup Progress</div>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div 
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  i < currentStep ? 'bg-success/20 text-success' : 'bg-white/10'
                }`}
                animate={i === currentStep - 1 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {i < currentStep ? "✓" : i + 1}
              </motion.div>
              <span className={i < currentStep ? 'text-white' : 'text-text-secondary'}>{step.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {currentStep === steps.length && (
        <motion.div 
          className="mt-6 border-t border-white/10 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm font-medium text-text-secondary mb-2">Policy Details</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-text-secondary">PROVIDER</div>
              <div className="font-medium">{policyDetails.provider}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary">POLICY NUMBER</div>
              <div className="font-medium">{policyDetails.policyNumber}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary">START DATE</div>
              <div className="font-medium">{policyDetails.startDate}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary">DOCUMENTS</div>
              <motion.div 
                className="flex items-center font-medium text-accent"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3M6 11l6-6 6 6"/>
                </svg>
                {policyDetails.documentLink}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function InsuranceDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(1); // State Farm selected by default
  const sectionRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  
  // Auto-advance demo when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setAutoPlay(true);
        } else {
          setIsVisible(false);
          setAutoPlay(false);
          setActiveStep(0);
        }
      },
      { threshold: 0.4 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Auto-advance through demo steps
  useEffect(() => {
    let timer;
    if (autoPlay && activeStep < demoSteps.length - 1) {
      timer = setTimeout(() => {
        setActiveStep(prevStep => prevStep + 1);
      }, 5000); // Advance every 5 seconds
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoPlay, activeStep]);
  
  // Get current step content
  const currentStep = demoSteps[activeStep];
  
  // Dynamic content rendering based on active step
  const renderDemoContent = () => {
    switch (activeStep) {
      case 0: // User Input
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <AnimatedText 
                text={currentStep.content.userInput} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={2}
              />
            </div>
          </div>
        );
        
      case 1: // Information Gathering
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-6">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="space-y-3">
              {currentStep.content.questions.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white/5 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (idx * 0.3) }}
                >
                  <div className="text-sm text-text-secondary mb-1">{item.question}</div>
                  <div className="font-medium">{item.answer}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Searching Providers
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-6">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <ProviderStatus 
              providers={currentStep.content.providers} 
              className="mt-4" 
            />
          </div>
        );
        
      case 3: // Quote Comparison
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto pb-2">
              {currentStep.content.quotes.map((quote, idx) => (
                <QuoteCard 
                  key={idx}
                  quote={quote}
                  isSelected={idx === selectedQuote}
                  onSelect={() => setSelectedQuote(idx)}
                  delay={1 + (idx * 0.2)}
                />
              ))}
            </div>
          </div>
        );
        
      case 4: // Recommendation
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <RecommendationView recommendation={currentStep.content.recommendation} />
          </div>
        );
        
      case 5: // Policy Finalization
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <PolicyFinalization 
              steps={currentStep.content.steps}
              policyDetails={currentStep.content.policyDetails}
            />
          </div>
        );
        
      default:
        return <div className="text-white">Loading...</div>;
    }
  };
  
  return (
    <section id="insurance-demo" ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent opacity-10 rounded-full blur-[150px]"></div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, scale, y }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              Insurance Made Simple
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Watch how AIA Browser helps you find, compare, and secure the best insurance policy for your new vehicle.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Demo Steps Navigation - Now horizontal and centered */}
          <div className="glass-panel p-4 reveal-on-scroll w-full max-w-4xl mb-4">
            <h3 className="text-xl font-semibold mb-3 text-center">Car Insurance Demo</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {demoSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`text-left p-4 rounded-lg transition-all ${
                    activeStep === index 
                      ? 'bg-accent/20 border border-accent/40' 
                      : 'hover:bg-white/5'
                  }`}
                  style={{ width: 'calc(16.66% - 12px)' }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      activeStep === index ? 'bg-accent' : 'bg-white/10'
                    }`}>
                      {index + 1}
                    </div>
                    <h4 className="font-medium text-center text-sm">{step.title}</h4>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Restart Demo Button */}
            <motion.button
              className="mt-6 py-3 glass-button flex justify-center items-center mx-auto w-48"
              onClick={() => {
                setActiveStep(0);
                setAutoPlay(true);
              }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12C20 7.02944 15.9706 3 11 3C7.87781 3 5.1325 4.60879 3.64421 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 7V3H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Restart Demo
            </motion.button>
          </div>

          {/* Demo Visualization - Now full width and centered */}
          <div className="w-full max-w-5xl">
            <motion.div 
              className="glass-panel aspect-video rounded-xl overflow-hidden relative reveal-on-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Browser UI frame */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-black/20 backdrop-blur-md flex items-center px-4 z-10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto glass-panel px-4 py-1 text-sm rounded-full">
                  agent.aia.browser/insurance-assistant
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="bg-gradient-to-br from-primary to-secondary h-full flex items-center justify-center px-6 pt-10 pb-4">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStep}
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderDemoContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep / (demoSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 