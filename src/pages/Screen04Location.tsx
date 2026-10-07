import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ArrowRight,
  Info,
  Check,
  AlertCircle,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LeafletMap } from '../components/LeafletMap';
import {
  BANGLADESH_DISTRICTS,
  BANGLADESH_DIVISIONS,
  buildLocationInfo,
  findNearestDistrict,
} from '../data/bangladeshGeo';
import { searchBangladeshLocations, getDeviceLocation } from '../services/nasa/locationService';
import { LocationInfo } from '../types';

export const Screen04Location: React.FC = () => {
  const { location, setLocation, language, t, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>(location.division);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Filter districts by chosen division
  const filteredDistricts = BANGLADESH_DISTRICTS.filter(
    (d) => d.division.toLowerCase() === selectedDivision.toLowerCase()
  );

  const activeDistrictData = BANGLADESH_DISTRICTS.find(
    (d) => d.name.toLowerCase() === location.district.toLowerCase()
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(searchBangladeshLocations(q));
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSearchResult = (loc: LocationInfo) => {
    setLocation(loc);
    setSelectedDivision(loc.division);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleDistrictChange = (districtName: string) => {
    const d = BANGLADESH_DISTRICTS.find((item) => item.name === districtName);
    if (d) {
      const loc = buildLocationInfo(d.lat, d.lon);
      setLocation(loc);
    }
  };

  const handleUpazilaChange = (upazilaName: string) => {
    if (!activeDistrictData) return;
    const up = activeDistrictData.upazilas.find((u) => u.name === upazilaName);
    if (up) {
      const lat = up.lat || activeDistrictData.lat;
      const lon = up.lon || activeDistrictData.lon;
      const loc = buildLocationInfo(lat, lon, undefined, { en: up.name, bn: up.nameBn });
      setLocation(loc);
    }
  };

  const handleGPSClick = async () => {
    setGpsLoading(true);
    setGpsError(null);
    try {
      const deviceLoc = await getDeviceLocation();
      setLocation(deviceLoc);
      setSelectedDivision(deviceLoc.division);
    } catch (err: any) {
      setGpsError(err.message || 'Unable to retrieve location.');
    } finally {
      setGpsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('farm_info');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24 space-y-5">
      {/* Title & Introduction */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-700" />
          {t.location.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.location.subtitle}
        </p>
      </div>

      {/* Demo Preset Clarification Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sky-800 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Bangladesh Nationwide Selection: </span>
          {t.location.demoPresetNotice}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t.location.searchPlaceholder}
            className="w-full pl-10 pr-24 py-3 bg-white rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
          />
          <button
            onClick={handleGPSClick}
            disabled={gpsLoading}
            className="absolute right-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
            title={t.location.orUseGps}
          >
            <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">GPS</span>
          </button>
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-xl border border-stone-200 shadow-xl max-h-60 overflow-y-auto">
            {searchResults.map((res, i) => (
              <button
                key={i}
                onClick={() => handleSelectSearchResult(res)}
                className="w-full px-4 py-2.5 text-left text-xs hover:bg-emerald-50 border-b border-stone-100 last:border-0 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900">
                    {language === 'bn' ? res.nameBn : res.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {res.division} Division • Lat: {res.lat}, Lon: {res.lon}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-emerald-600" />
              </button>
            ))}
          </div>
        )}

        {gpsError && (
          <div className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{gpsError}</span>
          </div>
        )}
      </div>

      {/* Administrative Selectors (Division -> District -> Upazila) */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Division */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            {t.location.division}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              const firstDist = BANGLADESH_DISTRICTS.find(
                (d) => d.division.toLowerCase() === e.target.value.toLowerCase()
              );
              if (firstDist) {
                setLocation(buildLocationInfo(firstDist.lat, firstDist.lon));
              }
            }}
            className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {BANGLADESH_DIVISIONS.map((div) => (
              <option key={div.id} value={div.name}>
                {language === 'bn' ? div.nameBn : div.name}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            {t.location.district}
          </label>
          <select
            value={location.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {filteredDistricts.map((d) => (
              <option key={d.id} value={d.name}>
                {language === 'bn' ? d.nameBn : d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
            {t.location.upazila}
          </label>
          <select
            value={location.upazila || ''}
            onChange={(e) => handleUpazilaChange(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="">
              {language === 'bn' ? 'সদর / নির্বাচন করুন' : 'Sadar / Select Upazila'}
            </option>
            {activeDistrictData?.upazilas.map((u, idx) => (
              <option key={idx} value={u.name}>
                {language === 'bn' ? u.nameBn : u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Bangladesh Leaflet Map */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-stone-600">
          <span className="font-semibold">{t.location.mapInstructions}</span>
          <span className="text-[11px] text-emerald-800 font-bold">Interactive Leaflet</span>
        </div>
        <LeafletMap
          currentLocation={location}
          onLocationSelect={(newLoc) => setLocation(newLoc)}
          className="h-80 w-full"
        />
      </div>

      {/* Selected Coordinates Card */}
      <div className="bg-white rounded-2xl border border-emerald-300 p-4 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              {t.location.selectedCoordinates}
            </div>
            <div className="text-base font-extrabold text-stone-900 mt-0.5">
              {language === 'bn' ? location.nameBn : location.name}
            </div>
            <div className="text-xs text-stone-600 flex items-center gap-2 mt-0.5">
              <span>Latitude: <b>{location.lat}°N</b></span>
              <span>•</span>
              <span>Longitude: <b>{location.lon}°E</b></span>
            </div>
            {location.aez && (
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                {language === 'bn' ? location.aezBn : location.aez}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all whitespace-nowrap self-end sm:self-auto"
        >
          <span>{t.location.continueWithLocation}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
