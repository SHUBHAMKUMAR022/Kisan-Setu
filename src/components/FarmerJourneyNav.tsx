import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  CheckSquare, 
  Navigation, 
  Scale, 
  IndianRupee, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { FarmerJourneyStep } from '../types';

interface FarmerJourneyNavProps {
  currentStep?: FarmerJourneyStep;
  onSelectStep?: (step: FarmerJourneyStep) => void;
}

export const FarmerJourneyNav: React.FC<FarmerJourneyNavProps> = () => {
  const { activeTab, setActiveTab } = useApp();

  const steps: {
    id: FarmerJourneyStep;
    tab: 'centers' | 'booking' | 'weather' | 'queue' | 'procurement' | 'payment';
    titleHi: string;
    titleEn: string;
    icon: React.ElementType;
    descHi: string;
  }[] = [
    {
      id: 'plan',
      tab: 'booking',
      titleHi: '1. योजना (Plan)',
      titleEn: 'Plan',
      icon: Calendar,
      descHi: 'केंद्र व स्लॉट चुनें',
    },
    {
      id: 'prepare',
      tab: 'weather',
      titleHi: '2. तैयारी (Prepare)',
      titleEn: 'Prepare',
      icon: CheckSquare,
      descHi: 'कागजात व फसल जांच',
    },
    {
      id: 'travel',
      tab: 'queue',
      titleHi: '3. प्रस्थान (Travel)',
      titleEn: 'Travel',
      icon: Navigation,
      descHi: 'कब निकलें व रास्ता',
    },
    {
      id: 'procure',
      tab: 'procurement',
      titleHi: '4. उपार्जन (Procure)',
      titleEn: 'Procure',
      icon: Scale,
      descHi: 'गुणवत्ता व तौल',
    },
    {
      id: 'get_paid',
      tab: 'payment',
      titleHi: '5. भुगतान (Get Paid)',
      titleEn: 'Get Paid',
      icon: IndianRupee,
      descHi: 'DBT व डिजिटल रसीद',
    },
  ];

  // Helper to check active status based on current active tab
  const getIsActive = (tabName: string) => {
    if (tabName === 'booking' && (activeTab === 'booking' || activeTab === 'centers')) return true;
    if (tabName === 'weather' && activeTab === 'weather') return true;
    if (tabName === 'queue' && activeTab === 'queue') return true;
    if (tabName === 'procurement' && activeTab === 'procurement') return true;
    if (tabName === 'payment' && (activeTab === 'payment' || activeTab === 'yield')) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm mb-5">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            किसान संपूर्ण खरीद यात्रा (Farmer Journey Flow)
          </h3>
        </div>
        <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hidden sm:inline-block">
          5-चरण सरल प्रक्रिया
        </span>
      </div>

      {/* 5-Step Responsive Flow */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = getIsActive(step.tab);

          return (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.tab)}
              className={`flex flex-col items-center text-center p-2 rounded-xl border transition group relative ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md font-bold ring-2 ring-emerald-400/50'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mb-1 transition ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 group-hover:text-emerald-700'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-1">
                {step.titleHi}
              </div>
              <div className={`text-[9px] hidden sm:block mt-0.5 line-clamp-1 ${
                isActive ? 'text-emerald-100' : 'text-slate-500'
              }`}>
                {step.descHi}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
