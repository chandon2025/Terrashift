import React from 'react';
import { ArrowRight, Satellite, Globe, Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Screen02Splash: React.FC = () => {
  const { t, language, navigate } = useApp();

  return (
    <div className="min-h-screen bg-radial from-emerald-900 via-stone-900 to-black text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Orbital Aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-sky-400/40 animate-pulse" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full border border-emerald-400/30" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full border border-amber-400/20" />
      </div>

      {/* Top NASA Badge */}
      <div className="max-w-md mx-auto w-full pt-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-200">
          <Satellite className="w-3.5 h-3.5 text-sky-300" />
          <span>NASA Space Apps Challenge 2026</span>
        </div>
        <span className="text-xs text-stone-400 font-mono">v1.0 • Bangladesh</span>
      </div>

      {/* Center Core Visual & Hero Content */}
      <div className="max-w-md mx-auto w-full text-center z-10 py-12">
        {/* Visual Concept: Earth + Agricultural Sprout + Orbiting Satellite */}
        <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
          {/* Orbit rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-sky-400/40 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute -inset-4 rounded-full border border-emerald-500/20" />

          {/* Earth & Field Globe */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-sky-950 via-emerald-900 to-emerald-700 border-2 border-emerald-400/50 shadow-2xl flex items-center justify-center overflow-hidden relative">
            {/* Field contour waves */}
            <div className="absolute -bottom-4 inset-x-0 h-16 bg-gradient-to-t from-stone-900 to-emerald-800/80 rounded-t-full opacity-70" />
            <span className="text-5xl filter drop-shadow-lg z-10">🌱</span>
          </div>

          {/* Orbiting Satellite Node */}
          <div className="absolute top-2 right-2 bg-sky-900 border border-sky-400 text-sky-200 text-xs p-1.5 rounded-lg shadow-lg flex items-center gap-1 animate-bounce" style={{ animationDuration: '4s' }}>
            <Satellite className="w-4 h-4 text-sky-300" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-emerald-300 via-white to-sky-300 bg-clip-text text-transparent">
          {t.app.title}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-bold text-emerald-200 tracking-tight leading-snug">
          "{t.app.tagline}"
        </p>

        {/* Subtitle */}
        <p className="text-xs text-stone-300 mt-3 max-w-sm mx-auto leading-relaxed">
          {t.app.taglineSub}
        </p>
      </div>

      {/* Bottom Button Action */}
      <div className="max-w-md mx-auto w-full pb-6 z-10">
        <button
          onClick={() => navigate('onboarding')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 hover:from-emerald-400 hover:to-sky-300 text-stone-950 font-extrabold text-base shadow-xl flex items-center justify-center gap-2 group transition-all"
        >
          <span>{t.splash.getStarted}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

