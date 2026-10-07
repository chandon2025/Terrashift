import React from 'react';
import {
  GitCompare,
  CheckCircle2,
  AlertCircle,
  Droplets,
  Heart,
  Compass,
  Satellite,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRESET_STRATEGIES, analyzeRotationStrategy, CROPS_CATALOG } from '../data/crops';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen12CompareStrategies: React.FC = () => {
  const {
    customRotationCrops,
    farmProfile,
    nasaData,
    comparisonStrategyIds,
    toggleStrategyForComparison,
    language,
    t,
    navigate,
  } = useApp();

  // Create list of all strategies available for comparison: Custom + Presets
  const allStrategies = [
    {
      id: 'custom_sequence',
      titleEn: 'My Custom Sequence',
      titleBn: 'আমার নিজস্ব শস্য ধারা',
      crops: customRotationCrops,
    },
    ...PRESET_STRATEGIES,
  ];

  // Selected strategies to compare (2 to 3)
  const activeStrategies = allStrategies.filter((s) =>
    comparisonStrategyIds.includes(s.id)
  );

  return (
    <div className="max-w-5xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-emerald-700" />
          {t.compare.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.compare.subtitle}
        </p>
      </div>

      <DisclaimerBanner />

      {/* Select Strategies Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800">
            {t.compare.selectStrategies} (Select 2 or 3):
          </span>
          <span className="text-[11px] font-mono text-emerald-800 font-bold">
            {comparisonStrategyIds.length} Selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allStrategies.map((s) => {
            const isSelected = comparisonStrategyIds.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleStrategyForComparison(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {language === 'bn' ? s.titleBn : s.titleEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Transparent Comparative Notice (Section 27) */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          {t.compare.disclaimer}
        </p>
      </div>

      {/* Side-by-Side Comparison Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeStrategies.map((strat, colIdx) => {
          const analysis = analyzeRotationStrategy(
            strat.crops,
            farmProfile.soilType,
            farmProfile.waterAvailability,
            farmProfile.priorities,
            nasaData?.landSurfaceTemperature.value ?? null,
            nasaData?.soilMoisture.value ?? null
          );

          return (
            <div
              key={strat.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-colors"
            >
              {/* Header */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Strategy {String.fromCharCode(65 + colIdx)}
                </span>
                <h3 className="font-extrabold text-sm text-stone-900 mt-2">
                  {language === 'bn' ? strat.titleBn : strat.titleEn}
                </h3>
                <div className="text-xs font-bold text-emerald-800 bg-stone-50 p-2.5 rounded-xl border border-stone-100 mt-2 font-mono">
                  {analysis.sequenceText}
                </div>
              </div>

              {/* Dimension Comparison Blocks */}
              <div className="space-y-3.5 text-xs">
                {/* 1. Water Considerations */}
                <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                  <div className="flex items-center gap-1.5 font-bold text-sky-900 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-700" />
                    <span>{t.compare.waterComparison}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {language === 'bn' ? analysis.waterConsiderationBn : analysis.waterConsiderationEn}
                  </p>
                </div>

                {/* 2. Soil & Nitrogen Considerations */}
                <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                    <Heart className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.compare.soilComparison}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {language === 'bn' ? analysis.soilConsiderationBn : analysis.soilConsiderationEn}
                  </p>
                </div>

                {/* 3. Rotational Diversity */}
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.compare.diversityComparison}</span>
                    </div>
                    <span className="font-mono text-emerald-800">
                      {analysis.diversityIndex}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${analysis.diversityIndex}%` }}
                    />
                  </div>
                </div>

                {/* 4. Priority Alignment Score */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span>{t.compare.priorityAlignment}</span>
                    <span className="font-mono text-emerald-800 text-sm">
                      {analysis.priorityAlignmentScore} / 100
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-relaxed">
                    {language === 'bn' ? analysis.priorityAlignmentDetailsBn : analysis.priorityAlignmentDetailsEn}
                  </p>
                </div>
              </div>

              {/* Crops involved */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1">
                {strat.crops.map((k, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700"
                  >
                    {language === 'bn' ? CROPS_CATALOG[k].nameBn : CROPS_CATALOG[k].nameEn}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-4">
        <button
          onClick={() => navigate('rotation_explorer')}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explorer</span>
        </button>

        <button
          onClick={() => navigate('final_summary')}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <span>Generate Final Agricultural Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

