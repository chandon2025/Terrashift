// NASA Data Validation Utilities
import { isWithinBangladesh } from './geoUtils.js';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateCoordinates(latRaw: unknown, lonRaw: unknown): { isValid: boolean; lat: number; lon: number; error?: string } {
  const lat = typeof latRaw === 'string' ? parseFloat(latRaw) : Number(latRaw);
  const lon = typeof lonRaw === 'string' ? parseFloat(lonRaw) : Number(lonRaw);

  if (isNaN(lat) || isNaN(lon)) {
    return { isValid: false, lat: 0, lon: 0, error: 'Coordinates must be valid numbers.' };
  }

  if (!isWithinBangladesh(lat, lon)) {
    return {
      isValid: false,
      lat,
      lon,
      error: `Coordinates (${lat.toFixed(4)}, ${lon.toFixed(4)}) are outside Bangladesh boundaries (Lat: 20.57-26.63°N, Lon: 88.01-92.67°E).`,
    };
  }

  return { isValid: true, lat, lon };
}

/**
 * Validates that an observation number from NASA is valid (not null, not undefined, not NaN, not -999 fill value).
 */
export function isValidNASANumber(val: unknown): val is number {
  if (val === null || val === undefined) return false;
  const num = Number(val);
  if (isNaN(num)) return false;
  // NASA fill values are typically -999, -9999, -999.0, or 99999
  if (num <= -900 || num >= 99900) return false;
  return true;
}

/**
 * Validates date string in YYYYMMDD or YYYY-MM-DD format.
 */
export function sanitizeDateParam(dateStr?: string): string {
  if (!dateStr) {
    const today = new Date();
    // Use 3 days ago to match near-real-time ingestion latency
    today.setDate(today.getDate() - 3);
    return today.toISOString().slice(0, 10).replace(/-/g, '');
  }
  const clean = dateStr.replace(/[^0-9]/g, '');
  if (clean.length === 8) {
    return clean;
  }
  const today = new Date();
  today.setDate(today.getDate() - 3);
  return today.toISOString().slice(0, 10).replace(/-/g, '');
}

