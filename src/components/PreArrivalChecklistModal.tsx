import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Navigation, 
  Clock, 
  MapPin, 
  CloudSun, 
  ShieldCheck, 
  FileCheck, 
  Sparkles,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface PreArrivalChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreArrivalChecklistModal: React.FC<PreArrivalChecklistModalProps> = ({ isOpen, onClose }) => {
  const { activeBooking, farmer, setActiveTab, speak } = useApp();

  const [checklist, setChecklist] = useState([
    { id: 'doc-1', label: 'किसान आधार कार्ड / पहचान पत्र (Aadhaar / KCC)', isDoc: true, checked: true, required: true },
    { id: 'doc-2', label: 'भूमि खतौनी / खसरा प्रति (Land Record / Khatauni)', isDoc: true, checked: true, required: true },
    { id: 'doc-3', label: 'बैंक पासबुक / DBT खाता विवरण (Bank Passbook)', isDoc: true, checked: true, required: true },
    { id: 'doc-4', label: 'e-टोकन SMS / QR पर्ची (A-127 Token Slip)', isDoc: true, checked: true, required: true },
    { id: 'item-1', label: 'तिरपाल (Tarpaulin) - बारिश/धूप से फसल की सुरक्षा', isDoc: false, checked: true, required: false },
    { id: 'item-2', label: 'वाटरप्रूफ बैग में कागजात सुरक्षित रखे हैं', isDoc: false, checked: true, required: false },
  ]);

  const [journeyStarted, setJourneyStarted] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const allRequiredChecked = checklist.filter(item => item.required).every(item => item.checked);
  const totalChecked = checklist.filter(item => item.checked).length;

  const handleStartJourney = () => {
    if (!allRequiredChecked) return;
    setJourneyStarted(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    speak('शुभ यात्रा! आप रामपुर केंद्र के लिए निकल रहे हैं। सुरक्षित वाहन चलाएं।');
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
          <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700/80 flex items-center justify-center border border-emerald-500/30">
                <Navigation className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  घर से निकलने से पहले जांचें (Before You Leave)
                </h3>
                <p className="text-xs text-emerald-200">
                  स्मार्ट चेकलिस्ट व लाइव यात्रा तैयारी
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* 6 System Readiness Status Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>स्लॉट बुक (10:30 AM)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>केंद्र खुला है (Open)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>टोकन एक्टिव (A-127)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>मौसम साफ़ (Clear)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>यात्रा समय ~30 मिनट</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>दूरी 4.2 किमी</span>
              </div>
            </div>

            {/* Document Checklist Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  ज़रूरी कागजात एवं सुरक्षा जांच ({totalChecked}/{checklist.length})
                </h4>
                <button
                  type="button"
                  onClick={() => setChecklist(prev => prev.map(item => ({ ...item, checked: true })))}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  सभी टिक करें (Select All)
                </button>
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <label
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                      item.checked
                        ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold">{item.label}</span>
                      {item.required && (
                        <span className="ml-1.5 text-[10px] text-rose-600 font-bold">
                          [अनिवार्य]
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Ready State / Warning Alert */}
            {!allRequiredChecked ? (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>⚠️ एक जरूरी document अभी check नहीं हुआ है। कृपया सभी अनिवार्य कागजात साथ रखें।</span>
              </div>
            ) : journeyStarted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Navigation className="w-5 h-5 text-emerald-700 animate-pulse" />
                  यात्रा मोड सक्रिय (Journey in Progress) 🚜
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  आप <strong>{activeBooking.centerName}</strong> की ओर अग्रसर हैं। कतार में आपका टोकन <strong>A-127</strong> सक्रिय है। पहुंचने पर गेट पर QR कोड स्कैन करवाएं।
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      setActiveTab('queue');
                    }}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
                  >
                    लाइव कतार देखें (A-127)
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-emerald-900 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  ⭐ आप जाने के लिए पूरी तरह तैयार हैं!
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                बंद करें
              </button>

              {!journeyStarted && (
                <button
                  type="button"
                  disabled={!allRequiredChecked}
                  onClick={handleStartJourney}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl transition shadow-sm ${
                    allRequiredChecked
                      ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                      : 'bg-slate-300 cursor-not-allowed text-slate-500'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  यात्रा शुरू करें (Start Journey) 🚜
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
