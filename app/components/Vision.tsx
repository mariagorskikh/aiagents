"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import GeoJsonGeometry from 'three-geojson-geometry';
import EmailPopup from './EmailPopup';

export default function Vision() {
  const sectionRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
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
                onClick={() => setIsPopupOpen(true)}
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
                    {/* Interactive 3D globe network visual */}
                    <div className="w-full h-96 md:h-[32rem] mx-auto mb-0 relative">
                      {/* Soft drop shadow under the globe */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-0" style={{ width: '60%', height: '32px', filter: 'blur(16px)', background: 'rgba(60,120,255,0.18)', borderRadius: '50%' }} />
                      {/* Subtle blue glow around the globe */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0" style={{ width: '110%', height: '110%', filter: 'blur(32px)', background: 'rgba(60,251,255,0.12)', borderRadius: '50%' }} />
                      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ background: 'transparent' }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[2, 2, 2]} intensity={1.3} castShadow />
                        <OrbitControls enablePan={false} enableZoom={false} />
                        <GlobeFX />
                      </Canvas>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Email Popup */}
      <EmailPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </section>
  );
}

// Helper: lat/lon to 3D position
function latLonToVec3(lat: number, lon: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
}

function GlobeFX() {
  const globeRef = useRef<THREE.Group | null>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  useEffect(() => {
    fetch('/world-110m.geojson').then(res => res.json()).then(setGeoJson);
  }, []);
  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.0015;
  });
  // Major city lat/lon (sampled for demo)
  const cities: { name: string; lat: number; lon: number }[] = [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', lat: 40.7128, lon: -74.006 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Johannesburg', lat: -26.2041, lon: 28.0473 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Moscow', lat: 55.7558, lon: 37.6173 }
  ];
  // Arcs between random city pairs
  const arcPairs: [number, number][] = [
    [0, 1], [1, 2], [2, 4], [4, 5], [5, 6], [6, 3], [3, 0], [7, 8], [8, 9], [9, 7]
  ];
  // Arc points generator
  function arcPoints(a: { lat: number; lon: number }, b: { lat: number; lon: number }, segments = 48): [number, number, number][] {
    const [ax, ay, az] = latLonToVec3(a.lat, a.lon, 1.01);
    const [bx, by, bz] = latLonToVec3(b.lat, b.lon, 1.01);
    const points: [number, number, number][] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Spherical interpolation with a "lift" for arc
      const mx = ax * (1 - t) + bx * t;
      const my = ay * (1 - t) + by * t;
      const mz = az * (1 - t) + bz * t;
      const lift = Math.sin(Math.PI * t) * 0.18;
      const len = Math.sqrt(mx * mx + my * my + mz * mz);
      points.push([
        (mx / len) * (1.01 + lift),
        (my / len) * (1.01 + lift),
        (mz / len) * (1.01 + lift)
      ]);
    }
    return points;
  }
  return (
    <group ref={globeRef as MutableRefObject<THREE.Group | null>}>
      {/* Main globe */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial 
          color="#1a233a" 
          roughness={0.08} 
          transmission={0.98} 
          thickness={1.4}
          clearcoat={1}
          clearcoatRoughness={0.03}
          opacity={0.96}
          ior={1.6}
          reflectivity={1}
          transparent
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Glowing rim */}
      <mesh>
        <sphereGeometry args={[1.025, 64, 64]} />
        <meshBasicMaterial color="#3cfbff" transparent opacity={0.18} />
      </mesh>
      {/* World map outlines */}
      {geoJson && Array.isArray(geoJson.features) && geoJson.features.map((feature: any, idx: number) => (
        <lineSegments key={idx} geometry={new GeoJsonGeometry(feature, 1.021)}>
          <lineBasicMaterial color="#3cfbff" linewidth={2} transparent opacity={0.5} />
        </lineSegments>
      ))}
      {/* City lights */}
      {cities.map((city, i) => {
        const pos = latLonToVec3(city.lat, city.lon, 1.021);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#ffb347' : '#3cfbff'} emissive={i % 2 === 0 ? '#ffb347' : '#3cfbff'} emissiveIntensity={2} />
          </mesh>
        );
      })}
      {/* Glowing arcs */}
      {arcPairs.map(([a, b], i) => {
        const points = arcPoints(cities[a], cities[b]);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flat())}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#3cfbff" linewidth={2} transparent opacity={0.7} />
          </line>
        );
      })}
    </group>
  );
} 