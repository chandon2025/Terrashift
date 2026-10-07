import React from 'react';
import {
  MapPin,
  Satellite,
  Sprout,
  Droplets,
  Heart,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  GitCompare,
  BarChart2,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG } from '../data/crops';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen08Dashboard: React.FC = () => {
  const {
    location,
    farmProfile,
    nasaData,
    nasaLoading,
    trendData,
    refreshNASAData,
    language,
    t,
    navigate,
    units,
  } = useApp();

  const currentCropMeta = CROPS_CATALOG[farmProfile.currentCrop];

  // Calculate small trend indicators from real NASA observations
  const getLSTTrend = () => {
    if (!trendData || !trendData.points || trendData.points.length < 2) return null;
    const pts = trendData.points.filter((p) => p.landSurfaceTemperature !== null);
    if (pts.length < 2) return null;
    const latest = pts[pts.length - 1].landSurfaceTemperature!;
    const previous = pts[pts.length - 2].landSurfaceTemperature!;
    const diff = latest - previous;
    return {
      diff: Number(diff.toFixed(1)),
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
    };
  };

  const getPrecipTrend = () => {
    if (!trendData || !trendData.points || trendData.points.length < 2) return null;
    const pts = trendData.points.filter((p) => p.precipitation !== null);
    if (pts.length < 2) return null;
    const latest = pts[pts.length - 1].precipitation!;
    const previous = pts[pts.length - 2].precipitation!;
    const diff = latest - previous;
    return {
      diff: Number(diff.toFixed(1)),
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
    };
  };

  const lstTrend = getLSTTrend();
  const precipTrend = getPrecipTrend();

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24 space-y-6">
      {/* Location Bar with Change Location CTA */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-sky-900 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Active Bangladesh Location
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 mt-0.5">
              {language === 'bn' ? location.nameBn : location.name}
            </h2>
            <div className="text-xs text-stone-500 font-mono mt-0.5">
              Lat: {location.lat}°N • Lon: {location.lon}°E • {location.division}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('location')}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200 transition-colors self-start sm:self-auto"
        >
          {t.dashboard.quickSwitchLocation}
        </button>
      </div>

      {/* Decision-Support Banner */}
      <DisclaimerBanner compact />

      {/* NASA Environmental Overview Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-sky-800" />
            <h3 className="font-bold text-base text-stone-900 tracking-tight">
              NASA Environmental Overview
            </h3>
          </div>
          <button
            onClick={() => navigate('nasa_insights')}
            className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
          >
            <span>{t.dashboard.viewAllNASA}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* LST Card */}
          <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-soft">
            <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-2">
              <span className="flex items-center gap-1">🌡️ Land Surface Temp</span>
              <span className="text-[10px] font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                MODIS LST
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-stone-900">
                {nasaData?.landSurfaceTemperature.value !== null && nasaData?.landSurfaceTemperature.value !== undefined
                  ? `${nasaData.landSurfaceTemperature.value.toFixed(1)}°C`
                  : '--'}
              </div>
              {lstTrend && (
                <div
                  className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 ${
                    lstTrend.direction === 'up'
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-sky-700 bg-sky-50'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>{lstTrend.diff > 0 ? `+${lstTrend.diff}` : lstTrend.diff}°C</span>
                </div>
              )}
            </div>
            <div className="text-[11px] text-stone-500 mt-2 flex justify-between">
              <span>{nasaData?.landSurfaceTemperature.observationDate || 'Obs: --'}</span>
              <a
                href={nasaData?.landSurfaceTemperature.sourceUrl || 'https://data.nasa.gov'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline font-semibold flex items-center gap-0.5"
              >
                Source <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Precipitation Card */}
          <div className="bg-white rounded-2xl border border-sky-200 p-4 shadow-soft">
            <div className="flex items-center justify-between text-xs text-sky-800 font-bold mb-2">
              <span className="flex items-center gap-1">🌧️ Precipitation</span>
              <span className="text-[10px] font-semibold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                GPM IMERG
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-stone-900">
                {nasaData?.precipitation.value !== null && nasaData?.precipitation.value !== undefined
                  ? `${nasaData.precipitation.value.toFixed(1)} mm`
                  : '--'}
              </div>
              {precipTrend && (
                <div className="text-[11px] font-bold px-2 py-0.5 rounded text-sky-700 bg-sky-50 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  <span>{precipTrend.diff > 0 ? `+${precipTrend.diff}` : precipTrend.diff} mm</span>
                </div>
              )}
            </div>
            <div className="text-[11px] text-stone-500 mt-2 flex justify-between">
              <span>{nasaData?.precipitation.observationDate || 'Obs: --'}</span>
              <a
                href={nasaData?.precipitation.sourceUrl || 'https://gpm.nasa.gov'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline font-semibold flex items-center gap-0.5"
              >
                Source <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Soil Moisture Card */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-soft">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-2">
              <span className="flex items-center gap-1">💧 Soil Moisture</span>
              <span className="text-[10px] font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                SMAP L3/L4
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-stone-900">
                {nasaData?.soilMoisture.value !== null && nasaData?.soilMoisture.value !== undefined
                  ? `${Math.round(nasaData.soilMoisture.value * 100)}%`
                  : '--'}
              </div>
              <span className="text-[10px] text-stone-500 font-mono">
                ~9-36km area
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-2 flex justify-between">
              <span>{nasaData?.soilMoisture.observationDate || 'Obs: --'}</span>
              <a
                href={nasaData?.soilMoisture.sourceUrl || 'https://worldview.earthdata.nasa.gov'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline font-semibold flex items-center gap-0.5"
              >
                Source <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Information & Priorities Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-stone-900">
              {t.dashboard.farmSummaryCard}
            </h3>
          </div>
          <button
            onClick={() => navigate('farm_info')}
            className="text-xs font-semibold text-emerald-800 hover:underline"
          >
            Edit Farm Inputs
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
            <span className="text-[10px] font-bold text-stone-700 uppercase block mb-1">
              {t.dashboard.currentCrop}
            </span>
            <span className="font-bold text-sm text-stone-900">
              {language === 'bn' ? currentCropMeta?.nameBn : currentCropMeta?.nameEn}
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5">
              {language === 'bn' ? currentCropMeta?.seasonBn : currentCropMeta?.seasonEn}
            </span>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
            <span className="text-[10px] font-bold text-stone-700 uppercase block mb-1">
              {t.dashboard.soilType}
            </span>
            <span className="font-bold text-sm text-stone-900 capitalize">
              {t.farmInfo.soilTypes[farmProfile.soilType]}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
              Farmer input
            </span>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
            <span className="text-[10px] font-bold text-stone-700 uppercase block mb-1">
              {t.dashboard.waterStatus}
            </span>
            <span className="font-bold text-sm text-stone-900">
              {t.farmInfo.waterOptions[farmProfile.waterAvailability]}
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5">
              Irrigation access
            </span>
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
            <span className="text-[10px] font-bold text-stone-700 uppercase block mb-1">
              {t.dashboard.prioritiesCount}
            </span>
            <span className="font-bold text-sm text-stone-900">
              {farmProfile.priorities.length} Active
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Multi-factor
            </span>
          </div>
        </div>

        {/* Selected Priorities Tags */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-semibold text-stone-500 mr-1">Priorities:</span>
          {farmProfile.priorities.map((p) => (
            <span
              key={p}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200"
            >
              {t.priorities.items[p].title}
            </span>
          ))}
        </div>
      </div>

      {/* Primary Call to Action: Explore Crop Rotation Strategies */}
      <div className="bg-gradient-to-r from-emerald-800 to-sky-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Decision-Support Module
          </span>
          <h3 className="text-xl font-bold mt-1">
            {t.dashboard.exploreRotationsBtn}
          </h3>
          <p className="text-xs text-stone-200 mt-1 max-w-md leading-relaxed">
            Construct, reorder, and compare multi-season cropping patterns evaluated against rotational diversity, soil resting, and water demands.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => navigate('rotation_score')}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-1.5 transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Farm Assessment Score</span>
          </button>

          <button
            onClick={() => navigate('rotation_explorer')}
            className="px-5 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-stone-100 shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Launch Explorer</span>
            <ArrowRight className="w-4 h-4 text-emerald-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

