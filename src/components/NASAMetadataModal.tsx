import React from 'react';
import { X, ExternalLink, ShieldCheck, Database, Satellite } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NASA_DATASET_METADATA } from '../services/nasa/nasaMetadata';

interface NASAMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NASAMetadataModal: React.FC<NASAMetadataModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center">
              <Satellite className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                Official NASA Datasets & Traceability
              </h3>
              <p className="text-xs text-stone-700">
                NASA Space Apps Challenge 2026 • Earth Observation Data Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-xs text-sky-950 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-800 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sky-950 mb-1">
                Zero Synthetic / Fake Data Policy
              </p>
              <p>
                TerraShift adheres strictly to scientific data integrity. All numerical environmental values originate directly from verified NASA satellite observations or models. If observations are unavailable, TerraShift explicitly presents an unavailable state or last-known observation with exact timestamp.
              </p>
            </div>
          </div>

          {/* Dataset Cards */}
          {Object.entries(NASA_DATASET_METADATA).map(([key, info]) => (
            <div key={key} className="border border-stone-200 rounded-2xl p-5 hover:border-emerald-300 transition-colors bg-stone-50/40">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[11px] font-bold text-sky-900 tracking-wider uppercase">
                    {info.mission}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">
                    {info.product}
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-bold whitespace-nowrap">
                  v{info.version}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 text-xs bg-white p-3 rounded-xl border border-stone-100">
                <div>
                  <span className="text-stone-700 block text-[10px] font-medium">Variable:</span>
                  <span className="font-semibold text-stone-800">{info.variable}</span>
                </div>
                <div>
                  <span className="text-stone-700 block text-[10px] font-medium">Resolution:</span>
                  <span className="font-semibold text-stone-800">{info.spatialResolution}</span>
                </div>
                <div>
                  <span className="text-stone-700 block text-[10px] font-medium">Temporal:</span>
                  <span className="font-semibold text-stone-800">{info.temporalResolution}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {language === 'bn' ? info.scientificNoticeBn : info.scientificNotice}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                <a
                  href={info.officialProductUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 hover:text-sky-900 hover:underline"
                >
                  <span>Official NASA Product Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {info.alternateUrls?.map((alt, idx) => (
                  <a
                    key={idx}
                    href={alt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 hover:underline"
                  >
                    <span>• {alt.name}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

