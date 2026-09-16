import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import SamplePresets from './components/SamplePresets';
import NotetakerCard from './components/NotetakerCard';
import SummarizerCard from './components/SummarizerCard';
import WorkPlannerCard from './components/WorkPlannerCard';
import ProgressSection from './components/ProgressSection';
import StressReductionSection from './components/StressReductionSection';
import HowItWorksSection from './components/HowItWorksSection';
import AIConceptsSection from './components/AIConceptsSection';
import RecentActivity from './components/RecentActivity';
import AboutSection from './components/AboutSection';
import PrivacyNotice from './components/PrivacyNotice';
import Footer from './components/Footer';
import { checkBackendHealth } from './services/apiService';

const LOCAL_STORAGE_KEY = 'studyhub_ai_activities';

export default function App() {
  const [aiMode, setAiMode] = useState('demo');
  const [presetInput, setPresetInput] = useState({ notetaker: '', summarizer: '', planner: '' });
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function verifyHealth() {
      const health = await checkBackendHealth();
      if (health && health.aiStatus) {
        setAiMode(health.aiStatus);
      } else {
        setAiMode('demo');
      }
    }
    verifyHealth();
  }, []);

  const handleLogActivity = (newActivity) => {
    setActivities((prev) => {
      const updated = [newActivity, ...prev].slice(0, 10);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return updated;
    });
  };

  const handleClearActivities = () => {
    setActivities([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  };

  const handleSelectPreset = (preset) => {
    if (preset.type === 'notes') {
      setPresetInput(prev => ({ ...prev, notetaker: preset.text }));
      document.getElementById('notetaker')?.scrollIntoView({ behavior: 'smooth' });
    } else if (preset.type === 'summary') {
      setPresetInput(prev => ({ ...prev, summarizer: preset.text }));
      document.getElementById('summarizer')?.scrollIntoView({ behavior: 'smooth' });
    } else if (preset.type === 'planner') {
      setPresetInput(prev => ({ ...prev, planner: preset.text }));
      document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectToolFromHero = (toolId) => {
    document.getElementById(toolId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080D1C] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. NAVBAR */}
      <Header aiMode={aiMode} />

      <main className="flex-grow">
        
        {/* 2. HERO */}
        <HeroSection aiMode={aiMode} onSelectTool={handleSelectToolFromHero} />

        {/* 3. FEATURE HIGHLIGHTS STRIP */}
        <FeatureHighlights />

        {/* 4. AI STUDY WORKSPACE */}
        <section id="features" className="py-16 md:py-20 border-b border-white/5">
          <div id="dashboard" className="container">

            {/* Section Title */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20 mb-3 inline-block">
                AI STUDY WORKSPACE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Three tools. <span className="accent-gradient-text">One smarter study workflow.</span>
              </h2>
              <p className="text-base text-gray-300">
                Choose what you need help with and let StudyHub AI turn information into action.
              </p>
            </div>

            {/* 5. EXAMPLE SUBJECT PRESETS */}
            <SamplePresets onSelectPreset={handleSelectPreset} />

            {/* 3 Equal Columns Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
              <NotetakerCard initialText={presetInput.notetaker} onLogActivity={handleLogActivity} />
              <SummarizerCard initialText={presetInput.summarizer} onLogActivity={handleLogActivity} />
              <WorkPlannerCard initialGoal={presetInput.planner} onLogActivity={handleLogActivity} />
            </div>

          </div>
        </section>

        {/* 6. TODAY'S STUDY PROGRESS */}
        <ProgressSection />

        {/* 7. WHY STUDYHUB AI (STRESS REDUCTION) */}
        <StressReductionSection />

        {/* 8. HOW STUDYHUB AI WORKS */}
        <HowItWorksSection />

        {/* 9. UNDER THE HOOD (TECH CONCEPTS) */}
        <AIConceptsSection />

        {/* 10. RECENT ACTIVITY */}
        <div className="container">
          <RecentActivity activities={activities} onClearActivities={handleClearActivities} />
        </div>

        {/* 11. ABOUT STUDYHUB AI */}
        <AboutSection />

        {/* 12. PRIVACY */}
        <PrivacyNotice />

      </main>

      {/* 13. FOOTER */}
      <Footer />

    </div>
  );
}
