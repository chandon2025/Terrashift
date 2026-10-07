import React from 'react';
import { X, Calculator, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ScoreMethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoreMethodologyModal: React.FC<ScoreMethodologyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                {t.rotationScore.howCalculated}
              </h3>
              <p className="text-xs text-stone-700">
                Transparent & Explainable Agronomic Assessment Methodology
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
        <div className="p-6 space-y-6 text-xs text-stone-700 leading-relaxed">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h4 className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-700" />
              Explainable Scoring Principles
            </h4>
            <p className="text-emerald-900">
              TerraShift never generates arbitrary, "black-box", or random scores. The Rotational Balance Index is a deterministic mathematical framework evaluating four verified agronomic pillars.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-3">
              Mathematical Weight Distribution (100 Points Total)
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between font-bold text-stone-900 mb-1">
                  <span>1. Crop Diversity & Botanical Family Rotation</span>
                  <span className="text-emerald-800">30% Weight</span>
                </div>
                <p className="text-stone-600">
                  Calculates crop varietal richness using a normalized Shannon-Wiener diversity index. Rotating cereals (Poaceae) with pulses (Fabaceae) or crucifers (Brassicaceae) breaks recurring pathogen, nematode, and weed cycles.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between font-bold text-stone-900 mb-1">
                  <span>2. Biological Nitrogen Fixation & Soil Resting</span>
                  <span className="text-emerald-800">30% Weight</span>
                </div>
                <p className="text-stone-600">
                  Awards points for incorporating leguminous crops (e.g. Lentils, Mungbeans) that fix atmospheric nitrogen via Rhizobium root symbiosis, replenishing soil organic matter and resting the soil horizon between exhaustive grain crops.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between font-bold text-stone-900 mb-1">
                  <span>3. Root Architecture Variability</span>
                  <span className="text-emerald-800">20% Weight</span>
                </div>
                <p className="text-stone-600">
                  Alternating shallow fibrous rooting systems (e.g. rice, mustard) with deep taproots (e.g. maize, jute, cotton) aerates distinct subsoil horizons, fractures plow pans, and optimizes multi-layer nutrient uptake.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex justify-between font-bold text-stone-900 mb-1">
                  <span>4. Water Demand & NASA SMAP Alignment</span>
                  <span className="text-emerald-800">20% Weight</span>
                </div>
                <p className="text-stone-600">
                  Cross-references crop transpiration demand against farmer-reported irrigation access and NASA SMAP regional soil moisture observations. Penalizes continuous high-water crops during dry-spell vulnerability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <h4 className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Crucial Agronomic Limitations
            </h4>
            <p className="text-amber-800">
              {t.rotationScore.limitationsDesc} Satellite sensors capture macro-environmental observations; they do not replace on-site soil laboratory testing (pH, N-P-K, salinity) or localized extension services from Bangladesh Department of Agricultural Extension (DAE).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
