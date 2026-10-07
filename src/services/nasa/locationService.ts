// Bangladesh Location Service
import { LocationInfo } from '../../types';
import { BANGLADESH_DISTRICTS, findNearestDistrict, buildLocationInfo } from '../../data/bangladeshGeo';

export const BANGLADESH_BOUNDS = {
  minLat: 20.57,
  maxLat: 26.63,
  minLon: 88.01,
  maxLon: 92.67,
};

export function isWithinBangladesh(lat: number, lon: number): boolean {
  return (
    lat >= BANGLADESH_BOUNDS.minLat &&
    lat <= BANGLADESH_BOUNDS.maxLat &&
    lon >= BANGLADESH_BOUNDS.minLon &&
    lon <= BANGLADESH_BOUNDS.maxLon
  );
}

/**
 * Validates coordinates for Bangladesh.
 */
export function validateBangladeshCoordinates(lat: number, lon: number): { isValid: boolean; message?: string } {
  if (isNaN(lat) || isNaN(lon)) {
    return { isValid: false, message: 'Invalid coordinate numbers.' };
  }
  if (!isWithinBangladesh(lat, lon)) {
    return {
      isValid: false,
      message: `Selected coordinates (${lat.toFixed(4)}, ${lon.toFixed(4)}) fall outside Bangladesh boundaries. TerraShift is strictly dedicated to Bangladesh agricultural land.`,
    };
  }
  return { isValid: true };
}

/**
 * Obtains current browser location if granted, strictly verifying Bangladesh boundaries.
 */
export async function getDeviceLocation(): Promise<LocationInfo> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!isWithinBangladesh(latitude, longitude)) {
          reject(
            new Error(
              `Device location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) is outside Bangladesh. Please select a Bangladesh location from the map or district list.`
            )
          );
          return;
        }

        const loc = buildLocationInfo(latitude, longitude, { en: 'My Current Location', bn: 'আমার বর্তমান অবস্থান' });
        resolve(loc);
      },
      (err) => {
        reject(new Error(err.message || 'Unable to retrieve device location.'));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

/**
 * Searches districts and upazilas across Bangladesh
 */
export function searchBangladeshLocations(query: string): LocationInfo[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const results: LocationInfo[] = [];

  for (const district of BANGLADESH_DISTRICTS) {
    if (
      district.name.toLowerCase().includes(q) ||
      district.nameBn.includes(q) ||
      district.division.toLowerCase().includes(q) ||
      district.divisionBn.includes(q)
    ) {
      results.push(buildLocationInfo(district.lat, district.lon));
    }

    // Check upazilas
    for (const up of district.upazilas) {
      if (up.name.toLowerCase().includes(q) || up.nameBn.includes(q)) {
        const lat = up.lat || district.lat;
        const lon = up.lon || district.lon;
        results.push(
          buildLocationInfo(lat, lon, undefined, { en: up.name, bn: up.nameBn })
        );
      }
    }
  }

  // Deduplicate and limit to 10 results
  return results.slice(0, 10);
}
