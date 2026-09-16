import React from 'react';
import { TrendingUp, CheckCircle2, Clock } from 'lucide-react';

export default function ProgressSection() {
  return (
    <section className="py-10 border-t border-white/5">
      <div className="container">
        
        <div className="glass-card max-w-2xl mx-auto bg-gradient-to-r from-indigo-950/40 via-[#0D1427] to-purple-950/40 border-indigo-500/20 p-6 sm:p-8">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Today's Study Progress</h3>
                <p className="text-xs text-gray-400">A demo view of how learning progress is visualized</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              DEMO DATA
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-grow h-3 bg-gray-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full w-[75%] transition-all duration-700"></div>
            </div>
            <span className="text-base font-extrabold text-indigo-400">75%</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 size={16} /> 3 tasks completed
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock size={16} /> 1 task remaining
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
