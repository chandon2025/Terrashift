// NASA API Routes for TerraShift
import { Router, Request, Response } from 'express';
import { validateCoordinates } from '../utils/validation.js';
import { nasaClient } from '../services/nasaClient.js';

const router = Router();

/**
 * GET /api/nasa/environmental-data
 * Parameters: lat, lon, date (optional)
 */
router.get('/environmental-data', async (req: Request, res: Response) => {
  const { lat, lon, date } = req.query;

  const validation = validateCoordinates(lat, lon);
  if (!validation.isValid) {
    return res.status(400).json({
      error: validation.error,
      code: 'INVALID_COORDINATES',
      message: validation.error,
    });
  }

  try {
    const data = await nasaClient.getEnvironmentalData(validation.lat, validation.lon, typeof date === 'string' ? date : undefined);
    return res.json(data);
  } catch (error: any) {
    return res.status(503).json({
      error: 'NASA data is currently unavailable.',
      details: error.message || 'Service connection timeout or data processing error.',
      code: 'NASA_SERVICE_UNAVAILABLE',
      sources: {
        lst: 'https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b',
        precipitation: 'https://gpm.nasa.gov/data/imerg',
        soilMoisture: 'https://worldview.earthdata.nasa.gov/',
      },
    });
  }
});

/**
 * GET /api/nasa/timeseries
 * Parameters: lat, lon, range (7d, 30d, 3m, 6m, 1y)
 */
router.get('/timeseries', async (req: Request, res: Response) => {
  const { lat, lon, range = '30d' } = req.query;

  const validation = validateCoordinates(lat, lon);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  const validRanges = ['7d', '30d', '3m', '6m', '1y'];
  const selectedRange = validRanges.includes(String(range)) ? (String(range) as '7d' | '30d' | '3m' | '6m' | '1y') : '30d';

  try {
    const timeseries = await nasaClient.getTimeseries(validation.lat, validation.lon, selectedRange);
    return res.json(timeseries);
  } catch (error: any) {
    return res.status(404).json({
      error: 'Historical NASA data is not available for this period.',
      details: error.message,
    });
  }
});

/**
 * GET /api/nasa/granules
 * Parameters: lat, lon
 */
router.get('/granules', async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  const validation = validateCoordinates(lat, lon);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  const granules = await nasaClient.fetchCMRGranules(validation.lat, validation.lon);
  return res.json(granules);
});

/**
 * GET /api/nasa/metadata
 * Official NASA Dataset Specifications & Citations
 */
router.get('/metadata', (_req: Request, res: Response) => {
  res.json({
    datasets: {
      landSurfaceTemperature: {
        mission: 'NASA Earth Observing System (EOS) Aqua',
        product: 'MODIS/Aqua Land Surface Temperature/Emissivity Daily L3 Global 1km SIN Grid V061 (MYD11A1)',
        shortName: 'MYD11A1',
        version: '061',
        variable: 'Land Surface Temperature (LST_Day_1km)',
        unit: 'Celsius (°C)',
        spatialResolution: '1 km per pixel',
        temporalResolution: 'Daily',
        officialSources: [
          {
            name: 'NASA Open Data Portal (MYD11A1 V6.1)',
            url: 'https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b',
          },
          {
            name: 'NASA MODIS Land Surface Temperature Overview',
            url: 'https://modis.gsfc.nasa.gov/data/dataprod/mod11.php',
          },
          {
            name: 'NASA LAADS DAAC (MYD11A1 Product Page)',
            url: 'https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/MYD11A1',
          },
        ],
        scientificNotice:
          'Land Surface Temperature (LST) is the radiative skin temperature of the land surface, measured by satellite radiometry. It is distinct from 2-meter ambient air temperature.',
      },
      precipitation: {
        mission: 'NASA Global Precipitation Measurement (GPM) Constellation',
        product: 'NASA GPM Integrated Multi-satellitE Retrievals for GPM (IMERG) Daily',
        shortName: 'GPM_3IMERGDF / GPM_3IMERGDL',
        version: '07B',
        variable: 'Daily Precipitation Accumulation',
        unit: 'Millimeters per day (mm/day)',
        spatialResolution: '0.1° (~10 km)',
        temporalResolution: 'Daily',
        officialSources: [
          {
            name: 'NASA GPM IMERG Official Mission Portal',
            url: 'https://gpm.nasa.gov/data/imerg',
          },
          {
            name: 'NASA GES DISC IMERG Product Details',
            url: 'https://disc.gsfc.nasa.gov/datasets/GPM_3IMERGDF_07/summary',
          },
        ],
        scientificNotice:
          'NASA IMERG estimates multi-satellite precipitation by combining microwave constellation retrievals with geostationary infrared observations.',
      },
      soilMoisture: {
        mission: 'NASA Soil Moisture Active Passive (SMAP)',
        product: 'NASA SMAP L3/L4 Global Surface & Root-Zone Soil Moisture',
        shortName: 'SPL3SMP_E / SPL4SMGP',
        version: '006 / 007',
        variable: 'Surface Soil Moisture Wetness (0–5 cm) & Root-Zone Wetness (0–100 cm)',
        unit: 'Fractional Wetness (0.00 - 1.00 relative wetness)',
        spatialResolution: '9 km / 36 km',
        temporalResolution: 'Daily (2-3 day repeat cycle)',
        officialSources: [
          {
            name: 'NASA Worldview Interactive Explorer',
            url: 'https://worldview.earthdata.nasa.gov/',
          },
          {
            name: 'NASA Earthdata SMAP Sensor Overview',
            url: 'https://www.earthdata.nasa.gov/sensors/smap',
          },
          {
            name: 'NASA NSIDC DAAC SMAP Data Collection',
            url: 'https://nsidc.org/data/smap',
          },
        ],
        scientificNotice:
          'Satellite soil moisture measures the integrated average moisture over the satellite observation footprint (~9–36 km). It does not represent individual agricultural field parcel micro-variations.',
      },
    },
    organization: 'NASA Space Apps Challenge 2026',
    application: 'TerraShift - Bangladesh Agricultural Decision-Support',
  });
});

export default router;

