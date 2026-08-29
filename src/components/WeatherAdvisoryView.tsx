/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Eye, 
  Volume2, 
  VolumeX,
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Wheat, 
  FileText, 
  Truck, 
  CheckSquare, 
  Square,
  HelpCircle,
  RefreshCw,
  Navigation,
  Compass,
  Mic,
  Bot
} from 'lucide-react';
import { 
  WeatherService, 
  WeatherData, 
  WeatherConditionType, 
  AVAILABLE_LOCATIONS,
  WEATHER_PRESETS 
} from '../services/weatherService';

export const WeatherAdvisoryView: React.FC = () => {
  const { 
    farmer, 
    activeBooking, 
    t, 
    speak, 
    stopSpeakingVoice,
    setActiveTab, 
    language,
    setIsAiModalOpen
  } = useApp();

  const [currentCondition, setCurrentCondition] = useState<WeatherConditionType>('rain');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('rampur');
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    farmer_id: true,
    bank_doc: true,
    phone: true,
    tarpaulin: false,
    doc_bag: false,
  });
  const [activeVoiceQuery, setActiveVoiceQuery] = useState<string | null>(null);

  const selectedLoc = AVAILABLE_LOCATIONS.find(l => l.id === selectedLocationId) || AVAILABLE_LOCATIONS[0];
  const locName = selectedLoc.localizedNames?.[language] || selectedLoc.name;
  const centerName = selectedLoc.localizedCenterNames?.[language] || selectedLoc.centerName;

  // Get current dynamic weather and localized advisories
  const weather: WeatherData = {
    ...WeatherService.getCurrentWeather(language),
    ...WEATHER_PRESETS[currentCondition],
    condition: currentCondition,
    locationName: locName,
    locationHindi: selectedLoc.hindiName,
    nearestCenterName: centerName,
    nearestCenterHindi: selectedLoc.centerHindi,
    distanceToCenterKm: selectedLoc.distanceToCenterKm,
  };

  const advisory = WeatherService.getFarmerAdvisory(
    weather,
    activeBooking.timeSlot || '03:30 PM',
    30,
    activeBooking.farmersAhead || 18,
    language
  );

  const carryItems = WeatherService.getCarryItems(weather.condition, language);
  const forecast = WeatherService.get5DayForecast(language);
  const alerts = WeatherService.getWeatherAlerts(weather, activeBooking.timeSlot || '03:30 PM', language);

  const toggleCarryItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVoiceReadout = () => {
    const text = WeatherService.getVoiceSummary(weather, advisory, language);
    setIsPlayingAudio(true);
    speak(text);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 12000);
  };

  const handleStopAudio = () => {
    stopSpeakingVoice();
    setIsPlayingAudio(false);
    setActiveVoiceQuery(null);
  };

  // Localized questions and answers for one-tap AI Voice interaction
  const getLocalizedVoiceQuestions = () => {
    switch (language) {
      case 'pa':
        return [
          {
            q: 'ਅੱਜ ਮੌਸਮ ਕਿਹੋ ਜਿਹਾ ਹੈ?',
            a: `ਤੁਹਾਡੇ ਇਲਾਕੇ ${locName} ਵਿੱਚ ਅੱਜ ${weather.temperatureC} ਡਿਗਰੀ ਤਾਪਮਾਨ ਹੈ ਅਤੇ ਮੀਂਹ ਦੀ ${weather.rainProbabilityPercent} ਪ੍ਰਤੀਸ਼ਤ ਸੰਭਾਵਨਾ ਹੈ। ${advisory.headline}`
          },
          {
            q: 'ਮੈਨੂੰ ਮੰਡੀ ਕਦੋਂ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ?',
            a: `ਤੁਹਾਡਾ ਸਲਾਟ ${activeBooking.timeSlot || '03:30 PM'} ਦਾ ਹੈ। ਮੌਸਮ ਅਤੇ ਕਤਾਰ ਨੂੰ ਦੇਖਦੇ ਹੋਏ ${advisory.recommendedDepartureTime} ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`
          },
          {
            q: 'ਫਸਲ ਨੂੰ ਕਿਵੇਂ ਬਚਾਇਆ ਜਾਵੇ?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'ਕੀ ਖਰੀਦ ਕੇਂਦਰ ਖੁੱਲ੍ਹਾ ਹੈ?',
            a: `${centerName} ਖੁੱਲ੍ਹਾ ਹੈ ਅਤੇ ਕੰਪਿਊਟਰ ਕੰਡਾ ਚਾਲੂ ਹੈ। ਕਤਾਰ ਵਿੱਚ ${activeBooking.farmersAhead || 18} ਕਿਸਾਨ ਹਨ।`
          }
        ];
      case 'mr':
        return [
          {
            q: 'आज हवामान कसे आहे?',
            a: `आपल्या ${locName} परिसरात आज तापमान ${weather.temperatureC} अंश आहे आणि पावसाची ${weather.rainProbabilityPercent} टक्के शक्यता आहे. ${advisory.headline}`
          },
          {
            q: 'मी केंद्रावर कधी जावे?',
            a: `आपला स्लॉट ${activeBooking.timeSlot || '03:30 PM'} चा आहे. हवामान पाहून दुपारी ${advisory.recommendedDepartureTime} वाजता निघा.`
          },
          {
            q: 'धान्याचे संरक्षण कसे करावे?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'खरेदी केंद्र सुरू आहे का?',
            a: `${centerName} सुरू आहे. सध्या रांगेत ${activeBooking.farmersAhead || 18} शेतकरी आहेत.`
          }
        ];
      case 'gu':
        return [
          {
            q: 'આજે હવામાન કેવું છે?',
            a: `તમારા વિસ્તાર ${locName} માં આજે ${weather.temperatureC} ડિગ્રી તાપમાન છે અને વરસાદની ${weather.rainProbabilityPercent} ટકા શક્યતા છે. ${advisory.headline}`
          },
          {
            q: 'મારે કેન્દ્ર ક્યારે નીકળવું?',
            a: `તમારો સ્લોટ ${activeBooking.timeSlot || '03:30 PM'} નો છે. બપોરે ${advisory.recommendedDepartureTime} વાગ્યે નીકળવું યોગ્ય રહેશે.`
          },
          {
            q: 'પાકનું રક્ષણ કેવી રીતે કરવું?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'શું ખરીદ કેન્દ્ર ચાલુ છે?',
            a: `${centerName} ચાલુ છે અને વજનકાંટો સક્રિય છે. કતારમાં ${activeBooking.farmersAhead || 18} ખેડૂતો છે.`
          }
        ];
      case 'bn':
        return [
          {
            q: 'আজ আবহাওয়া কেমন?',
            a: `আপনার এলাকা ${locName} এ আজকের তাপমাত্রা ${weather.temperatureC} ডিগ্রি এবং বৃষ্টির সম্ভাবনা ${weather.rainProbabilityPercent}%। ${advisory.headline}`
          },
          {
            q: 'আমার কখন রওনা দেওয়া উচিত?',
            a: `আপনার স্লট ${activeBooking.timeSlot || '03:30 PM'} এ। আবহাওয়া দেখে ${advisory.recommendedDepartureTime} এ রওনা দেওয়ার পরামর্শ।`
          },
          {
            q: 'ফসল কীভাবে রক্ষা করব?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'ক্রয় কেন্দ্র কি খোলা আছে?',
            a: `${centerName} সম্পূর্ণ চালু আছে। সারিতে এখন ${activeBooking.farmersAhead || 18} জন কৃষক রয়েছেন।`
          }
        ];
      case 'te':
        return [
          {
            q: 'ఈరోజు వాతావరణం ఎలా ఉంది?',
            a: `మీ ప్రాంతం ${locName} లో ఉష్ణోగ్రత ${weather.temperatureC} డిగ్రీలు, వర్షం అవకాశం ${weather.rainProbabilityPercent}%. ${advisory.headline}`
          },
          {
            q: 'నేను ఎప్పుడు బయలుదేరాలి?',
            a: `మీ సమయం ${activeBooking.timeSlot || '03:30 PM'}. మీరు ${advisory.recommendedDepartureTime} కల్లా బయలుదేరండి.`
          },
          {
            q: 'ధాన్యాన్ని ఎలా కాపాడుకోవాలి?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'సేకరణ కేంద్రం తెరిచి ఉందా?',
            a: `${centerName} తెరిచి ఉంది. క్యూలో ${activeBooking.farmersAhead || 18} మంది రైతులు ఉన్నారు.`
          }
        ];
      case 'ta':
        return [
          {
            q: 'இன்று வானிலை எப்படி உள்ளது?',
            a: `உங்கள் பகுதி ${locName} இல் இன்று வெப்பநிலை ${weather.temperatureC}°C, மழை வாய்ப்பு ${weather.rainProbabilityPercent}%. ${advisory.headline}`
          },
          {
            q: 'நான் எப்போது புறப்பட வேண்டும்?',
            a: `உங்கள் நேரம் ${activeBooking.timeSlot || '03:30 PM'}. நீங்கள் ${advisory.recommendedDepartureTime} மணிக்கு புறப்படுங்கள்.`
          },
          {
            q: 'பயிர்களை எப்படி பாதுகாப்பது?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'கொள்முதல் மையம் திறக்கப்பட்டுள்ளதா?',
            a: `${centerName} செயல்படுகிறது. வரிசையில் ${activeBooking.farmersAhead || 18} விவசாயிகள் உள்ளனர்.`
          }
        ];
      case 'kn':
        return [
          {
            q: 'ಇಂದು ಹವಾಮಾನ ಹೇಗಿದೆ?',
            a: `ನಿಮ್ಮ ಪ್ರದೇಶ ${locName} ದಲ್ಲಿ ತಾಪಮಾನ ${weather.temperatureC}°C, ಮಳೆ ಸಂಭವನೀಯತೆ ${weather.rainProbabilityPercent}%. ${advisory.headline}`
          },
          {
            q: 'ನಾನು ಯಾವಾಗ ಹೊರಡಬೇಕು?',
            a: `ನಿಮ್ಮ ಸ್ಲಾಟ್ ${activeBooking.timeSlot || '03:30 PM'}. ನೀವು ${advisory.recommendedDepartureTime} ಗೆ ಹೊರಡಲು ಸಲಹೆ.`
          },
          {
            q: 'ಬೆಳೆಯನ್ನು ಹೇಗೆ ರಕ್ಷಿಸುವುದು?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'ಖರೀದಿ ಕೇಂದ್ರ ತೆರೆದಿದೆಯೇ?',
            a: `${centerName} ತೆರೆದಿದೆ. ಸರದಿಯಲ್ಲಿ ${activeBooking.farmersAhead || 18} ರೈತರಿದ್ದಾರೆ.`
          }
        ];
      case 'ml':
        return [
          {
            q: 'ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയുണ്ട്?',
            a: `നിങ്ങളുടെ പ്രദേശം ${locName} ൽ താപനില ${weather.temperatureC}°C, മഴ സാധ്യത ${weather.rainProbabilityPercent}%. ${advisory.headline}`
          },
          {
            q: 'ഞാൻ എപ്പോഴാണ് പോകേണ്ടത്?',
            a: `നിങ്ങളുടെ സ്ലോട്ട് ${activeBooking.timeSlot || '03:30 PM'} ആണ്. ${advisory.recommendedDepartureTime} ന് പുറപ്പെടുക.`
          },
          {
            q: 'വിളകൾ എങ്ങനെ സംരക്ഷിക്കാം?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'സംഭരണ കേന്ദ്രം തുറന്നിട്ടുണ്ടോ?',
            a: `${centerName} തുറന്നിരിക്കുന്നു. ക്യൂവിൽ ${activeBooking.farmersAhead || 18} കർഷകരുണ്ട്.`
          }
        ];
      case 'or':
        return [
          {
            q: 'ଆଜି ପାଣିପାଗ କିପରି ଅଛି?',
            a: `ଆପଣଙ୍କ ଅଞ୍ଚଳ ${locName} ରେ ତାପମାତ୍ରା ${weather.temperatureC}°C, ବର୍ଷା ସମ୍ଭାବନା ${weather.rainProbabilityPercent}%. ${advisory.headline}`
          },
          {
            q: 'ମୁଁ କେତେବେଳେ ବାହାରିବି?',
            a: `ଆପଣଙ୍କ ସ୍ଲଟ୍ ${activeBooking.timeSlot || '03:30 PM'}। ଆପଣ ${advisory.recommendedDepartureTime} ରେ ବାହାରନ୍ତୁ।`
          },
          {
            q: 'ଫସଲ କିପରି ସୁରକ୍ଷିତ ରଖିବି?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'କ୍ରୟ କେନ୍ଦ୍ର ଖୋଲା ଅଛି କି?',
            a: `${centerName} ଖୋଲା ଅଛି ଏବଂ ଧାଡ଼ିରେ ${activeBooking.farmersAhead || 18} ଜଣ ଚାଷୀ ଅଛନ୍ତି।`
          }
        ];
      case 'en':
        return [
          {
            q: 'How is the weather today?',
            a: `In ${locName}, the temperature is ${weather.temperatureC}°C with ${weather.rainProbabilityPercent}% rain probability. ${advisory.headline}`
          },
          {
            q: 'When should I depart for center?',
            a: `Your slot is ${activeBooking.timeSlot || '03:30 PM'}. Considering road buffer and queue, recommended departure is by ${advisory.recommendedDepartureTime}.`
          },
          {
            q: 'How to protect my crop?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'Is procurement center open?',
            a: `${centerName} is open and weighbridge is fully operational with ${activeBooking.farmersAhead || 18} farmers ahead in queue.`
          }
        ];
      default: // Hindi
        return [
          {
            q: 'आज मौसम कैसा है?',
            a: `आपके इलाके ${locName} में आज ${weather.temperatureC} डिग्री तापमान है और बारिश की ${weather.rainProbabilityPercent} प्रतिशत संभावना है। ${advisory.headline}`
          },
          {
            q: 'मुझे कब निकलना चाहिए?',
            a: `आपकी खरीद स्लॉट ${activeBooking.timeSlot || '03:30 PM'} की है। मौसम व कतार को देखते हुए ${advisory.recommendedDepartureTime} तक निकलने की सलाह है।`
          },
          {
            q: 'फसल को कैसे ढकें व सुरक्षित रखें?',
            a: `${advisory.cropAdvice}`
          },
          {
            q: 'क्या खरीद केंद्र खुला है?',
            a: `${centerName} खुला है और तौल कांटा सक्रिय है। कतार में अभी लगभग ${activeBooking.farmersAhead || 18} किसान हैं।`
          }
        ];
    }
  };

  const voiceQuestions = getLocalizedVoiceQuestions();

  const handleSimulatedQuery = (question: string, answer: string) => {
    setActiveVoiceQuery(question);
    setIsPlayingAudio(true);
    speak(answer);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
              <CloudSun size={24} className="stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{t('weatherAdvisory')}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  AI Voice Live
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {language === 'hi' 
                  ? 'मौसम देखें नहीं, मौसम के हिसाब से तैयारी करें (Smart Procurement Advisory)'
                  : 'Practical real-time weather protection & dispatch advisory for farmers'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isPlayingAudio ? (
            <button
              onClick={handleStopAudio}
              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition animate-pulse"
            >
              <VolumeX size={16} className="text-red-600" />
              <span>{t('stopAudio') || 'Stop Audio'}</span>
            </button>
          ) : (
            <button
              onClick={handleVoiceReadout}
              className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
            >
              <Volume2 size={16} className="text-emerald-700" />
              <span>🎤 {t('listenAudio')} (AI Voice)</span>
            </button>
          )}

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <Mic size={16} className="text-purple-700" />
            <span>AI {t('voiceAssistant') || 'Assistant'}</span>
          </button>

          <button
            onClick={() => setShowLocationModal(true)}
            className="px-3.5 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
          >
            <MapPin size={16} className="text-sky-600" />
            <span>{t('changeLocation')}</span>
          </button>
        </div>
      </div>

      {/* WEATHER CONDITION SIMULATOR (FOR SIH DEMO & PRESENTATION) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-sky-600" />
            <span>{language === 'hi' ? 'मौसम स्थिति सिम्युलेटर (Demo Weather Simulation)' : 'Weather Condition Simulator'}</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'hi' ? 'विभिन्न मौसम स्थितियों का परीक्षण करें' : 'Test dynamic conditions & advisories'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => {
              setCurrentCondition('rain');
              speak(language === 'hi' ? 'बारिश की संभावना 70 प्रतिशत चुनी गई' : 'Rain probability 70 percent selected');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              currentCondition === 'rain'
                ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>🌧️ {language === 'hi' ? 'बारिश (70%)' : 'Rain (70%)'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentCondition('heavy_rain');
              speak(language === 'hi' ? 'भारी बारिश चेतावनी चुनी गई' : 'Heavy rain warning selected');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              currentCondition === 'heavy_rain'
                ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>⛈️ {language === 'hi' ? 'भारी बारिश (90%)' : 'Heavy Rain (90%)'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentCondition('clear');
              speak(language === 'hi' ? 'मौसम साफ चुना गया' : 'Clear weather selected');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              currentCondition === 'clear'
                ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>☀️ {language === 'hi' ? 'मौसम साफ (31°C)' : 'Clear (31°C)'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentCondition('hot');
              speak(language === 'hi' ? 'तेज धूप व 38 डिग्री तापमान चुना गया' : 'High heat 38 degrees selected');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              currentCondition === 'hot'
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>🔥 {language === 'hi' ? 'तेज धूप (38°C)' : 'Heat (38°C)'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentCondition('windy');
              speak(language === 'hi' ? 'तेज हवा 34 किलोमीटर प्रति घंटा चुनी गई' : 'Strong wind 34 km/h selected');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              currentCondition === 'windy'
                ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>🌬️ {language === 'hi' ? 'तेज हवा (34 km/h)' : 'Windy (34 km/h)'}</span>
          </button>
        </div>
      </div>

      {/* LOCATION & DISTANCE STRIP */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sky-950 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
            <MapPin size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                {t('yourLocation')}
              </span>
              <span className="bg-white text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-sky-200">
                GPS Live
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900">
              {locName} ({selectedLoc.district})
            </h3>
            <p className="text-xs text-sky-800 font-medium">
              📍 <strong>{centerName}</strong> ({selectedLoc.distanceToCenterKm} km)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLocationModal(true)}
          className="self-start sm:self-auto px-3.5 py-2 bg-white hover:bg-sky-100/60 text-sky-900 border border-sky-300 rounded-xl text-xs font-bold transition shadow-2xs"
        >
          [ {t('changeLocation')} ]
        </button>
      </div>

      {/* MAIN TWO-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CURRENT WEATHER, 5-DAY FORECAST & CENTER STATUS (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CURRENT WEATHER CARD */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-sky-100/40 rounded-3xl p-6 border border-sky-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{weather.iconEmoji}</span>
                <div>
                  <h2 className="text-base font-black text-slate-900">{t('weatherTitle')}</h2>
                  <span className="text-[11px] text-slate-500 font-medium">{weather.updatedAt}</span>
                </div>
              </div>
              <span className="bg-sky-100 text-sky-800 text-xs font-extrabold px-2.5 py-1 rounded-full border border-sky-300">
                {weather.conditionLabel}
              </span>
            </div>

            {/* Huge Temperature and Main Condition */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-slate-900 font-mono tracking-tight">
                    {weather.temperatureC}°
                  </span>
                  <span className="text-2xl font-bold text-slate-500">C</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-1">
                  {t('feelsLike')}: <strong className="text-slate-900">{weather.feelsLikeC}°C</strong>
                </p>
              </div>

              <div className="text-right">
                <div className="inline-flex flex-col items-end">
                  <span className="text-xs text-sky-800 font-bold uppercase">{t('rainProbability')}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CloudRain size={20} className="text-sky-600" />
                    <span className="text-2xl sm:text-3xl font-black text-sky-700 font-mono">
                      {weather.rainProbabilityPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Metric Mini Cards */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-2xs">
                <div className="flex items-center justify-center text-sky-600 mb-1">
                  <Droplets size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 block uppercase">{t('humidity')}</span>
                <strong className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                  {weather.humidityPercent}%
                </strong>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-2xs">
                <div className="flex items-center justify-center text-sky-600 mb-1">
                  <Wind size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 block uppercase">{t('windSpeed')}</span>
                <strong className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                  {weather.windSpeedKmH} km/h
                </strong>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-2xs">
                <div className="flex items-center justify-center text-sky-600 mb-1">
                  <Eye size={16} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 block uppercase">{t('visibility')}</span>
                <strong className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                  {weather.visibilityKm} km
                </strong>
              </div>
            </div>
          </div>

          {/* 5-DAY SIMPLE FORECAST */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-emerald-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {t('fiveDayForecast')}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">5-Day Outlook</span>
            </div>

            <div className="space-y-2">
              {forecast.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-2xl flex items-center justify-between transition border ${
                    idx === 0 
                      ? 'bg-sky-50/70 border-sky-200 font-bold' 
                      : 'bg-slate-50/60 border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.conditionEmoji}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.dayName}
                      </h4>
                      <span className="text-[10px] text-slate-500">{item.conditionLabel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                        {item.tempC}°C
                      </span>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-xs font-bold text-sky-700 font-mono flex items-center justify-end gap-1">
                        <CloudRain size={12} className="text-sky-500" />
                        {item.rainProbabilityPercent}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEATHER + CENTER STATUS ACCORDION TILE */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-emerald-700" />
                <h3 className="font-extrabold text-sm text-emerald-950">
                  {centerName}
                </h3>
              </div>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                🟢 {t('centerOpen') || 'OPEN'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200/60">
                <span className="text-emerald-900 text-[10px] font-bold block">{t('currentQueue') || 'Queue'}</span>
                <strong className="text-slate-900 font-mono text-sm">{activeBooking.farmersAhead || 18} {t('farmersAhead') || 'Farmers'}</strong>
              </div>

              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200/60">
                <span className="text-emerald-900 text-[10px] font-bold block">{t('travelTime') || 'Travel Time'}</span>
                <strong className="text-slate-900 font-mono text-sm">~30 {t('minutes') || 'min'}</strong>
              </div>
            </div>

            <p className="text-xs text-emerald-950 font-medium leading-relaxed bg-white/60 p-2.5 rounded-xl border border-emerald-100">
              💡 <strong>{t('centerStatus') || 'Status'}:</strong> {centerName} {language === 'hi' ? 'पूरी तरह संचालित है। नमी मानक 12% से कम रखने हेतु फसल को वाटरप्रूफ तिरपाल से ढककर लाएं।' : 'is fully operational. Keep crop covered to ensure moisture remains below 12%.'}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: TODAY'S FARMER ADVISORY, PROCUREMENT ADVICE, WHAT TO CARRY, VOICE & ALERTS (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* 1. TODAY'S FARMER ADVISORY (THE MOST CRITICAL COMPONENT) */}
          <div className={`rounded-3xl p-6 border-2 shadow-sm space-y-4 transition-all ${
            advisory.severity === 'critical'
              ? 'bg-red-50/80 border-red-300'
              : advisory.severity === 'caution'
              ? 'bg-amber-50/80 border-amber-300'
              : 'bg-emerald-50/80 border-emerald-300'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-900/10 pb-3">
              <div className="flex items-center gap-2">
                {advisory.severity === 'critical' ? (
                  <ShieldAlert size={22} className="text-red-600" />
                ) : (
                  <AlertTriangle size={22} className="text-amber-600" />
                )}
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {t('farmerAdvisory')}
                </h2>
              </div>
              <button
                onClick={() => {
                  const speech = `${advisory.headline} ${advisory.cropAdvice} ${advisory.docAdvice} ${advisory.travelAdvice}`;
                  setIsPlayingAudio(true);
                  speak(speech);
                }}
                className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 shrink-0"
              >
                <Volume2 size={14} className="text-slate-800" />
                <span>{t('listenAudio')}</span>
              </button>
            </div>

            {/* Main Headline */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                “{advisory.headline}”
              </p>
            </div>

            {/* 3 Actionable Advice Pillars */}
            <div className="space-y-3">
              {/* Crop Advice */}
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
                  🌾
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                    {t('cropAdvice')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-0.5">
                    {advisory.cropAdvice}
                  </p>
                </div>
              </div>

              {/* Document Advice */}
              <div className="bg-white p-3.5 rounded-2xl border border-sky-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 font-bold text-sm">
                  📄
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-sky-900 tracking-wider">
                    {t('docAdvice')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-0.5">
                    {advisory.docAdvice}
                  </p>
                </div>
              </div>

              {/* Travel Advice */}
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold text-sm">
                  🚜
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider">
                    {t('travelAdvice')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold mt-0.5">
                    {advisory.travelAdvice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. WEATHER + PROCUREMENT SCHEDULE TIMING CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-sky-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {language === 'hi' ? 'मौसम + खरीद स्लॉट समन्वय (Smart Travel Timing)' : 'Weather & Procurement Slot Sync'}
                </h3>
              </div>
              <span className="bg-sky-50 text-sky-800 text-xs font-black px-2.5 py-1 rounded-full border border-sky-200">
                {activeBooking.timeSlot || '03:30 PM'}
              </span>
            </div>

            {/* 4 Connected Data Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">{t('slotTime')}</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">{activeBooking.timeSlot || '03:30 PM'}</strong>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">{t('procurementCenter')}</span>
                <strong className="text-slate-900 text-xs block mt-0.5 truncate">{centerName}</strong>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">{t('travelTime')}</span>
                <strong className="text-slate-900 font-mono text-sm block mt-0.5">30 {t('minutes')}</strong>
              </div>

              <div className="bg-sky-50 p-2.5 rounded-2xl border border-sky-200">
                <span className="text-[10px] text-sky-800 font-bold block uppercase">{t('rainProbability')}</span>
                <strong className="text-sky-700 font-mono text-sm block mt-0.5">{weather.rainProbabilityPercent}%</strong>
              </div>
            </div>

            {/* Smart KisanSetu Calculated Recommendation Box */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>{t('smartAdvice')}</span>
                </span>
                <span className="bg-emerald-700 text-white font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  {t('departureTime') || 'Depart'}: {advisory.recommendedDepartureTime}
                </span>
              </div>

              <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                “{advisory.departureNote}”
              </p>
              <p className="text-xs text-slate-700 font-medium">
                “{advisory.smartAdviceText}”
              </p>
            </div>
          </div>

          {/* 3. WHAT SHOULD I CARRY? (🧳 आज क्या लेकर जाएँ?) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧳</span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{t('whatToCarry')}</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {language === 'hi' ? 'मौसम के अनुसार आवश्यक वस्तुओं की चेकलिस्ट' : 'Essential items checklist tailored for current weather'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {Object.values(checkedItems).filter(Boolean).length} / {carryItems.length} {t('ready') || 'Ready'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {carryItems.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCarryItem(item.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <span className={`text-xs font-bold block ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {item.text}
                        </span>
                        {item.isCrucial && !isChecked && (
                          <span className="text-[10px] text-red-600 font-black">★ {t('crucialItem') || 'Essential'}</span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-emerald-700">
                      {isChecked ? <CheckSquare size={18} /> : <Square size={18} className="text-slate-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. VOICE WEATHER ASSISTANT & SIMULATED QUERIES */}
          <div className="bg-gradient-to-br from-slate-900 via-rose-950/40 to-sky-950 text-white rounded-3xl p-6 shadow-md border border-rose-800/40 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-800/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  👩‍🌾
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>{language === 'hi' ? 'किसान सहेली AI आवाज़ (Indian Girl Voice)' : 'Kisan Saheli AI (Indian Female Voice)'}</span>
                    <span className="bg-pink-600/40 text-pink-200 text-[10px] px-2 py-0.5 rounded-md font-mono uppercase border border-pink-400/30">
                      {language.toUpperCase()} • 11 भाषाएँ
                    </span>
                  </h3>
                  <p className="text-[11px] text-pink-200/90 font-medium">
                    {language === 'hi' ? 'भारतीय महिला स्वर में तुरंत मौसम व फसल सलाह सुनें' : 'Listen to instant weather & grain protection advisory in Indian Female Voice'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Mic size={14} />
                <span>{t('speakNow') || 'दीदी से बोलें'}</span>
              </button>
            </div>

            {/* Quick Interactive Simulated Voice Queries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {voiceQuestions.map((vq, index) => (
                <button
                  key={index}
                  onClick={() => handleSimulatedQuery(vq.q, vq.a)}
                  className={`p-3 border rounded-2xl text-left text-xs font-bold transition flex items-center justify-between ${
                    activeVoiceQuery === vq.q
                      ? 'bg-rose-600/40 border-rose-400 text-white ring-1 ring-rose-300'
                      : 'bg-white/10 hover:bg-white/15 border-white/10 text-rose-100'
                  }`}
                >
                  <span className="truncate pr-2">🗣️ "{vq.q}"</span>
                  <Volume2 size={14} className="text-pink-300 shrink-0" />
                </button>
              ))}
            </div>

            {/* Active Voice Query Feedback */}
            {activeVoiceQuery && (
              <div className="bg-rose-950/80 p-3 rounded-xl border border-rose-700/60 text-xs text-rose-200 flex items-center justify-between gap-2 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="text-sm">👩‍🌾</span>
                  <span>{t('speakingAnswer') || 'किसान सहेली बोल रही हैं'}:</span>
                  <strong className="text-white font-mono">{activeVoiceQuery}</strong>
                </div>
                <button 
                  onClick={handleStopAudio}
                  className="text-xs text-red-300 hover:underline font-bold px-2 py-0.5 rounded bg-red-900/60 border border-red-700"
                >
                  ✕ {t('stop') || 'रोकें'}
                </button>
              </div>
            )}
          </div>

          {/* 5. WEATHER & PROCUREMENT ALERTS LIST */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔔</span>
                <h3 className="font-extrabold text-base text-slate-900">{t('weatherAlerts')}</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">Live Feed</span>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                    alert.urgency === 'critical'
                      ? 'bg-red-50 border-red-300 text-red-950'
                      : alert.urgency === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-sky-50 border-sky-200 text-sky-950'
                  }`}
                >
                  <span className="text-2xl shrink-0">{alert.iconEmoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm">{alert.title}</h4>
                      <span className="text-[10px] font-mono opacity-70">{alert.time}</span>
                    </div>
                    <p className="text-xs mt-0.5 font-medium leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION SELECTION MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-sky-600" />
                <h3 className="font-black text-base text-slate-900">
                  {t('selectLocation') || 'स्थान चुनें / Select Location'}
                </h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {language === 'hi' 
                ? 'अपना गांव या ब्लॉक चुनें ताकि मौसम और खरीद केंद्र की सटीक सलाह मिल सके:'
                : 'Select your village or block to receive hyper-local weather & center advisories:'}
            </p>

            <div className="space-y-2">
              {AVAILABLE_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                const itemLocName = loc.localizedNames?.[language] || loc.name;
                const itemCenterName = loc.localizedCenterNames?.[language] || loc.centerName;

                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocationId(loc.id);
                      setShowLocationModal(false);
                      speak(language === 'hi' ? `स्थान ${itemLocName} चुना गया` : `Location ${itemLocName} selected`);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 text-sky-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{itemLocName}</h4>
                      <p className="text-xs text-slate-500 font-medium">{loc.name}, {loc.district}</p>
                      <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                        {t('nearestCenter') || 'Center'}: {itemCenterName} ({loc.distanceToCenterKm} km)
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 size={20} className="text-sky-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              {t('close') || 'बंद करें (Close)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
