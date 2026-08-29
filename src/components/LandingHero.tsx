import React from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { 
  Wheat, 
  CalendarCheck, 
  Ticket, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Smartphone, 
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import { LanguageCode } from '../types';

export const LandingHero: React.FC = () => {
  const { setIsAuthModalOpen, language, setLanguage, t, speak } = useApp();

  return (
    <div className="space-y-8 pb-16">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border border-emerald-400/50 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Smart India Hackathon • SIH 2026 Innovation</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {t('appTitle')}
          </h1>
          <p className="text-base sm:text-xl text-cyan-200/90 font-medium leading-relaxed">
            किसानों के लिए पारदर्शी स्लॉट बुकिंग, वास्तविक समय कतार ट्रैकिंग और त्वरित DBT भुगतान प्रणाली
          </p>
        </div>

        {/* 11 Languages Quick Bar */}
        <div className="max-w-2xl mx-auto bg-slate-900/90 p-3 rounded-2xl border border-cyan-900/50 flex items-center justify-center gap-2 flex-wrap text-xs shadow-inner">
          <span className="font-bold text-emerald-300 flex items-center gap-1">
            <Globe size={14} />
            <span>11 भाषाएं:</span>
          </span>
          {SUPPORTED_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                speak(`${l.nativeName} भाषा चुनी गई`);
              }}
              className={`px-2 py-1 rounded-lg font-bold transition ${
                language === l.code ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {l.nativeName}
            </button>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl transition flex items-center justify-center gap-2 transform active:scale-95 border-2 border-emerald-300"
          >
            <span>किसान लॉगिन / स्लॉट बुक करें</span>
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => {
              speak('किसान सेतु पोर्टल पर आपका स्वागत है। आप बिना कतार में खड़े रहे अपनी फसल की खरीद का समय बुक कर सकते हैं।');
            }}
            className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-700 hover:from-blue-500 hover:to-teal-600 text-white font-black text-sm sm:text-base rounded-2xl transition flex items-center justify-center gap-2 border border-cyan-400/40 shadow-lg"
          >
            <span>🔊 बोलकर बताएं (Audio Tour)</span>
          </button>
        </div>
      </div>

      {/* 4 CORE VALUE PILLARS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-3xl shadow-md border border-emerald-100 hover:border-emerald-300 transition space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-2xl">
            ⏱️
          </div>
          <h3 className="font-extrabold text-base text-slate-900">शून्य प्रतीक्षा समय (Zero Wait)</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            मंडी में घंटों कतार में खड़े रहने की आवश्यकता नहीं। अपने तय स्लॉट पर पहुंचें।
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl shadow-md border border-cyan-100 hover:border-cyan-300 transition space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-black text-2xl">
            🎫
          </div>
          <h3 className="font-extrabold text-base text-slate-900">लाइव कतार ट्रैकिंग (Live Token)</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            घर बैठे मोबाइल पर देखें कि आपके आगे कितने किसान हैं और आपकी बारी कब आएगी।
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl shadow-md border border-teal-100 hover:border-teal-300 transition space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-2xl">
            🌾
          </div>
          <h3 className="font-extrabold text-base text-slate-900">पारदर्शी 8-चरण ट्रैकिंग</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            नमी जांच, इलेक्ट्रॉनिक धर्मकांटा वजन और ई-जे फार्म का सीधा डिजिटल रिकॉर्ड।
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl shadow-md border border-blue-100 hover:border-blue-300 transition space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-2xl">
            💰
          </div>
          <h3 className="font-extrabold text-base text-slate-900">त्वरित बैंक DBT भुगतान</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            MSP की पूरी राशि 24-48 घंटे के भीतर सीधे आधार-लिंक्ड बैंक खाते में।
          </p>
        </div>
      </div>
    </div>
  );
};
