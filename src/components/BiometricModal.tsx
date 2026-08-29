import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Fingerprint, CheckCircle2, ShieldCheck, X, RefreshCw } from 'lucide-react';
import { speakText } from '../utils/speech';

export const BiometricModal: React.FC = () => {
  const { isBiometricModalOpen, setIsBiometricModalOpen, farmer, language } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBiometricModalOpen) return null;

  const triggerScan = () => {
    setIsScanning(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      speakText(
        language === 'hi'
          ? 'आधार बायोमेट्रिक फिंगरप्रिंट सफलतापूर्वक सत्यापित हो गया है।'
          : 'Aadhaar Biometric e-KYC verification successful.',
        language
      );
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-center p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base text-left">
            <ShieldCheck size={20} className="text-red-600" />
            <span>आधार बायोमेट्रिक e-KYC सत्यापन</span>
          </div>
          <button
            onClick={() => {
              setIsBiometricModalOpen(false);
              setIsSuccess(false);
              setIsScanning(false);
            }}
            className="text-stone-400 hover:text-stone-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-2">
          <p className="text-xs text-stone-500 mb-1 font-mono font-medium">UIDAI Aadhaar Authentication</p>
          <h4 className="text-lg font-black text-stone-900">{farmer.name}</h4>
          <p className="text-xs text-red-600 font-bold">आधार संख्या: {farmer.maskedAadhaar}</p>
        </div>

        {/* Biometric Scanner Visual Area */}
        <div className="flex flex-col items-center justify-center py-4">
          <div 
            onClick={!isScanning ? triggerScan : undefined}
            className={`relative w-28 h-28 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
              isSuccess 
                ? 'bg-yellow-100 border-2 border-yellow-500 text-neutral-950' 
                : isScanning
                ? 'bg-orange-50 border-2 border-orange-500 text-orange-600 animate-pulse'
                : 'bg-stone-100 border-2 border-dashed border-stone-400 text-stone-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 size={56} className="text-orange-600 animate-scaleIn" />
            ) : (
              <Fingerprint size={56} className={isScanning ? 'animate-bounce text-orange-600' : ''} />
            )}

            {isScanning && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 shadow-lg animate-scanLine rounded-full" />
            )}
          </div>

          <p className="text-xs font-semibold mt-3 text-stone-600">
            {isScanning 
              ? 'फिंगरप्रिंट स्कैन हो रहा है... कृपया अंगूठा दबाकर रखें'
              : isSuccess
              ? 'सत्यापन पूर्ण! (Fingerprint Matched ✅)'
              : 'अंगूठा लगाने के लिए ऊपर फिंगरप्रिंट आइकन पर टैप करें'}
          </p>
        </div>

        {/* Action button */}
        <div className="pt-2">
          {isSuccess ? (
            <button
              onClick={() => setIsBiometricModalOpen(false)}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl transition shadow-md"
            >
              ठीक है (Done)
            </button>
          ) : (
            <button
              onClick={triggerScan}
              disabled={isScanning}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:bg-stone-300 text-white font-black text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              {isScanning && <RefreshCw size={16} className="animate-spin" />}
              <span>{isScanning ? 'सत्यापित किया जा रहा है...' : 'फिंगरप्रिंट स्कैन करें'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
