import React from 'react';
import { MapPin, Globe, Satellite, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    location,
    navigate,
    nasaData,
    nasaLoading,
    refreshNASAData,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 px-4 py-3 shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-sky-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
            <span className="text-xl">🌱</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-emerald-900 tracking-tight">TerraShift</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200">
                NASA Data
              </span>
            </div>
            <p className="text-[11px] text-stone-700 line-clamp-1 font-medium">
              {t.app.tagline}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Location Badge */}
          <button
            onClick={() => navigate('location')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-medium transition-colors"
            title="Change Bangladesh Location"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-semibold">
              {language === 'bn' ? location.nameBn : location.name}
            </span>
          </button>

          {/* NASA Live Status */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
              nasaLoading
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : nasaData?.status === 'live'
                ? 'bg-sky-50 text-sky-900 border-sky-200'
                : nasaData?.status === 'cached'
                ? 'bg-stone-50 text-stone-700 border-stone-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            <Satellite className={`w-3.5 h-3.5 ${nasaLoading ? 'animate-spin' : ''}`} />
            <span>
              {nasaLoading
                ? 'Syncing NASA...'
                : nasaData?.status === 'live'
                ? 'NASA Live'
                : nasaData?.status === 'cached'
                ? 'NASA Cached'
                : 'NASA Offline'}
            </span>
            <button
              onClick={refreshNASAData}
              className="ml-1 p-0.5 hover:bg-black/5 rounded"
              title="Refresh NASA Observations"
            >
              <RefreshCw className={`w-3 h-3 ${nasaLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-stone-600" />
            <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

