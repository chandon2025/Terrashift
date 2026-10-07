import React from 'react';
import {
  Settings,
  Globe,
  MapPin,
  Ruler,
  ExternalLink,
  ShieldCheck,
  FileText,
  Info,
  HelpCircle,
  Satellite,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NASA_DATASET_METADATA } from '../services/nasa/nasaMetadata';

export const ProfileSettings: React.FC = () => {
  const {
    language,
    setLanguage,
    units,
    setUnits,
    location,
    t,
    navigate,
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-700" />
          {t.settings.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* 1. Language Preferences */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Globe className="w-4 h-4 text-emerald-700" />
          <h3>{t.settings.languageHeading}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('bn')}
            className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center justify-between ${
              language === 'bn'
                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs'
                : 'border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>বাংলা (Bengali)</span>
            {language === 'bn' && <span className="text-emerald-700">✓</span>}
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center justify-between ${
              language === 'en'
                ? 'bg-sky-50 border-sky-600 text-sky-950 shadow-xs'
                : 'border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>English</span>
            {language === 'en' && <span className="text-sky-700">✓</span>}
          </button>
        </div>
      </div>

      {/* 2. Units Preference */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Ruler className="w-4 h-4 text-emerald-700" />
          <h3>{t.settings.unitsHeading}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setUnits('metric')}
            className={`p-3.5 rounded-2xl border-2 text-left text-xs transition-all flex items-center justify-between ${
              units === 'metric'
                ? 'bg-emerald-50 border-emerald-600 font-bold text-emerald-950 shadow-xs'
                : 'border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div>
              <div className="font-bold">Metric Units</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Celsius (°C), mm/day, Hectares</div>
            </div>
            {units === 'metric' && <span className="text-emerald-700 font-bold">✓</span>}
          </button>

          <button
            onClick={() => setUnits('imperial')}
            className={`p-3.5 rounded-2xl border-2 text-left text-xs transition-all flex items-center justify-between ${
              units === 'imperial'
                ? 'bg-emerald-50 border-emerald-600 font-bold text-emerald-950 shadow-xs'
                : 'border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <div>
              <div className="font-bold">Imperial Units</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Fahrenheit (°F), Inches, Acres</div>
            </div>
            {units === 'imperial' && <span className="text-emerald-700 font-bold">✓</span>}
          </button>
        </div>
      </div>

      {/* 3. Location Management */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-stone-900">
              {language === 'bn' ? location.nameBn : location.name}
            </div>
            <div className="text-xs text-stone-500 font-mono">
              {location.lat}°N, {location.lon}°E ({location.division} Division)
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('location')}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
        >
          Change Location
        </button>
      </div>

      {/* 4. Official NASA Data Sources Directory (Section 30 & 43) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
            <Satellite className="w-4 h-4 text-sky-700" />
            <h3>{t.settings.nasaSourcesHeading}</h3>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
            Official Endpoints
          </span>
        </div>

        <div className="space-y-3">
          {/* MODIS LST */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">MODIS/Aqua MYD11A1 V6.1 (Land Surface Temperature)</span>
              <span className="text-[10px] font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">1 km</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              Daily per-pixel Land Surface Temperature (LST) and Emissivity from MODIS sensor on NASA Aqua satellite.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-800 font-bold hover:underline inline-flex items-center gap-1"
              >
                NASA Open Data Portal (MYD11A1) <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://modis.gsfc.nasa.gov/data/dataprod/mod11.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:underline inline-flex items-center gap-1"
              >
                • MODIS GSFC Overview <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a
                href="https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/MYD11A1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:underline inline-flex items-center gap-1"
              >
                • LAADS DAAC Product <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* GPM IMERG */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">NASA GPM IMERG (Precipitation)</span>
              <span className="text-[10px] font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">0.1° (~10 km)</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              Integrated Multi-satellitE Retrievals for Global Precipitation Measurement constellation.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://gpm.nasa.gov/data/imerg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-800 font-bold hover:underline inline-flex items-center gap-1"
              >
                NASA GPM IMERG Portal <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_07/summary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:underline inline-flex items-center gap-1"
              >
                • GES DISC Archive <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* SMAP */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">NASA SMAP L3/L4 (Soil Moisture Active Passive)</span>
              <span className="text-[10px] font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">9 km / 36 km</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              Global surface & root-zone soil moisture retrievals from L-band radiometer. Regional satellite footprint representation.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://worldview.earthdata.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-800 font-bold hover:underline inline-flex items-center gap-1"
              >
                NASA Worldview Interactive <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.earthdata.nasa.gov/sensors/smap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:underline inline-flex items-center gap-1"
              >
                • NASA Earthdata SMAP Sensor <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a
                href="https://nsidc.org/data/smap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:underline inline-flex items-center gap-1"
              >
                • NSIDC DAAC SMAP Data <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* NASA POWER */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">NASA POWER (Prediction Of Worldwide Energy Resources)</span>
              <span className="text-[10px] font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">Point API</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              Official NASA Langley Research Center point query service for Agroclimatology and daily satellite meteorology.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://power.larc.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-800 font-bold hover:underline inline-flex items-center gap-1"
              >
                NASA POWER Official Project <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. About TerraShift & NASA Space Apps Challenge */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Info className="w-4 h-4 text-emerald-700" />
          <h3>{t.settings.aboutHeading}</h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          {t.settings.aboutDesc}
        </p>
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-[11px] text-stone-500 font-mono">
          Project: 🌱 TerraShift • Category: NASA Earth Observation & Agricultural Decision-Support
        </div>
      </div>

      {/* 6. Privacy & Scientific Transparency */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <h3>{t.settings.privacyHeading}</h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          {t.settings.privacyDesc}
        </p>
      </div>

      {/* 7. Terms of Use & Scientific Transparency Notice */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 shadow-soft space-y-2 text-amber-950">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <FileText className="w-4 h-4 text-amber-700" />
          <h3>Terms of Use & Decision-Support Notice</h3>
        </div>
        <p className="text-xs leading-relaxed text-amber-900">
          TerraShift is explicitly designed as a <b>decision-support exploration tool</b>. It does not provide agricultural guarantees, warranty crop yields, or dictate farming decisions. Agricultural producers should evaluate localized ground reality, seed varieties, soil lab reports, and consult local extension officers (Department of Agricultural Extension, Bangladesh).
        </p>
      </div>
    </div>
  );
};

