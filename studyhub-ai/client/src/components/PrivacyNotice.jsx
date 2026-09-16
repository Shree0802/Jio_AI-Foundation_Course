import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyNotice() {
  return (
    <section className="py-8 border-t border-white/5">
      <div className="container">
        <div className="glass-card p-5 max-w-3xl mx-auto border-indigo-500/20 bg-indigo-950/20 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-300">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-0.5 text-base">Privacy First</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              StudyHub AI only needs the information required to help with your task. Avoid entering sensitive personal information. Your study inputs are processed in-memory responsibly without storing personal identity details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
