import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function AIStatusBadge({ mode = 'live' }) {
  const isDemo = mode === 'demo' || mode === 'demo-fallback' || mode === 'offline';

  if (isDemo) {
    return (
      <div 
        className="badge badge-demo animate-fade-in"
        title="Running in Demo Mode with pre-formatted sample responses. Add GEMINI_API_KEY to server/.env for live AI."
        role="status"
        aria-live="polite"
      >
        <AlertCircle size={14} />
        <span>Demo Mode • Connect AI API for Live Responses</span>
      </div>
    );
  }

  return (
    <div 
      className="badge badge-live animate-fade-in"
      title="Connected to Gemini AI API"
      role="status"
      aria-live="polite"
    >
      <Sparkles size={14} className="text-emerald-400" />
      <span>AI Study Assistant • Ready</span>
    </div>
  );
}
