import React, { useState } from 'react';
import {
  Satellite,
  RefreshCw,
  Info,
  MapPin,
  Compass,
  ArrowRight,
  Database,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NASADataCard } from '../components/NASADataCard';
import { NASATrendChart } from '../components/NASATrendChart';
import { NASAMetadataModal } from '../components/NASAMetadataModal';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const Screen07NASAInsights: React.FC = () => {
  const {
    location,
    language,
    t,
    nasaData,
    nasaLoading,
    nasaError,
    refreshNASAData,
    navigate,
  } = useApp();

  const [metadataModalOpen, setMetadataModalOpen] = useState(false);

  // Environmental interpretation text following Section 22 guidelines
  const getInterpretationText = () => {
    if (!nasaData) return null;

    const lst = nasaData.landSurfaceTemperature.value;
    const precip = nasaData.precipitation.value;
    const sm = nasaData.soilMoisture.value;

    if (language === 'bn') {
      return (
        <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
          <p>
            • <b>নাসার উপগ্রহ পর্যবেক্ষণ নির্দেশ করে:</b> নির্বাচিত স্থানাঙ্কে ({location.lat}°N, {location.lon}°E) সাম্প্রতিক ভূমিপৃষ্ঠ তাপমাত্রা {lst !== null ? `${lst}°C` : 'অনুপলব্ধ'} এবং দৈনিক বৃষ্টিপাত {precip !== null ? `${precip} মিমি` : 'অনুপলব্ধ'}।
          </p>
          <p>
            • <b>আঞ্চলিক পরিবেশের পরিস্থিতি:</b> নাসার SMAP উপগ্রহ নির্দেশিত আঞ্চলিক মাটির আপেক্ষিক আর্দ্রতা সূচক {sm !== null ? `${Math.round(sm * 100)}%` : 'অনুপলব্ধ'}। এই পর্যবেক্ষণগুলো আশেপাশের সামগ্রিক অঞ্চলের জলবায়ুগত অবস্থা নির্দেশ করে।
          </p>
          <p>
            • <b>বিবেচনার সুযোগ:</b> স্থানীয় আবহাওয়া ও সেচের পর্যাপ্ততার ওপর ভিত্তি করে উপযুক্ত শস্য নির্বাচন ও রোপণের সময়সূচি বিবেচনা করতে পারেন।
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
        <p>
          • <b>NASA observation shows:</b> Land Surface Temperature observed at {lst !== null ? `${lst}°C` : 'unavailable'} and daily precipitation recorded at {precip !== null ? `${precip} mm` : 'unavailable'} for coordinates ({location.lat}°N, {location.lon}°E).
        </p>
        <p>
          • <b>Recent observations indicate:</b> Regional satellite soil moisture wetness index is currently observed at {sm !== null ? `${Math.round(sm * 100)}%` : 'unavailable'}. These indicators represent macro-environmental conditions across the surrounding satellite footprint.
        </p>
        <p>
          • <b>Consider exploring:</b> Evaluating whether current moisture and thermal indicators align with your upcoming seasonal transplanting window.
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24 space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center">
              <Satellite className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              {t.nasaInsights.title}
            </h1>
          </div>
          <p className="text-xs text-stone-700 mt-1">
            {t.nasaInsights.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setMetadataModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-sky-700" />
            <span>{t.nasaInsights.metadataButton}</span>
          </button>

          <button
            onClick={refreshNASAData}
            disabled={nasaLoading}
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs transition-colors disabled:opacity-50"
            title="Refresh NASA Observation"
          >
            <RefreshCw className={`w-4 h-4 ${nasaLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Decision-Support Banner */}
      <DisclaimerBanner />

      {/* Location Bar with Lat/Lon */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-sm text-stone-900">
            {language === 'bn' ? location.nameBn : location.name}
          </span>
          <span className="text-xs text-stone-500 font-mono">
            ({location.lat}°N, {location.lon}°E)
          </span>
        </div>

        <button
          onClick={() => navigate('location')}
          className="text-xs font-semibold text-emerald-800 hover:underline"
        >
          Change Location
        </button>
      </div>

      {/* Three Primary NASA Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Land Surface Temperature (LST) */}
        <NASADataCard
          type="lst"
          title={t.nasaInsights.cards.lst.title}
          value={nasaData?.landSurfaceTemperature.value ?? null}
          unit={nasaData?.landSurfaceTemperature.unit ?? '°C'}
          observationDate={nasaData?.landSurfaceTemperature.observationDate ?? '--'}
          product={nasaData?.landSurfaceTemperature.product ?? 'MODIS/Aqua MYD11A1 V6.1'}
          mission={nasaData?.landSurfaceTemperature.mission ?? 'NASA EOS Aqua (MODIS)'}
          variable={nasaData?.landSurfaceTemperature.variable ?? 'Land Surface Temperature (LST)'}
          spatialResolution={nasaData?.landSurfaceTemperature.spatialResolution ?? '1 km'}
          source={nasaData?.landSurfaceTemperature.source ?? 'NASA EOSDIS'}
          sourceUrl={nasaData?.landSurfaceTemperature.sourceUrl ?? 'https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b'}
          docUrl={nasaData?.landSurfaceTemperature.docUrl}
          granuleId={nasaData?.landSurfaceTemperature.granuleId}
          scientificNote={nasaData?.landSurfaceTemperature.scientificNote ?? t.nasaInsights.cards.lst.notice}
          isCached={nasaData?.isCached}
          retrievalTimestamp={nasaData?.retrievalTimestamp}
          loading={nasaLoading}
          error={nasaError}
          onRetry={refreshNASAData}
        />

        {/* 2. Precipitation (GPM IMERG) */}
        <NASADataCard
          type="precipitation"
          title={t.nasaInsights.cards.precipitation.title}
          value={nasaData?.precipitation.value ?? null}
          unit={nasaData?.precipitation.unit ?? 'mm/day'}
          observationDate={nasaData?.precipitation.observationDate ?? '--'}
          product={nasaData?.precipitation.product ?? 'NASA GPM IMERG Daily'}
          mission={nasaData?.precipitation.mission ?? 'NASA GPM Constellation'}
          variable={nasaData?.precipitation.variable ?? 'Daily Precipitation Accumulation'}
          spatialResolution={nasaData?.precipitation.spatialResolution ?? '0.1° (~10 km)'}
          source={nasaData?.precipitation.source ?? 'NASA GPM Mission / GES DISC'}
          sourceUrl={nasaData?.precipitation.sourceUrl ?? 'https://gpm.nasa.gov/data/imerg'}
          granuleId={nasaData?.precipitation.granuleId}
          scientificNote={nasaData?.precipitation.scientificNote ?? t.nasaInsights.cards.precipitation.notice}
          isCached={nasaData?.isCached}
          retrievalTimestamp={nasaData?.retrievalTimestamp}
          loading={nasaLoading}
          error={nasaError}
          onRetry={refreshNASAData}
        />

        {/* 3. Soil Moisture (SMAP) */}
        <NASADataCard
          type="soil_moisture"
          title={t.nasaInsights.cards.soilMoisture.title}
          value={nasaData?.soilMoisture.value ?? null}
          unit={nasaData?.soilMoisture.unit ?? 'fraction'}
          observationDate={nasaData?.soilMoisture.observationDate ?? '--'}
          product={nasaData?.soilMoisture.product ?? 'NASA SMAP L3/L4 Surface Soil Moisture'}
          mission={nasaData?.soilMoisture.mission ?? 'NASA SMAP'}
          variable={nasaData?.soilMoisture.variable ?? 'Surface Soil Moisture Wetness (0–5 cm)'}
          spatialResolution={nasaData?.soilMoisture.spatialResolution ?? '9 km / 36 km'}
          source={nasaData?.soilMoisture.source ?? 'NASA SMAP / Earthdata'}
          sourceUrl={nasaData?.soilMoisture.sourceUrl ?? 'https://worldview.earthdata.nasa.gov/'}
          granuleId={nasaData?.soilMoisture.granuleId}
          scientificNote={nasaData?.soilMoisture.scientificNote ?? t.nasaInsights.cards.soilMoisture.notice}
          isCached={nasaData?.isCached}
          retrievalTimestamp={nasaData?.retrievalTimestamp}
          loading={nasaLoading}
          error={nasaError}
          onRetry={refreshNASAData}
        />
      </div>

      {/* Environmental Interpretation Card (Section 22) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-sm text-stone-900">
            {language === 'bn' ? 'নাসা পরিবেশগত ব্যাখ্যা ও অনুসন্ধান' : 'NASA Environmental Interpretation & Exploration'}
          </h3>
        </div>
        {getInterpretationText()}
      </div>

      {/* NASA Trend Visualization Chart (Section 21) */}
      <NASATrendChart />

      {/* Continue to Farm Dashboard or Crop Explorer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigate('farm_info')}
          className="text-xs font-semibold text-stone-600 hover:text-stone-900"
        >
          ← Edit Farm Profile
        </button>

        <button
          onClick={() => navigate('dashboard')}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <span>Open Farm Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* NASA Metadata Modal */}
      <NASAMetadataModal
        isOpen={metadataModalOpen}
        onClose={() => setMetadataModalOpen(false)}
      />
    </div>
  );
};

