import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wheat, 
  Ticket, 
  MapPin, 
  IndianRupee, 
  Bell, 
  Volume2, 
  HelpCircle,
  Smartphone,
  Sparkles
} from 'lucide-react';

export const SimpleModeDashboard: React.FC = () => {
  const { 
    activeBooking, 
    payment, 
    setActiveTab, 
    speak, 
    toggleSimpleMode, 
    setIsAiModalOpen,
    farmer,
    language 
  } = useApp();

  const handleTileClick = (tab: any, audioText: string) => {
    speak(audioText);
    setActiveTab(tab);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Simple Mode Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 p-4 rounded-3xl shadow-lg border-2 border-emerald-300 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <h2 className="text-xl sm:text-2xl font-black">सरल मोड (Simple Mode)</h2>
          </div>
          <p className="text-xs font-black text-slate-950 mt-0.5">
            {farmer.name} जी • टोकन: <span className="font-mono text-base font-black text-emerald-950">{activeBooking.tokenNumber}</span>
          </p>
        </div>

        <button
          onClick={() => {
            toggleSimpleMode();
            speak('सामान्य मोड चालू किया गया');
          }}
          className="px-3.5 py-2 bg-slate-950 text-cyan-300 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 border border-cyan-400/40"
        >
          <Smartphone size={15} />
          <span>सामान्य मोड</span>
        </button>
      </div>

      {/* Instant Audio Summary Bar */}
      <div className="bg-slate-950 text-white p-4 rounded-3xl flex items-center justify-between shadow-md border border-cyan-950">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow">
            📢
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-cyan-300">आपकी स्थिति एक क्लिक में सुनें</h3>
            <p className="text-xs text-slate-300">
              टोकन {activeBooking.tokenNumber} • आगे {activeBooking.farmersAhead} किसान
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            let msg = '';
            switch (language) {
              case 'pa':
                msg = `ਤੁਹਾਡਾ ਟੋਕਨ ${activeBooking.tokenNumber} ਹੈ। ਰਾਮਪੁਰ ਕੇਂਦਰ 'ਤੇ ਤੁਹਾਡੇ ਅੱਗੇ ${activeBooking.farmersAhead} ਕਿਸਾਨ ਹਨ। 70 ਪ੍ਰਤੀਸ਼ਤ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ, ਫਸਲ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕ ਕੇ 3:00 ਵਜੇ ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`;
                break;
              case 'mr':
                msg = `आपले टोकन ${activeBooking.tokenNumber} आहे. रामपूर केंद्रावर आपल्या पुढे ${activeBooking.farmersAhead} शेतकरी आहेत. 70% पावसाची शक्यता आहे, धान्य ताडपत्रीने झाकून दुपारी 3:00 वाजेपर्यंत निघावे.`;
                break;
              case 'gu':
                msg = `તમારો ટોકન ${activeBooking.tokenNumber} છે. રામપુર કેન્દ્ર પર તમારી આગળ ${activeBooking.farmersAhead} ખેડૂતો છે. 70% વરસાદની શક્યતા છે, પાકને તાડપત્રીથી ઢાંકીને 3:00 વાગ્યા સુધી નીકળો.`;
                break;
              case 'bn':
                msg = `আপনার টোকেন ${activeBooking.tokenNumber}। রামপুর কেন্দ্রে আপনার আগে ${activeBooking.farmersAhead} জন কৃষক আছেন। 70% বৃষ্টির সম্ভাবনা রয়েছে, ফসল ঢেকে 3:00 PM এর মধ্যে বের হন।`;
                break;
              case 'te':
                msg = `మీ టోకెన్ ${activeBooking.tokenNumber}. రాంపూర్ కేంద్రంలో మీ ముందు ${activeBooking.farmersAhead} మంది రైతులు ఉన్నారు. 70% వర్షం పడే అవకాశం ఉంది, పంటను కప్పి 3:00 PM కి బయలుదేరండి.`;
                break;
              case 'ta':
                msg = `உங்கள் டோக்கன் ${activeBooking.tokenNumber}. ராம்பூர் மையத்தில் உங்கள் முன் ${activeBooking.farmersAhead} உழவர்கள் உள்ளனர். 70% மழை வாய்ப்புள்ளது, பயிரை மூடி 3:00 PM மணிக்கு புறப்படுங்கள்.`;
                break;
              case 'kn':
                msg = `ನಿಮ್ಮ ಟೋಕನ್ ${activeBooking.tokenNumber}. ರಾಂಪುರ ಕೇಂದ್ರದಲ್ಲಿ ನಿಮ್ಮ ಮುಂದೆ ${activeBooking.farmersAhead} ರೈತರಿದ್ದಾರೆ. 70% ಮಳೆ ಸಂಭವನೀಯತೆ ಇದೆ, ಬೆಳೆಯನ್ನು ಮುಚ್ಚಿ 3:00 PM ಗೆ ಹೊರಡಿ.`;
                break;
              case 'ml':
                msg = `നിങ്ങളുടെ ടോക്കൺ ${activeBooking.tokenNumber} ആണ്. റാംപൂർ കേന്ദ്രത്തിൽ മുന്നിൽ ${activeBooking.farmersAhead} കർഷകരുണ്ട്. മഴ സാധ്യത 70% ആണ്, 3:00 PM ന് പുറപ്പെടുക.`;
                break;
              case 'or':
                msg = `ଆପଣଙ୍କ ଟୋକନ୍ ${activeBooking.tokenNumber}। ରାମପୁର କେନ୍ଦ୍ରରେ ଆପଣଙ୍କ ଆଗରେ ${activeBooking.farmersAhead} ଜଣ ଚାଷୀ ଅଛନ୍ତି। 70% ବର୍ଷା ସମ୍ଭାବନା ଅଛି, ଫସଲ ଘୋଡ଼ାଇ 3:00 PM ରେ ବାହାରନ୍ତୁ।`;
                break;
              case 'en':
                msg = `Your token is ${activeBooking.tokenNumber}. You have ${activeBooking.farmersAhead} farmers ahead at Rampur Center. 70% rain probability today, please cover crop and depart by 3:00 PM.`;
                break;
              default:
                msg = `आपका टोकन ${activeBooking.tokenNumber} है। रामपुर केंद्र पर आपके आगे ${activeBooking.farmersAhead} किसान हैं। मौसम में 70 प्रतिशत बारिश की संभावना है, फसल को तिरपाल से ढककर 3:00 PM तक निकलें।`;
            }
            speak(msg);
          }}
          className="px-4 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transform active:scale-95 shrink-0"
        >
          <Volume2 size={18} />
          <span>👩‍🌾 सुनें (दीदी आवाज़)</span>
        </button>
      </div>

      {/* SIMPLE MODE WEATHER & ADVISORY CARD */}
      <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-3xl p-5 border-4 border-sky-300 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between border-b-2 border-sky-200 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌦️</span>
            <div>
              <h3 className="text-2xl font-black text-slate-900">मौसम व किसान सलाह</h3>
              <p className="text-xs font-bold text-sky-800">रामपुर गांव • स्लॉट: 03:30 PM</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black text-slate-900 font-mono">28°C</div>
            <div className="text-xs font-black text-sky-700">🌧️ 70% बारिश</div>
          </div>
        </div>

        {/* 3 Large Action Points for Low Cognitive Load */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-900 font-black">
          <div className="p-3 bg-white rounded-2xl border-2 border-emerald-300 flex items-center gap-2.5 shadow-xs">
            <span className="text-2xl">🌾</span>
            <div>
              <span className="text-xs text-emerald-800 font-bold block">फसल सलाह</span>
              <span className="text-sm font-black">फसल को cover करें</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-amber-300 flex items-center gap-2.5 shadow-xs">
            <span className="text-2xl">🚜</span>
            <div>
              <span className="text-xs text-amber-800 font-bold block">यात्रा सलाह</span>
              <span className="text-sm font-black">3:00 PM तक निकलें</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border-2 border-sky-300 flex items-center gap-2.5 shadow-xs">
            <span className="text-2xl">🧳</span>
            <div>
              <span className="text-xs text-sky-800 font-bold block">सामग्री सलाह</span>
              <span className="text-sm font-black">Plastic साथ रखें</span>
            </div>
          </div>
        </div>

        {/* Big Audio & Full Details Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              speak('आज 28 डिग्री तापमान है और 70 प्रतिशत बारिश की संभावना है। फसल को तिरपाल से ढकें, 3:00 PM तक निकलें, और प्लास्टिक बैग में कागजात रखें।');
            }}
            className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md transition"
          >
            <Volume2 size={22} />
            <span>🔊 आवाज से सुनें</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('weather');
              speak('मौसम की पूरी जानकारी खोली गई');
            }}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>विस्तृत मौसम देखें →</span>
          </button>
        </div>
      </div>

      {/* 4 GIANT TILES FOR ZERO COGNITIVE LOAD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. MERA TOKEN - Emerald Green */}
        <button
          onClick={() => handleTileClick('queue', `मेरा टोकन ${activeBooking.tokenNumber}। आगे ${activeBooking.farmersAhead} किसान हैं।`)}
          className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-3xl shadow-xl flex items-center justify-between border-4 border-emerald-300 text-left transition transform active:scale-98 min-h-[120px]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎫</span>
              <h3 className="text-2xl font-black text-white">मेरा टोकन</h3>
            </div>
            <p className="text-4xl font-black font-mono mt-1 text-cyan-200">
              {activeBooking.tokenNumber}
            </p>
            <p className="text-xs font-black uppercase text-emerald-100 mt-1">
              आगे किसान: {activeBooking.farmersAhead} • समय: ~{activeBooking.estimatedWaitMinutes} मिनट
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-800/60 flex items-center justify-center text-cyan-200 font-bold">
            <Volume2 size={32} />
          </div>
        </button>

        {/* 2. MERI FASAL - Electric Sapphire Blue */}
        <button
          onClick={() => handleTileClick('procurement', 'मेरी फसल खरीद स्थिति 8 चरणों में जांचें')}
          className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-3xl shadow-xl flex items-center justify-between border-4 border-blue-400 text-left transition transform active:scale-98 min-h-[120px]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <h3 className="text-2xl font-black">मेरी फसल</h3>
            </div>
            <p className="text-lg font-extrabold text-blue-100 mt-1">
              गेहूं (39.5 क्विंटल)
            </p>
            <p className="text-xs font-bold text-cyan-300 mt-1">
              नमी जांच: पास (11.2%) • वजन पूर्ण
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center text-cyan-300 font-bold">
            <Wheat size={32} />
          </div>
        </button>

        {/* 3. MERA KENDRA - Vibrant Teal / Cyan */}
        <button
          onClick={() => handleTileClick('centers', 'खरीद केंद्र और कतार समय की सूची')}
          className="p-6 bg-gradient-to-br from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white rounded-3xl shadow-xl flex items-center justify-between border-4 border-cyan-300 text-left transition transform active:scale-98 min-h-[120px]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">📍</span>
              <h3 className="text-2xl font-black">मेरा केंद्र</h3>
            </div>
            <p className="text-lg font-extrabold text-teal-100 mt-1 truncate max-w-[200px]">
              {activeBooking.centerName}
            </p>
            <p className="text-xs font-bold text-cyan-200 mt-1">
              दूरी: 4.2 km • खुला है
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-teal-900 flex items-center justify-center text-white font-bold">
            <MapPin size={32} />
          </div>
        </button>

        {/* 4. MERA BHUGTAN - Deep Slate / Emerald Glow */}
        <button
          onClick={() => handleTileClick('payment', `फसल भुगतान कुल बानवे हजार रुपये बैंक प्रक्रिया में है`)}
          className="p-6 bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 hover:from-slate-800 hover:to-emerald-900 text-white rounded-3xl shadow-xl flex items-center justify-between border-4 border-emerald-400 text-left transition transform active:scale-98 min-h-[120px]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">💰</span>
              <h3 className="text-2xl font-black">मेरा भुगतान</h3>
            </div>
            <p className="text-3xl font-black font-mono text-emerald-400 mt-1">
              ₹92,000
            </p>
            <p className="text-xs font-bold text-cyan-200 mt-1">
              बैंक खाता: ****4521 (डीबीटी प्रक्रिया)
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-400/40">
            <IndianRupee size={32} />
          </div>
        </button>
      </div>

      {/* Voice Assistant Direct Button */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="w-full p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white rounded-3xl shadow-2xl border-4 border-cyan-300 flex items-center justify-center gap-3 font-black text-lg sm:text-xl transition transform active:scale-98"
      >
        <Sparkles size={28} className="text-cyan-200 animate-pulse" />
        <span>🎤 बोलकर पूछें (Ask Kisan AI Voice)</span>
      </button>
    </div>
  );
};
