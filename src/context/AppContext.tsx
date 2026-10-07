// Central Application State for TerraShift
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  AppScreen,
  LocationInfo,
  FarmProfile,
  NASAObservationData,
  NASATrendResponse,
  CropKey,
  FarmerPriority,
  SoilTypeKey,
  WaterAvailabilityKey,
} from '../types';
import { translations } from '../i18n/translations';
import { BANGLADESH_DISTRICTS, buildLocationInfo } from '../data/bangladeshGeo';
import { fetchNASAEnvironmentalData, fetchNASATrendData } from '../services/nasa/environmentalService';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['en'];
  currentScreen: AppScreen;
  navigate: (screen: AppScreen) => void;
  activeTab: 'home' | 'nasa' | 'farm' | 'strategies' | 'settings';
  setActiveTab: (tab: 'home' | 'nasa' | 'farm' | 'strategies' | 'settings') => void;
  units: 'metric' | 'imperial';
  setUnits: (u: 'metric' | 'imperial') => void;

  // Location State
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  isLocationSelected: boolean;

  // Farm Profile State
  farmProfile: FarmProfile;
  updateFarmProfile: (partial: Partial<FarmProfile>) => void;
  togglePriority: (priority: FarmerPriority) => void;

  // NASA Observation State
  nasaData: NASAObservationData | null;
  nasaLoading: boolean;
  nasaError: string | null;
  refreshNASAData: () => Promise<void>;

  // NASA Timeseries State
  trendData: NASATrendResponse | null;
  trendLoading: boolean;
  trendRange: '7d' | '30d' | '3m' | '6m' | '1y';
  setTrendRange: (r: '7d' | '30d' | '3m' | '6m' | '1y') => void;

  // Crop Rotation State
  customRotationCrops: CropKey[];
  setCustomRotationCrops: (crops: CropKey[]) => void;
  addCropToRotation: (crop: CropKey) => void;
  removeCropFromRotation: (index: number) => void;
  moveCropInRotation: (index: number, direction: 'up' | 'down') => void;
  comparisonStrategyIds: string[];
  setComparisonStrategyIds: (ids: string[]) => void;
  toggleStrategyForComparison: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default starting location: Rangpur (clearly labeled demo example)
const DEFAULT_DEMO_DISTRICT = BANGLADESH_DISTRICTS[0]; // Rangpur
const DEFAULT_LOCATION: LocationInfo = buildLocationInfo(DEFAULT_DEMO_DISTRICT.lat, DEFAULT_DEMO_DISTRICT.lon);

const DEFAULT_FARM_PROFILE: FarmProfile = {
  farmName: '',
  location: DEFAULT_LOCATION,
  farmSizeAcres: 1.5,
  currentCrop: 'rice_aman',
  soilType: 'loamy',
  waterAvailability: 'available',
  priorities: ['soil_health', 'crop_rotation', 'water_saving'],
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('bn');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('language');
  const [activeTab, setActiveTabState] = useState<'home' | 'nasa' | 'farm' | 'strategies' | 'settings'>('home');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const [location, setLocationState] = useState<LocationInfo>(DEFAULT_LOCATION);
  const [isLocationSelected, setIsLocationSelected] = useState<boolean>(false);
  const [farmProfile, setFarmProfile] = useState<FarmProfile>(DEFAULT_FARM_PROFILE);

  const [nasaData, setNasaData] = useState<NASAObservationData | null>(null);
  const [nasaLoading, setNasaLoading] = useState<boolean>(false);
  const [nasaError, setNasaError] = useState<string | null>(null);

  const [trendData, setTrendData] = useState<NASATrendResponse | null>(null);
  const [trendLoading, setTrendLoading] = useState<boolean>(false);
  const [trendRange, setTrendRange] = useState<'7d' | '30d' | '3m' | '6m' | '1y'>('30d');

  // Custom Rotation Builder
  const [customRotationCrops, setCustomRotationCrops] = useState<CropKey[]>([
    'rice_aman',
    'legume_lentil',
    'rice_aus',
  ]);

  // Strategy comparison (default compares Strategy A and Strategy B)
  const [comparisonStrategyIds, setComparisonStrategyIds] = useState<string[]>([
    'strategy_legume_break',
    'strategy_cereal_rotation',
  ]);

  const t = translations[language];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  const navigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    // Sync bottom navigation active tab
    if (screen === 'dashboard') setActiveTabState('home');
    else if (screen === 'nasa_insights') setActiveTabState('nasa');
    else if (screen === 'farm_info' || screen === 'priorities') setActiveTabState('farm');
    else if (screen === 'rotation_explorer' || screen === 'rotation_details' || screen === 'strategy_compare' || screen === 'rotation_score') setActiveTabState('strategies');
    else if (screen === 'profile_settings') setActiveTabState('settings');
  };

  const setActiveTab = (tab: 'home' | 'nasa' | 'farm' | 'strategies' | 'settings') => {
    setActiveTabState(tab);
    if (tab === 'home') setCurrentScreen('dashboard');
    else if (tab === 'nasa') setCurrentScreen('nasa_insights');
    else if (tab === 'farm') setCurrentScreen('farm_info');
    else if (tab === 'strategies') setCurrentScreen('rotation_explorer');
    else if (tab === 'settings') setCurrentScreen('profile_settings');
  };

  const setLocation = (newLoc: LocationInfo) => {
    setLocationState(newLoc);
    setIsLocationSelected(true);
    setFarmProfile((prev) => ({ ...prev, location: newLoc }));
  };

  const updateFarmProfile = (partial: Partial<FarmProfile>) => {
    setFarmProfile((prev) => ({ ...prev, ...partial }));
  };

  const togglePriority = (p: FarmerPriority) => {
    setFarmProfile((prev) => {
      const exists = prev.priorities.includes(p);
      const updated = exists ? prev.priorities.filter((item) => item !== p) : [...prev.priorities, p];
      return { ...prev, priorities: updated };
    });
  };

  // Fetch NASA Environmental Data
  const loadNASAData = async (lat: number, lon: number) => {
    setNasaLoading(true);
    setNasaError(null);
    try {
      const data = await fetchNASAEnvironmentalData(lat, lon);
      setNasaData(data);
    } catch (err: any) {
      setNasaError(err.message || 'NASA data is currently unavailable.');
      setNasaData(null);
    } finally {
      setNasaLoading(false);
    }
  };

  // Fetch NASA Timeseries
  const loadTrend = async (lat: number, lon: number, range: '7d' | '30d' | '3m' | '6m' | '1y') => {
    setTrendLoading(true);
    try {
      const data = await fetchNASATrendData(lat, lon, range);
      setTrendData(data);
    } catch {
      setTrendData(null);
    } finally {
      setTrendLoading(false);
    }
  };

  const refreshNASAData = async () => {
    await Promise.all([
      loadNASAData(location.lat, location.lon),
      loadTrend(location.lat, location.lon, trendRange),
    ]);
  };

  // Fetch whenever location or trendRange changes
  useEffect(() => {
    loadNASAData(location.lat, location.lon);
  }, [location.lat, location.lon]);

  useEffect(() => {
    loadTrend(location.lat, location.lon, trendRange);
  }, [location.lat, location.lon, trendRange]);

  // Rotation Builder Helpers
  const addCropToRotation = (crop: CropKey) => {
    if (customRotationCrops.length < 6) {
      setCustomRotationCrops([...customRotationCrops, crop]);
    }
  };

  const removeCropFromRotation = (index: number) => {
    if (customRotationCrops.length > 1) {
      setCustomRotationCrops(customRotationCrops.filter((_, i) => i !== index));
    }
  };

  const moveCropInRotation = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= customRotationCrops.length) return;
    const copy = [...customRotationCrops];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setCustomRotationCrops(copy);
  };

  const toggleStrategyForComparison = (id: string) => {
    setComparisonStrategyIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) return [prev[1], prev[2], id]; // Max 3
        return [...prev, id];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentScreen,
        navigate,
        activeTab,
        setActiveTab,
        units,
        setUnits,
        location,
        setLocation,
        isLocationSelected,
        farmProfile,
        updateFarmProfile,
        togglePriority,
        nasaData,
        nasaLoading,
        nasaError,
        refreshNASAData,
        trendData,
        trendLoading,
        trendRange,
        setTrendRange,
        customRotationCrops,
        setCustomRotationCrops,
        addCropToRotation,
        removeCropFromRotation,
        moveCropInRotation,
        comparisonStrategyIds,
        setComparisonStrategyIds,
        toggleStrategyForComparison,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
