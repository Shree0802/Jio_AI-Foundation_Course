import React from 'react';
import { History, Trash2, Clock } from 'lucide-react';

export default function RecentActivity({ activities = [], onClearActivities }) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="glass-panel p-6 sm:p-8 mt-12 mb-12 border-white/10">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Recent Activity</h2>
            <p className="text-xs text-gray-400">Your recent StudyHub AI actions in this browser session</p>
          </div>
        </div>
        
        <button
          onClick={onClearActivities}
          className="btn btn-ghost btn-sm text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 focus:outline-none transition-colors"
          title="Clear recent history"
        >
          <Trash2 size={14} /> 
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activities.slice(0, 6).map((item, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3 hover:bg-white/10 transition-colors">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              {item.type}
            </span>
            <div className="overflow-hidden flex-grow">
              <h3 className="text-sm font-semibold text-white truncate mb-1">{item.title}</h3>
              <p className="text-xs text-gray-400 truncate">{item.snippet}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-2">
                <Clock size={12} />
                <span>{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
