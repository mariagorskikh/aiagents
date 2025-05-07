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
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Lush garden
          location: "Golden Gate Park",
          features: ["Garden Setting", "Outdoor Ceremony", "Botanical Backdrop"]
        },
        { 
          name: "The Palace Hotel", 
          date: "October 22, 2024", 
          price: "$18,200",
          guestAvailability: "88%",
          image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80", // Grand ballroom
          location: "Downtown San Francisco",
          features: ["Historic Venue", "Ballroom", "Luxury Suites"]
        },
        { 
          name: "SF Skyline Rooftop", 
          date: "October 29, 2024", 
          price: "$14,000",
          guestAvailability: "85%",
          image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80", // Rooftop city view
          location: "Civic Center",
          features: ["City View", "Rooftop Access", "Modern Space"]
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
    <div className={`${className} space-y-2 sm:space-y-3`}>
      {conversation.map((entry, idx) => (
        <motion.div 
          key={idx}
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + (idx * 0.3) }}
        >
          <div className="w-20 sm:w-28 flex-shrink-0">
            <div className="text-accent font-semibold text-xs sm:text-sm">{entry.agent}</div>
          </div>
          <div className="flex-1 bg-white/5 rounded-lg p-2 sm:p-3">
            <div className="text-xs sm:text-sm">{entry.message}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Venue option card component
interface VenueOption {
  name: string;
  date: string;
  price: string;
  guestAvailability: string;
  image: string;
  location?: string;
  features?: string[];
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
      <div className="w-full h-32 sm:h-40 overflow-hidden">
        <motion.img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="p-3 sm:p-4 bg-white/5">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-sm sm:text-base">{venue.name}</h4>
          <span className="text-accent text-xs sm:text-sm">{venue.price}</span>
        </div>
        <div className="text-xs text-text-secondary flex justify-between mt-1">
          <span>{venue.location || "San Francisco"}</span>
          <span>{venue.date}</span>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-text-secondary mr-2">Guest Availability:</span>
          <span className="text-green-400">{venue.guestAvailability}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {(venue.features || ["Garden", "Indoor Option", "Catering"]).map((feature: string, i: number) => (
            <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5">{feature}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Agent team visualization component
interface Agent {
  name: string;
  role: string;
  image?: string;
  status?: string;
}

interface AgentTeamProps {
  agents: Agent[];
}

const AgentTeam = ({ agents }: AgentTeamProps) => {
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
const WeddingTimeline = ({ timeline }: { timeline: Array<{time: string, event: string}> }) => {
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
const GuestStats = ({ stats }: { stats: {invited: number, responded: number, attending: number, declined: number, pending: number} }) => {
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
        // Type definition for venue options with features array
        interface VenueWithFeatures {
          name: string;
          location: string;
          price: string;
          date?: string;
          image: string;
          features: string[];
        }
        
        // Get venue options or provide defaults
        const venueSelectionOptions: VenueWithFeatures[] = (currentStep.content?.venueOptions || [
          {
            name: "San Francisco Botanical Garden",
            location: "Golden Gate Park",
            price: "$12,500",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            features: ["Garden Setting", "Outdoor Ceremony", "Botanical Backdrop"]
          },
          {
            name: "The Palace Hotel",
            location: "Downtown San Francisco",
            price: "$18,200",
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
            features: ["Historic Venue", "Ballroom", "Luxury Suites"]
          },
          {
            name: "SF Skyline Rooftop",
            location: "Civic Center",
            price: "$14,000",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
            features: ["City View", "Rooftop Access", "Modern Space"]
          }
        ]).map((venue: any) => ({
          ...venue,
          location: venue.location || "San Francisco",
          features: venue.features || ["Garden Setting", "Indoor Option", "Catering Available"]
        }));
        
        // Agent team visual
        const agentTeam = [
          { name: "VenueAgent", color: "bg-purple-500/30", border: "border-purple-400", active: true, icon: "🏛️" },
          { name: "GuestAgent", color: "bg-green-500/30", border: "border-green-400", active: true, icon: "🧑‍🤝‍🧑" },
          { name: "CateringAgent", color: "bg-blue-500/30", border: "border-blue-400", active: false, icon: "🍽️" },
          { name: "DecorAgent", color: "bg-pink-500/30", border: "border-pink-400", active: false, icon: "🌸" },
          { name: "BudgetAgent", color: "bg-yellow-500/30", border: "border-yellow-400", active: true, icon: "💰" },
        ];
        
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "The venue specialist has found some options based on your preferences."} 
                className="text-white"
                delay={0.5}
              />
            </div>
            {/* Animated agent team row */}
            <motion.div className="flex items-center justify-center mb-6 relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-purple-400 via-green-400 via-blue-400 via-pink-400 to-yellow-400 opacity-30 z-0" style={{height: 4}} />
              {agentTeam.map((agent, idx) => (
                <motion.div
                  key={agent.name}
                  className={`relative z-10 flex flex-col items-center mx-2`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.2 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${agent.color} ${agent.border} ${agent.active ? 'shadow-lg shadow-accent/40' : ''}`}
                    animate={agent.active ? { scale: [1, 1.15, 1], boxShadow: ["0 0 0px #fff", "0 0 16px #fff", "0 0 0px #fff"] } : {}}
                    transition={agent.active ? { duration: 2, repeat: Infinity } : {}}
                  >
                    {agent.icon}
                  </motion.div>
                  <span className="mt-2 text-xs text-text-secondary font-medium">{agent.name.replace('Agent','')}</span>
                </motion.div>
              ))}
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
              {venueSelectionOptions.map((venue, idx) => (
                <motion.div 
                  key={idx}
                  className={`p-4 rounded-lg ${selectedVenue === idx ? 'bg-accent/30 border border-accent' : 'bg-white/5'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (idx * 0.2) }}
                  onClick={() => setSelectedVenue(idx)}
                >
                  <div className="flex flex-col gap-1 mb-2">
                    <div className="text-lg font-semibold text-white drop-shadow-sm">{venue.name}</div>
                    <div className="text-xs text-text-secondary">{venue.location}</div>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-accent">{venue.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {venue.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5 text-white">{feature}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Dates & Venue
        const venueOptions = currentStep.content?.venueOptions || [];
        // Add location and features if they're missing
        const enhancedVenueOptions = venueOptions.map((venue: VenueOption) => ({
          ...venue,
          location: venue.location || "San Francisco",
          features: venue.features || ["Garden Setting", "Indoor Option", "Catering Available"]
        }));
        
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "Based on venue availability and your guests' schedules, I recommend the SF Botanical Garden."}
                className="text-white"
                delay={0.5}
              />
            </div>
            
            {/* Visual representation of agent collaboration */}
            <motion.div 
              className="mb-4 bg-black/30 rounded-lg p-3 border border-accent/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-xs text-center text-text-secondary mb-2">AGENT COLLABORATION</div>
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-xs"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0px rgba(168, 85, 247, 0.5)", "0 0 10px rgba(168, 85, 247, 0.8)", "0 0 0px rgba(168, 85, 247, 0.5)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    VA
                  </motion.div>
                  <motion.div className="h-[2px] w-8 bg-gradient-to-r from-purple-500/80 to-green-500/80" />
                </div>
                
                <div className="flex items-center">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center text-xs"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0px rgba(74, 222, 128, 0.5)", "0 0 10px rgba(74, 222, 128, 0.8)", "0 0 0px rgba(74, 222, 128, 0.5)"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    GA
                  </motion.div>
                  <motion.div className="h-[2px] w-8 bg-gradient-to-r from-green-500/80 to-blue-500/80" />
                </div>
                
                <div className="flex items-center">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-xs"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0px rgba(59, 130, 246, 0.5)", "0 0 10px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0.5)"] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    BA
                  </motion.div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-center mt-1">
                <div className="text-[10px] sm:text-xs text-purple-400">Venue Agent</div>
                <div className="text-[10px] sm:text-xs text-green-400">Guest Agent</div>
                <div className="text-[10px] sm:text-xs text-blue-400">Budget Agent</div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 sm:max-h-64 overflow-y-auto pb-2">
              {enhancedVenueOptions.map((venue, idx) => (
                <VenueCard 
                  key={idx}
                  venue={venue}
                  isSelected={idx === (currentStep.content?.recommendedOption || 0)}
                  onSelect={() => {}}
                  delay={1 + (idx * 0.2)}
                />
              ))}
            </div>
            <AgentConversation 
              conversation={currentStep.content?.agentConversation || []}
              className="mt-4" 
            />
          </div>
        );
        
      case 3: // Planning Decisions
        interface Decision {
          category: string;
          selection: string;
          status: string;
          agent?: string;
          choice?: string;
          notes?: string;
        }

        const decisions: Decision[] = currentStep.content?.decisions || [];
        
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
              {decisions.map((decision, idx) => (
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
                    <span className="text-xs text-text-secondary">{decision.agent || ''}</span>
                  </div>
                  <div className="text-sm ml-5">{decision.choice || decision.selection}</div>
                  {decision.notes && (
                    <div className="text-xs text-text-secondary ml-5 mt-1">{decision.notes}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 4: // Guest Management
        // Type definition for specialRequests to avoid TypeScript errors
        interface GuestRequest {
          guest: string;
          request: string;
          status: string;
        }
        
        // Get stats from content or provide defaults
        const guestStats = currentStep.content?.stats || {
          invited: 112,
          responded: 89,
          attending: 78,
          declined: 11,
          pending: 23
        };
        
        // Calculate percentages
        const respondedPercentage = Math.round((guestStats.responded / guestStats.invited) * 100);
        const attendingPercentage = Math.round((guestStats.attending / guestStats.invited) * 100);
        
        // Get special requests or provide defaults
        const specialRequests: GuestRequest[] = currentStep.content?.specialRequests || [];
        
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "The guest management agent is creating your guest list and tracking RSVPs."}
                className="text-white"
                delay={0.5}
              />
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 sm:p-4 mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <motion.div 
                  className="flex flex-col items-center mb-3 sm:mb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-xs text-text-secondary">INVITED</div>
                  <div className="text-2xl font-bold">{guestStats.invited}</div>
                </motion.div>
                
                <motion.div 
                  className="w-20 h-20 sm:w-24 sm:h-24 relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="10" 
                    />
                    <motion.circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#9333ea" 
                      strokeWidth="10" 
                      strokeDasharray="251.2"
                      strokeDashoffset="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (respondedPercentage / 100 * 251.2) }}
                      transition={{ duration: 1.5, delay: 1 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xs text-text-secondary">Responded</div>
                    <div className="text-xl font-bold">{respondedPercentage}%</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-xs text-text-secondary">ATTENDING</div>
                  <div className="text-2xl font-bold text-green-400">{guestStats.attending}</div>
                </motion.div>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto mt-4">
                <div className="text-xs font-medium text-text-secondary mb-2">SPECIAL REQUESTS</div>
                {specialRequests.map((request, idx) => (
                  <motion.div 
                    key={idx}
                    className="bg-white/5 rounded-lg p-2 flex justify-between items-center text-xs sm:text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + (idx * 0.2) }}
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        request.status === "Confirmed" ? "bg-green-500" : 
                        request.status === "Arranged" ? "bg-green-500" : 
                        "bg-yellow-500"
                      }`}></div>
                      <span className="font-medium">{request.guest}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-text-secondary mr-2">{request.request}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        request.status === "Confirmed" || request.status === "Arranged" ? "bg-green-500/20 text-green-300" : 
                        "bg-yellow-500/20 text-yellow-300"
                      }`}>{request.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Communication activity visualization */}
            <motion.div 
              className="bg-black/20 rounded-lg p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="text-xs font-medium text-text-secondary mb-2">COMMUNICATION ACTIVITY</div>
              <div className="space-y-2">
                {(currentStep.content?.communicationLog || []).map((comm, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + (idx * 0.15) }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                    <div className="w-24 sm:w-28 flex-shrink0 font-medium">{comm.type}</div>
                    <div className="flex-1 mx-2 h-[2px] bg-gradient-to-r from-accent/50 to-transparent"></div>
                    <div className="text-xs text-text-secondary">{comm.sent}</div>
                    <div className="ml-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        comm.status.includes("Delivered") ? "bg-green-500/20 text-green-300" : 
                        comm.status.includes("Sent") ? "bg-yellow-500/20 text-yellow-300" : 
                        "bg-blue-500/20 text-blue-300"
                      }`}>{comm.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );
        
      case 5: // Agent Collaboration
        // Type definition for communication entries
        interface AgentMessage {
          agent: string;
          message: string;
          time?: string;
        }
        
        // Get agent messages or provide defaults
        const agentMessages: AgentMessage[] =
          (Array.isArray(currentStep.content?.agentConversation) && currentStep.content.agentConversation.every((m: any) => m.agent && m.message))
            ? currentStep.content.agentConversation
            : [
                { agent: "VenueAgent", message: "All venue details confirmed for October 15." },
                { agent: "CateringAgent", message: "Menu selections and dietary restrictions processed." },
                { agent: "GuestAgent", message: "Final guest count: 78 confirmed attendees." },
                { agent: "DecorAgent", message: "Floral arrangements and table settings finalized." },
                { agent: "BudgetAgent", message: "Currently $650 under total budget." }
              ];
        
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
              {agentMessages.map((entry, idx) => (
                <motion.div 
                  key={idx}
                  className={`p-3 rounded-lg ${
                    entry.agent === "VenueAgent" ? "bg-purple-900/20 border-l-2 border-purple-400" :
                    entry.agent === "CateringAgent" ? "bg-blue-900/20 border-l-2 border-blue-400" :
                    entry.agent === "GuestAgent" ? "bg-green-900/20 border-l-2 border-green-400" :
                    entry.agent === "DecorAgent" ? "bg-pink-900/20 border-l-2 border-pink-400" :
                    entry.agent === "BudgetAgent" ? "bg-yellow-900/20 border-l-2 border-yellow-400" :
                    "bg-white/10"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.2) }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{entry.agent}</span>
                    <span className="text-xs text-text-secondary">{entry.time || ""}</span>
                  </div>
                  <div className="text-sm">{entry.message}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 6: // Final Dashboard
        // Create default summary if it doesn't exist
        const summary = currentStep.content?.summary || {
          date: "October 15, 2024",
          venue: "San Francisco Botanical Garden",
          guestCount: 78,
          budget: {
            original: "$25,000",
            current: "$24,350",
            status: "Under budget"
          }
        };
        
        // Get timeline from content or provide default
        const timeline = currentStep.content?.timeline || [];
        
        // Get final checks from content or provide default
        const finalChecks = currentStep.content?.finalChecks || [];
        
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content?.agentResponse || "Your wedding planning is complete! Here's the final timeline and summary."}
                className="text-white"
                delay={0.5}
              />
            </div>
            
            <motion.div
              className="bg-black/20 rounded-lg p-3 mb-4 flex flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-full md:w-1/2 mb-3 md:mb-0 md:border-r md:border-white/10 p-2">
                <div className="text-center">
                  <motion.div 
                    className="text-3xl sm:text-4xl font-bold mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {summary.date}
                  </motion.div>
                  <motion.div
                    className="text-sm text-text-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    {summary.venue}
                  </motion.div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <div className="text-xs text-text-secondary">GUEST COUNT</div>
                    <div className="text-xl font-bold">{summary.guestCount}</div>
                  </motion.div>
                  
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                  >
                    <div className="text-xs text-text-secondary">BUDGET</div>
                    <div className="text-xl font-bold text-accent">{summary.budget.current}</div>
                    <div className="text-xs text-green-400">{summary.budget.status}</div>
                  </motion.div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-2">
                <div className="text-xs font-medium text-text-secondary mb-2">FINAL CHECKLIST</div>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {finalChecks.map((check, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center text-xs sm:text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + (idx * 0.1) }}
                    >
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="font-medium">{check.item}</div>
                      <div className="flex-1 mx-2 h-[1px] bg-white/10"></div>
                      <div className="text-xs text-green-400">{check.status}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="mb-2 text-xs font-medium text-text-secondary">WEDDING DAY TIMELINE</div>
            <div className="bg-black/20 rounded-lg p-3 max-h-48 overflow-y-auto">
              <div className="space-y-2 relative">
                <div className="absolute left-[24px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-accent via-accent-light/50 to-transparent"></div>
                
                {timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center pl-10 relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + (idx * 0.1) }}
                  >
                    <div className="absolute left-0 text-xs font-medium">{item.time}</div>
                    <motion.div
                      className="absolute left-[24px] w-[10px] h-[10px] rounded-full bg-accent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.1 + (idx * 0.1) }}
                    />
                    <div className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      {item.event}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-light/70 text-white text-sm">
                Planning Completed Successfully
              </div>
            </motion.div>
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
          {/* Step Navigation Bar */}
          <div className="glass-panel p-3 sm:p-4 reveal-on-scroll w-full max-w-4xl mb-4">
            <h3 className="text-xl font-semibold mb-3 text-center">Wedding Planning Demo</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {demoSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`text-left p-2 sm:p-4 rounded-lg transition-all ${
                    activeStep === index 
                      ? 'bg-accent/20 border border-accent/40' 
                      : 'hover:bg-white/5'
                  }`}
                  style={{ width: 'calc(33.33% - 8px)', maxWidth: '120px' }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${
                      activeStep === index ? 'bg-accent' : 'bg-white/10'
                    }`}>
                      {index + 1}
                    </div>
                    <h4 className="font-medium text-center text-xs sm:text-sm">{step.title}</h4>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Restart Demo Button */}
            <motion.button
              className="mt-4 sm:mt-6 py-2 sm:py-3 glass-button flex justify-center items-center mx-auto w-36 sm:w-48"
              onClick={() => {
                setActiveStep(0);
                setAutoPlay(true);
              }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12C20 7.02944 15.9706 3 11 3C7.87781 3 5.1325 4.60879 3.64421 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 7V3H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Restart Demo
            </motion.button>
          </div>

          {/* Demo Visualization - glassmorphic browser-like frame */}
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
                  {/* Removed: agent.aia.browser/wedding-planner */}
                </div>
              </div>
              {/* Demo Content - always contained and scrollable if needed */}
              <div className="bg-gradient-to-br from-primary to-secondary h-full flex items-center justify-center px-6 pt-10 pb-4">
                <div className="w-full h-full max-h-full overflow-y-auto flex flex-col">
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