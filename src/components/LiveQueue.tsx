import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ticket, 
  Clock, 
  Users, 
  Volume2, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Navigation, 
  QrCode, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const LiveQueue: React.FC = () => {
  const { activeBooking, simulateAdvanceQueue, t, speak, language } = useApp();

  const getAdviceConfig = (advice: typeof activeBooking.arrivalAdvice) => {
    switch (advice) {
      case 'too_early':
        return {
          bg: 'bg-teal-50 border-teal-300 text-teal-950',
          dot: 'bg-teal-600',
          title: t('waitAtHome'),
          desc: t('adviceTooEarly'),
        };
      case 'start_preparing':
        return {
          bg: 'bg-blue-50 border-blue-400 text-blue-950',
          dot: 'bg-cyan-500 animate-ping',
          title: t('startPrep'),
          desc: t('adviceStartPrep'),
        };
      case 'reach_now':
        return {
          bg: 'bg-emerald-100 border-emerald-500 text-emerald-950',
          dot: 'bg-emerald-600 animate-pulse',
          title: t('reachCenterNow'),
          desc: t('adviceReachNow'),
        };
      case 'your_turn':
        return {
          bg: 'bg-emerald-50 border-emerald-500 text-emerald-950 animate-pulse',
          dot: 'bg-emerald-600',
          title: t('yourTurnNow'),
          desc: t('adviceYourTurn'),
        };
    }
  };

  const adviceObj = getAdviceConfig(activeBooking.arrivalAdvice);

  // Generate dynamic tokens around current serving token
  const baseNum = 109;
  const userNum = 127;
  const tokenList = Array.from({ length: 25 }, (_, i) => {
    const num = baseNum + i;
    const isServing = activeBooking.currentServingToken === `A-${num}`;
    const isUser = activeBooking.tokenNumber === `A-${num}`;
    const isPassed = num < Number(activeBooking.currentServingToken.replace('A-', ''));
    
    return {
      token: `A-${num}`,
      isServing,
      isUser,
      isPassed,
      counter: (num % 4) + 1,
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title & Live Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('liveQueueTitle')} (Live Queue Status)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {activeBooking.centerName} • स्लॉट: {activeBooking.timeSlot}
          </p>
        </div>

        <button
          onClick={() => {
            const txt = language === 'hi'
              ? `रामपुर केंद्र पर आपकी टोकन संख्या ${activeBooking.tokenNumber} है। वर्तमान में टोकन ${activeBooking.currentServingToken} चल रहा है। आपके आगे ${activeBooking.farmersAhead} किसान हैं और प्रतीक्षा समय ${activeBooking.estimatedWaitMinutes} मिनट है।`
              : `At Rampur Center, your token is ${activeBooking.tokenNumber}. Currently serving is ${activeBooking.currentServingToken} with ${activeBooking.farmersAhead} farmers ahead.`;
            speak(txt);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-black transition border border-emerald-400 shadow-sm"
        >
          <Volume2 size={16} className="text-white" />
          <span>{t('listenAudio')} (Voice)</span>
        </button>
      </div>

      {/* DYNAMIC SMART ARRIVAL ADVICE HERO BANNER */}
      <div className={`p-5 rounded-3xl border-2 flex items-start gap-4 transition-all shadow-md ${adviceObj.bg}`}>
        <div className={`w-4 h-4 rounded-full mt-1 shrink-0 ${adviceObj.dot}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base sm:text-lg">{adviceObj.title}</h3>
            <span className="text-xs font-mono font-bold bg-white/80 px-2 py-0.5 rounded-md border border-teal-200 text-slate-900">
              AI Smart Dispatch
            </span>
          </div>
          <p className="text-xs sm:text-sm mt-1 leading-relaxed font-medium">
            {adviceObj.desc}
          </p>
        </div>
      </div>

      {/* DUAL TOKEN COMPARISON HERO CARD */}
      <div className="bg-slate-950 text-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-cyan-950 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Currently Serving Token */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-center relative overflow-hidden">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest block">
              {t('currentlyServing')}
            </span>
            <h3 className="text-5xl sm:text-6xl font-black font-mono text-cyan-400 my-2">
              {activeBooking.currentServingToken}
            </h3>
            <span className="text-xs text-slate-300 font-bold bg-slate-800 px-3 py-1 rounded-full inline-block">
              काउंटर #{activeBooking.counterNumber} पर जारी
            </span>
          </div>

          {/* Your Token */}
          <div className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 p-5 rounded-2xl text-center relative overflow-hidden shadow-lg border-2 border-emerald-300">
            <div className="absolute top-2 right-2 bg-slate-950 text-cyan-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
              YOU (आप)
            </div>
            <span className="text-xs font-black uppercase tracking-widest block text-slate-950">
              {t('yourToken')}
            </span>
            <h3 className="text-5xl sm:text-6xl font-black font-mono my-2 text-slate-950">
              {activeBooking.tokenNumber}
            </h3>
            <span className="text-xs text-slate-950 font-black bg-white/90 px-3 py-1 rounded-full inline-block shadow-sm">
              स्लॉट: {activeBooking.timeSlot}
            </span>
          </div>
        </div>

        {/* Live Metrics: Ahead & Wait Time */}
        <div className="grid grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase block">{t('farmersAhead')}</span>
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
              {activeBooking.farmersAhead}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">किसान आपके आगे</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-bold uppercase block">{t('estimatedWait')}</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              {activeBooking.estimatedWaitMinutes}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">{t('minutes')} (अनुमानित)</span>
          </div>
        </div>

        {/* Queue Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>दैनिक कतार प्रगति (Daily Queue Progress)</span>
            <span className="text-cyan-300 font-mono">
              {activeBooking.farmersAhead === 0 ? '100% (Your Turn)' : '72% Completed'}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: activeBooking.farmersAhead === 0 ? '100%' : '72%' }}
            />
          </div>
        </div>

        {/* Demo Fast Forward Button */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            🎮 <strong>SIH Demo:</strong> कतार में आगे बढ़ने का अनुकरण करें
          </p>
          <button
            onClick={simulateAdvanceQueue}
            className="py-2.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black text-xs rounded-xl flex items-center gap-2 transition shadow-md w-full sm:w-auto justify-center"
          >
            <Play size={14} className="text-cyan-200" />
            <span>कतार आगे बढ़ाएं (Fast Forward Queue)</span>
          </button>
        </div>
      </div>

      {/* LIVE TOKEN STREAM / QUEUE VISUALIZER */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-emerald-600" />
            <span>लाइव कतार अनुक्रम (Live Token Sequence)</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            काउंटर 1, 2, 3, 4 सक्रिय
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tokenList.map((item) => {
              return (
                <div
                  key={item.token}
                  className={`p-3 rounded-2xl border-2 text-center w-24 shrink-0 transition ${
                    item.isUser
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-400 border-emerald-500 text-slate-950 font-black scale-105 shadow-md'
                      : item.isServing
                      ? 'bg-cyan-100 border-cyan-500 text-cyan-950 font-black animate-pulse'
                      : item.isPassed
                      ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-mono font-bold block">{item.token}</span>
                  <span className="text-[10px] uppercase font-bold block mt-1">
                    {item.isUser ? '⭐ YOU' : item.isServing ? '🟢 SERVING' : item.isPassed ? '✓ PASSED' : `C#${item.counter}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
