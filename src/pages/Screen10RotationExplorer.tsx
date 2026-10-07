import React, { useState } from 'react';
import {
  GitCompare,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Sprout,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG, PRESET_STRATEGIES } from '../data/crops';
import { CropKey } from '../types';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen10RotationExplorer: React.FC = () => {
  const {
    customRotationCrops,
    setCustomRotationCrops,
    addCropToRotation,
    removeCropFromRotation,
    moveCropInRotation,
    language,
    t,
    navigate,
  } = useApp();

  const [addModalOpen, setAddModalOpen] = useState(false);

  const availableCrops: CropKey[] = [
    'rice_aman',
    'rice_boro',
    'rice_aus',
    'legume_lentil',
    'legume_mung',
    'maize',
    'wheat',
    'potato',
    'mustard',
    'jute',
    'vegetables',
    'tomato',
    'cotton',
    'sugarcane',
    'fruits',
  ];

  const handleApplyPreset = (crops: CropKey[]) => {
    setCustomRotationCrops([...crops]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-emerald-700" />
          {t.rotationExplorer.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.rotationExplorer.subtitle}
        </p>
      </div>

      <DisclaimerBanner />

      {/* Current Sequence Builder Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-stone-900">
              {t.rotationExplorer.currentSequence}
            </h3>
            <p className="text-[11px] text-stone-500">
              Interactive timeline: order represents chronological planting seasons
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>{t.rotationExplorer.addCrop}</span>
          </button>
        </div>

        {/* Visual Sequence Chain */}
        <div className="space-y-2.5 my-4">
          {customRotationCrops.map((cropKey, index) => {
            const crop = CROPS_CATALOG[cropKey];
            return (
              <div
                key={`${cropKey}_${index}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                      <span>{language === 'bn' ? crop.nameBn : crop.nameEn}</span>
                      {crop.nitrogenFixer && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Nitrogen-Fixer
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>{language === 'bn' ? crop.seasonBn : crop.seasonEn}</span>
                      <span>•</span>
                      <span>Water Demand: {crop.waterDemand}</span>
                      <span>•</span>
                      <span>Root: {crop.rootDepth}</span>
                    </div>
                  </div>
                </div>

                {/* Reorder and Delete Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveCropInRotation(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200 disabled:opacity-30"
                    title={t.rotationExplorer.moveUp}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveCropInRotation(index, 'down')}
                    disabled={index === customRotationCrops.length - 1}
                    className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200 disabled:opacity-30"
                    title={t.rotationExplorer.moveDown}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeCropFromRotation(index)}
                    disabled={customRotationCrops.length <= 1}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 disabled:opacity-30 ml-1"
                    title={t.rotationExplorer.removeCrop}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons for this sequence */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
          <button
            onClick={() => navigate('strategy_compare')}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <GitCompare className="w-4 h-4 text-stone-700" />
            <span>{t.rotationExplorer.compareWithAnother}</span>
          </button>

          <button
            onClick={() => navigate('rotation_details')}
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span>{t.rotationExplorer.analyzeBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Cropping Patterns (Section 25) */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-sm text-stone-900">
            {t.rotationExplorer.presetStrategies}
          </h3>
          <p className="text-[11px] text-stone-500">
            Field-tested patterns from Bangladesh agricultural institutions (BARI, BRRI, BAU)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {PRESET_STRATEGIES.map((preset) => (
            <div
              key={preset.id}
              className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-emerald-400 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-bold text-xs text-stone-900">
                  {language === 'bn' ? preset.titleBn : preset.titleEn}
                </h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed max-w-xl">
                  {language === 'bn' ? preset.descriptionBn : preset.descriptionEn}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {preset.crops.map((k, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700"
                    >
                      {language === 'bn' ? CROPS_CATALOG[k].nameBn : CROPS_CATALOG[k].nameEn}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleApplyPreset(preset.crops)}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold whitespace-nowrap self-end sm:self-auto transition-colors"
              >
                {t.rotationExplorer.applyPreset}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Crop Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-base text-stone-900 mb-1">
              Select Crop to Append to Sequence
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Choose from Bangladesh cropping catalog
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {availableCrops.map((k) => {
                const c = CROPS_CATALOG[k];
                return (
                  <button
                    key={k}
                    onClick={() => {
                      addCropToRotation(k);
                      setAddModalOpen(false);
                    }}
                    className="p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all"
                  >
                    <div className="font-bold text-xs text-stone-900">
                      {language === 'bn' ? c.nameBn : c.nameEn}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {language === 'bn' ? c.seasonBn : c.seasonEn} • Water: {c.waterDemand}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

