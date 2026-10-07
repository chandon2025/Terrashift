// NASA Precipitation Service (GPM IMERG Daily)
import { NASAObservationData } from '../../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api/nasa';

export async function getPrecipitation(
  latitude: number,
  longitude: number,
  date?: string
): Promise<NASAObservationData['precipitation']> {
  const query = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
  });
  if (date) query.append('date', date);

  try {
    const response = await fetch(`${API_BASE}/environmental-data?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`NASA Precipitation request failed with status ${response.status}`);
    }
    const data: NASAObservationData = await response.json();
    if (!data.precipitation || data.precipitation.value === null) {
      throw new Error('No NASA observation available for this location/time.');
    }
    return data.precipitation;
  } catch (err: any) {
    throw new Error(err.message || 'NASA data is currently unavailable.');
  }
}
