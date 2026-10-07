// NASA Dataset Official Metadata & Product Specifications
// References official NASA Earthdata, MODIS, GPM, and SMAP documentation

export interface NASADatasetInfo {
  mission: string;
  product: string;
  shortName: string;
  version: string;
  variable: string;
  unit: string;
  spatialResolution: string;
  temporalResolution: string;
  officialProductUrl: string;
  alternateUrls?: { name: string; url: string }[];
  scientificNotice: string;
  scientificNoticeBn: string;
}

export const NASA_DATASET_METADATA: Record<string, NASADatasetInfo> = {
  landSurfaceTemperature: {
    mission: 'NASA Earth Observing System (EOS) Aqua',
    product: 'MODIS/Aqua Land Surface Temperature/Emissivity Daily L3 Global 1km SIN Grid V061 (MYD11A1)',
    shortName: 'MYD11A1',
    version: '061',
    variable: 'Land Surface Temperature (LST_Day_1km)',
    unit: '°C (Celsius)',
    spatialResolution: '1 km',
    temporalResolution: 'Daily (daytime satellite pass)',
    officialProductUrl: 'https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b',
    alternateUrls: [
      {
        name: 'NASA MODIS Land Surface Temperature Overview',
        url: 'https://modis.gsfc.nasa.gov/data/dataprod/mod11.php',
      },
      {
        name: 'NASA LAADS DAAC (MYD11A1)',
        url: 'https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/MYD11A1',
      },
    ],
    scientificNotice:
      'Land Surface Temperature (LST) measures the radiative skin temperature of the land surface observed by satellite radiometers. It is distinct from 2-meter ambient air temperature.',
    scientificNoticeBn:
      'ভূমিপৃষ্ঠ তাপমাত্রা (LST) হলো উপগ্রহ সেন্সর দ্বারা পরিমাপকৃত মাটির উপরের ত্বকের তাপমাত্রা। এটি প্রচলিত বায়ুর তাপমাত্রা (Air Temperature) থেকে ভিন্ন।',
  },
  precipitation: {
    mission: 'NASA Global Precipitation Measurement (GPM) Constellation',
    product: 'NASA GPM Integrated Multi-satellitE Retrievals for GPM (IMERG) Daily',
    shortName: 'GPM_3IMERGDF / GPM_3IMERGDL',
    version: '07B',
    variable: 'Daily Precipitation Accumulation',
    unit: 'mm/day',
    spatialResolution: '0.1° (~10 km)',
    temporalResolution: 'Daily',
    officialProductUrl: 'https://gpm.nasa.gov/data/imerg',
    alternateUrls: [
      {
        name: 'NASA Earthdata GPM IMERG Overview',
        url: 'https://www.earthdata.nasa.gov/learn/articles/gpm-imerg-v07',
      },
      {
        name: 'NASA GES DISC IMERG Product Details',
        url: 'https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_07/summary',
      },
    ],
    scientificNotice:
      'NASA GPM IMERG estimates precipitation rates and accumulations from microwave and infrared radiometer constellations across 0.1° resolution grids.',
    scientificNoticeBn:
      'নাসা জিপিএম (GPM) আইমার্জ উপগ্রহভিত্তিক সেন্সরের সাহায্যে দৈনিক বৃষ্টিপাতের পরিমাণ নিরূপণ করে।',
  },
  soilMoisture: {
    mission: 'NASA Soil Moisture Active Passive (SMAP)',
    product: 'NASA SMAP L3/L4 Global Surface & Root-Zone Soil Moisture',
    shortName: 'SPL3SMP_E / SPL4SMGP',
    version: '006 / 007',
    variable: 'Surface Soil Moisture Wetness (0–5 cm) & Root-Zone Wetness (0–100 cm)',
    unit: 'fraction (0.00 - 1.00 relative wetness)',
    spatialResolution: '9 km / 36 km',
    temporalResolution: 'Daily (2-3 day repeat orbit)',
    officialProductUrl: 'https://worldview.earthdata.nasa.gov/',
    alternateUrls: [
      {
        name: 'NASA Earthdata SMAP Sensor Overview',
        url: 'https://www.earthdata.nasa.gov/sensors/smap',
      },
      {
        name: 'NASA NSIDC DAAC SMAP Mission',
        url: 'https://nsidc.org/data/smap',
      },
    ],
    scientificNotice:
      'Satellite soil moisture measures the integrated average moisture over the satellite observation footprint (~9–36 km). It does not represent individual agricultural field parcel micro-variations.',
    scientificNoticeBn:
      'উপগ্রহ মাটির আর্দ্রতা বিস্তৃত আঞ্চলিক এলাকার (~৯–৩৬ কিমি) গড় আর্দ্রতা নির্দেশ করে। এটি একক কৃষি জমির ক্ষুদ্র ক্ষেত্রের আর্দ্রতা নয়।',
  },
};

export function getNASADataMetadata(): Record<string, NASADatasetInfo> {
  return NASA_DATASET_METADATA;
}
