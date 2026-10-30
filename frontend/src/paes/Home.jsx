import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0b0c1e] text-white font-sans overflow-x-hidden">
  {/* Ambient background glows */}
  <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute top-[20%] right-[-50px] w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

  <Navbar />
  <main>
    <Hero />
    <Stats />
  </main>
</div>
  );

}