import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-[#0b0c1e]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">
          Campus<span className="text-purple-400">Connect</span>
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-gray-300 font-medium text-sm">
        <a href="#home" className="text-white border-b-2 border-blue-500 pb-1">Home</a>
        <a href="#about" className="hover:text-white transition">About</a>
        <a href="#features" className="hover:text-white transition">Features</a>
        <Link  to="/contact"  className="hover:text-white transition">Contact</Link>      </div>

      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-purple-900/30 transition duration-200 text-sm">
        Get Started
      </button>
    </nav>
  );
}