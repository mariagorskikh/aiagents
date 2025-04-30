"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Demo steps with rich content for visual simulation
const demoSteps = [
  {
    id: "input",
    title: "User Request",
    description: "Book me a trip to Tokyo next month.",
    content: {
      userInput: "Book me a trip to Tokyo next month.",
      agentResponse: "I'll help you plan your trip to Tokyo. Let me check your calendar for suitable dates."
    }
  },
  {
    id: "calendar",
    title: "Calendar Check",
    description: "The agent analyzes your calendar to find optimal dates for your Tokyo trip.",
    content: {
      calendarEntries: [
        { date: "May 12", event: "Team Meeting" },
        { date: "May 15-16", event: "Product Launch" },
        { date: "May 20-25", event: "Available" },
        { date: "May 27", event: "Board Meeting" }
      ],
      agentResponse: "Based on your calendar, May 20-25 looks optimal for your Tokyo trip."
    }
  },
  {
    id: "flights",
    title: "Flight Selection",
    description: "Real-time flight options are fetched and compared based on your preferences.",
    content: {
      flightOptions: [
        { airline: "ANA", departure: "SFO 10:30 AM", arrival: "NRT 2:15 PM", price: "$1,120", duration: "11h 45m" },
        { airline: "JAL", departure: "SFO 12:45 PM", arrival: "HND 4:30 PM", price: "$1,250", duration: "11h 45m" },
        { airline: "United", departure: "SFO 11:15 AM", arrival: "NRT 3:00 PM", price: "$1,080", duration: "11h 45m" }
      ],
      selectedFlight: 1,
      agentResponse: "I've found several flight options. JAL offers the best combination of timing and comfort."
    }
  },
  {
    id: "hotels",
    title: "Hotel Booking",
    description: "The agent finds and presents hotel options matching your preferences and budget.",
    content: {
      hotelOptions: [
        { 
          name: "Park Hyatt Tokyo", 
          location: "Shinjuku", 
          price: "$420/night", 
          rating: "5 stars",
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
          amenities: ["Spa", "Pool", "Gym", "Restaurant"]
        },
        { 
          name: "Cerulean Tower Tokyu", 
          location: "Shibuya", 
          price: "$320/night", 
          rating: "4.5 stars",
          image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80", 
          amenities: ["Restaurant", "Bar", "Business Center", "Gym"]
        },
        { 
          name: "Hotel Sunroute Plaza", 
          location: "Shinjuku", 
          price: "$180/night", 
          rating: "4 stars",
          image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", 
          amenities: ["Restaurant", "Laundry", "Free WiFi"]
        }
      ],
      selectedHotel: 1,
      bookingStatus: "booked",
      agentResponse: "Based on your past preferences for central locations, I recommend the Cerulean Tower in Shibuya."
    }
  },
  {
    id: "activities",
    title: "Activity Planning",
    description: "Recommended activities and experiences based on your interests.",
    content: {
      activities: [
        { name: "Tsukiji Fish Market Tour", type: "Food", time: "Morning" },
        { name: "Meiji Shrine", type: "Cultural", time: "Afternoon" },
        { name: "Shibuya Crossing & Shopping", type: "Urban", time: "Evening" },
        { name: "Tokyo Skytree", type: "Scenic", time: "Night" }
      ],
      agentResponse: "I've planned a balanced itinerary based on your interests in food, culture, and photography."
    }
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Complete itinerary with your bookings, PDF download and calendar integration.",
    content: {
      confirmationDetails: {
        tripDates: "May 20-25, 2024",
        flight: "JAL JL7075",
        hotel: "Cerulean Tower Tokyu Hotel",
        totalCost: "$2,850",
      },
      agentResponse: "Your trip is confirmed! I've added it to your calendar and sent the itinerary to your email."
    }
  }
];

// Types of user and agent animations
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

// Calendar visualization component
const CalendarView = ({ entries, className }) => (
  <div className={`${className} grid grid-cols-7 gap-1 bg-black/20 rounded-lg p-3 mt-3`}>
    {['M','T','W','T','F','S','S'].map((day, i) => (
      <div key={`header-${i}`} className="text-xs text-center text-text-secondary py-1">{day}</div>
    ))}
    {Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const entry = entries.find(e => e.date.includes(day.toString()));
      return (
        <motion.div 
          key={`day-${i}`}
          className={`text-center text-xs p-1 rounded ${
            entry ? 'bg-accent/40' : 'bg-white/5'
          } ${day >= 20 && day <= 25 ? 'ring-2 ring-accent' : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + (i * 0.01) }}
        >
          {day}
        </motion.div>
      );
    })}
  </div>
);

// Flight card component
const FlightCard = ({ flight, isSelected, onSelect, delay }) => (
  <motion.div 
    className={`p-3 rounded-lg mb-2 ${isSelected ? 'bg-accent/30 border border-accent' : 'bg-white/5'}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 5 }}
    onClick={onSelect}
  >
    <div className="flex justify-between items-center">
      <span className="font-medium">{flight.airline}</span>
      <span className="text-accent font-bold">{flight.price}</span>
    </div>
    <div className="flex justify-between text-sm text-text-secondary mt-1">
      <span>{flight.departure}</span>
      <span>{flight.arrival}</span>
    </div>
    <div className="text-xs text-text-secondary mt-1">{flight.duration}</div>
  </motion.div>
);

// Hotel card component
const HotelCard = ({ hotel, isSelected, onSelect, delay }) => (
  <motion.div 
    className={`p-3 rounded-lg mb-2 ${isSelected ? 'bg-accent/30 border border-accent' : 'bg-white/5'}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 5 }}
    onClick={onSelect}
  >
    <div className="flex flex-col">
      <div className="w-full h-24 rounded-lg mb-3 overflow-hidden">
        <motion.img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">{hotel.name}</span>
        <span className="text-accent font-bold">{hotel.price}</span>
      </div>
      <div className="flex justify-between text-sm text-text-secondary mt-1">
        <span>{hotel.location}</span>
        <span>{hotel.rating}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {hotel.amenities?.map((amenity, i) => (
          <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5">{amenity}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Hotel booking animation component
const HotelBookingProcess = ({ status, hotelName }) => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    if (status === "booking") {
      const timer1 = setTimeout(() => setStage(1), 2000);
      const timer2 = setTimeout(() => setStage(2), 4000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [status]);
  
  if (status !== "booking" && status !== "booked") return null;
  
  const stages = [
    { text: "Checking availability...", icon: "●", color: "text-warning" },
    { text: "Confirming reservation...", icon: "●", color: "text-info" },
    { text: "Booking confirmed!", icon: "✓", color: "text-success" }
  ];
  
  const currentStage = status === "booked" ? 2 : stage;

  return (
    <motion.div
      className="mt-4 bg-black/30 rounded-lg p-4 border border-accent/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <motion.div 
          className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
            currentStage === 2 ? 'bg-success/20' : 'bg-white/10'
          }`}
          animate={currentStage < 2 ? { 
            rotate: [0, 360],
          } : { scale: [1, 1.2, 1] }}
          transition={currentStage < 2 ? { 
            repeat: Infinity, 
            duration: 2 
          } : { 
            repeat: 3, 
            duration: 0.5 
          }}
        >
          <span className={stages[currentStage].color}>{stages[currentStage].icon}</span>
        </motion.div>
        <span className={`${stages[currentStage].color} font-medium`}>{stages[currentStage].text}</span>
      </div>
      
      <div className="text-sm text-text-secondary ml-9">
        {currentStage === 2 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>Your room at {hotelName} has been successfully booked.</p>
            <p className="mt-1">Confirmation #TOK-2024-58721</p>
            <div className="mt-3 flex justify-between">
              <span className="text-xs">Check-in: May 20, 2024</span>
              <span className="text-xs">Check-out: May 25, 2024</span>
            </div>
          </motion.div>
        ) : (
          <p>Processing your booking at {hotelName}...</p>
        )}
      </div>
      
      <motion.div 
        className="w-full h-1 mt-3 bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div 
          className={`h-full ${currentStage === 2 ? 'bg-success' : 'bg-accent'}`}
          initial={{ width: "5%" }}
          animate={{ width: `${(currentStage + 1) / 3 * 100}%` }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Activity item component
const ActivityItem = ({ activity, delay }) => (
  <motion.div 
    className="p-2 rounded-lg mb-2 bg-white/5 flex justify-between"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <span>{activity.name}</span>
    <div className="flex space-x-2">
      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">{activity.type}</span>
      <span className="text-xs bg-white/10 px-2 py-0.5 rounded">{activity.time}</span>
    </div>
  </motion.div>
);

// Confirmation visualization component
const ConfirmationView = ({ details }) => (
  <motion.div 
    className="bg-black/20 rounded-lg p-4 mt-3 border border-accent/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <motion.div 
      className="w-full h-1.5 bg-accent/50 rounded-full mb-4"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 0.8, duration: 1 }}
    />
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-text-secondary">DATES</div>
        <div className="font-medium">{details.tripDates}</div>
      </div>
      <div>
        <div className="text-xs text-text-secondary">FLIGHT</div>
        <div className="font-medium">{details.flight}</div>
      </div>
      <div>
        <div className="text-xs text-text-secondary">HOTEL</div>
        <div className="font-medium">{details.hotel}</div>
      </div>
      <div>
        <div className="text-xs text-text-secondary">TOTAL</div>
        <div className="font-medium text-accent">{details.totalCost}</div>
      </div>
    </div>
    <div className="flex justify-between mt-4">
      <motion.button 
        className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full"
        whileHover={{ scale: 1.05 }}
      >
        Download PDF
      </motion.button>
      <motion.button 
        className="text-xs bg-white/10 px-3 py-1 rounded-full"
        whileHover={{ scale: 1.05 }}
      >
        Add to Calendar
      </motion.button>
    </div>
  </motion.div>
);

export default function Demo() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("idle");
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
          setBookingStatus("idle");
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
  
  // Booking status effect for hotel booking step
  useEffect(() => {
    let timer;
    // Only run this effect when we're on the hotel booking step (index 3) and visible
    if (isVisible && activeStep === 3 && bookingStatus === "idle") {
      timer = setTimeout(() => {
        setBookingStatus("booking");
      }, 3000);
    }
    
    // Reset booking status when step changes
    if (activeStep !== 3) {
      setBookingStatus("idle");
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, activeStep, bookingStatus]);

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
        
      case 1: // Calendar Check
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <CalendarView 
              entries={currentStep.content.calendarEntries} 
              className="mt-4" 
            />
          </div>
        );
        
      case 2: // Flight Selection
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="space-y-2">
              {currentStep.content.flightOptions.map((flight, idx) => (
                <FlightCard 
                  key={idx}
                  flight={flight}
                  isSelected={idx === currentStep.content.selectedFlight}
                  onSelect={() => {}}
                  delay={1 + (idx * 0.2)}
                />
              ))}
            </div>
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.button 
                className="accent-button px-4 py-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Selected Flight
              </motion.button>
            </motion.div>
          </div>
        );
        
      case 3: // Hotel Booking
        return (
          <div className="h-full flex flex-col justify-center overflow-y-auto">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-h-64 overflow-y-auto pb-2">
              {currentStep.content.hotelOptions.map((hotel, idx) => (
                <HotelCard 
                  key={idx}
                  hotel={hotel}
                  isSelected={idx === currentStep.content.selectedHotel}
                  onSelect={() => {}}
                  delay={1 + (idx * 0.2)}
                />
              ))}
            </div>
            
            {bookingStatus === "idle" ? (
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <motion.button 
                  className="accent-button px-4 py-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBookingStatus("booking")}
                >
                  Book Selected Hotel
                </motion.button>
              </motion.div>
            ) : (
              <HotelBookingProcess 
                status={bookingStatus} 
                hotelName={currentStep.content.hotelOptions[currentStep.content.selectedHotel]?.name || "Selected Hotel"} 
              />
            )}
          </div>
        );
        
      case 4: // Activity Planning
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <div className="space-y-1">
              {currentStep.content.activities.map((activity, idx) => (
                <ActivityItem
                  key={idx}
                  activity={activity}
                  delay={1 + (idx * 0.2)}
                />
              ))}
            </div>
            <motion.div 
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.button 
                className="accent-button px-4 py-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Itinerary
              </motion.button>
            </motion.div>
          </div>
        );
        
      case 5: // Confirmation
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="bg-accent/10 rounded-lg p-4 border-l-2 border-accent mb-4">
              <AnimatedText 
                text={currentStep.content.agentResponse} 
                className="text-white"
                delay={0.5}
              />
            </div>
            <ConfirmationView details={currentStep.content.confirmationDetails} />
            <motion.div 
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <motion.div 
                className="px-3 py-1 text-sm bg-gradient-to-r from-accent to-accent-light rounded-full text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Trip Successfully Planned
              </motion.div>
            </motion.div>
          </div>
        );
        
      default:
        return <div className="text-white">Loading...</div>;
    }
  };
  
  return (
    <section id="demo" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent opacity-10 rounded-full blur-[150px]"></div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, scale, y }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              See It in Action
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Watch how the AIA Browser's agents autonomously handle complex tasks across multiple services.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Demo Steps Navigation - Now horizontal and centered */}
          <div className="glass-panel p-6 reveal-on-scroll w-full max-w-4xl mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Trip Planning Demo</h3>
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
                  agent.aia.browser/travel-assistant
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