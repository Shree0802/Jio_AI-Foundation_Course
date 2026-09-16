import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060913] py-12 text-sm text-gray-400">
      <div className="container">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
          
          {/* Left: Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#home" className="flex items-center gap-3 mb-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-md">
                <BookOpen size={18} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                StudyHub <span className="accent-gradient-text">AI</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-4">
              Your Smart Study Companion. Turn messy notes into organized knowledge, simplify difficult concepts, and plan your study goals effortlessly.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">AI Tools</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#notetaker" className="hover:text-white transition-colors">AI Notetaker</a>
              <a href="#summarizer" className="hover:text-white transition-colors">AI Summarizer</a>
              <a href="#planner" className="hover:text-white transition-colors">AI Work Planner</a>
            </div>
          </div>

          {/* Right: AI Status */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={14} />
              <span>AI Engine Operational</span>
            </div>
            <p className="text-xs text-gray-500 md:text-right">
              Built for students, teachers, and evaluators.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 StudyHub AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed for Excellence</span>
            <span>English + Hindi Supported</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
