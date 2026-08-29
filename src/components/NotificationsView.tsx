import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Clock, AlertTriangle, ArrowRight, Volume2 } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, setActiveTab, t, speak } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <Bell size={24} className="text-red-600" />
            <span>{t('notifications')} (Alerts & Updates)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            कतार प्रगति, स्लॉट अनुस्मारक एवं भुगतान सम्बन्धी आधिकारिक सूचनाएं
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => {
          const isWarning = notif.urgency === 'warning';

          return (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.actionRoute) setActiveTab(notif.actionRoute as any);
              }}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-start gap-3.5 ${
                !notif.read
                  ? isWarning
                    ? 'bg-amber-50/80 border-amber-400'
                    : 'bg-orange-50/70 border-orange-300'
                  : 'bg-white border-stone-200 opacity-80'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                !notif.read ? (isWarning ? 'bg-amber-500 animate-ping' : 'bg-red-600') : 'bg-stone-300'
              }`} />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-900">
                    {notif.title}
                  </h4>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold shrink-0">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed font-medium">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200/60">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(notif.message);
                    }}
                    className="text-xs font-bold text-orange-800 hover:text-orange-950 flex items-center gap-1"
                  >
                    <Volume2 size={13} />
                    <span>सुनें (Listen)</span>
                  </button>

                  <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                    <span>विवरण देखें</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
