import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Clock, 
  Sparkles,
  RefreshCw,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AlternativeCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlternativeCenterModal: React.FC<AlternativeCenterModalProps> = ({ isOpen, onClose }) => {
  const { activeBooking, setActiveBooking, centers, speak, language } = useApp();
  const [isSwitched, setIsSwitched] = useState(false);

  if (!isOpen) return null;

  const currentCenter = centers.find(c => c.id === activeBooking.centerId) || centers[0];
  const altCenter = centers.find(c => c.id === 'center-2') || centers[1];

  const handleSwitchCenter = () => {
    setActiveBooking(prev => ({
      ...prev,
      centerId: altCenter.id,
      centerName: altCenter.name,
      centerHindiName: altCenter.hindiName,
      tokenNumber: 'B-048',
      farmersAhead: 6,
      currentServingToken: 'B-042',
      estimatedWaitMinutes: 18,
      timeSlot: '11:00 AM – 11:30 AM',
      arrivalAdvice: 'start_preparing',
    }));

    setIsSwitched(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    speak(language === 'hi' 
      ? 'आपका केंद्र सफलतापूर्वक शिवपुर क्रय केंद्र पर बदल दिया गया है। आपका नया टोकन B-048 है।' 
      : 'Your center has been successfully switched to Shivpur Center. Your new token is B-048.');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-amber-600 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-700/60 flex items-center justify-center border border-amber-400/30">
                <AlertTriangle className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  स्मार्ट वैकल्पिक केंद्र सुझाव (Alternative Center)
                </h3>
                <p className="text-xs text-amber-100">
                  भारी भीड़ से बचने हेतु KisanSetu AI अनुशंसा
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-amber-100 hover:text-white hover:bg-amber-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {!isSwitched ? (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
                  <strong>वर्तमान स्थिति:</strong> आपके वर्तमान केंद्र (<strong>{currentCenter.name}</strong>) पर आज कतार अत्यधिक लंबी है ({currentCenter.currentQueue} किसान, प्रतीक्षा ~140 मिनट)।
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Current Center */}
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
                    <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                      वर्तमान बुक केंद्र
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {currentCenter.name}
                    </div>
                    <div className="space-y-1 text-slate-600 text-xs">
                      <div className="flex items-center justify-between">
                        <span>दूरी:</span>
                        <span className="font-semibold text-slate-800">{currentCenter.distanceKm} km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>कतार:</span>
                        <span className="font-bold text-rose-700">{currentCenter.currentQueue} किसान</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>प्रतीक्षा:</span>
                        <span className="font-bold text-rose-700">~{currentCenter.estimatedWaitMinutes} मिनट</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Alternative Center */}
                  <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/50 space-y-2 relative shadow-sm">
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      अनुशंसित
                    </div>
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      ⭐ बेहतर विकल्प
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {altCenter.name}
                    </div>
                    <div className="space-y-1 text-slate-600 text-xs">
                      <div className="flex items-center justify-between">
                        <span>दूरी:</span>
                        <span className="font-semibold text-slate-800">{altCenter.distanceKm} km (+2.9 km)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>कतार:</span>
                        <span className="font-bold text-emerald-700">{altCenter.currentQueue} किसान</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>प्रतीक्षा:</span>
                        <span className="font-bold text-emerald-700">~{altCenter.estimatedWaitMinutes} मिनट</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value Statement */}
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    शिवपुर केंद्र 3 किमी ज्यादा दूर है, लेकिन वहां कतार कम है जिससे आपके <strong>लगभग 1 घंटा 45 मिनट</strong> बचेंगे।
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    रामपुर ही रखें
                  </button>

                  <button
                    type="button"
                    onClick={handleSwitchCenter}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    शिवपुर केंद्र पर स्विच करें (Switch Center)
                  </button>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  केंद्र सफलतापूर्वक बदल दिया गया है! 🎉
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  आपका नया स्लॉट <strong>{altCenter.name}</strong> पर नया टोकन <strong>B-048</strong> के साथ सक्रिय हो गया है। प्रतीक्षा समय अब मात्र 18 मिनट है।
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                  >
                    नया टोकन व लाइव कतार देखें
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
