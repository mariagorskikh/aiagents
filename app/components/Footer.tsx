"use client";

import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Demo"]
    },
    {
      title: "Company",
      links: ["About", "Contact"]
    }
  ];
  
  const socialLinks = [
    { name: "GitHub", icon: "G" }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <footer className="py-12 px-4 bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="glass-panel p-8 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h3 variants={item} className="text-xl font-bold mb-4">AIA Browser</motion.h3>
              <motion.p variants={item} className="text-text-secondary mb-4">
                The first true portal into the Agent Internet.
              </motion.p>
              <motion.div variants={item} className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    whileHover={{ y: -3, backgroundColor: "rgba(78, 84, 255, 0.3)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={container}
                initial="hidden"
                animate="show"
                transition={{ delayChildren: 0.2 + (sectionIndex * 0.1) }}
              >
                <motion.h4 variants={item} className="font-semibold mb-4">{section.title}</motion.h4>
                <motion.ul variants={container} className="space-y-2 text-text-secondary">
                  {section.links.map((link, i) => (
                    <motion.li 
                      key={i} 
                      variants={item}
                    >
                      <motion.a 
                        href={`#${link.toLowerCase()}`} 
                        className="hover:text-white transition-colors"
                        whileHover={{ x: 2, color: "#FFFFFF" }}
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-text-secondary text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            © {new Date().getFullYear()} AIA Browser. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 