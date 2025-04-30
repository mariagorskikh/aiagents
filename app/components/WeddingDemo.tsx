"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Wedding demo steps showing agent collaboration
const demoSteps = [
  {
    id: "request",
    title: "Initial Request",
    description: "You provide the basic requirements for your wedding.",
    content: {
      userInput: "We want to plan our wedding for around 100 guests in the San Francisco area this fall.",
      agentResponse: "I'll coordinate with specialized agents to plan your perfect wedding. Let's start by finding optimal dates based on venues and your VIP guests' availability."
    }
  },
  {
    id: "agents",
    title: "Agent Team",
    description: "AI assembles a specialized team of agents to handle different aspects.",
    content: {
      agents: [
        { name: "VenueAgent", role: "Venue location and booking", status: "active" },
        { name: "GuestAgent", role: "Guest list management and RSVP tracking", status: "active" },
        { name: "CateringAgent", role: "Food, drinks, and cake", status: "awaiting" },
        { name: "DecorAgent", role: "Decoration and theme coordination", status: "awaiting" },
        { name: "BudgetAgent", role: "Cost tracking and optimization", status: "active" }
      ],
      agentResponse: "I've assembled a collaborative team of specialized agents. They'll work in parallel but share information to optimize your wedding planning."
    }
  },
  {
    id: "availability",
    title: "Dates & Venue",
    description: "Agents dynamically evaluate venue availability against key guest schedules.",
    content: {
      agentConversation: [
        { agent: "VenueAgent", message: "I've identified 5 top venues in San Francisco available in September-October." },
        { agent: "GuestAgent", message: "Analyzing calendar data from 15 VIP guests. October 10-20 shows highest availability." },
        { agent: "VenueAgent", message: "Cross-referencing with venue availability. The Palace Hotel and SF Botanical Garden are both available Oct 15 and Oct 22." },
        { agent: "BudgetAgent", message: "SF Botanical Garden pricing is within budget for both dates. Palace Hotel requires a minimum 20% budget increase." }
      ],
      venueOptions: [
        { 
          name: "San Francisco Botanical Garden", 
          date: "October 15, 2024", 
          price: "$12,500",
          guestAvailability: "92%",
          image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop"
        },
        { 
          name: "San Francisco Botanical Garden", 
          date: "October 22, 2024", 
          price: "$11,800",
          guestAvailability: "84%",
          image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop"
        },
        { 
          name: "The Palace Hotel", 
          date: "October 15, 2024", 
          price: "$18,200",
          guestAvailability: "92%",
          image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop"
        }
      ],
      recommendedOption: 0,
      agentResponse: "Based on venue availability, your budget, and your guests' schedules, I recommend booking the SF Botanical Garden on October 15."
    }
  },
  {
    id: "coordination",
    title: "Vendor Coordination",
    description: "Multiple agents negotiate with vendors while collaborating on theme consistency.",
    content: {
      theme: "Rustic Garden Elegance",
      agentConversation: [
        { agent: "CateringAgent", message: "Contacting top 5 caterers that specialize in garden weddings." },
        { agent: "DecorAgent", message: "Based on the garden venue and fall date, I recommend a rustic elegance theme with natural materials and seasonal colors." },
        { agent: "CateringAgent", message: "Green Leaf Catering can provide a seasonal menu with locally-sourced ingredients that complements the theme." },
        { agent: "DecorAgent", message: "I've found rentals for wooden farm tables and chairs that fit the rustic theme perfectly." },
        { agent: "BudgetAgent", message: "The combined catering and decor selections are within budget. Recommend approving both." }
      ],
      decisions: [
        { category: "Catering", selection: "Green Leaf Catering", status: "Approved" },
        { category: "Tables & Chairs", selection: "Bay Area Event Rentals", status: "Approved" },
        { category: "Floral Arrangements", selection: "Wild Bloom Florals", status: "Pending approval" }
      ],
      agentResponse: "The catering and decor agents have selected vendors that complement your garden venue with a cohesive rustic elegance theme while staying within budget."
    }
  },
  {
    id: "communications",
    title: "Guest Management",
    description: "AI manages the guest list, RSVPs, and personalized communication.",
    content: {
      stats: { 
        invited: 112, 
        responded: 89, 
        attending: 78, 
        declined: 11, 
        pending: 23 
      },
      specialRequests: [
        { guest: "John & Sarah Miller", request: "Vegetarian meals", status: "Noted" },
        { guest: "The Patel Family", request: "High chair for toddler", status: "Arranged" },
        { guest: "Robert Chen", request: "Wheelchair accessibility", status: "Confirmed" }
      ],
      communicationLog: [
        { type: "Save the Date", sent: "May 15", status: "Delivered to all" },
        { type: "Formal Invitations", sent: "July 10", status: "Delivered to all" },
        { type: "RSVP Reminders", sent: "August 5", status: "Sent to 35 pending guests" },
        { type: "Venue Details", sent: "September 20", status: "Scheduled to attending guests" }
      ],
      agentResponse: "GuestAgent has tracked all RSVPs and special requests. CateringAgent has been notified of dietary requirements. All guest arrangements are on track."
    }
  },
  {
    id: "finalization",
    title: "Final Dashboard",
    description: "A comprehensive view of all wedding details, timeline, and confirmation.",
    content: {
      summary: {
        date: "October 15, 2024",
        venue: "San Francisco Botanical Garden",
        guestCount: 78,
        budget: {
          original: "$25,000",
          current: "$24,350",
          status: "Under budget"
        }
      },
      timeline: [
        { time: "3:30 PM", event: "Guest arrival" },
        { time: "4:00 PM", event: "Ceremony" },
        { time: "4:45 PM", event: "Cocktail hour" },
        { time: "6:00 PM", event: "Dinner service" },
        { time: "7:30 PM", event: "Toasts and cake cutting" },
        { time: "8:00 PM", event: "Dancing" },
        { time: "10:30 PM", event: "Send-off" }
      ],
      finalChecks: [
        { item: "Vendor contracts", status: "All signed" },
        { item: "Final payments", status: "Scheduled 2 weeks before" },
        { item: "Weather contingency", status: "Indoor backup confirmed" },
        { item: "Transportation", status: "Shuttle service arranged" }
      ],
      agentResponse: "All details for your wedding have been finalized and coordinated. Everything is on track for your perfect day at the SF Botanical Garden on October 15."
    }
  }
];

// Typing animation configurations
const typingAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 }
};

// Character by character text animation component
interface AnimatedTextProps {
  text: string;
  className: string;
  delay?: number;
}

const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
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

// Agent conversation component
interface AgentConversationEntry {
  agent: string;
  message: string;
  timestamp?: string;
}

interface AgentConversationProps {
  conversation: AgentConversationEntry[];
  className?: string;
}

const AgentConversation = ({ conversation, className }: AgentConversationProps) => {
  return (
    <div className={`${className} space-y-3`}>
      {conversation.map((entry, idx) => (
        <motion.div 
          key={idx}
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + (idx * 0.3) }}
        >
          <div className="w-28 flex-shrink-0">
            <div className="text-accent font-semibold text-sm">{entry.agent}</div>
          </div>
          <div className="flex-1 bg-white/5 rounded-lg p-3">
            <div className="text-sm">{entry.message}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Venue option card component
interface VenueOption {
  name: string;
  location: string;
  price: string;
  date: string;
  image: string;
  features: string[];
}

interface VenueCardProps {
  venue: VenueOption;
  isSelected: boolean;
  onSelect: () => void;
  delay: number;
}

const VenueCard = ({ venue, isSelected, onSelect, delay }: VenueCardProps) => {
  return (
    <motion.div 
      className={`rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-accent' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      onClick={onSelect}
    >
      <div className="w-full h-40 overflow-hidden">
        <motion.img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="p-4 bg-white/5">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{venue.name}</h4>
          <span className="text-accent text-sm">{venue.price}</span>
        </div>
        <div className="text-xs text-text-secondary flex justify-between mt-1">
          <span>{venue.location}</span>
          <span>{venue.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Agent team visualization component
const AgentTeam = ({ agents }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {agents.map((agent, idx) => (
        <motion.div 
          key={idx}
          className={`p-4 rounded-lg ${agent.status === 'active' ? 'bg-accent/20' : 'bg-white/5'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + (idx * 0.1) }}
        >
          <div className="flex items-center mb-3">
            <motion.div 
              className={`w-10 h-10 rounded-full ${agent.status === 'active' ? 'bg-accent/40' : 'bg-white/10'} flex items-center justify-center mr-3`}
              animate={agent.status === 'active' ? { 
                boxShadow: ['0 0 0 rgba(156, 39, 176, 0.3)', '0 0 20px rgba(156, 39, 176, 0.7)', '0 0 0 rgba(156, 39, 176, 0.3)'] 
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12V22H4V12" />
                <path d="M22 7H2V12H22V7Z" />
                <path d="M12 22V7" />
                <path d="M12 7H16.5C17.8807 7 19 5.88071 19 4.5V4.5C19 3.11929 17.8807 2 16.5 2H7.5C6.11929 2 5 3.11929 5 4.5V4.5C5 5.88071 6.11929 7 7.5 7H12Z" />
              </svg>
            </motion.div>
            <div>
              <div className="font-medium">{agent.name}</div>
              <div className="text-xs text-text-secondary">{agent.role}</div>
            </div>
          </div>
          <div className="flex items-center text-xs">
            <div className={`w-2 h-2 rounded-full mr-2 ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span>{agent.status === 'active' ? 'Active' : 'Awaiting'}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Timeline component
const WeddingTimeline = ({ timeline }) => {
  return (
    <div className="space-y-3 relative">
      <div className="absolute left-[30px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/50 via-accent-light/30 to-white/10"></div>
      {timeline.map((item, idx) => (
        <motion.div 
          key={idx}
          className="flex items-start pl-[60px] relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + (idx * 0.1) }}
        >
          <div className="absolute left-[22px] w-[16px] h-[16px] rounded-full bg-accent/30 flex items-center justify-center">
            <div className="w-[8px] h-[8px] rounded-full bg-accent animate-pulse"></div>
          </div>
          <div className="absolute left-0 text-sm font-medium text-accent">{item.time}</div>
          <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 w-full transition-colors">
            <div className="flex items-center">
              {idx === 0 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14C20.6569 14 22 12.6569 22 11C22 9.34315 20.6569 8 19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 8C19 8 20 5.5 18 4C16.5 2.91 14.8217 3.12159 13.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 14C3.34315 14 2 12.6569 2 11C2 9.34315 3.34315 8 5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 8C5 8 4 5.5 6 4C7.5 2.91 9.17826 3.12159 10.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 22C15.866 22 19 18.866 19 15C19 10.5 12 4 12 4C12 4 5 10.5 5 15C5 18.866 8.13401 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 1 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 9L9 15M15 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 2 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9L17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8L7 9M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 3 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 8.5L10.5 11.5M10.5 8.5L13.5 11.5M16 3H8M18 15H6L3 11L12 5L21 11L18 15ZM6 15V21H18V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 4 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11H21M12 5C16.6625 5 20.5 8.12 21 12C20.5 15.88 16.6625 19 12 19C7.3375 19 3.5 15.88 3 12C3.5 8.12 7.3375 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 5 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7C8 8.10457 7.10457 9 6 9C4.89543 9 4 8.10457 4 7C4 5.89543 4.89543 5 6 5C7.10457 5 8 5.89543 8 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17C4 15.8954 4.89543 15 6 15C7.10457 15 8 15.8954 8 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 17C20 18.1046 19.1046 19 18 19C16.8954 19 16 18.1046 16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9V15M18 9V15M8 7H16M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {idx === 6 && (
                <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C13.6569 21 16.0952 19.7478 17.7998 17.7998M22 6V10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              <span className="text-white font-medium">{item.event}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Guest stats visualization
const GuestStats = ({ stats }) => {
  const total = stats.invited;
  const respondedPercentage = (stats.responded / total) * 100;
  const attendingPercentage = (stats.attending / total) * 100;
  const declinedPercentage = (stats.declined / total) * 100;
  const pendingPercentage = (stats.pending / total) * 100;
  
  return (
    <motion.div 
      className="bg-black/20 rounded-lg p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-center mb-2">
        <div className="text-xs text-text-secondary">TOTAL INVITED</div>
        <div className="text-2xl font-bold">{stats.invited}</div>
      </div>
      
      <div className="space-y-3 mt-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Responded</span>
            <span className="text-sm">{stats.responded} ({Math.round(respondedPercentage)}%)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className="bg-accent rounded-full h-2" 
              initial={{ width: 0 }}
              animate={{ width: `${respondedPercentage}%` }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Attending</span>
            <span className="text-sm">{stats.attending} ({Math.round(attendingPercentage)}%)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className="bg-green-500 rounded-full h-2" 
              initial={{ width: 0 }}
              animate={{ width: `${attendingPercentage}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            ></motion.div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Declined</span>
            <span className="text-sm">{stats.declined} ({Math.round(declinedPercentage)}%)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className="bg-red-500 rounded-full h-2" 
              initial={{ width: 0 }}
              animate={{ width: `${declinedPercentage}%` }}
              transition={{ duration: 1, delay: 1 }}
            ></motion.div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Pending</span>
            <span className="text-sm">{stats.pending} ({Math.round(pendingPercentage)}%)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className="bg-yellow-500 rounded-full h-2" 
              initial={{ width: 0 }}
              animate={{ width: `${pendingPercentage}%` }}
              transition={{ duration: 1, delay: 1.2 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Demo component for wedding planning
export default function WeddingDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(1); // Default selection
  const sectionRef = useRef<HTMLElement | null>(null);
  
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
    let timer: NodeJS.Timeout | undefined;
    if (autoPlay && activeStep < demoSteps.length - 1) {
      timer = setTimeout(() => {
        setActiveStep(prevStep => prevStep + 1);
      }, 6000); // Advance every 6 seconds
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
      case 0: // Initial Planning
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <AnimatedText 
                text={currentStep.content?.userInput || "We want to plan our wedding for next summer."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "I'll help coordinate your wedding planning. Let me call in specialist agents to assist."} 
                className="text-white"
                delay={2}
              />
            </div>
          </div>
        );
        
      case 1: // Venue Selection
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "The venue specialist has found some options based on your preferences."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
              {(currentStep.content?.venueOptions || []).map((venue, idx) => (
                <motion.div 
                  key={idx}
                  className={`p-4 rounded-lg ${selectedVenue === idx ? 'bg-accent/30 border border-accent' : 'bg-white/5'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (idx * 0.2) }}
                  onClick={() => setSelectedVenue(idx)}
                >
                  <div className="w-full h-24 rounded-lg mb-3 overflow-hidden">
                    <motion.img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{venue.name}</span>
                    <span className="text-accent">{venue.price}</span>
                  </div>
                  <div className="text-xs text-text-secondary mb-2">{venue.location}</div>
                  <div className="flex flex-wrap gap-1">
                    {venue.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5">{feature}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Planning Decisions
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-6">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "We're coordinating key decisions across multiple vendors."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="space-y-3">
              {(currentStep.content?.decisions || []).map((decision, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white/5 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (idx * 0.3) }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        decision.status === "confirmed" ? "bg-green-500" : 
                        decision.status === "pending" ? "bg-yellow-500" : "bg-white/30"
                      } mr-2`}></div>
                      <span className="font-medium">{decision.category}</span>
                    </div>
                    <span className="text-xs text-text-secondary">{decision.agent}</span>
                  </div>
                  <div className="text-sm ml-5">{decision.choice}</div>
                  {decision.notes && (
                    <div className="text-xs text-text-secondary ml-5 mt-1">{decision.notes}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 3: // Guest Management
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "The guest management agent is creating your guest list and tracking RSVPs."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between mb-3">
                <div>
                  <span className="text-sm text-text-secondary">Total Guests</span>
                  <div className="text-2xl font-medium">{currentStep.content?.totalGuests || 120}</div>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Confirmed</span>
                  <div className="text-2xl font-medium text-green-400">{currentStep.content?.confirmedGuests || 87}</div>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Pending</span>
                  <div className="text-2xl font-medium text-yellow-400">{currentStep.content?.pendingGuests || 33}</div>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentStep.content?.rsvpPercentage || 72}%` }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {(currentStep.content?.specialRequests || []).map((request, idx) => (
                  <motion.div 
                    key={idx}
                    className="text-sm py-2 border-t border-white/10 flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + (idx * 0.2) }}
                  >
                    <span>{request.guest}</span>
                    <span className="text-text-secondary">{request.request}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 4: // Agent Collaboration
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "Here's the communication between specialized agents working together on your wedding."}
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(currentStep.content?.communicationLog || []).map((entry, idx) => (
                <motion.div 
                  key={idx}
                  className={`p-3 rounded-lg ${
                    entry.agent === "VenueAgent" ? "bg-purple-900/20 border-l-2 border-purple-400" :
                    entry.agent === "CateringAgent" ? "bg-blue-900/20 border-l-2 border-blue-400" :
                    entry.agent === "GuestAgent" ? "bg-green-900/20 border-l-2 border-green-400" :
                    "bg-white/10"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.2) }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{entry.agent}</span>
                    <span className="text-xs text-text-secondary">{entry.time}</span>
                  </div>
                  <div className="text-sm">{entry.message}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 5: // Final Timeline
        // Create default summary if it doesn't exist
        const summary = currentStep.content?.summary || {
          date: "June 15, 2024",
          location: "Sunset Gardens",
          totalBudget: "$28,500",
          timeline: [
            { time: "3:00 PM", event: "Guest Arrival", status: "scheduled" },
            { time: "4:00 PM", event: "Ceremony", status: "scheduled" },
            { time: "5:00 PM", event: "Cocktail Hour", status: "scheduled" },
            { time: "6:30 PM", event: "Dinner Service", status: "scheduled" },
            { time: "8:00 PM", event: "First Dance", status: "scheduled" },
            { time: "11:00 PM", event: "Event Conclusion", status: "scheduled" }
          ],
          tasks: [
            { task: "Confirm final guest count", dueDate: "June 1", status: "pending" },
            { task: "Final vendor payments", dueDate: "June 10", status: "pending" },
            { task: "Wedding rehearsal", dueDate: "June 14", status: "scheduled" }
          ]
        };
        
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "Your wedding planning is complete! Here's the final timeline and summary."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-text-secondary mb-1">DATE</div>
                  <div className="font-medium">{summary.date}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary mb-1">VENUE</div>
                  <div className="font-medium">{summary.location}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary mb-1">BUDGET</div>
                  <div className="font-medium text-accent">{summary.totalBudget}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Wedding Day Timeline</div>
                <div className="space-y-2">
                  {summary.timeline.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + (idx * 0.15) }}
                    >
                      <div className="w-20 text-accent font-medium">{item.time}</div>
                      <div className="flex-1">
                        <div className="font-medium">{item.event}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Final Checklist</div>
                <div className="space-y-2">
                  {summary.tasks.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + (idx * 0.15) }}
                    >
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        item.status === "complete" ? "bg-green-500/30 border border-green-500" : 
                        "bg-white/10 border border-white/30"
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{item.task}</div>
                        <div className="text-xs text-text-secondary">Due: {item.dueDate}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div className="text-white">Loading...</div>;
    }
  };
  
  return (
    <section id="wedding-demo" ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-accent opacity-10 rounded-full blur-[150px]"></div>
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
              Collaborative Wedding Planning
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Experience how multiple AI agents work together to plan the perfect wedding, adapting in real-time to venue availability, guest schedules, and your preferences.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Demo Steps Navigation */}
          <div className="glass-panel p-4 reveal-on-scroll w-full max-w-4xl mb-4">
            <h3 className="text-xl font-semibold mb-3 text-center">Wedding Planning Demo</h3>
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

          {/* Demo Visualization */}
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
                  agent.aia.browser/wedding-planner
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