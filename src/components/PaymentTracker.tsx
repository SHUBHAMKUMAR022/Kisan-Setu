import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Building, 
  ShieldCheck, 
  FileText, 
  Download, 
  Printer, 
  Play, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PaymentTracker: React.FC = () => {
  const { payment, simulatePaymentCredit, t, speak, farmer, language } = useApp();

  const isCredited = payment.status === 'credited';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <IndianRupee size={26} className="text-emerald-600" />
            <span>{t('paymentStatus')} (DBT Payment Tracking)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            प्रत्यक्ष लाभ अंतरण (DBT) द्वारा सरकारी समर्थन मूल्य का भुगतान विवरण
          </p>
        </div>

        <button
          onClick={() => {
            const txt = isCredited 
              ? `आपकी फसल की राशि ₹92,000 आपके स्टेट बैंक खाते में सफलतापूर्वक जमा हो चुकी है। यूटीआर संख्या ${payment.utrNumber} है।`
              : `आपकी फसल की राशि ₹92,000 बैंक द्वारा प्रेषित की जा रही है। 24 से 48 घंटे में खाते में जमा हो जाएगी।`;
            speak(txt);
          }}
          className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition self-start sm:self-auto shadow-sm"
        >
          <span>{t('listenAudio')} (Voice)</span>
        </button>
      </div>

      {/* BIG PAYMENT STATUS HERO CARD */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 transition-all space-y-6 ${
        isCredited 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-emerald-500' 
          : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-cyan-500/60'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
              {payment.dbtScheme}
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-light text-cyan-400">₹</span>
              <h1 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                {payment.amount.toLocaleString('en-IN')}
              </h1>
            </div>
            <p className="text-xs text-cyan-200 mt-1 font-medium">
              फसल: <strong className="text-white">{payment.crop}</strong> ({payment.quantityQuintal} क्विंटल)
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase shadow-sm ${
              isCredited 
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950' 
                : 'bg-teal-600 text-white animate-pulse'
            }`}>
              {isCredited ? <CheckCircle2 size={16} /> : <Clock size={16} />}
              <span>{isCredited ? t('paymentSuccess') : t('paymentProcessing')}</span>
            </span>
            <p className="text-[11px] text-slate-300 mt-1.5 font-mono">
              दिनांक: {payment.date}
            </p>
          </div>
        </div>

        {/* Bank & Account Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-cyan-200 font-bold block">लाभार्थी बैंक (Bank Name)</span>
            <strong className="text-sm font-bold text-white block mt-0.5">{payment.bankName}</strong>
            <span className="text-[10px] text-slate-300 font-mono">IFSC: {payment.ifscPrefix}</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-cyan-200 font-bold block">बैंक खाता (Bank Account)</span>
            <strong className="text-sm font-bold text-white block mt-0.5 font-mono">{payment.maskedBankAcc}</strong>
            <span className="text-[10px] text-slate-300">आधार लिंक DBT खाता</span>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-cyan-200 font-bold block">यूटीआर / संदर्भ संख्या (UTR No.)</span>
            <strong className="text-sm font-bold text-cyan-300 block mt-0.5 font-mono">{payment.utrNumber}</strong>
            <span className="text-[10px] text-slate-300">PFMS सरकारी क्लीयरेंस</span>
          </div>
        </div>

        {/* Demo trigger */}
        {!isCredited && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <span className="text-xs text-cyan-200">
              🎮 <strong>SIH Demo:</strong> तत्काल बैंक खाते में राशि जमा होने का परीक्षण करें
            </span>
            <button
              onClick={simulatePaymentCredit}
              className="py-2.5 px-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition shadow"
            >
              <Sparkles size={14} />
              <span>भुगतान पूरा करें (Credit to Bank)</span>
            </button>
          </div>
        )}
      </div>

      {/* DBT STAGE PROGRESSION FLOW */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h3 className="font-black text-base sm:text-lg text-slate-900">
          डीबीटी अंतरण स्थिति (DBT Clearance Timeline)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs shadow-sm">
              ✓
            </div>
            <h4 className="font-extrabold text-xs mt-2">1. जे-फार्म स्वीकृति</h4>
            <p className="text-[10px] text-slate-600 mt-0.5 font-medium">22 Aug, 11:45 AM</p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs shadow-sm">
              ✓
            </div>
            <h4 className="font-extrabold text-xs mt-2">2. कोषागार अनुमोदन</h4>
            <p className="text-[10px] text-slate-600 mt-0.5 font-medium">22 Aug, 12:15 PM</p>
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-2xl border ${
            isCredited 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
              : 'bg-cyan-50 border-cyan-300 text-cyan-950 animate-pulse'
          }`}>
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto text-xs shadow-sm ${
              isCredited ? 'bg-emerald-600 text-white' : 'bg-cyan-400 text-slate-950'
            }`}>
              {isCredited ? '✓' : '3'}
            </div>
            <h4 className="font-extrabold text-xs mt-2">3. PFMS बैंक क्लीयरेंस</h4>
            <p className="text-[10px] text-slate-600 mt-0.5 font-medium">{isCredited ? 'Cleared' : 'इन-प्रोसेस'}</p>
          </div>

          {/* Step 4 */}
          <div className={`p-4 rounded-2xl border ${
            isCredited 
              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 font-black' 
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}>
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mx-auto text-xs shadow-sm ${
              isCredited ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              {isCredited ? '✓' : '4'}
            </div>
            <h4 className="font-extrabold text-xs mt-2">4. खाते में जमा (Credit)</h4>
            <p className="text-[10px] text-slate-600 mt-0.5 font-medium">{isCredited ? 'सफलतापूर्वक जमा' : 'अपेक्षित'}</p>
          </div>
        </div>
      </div>

      {/* RECEIPT DOWNLOAD ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.print()}
          className="flex-1 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition"
        >
          <Printer size={16} />
          <span>भुगतान रसीद प्रिंट करें (Print Receipt)</span>
        </button>

        <button
          onClick={() => window.print()}
          className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition"
        >
          <Download size={16} />
          <span>डाउनलोड DBT वाउचर PDF</span>
        </button>
      </div>
    </div>
  );
};
