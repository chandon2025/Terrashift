import React from 'react';
import {
  Heart,
  Droplets,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Eye,
  BarChart3,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FarmerPriority } from '../types';

export const Screen06Priorities: React.FC = () => {
  const { farmProfile, togglePriority, t, navigate } = useApp();

  const priorityItems: {
    key: FarmerPriority;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  }[] = [
    {
      key: 'soil_health',
      icon: Heart,
      title: t.priorities.items.soil_health.title,
      desc: t.priorities.items.soil_health.desc,
    },
    {
      key: 'water_saving',
      icon: Droplets,
      title: t.priorities.items.water_saving.title,
      desc: t.priorities.items.water_saving.desc,
    },
    {
      key: 'climate_resilience',
      icon: ShieldCheck,
      title: t.priorities.items.climate_resilience.title,
      desc: t.priorities.items.climate_resilience.desc,
    },
    {
      key: 'yield_stability',
      icon: TrendingUp,
      title: t.priorities.items.yield_stability.title,
      desc: t.priorities.items.yield_stability.desc,
    },
    {
      key: 'crop_rotation',
      icon: RefreshCw,
      title: t.priorities.items.crop_rotation.title,
      desc: t.priorities.items.crop_rotation.desc,
    },
    {
      key: 'environmental_awareness',
      icon: Eye,
      title: t.priorities.items.environmental_awareness.title,
      desc: t.priorities.items.environmental_awareness.desc,
    },
    {
      key: 'data_planning',
      icon: BarChart3,
      title: t.priorities.items.data_planning.title,
      desc: t.priorities.items.data_planning.desc,
    },
  ];

  const handleContinue = () => {
    navigate('nasa_insights');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-700" />
          {t.priorities.title}
        </h1>
        <p className="text-xs text-stone-700 mt-1">
          {t.priorities.subtitle}
        </p>
      </div>

      {/* Priorities Selection Grid */}
      <div className="space-y-3">
        {priorityItems.map((item) => {
          const Icon = item.icon;
          const isSelected = farmProfile.priorities.includes(item.key);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => togglePriority(item.key)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-600 shadow-soft scale-[1.01]'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-stone-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('farm_info')}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </button>

        <button
          onClick={handleContinue}
          className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
        >
          <span>{t.priorities.continue}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

