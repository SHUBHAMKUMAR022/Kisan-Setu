import React from 'react';
import { useApp } from '../context/AppContext';
import { History, FileText, Download, Printer, CheckCircle2 } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { historicalYields, t } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <History size={26} className="text-red-600" />
          <span>{t('history')} (Procurement Archives & Receipts)</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          विगत सत्रों के पूर्ण खरीद सौदे, जे-फार्म और भुगतान रसीदें
        </p>
      </div>

      <div className="space-y-3">
        {historicalYields.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-orange-100 text-orange-950 text-xs font-black px-2.5 py-0.5 rounded-full border border-orange-200">
                  {item.season} {item.year}
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {item.centerName}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                {item.crop} • {item.yieldQuintal} क्विंटल
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                ग्रेड: <strong className="text-red-600">{item.qualityGrade}</strong> (नमी: {item.moisturePercent}%) • MSP दर: ₹{item.mspRate}/Qtl
              </p>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-stone-500 font-bold block uppercase">कुल प्राप्त राशि</span>
                <span className="text-lg sm:text-xl font-black text-red-700 font-mono">
                  ₹{item.totalEarnings.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert(`जे-फार्म ${item.id} डाउनलोड शुरू हुआ`)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center gap-1 transition border border-stone-200"
                >
                  <FileText size={13} />
                  <span>जे-फार्म</span>
                </button>
                <button
                  onClick={() => alert(`भुगतान रसीद ${item.id} डाउनलोड शुरू हुई`)}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs rounded-xl flex items-center gap-1 transition shadow-sm"
                >
                  <Download size={13} />
                  <span>रसीद</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
