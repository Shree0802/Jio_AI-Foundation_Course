import React, { useState } from 'react';
import { AlignLeft, Sparkles, Copy, Check, Trash2, AlertTriangle, Lightbulb } from 'lucide-react';
import { fetchSummarize } from '../services/apiService';

const MAX_CHARS = 5000;

export default function SummarizerCard({ initialText = '', onLogActivity }) {
  const [inputText, setInputText] = useState(initialText);
  const [outputData, setOutputData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [warningMsg, setWarningMsg] = useState('');

  React.useEffect(() => {
    if (initialText) {
      setInputText(initialText);
      setErrorMsg('');
    }
  }, [initialText]);

  const handleSummarize = async () => {
    setErrorMsg('');
    setWarningMsg('');

    if (!inputText || inputText.trim().length === 0) {
      setErrorMsg("Looks empty. Paste some content first.");
      return;
    }

    if (inputText.length > MAX_CHARS) {
      setErrorMsg("That input is too long. Try a shorter version.");
      return;
    }

    setLoading(true);
    const res = await fetchSummarize(inputText);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "We couldn't generate your result right now. Please try again.");
      return;
    }

    setOutputData(res.result || null);
    if (res.warning) {
      setWarningMsg(res.warning);
    }

    if (onLogActivity) {
      onLogActivity({
        type: 'Summarizer',
        title: 'Summarized Revision Points',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        snippet: (inputText.slice(0, 50) + '...')
      });
    }
  };

  const handleCopy = () => {
    if (!outputData) return;
    const copyString = `SUMMARY:\n${(outputData.bullets || []).map(b => `• ${b}`).join('\n')}\n\nKEY TAKEAWAY:\n${outputData.keyTakeaway || ''}`;
    navigator.clipboard.writeText(copyString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearAll = () => {
    setInputText('');
    setOutputData(null);
    setErrorMsg('');
    setWarningMsg('');
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div id="summarizer" className="glass-card flex flex-col justify-between h-full">
      <div>
        
        {/* Card Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <AlignLeft size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">AI Summarizer</h3>
            <p className="text-xs text-gray-400 mt-1">Turn long paragraphs into quick revision points.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="alert-error" role="alert">
            <AlertTriangle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Input Text Area */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="summarizer-input" className="form-label mb-0">Input Paragraph</label>
            {inputText && (
              <button 
                onClick={() => setInputText('')} 
                className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 focus:outline-none transition-colors"
                title="Clear input"
              >
                <Trash2 size={12} /> Clear Text
              </button>
            )}
          </div>

          <textarea
            id="summarizer-input"
            rows={5}
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); setErrorMsg(''); }}
            placeholder="Paste a long paragraph..."
            className="form-textarea min-h-[140px]"
            aria-label="Input Paragraph"
          />

          <div className={`char-counter ${isOverLimit ? 'error' : charCount > 4500 ? 'warning' : ''}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handleSummarize}
          disabled={loading || isOverLimit}
          className="btn btn-primary w-full mb-6 btn-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-purple-500/25"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Finding the key ideas...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>✦ Summarize Text</span>
            </>
          )}
        </button>

        {/* Output Box */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Summary & Takeaway</h4>
            {outputData && (
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

            {outputData ? (
              <div className="space-y-3 text-sm text-gray-200">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Key Points</h5>
                  <ul className="space-y-1.5">
                    {(outputData.bullets || []).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {outputData.keyTakeaway && (
                  <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 mt-2 shadow-inner">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1">
                      <Lightbulb size={14} className="text-amber-400" />
                      <span>KEY TAKEAWAY</span>
                    </div>
                    <p className="text-sm font-medium text-white italic">
                      "{outputData.keyTakeaway}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-[120px] flex items-center justify-center text-center text-gray-500 text-sm italic">
                Your summary will appear here.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
