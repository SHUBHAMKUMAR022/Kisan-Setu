import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Sparkles, 
  Users, 
  CloudRain, 
  Sun, 
  CheckCircle2, 
  IndianRupee, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SihDemoControllerProps {
  weatherState: 'clear' | 'rain_alert';
  setWeatherState: (state: 'clear' | 'rain_alert') => void;
  centerAlertActive: boolean;
  setCenterAlertActive: (active: boolean) => void;
}

export const SihDemoController: React.FC<SihDemoControllerProps> = ({
  weatherState,
  setWeatherState,
  centerAlertActive,
  setCenterAlertActive,
}) => {
  const { 
    activeBooking, 
    setActiveBooking, 
    procurementDetail, 
    setProcurementDetail, 
    payment, 
    setPayment, 
    isOffline, 
    setIsOffline,
    simulatePaymentCredit,
    speak,
    language
  } = useApp();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Quick Queue Setter
  const setExactQueue = (count: number) => {
    setActiveBooking(prev => {
      let advice: typeof prev.arrivalAdvice = 'too_early';
      let serving = 'A-109';
      let wait = count * 2;

      if (count <= 0) {
        advice = 'your_turn';
        serving = 'A-127';
        wait = 0;
        speak(language === 'hi' 
          ? 'टोकन A-127, आपकी बारी आ गई है! कृपया तुरंत काउंटर 2 पर जाएं।' 
          : 'Token A-127, it is your turn! Please proceed to Counter 2.');
      } else if (count <= 2) {
        advice = 'reach_now';
        serving = 'A-125';
      } else if (count <= 5) {
        advice = 'reach_now';
        serving = 'A-122';
      } else if (count <= 10) {
        advice = 'start_preparing';
        serving = 'A-117';
      } else {
        advice = 'start_preparing';
        serving = 'A-109';
      }

      return {
        ...prev,
        farmersAhead: count,
        currentServingToken: serving,
        estimatedWaitMinutes: wait,
        arrivalAdvice: advice,
      };
    });
  };

  // Quick Stage Setter (0 to 7)
  const setProcurementStageIndex = (stageIdx: number) => {
    setProcurementDetail(prev => {
      const updatedStages = prev.stages.map((stg, idx) => {
        if (idx < stageIdx) return { ...stg, status: 'completed' as const };
        if (idx === stageIdx) return { ...stg, status: 'current' as const };
        return { ...stg, status: 'pending' as const };
      });

      if (stageIdx >= 7) {
        simulatePaymentCredit();
      }

      return {
        ...prev,
        currentStageIndex: stageIdx,
        stages: updatedStages,
      };
    });
  };

  const handleResetDemo = () => {
    setExactQueue(18);
    setProcurementStageIndex(5);
    setWeatherState('clear');
    setCenterAlertActive(false);
    setIsOffline(false);
    setPayment(prev => ({
      ...prev,
      status: 'bank_processing',
    }));
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      {/* Trigger Pill Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-600 to-emerald-700 text-white rounded-full shadow-xl border-2 border-white hover:scale-105 transition-all text-xs font-black tracking-wide"
        >
          <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>SIH 2026 Live Demo Controller</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Expanded Control Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 bg-slate-900/95 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 backdrop-blur-md space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
                  SIH 2026 Simulation Panel
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetDemo}
                  title="Reset Demo to Initial State"
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[10px] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 1. Queue Simulator */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" /> कतार सिमुलेटर (Queue Ahead):
                </span>
                <span className="font-mono text-amber-400 font-bold">{activeBooking.farmersAhead} किसान</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                {[18, 10, 5, 2, 0].map((num) => (
                  <button
                    key={num}
                    onClick={() => setExactQueue(num)}
                    className={`py-1 rounded-lg text-xs font-bold font-mono transition ${
                      activeBooking.farmersAhead === num
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {num === 0 ? 'बारी!' : num}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Weather Simulator */}
            <div className="space-y-1">
              <div className="text-[11px] text-slate-300 font-medium">
                🌦️ मौसम सिमुलेटर (Weather Condition):
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setWeatherState('clear')}
                  className={`py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    weatherState === 'clear'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> ☀️ साफ़ धूप (Clear)
                </button>
                <button
                  onClick={() => setWeatherState('rain_alert')}
                  className={`py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    weatherState === 'rain_alert'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" /> 🌧️ बारिश अलर्ट
                </button>
              </div>
            </div>

            {/* 3. Procurement Stages Simulator */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>🌾 खरीद चरण (Procurement Lifecycle):</span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Step {procurementDetail.currentStageIndex + 1}/8
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-0.5 text-[10px]">
                {[
                  { label: 'Booked', idx: 0 },
                  { label: 'Arrived', idx: 1 },
                  { label: 'Docs', idx: 2 },
                  { label: 'Quality', idx: 3 },
                  { label: 'Weighing', idx: 4 },
                  { label: 'Complete', idx: 5 },
                  { label: 'PFMS Pay', idx: 6 },
                  { label: 'Credited', idx: 7 },
                ].map((stg) => (
                  <button
                    key={stg.idx}
                    onClick={() => setProcurementStageIndex(stg.idx)}
                    className={`py-1 rounded-md font-semibold transition ${
                      procurementDetail.currentStageIndex === stg.idx
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Center Overcrowding & Offline Toggles */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800">
              <button
                onClick={() => setCenterAlertActive(!centerAlertActive)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  centerAlertActive
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {centerAlertActive ? 'Center भीड़ अलर्ट (On)' : 'Center सामान्य (Normal)'}
              </button>

              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                  isOffline
                    ? 'bg-rose-700 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" /> Offline Mode (On)
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" /> Online Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
