import React, { useState } from 'react';
import { BookOpen, Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Header({ aiMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] border-b border-white/10 bg-[#080D1C]/80 backdrop-blur-xl flex items-center">
      <div className="container flex items-center justify-between">
        
        {/* Left: Brand Logo & Tagline */}
        <a href="#home" className="flex items-center gap-3 group focus:outline-none rounded-xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5 leading-none">
              StudyHub <span className="accent-gradient-text">AI</span>
            </span>
            <span className="text-xs font-medium text-gray-400 mt-1">
              Your Smart Study Companion
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
          <a href="#home" className="hover:text-white transition-colors py-1">Home</a>
          <a href="#features" className="hover:text-white transition-colors py-1">AI Tools</a>
          <a href="#how-it-works" className="hover:text-white transition-colors py-1">How It Works</a>
          <a href="#about" className="hover:text-white transition-colors py-1">About</a>
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <CheckCircle2 size={14} />
            <span>AI Ready</span>
          </div>

          <a href="#dashboard" className="btn btn-primary btn-sm text-xs font-semibold">
            <Sparkles size={14} />
            <span>Open Study Tools</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none rounded-xl border border-white/10 bg-white/5"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 border-b border-white/10 bg-[#0D1427] px-6 py-4 space-y-3 shadow-2xl animate-fade-in backdrop-blur-2xl">
          <a 
            href="#home" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-200 hover:text-white font-medium py-2 text-sm border-b border-white/5"
          >
            Home
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-200 hover:text-white font-medium py-2 text-sm border-b border-white/5"
          >
            AI Tools
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-200 hover:text-white font-medium py-2 text-sm border-b border-white/5"
          >
            How It Works
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-200 hover:text-white font-medium py-2 text-sm border-b border-white/5"
          >
            About
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <a 
              href="#dashboard" 
              onClick={() => setMobileMenuOpen(false)} 
              className="btn btn-primary w-full justify-center text-sm"
            >
              <Sparkles size={16} />
              <span>Open Study Tools</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
