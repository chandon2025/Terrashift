// Crops Database & Rotational Exploration Logic for Bangladesh Agriculture
import { CropKey, CropMetadata, StrategyAnalysis, SoilTypeKey, WaterAvailabilityKey, FarmerPriority } from '../types';

export const CROPS_CATALOG: Record<CropKey, CropMetadata> = {
  rice_boro: {
    key: 'rice_boro',
    nameEn: 'Boro Rice',
    nameBn: 'বোরো ধান',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'High',
    waterDemandBn: 'উচ্চ',
    soilPreferenceEn: 'Clay loam to heavy clay; holds standing water well',
    soilPreferenceBn: 'এঁটেল দোআঁশ থেকে এঁটেল মাটি; জলাবদ্ধতা ধারণক্ষম',
    nitrogenFixer: false,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '18°C – 32°C',
    descriptionEn: 'Major dry-season irrigated rice in Bangladesh, vital for food security but requiring substantial irrigation.',
    descriptionBn: 'বাংলাদেশের প্রধান সেচনির্ভর খাদ্যশস্য; উচ্চ ফলনশীল হলেও প্রচুর সেচের প্রয়োজন হয়।',
  },
  rice_aman: {
    key: 'rice_aman',
    nameEn: 'T. Aman Rice',
    nameBn: 'রোপা আমন ধান',
    seasonEn: 'Kharif-2 (Monsoon)',
    seasonBn: 'খরিফ-২ (বর্ষাকাল)',
    waterDemand: 'High',
    waterDemandBn: 'উচ্চ',
    soilPreferenceEn: 'Medium to heavy loam or clay',
    soilPreferenceBn: 'মাঝারি থেকে এঁটেল দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '22°C – 35°C',
    descriptionEn: 'Rainfed monsoon rice cultivated across Bangladesh floodplains, reliant on seasonal precipitation patterns.',
    descriptionBn: 'বর্ষা মৌসুমে বৃষ্টির পানিতে চাষকৃত প্রধান ধান ফসল; আবহাওয়া ও বৃষ্টিপাতের ওপর নির্ভরশীল।',
  },
  rice_aus: {
    key: 'rice_aus',
    nameEn: 'Aus Rice',
    nameBn: 'আউশ ধান',
    seasonEn: 'Kharif-1 (Pre-Monsoon)',
    seasonBn: 'খরিফ-১ (প্রাক-বর্ষা)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Sandy loam to fertile silt loam',
    soilPreferenceBn: 'বেলে দোআঁশ থেকে পলি দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Shallow',
    rootDepthBn: 'অগভীর',
    lstTolerance: '24°C – 36°C',
    descriptionEn: 'Short-duration pre-monsoon rice often fitted between Boro and Aman or in drought-prone upland areas.',
    descriptionBn: 'স্বল্পমেয়াদী প্রাক-বর্ষা মৌসুমের ধান, যা কম সেচেও আবাদ করা যায়।',
  },
  maize: {
    key: 'maize',
    nameEn: 'Maize',
    nameBn: 'ভুট্টা',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Well-drained deep loamy soil with rich organic content',
    soilPreferenceBn: 'উন্নত নিষ্কাশনযুক্ত গভীর দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Deep',
    rootDepthBn: 'গভীর',
    lstTolerance: '18°C – 32°C',
    descriptionEn: 'High-biomass cereal crop; deep rooting helps break soil pans, but requires adequate fertility management.',
    descriptionBn: 'উচ্চ ফলনশীল অর্থকরী দানাশস্য; শিকড় মাটির গভীরে যায় এবং মাটির গঠন সতেজ রাখতে সহায়তা করতে পারে।',
  },
  wheat: {
    key: 'wheat',
    nameEn: 'Wheat',
    nameBn: 'গম',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Well-aerated fertile loamy soil',
    soilPreferenceBn: 'উর্বর দোআঁশ ও এঁটেল দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '14°C – 26°C',
    descriptionEn: 'Winter cereal needing cooler temperatures during vegetative stages, sensitive to high late-season LST.',
    descriptionBn: 'শীতপ্রধান রবি ফসল; বৃদ্ধির সময় ঠান্ডা আবহাওয়া অনুকূল, দেরিতে তাপমাত্রা বৃদ্ধি সংবেদনশীল।',
  },
  potato: {
    key: 'potato',
    nameEn: 'Potato',
    nameBn: 'আলু',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Loose, friable sandy loam rich in humus',
    soilPreferenceBn: 'ঝুরঝুরে বেলে দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Shallow',
    rootDepthBn: 'অগভীর',
    lstTolerance: '15°C – 24°C',
    descriptionEn: 'High cash-value tuber crop popular in northern Bangladesh (Munshiganj, Rangpur, Bogura); requires friable soil.',
    descriptionBn: 'উচ্চ মূল্যের বাণিজ্যিক কন্দজাতীয় ফসল; আলগা ও দোআঁশ মাটিতে ভালো বৃদ্ধি পায়।',
  },
  legume_lentil: {
    key: 'legume_lentil',
    nameEn: 'Lentil (Pulse)',
    nameBn: 'মসুর ডাল',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Low',
    waterDemandBn: 'স্বল্প',
    soilPreferenceEn: 'Well-drained sandy loam or silt loam',
    soilPreferenceBn: 'নিষ্কাশনযুক্ত বেলে বা পলি দোআঁশ মাটি',
    nitrogenFixer: true,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '16°C – 28°C',
    descriptionEn: 'Nitrogen-fixing legume that hosts Rhizobia to fix atmospheric N, enriching soil organic matter and resting land.',
    descriptionBn: 'রাইজোবিয়াম ব্যাকটেরিয়ার মাধ্যমে বায়ুমণ্ডলীয় নাইট্রোজেন মাটিতে ধরে রাখে এবং মাটির উর্বরতা বৃদ্ধি করে।',
  },
  legume_mung: {
    key: 'legume_mung',
    nameEn: 'Mungbean',
    nameBn: 'মুগ ডাল',
    seasonEn: 'Kharif-1 (Pre-Monsoon)',
    seasonBn: 'খরিফ-১ (প্রাক-বর্ষা)',
    waterDemand: 'Low',
    waterDemandBn: 'স্বল্প',
    soilPreferenceEn: 'Fertile loam to sandy loam',
    soilPreferenceBn: 'উর্বর দোআঁশ থেকে বেলে দোআঁশ',
    nitrogenFixer: true,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '24°C – 35°C',
    descriptionEn: 'Short-duration (60–65 days) legume; acts as green manure and breaks pest cycles between major rice seasons.',
    descriptionBn: 'মাত্র ৬০–৬৫ দিনের দ্রুত বর্ধনশীল ডাল; সবুজ সার হিসেবে ও মাটির স্বাস্থ্য রক্ষায় কার্যকর।',
  },
  mustard: {
    key: 'mustard',
    nameEn: 'Mustard',
    nameBn: 'সরিষা',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Low',
    waterDemandBn: 'স্বল্প',
    soilPreferenceEn: 'Light loamy to silt loam soil',
    soilPreferenceBn: 'হালকা দোআঁশ ও পলি দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Shallow',
    rootDepthBn: 'অগভীর',
    lstTolerance: '15°C – 26°C',
    descriptionEn: 'Short-duration oilseed ideal for inserting between T. Aman harvest and late Boro transplanting.',
    descriptionBn: 'স্বল্পমেয়াদী তৈলবীজ; আমন কাটার পর ও বোরো রোপণের মধ্যবর্তী সময়ে চাষের উপযোগী।',
  },
  jute: {
    key: 'jute',
    nameEn: 'Jute',
    nameBn: 'পাট',
    seasonEn: 'Kharif-1 (Pre-Monsoon)',
    seasonBn: 'খরিফ-১ (প্রাক-বর্ষা)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Alluvial silt loam to clay loam',
    soilPreferenceBn: 'পলিযুক্ত দোআঁশ থেকে এঁটেল দোআঁশ',
    nitrogenFixer: false,
    rootDepth: 'Deep',
    rootDepthBn: 'গভীর',
    lstTolerance: '25°C – 37°C',
    descriptionEn: 'Traditional fiber crop; leaves drop naturally, adding massive organic biomass to the soil horizon.',
    descriptionBn: 'ঐতিহ্যবাহী সোনালী আঁশ; ঝরা পাতা মাটিতে পড়ে প্রচুর জৈব পদার্থ ও হিউমাস যোগ করে।',
  },
  vegetables: {
    key: 'vegetables',
    nameEn: 'Winter Vegetables',
    nameBn: 'শীতকালীন শাকসবজি',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Rich humus loam with good organic content',
    soilPreferenceBn: 'জৈব পদার্থ সমৃদ্ধ উর্বর দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Shallow',
    rootDepthBn: 'অগভীর',
    lstTolerance: '16°C – 28°C',
    descriptionEn: 'Cauliflower, cabbage, radishes, spinach providing high nutritional and economic diversity.',
    descriptionBn: 'ফুলকপি, বাঁধাকপি, মুলা ও শাকসবজি; পরিবারের পুষ্টি ও দ্রুত আয়ের উৎস।',
  },
  tomato: {
    key: 'tomato',
    nameEn: 'Tomato',
    nameBn: 'টমেটো',
    seasonEn: 'Rabi (Winter)',
    seasonBn: 'রবি (শীতকালীন)',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Well-drained sandy loam with pH 6.0–7.0',
    soilPreferenceBn: 'পানি নিষ্কাশনযোগ্য বেলে দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: '18°C – 28°C',
    descriptionEn: 'Popular horticulture crop requiring balanced moisture and protection from surface waterlogging.',
    descriptionBn: 'উচ্চ মূল্যের সবজি; পরিমিত আর্দ্রতা ও সুনিষ্কাশিত মাটির প্রয়োজন।',
  },
  cotton: {
    key: 'cotton',
    nameEn: 'Cotton',
    nameBn: 'তুলা',
    seasonEn: 'All Season',
    seasonBn: 'সারাবছর',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Deep sandy loam with good aeration',
    soilPreferenceBn: 'গভীর ও ঝুরঝুরে দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Deep',
    rootDepthBn: 'গভীর',
    lstTolerance: '22°C – 36°C',
    descriptionEn: 'Cash fiber crop grown in specific Barind or highland pockets of Bangladesh.',
    descriptionBn: 'বাণিজ্যিক আঁশ ফসল; মাঝারি আর্দ্রতা ও গভীর মাটিতে চাষযোগ্য।',
  },
  sugarcane: {
    key: 'sugarcane',
    nameEn: 'Sugarcane',
    nameBn: 'আখ',
    seasonEn: 'All Season',
    seasonBn: 'সারাবছর',
    waterDemand: 'High',
    waterDemandBn: 'উচ্চ',
    soilPreferenceEn: 'Deep fertile loam to clay loam',
    soilPreferenceBn: 'গভীর ও উর্বর দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Deep',
    rootDepthBn: 'গভীর',
    lstTolerance: '24°C – 38°C',
    descriptionEn: 'Long-duration (10–12 months) cash crop requiring substantial root zone soil moisture.',
    descriptionBn: 'দীর্ঘমেয়াদী (১০-১২ মাস) বাণিজ্যিক ফসল; প্রচুর পুষ্টি ও মাটির আর্দ্রতা প্রয়োজন।',
  },
  fruits: {
    key: 'fruits',
    nameEn: 'Seasonal Fruits',
    nameBn: 'মৌসুমি ফলমূল',
    seasonEn: 'All Season',
    seasonBn: 'সারাবছর',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Loam to sandy loam with good depth',
    soilPreferenceBn: 'গভীর দোআঁশ বা বেলে দোআঁশ মাটি',
    nitrogenFixer: false,
    rootDepth: 'Deep',
    rootDepthBn: 'গভীর',
    lstTolerance: '20°C – 35°C',
    descriptionEn: 'Watermelon, banana, papaya suited to varied agro-ecological microclimates.',
    descriptionBn: 'তরমুজ, কলা, পেঁপে ইত্যাদি ফলমূল; স্থানীয় আবহাওয়ায় উপযোগী।',
  },
  other: {
    key: 'other',
    nameEn: 'Other Local Crop',
    nameBn: 'অন্যান্য স্থানীয় ফসল',
    seasonEn: 'All Season',
    seasonBn: 'সারাবছর',
    waterDemand: 'Moderate',
    waterDemandBn: 'মাঝারি',
    soilPreferenceEn: 'Variable depending on variety',
    soilPreferenceBn: 'জাতভেদে ভিন্ন',
    nitrogenFixer: false,
    rootDepth: 'Medium',
    rootDepthBn: 'মাঝারি',
    lstTolerance: 'Variable',
    descriptionEn: 'Local varieties adapted to micro-climatic niches in Bangladesh.',
    descriptionBn: 'স্থানীয় কৃষকদের চিরাচরিত বিভিন্ন জাতের শস্য।',
  },
};

/**
 * Common crop rotation presets in Bangladesh agricultural research (BARI/BRRI)
 */
export const PRESET_STRATEGIES: {
  id: string;
  titleEn: string;
  titleBn: string;
  crops: CropKey[];
  descriptionEn: string;
  descriptionBn: string;
}[] = [
  {
    id: 'strategy_legume_break',
    titleEn: 'Rice → Legume → Rice (Soil Rest & Replenish)',
    titleBn: 'ধান → ডালশস্য → ধান (মাটির বিশ্রাম ও পুষ্টি পুনরুদ্ধার)',
    crops: ['rice_aman', 'legume_lentil', 'rice_aus'],
    descriptionEn: 'Interspersing a nitrogen-fixing pulse (Lentil/Mungbean) between rice cycles adds organic nitrogen and breaks pest cycles.',
    descriptionBn: 'ধানের মাঝে ডাল জাতীয় ফসল অন্তর্ভুক্ত করলে নাইট্রোজেন সংবদ্ধন ঘটে এবং মাটির রোগজীবাণুর বিস্তার হ্রাস পায়।',
  },
  {
    id: 'strategy_cereal_rotation',
    titleEn: 'Rice → Maize → Rice (Biomass & Deep Rooting)',
    titleBn: 'ধান → ভুট্টা → ধান (বায়োমাস ও গভীর শিকড়)',
    crops: ['rice_aman', 'maize', 'rice_aus'],
    descriptionEn: 'Rotating rice with deep-rooting maize helps aerate the soil and diversify cereal revenue, though water and nutrients must be monitored.',
    descriptionBn: 'মাটির তলদেশে শিকড় প্রবেশ করিয়ে মাটির বায়ু চলাচল বাড়ায় এবং আয়ের বৈচিত্র্য এনে দেয়।',
  },
  {
    id: 'strategy_oilseed_quick',
    titleEn: 'T. Aman → Mustard → Boro Rice (Intensive Triple Crop)',
    titleBn: 'আমন → সরিষা → বোরো (নিবিড় তিন-ফসলি ধারা)',
    crops: ['rice_aman', 'mustard', 'rice_boro'],
    descriptionEn: 'A high-intensity cropping system common in central and northern Bangladesh, utilizing a fast short-season oilseed.',
    descriptionBn: 'স্বল্পমেয়াদী সরিষা যুক্ত করে ফসলের ঘনত্ব বৃদ্ধি ও অতিরিক্ত আয়ের সুযোগ তৈরি করে।',
  },
  {
    id: 'strategy_cash_potato',
    titleEn: 'T. Aman → Potato → Boro / Aus (High Cash Return)',
    titleBn: 'আমন → আলু → বোরো / আউশ (বাণিজ্যিক ফসল ধারা)',
    crops: ['rice_aman', 'potato', 'rice_aus'],
    descriptionEn: 'Popular in Rangpur, Bogura, and Munshiganj; incorporates a tuber cash crop between cereal seasons.',
    descriptionBn: 'উত্তরবঙ্গে বহুল প্রচলিত; লাভজনক কন্দজাতীয় ফসল হিসেবে আলুর সংযোজন ঘটে।',
  },
  {
    id: 'strategy_jute_organic',
    titleEn: 'Wheat → Jute → T. Aman (Green Biomass Cycle)',
    titleBn: 'গম → পাট → রোপা আমন (জৈব সার ও পাতা ঝরা ধারা)',
    crops: ['wheat', 'jute', 'rice_aman'],
    descriptionEn: 'Jute shed leaves add organic humus, creating a natural soil conditioning effect before monsoon rice.',
    descriptionBn: 'পাটের পাতা ঝরে মাটিতে প্রাকৃতিকভাবে সবুজ সার ও হিউমাস বৃদ্ধি পায়।',
  },
];

/**
 * Transparent, explainable strategy analysis adhering to NASA Space Apps decision-support principles.
 * NO claims of "guaranteed yield" or "best crop". Only exploratory considerations.
 */
export function analyzeRotationStrategy(
  cropsKeys: CropKey[],
  userSoil: SoilTypeKey,
  userWater: WaterAvailabilityKey,
  priorities: FarmerPriority[],
  nasaLST: number | null,
  nasaSoilMoisture: number | null
): StrategyAnalysis {
  const cropList = cropsKeys.map((k) => CROPS_CATALOG[k]);
  const sequenceText = cropList.map((c) => c.nameEn).join(' → ');

  // 1. Soil Health Evaluation
  const hasNitrogenFixer = cropList.some((c) => c.nitrogenFixer);
  const rootDepths = new Set(cropList.map((c) => c.rootDepth));
  const hasDeepRoot = rootDepths.has('Deep');
  const hasMultipleRootDepths = rootDepths.size >= 2;

  let soilScore = 50;
  if (hasNitrogenFixer) soilScore += 25;
  if (hasMultipleRootDepths) soilScore += 15;
  if (hasDeepRoot) soilScore += 10;
  soilScore = Math.min(100, soilScore);

  let soilEn = '';
  let soilBn = '';
  if (hasNitrogenFixer) {
    soilEn = 'Contains a biological nitrogen-fixing pulse. Nodulating Rhizobium bacteria can fix atmospheric nitrogen, potentially reducing synthetic urea requirements and supporting organic matter.';
    soilBn = 'বায়ুমণ্ডলীয় নাইট্রোজেন সংবদ্ধনকারী ডালশস্য অন্তর্ভুক্ত। এটি মাটির উর্বরতা বৃদ্ধি করতে পারে এবং রাসায়নিক সারের নির্ভরতা কমাতে সহায়ক হতে পারে।';
  } else if (hasMultipleRootDepths) {
    soilEn = 'Combines varied root depths (shallow and deep). This may extract nutrients from differing soil horizons and prevent hard-pan compaction.';
    soilBn = 'বিভিন্ন গভীরতার শিকড়যুক্ত শস্যের সমন্বয়। এটি মাটির বিভিন্ন স্তর থেকে পুষ্টি উপাদান গ্রহণে সাহায্য করতে পারে।';
  } else {
    soilEn = 'Consecutive uniform rooting profiles. Adding a deep-rooting or legume catch crop could be explored to diversify root zone activity.';
    soilBn = 'ধারাবাহিক একই ধরনের শিকড়যুক্ত ফসল। মাটির গভীরতায় পুষ্টির ভারসাম্যের জন্য ডাল বা গভীর শিকড়ের শস্য সংযোজনের কথা ভাবা যেতে পারে।';
  }

  // 2. Water Considerations
  const highWaterCrops = cropList.filter((c) => c.waterDemand === 'High').length;
  const lowWaterCrops = cropList.filter((c) => c.waterDemand === 'Low').length;

  let waterEn = '';
  let waterBn = '';
  if (highWaterCrops >= 2 && userWater === 'limited') {
    waterEn = 'Sequence includes multiple high-water-demanding crops (e.g. continuous flooded rice) while reported water availability is limited. Farmers may evaluate supplemental irrigation feasibility or alternate wetting and drying (AWD).';
    waterBn = 'পরপর একাধিক উচ্চ পানি চাহিদাসম্পন্ন ফসল রয়েছে, অথচ সংরক্ষিত পানি সীমিত। বিকল্প সেচ ব্যবস্থাপনা (AWD) অথবা স্বল্প পানি চাহিদার শস্য বিবেচনার সুযোগ রয়েছে।';
  } else if (lowWaterCrops >= 1) {
    waterEn = 'Includes at least one lower water demand crop, potentially buffering against seasonal dry spells or aquifer strain.';
    waterBn = 'অন্তত একটি কম পানি চাহিদার ফসল রয়েছে, যা শুষ্ক মৌসুমে ভূগর্ভস্থ পানির ওপর চাপ কমাতে সহায়ক হতে পারে।';
  } else {
    waterEn = 'Standard seasonal water utilization. Compare against historical local irrigation canal and groundwater access.';
    waterBn = 'স্বাভাবিক মৌসুমী পানি ব্যবহার। স্থানীয় ভূগর্ভস্থ বা সেচ ব্যবস্থার সাথে মিলিয়ে যাচাই করা ভালো।';
  }

  // 3. Rotation Diversity Index (0-100)
  const uniqueCropCount = new Set(cropsKeys).length;
  let diversityIndex = Math.round((uniqueCropCount / Math.max(1, cropsKeys.length)) * 70);
  if (hasNitrogenFixer) diversityIndex += 15;
  if (hasMultipleRootDepths) diversityIndex += 15;
  diversityIndex = Math.min(100, Math.max(20, diversityIndex));

  const diversityExplanationEn = `Diversity index is ${diversityIndex}/100 based on unique crop varieties (${uniqueCropCount}/${cropsKeys.length}), root architecture variability, and botanical classification balance.`;
  const diversityExplanationBn = `বৈচিত্র্য সূচক ${diversityIndex}/১০০; যা বিভিন্ন জাতের ফসল (${uniqueCropCount}/${cropsKeys.length}), শিকড়ের গভীরতা এবং পরিবারের ভিন্নতার ভিত্তিতে পরিমাপ করা হয়েছে।`;

  // 4. Climate Match (NASA Earth Observation context)
  let climateMatchEn = 'NASA satellite observations provide regional environmental context. ';
  let climateMatchBn = 'নাসার উপগ্রহ উপাত্ত আঞ্চলিক পরিবেশের সার্বিক অবস্থা নির্দেশ করে। ';
  if (nasaLST !== null) {
    climateMatchEn += `Recent NASA MODIS Land Surface Temperature is observed at ${nasaLST}°C. `;
    climateMatchBn += `নাসার MODIS থেকে প্রাপ্ত সাম্প্রতিক ভূমিপৃষ্ঠ তাপমাত্রা ${nasaLST}°C। `;
  }
  if (nasaSoilMoisture !== null) {
    const smPct = Math.round(nasaSoilMoisture * 100);
    climateMatchEn += `NASA SMAP satellite regional soil wetness index is ${smPct}%. `;
    climateMatchBn += `নাসার SMAP উপগ্রহ নির্দেশিত আঞ্চলিক মাটির আর্দ্রতা সূচক ${smPct}%। `;
  }
  climateMatchEn += 'Evaluate whether current seasonal conditions align with planting windows.';
  climateMatchBn += 'বর্তমান মৌসুমী তাপমাত্রা ও আর্দ্রতার সাথে বপন বা রোপণের সময়সূচি মিলিয়ে দেখা যেতে পারে।';

  // 5. Potential Considerations (Transparent bullet points)
  const considerationsEn: string[] = [];
  const considerationsBn: string[] = [];

  if (hasNitrogenFixer) {
    considerationsEn.push('Potential consideration: Biological nitrogen fixation may enrich the soil for the subsequent cereal crop.');
    considerationsBn.push('সম্ভাব্য পর্যবেক্ষণ: ডালশস্যের মাধ্যমে মাটিতে জৈব নাইট্রোজেন বৃদ্ধি পেতে পারে, যা পরবর্তী খাদ্যশস্যের পুষ্টিতে সহায়ক হতে পারে।');
  } else {
    considerationsEn.push('Potential consideration: Consider exploring the addition of a legume catch-crop if soil organic enhancement is desired.');
    considerationsBn.push('সম্ভাব্য পর্যবেক্ষণ: মাটির স্বাস্থ্য সুরক্ষায় মধ্যবর্তী সময়ে কোনো ডালজাতীয় ফসল যুক্ত করার কথা বিবেচনা করতে পারেন।');
  }

  if (cropsKeys.filter((k) => k.startsWith('rice')).length > 2) {
    considerationsEn.push('Potential consideration: Continuous rice monoculture can lead to soil compaction and disease recurrence over multi-year horizons.');
    considerationsBn.push('সম্ভাব্য পর্যবেক্ষণ: ক্রমাগত কেবল ধান চাষ করলে মাটিতে পুষ্টি উপাদানের অসমতা এবং রোগজীবাণুর বিস্তার ঘটতে পারে।');
  }

  if (userSoil === 'sandy' && cropList.some((c) => c.waterDemand === 'High')) {
    considerationsEn.push('Potential consideration: Sandy soils exhibit rapid drainage; high-water crops may require frequent light irrigation or organic mulching.');
    considerationsBn.push('সম্ভাব্য পর্যবেক্ষণ: বেলে মাটিতে পানি দ্রুত নিষ্কাশিত হয়; ফলে উচ্চ পানি চাহিদার ফসলে ঘন ঘন হালকা সেচ প্রয়োজন হতে পারে।');
  }

  if (priorities.includes('water_saving') && lowWaterCrops === 0) {
    considerationsEn.push('Potential consideration: If water conservation is your primary objective, exploring shorter-duration oilseed or pulse crops may be advantageous.');
    considerationsBn.push('সম্ভাব্য পর্যবেক্ষণ: পানি সাশ্রয় যদি আপনার প্রধান লক্ষ্য হয়, তবে স্বল্প মেয়াদী সরিষা বা ডাল অন্তর্ভুক্ত করা যেতে পারে।');
  }

  // 6. Priority Alignment Score (Explainable, Not Arbitrary)
  let priorityScore = 60;
  if (priorities.includes('soil_health') && hasNitrogenFixer) priorityScore += 15;
  if (priorities.includes('water_saving') && lowWaterCrops >= 1) priorityScore += 15;
  if (priorities.includes('crop_rotation') && uniqueCropCount >= 2) priorityScore += 10;
  priorityScore = Math.min(100, Math.max(30, priorityScore));

  return {
    strategyId: cropsKeys.join('_'),
    sequenceText,
    crops: cropList,
    waterConsiderationEn: waterEn,
    waterConsiderationBn: waterBn,
    soilConsiderationEn: soilEn,
    soilConsiderationBn: soilBn,
    diversityIndex,
    diversityExplanationEn,
    diversityExplanationBn,
    climateMatchEn,
    climateMatchBn,
    potentialConsiderationsEn: considerationsEn,
    potentialConsiderationsBn: considerationsBn,
    priorityAlignmentScore: priorityScore,
    priorityAlignmentDetailsEn: `Calculated from rotational diversity (${diversityIndex}%), biological nitrogen input, water demand balancing, and your selected priorities.`,
    priorityAlignmentDetailsBn: `ফসলের বৈচিত্র্য (${diversityIndex}%), জৈব নাইট্রোজেন সংযোজন, পানির চাহিদা এবং আপনার নির্বাচিত অগ্রাধিকারের ভিত্তিতে নিরূপিত।`,
    methodologyNotesEn: 'Methodology: Assesses botanical family diversity, rooting depth variation, nitrogen fixation capability, and alignment with farmer-reported water/soil conditions and NASA satellite context.',
    methodologyNotesBn: 'পদ্ধতি: ফসলের পরিবার বৈচিত্র্য, শিকড়ের গভীরতা, নাইট্রোজেন ধারণক্ষমতা এবং কৃষকের মাটির তথ্যের সাথে নাসার উপগ্রহ পর্যবেক্ষণের ভারসাম্য বিশ্লেষণ।',
    limitationsEn: 'Decision-Support Limitations: TerraShift does not guarantee crop yields or determine final farming choices. Micro-climate, seed quality, and pest outbreaks require on-the-ground management.',
    limitationsBn: 'সীমাবদ্ধতা: এই বিশ্লেষণ কোনো নিশ্চিত ফলন বা চূড়ান্ত সিদ্ধান্তের নিশ্চয়তা প্রদান করে না। স্থানীয় আবহাওয়া, বীজের মান ও পোকা-মাকড় ব্যবস্থাপনার বিষয়টি কৃষকের নিজস্ব সিদ্ধান্তের ওপর নির্ভরশীল।',
  };
}

