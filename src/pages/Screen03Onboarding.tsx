import React, { useState } from 'react';
import { Satellite, Sprout, GitCompare, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Screen03Onboarding: React.FC = () => {
  const { t, navigate } = useApp();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      icon: Satellite,
      badge: 'NASA Earth Observation',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      title: t.onboarding.slide1Title,
      desc: t.onboarding.slide1Desc,
      visual: (
        <div className="w-48 h-48 mx-auto rounded-3xl bg-gradient-to-tr from-sky-900 to-emerald-800 p-6 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden border border-white/20">
          <Satellite className="w-16 h-16 text-sky-300 mb-2 animate-pulse" />
          <div className="text-[11px] font-mono text-emerald-200">MODIS • GPM • SMAP</div>
          <div className="text-[10px] text-stone-300 mt-1">1 km to 36 km Data Grids</div>
        </div>
      ),
    },
    {
      icon: Sprout,
      badge: 'Local Farming Context',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      title: t.onboarding.slide2Title,
      desc: t.onboarding.slide2Desc,
      visual: (
        <div className="w-48 h-48 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-800 to-amber-900 p-6 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden border border-white/20">
          <Sprout className="w-16 h-16 text-emerald-300 mb-2" />
          <div className="text-[11px] font-mono text-amber-200">Crops • Soil • Water</div>
          <div className="text-[10px] text-stone-300 mt-1">Farmer Reported Inputs</div>
        </div>
      ),
    },
    {
      icon: GitCompare,
      badge: 'Decision-Support Exploration',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      title: t.onboarding.slide3Title,
      desc: t.onboarding.slide3Desc,
      visual: (
        <div className="w-48 h-48 mx-auto rounded-3xl bg-gradient-to-tr from-stone-900 to-emerald-950 p-6 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden border border-white/20">
          <GitCompare className="w-16 h-16 text-amber-400 mb-2" />
          <div className="text-[11px] font-mono text-emerald-300">Compare Strategies</div>
          <div className="text-[10px] text-stone-400 mt-1">Exploratory • No Guarantees</div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('location');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col justify-between p-6">
      {/* Top Header & Skip */}
      <div className="max-w-md mx-auto w-full pt-4 flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-800">
          🌱 TerraShift
        </span>
        <button
          onClick={() => navigate('location')}
          className="text-xs font-semibold text-stone-500 hover:text-stone-800 py-1 px-3 rounded-lg hover:bg-stone-200/60 transition-colors"
        >
          {t.onboarding.skip}
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-md mx-auto w-full text-center py-6">
        {/* Visual */}
        <div className="mb-6">{current.visual}</div>

        {/* Badge */}
        <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border mb-3 ${current.badgeColor}`}>
          {current.badge}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-3">
          {current.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
          {current.desc}
        </p>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-emerald-700' : 'w-2 bg-stone-300'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-md mx-auto w-full pb-6 flex items-center gap-3">
        {currentSlide > 0 && (
          <button
            onClick={handleBack}
            className="p-4 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors shadow-sm"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all"
        >
          <span>
            {currentSlide === slides.length - 1
              ? t.onboarding.start
              : t.onboarding.next}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

