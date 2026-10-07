// TerraShift TypeScript Definitions

export type Language = 'bn' | 'en';

export interface LocationInfo {
  name: string;
  nameBn: string;
  district: string;
  districtBn: string;
  division: string;
  divisionBn: string;
  upazila?: string;
  upazilaBn?: string;
  lat: number;
  lon: number;
  aez?: string; // Agro-Ecological Zone
  aezBn?: string;
}

export interface NASAObservationData {
  location: {
    lat: number;
    lon: number;
  };
  observationDate: string;
  retrievalTimestamp: string;
  isCached: boolean;
  status: 'live' | 'cached' | 'unavailable';
  landSurfaceTemperature: {
    value: number | null;
    unit: string;
    mission: string;
    product: string;
    variable: string;
    spatialResolution: string;
    observationDate: string;
    source: string;
    sourceUrl: string;
    docUrl: string;
    granuleId?: string;
    scientificNote: string;
    available: boolean;
  };
  precipitation: {
    value: number | null;
    unit: string;
    mission: string;
    product: string;
    variable: string;
    spatialResolution: string;
    observationDate: string;
    source: string;
    sourceUrl: string;
    granuleId?: string;
    scientificNote: string;
    available: boolean;
  };
  soilMoisture: {
    value: number | null;
    unit: string;
    rootZoneValue: number | null;
    mission: string;
    product: string;
    variable: string;
    spatialResolution: string;
    observationDate: string;
    source: string;
    sourceUrl: string;
    granuleId?: string;
    scientificNote: string;
    available: boolean;
  };
  granules: {
    myd11a1?: string;
    gpm?: string;
    smap?: string;
  };
}

export interface NASATrendPoint {
  date: string;
  landSurfaceTemperature: number | null;
  precipitation: number | null;
  soilMoisture: number | null;
}

export interface NASATrendResponse {
  location: { lat: number; lon: number };
  period: string;
  startDate: string;
  endDate: string;
  retrievalTimestamp: string;
  points: NASATrendPoint[];
  availableCount: number;
}

export type SoilTypeKey = 'loamy' | 'sandy' | 'clay' | 'silty' | 'other' | 'unknown';
export type WaterAvailabilityKey = 'available' | 'limited' | 'not_available' | 'unknown';

export type CropKey =
  | 'rice_boro'
  | 'rice_aman'
  | 'rice_aus'
  | 'wheat'
  | 'maize'
  | 'potato'
  | 'jute'
  | 'mustard'
  | 'legume_lentil'
  | 'legume_mung'
  | 'vegetables'
  | 'tomato'
  | 'cotton'
  | 'sugarcane'
  | 'fruits'
  | 'other';

export interface CropMetadata {
  key: CropKey;
  nameEn: string;
  nameBn: string;
  seasonEn: 'Rabi (Winter)' | 'Kharif-1 (Pre-Monsoon)' | 'Kharif-2 (Monsoon)' | 'All Season';
  seasonBn: 'রবি (শীতকালীন)' | 'খরিফ-১ (প্রাক-বর্ষা)' | 'খরিফ-২ (বর্ষাকাল)' | 'সারাবছর';
  waterDemand: 'Low' | 'Moderate' | 'High';
  waterDemandBn: 'স্বল্প' | 'মাঝারি' | 'উচ্চ';
  soilPreferenceEn: string;
  soilPreferenceBn: string;
  nitrogenFixer: boolean;
  rootDepth: 'Shallow' | 'Medium' | 'Deep';
  rootDepthBn: 'অগভীর' | 'মাঝারি' | 'গভীর';
  lstTolerance: string;
  descriptionEn: string;
  descriptionBn: string;
}

export type FarmerPriority =
  | 'soil_health'
  | 'water_saving'
  | 'climate_resilience'
  | 'yield_stability'
  | 'crop_rotation'
  | 'environmental_awareness'
  | 'data_planning';

export interface FarmProfile {
  farmName?: string;
  location: LocationInfo;
  farmSizeAcres?: number;
  currentCrop: CropKey;
  soilType: SoilTypeKey; // User input
  waterAvailability: WaterAvailabilityKey;
  priorities: FarmerPriority[];
}

export interface RotationStrategy {
  id: string;
  titleEn: string;
  titleBn: string;
  crops: CropKey[];
  descriptionEn: string;
  descriptionBn: string;
}

export interface StrategyAnalysis {
  strategyId: string;
  sequenceText: string;
  crops: CropMetadata[];
  waterConsiderationEn: string;
  waterConsiderationBn: string;
  soilConsiderationEn: string;
  soilConsiderationBn: string;
  diversityIndex: number; // 0 to 100
  diversityExplanationEn: string;
  diversityExplanationBn: string;
  climateMatchEn: string;
  climateMatchBn: string;
  potentialConsiderationsEn: string[];
  potentialConsiderationsBn: string[];
  priorityAlignmentScore: number; // 0 to 100
  priorityAlignmentDetailsEn: string;
  priorityAlignmentDetailsBn: string;
  methodologyNotesEn: string;
  methodologyNotesBn: string;
  limitationsEn: string;
  limitationsBn: string;
}

export type AppScreen =
  | 'language'
  | 'splash'
  | 'onboarding'
  | 'location'
  | 'farm_info'
  | 'priorities'
  | 'nasa_insights'
  | 'dashboard'
  | 'rotation_score'
  | 'rotation_explorer'
  | 'rotation_details'
  | 'strategy_compare'
  | 'final_summary'
  | 'profile_settings';

