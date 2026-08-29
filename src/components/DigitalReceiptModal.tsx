import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  Calendar, 
  FileText,
  Award,
  QrCode,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DigitalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({ isOpen, onClose }) => {
  const { farmer, procurementDetail, t } = useApp();
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `KisanSetu e-J-Form Receipt ${procurementDetail.eJFormNumber}`,
        text: `KisanSetu Procurement Receipt for ${farmer.name} - ₹${procurementDetail.totalPayableAmount.toLocaleString('en-IN')}`,
        url: window.location.href,
      }).catch(() => {
        // fallback
      });
    } else {
      navigator.clipboard.writeText(`KisanSetu e-J-Form: ${procurementDetail.eJFormNumber} | Amount: ₹${procurementDetail.totalPayableAmount} | Farmer: ${farmer.name}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    // Generate simulated download
    const element = document.createElement('a');
    const file = new Blob([
      `====================================================\n` +
      `GOVERNMENT OF INDIA & STATE FOOD & CIVIL SUPPLIES\n` +
      `KISANSETU e-J-FORM DIGITAL PROCUREMENT RECEIPT\n` +
      `====================================================\n\n` +
      `Receipt No: ${procurementDetail.eJFormNumber}\n` +
      `Reference ID: ${procurementDetail.referenceId}\n` +
      `Date: ${procurementDetail.procurementDate}\n\n` +
      `FARMER DETAILS:\n` +
      `Name: ${farmer.name} (${farmer.hindiName})\n` +
      `Farmer ID: ${farmer.farmerId}\n` +
      `Village/District: ${farmer.village}, ${farmer.district}, ${farmer.state}\n` +
      `Aadhaar (Masked): ${farmer.maskedAadhaar}\n` +
      `Bank Acc (Masked): ${farmer.maskedBankAcc} (${farmer.bankName})\n\n` +
      `CROP & PROCUREMENT DETAILS:\n` +
      `Crop: ${procurementDetail.crop} (${procurementDetail.variety})\n` +
      `Center: ${procurementDetail.centerName}\n` +
      `Gross Weight: ${procurementDetail.grossWeightKg} kg\n` +
      `Tare Weight: ${procurementDetail.tareWeightKg} kg\n` +
      `Net Accepted Weight: ${procurementDetail.acceptedQuantityQuintal} Quintals (${procurementDetail.netWeightKg} kg)\n` +
      `Moisture Level: ${procurementDetail.quality.moisturePercent}% (Limit < 12.0%)\n` +
      `Quality Grade: ${procurementDetail.quality.cropGrade}\n` +
      `MSP Rate: ₹${procurementDetail.mspRatePerQuintal} / Quintal\n` +
      `TOTAL PAYABLE AMOUNT: ₹${procurementDetail.totalPayableAmount.toLocaleString('en-IN')}\n\n` +
      `Status: Officially Verified & DBT Initiated\n` +
      `====================================================`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `KisanSetu-Receipt-${procurementDetail.eJFormNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        >
          {/* Header Action Bar */}
          <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center border border-emerald-500/30">
                <Award className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  डिजिटल खरीद रसीद (e-J-Form)
                </h3>
                <p className="text-xs text-emerald-200">
                  Government Certified Electronic Procurement Receipt
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

          {/* Printable Receipt Content */}
          <div ref={printRef} className="p-6 space-y-6 text-slate-800 bg-white">
            {/* National & State Header Stamp */}
            <div className="text-center pb-4 border-b border-dashed border-slate-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold border border-emerald-200 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                e-Procurement Portal & Mandi Board
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                KISANSETU OFFICIAL PROCUREMENT J-FORM
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                खाद्य एवं रसद विभाग | Direct MSP Procurement Under PM-AASHA Scheme
              </p>
              <div className="mt-2 text-xs font-mono font-bold text-slate-600 bg-slate-100 inline-block px-2.5 py-1 rounded">
                रसीद क्रमांक: {procurementDetail.eJFormNumber}
              </div>
            </div>

            {/* Farmer & Center Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-xs">किसान का नाम / Farmer Name:</span>
                <span className="font-bold text-slate-900">{farmer.name} ({farmer.hindiName})</span>
                <span className="text-slate-500 block text-xs mt-2">किसान पंजीयन आईडी / Farmer ID:</span>
                <span className="font-mono font-semibold text-slate-800">{farmer.farmerId}</span>
                <span className="text-slate-500 block text-xs mt-2">पता / Village & District:</span>
                <span className="text-slate-700">{farmer.village}, {farmer.district}, {farmer.state}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-xs">क्रय केंद्र / Procurement Center:</span>
                <span className="font-bold text-slate-900">{procurementDetail.centerName}</span>
                <span className="text-slate-500 block text-xs mt-2">खरीद तिथि / Procurement Date:</span>
                <span className="font-medium text-slate-800">{procurementDetail.procurementDate}</span>
                <span className="text-slate-500 block text-xs mt-2">डीबीटी बैंक खाता / Linked Bank:</span>
                <span className="font-mono text-slate-800">{farmer.bankName} ({farmer.maskedBankAcc})</span>
              </div>
            </div>

            {/* Weighing & Crop Details Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs sm:text-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-700 text-xs font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3 border-b">फसल विवरण</th>
                    <th className="py-2.5 px-3 border-b text-center">नमी %</th>
                    <th className="py-2.5 px-3 border-b text-right">स्वीकृत मात्रा</th>
                    <th className="py-2.5 px-3 border-b text-right">MSP दर (₹/Qtl)</th>
                    <th className="py-2.5 px-3 border-b text-right">कुल देय राशि</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{procurementDetail.crop}</div>
                      <div className="text-xs text-slate-500">{procurementDetail.variety} • {procurementDetail.quality.cropGrade}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-emerald-700">
                      {procurementDetail.quality.moisturePercent}%
                      <span className="block text-[10px] text-slate-500">(मानक &lt;12%)</span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {procurementDetail.acceptedQuantityQuintal} Qtl
                      <span className="block text-[10px] text-slate-500">({procurementDetail.netWeightKg} kg)</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800">
                      ₹{procurementDetail.mspRatePerQuintal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-700 font-mono text-base">
                      ₹{procurementDetail.totalPayableAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Highlight & Digital Verification */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg p-1 border border-emerald-300 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    डिजिटल हस्ताक्षरित एवं सत्यापित
                  </div>
                  <div className="text-[11px] text-slate-600">
                    जांच अधिकारी: {procurementDetail.quality.inspectorName}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    सत्यापन समय: {procurementDetail.quality.verifiedAt}
                  </div>
                </div>
              </div>

              <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="text-xs text-slate-500">कुल देय राशि (DBT प्रेषित)</div>
                <div className="text-2xl font-black text-emerald-800 font-mono">
                  ₹{procurementDetail.totalPayableAmount.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">
                  (बानवे हज़ार रुपये मात्र / Ninety Two Thousand Only)
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="text-[11px] text-slate-500 leading-relaxed border-t pt-3">
              <p>
                <strong>महत्वपूर्ण सूचना:</strong> यह भारत सरकार के पोर्टल पर दर्ज आधिकारिक e-J-Form है। राशि सीधे आपके आधार लिंक बैंक खाते में DBT/PFMS के माध्यम से अंतरित की जा रही है। किसी बिचौलिए या कमीशन की आवश्यकता नहीं है।
              </p>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              {copied ? '✅ लिंक कॉपी हो गया!' : 'रसीद प्रिंट अथवा डाउनलोड करें'}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-sm"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
                साझा करें
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-sm"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                प्रिंट
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                डाउनलोड (e-J-Form)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
