import React from 'react';
import { GraduationCap, Building2, Briefcase, Trophy } from 'lucide-react';

export default function Stats() {
  const statItems = [
    { icon: GraduationCap, count: '2500+', label: 'Students', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Building2, count: '120+', label: 'Recruiters', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Briefcase, count: '850+', label: 'Placements', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Trophy, count: '95%', label: 'Success Rate', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-10 pb-12">
      <div className="bg-[#13152e]/60 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`p-3.5 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.count}</h3>
                  <p className="text-gray-400 text-xs font-medium">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}