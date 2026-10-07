import React from 'react';
import {
  Layers,
  Heart,
  Droplets,
  Satellite,
  Compass,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertCircle,
  GitCompare,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeRotationStrategy } from '../data/crops';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen11RotationDetails: React.FC = () => {
  const {
    customRotationCrops,
    farmProfile,
    nasaData,
    language,
    t,
    navigate,
  } = useApp();

  const analysis = analyzeRotationStrategy(
    customRotationCrops,
    farmProfile.soilType,
    farmProfile.waterAvailability,
    farmProfile.priorities,
    nasaData?.landSurfaceTemperature.value ?? null,
    nasaData?.soilMoisture.value ?? null
  );

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-700" />
          {t.rotationDetails.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.rotationDetails.subtitle}
        </p>
      </div>

      <DisclaimerBanner />

      {/* Sequence Header Badge */}
      <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-soft">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Evaluated Sequence
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-3">
          {analysis.sequenceText}
        </h2>

        {/* Crops Metadata Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {analysis.crops.map((c, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
            >
              <div className="font-bold text-stone-900">
                {language === 'bn' ? c.nameBn : c.nameEn}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">
                {language === 'bn' ? c.seasonBn : c.seasonEn} • Water: {c.waterDemand}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Thematic Dimension Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Soil Health Considerations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Heart className="w-4 h-4 text-emerald-700" />
            <h3>{t.rotationDetails.soilHealthTitle}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn' ? analysis.soilConsiderationBn : analysis.soilConsiderationEn}
          </p>
        </div>

        {/* 2. Water Resource Considerations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
            <Droplets className="w-4 h-4 text-sky-700" />
            <h3>{t.rotationDetails.waterTitle}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn' ? analysis.waterConsiderationBn : analysis.waterConsiderationEn}
          </p>
        </div>

        {/* 3. Rotational Diversity Index */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Compass className="w-4 h-4 text-amber-600" />
              <h3>{t.rotationDetails.diversityTitle}</h3>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {analysis.diversityIndex} / 100
            </span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn' ? analysis.diversityExplanationBn : analysis.diversityExplanationEn}
          </p>
        </div>

        {/* 4. Climate Match (NASA Observations) */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
            <Satellite className="w-4 h-4 text-sky-700" />
            <h3>{t.rotationDetails.climateTitle}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'bn' ? analysis.climateMatchBn : analysis.climateMatchEn}
          </p>
        </div>
      </div>

      {/* Potential Considerations Checklist (Strict Humble Language) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-700" />
          {t.rotationDetails.potentialConsiderations}
        </h3>

        <div className="space-y-2 text-xs text-stone-700">
          {(language === 'bn' ? analysis.potentialConsiderationsBn : analysis.potentialConsiderationsEn).map(
            (item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Limitations Notice */}
      <div className="bg-stone-100 rounded-2xl p-4 text-[11px] text-stone-600 leading-relaxed">
        <span className="font-bold text-stone-800">
          {language === 'bn' ? 'সিদ্ধান্ত-সহায়ক সীমাবদ্ধতা: ' : 'Decision-Support Limitations: '}
        </span>
        {language === 'bn' ? analysis.limitationsBn : analysis.limitationsEn}
      </div>

      {/* Bottom Action Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('rotation_explorer')}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Sequence</span>
        </button>

        <button
          onClick={() => navigate('strategy_compare')}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare With Other Strategies</span>
        </button>
      </div>
    </div>
  );
};
