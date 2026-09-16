import React from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      title: 'Clarity',
      desc: 'Transforming overwhelming information into structured, digestible knowledge.',
      icon: Target
    },
    {
      title: 'Personalization',
      desc: 'Adapting to individual study goals, available time, and target deadlines.',
      icon: Compass
    },
    {
      title: 'Action',
      desc: 'Turning static notes and dense chapters into practical, actionable study plans.',
      icon: Sparkles
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 border-t border-white/5 bg-[#0D1427]/40">
      <div className="container">
        
        {/* Main Content */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3 inline-block">
            OUR MISSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            About <span className="accent-gradient-text">StudyHub AI</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            StudyHub AI is designed to make learning simpler by combining AI-powered organization, summarization, and planning into one student-friendly workspace.
          </p>
        </div>

        {/* 3 Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="glass-card p-6 border-white/10 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
