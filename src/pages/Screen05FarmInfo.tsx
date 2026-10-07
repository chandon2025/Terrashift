import React from 'react';
import { Sprout, Droplets, MapPin, Layers, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG } from '../data/crops';
import { CropKey, SoilTypeKey, WaterAvailabilityKey } from '../types';

export const Screen05FarmInfo: React.FC = () => {
  const { farmProfile, updateFarmProfile, location, language, t, navigate } = useApp();

  const handleCropChange = (crop: CropKey) => {
    updateFarmProfile({ currentCrop: crop });
  };

  const handleSoilChange = (soil: SoilTypeKey) => {
    updateFarmProfile({ soilType: soil });
  };

  const handleWaterChange = (water: WaterAvailabilityKey) => {
    updateFarmProfile({ waterAvailability: water });
  };

  const cropsList: CropKey[] = [
    'rice_aman',
    'rice_boro',
    'rice_aus',
    'maize',
    'wheat',
    'potato',
    'legume_lentil',
    'legume_mung',
    'mustard',
    'jute',
    'vegetables',
    'tomato',
    'cotton',
    'sugarcane',
    'fruits',
    'other',
  ];

  const soilOptions: { key: SoilTypeKey; label: string; desc: string }[] = [
    {
      key: 'loamy',
      label: t.farmInfo.soilTypes.loamy,
      desc: language === 'bn' ? 'ভারসাম্যপূর্ণ উর্বর মাটি' : 'Balanced, fertile texture',
    },
    {
      key: 'sandy',
      label: t.farmInfo.soilTypes.sandy,
      desc: language === 'bn' ? 'দ্রুত পানি নিষ্কাশন হয়' : 'Fast drainage, light texture',
    },
    {
      key: 'clay',
      label: t.farmInfo.soilTypes.clay,
      desc: language === 'bn' ? 'পানি আটকে রাখে, ভারী মাটি' : 'Heavy, high water retention',
    },
    {
      key: 'silty',
      label: t.farmInfo.soilTypes.silty,
      desc: language === 'bn' ? 'নদী অববাহিকার মিহি পলি' : 'Fine floodplain deposits',
    },
    {
      key: 'other',
      label: t.farmInfo.soilTypes.other,
      desc: language === 'bn' ? 'মিশ্র বা লবণাক্ত' : 'Mixed or saline',
    },
    {
      key: 'unknown',
      label: t.farmInfo.soilTypes.unknown,
      desc: language === 'bn' ? 'পরীক্ষা করা হয়নি' : 'Not tested yet',
    },
  ];

  const waterOptions: { key: WaterAvailabilityKey; label: string }[] = [
    { key: 'available', label: t.farmInfo.waterOptions.available },
    { key: 'limited', label: t.farmInfo.waterOptions.limited },
    { key: 'not_available', label: t.farmInfo.waterOptions.not_available },
    { key: 'unknown', label: t.farmInfo.waterOptions.unknown },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Sprout className="w-6 h-6 text-emerald-700" />
          {t.farmInfo.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.farmInfo.subtitle}
        </p>
      </div>

      {/* Selected Location Pill */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-900 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
              Selected Farm Location
            </div>
            <div className="text-sm font-bold text-stone-900">
              {language === 'bn' ? location.nameBn : location.name}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('location')}
          className="text-xs font-semibold text-emerald-800 hover:underline"
        >
          Change
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-6">
        {/* Farm Name (Optional) & Size (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {t.farmInfo.farmNameLabel}
            </label>
            <input
              type="text"
              value={farmProfile.farmName || ''}
              onChange={(e) => updateFarmProfile({ farmName: e.target.value })}
              placeholder={t.farmInfo.farmNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              {t.farmInfo.farmSizeLabel}
            </label>
            <input
              type="number"
              step="0.1"
              value={farmProfile.farmSizeAcres || ''}
              onChange={(e) => updateFarmProfile({ farmSizeAcres: parseFloat(e.target.value) || 0 })}
              placeholder={t.farmInfo.farmSizePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Current Crop */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1">
            {t.farmInfo.currentCropLabel}
          </label>
          <p className="text-[11px] text-stone-700 mb-3">
            {t.farmInfo.currentCropHelp}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cropsList.map((key) => {
              const crop = CROPS_CATALOG[key];
              const isSelected = farmProfile.currentCrop === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCropChange(key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900">
                    {language === 'bn' ? crop.nameBn : crop.nameEn}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {language === 'bn' ? crop.seasonBn : crop.seasonEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Soil Information (Mandatory Farmer Input Labeling) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-stone-800">
              {t.farmInfo.soilTypeLabel}
            </label>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Farmer Reported Input
            </span>
          </div>

          {/* Scientific Disclaimer on User Input */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 mb-3 text-[11px] text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>{t.farmInfo.soilTypeHelp}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {soilOptions.map((opt) => {
              const isSelected = farmProfile.soilType === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSoilChange(opt.key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900">
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {opt.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Water Availability */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1">
            {t.farmInfo.waterAvailabilityLabel}
          </label>
          <p className="text-[11px] text-stone-700 mb-3">
            {t.farmInfo.waterAvailabilityHelp}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {waterOptions.map((opt) => {
              const isSelected = farmProfile.waterAvailability === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleWaterChange(opt.key)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span className="font-bold text-xs text-stone-900">
                    {opt.label}
                  </span>
                  <Droplets className={`w-4 h-4 ${isSelected ? 'text-sky-600' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('location')}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </button>

        <button
          onClick={() => navigate('priorities')}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <span>{t.farmInfo.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

