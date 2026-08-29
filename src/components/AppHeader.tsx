import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { 
  Globe, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  Eye, 
  Smartphone, 
  Menu, 
  X,
  Wifi,
  WifiOff
} from 'lucide-react';
import { LanguageCode } from '../types';

export const AppHeader: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    isSimpleMode, 
    toggleSimpleMode, 
    farmer, 
    unreadCount, 
    setActiveTab, 
    setIsAiModalOpen,
    isOffline,
    setIsOffline,
    setIsBiometricModalOpen,
    speak
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white shadow-xl border-b border-cyan-900/40">
      {/* Top Gov Emblem & Alert Strip */}
      <div className="bg-slate-950/95 text-emerald-300 text-xs px-3 py-1 flex items-center justify-between border-b border-emerald-900/30">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide flex items-center gap-1.5 text-emerald-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            कृषि एवं किसान कल्याण मंत्रालय | Smart India Hackathon
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick Offline simulator button */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition ${
              isOffline ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-cyan-300 hover:bg-slate-800'
            }`}
            title="Toggle offline connection mode"
          >
            {isOffline ? <WifiOff size={13} className="text-orange-400" /> : <Wifi size={13} className="text-cyan-400" />}
            <span>{isOffline ? 'Offline Mode' : 'Online'}</span>
          </button>
          
          <button
            onClick={() => setIsBiometricModalOpen(true)}
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30"
          >
            <ShieldCheck size={13} className="text-emerald-400" />
            <span className="text-[11px]">Aadhaar e-KYC: <strong className="text-emerald-300 font-bold">Verified</strong></span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-300/40">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg sm:text-xl tracking-tight leading-none text-white group-hover:text-cyan-300 transition">
                {t('appTitle')}
              </h1>
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-sm">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-cyan-200/80 font-medium hidden sm:block">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Simple Mode Switcher Button */}
          <button
            id="btn-simple-mode-toggle"
            onClick={() => {
              toggleSimpleMode();
              speak(!isSimpleMode ? 'सरल मोड सक्रिय किया गया' : 'विस्तृत मोड सक्रिय किया गया');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition shadow-sm border ${
              isSimpleMode
                ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-emerald-400/40 font-black'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-200 border-slate-800'
            }`}
            title="Toggle Simple Low-Literacy Mode"
          >
            <Smartphone size={16} className={isSimpleMode ? 'text-slate-950' : 'text-emerald-400'} />
            <span className="hidden xs:inline">
              {isSimpleMode ? t('simpleMode') : t('simpleMode')}
            </span>
          </button>

          {/* AI Voice Assistant Button */}
          <button
            id="btn-voice-ai-modal"
            onClick={() => {
              setIsAiModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white rounded-lg text-xs sm:text-sm font-bold shadow-md border border-pink-400/40 transition transform active:scale-95"
            title="Open Kisan Saheli Indian Girl AI Voice Assistant"
          >
            <span className="text-base leading-none">👩‍🌾</span>
            <span className="hidden sm:inline">किसान सहेली (AI Voice)</span>
            <span className="sm:hidden">AI दीदी</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="btn-language-selector"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs sm:text-sm font-bold text-cyan-300 shadow-sm transition"
              aria-label="Select Language"
            >
              <Globe size={16} className="text-emerald-400" />
              <span className="tracking-wide">{currentLangObj.nativeName}</span>
              <span className="text-[10px] text-slate-400 font-normal">▼</span>
            </button>

            {isLangOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-emerald-200 z-50 overflow-hidden py-1.5 max-h-96 overflow-y-auto">
                  <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-100">
                    <p className="text-xs font-extrabold text-emerald-950 uppercase">
                      🌐 भाषा चुनें / Select Language
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      आप कभी भी भाषा बदल सकते हैं
                    </p>
                  </div>
                  {SUPPORTED_LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setIsLangOpen(false);
                        speak(`${item.nativeName} भाषा चुनी गई`);
                      }}
                      className={`w-full px-3 py-2.5 text-left flex items-center justify-between text-sm transition hover:bg-emerald-50 ${
                        language === item.code ? 'bg-emerald-100 font-black text-emerald-950' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.flagText}</span>
                        <div>
                          <span className="font-bold block text-sm">{item.nativeName}</span>
                          <span className="text-[11px] text-slate-500">{item.name} • {item.region}</span>
                        </div>
                      </div>
                      {language === item.code && (
                        <span className="text-emerald-600 font-bold text-base">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications Icon with Badge */}
          <button
            id="btn-notifications-tab"
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 transition border border-slate-800"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Farmer Profile Avatar Badge */}
          <button
            id="btn-profile-tab"
            onClick={() => setActiveTab('profile')}
            className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow">
              {farmer.name.charAt(0)}
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold block text-white">{farmer.name}</span>
              <span className="text-[10px] text-cyan-300 font-mono">{farmer.village}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
