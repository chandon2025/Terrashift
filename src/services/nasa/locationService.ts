// Bangladesh Location Service with Native Mobile GPS & Browser Geolocation
import { LocationInfo } from '../../types';
import { BANGLADESH_DISTRICTS, findNearestDistrict, buildLocationInfo } from '../../data/bangladeshGeo';
import { Geolocation } from '@capacitor/geolocation';

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
 * Obtains current device location using native Capacitor GPS or browser Geolocation,
 * strictly verifying Bangladesh boundaries.
 */
export async function getDeviceLocation(): Promise<LocationInfo> {
  let latitude: number | null = null;
  let longitude: number | null = null;

  try {
    // Try native mobile GPS first (Capacitor Geolocation)
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 8000,
    });
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch {
    // Fallback to browser geolocation
    if (navigator.geolocation) {
      const browserPos: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });
      latitude = browserPos.coords.latitude;
      longitude = browserPos.coords.longitude;
    }
  }

  if (latitude === null || longitude === null) {
    throw new Error('Unable to retrieve device GPS location. Please check location permissions.');
  }

  if (!isWithinBangladesh(latitude, longitude)) {
    throw new Error(
      `Device location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) is outside Bangladesh boundaries. Please select a Bangladesh location from the map or district list.`
    );
  }

  return buildLocationInfo(latitude, longitude, { en: 'My Current Location (GPS)', bn: 'আমার বর্তমান অবস্থান (জিপিএস)' });
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
