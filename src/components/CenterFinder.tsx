import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Users, 
  CalendarCheck, 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Filter, 
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProcurementCenter } from '../types';

export const CenterFinder: React.FC = () => {
  const { centers, setActiveTab, t, speak, language } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'wait'>('recommended');

  const filteredCenters = centers.filter(c => {
    const matchesCrop = selectedCrop === 'All' || c.acceptedCrops.some(cr => cr.toLowerCase().includes(selectedCrop.toLowerCase()));
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.hindiName.includes(searchQuery) ||
                          c.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'recommended') {
      if (a.isRecommended) return -1;
      if (b.isRecommended) return 1;
      return a.estimatedWaitMinutes - b.estimatedWaitMinutes;
    }
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'wait') return a.estimatedWaitMinutes - b.estimatedWaitMinutes;
    return 0;
  });

  const recommendedCenter = centers.find(c => c.isRecommended);

  return (
    <div className="space-y-5 pb-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <MapPin size={26} className="text-emerald-600" />
            <span>{t('procCenters')} (Procurement Centers)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            अपने निकटतम खरीद केंद्र की लाइव कतार, प्रतीक्षा समय और उपलब्ध स्लॉट देखें।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('booking')}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
        >
          <CalendarCheck size={16} />
          <span>{t('bookSlot')}</span>
        </button>
      </div>

      {/* SMART RECOMMENDATION HERO BANNER */}
      {recommendedCenter && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-5 rounded-3xl shadow-lg border border-cyan-900/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {t('recommendedForYou')}
              </span>
              <span className="text-xs font-bold text-cyan-200">
                ✨ Smart Recommendation Algorithm
              </span>
            </div>

            <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-white">
                  {recommendedCenter.name} ({recommendedCenter.hindiName})
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-200/90 mt-0.5">
                  💡 {recommendedCenter.recommendationReason}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-black">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                    📍 {recommendedCenter.distanceKm} km away
                  </span>
                  <span className="bg-slate-900 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-700/60">
                    🟢 कतार: केवल {recommendedCenter.currentQueue} किसान
                  </span>
                  <span className="bg-emerald-400 text-slate-950 px-2.5 py-1 rounded-lg font-mono">
                    ⏱️ प्रतीक्षा: केवल {recommendedCenter.estimatedWaitMinutes} मिनट
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-lg text-slate-950">
                    📅 {recommendedCenter.availableSlots} स्लॉट रिक्त
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  speak(`शिवपुर केंद्र चुना गया। यहाँ प्रतीक्षा समय केवल 35 मिनट है।`);
                  setActiveTab('booking');
                }}
                className="py-3 px-5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 shrink-0 transform active:scale-95"
              >
                <span>{t('chooseThisCenter')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="केंद्र का नाम, गांव या पता खोजें..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none"
          >
            <option value="All">सभी फसलें (All Crops)</option>
            <option value="Wheat">गेहूं (Wheat)</option>
            <option value="Paddy">धान (Paddy)</option>
            <option value="Mustard">सरसों (Mustard)</option>
            <option value="Chana">चना (Chana)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none"
          >
            <option value="recommended">अनुशंसित (Recommended)</option>
            <option value="wait">कम प्रतीक्षा समय (Lowest Wait)</option>
            <option value="distance">कम दूरी (Shortest Distance)</option>
          </select>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCenters.map((center) => {
          const isOpen = center.status === 'open';

          return (
            <div
              key={center.id}
              className={`bg-white rounded-3xl shadow-md border-2 transition-all p-5 flex flex-col justify-between space-y-4 ${
                center.isRecommended 
                  ? 'border-emerald-500 bg-emerald-50/20' 
                  : 'border-slate-200 hover:border-emerald-500'
              }`}
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <MapPin size={13} className="text-emerald-600" />
                        <span>{center.distanceKm} km away</span>
                      </span>
                      {center.isRecommended && (
                        <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                          ⭐ Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-1">
                      {center.name}
                    </h3>
                    <p className="text-xs text-teal-800 font-semibold">{center.hindiName}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                    isOpen ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'
                  }`}>
                    {isOpen ? `🟢 ${t('openStatus')}` : `🔴 ${t('closedStatus')}`}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2 line-clamp-1 font-medium">{center.address}</p>

                {/* Live Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {t('currentQueue')}
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      {center.currentQueue}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-medium">किसान</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {t('estimatedWait')}
                    </span>
                    <span className="text-base sm:text-lg font-black text-cyan-700 font-mono">
                      {center.estimatedWaitMinutes}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-medium">{t('minutes')}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">
                      {t('availableSlots')}
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-700 font-mono">
                      {center.availableSlots}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-medium">स्लॉट</span>
                  </div>
                </div>

                {/* Accepted Crops and Working Hours */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-700">स्वीकृत फसलें:</span>
                    {center.acceptedCrops.map((crop, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-950 px-2 py-0.5 rounded-md text-[11px] font-medium border border-emerald-200">
                        {crop}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <Clock size={12} />
                    <span>कार्य समय: {center.workingHours} | {center.activeCounters} काउंटर सक्रिय</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${center.contactPhone}`}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall size={14} className="text-blue-600" />
                  <span>{t('contactCenter')}</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('booking');
                  }}
                  className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <span>{t('viewSlots')}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
