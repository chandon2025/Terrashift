// In-Memory & Resilient Cache Service for NASA Observations
// Adheres to requirement: never fabricate values, distinguish live from cached,
// clearly indicate observation date when last available data is returned.

export interface CachedObservationRecord {
  key: string;
  lat: number;
  lon: number;
  observationDate: string;
  retrievedAt: string;
  data: any;
}

class CacheService {
  private cache: Map<string, CachedObservationRecord> = new Map();
  // Location history to find last available observation for a location
  private locationHistory: Map<string, CachedObservationRecord[]> = new Map();

  private makeGridKey(lat: number, lon: number): string {
    // Round to 2 decimal places (~1.1 km grid, matching MODIS 1km scale)
    return `${lat.toFixed(2)}_${lon.toFixed(2)}`;
  }

  public set(lat: number, lon: number, observationDate: string, data: any): void {
    const gridKey = this.makeGridKey(lat, lon);
    const key = `${gridKey}_${observationDate}`;
    const record: CachedObservationRecord = {
      key,
      lat,
      lon,
      observationDate,
      retrievedAt: new Date().toISOString(),
      data,
    };

    this.cache.set(key, record);

    // Update location history
    const history = this.locationHistory.get(gridKey) || [];
    // Replace if same date exists, else append
    const existingIndex = history.findIndex((h) => h.observationDate === observationDate);
    if (existingIndex >= 0) {
      history[existingIndex] = record;
    } else {
      history.push(record);
      // Sort by date descending
      history.sort((a, b) => b.observationDate.localeCompare(a.observationDate));
    }
    this.locationHistory.set(gridKey, history);
  }

  public get(lat: number, lon: number, observationDate: string): CachedObservationRecord | null {
    const gridKey = this.makeGridKey(lat, lon);
    const key = `${gridKey}_${observationDate}`;
    return this.cache.get(key) || null;
  }

  public getLastAvailable(lat: number, lon: number): CachedObservationRecord | null {
    const gridKey = this.makeGridKey(lat, lon);
    const history = this.locationHistory.get(gridKey);
    if (history && history.length > 0) {
      return history[0]; // Most recent cached record
    }
    return null;
  }
}

export const cacheService = new CacheService();

