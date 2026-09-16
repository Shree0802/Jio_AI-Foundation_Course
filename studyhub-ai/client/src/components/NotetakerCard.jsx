import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Check, Trash2, Download, AlertTriangle } from 'lucide-react';
import { fetchOrganizeNotes } from '../services/apiService';

const MAX_CHARS = 5000;

export default function NotetakerCard({ initialText = '', onLogActivity }) {
  const [inputText, setInputText] = useState(initialText);
  const [outputText, setOutputText] = useState('');
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

  const handleOrganize = async () => {
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
    const res = await fetchOrganizeNotes(inputText);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "We couldn't generate your result right now. Please try again.");
      return;
    }

    setOutputText(res.result || '');
    if (res.warning) {
      setWarningMsg(res.warning);
    }

    if (onLogActivity) {
      onLogActivity({
        type: 'Notetaker',
        title: 'Organized Study Notes',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        snippet: (inputText.slice(0, 50) + '...')
      });
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearAll = () => {
    setInputText('');
    setOutputText('');
    setErrorMsg('');
    setWarningMsg('');
  };

  const handleDownload = () => {
    if (!outputText) return;
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Organized_Notes_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div id="notetaker" className="glass-card flex flex-col justify-between h-full">
      <div>
        
        {/* Card Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">AI Notetaker</h3>
            <p className="text-xs text-gray-400 mt-1">Turn messy notes into clear, organized study material.</p>
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
            <label htmlFor="notetaker-input" className="form-label mb-0">Messy Notes</label>
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
            id="notetaker-input"
            rows={5}
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); setErrorMsg(''); }}
            placeholder="Paste messy notes..."
            className="form-textarea min-h-[140px]"
            aria-label="Messy Notes Input"
          />

          <div className={`char-counter ${isOverLimit ? 'error' : charCount > 4500 ? 'warning' : ''}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handleOrganize}
          disabled={loading || isOverLimit}
          className="btn btn-primary w-full mb-6 btn-lg"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Organizing your notes...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>✦ Organize Notes</span>
            </>
          )}
        </button>

        {/* Output Box */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Your Organized Notes</h4>
            {outputText && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="btn btn-ghost btn-sm">
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button onClick={handleDownload} className="btn btn-ghost btn-sm">
                  <Download size={14} />
                  <span>Download</span>
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
            {outputText ? (
              <div className="markdown-output whitespace-pre-line">
                {outputText}
              </div>
            ) : (
              <div className="min-h-[120px] flex items-center justify-center text-center text-gray-500 text-sm italic">
                Your organized notes will appear here.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
