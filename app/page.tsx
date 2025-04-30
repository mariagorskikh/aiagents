import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';
import InsuranceDemo from './components/InsuranceDemo';
import Vision from './components/Vision';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <InsuranceDemo />
      <Vision />
      <Footer />
    </main>
  );
} 