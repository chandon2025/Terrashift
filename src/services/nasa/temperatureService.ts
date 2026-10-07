// NASA Land Surface Temperature Service (MODIS/Aqua MYD11A1 Version 6.1)
// Strictly labeled as Land Surface Temperature / LST (never air temperature)
import { NASAObservationData } from '../../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api/nasa';

export async function getLandSurfaceTemperature(
  latitude: number,
  longitude: number,
  date?: string
): Promise<NASAObservationData['landSurfaceTemperature']> {
  const query = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
  });
  if (date) query.append('date', date);

  try {
    const response = await fetch(`${API_BASE}/environmental-data?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`NASA LST request failed with status ${response.status}`);
    }
    const data: NASAObservationData = await response.json();
    if (!data.landSurfaceTemperature || data.landSurfaceTemperature.value === null) {
      throw new Error('No NASA observation available for this location/time.');
    }
    return data.landSurfaceTemperature;
  } catch (err: any) {
    throw new Error(err.message || 'NASA data is currently unavailable.');
  }
}
