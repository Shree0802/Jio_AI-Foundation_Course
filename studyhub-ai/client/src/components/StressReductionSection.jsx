import React from 'react';
import { Layers, CheckCircle2, Award } from 'lucide-react';

export default function StressReductionSection() {
  const cards = [
    {
      num: '01',
      title: 'Reduce Information Overload',
      desc: 'Turn long and messy chapters into structured revision notes.',
      icon: Layers,
      color: 'indigo'
    },
    {
      num: '02',
      title: 'Break Big Tasks Down',
      desc: 'Convert overwhelming projects into achievable steps.',
      icon: CheckCircle2,
      color: 'purple'
    },
    {
      num: '03',
      title: 'Build Learning Confidence',
      desc: 'Get explanations, summaries, and practice support whenever you need it.',
      icon: Award,
      color: 'cyan'
    }
  ];

  return (
    <section className="py-16 md:py-20 border-t border-white/5">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3 inline-block">
            WHY STUDYHUB AI?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Less Overwhelm. <span className="accent-gradient-text">More Progress.</span>
          </h2>
          <p className="text-base text-gray-300">
            StudyHub AI helps students turn information overload into a clear path forward.
          </p>
        </div>

        {/* 3 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 border-white/10 flex flex-col justify-between hover:border-indigo-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {card.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    "{card.desc}"
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
