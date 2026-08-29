import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  PhoneCall, 
  Sparkles, 
  FileCheck, 
  Droplet, 
  Scale, 
  IndianRupee, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const { setIsAiModalOpen, t } = useApp();

  const faqs = [
    {
      q: 'खरीद केंद्र जाने के लिए क्या-क्या दस्तावेज़ अनिवार्य हैं?',
      a: '1. ई-टोकन पर्ची (मोबाइल में या प्रिंट)\n2. मूल आधार कार्ड (e-KYC सत्यापन हेतु)\n3. खतौनी / जमाबंदी 7/12 भू-अभिलेख की प्रति\n4. बैंक पासबुक की प्रति (Aadhaar Linked DBT Account)'
    },
    {
      q: 'फसल में नमी (Moisture) कितनी होनी चाहिए?',
      a: 'गेहूं व धान के लिए सरकारी मानक के अनुसार नमी अधिकतम 12.0% मान्य है। यदि नमी 12% से अधिक है, तो मंडी में सुखाने के लिए ड्रायर का उपयोग करें।'
    },
    {
      q: 'फसल बेचने के बाद भुगतान कितने दिनों में आएगा?',
      a: 'ई-जे फार्म जनरेट होने के पश्चात 24 से 48 घंटे के भीतर डायरेक्ट बेनिफिट ट्रांसफर (DBT/PFMS) द्वारा सीधे आपके बैंक खाते में राशि जमा हो जाती है।'
    },
    {
      q: 'यदि स्लॉट के समय पर न पहुँच पाएँ तो क्या होगा?',
      a: 'आपका टोकन 2 घंटे तक सुरक्षित रहता है। उसके बाद आप ऐप के माध्यम से अगले दिन का नया स्लॉट निःशुल्क पुनः शेड्यूल कर सकते हैं।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
          <HelpCircle size={26} className="text-red-600" />
          <span>{t('helpTitle')} (Farmer Help Center & Support)</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          टोल-फ्री हेल्पलाइन, जरूरी नियम, आवश्यक दस्तावेज सूची और AI मार्गदर्शन
        </p>
      </div>

      {/* TOLL FREE BANNER */}
      <div className="bg-gradient-to-r from-neutral-950 via-red-950 to-orange-950 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-800/60">
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-400 text-neutral-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase shadow-xs">
            राष्ट्रीय किसान कॉल सेंटर
          </span>
          <h3 className="text-2xl sm:text-3xl font-black mt-1 font-mono text-yellow-300">1800-180-1551</h3>
          <p className="text-xs text-orange-200 font-medium">
            टोल-फ्री • प्रातः 6:00 से रात्रि 10:00 तक (सभी 11 क्षेत्रीय भाषाओं में)
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="tel:18001801551"
            className="px-5 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-neutral-950 font-black text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-md transition"
          >
            <PhoneCall size={16} />
            <span>कॉल करें (Call Now)</span>
          </a>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-5 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-md border border-orange-400/50 transition"
          >
            <Sparkles size={16} className="text-yellow-300" />
            <span>AI से पूछें</span>
          </button>
        </div>
      </div>

      {/* MANDATORY CHECKLIST */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 space-y-4">
        <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <FileCheck size={20} className="text-red-600" />
          <span>खरीद केंद्र पर जाने से पूर्व तैयारी चेकलिस्ट (Checklist)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-bold">1. नमी परीक्षण (Moisture Check)</strong>
              <p className="text-stone-600 text-[11px] mt-0.5">फसल को धूप में अच्छी तरह सुखा लें, नमी 12% से कम होनी चाहिए।</p>
            </div>
          </div>

          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-bold">2. मूल आधार कार्ड</strong>
              <p className="text-stone-600 text-[11px] mt-0.5">फिंगरप्रिंट बायोमेट्रिक e-KYC के लिए आधार आवश्यक है।</p>
            </div>
          </div>

          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-bold">3. भू-अभिलेख खतौनी 7/12</strong>
              <p className="text-stone-600 text-[11px] mt-0.5">रकबा सत्यापन हेतु जमीन की अद्यतन खतौनी नकल साथ लाएं।</p>
            </div>
          </div>

          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block font-bold">4. ई-टोकन पर्ची (Token Pass)</strong>
              <p className="text-stone-600 text-[11px] mt-0.5">गेट एंट्री पर QR कोड स्कैन कराने के लिए टोकन नंबर रखें।</p>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 space-y-4">
        <h3 className="font-extrabold text-base text-stone-900 border-b border-stone-100 pb-3">
          अक्सर पूछे जाने वाले सवाल (FAQs)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
              <h4 className="font-black text-sm text-stone-900">
                ❓ {faq.q}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line font-medium">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
