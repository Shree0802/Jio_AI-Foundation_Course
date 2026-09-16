import React from 'react';
import { Sparkles, Check, Globe, Zap } from 'lucide-react';

export default function FeatureHighlights() {
  const highlights = [
    { icon: Sparkles, text: 'Instant Markdown Formatting', color: 'text-indigo-400' },
    { icon: Check, text: 'Context-Aware Responses', color: 'text-emerald-400' },
    { icon: Globe, text: 'English + Hindi Support', color: 'text-cyan-400' },
    { icon: Zap, text: 'Fast AI Workflow', color: 'text-amber-400' }
  ];

  return (
    <section className="py-6 border-b border-white/5 bg-[#0D1427]/40">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="feature-pill hover:scale-[1.02] transition-transform cursor-default"
              >
                <Icon size={14} className={item.color} />
                <span className="font-medium text-xs sm:text-sm text-gray-200">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
