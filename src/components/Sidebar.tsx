import React from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import { 
  Home, 
  MapPin, 
  Ticket, 
  Wheat, 
  IndianRupee, 
  BarChart3, 
  History, 
  Bell, 
  User, 
  HelpCircle, 
  Sparkles,
  PhoneCall,
  CalendarCheck,
  CloudSun
} from 'lucide-react';

interface SidebarItem {
  tab: NavigationTab;
  icon: React.ElementType;
  labelKey: string;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, unreadCount, farmer, setIsAiModalOpen } = useApp();

  const mainItems: SidebarItem[] = [
    { tab: 'dashboard', icon: Home, labelKey: 'greeting' },
    { tab: 'weather', icon: CloudSun, labelKey: 'weatherAdvisory' },
    { tab: 'booking', icon: CalendarCheck, labelKey: 'bookSlot' },
    { tab: 'queue', icon: Ticket, labelKey: 'myToken' },
    { tab: 'centers', icon: MapPin, labelKey: 'procCenters' },
    { tab: 'procurement', icon: Wheat, labelKey: 'myProcurement' },
    { tab: 'payment', icon: IndianRupee, labelKey: 'paymentStatus' },
    { tab: 'yield', icon: BarChart3, labelKey: 'yieldDashboard' },
    { tab: 'history', icon: History, labelKey: 'history' },
    { tab: 'notifications', icon: Bell, labelKey: 'notifications', badge: unreadCount },
    { tab: 'profile', icon: User, labelKey: 'profileTitle' },
    { tab: 'help', icon: HelpCircle, labelKey: 'helpTitle' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 border-r border-cyan-950/70 p-3 min-h-[calc(100vh-64px)] justify-between shrink-0">
      <div className="space-y-1">
        {/* Farmer Mini Profile Card */}
        <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/20 mb-3 flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-white font-black flex items-center justify-center text-base shadow-md">
            {farmer.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xs font-bold text-white truncate">{farmer.name}</h2>
            <p className="text-[11px] text-emerald-400 font-mono font-bold">{farmer.farmerId}</p>
            <p className="text-[10px] text-slate-400">{farmer.village}, {farmer.district}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;

            return (
              <button
                key={item.tab}
                id={`sidebar-tab-${item.tab}`}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60 font-bold border border-emerald-400/30' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-cyan-400/80'} />
                  <span>{t(item.labelKey)}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="bg-emerald-400 text-slate-950 text-xs font-black px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Helpline & AI Banner */}
      <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 p-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-md border border-cyan-400/40 transition"
        >
          <Sparkles size={15} className="text-cyan-200 animate-pulse" />
          <span>किसान सहायक AI (आवाज)</span>
        </button>

        <div className="p-2.5 bg-slate-900/90 rounded-xl border border-cyan-900/40 text-[11px] text-slate-300 shadow-inner">
          <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1">
            <PhoneCall size={12} className="text-emerald-400" />
            <span>टोल-फ्री किसान हेल्पलाइन</span>
          </div>
          <p className="font-mono text-xs text-white font-black">1800-180-1551</p>
          <p className="text-[10px] text-slate-400">प्रातः 6:00 से रात्रि 10:00 तक</p>
        </div>
      </div>
    </aside>
  );
};
