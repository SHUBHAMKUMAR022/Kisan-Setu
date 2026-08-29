import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_SLOT_OPTIONS } from '../data/mockData';
import { 
  CalendarCheck, 
  MapPin, 
  Wheat, 
  Clock, 
  CheckCircle2, 
  Ticket, 
  Printer, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  IndianRupee,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const SlotBooking: React.FC = () => {
  const { centers, activeBooking, bookNewSlot, setActiveTab, t, speak, farmer } = useApp();
  
  const [selectedCenterId, setSelectedCenterId] = useState<string>('center-2'); // Default to recommended
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat (गेहूं)');
  const [quantity, setQuantity] = useState<number>(40);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-23');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-5');
  const [bookingCompletedToken, setBookingCompletedToken] = useState<string | null>(null);

  const selectedCenter = centers.find(c => c.id === selectedCenterId) || centers[0];
  const selectedSlot = INITIAL_SLOT_OPTIONS.find(s => s.id === selectedSlotId) || INITIAL_SLOT_OPTIONS[4];

  // MSP rate estimates
  const mspRate = selectedCrop.includes('Wheat') ? 2329 : selectedCrop.includes('Paddy') ? 2300 : selectedCrop.includes('Mustard') ? 5650 : 5440;
  const estimatedPayout = quantity * mspRate;

  const handleConfirmBooking = () => {
    const token = bookNewSlot(
      selectedCenterId,
      selectedCrop,
      quantity,
      selectedDate,
      selectedSlot.timeRange
    );
    setBookingCompletedToken(token);
    speak(`बधाई हो! आपका खरीद स्लॉट सफलतापूर्वक बुक हो गया है। आपकी टोकन संख्या ${token} है।`);
  };

  if (bookingCompletedToken) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-fadeIn">
        {/* Success Confirmation Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white p-6 rounded-3xl shadow-xl text-center space-y-3">
          <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 size={42} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">{t('slotBookedSuccess')}</h2>
          <p className="text-xs sm:text-sm text-cyan-100 max-w-md mx-auto font-medium">
            आपका ई-टोकन पास जारी कर दिया गया है। कृपया नियत समय पर केंद्र पर पहुंचें।
          </p>
        </div>

        {/* Printable e-Pass Slip */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-500/40 p-6 sm:p-8 space-y-5 print:border-none print:shadow-none">
          {/* Slip Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <div>
                <h3 className="font-black text-base text-slate-900">किसानसेतु (KisanSetu) ई-प्रवेश पत्र</h3>
                <p className="text-xs text-slate-500 font-medium">Government of India • Ministry of Agriculture</p>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-950 text-xs font-black px-2.5 py-1 rounded-full uppercase border border-emerald-300">
                CONFIRMED ✅
              </span>
            </div>
          </div>

          {/* Token Big Number Box */}
          <div className="bg-slate-950 text-white p-5 rounded-2xl flex items-center justify-between shadow-inner border border-cyan-950">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">{t('yourToken')}</span>
              <h1 className="text-4xl sm:text-5xl font-black text-cyan-300 font-mono tracking-wider mt-0.5">
                {bookingCompletedToken}
              </h1>
            </div>
            <div className="bg-white p-2 rounded-xl text-slate-950 shadow">
              <QrCode size={56} className="text-slate-950" />
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm border-b-2 border-dashed border-slate-200 pb-5">
            <div>
              <span className="text-slate-500 font-medium block">किसान का नाम (Farmer)</span>
              <strong className="text-slate-900 text-sm sm:text-base">{farmer.name}</strong>
              <p className="text-xs text-slate-500 font-mono">{farmer.farmerId}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">खरीद केंद्र (Center)</span>
              <strong className="text-slate-900">{selectedCenter.name}</strong>
              <p className="text-xs text-slate-500">{selectedCenter.address}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">तारीख व समय (Slot)</span>
              <strong className="text-emerald-900 text-sm sm:text-base">{selectedDate}</strong>
              <p className="font-mono font-bold text-blue-600">{selectedSlot.timeRange}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">फसल एवं मात्रा (Crop)</span>
              <strong className="text-slate-900">{selectedCrop}</strong>
              <p className="text-slate-700 font-bold">{quantity} क्विंटल (₹{estimatedPayout.toLocaleString('en-IN')})</p>
            </div>
          </div>

          {/* Important Farmer Checklist */}
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-xs space-y-1 text-emerald-950 font-medium">
            <p className="font-bold text-emerald-900 flex items-center gap-1.5 text-xs sm:text-sm">
              <AlertCircle size={15} />
              <span>केंद्र पर साथ ले जाने योग्य आवश्यक वस्तुएं:</span>
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] sm:text-xs">
              <li>यह टोकन पर्ची या मोबाइल में SMS</li>
              <li>मूल आधार कार्ड (Aadhaar Card)</li>
              <li>खतौनी / जमाबंदी 7/12 भू-अभिलेख की प्रति</li>
              <li>बैंक पासबुक की प्रति (खाता संख्या: {farmer.maskedBankAcc})</li>
              <li>फसल में नमी 12% से कम होनी चाहिए</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Printer size={16} />
              <span>{t('printTokenSlip')}</span>
            </button>

            <button
              onClick={() => setActiveTab('queue')}
              className="py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              <Ticket size={16} />
              <span>{t('trackLiveQueue')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <CalendarCheck size={26} className="text-emerald-600" />
            <span>{t('bookSlot')} (Procurement Slot Booking)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            कतार में बिना इंतजार किए अपनी पसंद का समय स्लॉट चुनें।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="text-xs font-bold text-emerald-700 hover:underline"
        >
          ← वापस डैशबोर्ड
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Step 1: Select Procurement Center */}
        <div className="space-y-3">
          <label className="block text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            <span>{t('selectCenter')} (Choose Procurement Mandi)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {centers.map((c) => {
              const isSelected = selectedCenterId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCenterId(c.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/30' 
                      : 'border-slate-200 hover:border-emerald-400 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{c.name}</h4>
                      <p className="text-xs text-emerald-950 font-bold">{c.hindiName}</p>
                    </div>
                    {c.isRecommended && (
                      <span className="bg-emerald-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase shadow-sm">
                        ⭐ Recommended
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-xs font-bold text-slate-600">
                    <span>📍 {c.distanceKm} km</span>
                    <span className="text-teal-800">⏱️ ~{c.estimatedWaitMinutes} min wait</span>
                    <span className="text-emerald-700">📅 {c.availableSlots} slots</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Crop and Quantity */}
        <div className="space-y-3 border-t border-slate-100 pt-5">
          <label className="block text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            <span>{t('selectCrop')} (Crop & Quantity)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">फसल (Crop)</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Wheat (गेहूं)">🌾 गेहूं (Wheat) - MSP ₹2,329/Qtl</option>
                <option value="Paddy (धान 1121)">🌾 धान (Paddy) - MSP ₹2,300/Qtl</option>
                <option value="Mustard (सरसों)">🌱 सरसों (Mustard) - MSP ₹5,650/Qtl</option>
                <option value="Chana (चना)">🥣 चना (Chana) - MSP ₹5,440/Qtl</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">मात्रा (क्विंटल में) *</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div className="bg-cyan-50 border border-cyan-300 p-3 rounded-xl flex flex-col justify-center">
              <span className="text-[11px] font-bold text-cyan-900 uppercase">अनुमानित सरकारी भुगतान</span>
              <span className="text-xl font-black text-slate-950 font-mono">
                ₹{estimatedPayout.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-blue-800 font-medium">सीधा आपके बैंक खाते (DBT) में</span>
            </div>
          </div>
        </div>

        {/* Step 3: Select Date */}
        <div className="space-y-3 border-t border-slate-100 pt-5">
          <label className="block text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs flex items-center justify-center font-bold">3</span>
            <span>{t('selectDate')} (Select Procurement Date)</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'आज (Today)', date: '2026-08-22', note: 'सीमित स्लॉट' },
              { label: 'कल (Tomorrow)', date: '2026-08-23', note: '21 स्लॉट रिक्त' },
              { label: 'परसों (Day After)', date: '2026-08-24', note: '35 स्लॉट रिक्त' },
              { label: '25 अगस्त', date: '2026-08-25', note: '40 स्लॉट रिक्त' },
            ].map((d) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDate(d.date)}
                className={`p-3 rounded-2xl border-2 text-left transition ${
                  selectedDate === d.date
                    ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-400 bg-white text-slate-700'
                }`}
              >
                <span className="text-xs font-bold block">{d.label}</span>
                <span className="text-sm font-mono font-black block mt-0.5">{d.date}</span>
                <span className="text-[10px] text-slate-500 font-medium">{d.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Select 30-min Time Slot */}
        <div className="space-y-3 border-t border-slate-100 pt-5">
          <label className="block text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs flex items-center justify-center font-bold">4</span>
            <span>{t('selectSlot')} (30-Minute Guaranteed Queue Slots)</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {INITIAL_SLOT_OPTIONS.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isFull = slot.isFull;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isFull}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition flex flex-col justify-between ${
                    isFull
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'border-emerald-600 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-md font-bold ring-2 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-emerald-400 bg-white text-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold block leading-tight">{slot.timeRange}</span>
                  <span className={`text-[10px] mt-1.5 font-bold uppercase ${
                    isSelected ? 'text-cyan-200' : isFull ? 'text-slate-400' : 'text-teal-700'
                  }`}>
                    {isFull ? 'भरा हुआ (Full)' : `${slot.availableSlots} स्लॉट रिक्त`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 5: Final Confirmation & Instant Token Booking */}
        <div className="border-t border-slate-100 pt-6">
          <button
            id="btn-confirm-slot-booking"
            onClick={handleConfirmBooking}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl transition flex items-center justify-center gap-2 transform active:scale-98"
          >
            <Ticket size={22} />
            <span>{t('confirmAndBook')} (Book Slot & Get Token)</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
