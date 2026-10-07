import React from 'react';
import { Globe, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const Screen01Language: React.FC = () => {
  const { language, setLanguage, navigate, t } = useApp();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigate('splash');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-950 to-stone-950 text-white flex flex-col justify-between p-6">
      {/* Top Decoration */}
      <div className="max-w-md mx-auto w-full pt-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-xl">
          🌱
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {t.languageSelect.titleBn}
        </h1>
        <p className="text-base font-semibold text-emerald-200">
          {t.languageSelect.title}
        </p>
        <p className="text-xs text-stone-300 mt-2 max-w-xs mx-auto">
          {t.languageSelect.subtitleBn}
        </p>
      </div>

      {/* Language Options Cards */}
      <div className="max-w-md mx-auto w-full space-y-4 my-8">
        {/* Bengali Option */}
        <button
          onClick={() => handleSelect('bn')}
          className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            language === 'bn'
              ? 'bg-emerald-600/30 border-emerald-400 shadow-lg shadow-emerald-950/50 scale-[1.02]'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🇧🇩</span>
            <div>
              <div className="font-bengali font-bold text-lg text-white">বাংলা</div>
              <div className="text-xs text-emerald-200">বাংলা ভাষায় ব্যবহার করুন</div>
            </div>
          </div>
          {language === 'bn' && (
            <div className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          )}
        </button>

        {/* English Option */}
        <button
          onClick={() => handleSelect('en')}
          className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
            language === 'en'
              ? 'bg-sky-600/30 border-sky-400 shadow-lg shadow-sky-950/50 scale-[1.02]'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🌐</span>
            <div>
              <div className="font-bold text-lg text-white">English</div>
              <div className="text-xs text-sky-200">Continue in English</div>
            </div>
          </div>
          {language === 'en' && (
            <div className="w-6 h-6 rounded-full bg-sky-400 text-sky-950 flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          )}
        </button>
      </div>

      {/* Continue Action */}
      <div className="max-w-md mx-auto w-full pb-6">
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-emerald-950 font-bold text-base shadow-xl flex items-center justify-center gap-2 group transition-all"
        >
          <span>{language === 'bn' ? 'এগিয়ে যান' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[11px] text-center text-stone-400 mt-3">
          NASA Space Apps Challenge 2026 • Bangladesh
        </p>
      </div>
    </div>
  );
};

