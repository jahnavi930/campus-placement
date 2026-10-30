
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  LogOut,
} from "lucide-react";

const RecruiterSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Jobs",
      path: "/recruiter/jobs",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Post a Job",
      path: "/recruiter/post-job",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Applications",
      path: "/recruiter/applications",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 z-30">

      {/* Sidebar Glow */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div
        className="relative h-full bg-[#07152f]/90
        backdrop-blur-xl border-r border-blue-400/10
        px-5 py-7"
      >

        {/* Logo */}
        <div className="mb-12 px-2">

          <h1 className="text-2xl font-bold text-white tracking-wide">
            Campus<span className="text-blue-400">Connect</span>
          </h1>

          <div className="flex items-center gap-2 mt-2">

            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse" />

            <p className="text-xs text-blue-300">
              Recruiter Portal
            </p>

          </div>

        </div>


        {/* Navigation */}
        <div className="space-y-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-4
                px-4 py-3.5 rounded-xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-500/15 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.12)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >

              <span
                className="transition-transform duration-300
                group-hover:scale-110 group-hover:rotate-2"
              >
                {item.icon}
              </span>

              <span className="text-sm font-medium">
                {item.name}
              </span>

              <span
                className="absolute right-4 w-1 h-1 rounded-full
                bg-blue-400 opacity-0
                group-hover:opacity-100
                transition-opacity"
              />

            </NavLink>
          ))}

        </div>


        {/* Logout */}
        <button
          className="absolute bottom-7 left-5 right-5
          flex items-center gap-4 px-4 py-3.5 rounded-xl
          text-gray-400 hover:text-red-300
          hover:bg-red-500/10
          transition-all duration-300 group"
        >

          <LogOut
            size={20}
            className="group-hover:-translate-x-1
            transition-transform duration-300"
          />

          <span className="text-sm font-medium">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
};

export default RecruiterSidebar;