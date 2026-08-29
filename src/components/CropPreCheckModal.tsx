import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sun, 
  Droplets, 
  ShieldCheck, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CropPreCheckResult } from '../types';

interface CropPreCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CropPreCheckModal: React.FC<CropPreCheckModalProps> = ({ isOpen, onClose }) => {
  const { farmer, language } = useApp();
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat (गेहूं)');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<CropPreCheckResult | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setImagePreview(uploadEvent.target?.result as string);
        runSimulatedAiScan(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateSampleScan = () => {
    // Generate a high quality wheat/paddy sample visual
    const sampleImg = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80';
    setImagePreview(sampleImg);
    runSimulatedAiScan(sampleImg);
  };

  const runSimulatedAiScan = (imgUrl: string) => {
    setIsAnalyzing(true);
    setScanResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setScanResult({
        scanId: `SCAN-AI-${Math.floor(1000 + Math.random() * 9000)}`,
        cropType: selectedCrop,
        imageUrl: imgUrl,
        estimatedMoisturePercent: 11.4,
        isMoistureSafe: true,
        cleanlinessScorePercent: 96,
        grainLusterGrade: 'Good',
        status: 'passed_preliminary',
        recommendations: [
          'दाने साफ, चमकदार और सूखे प्रतीत हो रहे हैं।',
          'अनुमानित नमी 11.4% (मानक < 12.0%) स्वीकार्य सीमा में है।',
          'ट्रॉली में भरने से पहले डस्ट और भूसे को एक बार और छान लें।',
          'बारिश से बचाव के लिए तिरपाल साथ अवश्य रखें।'
        ],
        analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 1800);
  };

  const handleReset = () => {
    setImagePreview(null);
    setScanResult(null);
    setIsAnalyzing(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-600/60 flex items-center justify-center border border-amber-400/30">
                <Camera className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight flex items-center gap-1.5">
                  फसल गुणवत्ता पूर्व-जांच (Crop Pre-Check)
                  <span className="text-[10px] bg-amber-500/40 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    AI Beta
                  </span>
                </h3>
                <p className="text-xs text-amber-200">
                  घर से निकलने से पहले फसल की प्रारंभिक नमी व स्वच्छता जांचें
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-amber-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mandatory Government & System Disclaimer */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>महत्वपूर्ण सूचना:</strong> यह केवल आपकी सुविधा के लिए <em>प्रारंभिक AI मार्गदर्शन</em> है। अंतिम गुणवत्ता व नमी परीक्षण खरीद केंद्र पर अधिकृत लैब मीटर द्वारा ही मान्य होगा।
            </p>
          </div>

          <div className="p-5 space-y-5">
            {/* Crop Selector */}
            {!scanResult && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  फसल चुनें जिसका नमूना जांचना है:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Wheat (गेहूं)', 'Paddy (धान)', 'Mustard (सरसों)'].map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => setSelectedCrop(crop)}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border text-center transition ${
                        selectedCrop === crop
                          ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area or Analysis View */}
            {!imagePreview ? (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-amber-500 transition bg-slate-50/50">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    फसल के दानों की स्पष्ट फोटो लें या अपलोड करें
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    मुट्ठी भर दानों को हथेली या साफ सफेद कागज पर रखकर अच्छी रोशनी में फोटो खींचें
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition shadow-sm">
                      <Camera className="w-4 h-4" />
                      कैमरा खोलें / फोटो चुनें
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSimulateSampleScan}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      डेमो सैंपल से टेस्ट करें
                    </button>
                  </div>
                </div>

                {/* Practical Tips */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    सरकारी मानक सलाह:
                  </div>
                  <p>• गेहूं व धान में नमी <strong>12.0%</strong> से कम होनी चाहिए।</p>
                  <p>• यदि दानों में नरमी लगे, तो केंद्र ले जाने से पहले 2-3 घंटे धूप में सुखा लें।</p>
                </div>
              </div>
            ) : isAnalyzing ? (
              /* Loading Scanner */
              <div className="py-10 text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md">
                  <img src={imagePreview} alt="Crop sample" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                    फसल के दानों का AI विश्लेषण जारी है...
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    नमी का स्तर, दाने का रंग और अशुद्धियों की जांच की जा रही है
                  </p>
                </div>
              </div>
            ) : scanResult ? (
              /* Scan Result Card */
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-300 shrink-0">
                    <img src={scanResult.imageUrl} alt="Sample" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      प्रारंभिक जांच: मानक के अनुकूल (Ready)
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      नमूना आईडी: {scanResult.scanId} • समय: {scanResult.analyzedAt}
                    </div>
                  </div>
                </div>

                {/* Metric Indicators */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      अनुमानित नमी
                    </div>
                    <div className="text-lg font-black text-emerald-700 mt-0.5">
                      {scanResult.estimatedMoisturePercent}%
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">मानक &lt;12% सुरक्षित</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      स्वच्छता स्कोर
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {scanResult.cleanlinessScorePercent}%
                    </div>
                    <div className="text-[10px] text-slate-500">अशुद्धि &lt;0.5%</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                      <Sun className="w-3 h-3 text-amber-500" />
                      दाने की चमक
                    </div>
                    <div className="text-lg font-black text-amber-700 mt-0.5">
                      उत्तम
                    </div>
                    <div className="text-[10px] text-slate-500">FAQ ग्रेड A</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    AI किसान सलाह:
                  </div>
                  {scanResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-600">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    दूसरा नमूना जांचें
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-sm"
                  >
                    ठीक है, समझ गया
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
