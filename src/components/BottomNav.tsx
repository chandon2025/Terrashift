import React from 'react';
import { Home, Satellite, Sprout, GitCompare, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const navItems = [
    { key: 'home', label: t.nav.home, icon: Home },
    { key: 'nasa', label: t.nav.nasaData, icon: Satellite },
    { key: 'farm', label: t.nav.myFarm, icon: Sprout },
    { key: 'strategies', label: t.nav.strategies, icon: GitCompare },
    { key: 'settings', label: t.nav.profile, icon: Settings },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-emerald-900/10 px-2 py-1 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-800 font-bold scale-105'
                  : 'text-stone-500 hover:text-emerald-700 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

