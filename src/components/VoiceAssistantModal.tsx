import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Send, 
  User as UserIcon, 
  HelpCircle,
  Wheat,
  Ticket,
  IndianRupee,
  MapPin,
  CloudRain,
  HeartHandshake
} from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';
import { WeatherService } from '../services/weatherService';
import { LanguageCode } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const LANG_NAME_MAP: Record<LanguageCode, string> = {
  hi: 'Hindi',
  en: 'English',
  pa: 'Punjabi',
  mr: 'Marathi',
  gu: 'Gujarati',
  bn: 'Bengali',
  te: 'Telugu',
  ta: 'Tamil',
  kn: 'Kannada',
  ml: 'Malayalam',
  or: 'Odia',
};

const REGIONAL_ASSISTANT_NAMES: Record<LanguageCode, { title: string; subtitle: string }> = {
  hi: { title: 'किसान सहेली / AI दीदी', subtitle: 'भारतीय महिला स्वर • 11 क्षेत्रीय भाषाएँ' },
  en: { title: 'Kisan Saheli / AI Didi', subtitle: 'Indian Female Voice • 11 Regional Languages' },
  pa: { title: 'ਕਿਸਾਨ ਸਹੇਲੀ / AI ਦੀਦੀ', subtitle: 'ਭਾਰਤੀ ਮਹਿਲਾ ਆਵਾਜ਼ • 11 ਖੇਤਰੀ ਭਾਸ਼ਾਵਾਂ' },
  mr: { title: 'किसान सहेली / AI ताई', subtitle: 'भारतीय महिला आवाज • 11 प्रादेशिक भाषा' },
  gu: { title: 'કિસાન સહેલી / AI દીદી', subtitle: 'ભારતીય મહિલા અવાજ • 11 પ્રાદેશિક ભાષાઓ' },
  bn: { title: 'কিষাণ সহেলি / AI দিদি', subtitle: 'ভারতীয় মহিলা কণ্ঠস্বর • 11টি আঞ্চলিক ভাষা' },
  te: { title: 'కిసాన్ సహేలీ / AI అక్క', subtitle: 'భారతీయ మహిళా వాయిస్ • 11 ప్రాంతీయ భాషలు' },
  ta: { title: 'உழவர் சஹேலி / AI அக்கா', subtitle: 'இந்திய பெண் குரல் • 11 பிராந்திய மொழிகள்' },
  kn: { title: 'ಕಿಸಾನ್ ಸಹೇಲಿ / AI ಅಕ್ಕ', subtitle: 'ಭಾರತೀಯ ಮಹಿಳಾ ಧ್ವನಿ • 11 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು' },
  ml: { title: 'കിസാൻ സഹേലി / AI ചേച്ചി', subtitle: 'ഇന്ത്യൻ സ്ത്രീ ശബ്ദം • 11 പ്രാദേശിക ഭാഷകൾ' },
  or: { title: 'କିଷାନ ସହେଲୀ / AI ଦିଦି', subtitle: 'ଭାରତୀୟ ମହିଳା ସ୍ୱର • 11ଟି ଆଞ୍ଚଳିକ ଭାଷା' },
};

export const VoiceAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, language, farmer, activeBooking, procurementDetail, payment, t } = useApp();

  const getWelcomeText = (lang: LanguageCode) => {
    switch (lang) {
      case 'pa':
        return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, KisanSetu ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਸਾਨ ਸਹੇਲੀ (AI ਆਵਾਜ਼) ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ? ਤੁਸੀਂ ਖਰੀਦ ਸਲਾਟ, ਟੋਕਨ ਕਤਾਰ (A-127), ਮੌਸਮ, ਮੀਂਹ ਦੀ ਸਲਾਹ ਜਾਂ ਬੈਂਕ ਪੇਮੈਂਟ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।`;
      case 'mr':
        return `नमस्कार जी, KisanSetu मध्ये आपले स्वागत आहे. मी आपली किसान सहेली (AI ताई) आहे. मी आपली काय मदत करू शकते? आपण खरेदी स्लॉट, टोकन रांग (A-127), आजचे हवामान, धान्य संरक्षण किंवा बँक खात्याबद्दल विचारू शकता.`;
      case 'gu':
        return `નમસ્તે જી, KisanSetu માં આપનું સ્વાગત છે. હું તમારી કિસાન સહેલી (AI અવાજ) છું. હું તમારી શું મદદ કરી શકું? તમે ખરીદ સ્લોટ, ટોકન લાઈન (A-127), આજનું હવામાન, વરસાદથી પાક રક્ષણ કે બેંક પેમેન્ટ વિશે પૂછી શકો છો.`;
      case 'bn':
        return `নমস্কার, KisanSetu-তে আপনাকে স্বাগতম। আমি আপনার কিষাণ সহেলি (AI কণ্ঠস্বর)। আমি আপনাকে কীভাবে সাহায্য করতে পারি? আপনি ক্রয় স্লট, টোকেন কিউ (A-127), আবহাওয়া, বৃষ্টির সতর্কতা বা ব্যাংক পেমেন্ট সম্পর্কে জানতে পারেন।`;
      case 'te':
        return `నమస్కారం, KisanSetu కు స్వాగతం. నేను మీ కిసాన్ సహేలీ (AI వాయిస్). నేను మీకు ఎలా సహాయపడగలను? మీరు స్లాట్ బుకింగ్, టోకెన్ క్యూ (A-127), నేటి వాతావరణం లేదా బ్యాంక్ చెల్లింపుల గురించి అడగవచ్చు.`;
      case 'ta':
        return `வணக்கம், KisanSetu-விற்கு உங்களை வரவேற்கிறோம். நான் உங்கள் உழவர் சஹேலி (AI குரல்). நான் உங்களுக்கு எப்படி உதவ முடியும்? நீங்கள் டோக்கன் வரிசை (A-127), வானிலை ஆலோசனை, தானிய பாதுகாப்பு அல்லது வங்கி பணம் பற்றி கேட்கலாம்.`;
      case 'kn':
        return `ನಮಸ್ಕಾರ, KisanSetu ಗೆ ಸ್ವಾಗತ. ನಾನು ನಿಮ್ಮ ಕಿಸಾನ್ ಸಹೇಲಿ (AI ಧ್ವನಿ). ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ನೀವು ಟೋಕನ್ ಕ್ಯೂ (A-127), ಇಂದಿನ ಹವಾಮಾನ, ಮಳೆಯ ರಕ್ಷಣೆ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಾವತಿಯ ಬಗ್ಗೆ ಕೇಳಬಹುದು.`;
      case 'ml':
        return `നമസ്കാരം, KisanSetu-ലേക്ക് സ്വാഗതം. ഞാൻ നിങ്ങളുടെ കിസാൻ സഹേലി (AI വോയ്‌സ്) ആണ്. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം? ടോക്കൺ ക്യൂ (A-127), ഇന്നത്തെ കാലാവസ്ഥ, ബാങ്ക് പേയ്മെന്റ് എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.`;
      case 'or':
        return `ନମସ୍କାର, KisanSetu ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ମୁଁ ଆପଣଙ୍କ କିଷାନ ସହେଲୀ (AI ସ୍ୱର)। ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି? ଆପଣ ଟୋକନ୍ ଧାଡ଼ି (A-127), ଆଜିର ପାଣିପାଗ, ଫସଲ ସୁରକ୍ଷା ବା ବ୍ୟାଙ୍କ ଟଙ୍କା ବିଷୟରେ ପଚାରିପାରିବେ।`;
      case 'en':
        return `Namaste, welcome to KisanSetu! I am your Kisan Saheli, speaking in a professional Indian Female Voice. How can I help you today? You can ask me about procurement schedules, live token queue, weather travel advisory, what documents to carry, or bank payment status.`;
      default:
        return `नमस्ते जी, KisanSetu में आपका स्वागत है। मैं आपकी किसान सहेली (AI दीदी) हूँ। मैं आपकी कैसे मदद कर सकती हूँ? आप मुझसे खरीद स्लॉट, टोकन कतार (A-127), मौसम व यात्रा सलाह, क्या लेकर जाना है, या बैंक भुगतान के बारे में बोलकर पूछ सकते हैं।`;
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getWelcomeText(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingActive, setIsSpeakingActive] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: getWelcomeText(language),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [language]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    // Web Speech Recognition setup
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hi' ? 'hi-IN' : (language === 'en' ? 'en-IN' : `${language}-IN`);

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setInputPrompt(speechResult);
          setIsListening(false);
          // Auto submit spoken query
          handleSubmit(speechResult);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      stopSpeaking();
    };
  }, [language]);

  if (!isAiModalOpen) return null;

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Your browser does not support Web Speech Recognition. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      }
    }
  };

  const handleSpeak = (text: string) => {
    setIsSpeakingActive(true);
    speakText(text, language, () => {
      setIsSpeakingActive(false);
    }, true);
  };

  const handleSubmit = async (queryText?: string) => {
    const textToSend = (queryText || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    setInputPrompt('');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const currentWeather = WeatherService.getCurrentWeather(language);
      const currentAdvisory = WeatherService.getFarmerAdvisory(
        currentWeather, 
        activeBooking.timeSlot || '03:30 PM', 
        30, 
        activeBooking.farmersAhead || 18, 
        language
      );

      const farmerContext = {
        farmerName: farmer.name,
        farmerId: farmer.farmerId,
        village: farmer.village,
        token: activeBooking.tokenNumber,
        center: activeBooking.centerName,
        farmersAhead: activeBooking.farmersAhead,
        estimatedWaitMinutes: activeBooking.estimatedWaitMinutes,
        stage: procurementDetail.stages[procurementDetail.currentStageIndex]?.descriptionKey,
        paymentAmount: payment.amount,
        paymentStatus: payment.status,
        // Weather Context
        weatherCondition: currentWeather.condition,
        temperatureC: currentWeather.temperatureC,
        rainProbabilityPercent: currentWeather.rainProbabilityPercent,
        weatherHeadline: currentAdvisory.headline,
        cropAdvice: currentAdvisory.cropAdvice,
        recommendedDepartureTime: currentAdvisory.recommendedDepartureTime,
        location: currentWeather.locationName,
      };

      const langName = LANG_NAME_MAP[language] || 'Hindi';

      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          language: langName,
          farmerContext,
        }),
      });

      const data = await response.json();
      const aiReplyText = data.reply || data.fallback || 'माफ़ कीजिए, अभी जवाब उपलब्ध नहीं हो सका।';

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
      // Auto speak response in Indian Female Voice for farmers
      handleSpeak(aiReplyText);
    } catch (error) {
      console.error('Error contacting AI Assistant API:', error);
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: language === 'hi' 
          ? `नमस्ते किसान भाई, आपका टोकन A-127 रामपुर केंद्र पर सक्रिय है। आपके आगे 18 किसान हैं। अधिक जानकारी के लिए किसान हेल्पलाइन 1800-180-1551 पर कॉल करें।`
          : `Namaste Farmer Friend, your token A-127 is active for Rampur Center with 18 farmers ahead. For more assistance, call 1800-180-1551.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickQuestions = () => {
    switch (language) {
      case 'pa':
        return [
          { label: '🌦️ ਮੌਸਮ ਤੇ ਜਾਣ ਦਾ ਸਮਾਂ', prompt: 'ਅੱਜ ਮੌਸਮ ਕਿਹੋ ਜਿਹਾ ਹੈ, ਮੀਂਹ ਦੀ ਕੀ ਸੰਭਾਵਨਾ ਹੈ ਅਤੇ ਮੈਨੂੰ ਕਦੋਂ ਨਿਕਲਣਾ ਚਾਹੀਦਾ ਹੈ?' },
          { label: '🎫 ਟੋਕਨ ਤੇ ਕਤਾਰ ਸਥਿਤੀ', prompt: 'ਮੇਰਾ ਟੋਕਨ ਨੰਬਰ A-127 ਹੈ, ਮੇਰੇ ਅੱਗੇ ਕਿੰਨੇ ਕਿਸਾਨ ਹਨ?' },
          { label: '💰 ਬੈਂਕ ਪੇਮੈਂਟ', prompt: 'ਖਰੀਦ ਤੋਂ ਬਾਅਦ ਪੈਸੇ ਕਦੋਂ ਤੱਕ ਜਮ੍ਹਾਂ ਹੋਣਗੇ?' },
          { label: '🎒 ਨਾਲ ਕੀ ਲਿਜਾਣਾ ਹੈ', prompt: 'ਖਰੀਦ ਕੇਂਦਰ ਜਾਣ ਵੇਲੇ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਅਤੇ ਸਾਮਾਨ ਨਾਲ ਲੈ ਕੇ ਜਾਣਾ ਹੈ?' },
          { label: '🌾 ਨਮੀ (Moisture) ਨਿਯਮ', prompt: 'ਸਰਕਾਰੀ ਖਰੀਦ ਵਿੱਚ ਅਨਾਜ ਵਿੱਚ ਕਿੰਨੀ ਨਮੀ ਮਨਜ਼ੂਰ ਹੈ?' },
        ];
      case 'mr':
        return [
          { label: '🌦️ हवामान व प्रवासाचा सल्ला', prompt: 'आज हवामान कसे आहे, पावसाची शक्यता किती आणि मी केंद्रासाठी कधी निघावे?' },
          { label: '🎫 टोकन व रांग स्थिती', prompt: 'माझे टोकन A-127 आहे, माझ्यापुढे किती शेतकरी आहेत?' },
          { label: '💰 बँक पेमेंट स्थिती', prompt: 'खरेदीनंतर 92,000 रुपये खात्यात कधी जमा होतील?' },
          { label: '🎒 सोबत काय आणावे', prompt: 'खरेदी केंद्रावर जाताना कोणती कागदपत्रे व साहित्य सोबत आणावे?' },
          { label: '🌾 आर्द्रता (नमी) नियम', prompt: 'धान्यामध्ये किती टक्के आर्द्रता असणे आवश्यक आहे?' },
        ];
      case 'gu':
        return [
          { label: '🌦️ હવામાન અને મુસાફરી સલાહ', prompt: 'આજે હવામાન કેવું છે, વરસાદની શક્યતા કેટલી અને મારે ક્યારે નીકળવું?' },
          { label: '🎫 ટોકન અને લાઈન સ્થિતિ', prompt: 'મારો ટોકન નંબર A-127 છે, મારી આગળ કેટલા ખેડૂત છે?' },
          { label: '💰 બેંક પેમેન્ટ ક્યારે મળશે?', prompt: 'ખરીદી પછી બેંક ખાતામાં રકમ ક્યારે જમા થશે?' },
          { label: '🎒 સાથે શું લઈ જવું', prompt: 'ખરીદ કેન્દ્ર જતી વખતે કયા દસ્તાવેજો અને સાધનો સાથે રાખવા?' },
          { label: '🌾 ભેજના નિયમો', prompt: 'સરકારી ખરીદીમાં અનાજમાં કેટલો ભેજ માન્ય છે?' },
        ];
      case 'bn':
        return [
          { label: '🌦️ আবহাওয়া ও যাত্রার পরামর্শ', prompt: 'আজ আবহাওয়া কেমন, বৃষ্টির সম্ভাবনা কত এবং কখন বের হওয়া উচিত?' },
          { label: '🎫 টোকেন ও কিউ স্ট্যাটাস', prompt: 'আমার টোকেন A-127, আমার আগে কতজন কৃষক আছেন?' },
          { label: '💰 ব্যাংক পেমেন্ট', prompt: 'ক্রয়ের পর টাকা কবে ব্যাংক অ্যাকাউন্টে জমা হবে?' },
          { label: '🎒 সঙ্গে কী কী নিতে হবে', prompt: 'ক্রয় কেন্দ্রে যাওয়ার সময় কোন কোন কাগজপত্র ও জিনিস নেওয়া প্রয়োজন?' },
          { label: '🌾 আর্দ্রতার নিয়ম', prompt: 'সরকারি ক্রয়ে ফসলে সর্বোচ্চ কত আর্দ্রতা গ্রহণযোগ্য?' },
        ];
      case 'te':
        return [
          { label: '🌦️ వాతావరణం & బయలుదేరే సమయం', prompt: 'ఈరోజు వాతావరణం ఎలా ఉంది, వర్ష సూచన ఎంత మరియు ఎప్పుడు బయలుదేరాలి?' },
          { label: '🎫 టోకెన్ & క్యూ స్థితి', prompt: 'నా టోకెన్ A-127, నా ముందు ఎంతమంది రైతులు ఉన్నారు?' },
          { label: '💰 బ్యాంక్ చెల్లింపు', prompt: 'ధాన్యం కొనుగోలు తర్వాత డబ్బులు ఎప్పుడు ఖాతాలో పడతాయి?' },
          { label: '🎒 వెంట ఏమి తీసుకువెళ్లాలి', prompt: 'సేకరణ కేంద్రానికి వెళ్లేటప్పుడు ఏ పత్రాలు మరియు సామగ్రి తీసుకెళ్లాలి?' },
          { label: '🌾 తేమ శాతం నిబంధనలు', prompt: 'ప్రభుత్వ కొనుగోలులో తేమ శాతం గరిష్టంగా ఎంత ఉండాలి?' },
        ];
      case 'ta':
        return [
          { label: '🌦️ வானிலை & பயண ஆலோசனை', prompt: 'இன்றைய வானிலை எப்படி உள்ளது, மழை வாய்ப்பு என்ன, எப்போது புறப்பட வேண்டும்?' },
          { label: '🎫 டோக்கன் & வரிசை நிலை', prompt: 'எனது டோக்கன் A-127, என் முன் எத்தனை விவசாயிகள் உள்ளனர்?' },
          { label: '💰 வங்கி பணம்', prompt: 'கொள்முதலுக்கு பின் வங்கி கணக்கில் பணம் எப்போது வரும்?' },
          { label: '🎒 எடுத்துச் செல்ல வேண்டியவை', prompt: 'கொள்முதல் மையத்திற்கு செல்லும் போது என்னென்ன ஆவணங்கள் கொண்டு செல்ல வேண்டும்?' },
          { label: '🌾 ஈரப்பதம் விதிகள்', prompt: 'அரசு கொள்முதலில் அனுமதிக்கப்பட்ட ஈரப்பதம் அளவு என்ன?' },
        ];
      case 'kn':
        return [
          { label: '🌦️ ಹವಾಮಾನ & ಪ್ರಯಾಣ ಸಲಹೆ', prompt: 'ಇಂದು ಹವಾಮಾನ ಹೇಗಿದೆ, ಮಳೆಯ ಸಂಭವನೀಯತೆ ಎಷ್ಟು ಮತ್ತು ಯಾವಾಗ ಹೊರಡಬೇಕು?' },
          { label: '🎫 ಟೋಕನ್ & ಕ್ಯೂ ಸ್ಥಿತಿ', prompt: 'ನನ್ನ ಟೋಕನ್ A-127, ನನ್ನ ಮುಂದೆ ಎಷ್ಟು ರೈತರಿದ್ದಾರೆ?' },
          { label: '💰 ಬ್ಯಾಂಕ್ ಪಾವತಿ', prompt: 'ಖರೀದಿಯ ನಂತರ ಖಾತೆಗೆ ಹಣ ಯಾವಾಗ ಜಮಾ ಆಗುತ್ತದೆ?' },
          { label: '🎒 ಜೊತೆಗೆ ಏನು ತರಬೇಕು', prompt: 'ಖರೀದಿ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗುವಾಗ ಯಾವ ದಾಖಲೆಗಳು ಮತ್ತು ಸಾಮಗ್ರಿ ತರಬೇಕು?' },
          { label: '🌾 ತೇವಾಂಶ ನಿಯಮಗಳು', prompt: 'ಧಾನ್ಯ ಖರೀದಿಯಲ್ಲಿ ಗರಿಷ್ಠ ಎಷ್ಟು ತೇವಾಂಶ ಇರಬೇಕು?' },
        ];
      case 'ml':
        return [
          { label: '🌦️ കാലാവസ്ഥ & യാത്ര ഉപദേശം', prompt: 'ഇന്ന് കാലാവസ്ഥ എങ്ങനെ, മഴ സാധ്യത എത്ര, എപ്പോൾ പുറപ്പെടണം?' },
          { label: '🎫 ടോക്കൺ & ക്യൂ അവസ്ഥ', prompt: 'എന്റെ ടോക്കൺ A-127 ആണ്, മുന്നിൽ എത്ര കർഷകരുണ്ട്?' },
          { label: '💰 ബാങ്ക് പേയ്മെന്റ്', prompt: 'സംഭരണത്തിന് ശേഷം പണം എപ്പോൾ അക്കൗണ്ടിൽ എത്തും?' },
          { label: '🎒 എന്തൊക്കെ കരുതണം', prompt: 'സംഭരണ കേന്ദ്രത്തിലേക്ക് പോകുമ്പോൾ എന്തൊക്കെ രേഖകൾ കരുതണം?' },
          { label: '🌾 ഈർപ്പ നിലവാരം', prompt: 'നെല്ല് സംഭരണത്തിൽ അനുവദനീയമായ ഈർപ്പം എത്രയാണ്?' },
        ];
      case 'or':
        return [
          { label: '🌦️ ପାଣିପାଗ ଓ ଯାତ୍ରା ପରାମର୍ଶ', prompt: 'ଆଜି ପାଣିପାଗ କିପରି ଅଛି, ବର୍ଷା ସମ୍ଭାବନା କେତେ ଓ କେବେ ବାହାରିବି?' },
          { label: '🎫 ଟୋକନ୍ ଓ ଧାଡ଼ି ସ୍ଥିତି', prompt: 'ମୋର ଟୋକନ୍ A-127, ମୋ ଆଗରେ କେତେ ଜଣ ଚାଷୀ ଅଛନ୍ତି?' },
          { label: '💰 ବ୍ୟାଙ୍କ ଟଙ୍କା କେବେ ଆସିବ', prompt: 'ଧାନ ବିକ୍ରି ପରେ ଟଙ୍କା କେବେ ଖାତାକୁ ଆସିବ?' },
          { label: '🎒 ସାଙ୍ଗରେ କଣ ନେବାକୁ ହେବ', prompt: 'ମଣ୍ଡି ଯିବା ସମୟରେ କେଉଁ କାଗଜପତ୍ର ସାଙ୍ଗରେ ନେବାକୁ ହେବ?' },
          { label: '🌾 ଆର୍ଦ୍ରତା (ନମି) ନିୟମ', prompt: 'ସରକାରୀ ଖରିଦରେ କେତେ ନମି ମାନ୍ୟ ଅଟେ?' },
        ];
      case 'en':
        return [
          { label: '🌦️ Weather & Departure Advice', prompt: 'What is today weather, rain probability, and what time should I leave for center?' },
          { label: '🎫 Token & Queue Status', prompt: 'My token is A-127. How many farmers are ahead and what is my wait time?' },
          { label: '💰 DBT Payment Status', prompt: 'When will my procurement payment of ₹92,000 be credited to my bank account?' },
          { label: '🎒 What to Carry', prompt: 'What documents and protective gear should I carry to the procurement center?' },
          { label: '🌾 Moisture Standard (<12%)', prompt: 'What is the maximum allowed grain moisture percentage for government procurement?' },
        ];
      default:
        return [
          { label: '🌦️ आज मौसम व निकलने का समय', prompt: 'आज मेरे इलाके में मौसम कैसा है, बारिश की क्या संभावना है और मुझे केंद्र के लिए कब निकलना चाहिए?' },
          { label: '🎫 टोकन व कतार में मेरा नंबर', prompt: 'मेरा टोकन नंबर A-127 है। मुझसे आगे कितने किसान हैं और मेरा नंबर कब आएगा?' },
          { label: '💰 बैंक खाते में ₹92,000 भुगतान', prompt: 'खरीद के बाद ₹92,000 की राशि मेरे DBT बैंक खाते में कब तक जमा होगी?' },
          { label: '🎒 केंद्र जाते समय क्या साथ ले जाएं', prompt: 'खरीद केंद्र जाते समय कौन-कौन से जरूरी कागजात और सामान साथ लेकर जाना है?' },
          { label: '🌾 नमी (Moisture <12%) के नियम', prompt: 'सरकारी खरीद में गेहूं और धान में अधिकतम कितनी नमी मान्य है?' },
        ];
    }
  };

  const quickQuestions = getQuickQuestions();
  const assistantInfo = REGIONAL_ASSISTANT_NAMES[language] || REGIONAL_ASSISTANT_NAMES.hi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-emerald-500/50 overflow-hidden flex flex-col h-[85vh] max-h-[700px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white px-5 py-3.5 flex items-center justify-between shadow-md border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-amber-300 text-neutral-950 flex items-center justify-center font-black shadow-lg">
              <span className="text-xl">👩‍🌾</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-tight flex items-center gap-1.5">
                  <span>{assistantInfo.title}</span>
                </h3>
                <span className="bg-pink-900/70 text-pink-200 text-[10px] font-mono font-black px-2 py-0.5 rounded-full border border-pink-500/40 uppercase flex items-center gap-1">
                  <span>👧 Indian Girl Voice</span>
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                {assistantInfo.subtitle} • {language.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isSpeakingActive && (
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsSpeakingActive(false);
                }}
                className="px-2 py-1.5 bg-red-800 hover:bg-red-700 rounded-xl text-yellow-300 flex items-center gap-1 text-xs font-bold border border-red-600 animate-pulse"
                title="Stop Audio"
              >
                <VolumeX size={16} />
                <span className="hidden sm:inline">{t('stopAudio') || 'रोकें'}</span>
              </button>
            )}
            <button
              onClick={() => {
                stopSpeaking();
                setIsAiModalOpen(false);
              }}
              className="p-1.5 bg-stone-800/90 hover:bg-stone-700 rounded-xl text-stone-200 hover:text-white transition"
              aria-label="Close Assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Indian Girl Voice Active Notification Strip */}
        <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-emerald-50 px-4 py-2 border-b border-rose-200/80 flex items-center justify-between text-xs font-bold text-rose-950 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-600"></span>
            </span>
            <span>🎙️ भारतीय महिला स्वर सक्रिय (Indian Girl Voice Engine: {LANG_NAME_MAP[language]} / {language.toUpperCase()})</span>
          </div>
          <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-rose-300 text-rose-800">
            11 भाषाएँ
          </span>
        </div>

        {/* Live Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
          {messages.map((msg) => {
            const isAI = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm font-bold text-sm">
                    👩‍🌾
                  </div>
                )}
                
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
                    isAI
                      ? 'bg-white border border-rose-200 text-stone-900 rounded-tl-sm'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-sm shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className={`text-[10px] mt-1.5 flex items-center justify-between gap-3 ${isAI ? 'text-stone-400' : 'text-emerald-100'}`}>
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="text-pink-700 hover:text-pink-900 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Volume2 size={12} />
                        <span>👩‍🌾 {t('listen') || 'दीदी की आवाज़ में सुनें'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs shadow-sm">
                    <UserIcon size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm text-sm">
                👩‍🌾
              </div>
              <div className="bg-white border border-rose-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-.5s]"></div>
                <span className="text-xs text-stone-600 font-medium ml-1">
                  {language === 'hi' ? 'किसान सहेली उत्तर तैयार कर रही हैं...' : 'Kisan Saheli is preparing spoken answer...'}
                </span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggested Queries */}
        <div className="px-3 py-2 bg-stone-100 border-t border-rose-200 overflow-x-auto flex gap-2 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(q.prompt)}
              className="text-xs bg-white hover:bg-rose-50 border border-stone-300 hover:border-rose-400 text-stone-800 hover:text-rose-950 px-3 py-1.5 rounded-full whitespace-nowrap transition font-semibold shadow-sm shrink-0 flex items-center gap-1"
            >
              <HelpCircle size={12} className="text-rose-600" />
              <span>{q.label}</span>
            </button>
          ))}
        </div>

        {/* Voice Input & Text Input Bar */}
        <div className="p-3 bg-white border-t border-rose-200 flex items-center gap-2">
          {/* Big Microphone button for voice query */}
          <button
            onClick={toggleListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white transition-all transform active:scale-95 shrink-0 shadow-lg ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300'
                : 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-rose-500'
            }`}
            title="बोलकर पूछें / Press & Speak in your Regional Language"
          >
            {isListening ? <MicOff size={22} className="text-white" /> : <Mic size={22} />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              placeholder={isListening ? 'दीदी सुन रही हैं, कृपया बोलिए... (Listening)' : (language === 'hi' ? 'बोलकर या लिखकर दीदी से पूछें...' : 'Ask Kisan Saheli in your regional language...')}
              className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition ${
                isListening ? 'border-rose-400 bg-rose-50 font-bold text-rose-900' : 'border-stone-300 bg-stone-50'
              }`}
            />
          </div>

          <button
            onClick={() => handleSubmit()}
            disabled={!inputPrompt.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-600 hover:from-pink-500 hover:to-emerald-500 disabled:bg-stone-300 text-white flex items-center justify-center font-bold transition shrink-0 shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
