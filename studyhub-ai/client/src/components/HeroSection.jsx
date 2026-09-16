import React from 'react';
import { FileText, Calendar, Check, Sparkles, Brain, CheckCircle2, BookOpen, Clock, ListChecks } from 'lucide-react';
import AIStatusBadge from './AIStatusBadge';

export default function HeroSection({ aiMode, onSelectTool }) {
  return (
    <section id="home" className="relative py-12 md:py-16 border-b border-white/5 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-10 left-1/4 -z-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 -z-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-5 shadow-sm">
              <Sparkles size={14} className="text-indigo-400" />
              <span>✦ AI-Powered Learning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Study Smarter.<br />
              <span className="accent-gradient-text">Not Harder.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Turn messy notes into organized knowledge, simplify difficult content, and transform big goals into actionable study plans.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={() => onSelectTool('notetaker')}
                className="btn btn-primary btn-lg shadow-indigo-500/25"
              >
                <FileText size={18} />
                <span>✦ Organize My Notes</span>
              </button>
              
              <button
                onClick={() => onSelectTool('planner')}
                className="btn btn-secondary btn-lg"
              >
                <Calendar size={18} />
                <span>Build My Study Plan</span>
              </button>
            </div>

            {/* Below Buttons Trust Checks */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-400">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span>Demo Mode Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-indigo-400" />
                <span>English + Hindi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-cyan-400" />
                <span>Student-Friendly AI</span>
              </div>
            </div>

          </div>

          {/* Right Column: AI Dashboard Visual Mockup */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-card p-6 border-indigo-500/25 bg-[#0D1427]/90 shadow-2xl relative">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">StudyMate AI</h3>
                    <p className="text-xs text-gray-400">Active Learning Dashboard</p>
                  </div>
                </div>
                <AIStatusBadge mode={aiMode} />
              </div>

              {/* Visual Preview Content */}
              <div className="space-y-4">
                
                {/* Today's Learning */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-indigo-400" />
                      Today's Learning: Biology
                    </span>
                    <span className="font-bold text-indigo-400">82%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[82%] transition-all duration-500"></div>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                      <FileText size={15} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">AI Summary</span>
                      <span className="text-gray-400 text-[11px]">4 key concepts found</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    Ready
                  </span>
                </div>

                {/* Project Plan */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                      <ListChecks size={15} />
                    </div>
                    <div>
                      <span className="font-semibold text-white block">Project Plan</span>
                      <span className="text-gray-400 text-[11px]">5 tasks remaining</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                    In Progress
                  </span>
                </div>

              </div>

              {/* Bottom Subtle Badge */}
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <span className="text-[11px] text-gray-500 italic">Visual preview of interactive student features</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
