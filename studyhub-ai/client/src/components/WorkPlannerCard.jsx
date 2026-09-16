import React, { useState } from 'react';
import { Calendar, Sparkles, Copy, Check, Trash2, AlertTriangle, Clock, ArrowRightCircle } from 'lucide-react';
import { fetchPlan } from '../services/apiService';

const MAX_CHARS = 3000;

export default function WorkPlannerCard({ initialGoal = '', onLogActivity }) {
  const [goal, setGoal] = useState(initialGoal);
  const [deadline, setDeadline] = useState('');
  const [availableTime, setAvailableTime] = useState('30 min/day');
  const [difficulty, setDifficulty] = useState('Beginner');

  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  React.useEffect(() => {
    if (initialGoal) {
      setGoal(initialGoal);
      setErrorMsg('');
    }
  }, [initialGoal]);

  const handlePlanProject = async () => {
    setErrorMsg('');
    setWarningMsg('');

    if (!goal || goal.trim().length === 0) {
      setErrorMsg("Your goal is empty. Tell me what you want to accomplish.");
      return;
    }

    if (goal.length > MAX_CHARS) {
      setErrorMsg("That input is too long. Try a shorter version.");
      return;
    }

    setLoading(true);
    const res = await fetchPlan(goal, deadline, availableTime, difficulty);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "We couldn't generate your result right now. Please try again.");
      return;
    }

    setPlanData(res.result || null);
    if (res.warning) {
      setWarningMsg(res.warning);
    }

    if (onLogActivity) {
      onLogActivity({
        type: 'Planner',
        title: 'Built Study Plan',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        snippet: (goal.slice(0, 50) + '...')
      });
    }
  };

  const handleCopy = () => {
    if (!planData) return;
    let formatted = `PROJECT PLAN: ${planData.goal || goal}\nTotal Estimated Time: ${planData.totalEstimatedTime}\n\nSTEPS:\n`;
    (planData.steps || []).forEach(s => {
      formatted += `Step ${s.stepNumber}: ${s.title} (${s.estimatedTime})\n  Notes: ${s.notes || ''}\n`;
    });
    if (planData.suggestedNextAction) {
      formatted += `\nSUGGESTED NEXT ACTION: ${planData.suggestedNextAction}\n`;
    }
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearAll = () => {
    setGoal('');
    setPlanData(null);
    setErrorMsg('');
    setWarningMsg('');
  };

  const charCount = goal.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div id="planner" className="glass-card flex flex-col justify-between h-full">
      <div>
        
        {/* Card Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">AI Work Planner</h3>
            <p className="text-xs text-gray-400 mt-1">Turn a big goal into a practical step-by-step plan.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="alert-error" role="alert">
            <AlertTriangle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Goal Input Textarea */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="planner-goal" className="form-label mb-0">My Big Goal</label>
            {goal && (
              <button 
                onClick={() => setGoal('')} 
                className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 focus:outline-none transition-colors"
                title="Clear goal"
              >
                <Trash2 size={12} /> Clear Text
              </button>
            )}
          </div>

          <textarea
            id="planner-goal"
            rows={3}
            value={goal}
            onChange={(e) => { setGoal(e.target.value); setErrorMsg(''); }}
            placeholder="My big goal..."
            className="form-textarea min-h-[90px]"
            aria-label="My Big Goal Input"
          />
          <div className={`char-counter ${isOverLimit ? 'error' : charCount > 2700 ? 'warning' : ''}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
          <div>
            <label htmlFor="planner-deadline" className="text-xs font-semibold text-gray-300 block mb-1">Target Deadline</label>
            <input
              type="date"
              id="planner-deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="form-input text-xs py-2 px-2.5 h-10"
            />
          </div>

          <div>
            <label htmlFor="planner-time" className="text-xs font-semibold text-gray-300 block mb-1">Available Time</label>
            <select
              id="planner-time"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="form-select text-xs py-2 px-2.5 h-10"
            >
              <option value="30 min/day">30 min/day</option>
              <option value="1 hour/day">1 hour/day</option>
              <option value="2 hours/day">2 hours/day</option>
              <option value="Weekend Sprint">Weekend Sprint</option>
            </select>
          </div>

          <div>
            <label htmlFor="planner-difficulty" className="text-xs font-semibold text-gray-300 block mb-1">Difficulty</label>
            <select
              id="planner-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select text-xs py-2 px-2.5 h-10"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handlePlanProject}
          disabled={loading || isOverLimit}
          className="btn btn-primary w-full mb-6 btn-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-500/25"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Building your study plan...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>✦ Plan My Project</span>
            </>
          )}
        </button>

        {/* Output Box */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Project Plan</h4>
            {planData && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="btn btn-ghost btn-sm">
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button onClick={handleClearAll} className="btn btn-ghost btn-sm text-red-400 hover:text-red-300">
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="output-box">
            {warningMsg && (
              <p className="text-xs text-amber-400 mb-2 italic border-b border-amber-500/20 pb-1">{warningMsg}</p>
            )}

            {planData ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step Timeline</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <Clock size={12} />
                    <span>Total Estimated Time: {planData.totalEstimatedTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {(planData.steps || []).map((step) => (
                    <div key={step.stepNumber} className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-extrabold text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                        {String(step.stepNumber).padStart(2, '0')}
                      </span>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                          <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{step.estimatedTime}</span>
                        </div>
                        {step.notes && <p className="text-xs text-gray-400 mt-1">{step.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {planData.suggestedNextAction && (
                  <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-1">
                      <ArrowRightCircle size={14} className="text-cyan-400" />
                      <span>SUGGESTED NEXT ACTION</span>
                    </div>
                    <p className="text-sm font-medium text-gray-100">
                      {planData.suggestedNextAction}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-[120px] flex items-center justify-center text-center text-gray-500 text-sm italic">
                Your project plan will appear here.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
