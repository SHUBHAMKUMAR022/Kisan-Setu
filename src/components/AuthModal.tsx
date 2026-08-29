import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { 
  User, 
  Smartphone, 
  MapPin, 
  Wheat, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  X,
  Globe,
  Sparkles
} from 'lucide-react';
import { LanguageCode } from '../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, language, setLanguage, centers } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login state
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);

  // Register multi-step state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [regData, setRegData] = useState({
    name: 'Ramesh Kumar',
    mobile: '9876543210',
    village: 'Rampur Kalan',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    farmerId: 'UP-KMY-2026-89421',
    preferredLanguage: language as LanguageCode,
    preferredCenterId: 'center-1',
    crop: 'Wheat (गेहूं)',
    quantityQuintal: 40,
    unit: 'Quintal',
    harvestDate: '2026-08-22',
  });

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(mobileNumber);
  };

  const handleRegisterSubmit = () => {
    register({
      name: regData.name,
      mobile: regData.mobile,
      village: regData.village,
      district: regData.district,
      state: regData.state,
      farmerId: regData.farmerId,
      preferredLanguage: regData.preferredLanguage,
      preferredCenterId: regData.preferredCenterId,
    });
    setLanguage(regData.preferredLanguage);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-red-950 to-orange-950 text-white px-5 py-4 flex items-center justify-between border-b border-orange-800/60">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌾</span>
            <div>
              <h3 className="font-black text-base sm:text-lg leading-tight text-white">
                {mode === 'login' ? 'किसान लॉगिन / Farmer Login' : 'नया किसान पंजीकरण / Farmer Registration'}
              </h3>
              <p className="text-xs text-orange-200 font-medium">राष्ट्रीय कृषि उपार्जन पोर्टल • KisanSetu</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-orange-200 hover:text-white hover:bg-neutral-900 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {mode === 'login' ? (
            /* Login Form */
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center font-bold shadow-xs">
                  📱
                </div>
                <div>
                  <h4 className="text-xs font-black text-orange-950 uppercase">सरल मोबाइल लॉगिन (No Password Needed)</h4>
                  <p className="text-[11px] text-orange-800 font-medium">केवल मोबाइल नंबर और OTP द्वारा सुरक्षित प्रवेश</p>
                </div>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      मोबाइल नंबर / Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-stone-500 font-bold text-sm">+91</span>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10 अंकों का मोबाइल नंबर"
                        className="w-full pl-14 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-base font-bold tracking-wider text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>ओटीपी भेजें (Get OTP)</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-stone-700">
                        ओटीपी दर्ज करें (Enter OTP)
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-xs text-red-600 font-bold hover:underline"
                      >
                        नंबर बदलें
                      </button>
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="4-अंकों का OTP"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-center text-xl font-mono font-bold tracking-widest text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                      maxLength={4}
                    />
                    <p className="text-[11px] text-stone-500 text-center mt-1 font-medium">डेमो OTP: 1234 (Auto-filled)</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    <span>सत्यापित करें एवं लॉगिन करें (Verify OTP)</span>
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-stone-200 text-center">
                <p className="text-xs text-stone-600 mb-2 font-medium">क्या आप पहली बार आ रहे हैं?</p>
                <button
                  onClick={() => {
                    setMode('register');
                    setStep(1);
                  }}
                  className="px-4 py-2 border-2 border-red-600 text-red-700 font-black text-xs rounded-xl hover:bg-red-50 transition"
                >
                  नया किसान पंजीकरण करें (New Farmer? Register)
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Registration Wizard */
            <div className="space-y-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-stone-600 border-b border-stone-100 pb-3">
                <span className={step >= 1 ? 'text-red-600' : ''}>1. व्यक्तिगत</span>
                <span>→</span>
                <span className={step >= 2 ? 'text-red-600' : ''}>2. किसान विवरण</span>
                <span>→</span>
                <span className={step >= 3 ? 'text-red-600' : ''}>3. फसल जानकारी</span>
              </div>

              {step === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">पूरा नाम (Full Name) *</label>
                    <input
                      type="text"
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">मोबाइल नंबर (Mobile Number) *</label>
                    <input
                      type="tel"
                      value={regData.mobile}
                      onChange={(e) => setRegData({ ...regData, mobile: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">गांव (Village) *</label>
                      <input
                        type="text"
                        value={regData.village}
                        onChange={(e) => setRegData({ ...regData, village: e.target.value })}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">जिला (District) *</label>
                      <input
                        type="text"
                        value={regData.district}
                        onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>आगे बढ़ें (Next Step)</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">पसंदीदा भाषा (Preferred Language) *</label>
                    <select
                      value={regData.preferredLanguage}
                      onChange={(e) => setRegData({ ...regData, preferredLanguage: e.target.value as LanguageCode })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.flagText} {l.nativeName} ({l.name})
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-orange-700 font-medium mt-1">आप बाद में भी भाषा बदल सकते हैं।</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">पसंदीदा खरीद केंद्र (Preferred Center) *</label>
                    <select
                      value={regData.preferredCenterId}
                      onChange={(e) => setRegData({ ...regData, preferredCenterId: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {centers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.distanceKm} km)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 border border-stone-300 text-stone-700 font-bold text-sm rounded-xl"
                    >
                      पीछे
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="w-2/3 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>आगे बढ़ें</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">फसल (Crop) *</label>
                    <select
                      value={regData.crop}
                      onChange={(e) => setRegData({ ...regData, crop: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="Wheat (गेहूं)">🌾 गेहूं (Wheat) - MSP ₹2,275/Qtl</option>
                      <option value="Paddy (धान)">🌾 धान (Paddy) - MSP ₹2,300/Qtl</option>
                      <option value="Mustard (सरसों)">🌱 सरसों (Mustard) - MSP ₹5,650/Qtl</option>
                      <option value="Chana (चना)">🥣 चना (Chana) - MSP ₹5,440/Qtl</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">अनुमानित मात्रा *</label>
                      <input
                        type="number"
                        value={regData.quantityQuintal}
                        onChange={(e) => setRegData({ ...regData, quantityQuintal: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">इकाई (Unit)</label>
                      <input
                        type="text"
                        disabled
                        value="क्विंटल (Quintal)"
                        className="w-full px-3 py-2.5 bg-stone-200 border border-stone-300 rounded-xl text-sm font-bold text-stone-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">उपलब्धता / कटाई तिथि *</label>
                    <input
                      type="date"
                      value={regData.harvestDate}
                      onChange={(e) => setRegData({ ...regData, harvestDate: e.target.value })}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3 border border-stone-300 text-stone-700 font-bold text-sm rounded-xl"
                    >
                      पीछे
                    </button>
                    <button
                      onClick={handleRegisterSubmit}
                      className="w-2/3 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-sm rounded-xl transition shadow-md"
                    >
                      पंजीकरण पूरा करें ✅
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-950 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-lg font-black text-neutral-950">पंजीकरण सफल! ✅</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto font-medium">
                    आपकी किसान आईडी तैयार है। अब आप सीधे खरीद स्लॉट बुक कर सकते हैं।
                  </p>
                  <button
                    onClick={() => setIsAuthModalOpen(false)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black rounded-xl text-sm shadow-md"
                  >
                    डैशबोर्ड पर जाएं
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
