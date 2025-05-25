import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import InsuranceDemo from './components/InsuranceDemo';
import WeddingDemo from './components/WeddingDemo';
import Vision from './components/Vision';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <InsuranceDemo />
      <WeddingDemo />
      <Vision />
      
      {/* Simple Footer */}
      <footer className="py-8 text-center text-text-secondary bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          © 2025 AIA Interface
        </div>
      </footer>
    </main>
  );
} 