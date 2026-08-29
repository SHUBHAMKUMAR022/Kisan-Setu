import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wheat, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Droplet, 
  IndianRupee, 
  ArrowRight, 
  Download, 
  Printer, 
  Play,
  AlertCircle
} from 'lucide-react';

export const ProcurementTracker: React.FC = () => {
  const { procurementDetail, simulateAdvanceStage, t, speak, farmer, language } = useApp();
  const [showJFormModal, setShowJFormModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Wheat size={26} className="text-emerald-600" />
            <span>{t('myProcurement')} (Live Procurement Tracking)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            टोकन: <strong className="font-mono text-emerald-700">{procurementDetail.tokenNumber}</strong> • संदर्भ संख्या: <span className="font-mono text-slate-500">{procurementDetail.referenceId}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJFormModal(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition shadow-sm"
          >
            <FileText size={15} className="text-white" />
            <span>ई-जे फार्म देखें (View e-J Form)</span>
          </button>
        </div>
      </div>

      {/* SUMMARY DASHBOARD CARD */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-cyan-900/60 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] text-cyan-200 uppercase font-bold block">फसल (Crop)</span>
            <strong className="text-base sm:text-lg font-black text-white">{procurementDetail.crop}</strong>
            <p className="text-[10px] text-cyan-300">{procurementDetail.variety}</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] text-cyan-200 uppercase font-bold block">स्वीकृत शुद्ध वजन</span>
            <strong className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {procurementDetail.acceptedQuantityQuintal} क्विंटल
            </strong>
            <p className="text-[10px] text-cyan-300">3,950 किलोग्राम</p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
            <span className="text-[11px] text-cyan-200 uppercase font-bold block">समर्थन मूल्य (MSP)</span>
            <strong className="text-base sm:text-lg font-black text-white font-mono">
              ₹{procurementDetail.mspRatePerQuintal}/क्विंटल
            </strong>
            <p className="text-[10px] text-cyan-300">+ राज्य बोनस शामिल</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 p-3.5 rounded-2xl shadow-lg border border-emerald-300">
            <span className="text-[11px] font-black uppercase block text-slate-950">कुल देय राशि</span>
            <strong className="text-xl sm:text-2xl font-black font-mono block text-slate-950">
              ₹{procurementDetail.totalPayableAmount.toLocaleString('en-IN')}
            </strong>
            <span className="text-[10px] font-black text-slate-950">डीबीटी बैंक अंतरण</span>
          </div>
        </div>

        {/* Advance Stage Demo button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-xs text-cyan-200">
            🎮 <strong>SIH Demo:</strong> खरीद प्रक्रिया के अगले चरण का पूर्वावलोकन करें
          </span>
          <button
            onClick={simulateAdvanceStage}
            className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition shadow"
          >
            <Play size={13} />
            <span>अगला चरण आगे बढ़ाएं (Advance Stage)</span>
          </button>
        </div>
      </div>

      {/* QUALITY & WEIGHBRIDGE DETAILS ACCORDION TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quality Test Card */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Droplet size={20} className="text-teal-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                गुणवत्ता एवं नमी जांच (Moisture Assay)
              </h3>
            </div>
            <span className="bg-emerald-100 text-emerald-950 text-xs font-black px-2.5 py-1 rounded-full uppercase border border-emerald-300">
              APPROVED ✅
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
              <span className="text-slate-600 font-medium">नमी का स्तर (Moisture %):</span>
              <strong className="text-teal-900 font-mono text-sm font-black">
                {procurementDetail.quality.moisturePercent}% (मानक &lt; {procurementDetail.quality.moistureLimit}%)
              </strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
              <span className="text-slate-600 font-medium">विदेशी पदार्थ (Foreign Matter):</span>
              <strong className="text-slate-900 font-mono">{procurementDetail.quality.foreignMatterPercent}%</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
              <span className="text-slate-600 font-medium">टूटे दाने (Broken Grains):</span>
              <strong className="text-slate-900 font-mono">{procurementDetail.quality.brokenGrainsPercent}%</strong>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              जांचकर्ता: <strong>{procurementDetail.quality.inspectorName}</strong> ({procurementDetail.quality.verifiedAt})
            </p>
          </div>
        </div>

        {/* Weighbridge Slip Card */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Scale size={20} className="text-cyan-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                इलेक्ट्रॉनिक धर्मकांटा पर्ची (Weighbridge)
              </h3>
            </div>
            <span className="bg-cyan-100 text-cyan-950 text-xs font-black px-2.5 py-1 rounded-full uppercase border border-cyan-300">
              WEIGHED ✅
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
              <span className="text-slate-600 font-medium">सकल वजन (Gross Weight):</span>
              <strong className="text-slate-900 font-mono">{procurementDetail.grossWeightKg} kg</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
              <span className="text-slate-600 font-medium">ट्रॉली खाली वजन (Tare Weight):</span>
              <strong className="text-slate-900 font-mono">{procurementDetail.tareWeightKg} kg</strong>
            </div>

            <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              <span className="text-emerald-950 font-bold">शुद्ध फसल वजन (Net Weight):</span>
              <strong className="text-emerald-700 font-mono text-sm font-black">
                {procurementDetail.netWeightKg} kg ({procurementDetail.acceptedQuantityQuintal} Qtl)
              </strong>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              वाहन: <strong>ट्रैक्टर ट्रॉली UP-65-AK-9821</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 8-STAGE INTERACTIVE PROCUREMENT TIMELINE */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900">
              उपार्जन प्रगति चक्र (8-Stage Procurement Lifecycle)
            </h3>
            <p className="text-xs text-slate-500 font-medium">प्रत्येक चरण की वास्तविक समय स्थिति और सत्यापन रिपोर्ट</p>
          </div>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono font-bold text-xs px-3 py-1 rounded-full shadow-sm">
            Stage {procurementDetail.currentStageIndex + 1} of 8
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {procurementDetail.stages.map((stg, idx) => {
            const isCompleted = stg.status === 'completed';
            const isCurrent = stg.status === 'current';
            const isPending = stg.status === 'pending';

            return (
              <div key={stg.id} className="relative group">
                {/* Status Dot */}
                <div 
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow transition-all ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent
                      ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-200 animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                <div className={`p-4 rounded-2xl border transition ${
                  isCurrent 
                    ? 'bg-cyan-50/80 border-cyan-400 shadow-md' 
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-slate-50/40 border-slate-200 opacity-60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className={`font-black text-sm sm:text-base ${
                      isCurrent ? 'text-cyan-950 font-black' : isCompleted ? 'text-emerald-950' : 'text-slate-600'
                    }`}>
                      {t(stg.titleKey)}
                    </h4>
                    {stg.timestamp && (
                      <span className="text-[11px] font-mono text-slate-500 font-semibold bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                        {stg.timestamp}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {stg.descriptionKey}
                  </p>

                  {stg.details && (
                    <div className="mt-2 text-[11px] font-mono font-bold text-teal-900 bg-white px-2.5 py-1 rounded-lg inline-block border border-teal-200 shadow-xs">
                      📋 {stg.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* J-FORM MODAL */}
      {showJFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-orange-500/50 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-red-800 pb-3">
              <div>
                <h3 className="font-black text-lg text-red-950">फॉर्म 'जे' (Form-J) • सरकारी खरीद प्रमाणपत्र</h3>
                <p className="text-xs text-stone-500 font-medium">Government of Uttar Pradesh • Food & Civil Supplies Dept</p>
              </div>
              <button
                onClick={() => setShowJFormModal(false)}
                className="text-stone-400 hover:text-stone-800 font-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="border border-stone-300 p-4 rounded-2xl bg-stone-50 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 block font-medium">प्रमाणपत्र संख्या (J-Form No):</span>
                  <strong className="font-mono text-stone-900">{procurementDetail.eJFormNumber}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">खरीद तिथि (Date):</span>
                  <strong className="font-mono text-stone-900">{procurementDetail.procurementDate}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">किसान का नाम:</span>
                  <strong className="text-stone-900">{farmer.name} ({farmer.farmerId})</strong>
                </div>
                <div>
                  <span className="text-stone-500 block font-medium">उपार्जन केंद्र:</span>
                  <strong className="text-stone-900">{procurementDetail.centerName}</strong>
                </div>
              </div>

              <table className="w-full border-collapse border border-stone-300 mt-2 text-center">
                <thead>
                  <tr className="bg-stone-200 font-bold">
                    <th className="border border-stone-300 p-1">क्र.</th>
                    <th className="border border-stone-300 p-1">जिंस (Crop)</th>
                    <th className="border border-stone-300 p-1">वजन (Qtl)</th>
                    <th className="border border-stone-300 p-1">दर (Rate/Qtl)</th>
                    <th className="border border-stone-300 p-1">कुल राशि (Amount)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-stone-300 p-1.5">1</td>
                    <td className="border border-stone-300 p-1.5">{procurementDetail.crop}</td>
                    <td className="border border-stone-300 p-1.5 font-mono">{procurementDetail.acceptedQuantityQuintal}</td>
                    <td className="border border-stone-300 p-1.5 font-mono">₹{procurementDetail.mspRatePerQuintal}</td>
                    <td className="border border-stone-300 p-1.5 font-mono font-bold text-red-700">
                      ₹{procurementDetail.totalPayableAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Printer size={15} />
                <span>प्रिंट निकालें (Print)</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Download size={15} />
                <span>डाउनलोड PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
