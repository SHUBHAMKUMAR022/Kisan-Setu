import React from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import { 
  Home, 
  MapPin, 
  Ticket, 
  Wheat, 
  IndianRupee, 
  BarChart3, 
  User,
  HelpCircle,
  CloudSun
} from 'lucide-react';

interface NavItem {
  tab: NavigationTab;
  icon: React.ElementType;
  labelKey: string;
  badge?: number;
}

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, t, isSimpleMode } = useApp();

  const navItems: NavItem[] = [
    { tab: 'dashboard', icon: Home, labelKey: 'greeting' },
    { tab: 'weather', icon: CloudSun, labelKey: 'weatherAdvisory' },
    { tab: 'queue', icon: Ticket, labelKey: 'myToken' },
    { tab: 'centers', icon: MapPin, labelKey: 'procCenters' },
    { tab: 'procurement', icon: Wheat, labelKey: 'myProcurement' },
    { tab: 'payment', icon: IndianRupee, labelKey: 'paymentStatus' },
    { tab: 'profile', icon: User, labelKey: 'profileTitle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-xl md:hidden safe-area-pb">
      <div className="flex items-center justify-around px-1 py-1.5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;

          return (
            <button
              key={item.tab}
              id={`nav-bottom-${item.tab}`}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-150 min-w-[50px] min-h-[48px] ${
                isActive 
                  ? 'text-emerald-700 font-extrabold bg-emerald-50 scale-105 border border-emerald-200/80 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon size={isSimpleMode ? 24 : 20} className={isActive ? 'text-emerald-600 stroke-[2.5]' : 'stroke-[1.8] text-slate-500'} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight line-clamp-1 ${isActive ? 'text-emerald-950 font-black' : ''}`}>
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
