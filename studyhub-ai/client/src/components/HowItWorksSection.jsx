import React from 'react';
import { ArrowRight, FileInput, Cpu, Sparkles, GraduationCap } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    { 
      num: '01', 
      title: 'INPUT', 
      desc: 'Paste notes, content, or your project goal.', 
      icon: FileInput 
    },
    { 
      num: '02', 
      title: 'AI ANALYSIS', 
      desc: 'The AI identifies key information and structure.', 
      icon: Cpu 
    },
    { 
      num: '03', 
      title: 'PERSONALIZED OUTPUT', 
      desc: 'Receive organized notes, summaries, or plans.', 
      icon: Sparkles 
    },
    { 
      num: '04', 
      title: 'LEARN & IMPROVE', 
      desc: 'Use the result to revise, practice, and progress.', 
      icon: GraduationCap 
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 border-t border-white/5 bg-[#0D1427]/30">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 mb-3 inline-block">
            PROCESS WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            How <span className="accent-gradient-text">StudyHub AI Works</span>
          </h2>
          <p className="text-base text-gray-300">
            From messy information to meaningful progress.
          </p>
        </div>

        {/* 4 Steps Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 relative flex flex-col justify-between h-full border-white/10 hover:border-indigo-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      Step {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.desc}</p>
                </div>

                {/* Horizontal Connector Arrow on Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-indigo-400/50 bg-[#080D1C] p-1 rounded-full border border-white/10">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
