import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  IndianRupee, 
  Wheat, 
  Calendar, 
  Volume2, 
  Award,
  ArrowUpRight
} from 'lucide-react';

export const YieldDashboard: React.FC = () => {
  const { historicalYields, farmer, t, speak, language } = useApp();
  const [chartType, setChartType] = useState<'yield' | 'earnings'>('yield');

  const chartData = historicalYields.map((y) => ({
    name: `${y.season} ${y.year}`,
    crop: y.crop,
    yieldQuintal: y.yieldQuintal,
    earnings: y.totalEarnings,
    mspRate: y.mspRate,
    yieldPerAcre: y.yieldPerAcre,
  })).reverse(); // Oldest to newest

  const totalAllTimeEarnings = historicalYields.reduce((acc, curr) => acc + curr.totalEarnings, 0);
  const totalAllTimeYield = historicalYields.reduce((acc, curr) => acc + curr.yieldQuintal, 0);
  const avgYieldPerAcre = (totalAllTimeYield / (historicalYields.length * farmer.totalLandAcres)).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
            <BarChart3 size={26} className="text-red-600" />
            <span>{t('yieldDashboard')} (Historical Yield & Income Analytics)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            पिछले 4 मौसमों की फसल पैदावार, समर्थन मूल्य एवं कुल सरकारी आय का विश्लेषण
          </p>
        </div>

        <button
          onClick={() => {
            const txt = language === 'hi'
              ? `आपके 4.5 एकड़ खेत से कुल ऐतिहासिक आय ₹${totalAllTimeEarnings.toLocaleString('en-IN')} रही है। औसत पैदावार प्रति एकड़ ${avgYieldPerAcre} क्विंटल है।`
              : `Total historical income from your 4.5 acres is ₹${totalAllTimeEarnings.toLocaleString('en-IN')}. Average yield per acre is ${avgYieldPerAcre} quintals.`;
            speak(txt);
          }}
          className="px-3.5 py-2 bg-orange-100 hover:bg-orange-200 text-orange-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition self-start sm:self-auto shadow-xs border border-orange-200"
        >
          <Volume2 size={15} className="text-red-600" />
          <span>{t('listenAudio')} (Voice)</span>
        </button>
      </div>

      {/* 3 HIGHLIGHT METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Income */}
        <div className="bg-gradient-to-br from-neutral-950 via-red-950 to-orange-950 text-white p-5 rounded-3xl shadow-lg border border-orange-800/60">
          <span className="text-xs font-bold text-orange-200 uppercase block">कुल ऐतिहासिक आय (Total Income)</span>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-xl text-yellow-300">₹</span>
            <h3 className="text-3xl font-black font-mono text-white">
              {totalAllTimeEarnings.toLocaleString('en-IN')}
            </h3>
          </div>
          <span className="text-[11px] text-yellow-300 font-medium">4 मौसमों की संयुक्त सरकारी खरीद</span>
        </div>

        {/* Total Quantity */}
        <div className="bg-stone-900 text-white p-5 rounded-3xl shadow-lg border border-stone-800">
          <span className="text-xs font-bold text-stone-400 uppercase block">कुल सरकारी उपार्जन (Procured)</span>
          <div className="flex items-baseline gap-1 my-1">
            <h3 className="text-3xl font-black font-mono text-yellow-400">
              {totalAllTimeYield.toFixed(1)}
            </h3>
            <span className="text-sm font-bold text-stone-400">क्विंटल</span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">100% FAQ ग्रेड स्वीकृत</span>
        </div>

        {/* Average Yield Per Acre */}
        <div className="bg-orange-50 border-2 border-orange-300 p-5 rounded-3xl shadow-sm text-orange-950">
          <span className="text-xs font-black uppercase text-orange-900 block">औसत उत्पादकता (Yield/Acre)</span>
          <div className="flex items-baseline gap-1 my-1">
            <h3 className="text-3xl font-black font-mono text-red-700">
              {avgYieldPerAcre}
            </h3>
            <span className="text-xs font-bold text-orange-900">क्विंटल / एकड़</span>
          </div>
          <span className="text-[11px] text-orange-800 font-bold">जिला औसत (7.8 Qtl) से 15% अधिक!</span>
        </div>
      </div>

      {/* VISUAL CHART AREA */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-stone-900">
              {chartType === 'yield' ? 'फसल पैदावार रुझान (Crop Yield in Quintals)' : 'सरकारी आय रुझान (Earnings in ₹)'}
            </h3>
            <p className="text-xs text-stone-500 font-medium">मौसम अनुसार प्रगति ग्राफ</p>
          </div>

          <div className="flex bg-stone-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
            <button
              onClick={() => setChartType('yield')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                chartType === 'yield' ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              पैदावार (Quintals)
            </button>
            <button
              onClick={() => setChartType('earnings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                chartType === 'earnings' ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              कुल आय (₹ Earnings)
            </button>
          </div>
        </div>

        {/* Chart Render */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'yield' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#78716c' }} />
                <YAxis tick={{ fontSize: 12, fill: '#78716c' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val: any) => [`${val} क्विंटल`, 'उपार्जन वजन']}
                />
                <Bar dataKey="yieldQuintal" fill="#ea580c" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#78716c' }} />
                <YAxis tick={{ fontSize: 12, fill: '#78716c' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'कुल राशि']}
                />
                <Line type="monotone" dataKey="earnings" stroke="#dc2626" strokeWidth={3} dot={{ r: 6, fill: '#ea580c' }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* SEASON-BY-SEASON HISTORICAL TABLE */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        <div className="p-5 border-b border-stone-100">
          <h3 className="font-extrabold text-base text-stone-900">
            विस्तृत मौसम इतिहास (Detailed Harvest Log)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
              <tr>
                <th className="p-3">सीजन / वर्ष</th>
                <th className="p-3">फसल</th>
                <th className="p-3">रकबा (Acres)</th>
                <th className="p-3">वजन (Qtl)</th>
                <th className="p-3">MSP दर</th>
                <th className="p-3">कुल आय</th>
                <th className="p-3">नमी %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
              {historicalYields.map((record) => (
                <tr key={record.id} className="hover:bg-orange-50/50 transition">
                  <td className="p-3 font-bold text-stone-900">{record.season} {record.year}</td>
                  <td className="p-3">{record.crop}</td>
                  <td className="p-3 font-mono">{record.acreage} Acre</td>
                  <td className="p-3 font-mono font-bold text-orange-800">{record.yieldQuintal} Qtl</td>
                  <td className="p-3 font-mono">₹{record.mspRate}</td>
                  <td className="p-3 font-mono font-black text-stone-900">₹{record.totalEarnings.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono text-red-600 font-bold">{record.moisturePercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
