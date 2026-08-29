import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, lastSyncTime, t } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-amber-50 px-3 py-2 text-xs sm:text-sm font-semibold shadow-md flex items-center justify-between border-b border-amber-700 animate-fadeIn">
      <div className="flex items-center gap-2 max-w-2xl">
        <WifiOff size={18} className="text-amber-200 shrink-0" />
        <div>
          <span>{t('offlineNote')}</span>
          <span className="text-amber-200 text-xs ml-2 font-mono">
            ({t('lastSync')}: {lastSyncTime})
          </span>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="flex items-center gap-1 bg-amber-800 hover:bg-amber-900 px-2.5 py-1 rounded text-xs text-white font-bold transition shadow-sm"
      >
        <RefreshCw size={12} />
        <span>पुनः प्रयास (Retry)</span>
      </button>
    </div>
  );
};
