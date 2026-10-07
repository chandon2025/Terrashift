import React from 'react';
import { Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useApp();

  return (
    <div className={`bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-amber-900 flex items-start gap-2.5 shadow-sm ${compact ? 'text-xs' : 'text-sm'}`}>
      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed font-medium">
        {t.app.decisionSupportNotice}
      </div>
    </div>
  );
};

