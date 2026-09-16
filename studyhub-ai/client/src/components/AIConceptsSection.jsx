import React from 'react';
import { Network, Code, Hourglass, ShieldAlert, Cpu, ShieldCheck } from 'lucide-react';

export default function AIConceptsSection() {
  const concepts = [
    { 
      category: 'COMMUNICATION', 
      title: 'API', 
      desc: 'The bridge connecting the StudyHub AI app with the AI model.', 
      icon: Network 
    },
    { 
      category: 'DATA FORMAT', 
      title: 'JSON', 
      desc: 'Structured data used to send and receive information.', 
      icon: Code 
    },
    { 
      category: 'PERFORMANCE', 
      title: 'LATENCY', 
      desc: 'The time between sending a request and receiving an AI response.', 
      icon: Hourglass 
    },
    { 
      category: 'SECURITY', 
      title: 'RATE LIMITS', 
      desc: 'Fair request caps to ensure smooth performance for everyone.', 
      icon: ShieldAlert 
    },
    { 
      category: 'TEXT CAPACITY', 
      title: 'TOKENS', 
      desc: 'Basic building blocks of text processed by language models.', 
      icon: Cpu 
    },
    { 
      category: 'DATA SAFETY', 
      title: 'PRIVACY', 
      desc: 'Client-safe communication without exposing sensitive keys.', 
      icon: ShieldCheck 
    }
  ];

  return (
    <section className="py-16 md:py-20 border-t border-white/5">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-3 inline-block">
            UNDER THE HOOD
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Understanding the <span className="accent-gradient-text">Technology</span>
          </h2>
          <p className="text-base text-gray-300">
            Simple concepts powering the StudyHub AI experience.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 flex flex-col justify-between border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      {item.category}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    "{item.desc}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
