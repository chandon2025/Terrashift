// NASA Soil Moisture Service (SMAP L3/L4 Surface Soil Moisture)
// Transparently notes that satellite observations represent the surrounding pixel area (~9-36 km),
// not the individual farm field boundary.
import { NASAObservationData } from '../../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api/nasa';

export async function getSoilMoisture(
  latitude: number,
  longitude: number,
  date?: string
): Promise<NASAObservationData['soilMoisture']> {
  const query = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
  });
  if (date) query.append('date', date);

  try {
    const response = await fetch(`${API_BASE}/environmental-data?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`NASA Soil Moisture request failed with status ${response.status}`);
    }
    const data: NASAObservationData = await response.json();
    if (!data.soilMoisture || data.soilMoisture.value === null) {
      throw new Error('No NASA observation available for this location/time.');
    }
    return data.soilMoisture;
  } catch (err: any) {
    throw new Error(err.message || 'NASA data is currently unavailable.');
  }
}
