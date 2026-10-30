import React from 'react';
import { User, Briefcase, ArrowRight, Users, Building, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();

  return (

    <section className="relative px-10 pt-10 pb-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <div className="flex-1 space-y-6 z-10">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-medium">
          <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
          <span>Your Future, Our Mission</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Empowering <br />
          Placements with <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-300 bg-clip-text text-transparent">
            Smart Technology
          </span>
        </h1>

        <p className="text-gray-400 text-base max-w-lg">
          Connecting students and recruiters on one intelligent platform.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button onClick={() => navigate("/student-login")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-purple-900/20">
            <User className="w-5 h-5" />
            <span>Student Login</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button onClick={() => navigate("/recruiter-login")}
          className="flex items-center gap-2 bg-[#161938] hover:bg-[#1f234d] text-gray-200 border border-white/10 font-medium px-6 py-3 rounded-xl transition">
            <Briefcase className="w-5 h-5 text-purple-400" />
            <span>Recruiter Login</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Target Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#131631]/80 border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs">For Students</h4>
              <p className="text-[10px] text-gray-400 leading-tight">Explore opportunities & build future</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#131631]/80 border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs">For Recruiters</h4>
              <p className="text-[10px] text-gray-400 leading-tight">Find top talent from campuses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#131631]/80 border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-teal-600/20 text-teal-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs">For Admins</h4>
              <p className="text-[10px] text-gray-400 leading-tight">Manage placements with ease</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Visual Image Container */}
      <div className="flex-1 relative w-full flex justify-center">
        <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-950/50">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
            alt="Campus Illustration"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity brightness-75 contrast-125"
          />
          {/* Neon Glow & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0c1e] via-purple-900/40 to-blue-600/30 mix-blend-color-dodge pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}