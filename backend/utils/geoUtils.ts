// Bangladesh Geographic Boundary & Spatial Utilities
// Bounding box: Latitude 20.57°N to 26.63°N, Longitude 88.01°E to 92.67°E

export interface Coordinates {
  lat: number;
  lon: number;
}

export const BANGLADESH_BOUNDS = {
  minLat: 20.57,
  maxLat: 26.63,
  minLon: 88.01,
  maxLon: 92.67,
};

/**
 * Checks whether given coordinates fall strictly within Bangladesh territory.
 */
export function isWithinBangladesh(lat: number, lon: number): boolean {
  return (
    lat >= BANGLADESH_BOUNDS.minLat &&
    lat <= BANGLADESH_BOUNDS.maxLat &&
    lon >= BANGLADESH_BOUNDS.minLon &&
    lon <= BANGLADESH_BOUNDS.maxLon
  );
}

/**
 * Normalizes coordinates to 4 decimal places for scientific precision.
 */
export function formatCoordinates(lat: number, lon: number): { lat: number; lon: number } {
  return {
    lat: Number(lat.toFixed(4)),
    lon: Number(lon.toFixed(4)),
  };
}
