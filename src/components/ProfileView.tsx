import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { 
  User, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  Fingerprint, 
  Wheat,
  Clock,
  Sparkles,
  Building,
  CheckCircle2,
  Calendar,
  Lock,
  PlusCircle,
  Edit3
} from 'lucide-react';
import { LanguageCode, RegisteredCrop } from '../types';

export const ProfileView: React.FC = () => {
  const { 
    farmer, 
    updateFarmerProfile, 
    language, 
    setLanguage, 
    setIsBiometricModalOpen, 
    t, 
    toggleSimpleMode, 
    isSimpleMode,
    speak
  } = useApp();

  const [crops, setCrops] = useState<RegisteredCrop[]>(farmer.registeredCrops || [
    {
      id: 'crop-1',
      cropName: 'Wheat (गेहूं)',
      cropHindi: 'गेहूं (एच.डी. 2967)',
      variety: 'HD-2967 Certified',
      approxQuantityQuintal: 40,
      readiness: 'ready',
      expectedProcurementDate: '22 August 2026',
      notes: 'कटी हुई फसल सूखी है, नमी लगभग 11.2% है।',
    },
    {
      id: 'crop-2',
      cropName: 'Mustard (सरसों)',
      cropHindi: 'सरसों (पीली क्रांति)',
      variety: 'Pusa Bold',
      approxQuantityQuintal: 15,
      readiness: 'almost_ready',
      expectedProcurementDate: '28 August 2026',
      notes: 'थ्रेशिंग का कार्य चल रहा है, 2-3 दिन में तैयार होगी।',
    },
    {
      id: 'crop-3',
      cropName: 'Gram (चना)',
      cropHindi: 'चना (देसी)',
      variety: 'JG-11',
      approxQuantityQuintal: 10,
      readiness: 'not_ready',
      expectedProcurementDate: '05 September 2026',
      notes: 'खेत में कटाई बाकी है।',
    },
  ]);

  const toggleReadiness = (cropId: string) => {
    setCrops(prev => prev.map(c => {
      if (c.id === cropId) {
        let nextStatus: RegisteredCrop['readiness'] = 'ready';
        if (c.readiness === 'ready') nextStatus = 'almost_ready';
        else if (c.readiness === 'almost_ready') nextStatus = 'not_ready';
        else nextStatus = 'ready';
        return { ...c, readiness: nextStatus };
      }
      return c;
    }));
  };

  const getReadinessBadge = (readiness: RegisteredCrop['readiness']) => {
    switch (readiness) {
      case 'ready':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          label: '🟢 तैयार (Ready for Center)',
        };
      case 'almost_ready':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
          label: '🟡 लगभग तैयार (In 2-3 Days)',
        };
      case 'not_ready':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          dot: 'bg-slate-500',
          label: '⚪ खेत में बाकी (Not Ready)',
        };
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <User size={26} className="text-emerald-700" />
          <span>मेरी खेती पहचान एवं प्रोफ़ाइल (Smart Farmer Identity)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          सत्यापित किसान खाता, पंजीकृत फसलें, केंद्र इतिहास व प्राथमिकताएं
        </p>
      </div>

      {/* 1. Main Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-5 border border-emerald-800/60">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black text-3xl flex items-center justify-center shadow-lg border-2 border-emerald-300">
          {farmer.name.charAt(0)}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-white">{farmer.name} ({farmer.hindiName})</h3>
            <span className="bg-emerald-400 text-slate-950 text-xs px-2.5 py-0.5 rounded-full font-black shadow-xs">
              सत्यापित किसान ✅
            </span>
          </div>
          <p className="text-xs text-emerald-300 font-mono font-bold">
            किसान पंजीयन संख्या: {farmer.farmerId}
          </p>
          <p className="text-xs text-emerald-100/90">
            {farmer.village}, {farmer.district}, {farmer.state}
          </p>
        </div>
      </div>

      {/* 2. Personalized Farmer Insight Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
        <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-emerald-900">
            व्यक्तिगत किसान विश्लेषण (Personalized Farming Profile)
          </h4>
          <p className="text-emerald-800 font-medium">
            आप सामान्यतः <strong>40 क्विंटल</strong> गेहूं की फसल लाते हैं। आपका मुख्य केंद्र <strong>रामपुर</strong> है (6 बार प्रयुक्त, औसत प्रतीक्षा 32 मिनट)।
          </p>
        </div>
      </div>

      {/* 3. Smart Crop Registration & Readiness Tracking */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-emerald-700" />
            <h4 className="font-extrabold text-base text-slate-900">
              मेरी फसलें एवं तैयारी स्थिति (Registered Crops)
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            स्थिति बदलने हेतु कार्ड पर क्लिक करें
          </span>
        </div>

        <div className="space-y-3">
          {crops.map((crop) => {
            const badge = getReadinessBadge(crop.readiness);
            return (
              <div 
                key={crop.id}
                onClick={() => toggleReadiness(crop.id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/30 transition cursor-pointer space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{crop.cropName}</h5>
                    <p className="text-xs text-slate-500">किस्म: {crop.variety} • मात्रा: <strong>~{crop.approxQuantityQuintal} क्विंटल</strong></p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200/60">
                  <span>📅 संभावित उपार्जन: <strong>{crop.expectedProcurementDate}</strong></span>
                  <span className="text-[11px] text-slate-500 italic">{crop.notes}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Preferred Center Stats & History */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-5 h-5 text-emerald-700" />
          <h4 className="font-extrabold text-base text-slate-900">
            पसंदीदा खरीद केंद्र एवं पिछला इतिहास (Center History)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">1. रामपुर उपार्जन केंद्र (Rampur)</span>
              <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold text-[10px]">प्राथमिक</span>
            </div>
            <p className="text-slate-600">कुल उपयोग: <strong>6 बार</strong> • अंतिम यात्रा: 12 Aug 2026</p>
            <p className="text-emerald-700 font-semibold">औसत प्रतीक्षा: ~32 मिनट</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">2. शिवपुर उपार्जन केंद्र (Shivpur)</span>
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[10px]">वैकल्पिक</span>
            </div>
            <p className="text-slate-600">कुल उपयोग: <strong>2 बार</strong> • अंतिम यात्रा: 15 Oct 2025</p>
            <p className="text-emerald-700 font-semibold">औसत प्रतीक्षा: ~20 मिनट</p>
          </div>
        </div>
      </div>

      {/* 5. Account Details Matrix & KYC */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <h4 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
          खाता एवं बायोमेट्रिक स्थिति
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 font-medium block">मोबाइल नंबर (Mobile)</span>
            <strong className="text-slate-900 text-sm font-bold mt-0.5 block">{farmer.mobile}</strong>
            <span className="text-[10px] text-emerald-700 font-bold">OTP प्रमाणीकृत</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 font-medium block">आधार संख्या (Aadhaar)</span>
            <strong className="text-slate-900 text-sm font-mono font-bold mt-0.5 block">{farmer.maskedAadhaar}</strong>
            <span className="text-[10px] text-emerald-700 font-bold">e-KYC पूर्ण</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 font-medium block">डीबीटी बैंक खाता (DBT Bank)</span>
            <strong className="text-slate-900 text-sm font-bold mt-0.5 block">{farmer.bankName}</strong>
            <span className="text-[10px] text-slate-600 font-mono">खाता: {farmer.maskedBankAcc} (IFSC: {farmer.ifsc})</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <span className="text-slate-500 font-medium block">कुल पंजीकृत कृषि रकबा (Land)</span>
            <strong className="text-slate-900 text-sm font-bold mt-0.5 block">{farmer.totalLandAcres} एकड़</strong>
            <span className="text-[10px] text-emerald-700 font-bold">खतौनी 7/12 सत्यापित</span>
          </div>
        </div>

        {/* Biometric Trigger */}
        <div className="pt-2">
          <button
            onClick={() => setIsBiometricModalOpen(true)}
            className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition shadow-xs"
          >
            <Fingerprint size={18} className="text-emerald-700" />
            <span>बायोमेट्रिक फिंगरप्रिंट e-KYC पुनः जांचें</span>
          </button>
        </div>
      </div>

      {/* 6. Privacy & Security Assurance Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3 text-xs">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
          <Lock className="w-4 h-4" />
        </div>
        <p className="leading-relaxed text-slate-300">
          <strong className="text-white">गोपनीयता सुरक्षा गारंटी:</strong> आपका आधार नंबर, बैंक खाता संख्या एवं भू-अभिलेख भारत सरकार के सुरक्षा मानकों के तहत सुरक्षित एवं एन्क्रिप्टेड हैं। यह जानकारी कभी भी सार्वजनिक रूप से प्रदर्शित नहीं की जाती।
        </p>
      </div>

      {/* 7. Language & Preference Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
        <h4 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Globe size={18} className="text-emerald-700" />
          <span>भाषा एवं प्रदर्शन प्राथमिकता (Preferences)</span>
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              पसंदीदा भाषा (Preferred Language)
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flagText} {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900">सरल मोड (Simple Mode)</h5>
              <p className="text-[11px] text-slate-500 font-medium">बुजुर्ग किसानों के लिए बड़े बटन व आवाज सहायता</p>
            </div>
            <button
              onClick={toggleSimpleMode}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition ${
                isSimpleMode ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {isSimpleMode ? 'चालू (ON)' : 'बंद (OFF)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
