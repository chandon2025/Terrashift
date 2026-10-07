// High-level NASA Environmental Observation Service
import { NASAObservationData, NASATrendResponse } from '../../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api/nasa';

export async function fetchNASAEnvironmentalData(lat: number, lon: number): Promise<NASAObservationData> {
  const response = await fetch(`${API_BASE}/environmental-data?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.error || errJson.details || 'NASA data is currently unavailable.');
  }
  return response.json();
}

export async function fetchNASATrendData(
  lat: number,
  lon: number,
  range: '7d' | '30d' | '3m' | '6m' | '1y' = '30d'
): Promise<NASATrendResponse> {
  const response = await fetch(`${API_BASE}/timeseries?lat=${lat}&lon=${lon}&range=${range}`);
  if (!response.ok) {
    throw new Error('Historical NASA data is not available for this period.');
  }
  return response.json();
}

