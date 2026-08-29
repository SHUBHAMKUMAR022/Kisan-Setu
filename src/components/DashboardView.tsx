import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarCheck, 
  Ticket, 
  MapPin, 
  Wheat, 
  IndianRupee, 
  BarChart3, 
  Bell, 
  History, 
  HelpCircle, 
  Volume2, 
  Navigation, 
  Clock, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  CloudSun,
  CloudRain,
  Camera,
  CheckSquare,
  FileText,
  Award,
  RefreshCw,
  Sun,
  Droplets,
  Wind,
  ShieldAlert,
  Compass,
  Truck
} from 'lucide-react';
import { SimpleModeDashboard } from './SimpleModeDashboard';
import { FarmerJourneyNav } from './FarmerJourneyNav';
import { 
  WeatherService, 
  WeatherData, 
  WeatherConditionType, 
  AVAILABLE_LOCATIONS, 
  WEATHER_PRESETS 
} from '../services/weatherService';

export const DashboardView: React.FC = () => {
  const { 
    farmer, 
    activeBooking, 
    procurementDetail, 
    payment, 
    setActiveTab, 
    t, 
    speak, 
    isSimpleMode, 
    simulateAdvanceQueue, 
    simulateAdvanceStage, 
    simulatePaymentCredit,
    setIsAiModalOpen,
    setIsPreArrivalModalOpen,
    setIsCropScanModalOpen,
    setIsReceiptModalOpen,
    setIsAlternativeModalOpen,
    weatherState,
    centerAlertActive,
    language
  } = useApp();

  if (isSimpleMode) {
    return <SimpleModeDashboard />;
  }

  // Derive dynamic weather data based on current state & language
  const defaultLoc = AVAILABLE_LOCATIONS[0];
  const locName = defaultLoc.localizedNames?.[language] || defaultLoc.name;
  const centerName = defaultLoc.localizedCenterNames?.[language] || defaultLoc.centerName;

  const currentCondition: WeatherConditionType = weatherState === 'rain_alert' ? 'rain' : 'clear';
  const weather: WeatherData = {
    ...WeatherService.getCurrentWeather(language),
    ...WEATHER_PRESETS[currentCondition],
    condition: currentCondition,
    locationName: locName,
    locationHindi: defaultLoc.hindiName,
    nearestCenterName: centerName,
    nearestCenterHindi: defaultLoc.centerHindi,
    distanceToCenterKm: defaultLoc.distanceToCenterKm,
  };

  const advisory = WeatherService.getFarmerAdvisory(
    weather,
    activeBooking.timeSlot || '10:30 AM',
    30,
    activeBooking.farmersAhead || 18,
    language
  );

  const getAdviceConfig = (advice: typeof activeBooking.arrivalAdvice) => {
    switch (advice) {
      case 'too_early':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
          dot: 'bg-emerald-600',
          statusPill: '🟢 अभी घर पर प्रतीक्षा करें (Wait at Home)',
          label: t('waitAtHome'),
          desc: t('adviceTooEarly'),
        };
      case 'start_preparing':
        return {
          bg: 'bg-amber-50 border-amber-400 text-amber-950',
          dot: 'bg-amber-500 animate-ping',
          statusPill: '🟡 तैयारी शुरू करें (Start Preparing)',
          label: t('startPrep'),
          desc: t('adviceStartPrep'),
        };
      case 'reach_now':
        return {
          bg: 'bg-rose-50 border-rose-500 text-rose-950',
          dot: 'bg-rose-600 animate-pulse',
          statusPill: '🔴 अब केंद्र के लिए निकलें (Reach Center Now)',
          label: t('reachCenterNow'),
          desc: t('adviceReachNow'),
        };
      case 'your_turn':
        return {
          bg: 'bg-emerald-50 border-emerald-600 text-emerald-950 animate-pulse',
          dot: 'bg-emerald-600',
          statusPill: '⭐ आपकी बारी आ गई है! (Your Turn)',
          label: t('yourTurnNow'),
          desc: t('adviceYourTurn'),
        };
    }
  };

  const adviceObj = getAdviceConfig(activeBooking.arrivalAdvice);

  const handleVoiceAdvisory = () => {
    const summary = WeatherService.getVoiceSummary(weather, advisory, language);
    speak(summary);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* 1. Personalized Farmer Greeting & Smart Profile Insight */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-5 rounded-3xl shadow-xl border border-emerald-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {t('greeting')}, {farmer.name} जी
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
            गांव: <strong className="text-white">{farmer.village}</strong> | जिला: <strong className="text-white">{farmer.district}</strong> | किसान आईडी: <span className="font-mono text-emerald-400 font-bold">{farmer.farmerId}</span>
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-900/60 rounded-full text-[11px] text-emerald-200 border border-emerald-700/50 mt-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>आप हर बार गेहूं की लगभग 40 क्विंटल फसल लेकर आते हैं। स्लॉट स्वतः अनुकूलित है।</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio read aloud button */}
          <button
            onClick={() => {
              let textToRead = `नमस्ते ${farmer.name} जी! आपका टोकन ${activeBooking.tokenNumber} है। आपके आगे ${activeBooking.farmersAhead} किसान हैं और अनुमानित प्रतीक्षा समय ${activeBooking.estimatedWaitMinutes} मिनट है। ${adviceObj.desc}`;
              speak(textToRead);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 text-rose-300 rounded-xl text-xs font-bold transition shadow-sm border border-rose-800/60 shrink-0"
            title="Listen status in Indian Female Voice"
          >
            <Volume2 size={16} className="text-pink-400" />
            <span>👩‍🌾 {t('listenAudio')} (दीदी आवाज़)</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition shrink-0"
          >
            <span>👩‍🌾</span>
            <span>किसान सहेली AI</span>
          </button>
        </div>
      </div>

      {/* 2. Emergency / Overcrowded Center Alert Banner (If Active) */}
      {centerAlertActive && (
        <div className="bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-2 border-amber-300 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-sm">
                रामपुर क्रय केंद्र पर भारी भीड़ (प्रतीक्षा ~140 मिनट)
              </h4>
              <p className="text-xs font-medium text-slate-900">
                शिवपुर केंद्र पर मात्र 17 किसान हैं। स्विच करके 1 घंटा 45 मिनट बचाएं।
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAlternativeModalOpen(true)}
            className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shrink-0 shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>शिवपुर केंद्र पर बदलें</span>
          </button>
        </div>
      )}

      {/* 3. CORE HERO CARD: Today's Procurement Status & Live Smart Token */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-500/30 overflow-hidden">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"></span>
            <h3 className="font-black text-sm sm:text-base tracking-wide uppercase">
              {t('todayProcurement')} • स्मार्ट टोकन स्टेटस
            </h3>
          </div>
          <span className="bg-slate-950/80 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold border border-emerald-400/40">
            {adviceObj.statusPill}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Center Name & Slot info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">खरीद केंद्र (Center)</span>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-1.5">
                <MapPin size={20} className="text-emerald-600 shrink-0" />
                <span>{activeBooking.centerName}</span>
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                फसल: <strong className="text-emerald-900">{activeBooking.crop}</strong> ({activeBooking.quantityQuintal} क्विंटल) • दूरी: <strong>4.2 किमी (~30 मिनट)</strong>
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-left sm:text-right">
              <span className="text-xs font-bold text-emerald-900 block">{t('yourSlot')}</span>
              <span className="text-sm sm:text-base font-black text-slate-950 font-mono">
                {activeBooking.timeSlot}
              </span>
              <span className="text-[11px] text-slate-500 block font-medium">{activeBooking.bookingDate}</span>
            </div>
          </div>

          {/* 3 Core Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Token */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-4 rounded-2xl flex flex-col justify-between shadow-md border border-emerald-900/50">
              <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
                <span>{t('yourToken')}</span>
                <Ticket size={16} className="text-emerald-400" />
              </div>
              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono tracking-wider">
                  {activeBooking.tokenNumber}
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium">
                {t('currentlyServing')}: <strong className="text-emerald-400">{activeBooking.currentServingToken}</strong>
              </span>
            </div>

            {/* Farmers Ahead */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-900 text-xs font-bold">
                <span>{t('farmersAhead')}</span>
                <Users size={16} className="text-emerald-700" />
              </div>
              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">
                  {activeBooking.farmersAhead}
                </span>
                <span className="text-xs text-slate-600 ml-1 font-bold">किसान</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                काउंटर #{activeBooking.counterNumber} पर जारी
              </span>
            </div>

            {/* Estimated Waiting Time */}
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-950 text-xs font-bold">
                <span>{t('estimatedWait')}</span>
                <Clock size={16} className="text-emerald-600" />
              </div>
              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">
                  {activeBooking.estimatedWaitMinutes}
                </span>
                <span className="text-xs text-emerald-950 ml-1 font-bold">{t('minutes')}</span>
              </div>
              <span className="text-[11px] text-emerald-900 font-medium">
                औसत गति: ~2 मिनट / किसान
              </span>
            </div>
          </div>

          {/* Smart Arrival Notification Box */}
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${adviceObj.bg}`}>
            <div className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${adviceObj.dot}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-black text-sm sm:text-base">{adviceObj.label}</h4>
                <button
                  onClick={() => speak(adviceObj.desc)}
                  className="text-xs font-bold flex items-center gap-1 hover:underline shrink-0 text-slate-950"
                >
                  <Volume2 size={13} />
                  <span>सुनिए</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm mt-0.5 leading-relaxed font-medium">
                {adviceObj.desc}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              id="btn-view-live-queue"
              onClick={() => setActiveTab('queue')}
              className="py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Ticket size={20} />
              <span>{t('viewLiveQueue')}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setIsPreArrivalModalOpen(true)}
              className="py-3.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-black text-sm sm:text-base rounded-2xl transition flex items-center justify-center gap-2"
            >
              <CheckSquare size={18} className="text-amber-700" />
              <span>जाने से पहले जांचें (Before You Leave) 🚜</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. DUAL SMART COLUMNS: "कब निकलें?" & "आज क्या लेकर जाएँ?" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card A: 🚜 कब निकलें? (When to Leave Advice) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  🚜 कब निकलें? (When to Leave?)
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                AI आगमन गणना
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span>स्लॉट समय:</span>
                <span className="font-bold text-slate-900">{activeBooking.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>ट्रॉली यात्रा समय:</span>
                <span className="font-bold text-slate-900">~30 मिनट (4.2 km)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>आगे कतार:</span>
                <span className="font-bold text-slate-900">{activeBooking.farmersAhead} किसान (~{activeBooking.estimatedWaitMinutes} मिनट)</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between text-emerald-900 font-bold">
                <span>⭐ अनुशंसित प्रस्थान समय:</span>
                <span className="text-sm font-mono text-emerald-700">{advisory.recommendedDepartureTime}</span>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setIsPreArrivalModalOpen(true)}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>चेकलिस्ट देखें व यात्रा शुरू करें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card B: 🧳 आज क्या लेकर जाएँ? (Smart What to Bring) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  🧳 आज क्या लेकर जाएँ?
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                4 अनिवार्य कागजात
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">आधार / KCC</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">खतौनी / खसरा</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">बैंक पासबुक</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">e-टोकन SMS</span>
              </div>
            </div>

            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
              <span>🌧️ मौसम सलाह: {weatherState === 'rain_alert' ? 'भारी बारिश है! तिरपाल से ट्रॉली सुरक्षित ढकें।' : 'साफ़ मौसम है। तिरपाल साथ अवश्य रखें।'}</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setIsCropScanModalOpen(true)}
              className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Camera className="w-3.5 h-3.5 text-amber-700" />
              <span>फसल नमी पूर्व-जांचें (Crop Pre-Check)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. PAYMENT MINI TRACKER & DIGITAL RECEIPT (e-J-Form) */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-emerald-800/60 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-sm sm:text-base">
              भुगतान स्थिति (DBT Payment Status)
            </h4>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ₹{procurementDetail.totalPayableAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              ({procurementDetail.acceptedQuantityQuintal} क्विंटल गेहूं @ ₹{procurementDetail.mspRatePerQuintal}/Qtl)
            </span>
          </div>
          <p className="text-xs text-slate-400">
            e-J-Form: <span className="font-mono text-slate-200">{procurementDetail.eJFormNumber}</span> • बैंक: {farmer.bankName} ({farmer.maskedBankAcc})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>रसीद देखें (e-J-Form)</span>
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <span>ट्रैकर खोलें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. DEDICATED LIVE WEATHER & AGRICULTURAL ADVISORY INTERFACE */}
      <div className={`rounded-3xl p-5 shadow-lg border-2 transition-all ${
        weatherState === 'rain_alert'
          ? 'bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950 text-white border-sky-400/60'
          : 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white border-emerald-500/40'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
              weatherState === 'rain_alert' ? 'bg-sky-500/30 text-sky-300 border border-sky-400/40' : 'bg-amber-400/20 text-amber-300 border border-amber-300/30'
            }`}>
              {weather.iconEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                  <span>मौसम एवं कृषि सुरक्षा सलाह (Live Weather & Advisory)</span>
                </h3>
                {weatherState === 'rain_alert' && (
                  <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                    बारिश चेतावनी ⚠️
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <MapPin size={13} className="text-emerald-400" />
                <span>{farmer.village}, {farmer.district} • {weather.nearestCenterName} (4.2 km)</span>
              </p>
            </div>
          </div>

          {/* Audio voice advisory button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceAdvisory}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md shrink-0"
              title="Listen complete agricultural weather advisory in Indian Female Voice"
            >
              <Volume2 size={15} />
              <span>👩‍🌾 मौसम सलाह सुनें</span>
            </button>

            <button
              onClick={() => setActiveTab('weather')}
              className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition shrink-0 border border-white/15"
            >
              <span>विस्तृत पूर्वानुमान</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Weather Metrics & Live Crop Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4">
          {/* Weather Quick Readings */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 font-medium">तापमान (Temp)</span>
              <div className="my-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-mono">{weather.temperatureC}°C</span>
                <span className="text-[11px] text-slate-400 font-medium">({weather.conditionLabel})</span>
              </div>
              <span className="text-[10px] text-slate-400">महसूस: {weather.feelsLikeC}°C</span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <CloudRain size={12} className="text-sky-300" />
                <span>बारिश संभावना</span>
              </span>
              <div className="my-1">
                <span className={`text-2xl font-black font-mono ${weather.rainProbabilityPercent > 40 ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {weather.rainProbabilityPercent}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {weather.rainProbabilityPercent > 40 ? 'उच्च संभावना' : 'अनुकूल स्थिति'}
              </span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Droplets size={12} className="text-teal-300" />
                <span>हवा में नमी</span>
              </span>
              <div className="my-1">
                <span className="text-xl font-black text-teal-300 font-mono">{weather.humidityPercent}%</span>
              </div>
              <span className="text-[10px] text-slate-400">अनाज नमी सीमा: &lt;12%</span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Wind size={12} className="text-cyan-300" />
                <span>हवा की गति</span>
              </span>
              <div className="my-1">
                <span className="text-xl font-black text-cyan-300 font-mono">{weather.windSpeedKmH} <span className="text-xs font-normal">km/h</span></span>
              </div>
              <span className="text-[10px] text-slate-400">दिशा: उत्तर-पश्चिम</span>
            </div>
          </div>

          {/* Crop & Procurement Advisory Card */}
          <div className="lg:col-span-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold mt-0.5">
                  🌾
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-amber-200">
                    {advisory.headline}
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium mt-1">
                    {advisory.cropAdvice}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 bg-black/25 rounded-xl border border-white/10 text-xs flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">
                    यात्रा सलाह: <strong className="text-emerald-300">{advisory.recommendedDepartureTime}</strong> तक निकलें
                  </span>
                </div>

                <div className="p-2.5 bg-black/25 rounded-xl border border-white/10 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200">
                    सुरक्षा: <strong>तिरपाल व दस्तावेज़ थैली</strong> साथ रखें
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-300">
              <span>🎯 क्रय केंद्र स्थिति: <strong>{activeBooking.centerName}</strong> (कतार सामान्य गति पर)</span>
              <button 
                onClick={() => setIsCropScanModalOpen(true)}
                className="text-amber-300 hover:underline font-bold flex items-center gap-1"
              >
                <span>📷 फसल की नमी अभी जांचें</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. MASTER 5-STEP FARMER JOURNEY FLOW */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-700" />
            <span>उपार्जन यात्रा ट्रैकर (5-Step Farmer Journey Tracker)</span>
          </h3>
          <span className="text-[11px] font-bold text-slate-500">चरण अनुसार स्थिति व दिशा-निर्देश</span>
        </div>
        <FarmerJourneyNav />
      </div>

      {/* 8. QUICK ACTIONS GRID */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <span>त्वरित सेवाएं (Quick Actions)</span>
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Weather & Advisory (Prominent) */}
          <div 
            onClick={() => setActiveTab('weather')}
            className="p-4 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-100 group-hover:bg-sky-600 group-hover:text-white text-sky-800 flex items-center justify-center font-bold text-xl transition">
              <CloudSun size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-950">
                {t('weatherAdvisory')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {weather.temperatureC}°C • {weather.rainProbabilityPercent}% बारिश संभावना
              </p>
            </div>
          </div>

          {/* Book Slot */}
          <div 
            onClick={() => setActiveTab('booking')}
            className="p-4 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 flex items-center justify-center font-bold text-xl transition">
              <CalendarCheck size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-900">
                {t('bookSlot')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">नया स्लॉट बुक करें</p>
            </div>
          </div>

          {/* My Token & Live Queue */}
          <div 
            onClick={() => setActiveTab('queue')}
            className="p-4 bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-cyan-500 group-hover:text-white text-cyan-800 flex items-center justify-center font-bold text-xl transition">
              <Ticket size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-950">
                {t('myToken')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">टोकन {activeBooking.tokenNumber} लाइव कतार</p>
            </div>
          </div>

          {/* Centers */}
          <div 
            onClick={() => setActiveTab('centers')}
            className="p-4 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 group-hover:bg-teal-600 group-hover:text-white text-teal-800 flex items-center justify-center font-bold text-xl transition">
              <MapPin size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-teal-900">
                {t('procCenters')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">निकटतम मंडी व कतार समय</p>
            </div>
          </div>

          {/* My Procurement Tracker */}
          <div 
            onClick={() => setActiveTab('procurement')}
            className="p-4 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 flex items-center justify-center font-bold text-xl transition">
              <Wheat size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-950">
                {t('myProcurement')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">तौल व गुणवत्ता जांच (8 चरण)</p>
            </div>
          </div>

          {/* Payment Status */}
          <div 
            onClick={() => setActiveTab('payment')}
            className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-900 flex items-center justify-center font-bold text-xl transition">
              <IndianRupee size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-950">
                {t('paymentStatus')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">₹92,000 बैंक DBT स्थिति</p>
            </div>
          </div>

          {/* Crop Yield & Earnings */}
          <div 
            onClick={() => setActiveTab('yield')}
            className="p-4 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 group-hover:bg-teal-600 group-hover:text-white text-teal-900 flex items-center justify-center font-bold text-xl transition">
              <BarChart3 size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-teal-950">
                {t('yieldDashboard')}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">उपज ग्राफ व आय चार्ट</p>
            </div>
          </div>

          {/* Crop Pre-Check Photo Analysis */}
          <div 
            onClick={() => setIsCropScanModalOpen(true)}
            className="p-4 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-500 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-600 group-hover:text-white text-amber-900 flex items-center justify-center font-bold text-xl transition">
              <Camera size={24} />
            </div>
            <div className="mt-3">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-950">
                फसल पूर्व-जांच
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">नमी व स्वच्छता AI स्कैनर</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

