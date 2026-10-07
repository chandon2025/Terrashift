import React from 'react';
import {
  FileText,
  Printer,
  MapPin,
  Satellite,
  Sprout,
  Heart,
  GitCompare,
  ExternalLink,
  Compass,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG, analyzeRotationStrategy, PRESET_STRATEGIES } from '../data/crops';
import { NASA_DATASET_METADATA } from '../services/nasa/nasaMetadata';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen13FinalSummary: React.FC = () => {
  const {
    location,
    farmProfile,
    nasaData,
    customRotationCrops,
    comparisonStrategyIds,
    language,
    t,
    navigate,
  } = useApp();

  const currentCropMeta = CROPS_CATALOG[farmProfile.currentCrop];
  const customAnalysis = analyzeRotationStrategy(
    customRotationCrops,
    farmProfile.soilType,
    farmProfile.waterAvailability,
    farmProfile.priorities,
    nasaData?.landSurfaceTemperature.value ?? null,
    nasaData?.soilMoisture.value ?? null
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24 space-y-6 print:p-0 print:m-0 print:space-y-4">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              {t.finalSummary.title}
            </h1>
          </div>
          <p className="text-xs text-stone-700 mt-1">
            {t.finalSummary.subtitle}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold hover:bg-stone-50 flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-stone-600" />
          <span>{t.finalSummary.exportBtn}</span>
        </button>
      </div>

      <DisclaimerBanner />

      {/* 1. Selected Bangladesh Location */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-2">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <h3>1. Selected Bangladesh Agricultural Location</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">District & Division</span>
            <span className="font-extrabold text-sm text-stone-900 mt-0.5 block">
              {language === 'bn' ? location.nameBn : location.name}
            </span>
            <span className="text-stone-500 text-[11px]">{location.division} Division</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Exact Coordinates</span>
            <span className="font-bold text-stone-900 mt-0.5 block font-mono">
              Lat: {location.lat}°N, Lon: {location.lon}°E
            </span>
            <span className="text-stone-500 text-[11px]">Bangladesh Grid Point</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Agro-Ecological Zone (AEZ)</span>
            <span className="font-bold text-stone-900 mt-0.5 block text-xs">
              {language === 'bn' ? location.aezBn : location.aez}
            </span>
          </div>
        </div>
      </div>

      {/* 2. NASA Environmental Observations */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
            <Satellite className="w-4 h-4 text-sky-700" />
            <h3>2. Official NASA Environmental Observations</h3>
          </div>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
            Real NASA Satellite Ingestion
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* LST */}
          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Land Surface Temperature (LST)
            </span>
            <div className="text-2xl font-black text-stone-900 mt-1">
              {nasaData?.landSurfaceTemperature.value !== null && nasaData?.landSurfaceTemperature.value !== undefined
                ? `${nasaData.landSurfaceTemperature.value}°C`
                : '--'}
            </div>
            <div className="text-[11px] text-stone-600 mt-1 space-y-0.5">
              <div>Obs: {nasaData?.landSurfaceTemperature.observationDate || '--'}</div>
              <div>MODIS/Aqua MYD11A1 V6.1</div>
              <div className="text-[10px] text-stone-500">Res: 1 km • Radiative skin temp</div>
            </div>
          </div>

          {/* Precipitation */}
          <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
              Daily Precipitation
            </span>
            <div className="text-2xl font-black text-stone-900 mt-1">
              {nasaData?.precipitation.value !== null && nasaData?.precipitation.value !== undefined
                ? `${nasaData.precipitation.value} mm`
                : '--'}
            </div>
            <div className="text-[11px] text-stone-600 mt-1 space-y-0.5">
              <div>Obs: {nasaData?.precipitation.observationDate || '--'}</div>
              <div>NASA GPM IMERG Daily</div>
              <div className="text-[10px] text-stone-500">Res: 0.1° (~10 km)</div>
            </div>
          </div>

          {/* Soil Moisture */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Satellite Soil Moisture
            </span>
            <div className="text-2xl font-black text-stone-900 mt-1">
              {nasaData?.soilMoisture.value !== null && nasaData?.soilMoisture.value !== undefined
                ? `${Math.round(nasaData.soilMoisture.value * 100)}%`
                : '--'}
            </div>
            <div className="text-[11px] text-stone-600 mt-1 space-y-0.5">
              <div>Obs: {nasaData?.soilMoisture.observationDate || '--'}</div>
              <div>NASA SMAP L3/L4</div>
              <div className="text-[10px] text-stone-500">Res: ~9-36 km footprint mean</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Farmer Information & Priorities */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Sprout className="w-4 h-4 text-emerald-700" />
          <h3>3. Farmer Reported Context & Priorities</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Current Crop</span>
            <span className="font-bold text-stone-900 mt-0.5 block">
              {language === 'bn' ? currentCropMeta?.nameBn : currentCropMeta?.nameEn}
            </span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Soil Type (Farmer Input)</span>
            <span className="font-bold text-stone-900 mt-0.5 block capitalize">
              {t.farmInfo.soilTypes[farmProfile.soilType]}
            </span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Water Availability</span>
            <span className="font-bold text-stone-900 mt-0.5 block">
              {t.farmInfo.waterOptions[farmProfile.waterAvailability]}
            </span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-stone-500 block text-[10px] font-bold uppercase">Plot Size</span>
            <span className="font-bold text-stone-900 mt-0.5 block">
              {farmProfile.farmSizeAcres || 1.5} Acres
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          <span className="text-xs font-semibold text-stone-500 mr-1">Active Priorities:</span>
          {farmProfile.priorities.map((p) => (
            <span
              key={p}
              className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200"
            >
              {t.priorities.items[p].title}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Strategy Analysis Summary */}
      <div className="bg-white rounded-3xl border border-emerald-300 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <GitCompare className="w-4 h-4 text-emerald-700" />
            <h3>4. Explored Crop Rotation Strategy Summary</h3>
          </div>
          <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Balance Index: {customAnalysis.priorityAlignmentScore}/100
          </span>
        </div>

        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="font-mono font-bold text-base text-stone-900 mb-2">
            {customAnalysis.sequenceText}
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {language === 'bn' ? customAnalysis.soilConsiderationBn : customAnalysis.soilConsiderationEn}
          </p>
          <p className="text-xs text-stone-700 leading-relaxed mt-2">
            {language === 'bn' ? customAnalysis.waterConsiderationBn : customAnalysis.waterConsiderationEn}
          </p>
        </div>

        {/* Potential Considerations */}
        <div className="space-y-1.5 text-xs text-stone-700">
          <span className="font-bold text-stone-800 block">Key Considerations for Exploration:</span>
          {(language === 'bn' ? customAnalysis.potentialConsiderationsBn : customAnalysis.potentialConsiderationsEn).map(
            (c, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{c}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* 5. Official NASA Sources Directory */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-sky-700" />
          5. Official NASA Data Sources & Open Science Links
        </h3>

        <div className="space-y-2 text-xs">
          {Object.entries(NASA_DATASET_METADATA).map(([k, meta]) => (
            <div key={k} className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-stone-900 block">{meta.product}</span>
                <span className="text-stone-500 text-[11px]">{meta.mission} • {meta.spatialResolution}</span>
              </div>
              <a
                href={meta.officialProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 hover:underline self-start sm:self-auto"
              >
                <span>View NASA Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory CTAs (Section 28) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
        <button
          onClick={() => navigate('location')}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold hover:bg-stone-50 flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>{t.finalSummary.changeLocationBtn}</span>
        </button>

        <button
          onClick={() => navigate('profile_settings')}
          className="px-4 py-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-bold hover:bg-sky-100 flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-sky-700" />
          <span>{t.finalSummary.viewAllSourcesBtn}</span>
        </button>

        <button
          onClick={() => navigate('rotation_explorer')}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <span>{t.finalSummary.exploreAnotherBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

