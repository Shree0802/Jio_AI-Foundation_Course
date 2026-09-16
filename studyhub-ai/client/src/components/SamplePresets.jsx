import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/samplePresets';

export default function SamplePresets({ onSelectPreset }) {
  return (
    <div className="mb-8 bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-300 uppercase tracking-wider">
        <Sparkles size={14} className="text-indigo-400" />
        <span>Try an Example Subject:</span>
      </div>
      
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar sm:flex-wrap">
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="btn btn-secondary btn-sm text-xs rounded-full px-4 bg-white/5 hover:bg-indigo-600/20 hover:border-indigo-500/40 hover:text-white transition-all border border-white/10 shrink-0 flex items-center gap-1.5"
            title={`Load ${preset.label} preset into study tools`}
          >
            <BookOpen size={12} className="text-indigo-400" />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
