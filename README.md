# 🌱 TerraShift

> **"From Space Data to Smarter Farming Decisions"**  
> *মহাকাশের উপাত্ত থেকে দূরদর্শী কৃষি সিদ্ধান্ত*

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-0B3D91.svg)](https://www.spaceappschallenge.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-2E7D32.svg)](LICENSE)
[![Target: Bangladesh](https://img.shields.io/badge/Region-Bangladesh%20Agriculture-4E342E.svg)](#target-region--bangladesh)
[![Data: Real NASA Observations](https://img.shields.io/badge/NASA%20Data-Verified%20Real-0B3D91.svg)](#official-nasa-earth-observation-sources)
[![Language: Bilingual](https://img.shields.io/badge/Language-বাংলা%20%7C%20English-2E7D32.svg)](#bilingual-experience)

---

## 📌 Project Overview

**TerraShift** is a Bangladesh-focused agricultural decision-support application built for the **NASA Space Apps Challenge**. It bridges official **NASA Earth Observation (EO) satellite data** with hyper-local Bangladeshi farming knowledge, farmer-reported plot characteristics, and multi-season crop rotation exploration.

### 🛡️ Fundamental Decision-Support Principle
**TerraShift is strictly a DECISION-SUPPORT TOOL, NOT an automated farming dictator.**  
The farmer is always the ultimate decision-maker. TerraShift explicitly avoids deterministic, misleading claims such as *"Best crop"*, *"Guaranteed yield"*, or *"You must plant this"*. Instead, the platform provides humble, scientifically grounded exploration:
- *"NASA observation shows..."*
- *"Recent observations indicate..."*
- *"Potential consideration..."*
- *"Explore whether..."*
- *"Based on available information..."*

---

## 🚨 The Problem

1. **Information Disconnect**: Bangladeshi smallholder farmers make cropping decisions based largely on tradition or recent local market prices, without accessible insights into macro-environmental trends observed by Earth-orbiting satellites.
2. **Soil Depletion & Monoculture**: Continuous intensive rice monoculture (e.g., Boro–Aman continuous cycles) leads to subsoil plow-pan compaction, micronutrient depletion, and recurring pest-pathogen complexes.
3. **Misleading Digital Agriculture**: Many farming apps overpromise "guaranteed yields" or fabricate "AI predictions" using synthetic or mock data, risking farmer livelihoods during climate anomalies.

---

## 💡 The Solution

TerraShift provides an end-to-end, trustworthy pipeline:
1. **Official NASA Satellite Data**: Real-time and near-real-time ingestion of MODIS Land Surface Temperature (LST), GPM IMERG Precipitation, and SMAP Soil Moisture.
2. **Bangladesh Geographic Resolution**: Interactive nationwide Leaflet map supporting all 64 districts, upazilas, agro-ecological zones (AEZ), and custom GPS coordinates within Bangladesh boundaries (`20.57°N–26.63°N, 88.01°E–92.67°E`).
3. **Farmer Contextual Grounding**: Captures farmer-observed soil texture (clearly demarcated as user input, never claimed as satellite measurement), current crop, and water availability.
4. **Crop Rotation Strategy Explorer**: Enables farmers to construct, reorder, and compare multi-season cropping sequences (e.g., *Rice → Legume → Rice* vs. *Rice → Maize → Rice*), evaluating biological nitrogen fixation, root architecture variations, and water demand tradeoffs.
5. **Full Scientific Transparency**: Every metric card features metadata traceability, observation dates, spatial resolutions, and direct `[View NASA Data Source]` links opening official NASA mission archives.

---

## 🛰️ Official NASA Earth Observation Sources

TerraShift enforces an **absolute Zero-Fake-Data policy**. No random numbers, placeholders, or fabricated charts exist in the application. When satellite data is pending ingestion latency or service downtime, TerraShift explicitly states *"NASA data is currently unavailable"* with retry capabilities or labels *"Last available NASA observation"* with its exact historical timestamp.

### 1. Land Surface Temperature (LST)
- **NASA Mission**: NASA Earth Observing System (EOS) Aqua
- **Product**: MODIS/Aqua Land Surface Temperature/Emissivity Daily L3 Global 1km SIN Grid V061 (`MYD11A1`)
- **Spatial Resolution**: 1 km per pixel
- **Scientific Notice**: LST measures the radiative skin temperature of the land surface observed by satellite radiometers. **LST is distinct from 2-meter ambient air temperature.**
- **Official NASA URLs**:
  - [NASA Open Data Portal — MYD11A1 V6.1](https://data.nasa.gov/dataset/modis-aqua-land-surface-temperature-emissivity-daily-l3-global-1km-sin-grid-v061-14a0b)
  - [NASA MODIS LST Official Overview](https://modis.gsfc.nasa.gov/data/dataprod/mod11.php)
  - [NASA LAADS DAAC — MYD11A1 Product Page](https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/products/MYD11A1)

### 2. Precipitation
- **NASA Mission**: NASA Global Precipitation Measurement (GPM) Constellation
- **Product**: NASA GPM Integrated Multi-satellitE Retrievals for GPM (IMERG) Daily (`GPM_3IMERGDF` / `GPM_3IMERGDL`)
- **Spatial Resolution**: 0.1° (~10 km)
- **Scientific Notice**: IMERG provides unified precipitation estimates by merging passive microwave retrievals from the international GPM constellation with geostationary infrared observations.
- **Official NASA URLs**:
  - [NASA GPM IMERG Mission Portal](https://gpm.nasa.gov/data/imerg)
  - [NASA Earthdata GPM IMERG V07](https://www.earthdata.nasa.gov/learn/articles/gpm-imerg-v07)

### 3. Soil Moisture
- **NASA Mission**: NASA Soil Moisture Active Passive (SMAP)
- **Product**: NASA SMAP L3/L4 Global Surface (0–5 cm) & Root-Zone (0–100 cm) Soil Moisture (`SPL3SMP_E` / `SPL4SMGP`)
- **Spatial Resolution**: 9 km / 36 km footprint
- **Scientific Notice**: Satellite soil moisture represents the integrated spatial average across the satellite observation footprint (~9–36 km). **It does not represent micro-scale variation within an individual farm field parcel.**
- **Official NASA URLs**:
  - [NASA Worldview Interactive Explorer](https://worldview.earthdata.nasa.gov/)
  - [NASA Earthdata SMAP Sensor Overview](https://www.earthdata.nasa.gov/sensors/smap)
  - [NASA NSIDC DAAC SMAP Data Collection](https://nsidc.org/data/smap)

### 4. NASA Agroclimatology & Metadata Infrastructure
- **NASA POWER API**: Prediction Of Worldwide Energy Resources (NASA Langley Research Center) provides point-specific daily solar and meteorological observations directly for Bangladesh lat/lon coordinates.
  - [NASA POWER Project](https://power.larc.nasa.gov/)
- **NASA CMR (Common Metadata Repository)**: Live granule querying for MODIS Aqua, GPM, and SMAP passes over Bangladesh.
  - [NASA Earthdata CMR](https://cmr.earthdata.nasa.gov/)

---

## 🏗️ Technical Architecture

TerraShift employs a clean, modular multi-tier architecture isolating NASA data access, validation, caching, and user presentation:

```
┌─────────────────────────────────────────────────────────────────┐
│                       TerraShift Frontend                       │
│     React 19 + TypeScript + Vite + Tailwind CSS + Leaflet       │
│                                                                 │
│   ├── Screens 01–13 (Language, Splash, Onboarding, Location,    │
│   │                  Farm Info, Priorities, NASA Insights,      │
│   │                  Dashboard, Scoring, Explorer, Compare,     │
│   │                  Summary, Profile & Settings)               │
│   ├── Reusable NASA Service Layer (/services/nasa/*)            │
│   └── Bilingual i18n Engine (বাংলা & English)                   │
└───────────────────────────────▲─────────────────────────────────┘
                                │ JSON REST API (/api/nasa/*)
┌───────────────────────────────▼─────────────────────────────────┐
│                       TerraShift Backend                        │
│                Node.js + Express 5 + TypeScript                 │
│                                                                 │
│   ├── Geo Boundary Validator (Bangladesh 20.57–26.63°N)         │
│   ├── Resilient Cache & Observation History (cacheService)      │
│   ├── Quality Flag & Fill Value Validator (-999 removal)        │
│   └── NASA Client Gateway (nasaClient.ts)                       │
└──────────────▲─────────────────────────────────▲────────────────┘
               │ HTTPS Requests                  │ Metadata Queries
┌──────────────▼─────────────────┐ ┌─────────────▼────────────────┐
│        NASA POWER API          │ │        NASA CMR API          │
│  Agroclimatology Point Engine  │ │  Common Metadata Repository  │
│  (MODIS LST, GPM, Soil Wetness)│ │  (Granule validation)        │
└────────────────────────────────┘ └──────────────────────────────┘
```

### Folder Structure
```
/
├── backend/
│   ├── controllers/
│   ├── routes/
│   │   └── nasaRoutes.ts         # Endpoints for observations, timeseries, metadata
│   ├── services/
│   │   ├── cacheService.ts       # Caching with observation timestamps
│   │   └── nasaClient.ts         # Live NASA POWER and CMR integration
│   ├── utils/
│   │   ├── geoUtils.ts           # Bangladesh spatial bounds validation
│   │   └── validation.ts         # Numeric & quality flag sanitation
│   ├── server.ts                 # Express full-stack application server
│   └── tsconfig.json             # Backend TypeScript configuration
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx         # Mobile-first navigation
│   │   ├── DisclaimerBanner.tsx  # Decision-support notice
│   │   ├── LeafletMap.tsx        # Interactive Bangladesh map
│   │   ├── Navbar.tsx            # Header with language & status toggles
│   │   ├── NASADataCard.tsx      # Comprehensive NASA observation cards
│   │   ├── NASAMetadataModal.tsx # Full traceability modal
│   │   ├── NASATrendChart.tsx    # Recharts 7D, 30D, 3M, 6M, 1Y time series
│   │   └── ScoreMethodologyModal.tsx # Explainable scoring math
│   ├── context/
│   │   └── AppContext.tsx        # Central application state
│   ├── data/
│   │   ├── bangladeshGeo.ts      # 8 Divisions, 64 Districts, Upazilas, AEZ
│   │   └── crops.ts              # Crops catalog & rotation analysis logic
│   ├── i18n/
│   │   └── translations.ts       # Full English and Bengali dictionaries
│   ├── pages/
│   │   ├── Screen01Language.tsx
│   │   ├── Screen02Splash.tsx
│   │   ├── Screen03Onboarding.tsx
│   │   ├── Screen04Location.tsx
│   │   ├── Screen05FarmInfo.tsx
│   │   ├── Screen06Priorities.tsx
│   │   ├── Screen07NASAInsights.tsx
│   │   ├── Screen08Dashboard.tsx
│   │   ├── Screen09RotationScore.tsx
│   │   ├── Screen10RotationExplorer.tsx
│   │   ├── Screen11RotationDetails.tsx
│   │   ├── Screen12CompareStrategies.tsx
│   │   ├── Screen13FinalSummary.tsx
│   │   └── ProfileSettings.tsx
│   ├── services/
│   │   └── nasa/
│   │       ├── environmentalService.ts
│   │       ├── locationService.ts
│   │       ├── nasaMetadata.ts
│   │       ├── precipitationService.ts
│   │       ├── soilMoistureService.ts
│   │       └── temperatureService.ts
│   ├── types/
│   │   └── index.ts              # TypeScript domain models
│   ├── App.tsx                   # Main screen router
│   ├── index.css                 # Tailwind CSS directives
│   └── main.tsx                  # React DOM mount point
├── public/                       # Static public assets (SVGs, icons)
├── .env.example                  # Environment configuration template
├── index.html                    # Root HTML with Google Fonts & Leaflet
├── package.json                  # Scripts and dependencies
├── tailwind.config.js            # Design tokens & color system
└── vite.config.ts                # Vite build and backend proxy configuration
```

---

## 🌐 Target Region — Bangladesh

TerraShift is **strictly dedicated to Bangladesh**:
- **Geographic Bounding Box**: Latitude `20.57°N` to `26.63°N`, Longitude `88.01°E` to `92.67°E`.
- **Administrative Support**:
  - All **8 Divisions**: Rangpur, Rajshahi, Dhaka, Chattogram, Khulna, Barishal, Sylhet, Mymensingh.
  - All **64 Districts** with precise centroid coordinates, divisions, and Agro-Ecological Zones (AEZ).
  - Key **Upazilas/Thanas** across agricultural production hubs.
- **Interactive Map**: Built with Leaflet, restricting pan bounds to Bangladesh, supporting click-to-pinpoint coordinate selection, search with instant autocomplete, and optional device GPS with boundary validation.
- **Demo Preset Notice**: Rangpur is provided as a sample preset for judges, but **Rangpur is never permanently selected**. Any coordinate within Bangladesh can be chosen.

---

## 🗣️ Bilingual Experience (বাংলা ও English)

TerraShift is fully bilingual across every interface component:
- **Typography**: `Noto Sans Bengali` for Bengali and `Inter / Roboto` for English.
- **Scope of Translation**:
  - Navigation, top bar, and bottom tabs
  - NASA data cards, product titles, and units
  - Error messages, retry states, and empty states
  - Crop catalog, season descriptions (Rabi, Kharif-1, Kharif-2), and rotational tradeoffs
  - Scientific disclaimers and methodology explanations

---

## 📊 Rotational Balance Index — Explainable Methodology

In compliance with NASA Space Apps standards, TerraShift **never outputs black-box or random scores**. If the farmer has not provided sufficient information (soil type, priorities, or fewer than 2 crops), the application displays:  
> **"Not enough information yet to calculate index."**

When calculated, the index uses an open deterministic model (100 Points Total):
1. **Crop Diversity & Botanical Family Rotation (30%)**: Evaluates family diversity (Poaceae vs. Fabaceae vs. Solanaceae) using a normalized Shannon diversity index to break continuous pathogen/pest cycles.
2. **Biological Nitrogen Fixation & Soil Resting (30%)**: Awards points for leguminous pulses (Lentils, Mungbeans) that host Rhizobium bacteria for atmospheric nitrogen fixation.
3. **Root Architecture Variability (20%)**: Alternates shallow fibrous root systems with deep taproot crops (Maize, Jute, Cotton) to aerate the subsoil and optimize multi-layer nutrient uptake.
4. **Water Demand vs. Availability & SMAP Alignment (20%)**: Compares crop transpiration demands against farmer-reported irrigation access and NASA SMAP regional soil moisture observations.

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended, tested on Node v24)
- `npm` (v9+)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/terrashift.git
cd terrashift
```

### 2. Environment Configuration
Copy the example environment configuration:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Review the `.env` variables:
```env
PORT=3001
NODE_ENV=development
VITE_API_URL=http://localhost:3001/api
NASA_POWER_BASE_URL=https://power.larc.nasa.gov/api/temporal/daily/point
NASA_CMR_BASE_URL=https://cmr.earthdata.nasa.gov/search/granules.json
NASA_CACHE_TTL_MINUTES=60
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run in Development Mode
Launches both the Express backend on port `3001` and the Vite frontend on port `5173` concurrently:
```bash
npm run dev
```
Open your browser to: `http://localhost:5173`

### 5. Build for Production
Compiles the frontend assets into `dist/`:
```bash
npm run build
```

### 7. Run as a Native Mobile Android App (Capacitor)
TerraShift includes a full native **Android Studio project** in the `/android` directory:

```bash
# Build the web bundle and sync native Android project assets
npm run build:mobile

# Open directly in Android Studio to build APK or run on device/emulator
npm run open:android
```
In Android Studio:
- Select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate the installable Android `.apk`.
- Or click **Run 'app'** to launch directly on a connected Android phone or Android Virtual Device (AVD).

### 8. Run as a Progressive Web App (PWA / Home Screen App)
TerraShift includes a Web App Manifest (`manifest.json`) and Service Worker (`sw.js`).
- Open `http://localhost:3001` or your deployed URL on any mobile browser (Chrome/Edge/Safari).
- Tap the **"Install Mobile App"** button at the top, or select **Menu > "Install App" / "Add to Home Screen"**.
- TerraShift launches full-screen in standalone native app mode without browser URL bars!

---

## 🧪 Verification & Demo Walkthrough

Judges can execute the complete end-to-end demo flow:
1. **Launch & Language Selection**: Select **বাংলা** or **English**.
2. **Splash & Onboarding**: Explore the three introductory slides explaining NASA Earth observation data and decision-support boundaries.
3. **Location Selection**: Select any Bangladesh district (e.g. Rangpur, Bogura, Dinajpur) or click directly on the interactive Leaflet map.
4. **Farm Information**: Enter current crop (e.g. *T. Aman Rice*), farmer-reported soil type (*Loamy*), and irrigation availability (*Available*).
5. **Farmer Priorities**: Select priorities such as *Soil Health*, *Water Saving*, and *Crop Rotation*.
6. **NASA Environmental Insights**:
   - Inspect **Land Surface Temperature** (MODIS/Aqua MYD11A1 V6.1, 1 km).
   - Inspect **Precipitation** (NASA GPM IMERG Daily, 0.1°).
   - Inspect **Soil Moisture** (NASA SMAP L3/L4, ~9–36 km footprint).
   - Click `[View NASA Data Source]` on any card to open the official NASA product page.
   - Switch between 7D, 30D, 3M, 6M, and 1Y historical trend charts.
7. **Farm Dashboard**: Review the combined overview with real trend delta indicators.
8. **Crop Rotation Explorer**:
   - Load or build Strategy A: `Rice → Legume → Rice`
   - Compare with Strategy B: `Rice → Maize → Rice`
9. **Strategy Comparison**: Compare water utilization, soil nitrogen enrichment, diversity indices, and climate fit side-by-side.
10. **Final Summary**: Review the printable synthesis report and official NASA data sources directory.

---

## ⚠️ Known Limitations & Future Roadmap

### Current Scientific Limitations
- **Satellite Footprint Resolution**: NASA SMAP soil moisture (~9–36 km) and GPM IMERG (~10 km) observe regional averages rather than parcel-level field boundaries.
- **Satellite Processing Latency**: NASA near-real-time observations exhibit a standard 2-to-3 day pipeline processing latency.
- **On-the-Ground Agronomy**: Satellite data cannot measure microscopic soil chemistry (soil pH, available N-P-K concentrations) or sudden pest infestations.

### Future Roadmap
- Integration with NASA AppEEARS API for custom polygon geospatial clipping.
- Collaboration with the Bangladesh Department of Agricultural Extension (DAE) for hyper-local soil laboratory report ingestion.
- SMS / USSD offline gateway for farmers with non-smartphones.

---

## 📜 Scientific Rules & Integrity Pledge

1. **Land Surface Temperature ≠ Air Temperature**: LST is the radiative skin temperature of the land surface; it is never labeled as ambient air temperature.
2. **User Input Demarcation**: Soil texture is farmer-reported; it is never claimed as a NASA satellite observation.
3. **Regional Representation**: Satellite soil moisture is clearly communicated as a regional average.
4. **No Prescriptive Mandates**: Strategies are presented for exploration; no guaranteed yields or mandatory crops are claimed.
5. **Full Traceability**: Every observation is verified and linked to its official NASA source.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

Developed for the **NASA Space Apps Challenge 2026**.

