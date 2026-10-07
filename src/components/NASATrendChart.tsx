import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NASATrendChart: React.FC = () => {
  const { trendData, trendLoading, trendRange, setTrendRange, t } = useApp();
  const [activeMetric, setActiveMetric] = useState<'lst' | 'precip' | 'soil'>('lst');

  const periods: { key: '7d' | '30d' | '3m' | '6m' | '1y'; label: string }[] = [
    { key: '7d', label: t.nasaInsights.periods['7d'] },
    { key: '30d', label: t.nasaInsights.periods['30d'] },
    { key: '3m', label: t.nasaInsights.periods['3m'] },
    { key: '6m', label: t.nasaInsights.periods['6m'] },
    { key: '1y', label: t.nasaInsights.periods['1y'] },
  ];

  const hasData = trendData && trendData.points && trendData.points.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-soft">
      {/* Header with Title and Period Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              {t.nasaInsights.trendsTitle}
            </h3>
          </div>
          <p className="text-xs text-stone-700 mt-0.5">
            {t.nasaInsights.trendsSubtitle}
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl gap-1 self-start sm:self-auto overflow-x-auto">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setTrendRange(p.key)}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all whitespace-nowrap ${
                trendRange === p.key
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-stone-100 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveMetric('lst')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeMetric === 'lst'
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          <span>🌡️ Land Surface Temperature (LST °C)</span>
        </button>
        <button
          onClick={() => setActiveMetric('precip')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeMetric === 'precip'
              ? 'bg-sky-100 text-sky-900 border border-sky-300'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          <span>🌧️ GPM Precipitation (mm/day)</span>
        </button>
        <button
          onClick={() => setActiveMetric('soil')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeMetric === 'soil'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          <span>💧 SMAP Soil Moisture (Wetness 0-1)</span>
        </button>
      </div>

      {/* Chart Canvas Area */}
      {trendLoading ? (
        <div className="h-64 flex flex-col items-center justify-center text-stone-400 gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-700" />
          <span className="text-xs font-medium text-stone-600">Retrieving official historical NASA time series...</span>
        </div>
      ) : !hasData ? (
        <div className="h-64 flex flex-col items-center justify-center text-stone-500 gap-2 bg-stone-50/60 rounded-xl border border-dashed border-stone-200 p-6 text-center">
          <AlertCircle className="w-8 h-8 text-amber-500" />
          <p className="text-sm font-semibold text-stone-700">
            {t.nasaInsights.noTrend}
          </p>
          <p className="text-xs text-stone-600 max-w-sm">
            Satellite archival processing may have gaps or latency for this selected time window.
          </p>
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData.points}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lstGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#FF8F00" stopOpacity={0.3} />
                  <stop offset="95%" stop-color="#FF8F00" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#0284C7" stopOpacity={0.3} />
                  <stop offset="95%" stop-color="#0284C7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="soilGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#16A34A" stopOpacity={0.3} />
                  <stop offset="95%" stop-color="#16A34A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#6B7280' }}
                tickFormatter={(val) => {
                  if (!val) return '';
                  const parts = val.split('-');
                  return `${parts[1]}/${parts[2]}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#6B7280' }}
                domain={activeMetric === 'soil' ? [0, 1] : ['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '0.75rem',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [
                  value !== null && value !== undefined
                    ? `${Number(value).toFixed(2)} ${
                        activeMetric === 'lst'
                          ? '°C'
                          : activeMetric === 'precip'
                          ? 'mm/day'
                          : 'fraction'
                      }`
                    : 'N/A',
                  activeMetric === 'lst'
                    ? 'Land Surface Temperature'
                    : activeMetric === 'precip'
                    ? 'Precipitation'
                    : 'Soil Moisture',
                ]}
                labelFormatter={(label) => `NASA Observation: ${label}`}
              />

              {activeMetric === 'lst' && (
                <Area
                  type="monotone"
                  dataKey="landSurfaceTemperature"
                  name="Land Surface Temp"
                  stroke="#FF8F00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#lstGradient)"
                  connectNulls={false}
                />
              )}
              {activeMetric === 'precip' && (
                <Area
                  type="monotone"
                  dataKey="precipitation"
                  name="Precipitation"
                  stroke="#0284C7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#precipGradient)"
                  connectNulls={false}
                />
              )}
              {activeMetric === 'soil' && (
                <Area
                  type="monotone"
                  dataKey="soilMoisture"
                  name="Soil Moisture"
                  stroke="#16A34A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#soilGradient)"
                  connectNulls={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Observation count and traceability note */}
      {hasData && (
        <div className="mt-3 flex items-center justify-between text-[11px] text-stone-600 border-t border-stone-100 pt-2">
          <span>
            {trendData.availableCount} verified daily observations in time series
          </span>
          <span className="font-mono text-[10px]">
            Source: NASA POWER / MERRA-2 & MODIS
          </span>
        </div>
      )}
    </div>
  );
};

