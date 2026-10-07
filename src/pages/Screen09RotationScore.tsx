import React, { useState } from 'react';
import {
  Calculator,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Scale,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeRotationStrategy } from '../data/crops';
import { ScoreMethodologyModal } from '../components/ScoreMethodologyModal';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen09RotationScore: React.FC = () => {
  const {
    farmProfile,
    customRotationCrops,
    nasaData,
    language,
    t,
    navigate,
  } = useApp();

  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);

  // Check if there is enough information (Section 24)
  const hasSufficientInfo =
    customRotationCrops.length >= 2 &&
    farmProfile.priorities.length > 0 &&
    farmProfile.soilType !== 'unknown';

  const analysis = hasSufficientInfo
    ? analyzeRotationStrategy(
        customRotationCrops,
        farmProfile.soilType,
        farmProfile.waterAvailability,
        farmProfile.priorities,
        nasaData?.landSurfaceTemperature.value ?? null,
        nasaData?.soilMoisture.value ?? null
      )
    : null;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-700" />
          {t.rotationScore.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.rotationScore.subtitle}
        </p>
      </div>

      <DisclaimerBanner compact />

      {/* Main Score Card or Insufficient State */}
      {!hasSufficientInfo || !analysis ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center shadow-soft">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-1">
            {t.rotationScore.insufficientInfo}
          </h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto mb-6 leading-relaxed">
            TerraShift does not invent arbitrary scores without sufficient agronomic parameters. Please provide your soil type, priorities, and at least 2 crops in your sequence.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate('farm_info')}
              className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700"
            >
              Complete Farm Information
            </button>
            <button
              onClick={() => navigate('rotation_explorer')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200"
            >
              Configure Rotation Crops
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Numerical Score Display */}
          <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-soft text-center relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setMethodologyModalOpen(true)}
                className="text-stone-400 hover:text-stone-600 p-1"
                title="View Calculation Formula"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t.rotationScore.scoreLabel}
            </span>

            {/* Big Score Gauge */}
            <div className="my-6">
              <span className="text-6xl font-black text-stone-900">
                {analysis.priorityAlignmentScore}
              </span>
              <span className="text-2xl font-bold text-stone-500"> / 100</span>
            </div>

            <p className="text-sm font-bold text-emerald-900">
              {analysis.priorityAlignmentScore >= 80
                ? (language === 'bn' ? 'উচ্চ ভারসাম্যপূর্ণ শস্য পর্যায়' : 'Highly Balanced Rotational Profile')
                : analysis.priorityAlignmentScore >= 60
                ? (language === 'bn' ? 'মাঝারি ভারসাম্যপূর্ণ শস্য পর্যায়' : 'Moderately Balanced Profile')
                : (language === 'bn' ? 'শস্য বৈচিত্র্য বৃদ্ধির সুযোগ রয়েছে' : 'Opportunity for Greater Rotational Diversity')}
            </p>

            <p className="text-xs text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
              {language === 'bn' ? analysis.priorityAlignmentDetailsBn : analysis.priorityAlignmentDetailsEn}
            </p>
          </div>

          {/* Factors Evaluated (Factor Breakdown) */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              {t.rotationScore.factorsUsed}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span>{t.rotationScore.factor1}</span>
                <span className="font-bold text-emerald-800 font-mono">30%</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span>{t.rotationScore.factor2}</span>
                <span className="font-bold text-emerald-800 font-mono">30%</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span>{t.rotationScore.factor3}</span>
                <span className="font-bold text-emerald-800 font-mono">20%</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                <span>{t.rotationScore.factor4}</span>
                <span className="font-bold text-emerald-800 font-mono">20%</span>
              </div>
            </div>

            <button
              onClick={() => setMethodologyModalOpen(true)}
              className="text-xs font-bold text-sky-800 hover:underline pt-2 block"
            >
              Inspect Detailed Mathematical Weights & Formula ↗
            </button>
          </div>

          {/* Limitations Notice (Section 24) */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t.rotationScore.limitationsTitle}: </span>
              {t.rotationScore.limitationsDesc}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigate('dashboard')}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              ← Back to Dashboard
            </button>

            <button
              onClick={() => navigate('rotation_explorer')}
              className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <span>Explore Sequence in Detail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Methodology Modal */}
      <ScoreMethodologyModal
        isOpen={methodologyModalOpen}
        onClose={() => setMethodologyModalOpen(false)}
      />
    </div>
  );
};

