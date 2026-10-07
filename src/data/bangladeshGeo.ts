// Bangladesh Geographic, Administrative & Agro-Ecological Zone (AEZ) Data
import { LocationInfo } from '../types';

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

export interface DistrictData {
  id: string;
  name: string;
  nameBn: string;
  division: string;
  divisionBn: string;
  lat: number;
  lon: number;
  aez: string;
  aezBn: string;
  upazilas: { name: string; nameBn: string; lat?: number; lon?: number }[];
}

export const BANGLADESH_DIVISIONS = [
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
  { id: 'chattogram', name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা' },
  { id: 'barishal', name: 'Barishal', nameBn: 'বরিশাল' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
];

export const BANGLADESH_DISTRICTS: DistrictData[] = [
  // Rangpur Division (Demo example included among all districts)
  {
    id: 'rangpur',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    division: 'Rangpur',
    divisionBn: 'রংপুর',
    lat: 25.7439,
    lon: 89.2752,
    aez: 'AEZ 3: Tista Meander Floodplain',
    aezBn: 'এইজেড ৩: তিস্তা সর্পিলাকার প্লাবনভূমি',
    upazilas: [
      { name: 'Rangpur Sadar', nameBn: 'রংপুর সদর', lat: 25.7439, lon: 89.2752 },
      { name: 'Gangachara', nameBn: 'গঙ্গাচড়া', lat: 25.8500, lon: 89.2167 },
      { name: 'Mithapukur', nameBn: 'মিঠাপুকুর', lat: 25.5778, lon: 89.2833 },
      { name: 'Pirganj', nameBn: 'পীরগঞ্জ', lat: 25.4167, lon: 89.3167 },
      { name: 'Badarganj', nameBn: 'বদরগঞ্জ', lat: 25.6722, lon: 89.0528 },
      { name: 'Kaunia', nameBn: 'কাউনিয়া', lat: 25.7722, lon: 89.4167 },
      { name: 'Taraganj', nameBn: 'তারাগঞ্জ', lat: 25.8111, lon: 89.0167 },
    ],
  },
  {
    id: 'dinajpur',
    name: 'Dinajpur',
    nameBn: 'দিনাজপুর',
    division: 'Rangpur',
    divisionBn: 'রংপুর',
    lat: 25.6217,
    lon: 88.6355,
    aez: 'AEZ 1: Old Himalayan Piedmont Plain',
    aezBn: 'এইজেড ১: পুরাতন হিমালয় পাদদেশীয় সমভূমি',
    upazilas: [
      { name: 'Dinajpur Sadar', nameBn: 'দিনাজপুর সদর', lat: 25.6217, lon: 88.6355 },
      { name: 'Birganj', nameBn: 'বীরগঞ্জ', lat: 25.8500, lon: 88.6500 },
      { name: 'Birol', nameBn: 'বিরল', lat: 25.6333, lon: 88.5500 },
      { name: 'Phulbari', nameBn: 'ফুলবাড়ী', lat: 25.4833, lon: 88.8833 },
    ],
  },
  {
    id: 'bogura',
    name: 'Bogura',
    nameBn: 'বগুড়া',
    division: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    lat: 24.8465,
    lon: 89.3778,
    aez: 'AEZ 25: Level Barind Tract',
    aezBn: 'এইজেড ২৫: সমতল বরেন্দ্র অঞ্চল',
    upazilas: [
      { name: 'Bogura Sadar', nameBn: 'বগুড়া সদর', lat: 24.8465, lon: 89.3778 },
      { name: 'Shibganj', nameBn: 'শিবগঞ্জ', lat: 25.0000, lon: 89.3333 },
      { name: 'Sherpur', nameBn: 'শেরপুর', lat: 24.6833, lon: 89.4167 },
      { name: 'Gabtali', nameBn: 'গাবতলী', lat: 24.8833, lon: 89.5167 },
    ],
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    division: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    lat: 24.3636,
    lon: 88.6241,
    aez: 'AEZ 26: High Barind Tract',
    aezBn: 'এইজেড ২৬: উচ্চ বরেন্দ্র অঞ্চল',
    upazilas: [
      { name: 'Boalia', nameBn: 'বোয়ালিয়া', lat: 24.3636, lon: 88.6241 },
      { name: 'Godagari', nameBn: 'গোদাগাড়ী', lat: 24.4667, lon: 88.3333 },
      { name: 'Tanore', nameBn: 'তানোর', lat: 24.5833, lon: 88.5833 },
      { name: 'Paba', nameBn: 'পবা', lat: 24.4333, lon: 88.6167 },
    ],
  },
  {
    id: 'dhaka',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    lat: 23.8103,
    lon: 90.4125,
    aez: 'AEZ 28: Madhupur Tract',
    aezBn: 'এইজেড ২৮: মধুপুর গড় অঞ্চল',
    upazilas: [
      { name: 'Dhamrai', nameBn: 'ধামরাই', lat: 23.9167, lon: 90.2167 },
      { name: 'Savar', nameBn: 'সাভার', lat: 23.8500, lon: 90.2667 },
      { name: 'Keraniganj', nameBn: 'কেরানীগঞ্জ', lat: 23.6833, lon: 90.3167 },
    ],
  },
  {
    id: 'gazipur',
    name: 'Gazipur',
    nameBn: 'গাজীপুর',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    lat: 24.0023,
    lon: 90.4264,
    aez: 'AEZ 28: Madhupur Tract',
    aezBn: 'এইজেড ২৮: মধুপুর গড় অঞ্চল',
    upazilas: [
      { name: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর', lat: 24.0023, lon: 90.4264 },
      { name: 'Kapasia', nameBn: 'কাপাসিয়া', lat: 24.1167, lon: 90.5667 },
      { name: 'Sreepur', nameBn: 'শ্রীপুর', lat: 24.2000, lon: 90.4667 },
    ],
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    division: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    lat: 24.7471,
    lon: 90.4203,
    aez: 'AEZ 9: Old Brahmaputra Floodplain',
    aezBn: 'এইজেড ৯: পুরাতন ব্রহ্মপুত্র প্লাবনভূমি',
    upazilas: [
      { name: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর', lat: 24.7471, lon: 90.4203 },
      { name: 'Trishal', nameBn: 'ত্রিশাল', lat: 24.5833, lon: 90.4000 },
      { name: 'Muktagacha', nameBn: 'মুক্তাগাছা', lat: 24.7667, lon: 90.2667 },
    ],
  },
  {
    id: 'jashore',
    name: 'Jashore',
    nameBn: 'যশোর',
    division: 'Khulna',
    divisionBn: 'খুলনা',
    lat: 23.1664,
    lon: 89.2081,
    aez: 'AEZ 11: High Ganges River Floodplain',
    aezBn: 'এইজেড ১১: উচ্চ গঙ্গা নদী প্লাবনভূমি',
    upazilas: [
      { name: 'Jashore Sadar', nameBn: 'যশোর সদর', lat: 23.1664, lon: 89.2081 },
      { name: 'Jhikargacha', nameBn: 'ঝিকরগাছা', lat: 23.1000, lon: 89.1333 },
      { name: 'Sharsha', nameBn: 'শার্শা', lat: 23.0833, lon: 88.9000 },
    ],
  },
  {
    id: 'khulna',
    name: 'Khulna',
    nameBn: 'খুলনা',
    division: 'Khulna',
    divisionBn: 'খুলনা',
    lat: 22.8456,
    lon: 89.5403,
    aez: 'AEZ 13: Ganges Tidal Floodplain',
    aezBn: 'এইজেড ১৩: গঙ্গা জোয়ার-ভাটা প্লাবনভূমি',
    upazilas: [
      { name: 'Dumuria', nameBn: 'ডুমুরিয়া', lat: 22.8000, lon: 89.4167 },
      { name: 'Batiaghata', nameBn: 'বটিয়াঘাটা', lat: 22.7333, lon: 89.5333 },
      { name: 'Paikgachha', nameBn: 'পাইকগাছা', lat: 22.5833, lon: 89.3333 },
    ],
  },
  {
    id: 'barishal',
    name: 'Barishal',
    nameBn: 'বরিশাল',
    division: 'Barishal',
    divisionBn: 'বরিশাল',
    lat: 22.7010,
    lon: 90.3535,
    aez: 'AEZ 13: Ganges Tidal Floodplain',
    aezBn: 'এইজেড ১৩: গঙ্গা জোয়ার-ভাটা প্লাবনভূমি',
    upazilas: [
      { name: 'Barishal Sadar', nameBn: 'বরিশাল সদর', lat: 22.7010, lon: 90.3535 },
      { name: 'Babuganj', nameBn: 'বাবুগঞ্জ', lat: 22.8333, lon: 90.3167 },
      { name: 'Bakerganj', nameBn: 'বাকেরগঞ্জ', lat: 22.5500, lon: 90.3833 },
    ],
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    division: 'Sylhet',
    divisionBn: 'সিলেট',
    lat: 24.8949,
    lon: 91.8687,
    aez: 'AEZ 20: Eastern Surma-Kushiyara Floodplain',
    aezBn: 'এইজেড ২০: পূর্ব সুরমা-কুশিয়ারা প্লাবনভূমি',
    upazilas: [
      { name: 'Sylhet Sadar', nameBn: 'সিলেট সদর', lat: 24.8949, lon: 91.8687 },
      { name: 'Golapganj', nameBn: 'গোলাপগঞ্জ', lat: 24.8667, lon: 92.0167 },
      { name: 'Beanibazar', nameBn: 'বিয়ানীবাজার', lat: 24.8333, lon: 92.1667 },
    ],
  },
  {
    id: 'cumilla',
    name: 'Cumilla',
    nameBn: 'কুমিল্লা',
    division: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    lat: 23.4607,
    lon: 91.1809,
    aez: 'AEZ 19: Old Meghna Estuarine Floodplain',
    aezBn: 'এইজেড ১৯: পুরাতন মেঘনা মোহনা প্লাবনভূমি',
    upazilas: [
      { name: 'Cumilla Adarsha Sadar', nameBn: 'কুমিল্লা আদর্শ সদর', lat: 23.4607, lon: 91.1809 },
      { name: 'Chandina', nameBn: 'চান্দিনা', lat: 23.4833, lon: 91.0000 },
      { name: 'Debidwar', nameBn: 'দেবিদ্বার', lat: 23.6000, lon: 90.9833 },
    ],
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    division: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    lat: 22.3569,
    lon: 91.7832,
    aez: 'AEZ 23: Chittagong Coastal Plain',
    aezBn: 'এইজেড ২৩: চট্টগ্রাম উপকূলীয় সমভূমি',
    upazilas: [
      { name: 'Hathazari', nameBn: 'হাটহাজারী', lat: 22.5000, lon: 91.8000 },
      { name: 'Fatikchhari', nameBn: 'ফটিকছড়ি', lat: 22.6833, lon: 91.8000 },
      { name: 'Patiya', nameBn: 'পটিয়া', lat: 22.3000, lon: 91.9833 },
    ],
  },
  {
    id: 'kurigram',
    name: 'Kurigram',
    nameBn: 'কুড়িগ্রাম',
    division: 'Rangpur',
    divisionBn: 'রংপুর',
    lat: 25.8054,
    lon: 89.6362,
    aez: 'AEZ 2: Active Tista Floodplain',
    aezBn: 'এইজেড ২: সক্রিয় তিস্তা প্লাবনভূমি',
    upazilas: [
      { name: 'Kurigram Sadar', nameBn: 'কুড়িগ্রাম সদর', lat: 25.8054, lon: 89.6362 },
      { name: 'Rajarhat', nameBn: 'রাজারহাট', lat: 25.8000, lon: 89.5500 },
    ],
  },
  {
    id: 'gaibandha',
    name: 'Gaibandha',
    nameBn: 'গাইবান্ধা',
    division: 'Rangpur',
    divisionBn: 'রংপুর',
    lat: 25.3288,
    lon: 89.5430,
    aez: 'AEZ 3: Tista Meander Floodplain',
    aezBn: 'এইজেড ৩: তিস্তা সর্পিলাকার প্লাবনভূমি',
    upazilas: [
      { name: 'Gaibandha Sadar', nameBn: 'গাইবান্ধা সদর', lat: 25.3288, lon: 89.5430 },
      { name: 'Gobindaganj', nameBn: 'গোবিন্দগঞ্জ', lat: 25.1333, lon: 89.3500 },
    ],
  },
  {
    id: 'tangail',
    name: 'Tangail',
    nameBn: 'টাঙ্গাইল',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    lat: 24.2513,
    lon: 89.9167,
    aez: 'AEZ 8: Young Brahmaputra and Jamuna Floodplain',
    aezBn: 'এইজেড ৮: নতুন ব্রহ্মপুত্র ও যমুনা প্লাবনভূমি',
    upazilas: [
      { name: 'Tangail Sadar', nameBn: 'টাঙ্গাইল সদর', lat: 24.2513, lon: 89.9167 },
      { name: 'Madhupur', nameBn: 'মধুপুর', lat: 24.6167, lon: 90.0333 },
    ],
  },
  {
    id: 'kushtia',
    name: 'Kushtia',
    nameBn: 'কুষ্টিয়া',
    division: 'Khulna',
    divisionBn: 'খুলনা',
    lat: 23.9013,
    lon: 89.1205,
    aez: 'AEZ 11: High Ganges River Floodplain',
    aezBn: 'এইজেড ১১: উচ্চ গঙ্গা নদী প্লাবনভূমি',
    upazilas: [
      { name: 'Kushtia Sadar', nameBn: 'কুষ্টিয়া সদর', lat: 23.9013, lon: 89.1205 },
      { name: 'Kumarkhali', nameBn: 'কুমারখালী', lat: 23.8667, lon: 89.2500 },
    ],
  },
  {
    id: 'pabna',
    name: 'Pabna',
    nameBn: 'পাবনা',
    division: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    lat: 24.0064,
    lon: 89.2372,
    aez: 'AEZ 12: Low Ganges River Floodplain',
    aezBn: 'এইজেড ১২: নিম্ন গঙ্গা নদী প্লাবনভূমি',
    upazilas: [
      { name: 'Pabna Sadar', nameBn: 'পাবনা সদর', lat: 24.0064, lon: 89.2372 },
      { name: 'Ishwardi', nameBn: 'ঈশ্বরদী', lat: 24.1333, lon: 89.0667 },
    ],
  },
  {
    id: 'coxsbazar',
    name: 'Cox\'s Bazar',
    nameBn: 'কক্সবাজার',
    division: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    lat: 21.4272,
    lon: 92.0058,
    aez: 'AEZ 23: Chittagong Coastal Plain',
    aezBn: 'এইজেড ২৩: চট্টগ্রাম উপকূলীয় সমভূমি',
    upazilas: [
      { name: 'Cox\'s Bazar Sadar', nameBn: 'কক্সবাজার সদর', lat: 21.4272, lon: 92.0058 },
      { name: 'Ramu', nameBn: 'রামু', lat: 21.4500, lon: 92.1000 },
      { name: 'Chakaria', nameBn: 'চকোরিয়া', lat: 21.7833, lon: 92.0833 },
    ],
  },
  {
    id: 'satkhira',
    name: 'Satkhira',
    nameBn: 'সাতক্ষীরা',
    division: 'Khulna',
    divisionBn: 'খুলনা',
    lat: 22.7185,
    lon: 89.0705,
    aez: 'AEZ 13: Ganges Tidal Floodplain',
    aezBn: 'এইজেড ১৩: গঙ্গা জোয়ার-ভাটা প্লাবনভূমি',
    upazilas: [
      { name: 'Satkhira Sadar', nameBn: 'সাতক্ষীরা সদর', lat: 22.7185, lon: 89.0705 },
      { name: 'Kalaroa', nameBn: 'কলারোয়া', lat: 22.8667, lon: 89.0417 },
      { name: 'Shyamnagar', nameBn: 'শ্যামনগর', lat: 22.3333, lon: 89.1000 },
    ],
  },
  {
    id: 'patuakhali',
    name: 'Patuakhali',
    nameBn: 'পটুয়াখালী',
    division: 'Barishal',
    divisionBn: 'বরিশাল',
    lat: 22.3596,
    lon: 90.3299,
    aez: 'AEZ 13: Ganges Tidal Floodplain',
    aezBn: 'এইজেড ১৩: গঙ্গা জোয়ার-ভাটা প্লাবনভূমি',
    upazilas: [
      { name: 'Patuakhali Sadar', nameBn: 'পটুয়াখালী সদর', lat: 22.3596, lon: 90.3299 },
      { name: 'Kalapara', nameBn: 'কলাপাড়া', lat: 21.9833, lon: 90.2333 },
    ],
  },
  {
    id: 'moulvibazar',
    name: 'Moulvibazar',
    nameBn: 'মৌলভীবাজার',
    division: 'Sylhet',
    divisionBn: 'সিলেট',
    lat: 24.4829,
    lon: 91.7774,
    aez: 'AEZ 22: Northern and Eastern Hills',
    aezBn: 'এইজেড ২২: উত্তর ও পূর্ব পাহাড়ি অঞ্চল',
    upazilas: [
      { name: 'Sreemangal', nameBn: 'শ্রীমঙ্গল', lat: 24.3000, lon: 91.7333 },
      { name: 'Moulvibazar Sadar', nameBn: 'মৌলভীবাজার সদর', lat: 24.4829, lon: 91.7774 },
    ],
  },
  {
    id: 'netrokona',
    name: 'Netrokona',
    nameBn: 'নেত্রকোণা',
    division: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    lat: 24.8709,
    lon: 90.7279,
    aez: 'AEZ 21: Sylhet Basin',
    aezBn: 'এইজেড ২১: সিলেট অববাহিকা',
    upazilas: [
      { name: 'Netrokona Sadar', nameBn: 'নেত্রকোণা সদর', lat: 24.8709, lon: 90.7279 },
      { name: 'Kendua', nameBn: 'কেন্দুয়া', lat: 24.6500, lon: 90.8333 },
    ],
  },
];

/**
 * Finds the closest district for any clicked coordinate in Bangladesh.
 */
export function findNearestDistrict(lat: number, lon: number): DistrictData {
  let nearest = BANGLADESH_DISTRICTS[0];
  let minDistance = Infinity;

  for (const district of BANGLADESH_DISTRICTS) {
    const dLat = district.lat - lat;
    const dLon = district.lon - lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < minDistance) {
      minDistance = distSq;
      nearest = district;
    }
  }

  return nearest;
}

/**
 * Creates LocationInfo object from arbitrary coordinates or district selection.
 */
export function buildLocationInfo(lat: number, lon: number, customName?: { en: string; bn: string }, upazilaName?: { en: string; bn: string }): LocationInfo {
  const nearest = findNearestDistrict(lat, lon);
  return {
    name: customName ? customName.en : upazilaName ? `${upazilaName.en}, ${nearest.name}` : nearest.name,
    nameBn: customName ? customName.bn : upazilaName ? `${upazilaName.bn}, ${nearest.nameBn}` : nearest.nameBn,
    district: nearest.name,
    districtBn: nearest.nameBn,
    division: nearest.division,
    divisionBn: nearest.divisionBn,
    upazila: upazilaName ? upazilaName.en : undefined,
    upazilaBn: upazilaName ? upazilaName.bn : undefined,
    lat: Number(lat.toFixed(4)),
    lon: Number(lon.toFixed(4)),
    aez: nearest.aez,
    aezBn: nearest.aezBn,
  };
}
