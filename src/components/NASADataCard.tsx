import React, { useState } from 'react';
import { ExternalLink, Calendar, Layers, Clock, Info, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NASADataCardProps {
  type: 'lst' | 'precipitation' | 'soil_moisture';
  title: string;
  value: number | null;
  unit: string;
  observationDate: string;
  product: string;
  mission: string;
  variable: string;
  spatialResolution: string;
  source: string;
  sourceUrl: string;
  docUrl?: string;
  granuleId?: string;
  scientificNote: string;
  isCached?: boolean;
  retrievalTimestamp?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const NASADataCard: React.FC<NASADataCardProps> = ({
  type,
  title,
  value,
  unit,
  observationDate,
  product,
  mission,
  variable,
  spatialResolution,
  source,
  sourceUrl,
  docUrl,
  granuleId,
  scientificNote,
  isCached = false,
  retrievalTimestamp,
  loading = false,
  error = null,
  onRetry,
}) => {
  const { t, units } = useApp();
  const [showMetadata, setShowMetadata] = useState(false);

  // Unit conversion if imperial selected
  let displayValue: string = value !== null ? value.toFixed(1) : '--';
  let displayUnit: string = unit;

  if (value !== null) {
    if (type === 'lst' && units === 'imperial') {
      const fahrenheit = (value * 9) / 5 + 32;
      displayValue = fahrenheit.toFixed(1);
      displayUnit = '°F';
    } else if (type === 'precipitation' && units === 'imperial') {
      const inches = value * 0.0393701;
      displayValue = inches.toFixed(2);
      displayUnit = 'in/day';
    } else if (type === 'soil_moisture') {
      // Display both fraction and percentage
      const pct = Math.round(value * 100);
      displayValue = `${value.toFixed(2)} (${pct}%)`;
      displayUnit = 'relative wetness';
    }
  }

  // Card theme styling
  const getTheme = () => {
    switch (type) {
      case 'lst':
        return {
          icon: '🌡️',
          border: 'border-amber-200',
          bgHeader: 'bg-gradient-to-r from-amber-50 to-orange-50',
          accent: 'text-amber-700',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          badgeText: 'MODIS LST (MYD11A1)',
        };
      case 'precipitation':
        return {
          icon: '🌧️',
          border: 'border-sky-200',
          bgHeader: 'bg-gradient-to-r from-sky-50 to-blue-50',
          accent: 'text-sky-700',
          badge: 'bg-sky-100 text-sky-800 border-sky-300',
          badgeText: 'GPM IMERG',
        };
      case 'soil_moisture':
        return {
          icon: '💧',
          border: 'border-emerald-200',
          bgHeader: 'bg-gradient-to-r from-emerald-50 to-teal-50',
          accent: 'text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          badgeText: 'NASA SMAP L3/L4',
        };
    }
  };

  const theme = getTheme();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-soft animate-pulse">
        <div className="h-4 bg-stone-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-stone-100 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-stone-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-stone-100 rounded w-2/3"></div>
      </div>
    );
  }

  if (error || value === null) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-soft">
        <div className="flex items-center gap-2 text-rose-700 mb-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <h4 className="font-semibold text-sm">{title}</h4>
        </div>
        <p className="text-xs text-rose-600 mb-4">
          {t.nasaInsights.unavailableTitle}. No valid satellite observation could be retrieved for this location.
        </p>
        <div className="flex items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              {t.common.retry}
            </button>
          )}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-sky-700 hover:underline font-medium"
          >
            {t.nasaInsights.viewSource} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border ${theme.border} shadow-soft overflow-hidden transition-all hover:shadow-card`}>
      {/* Header bar */}
      <div className={`${theme.bgHeader} px-5 py-3.5 border-b border-stone-100 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{theme.icon}</span>
          <span className="font-bold text-sm tracking-tight text-stone-800 uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${theme.badge}`}>
            {theme.badgeText}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
              isCached
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-2.5 h-2.5" />
            {isCached ? t.nasaInsights.cachedBadge : t.nasaInsights.liveBadge}
          </span>
        </div>
      </div>

      {/* Main Metric Section */}
      <div className="p-5">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-stone-900">
              {displayValue}
            </span>
            <span className="text-sm font-semibold text-stone-600">{displayUnit}</span>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-stone-600 justify-end">
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              <span className="font-semibold text-stone-850">
                {isCached ? `Last available: ${observationDate}` : observationDate}
              </span>
            </div>
            <div className="text-[10px] text-stone-600 mt-0.5">
              Spatial: {spatialResolution}
            </div>
          </div>
        </div>

        {/* Scientific Note Notice */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 my-3 text-[11px] leading-relaxed text-stone-700 flex items-start gap-2">
          <Info className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
          <span>{scientificNote}</span>
        </div>

        {/* Primary Action Button: View NASA Data Source */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-semibold transition-colors"
          >
            <span>{t.nasaInsights.viewSource}</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
          </a>

          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium py-1 px-2 rounded-md hover:bg-stone-100 transition-colors"
          >
            <span>{showMetadata ? 'Hide NASA Details' : 'Metadata & Traceability'}</span>
            {showMetadata ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Metadata Tray */}
        {showMetadata && (
          <div className="mt-3 pt-3 border-t border-dashed border-stone-200 text-xs text-stone-600 space-y-1.5 bg-stone-50/70 p-3 rounded-xl">
            <div className="flex justify-between">
              <span className="text-stone-600 font-medium">{t.nasaInsights.mission}:</span>
              <span className="text-stone-800 font-semibold text-right">{mission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600 font-medium">{t.nasaInsights.product}:</span>
              <span className="text-stone-800 font-semibold text-right max-w-[220px] truncate" title={product}>{product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600 font-medium">{t.nasaInsights.variable}:</span>
              <span className="text-stone-800 font-semibold">{variable}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600 font-medium">{t.nasaInsights.spatialResolution}:</span>
              <span className="text-stone-800 font-semibold">{spatialResolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600 font-medium">{t.common.source}:</span>
              <span className="text-stone-800 font-semibold">{source}</span>
            </div>
            {granuleId && (
              <div className="flex justify-between">
                <span className="text-stone-600 font-medium">Granule ID:</span>
                <span className="text-stone-800 font-mono text-[10px] truncate max-w-[200px]" title={granuleId}>{granuleId}</span>
              </div>
            )}
            {retrievalTimestamp && (
              <div className="flex justify-between">
                <span className="text-stone-600 font-medium">{t.nasaInsights.retrievedAt}:</span>
                <span className="text-stone-700 text-[10px] font-mono">{new Date(retrievalTimestamp).toLocaleString()}</span>
              </div>
            )}
            {docUrl && (
              <div className="pt-1 text-right">
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:underline font-semibold"
                >
                  Technical Product Documentation ↗
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

