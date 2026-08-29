/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from '../types';

export type WeatherConditionType = 'rain' | 'heavy_rain' | 'clear' | 'partly_cloudy' | 'hot' | 'windy';

export interface WeatherData {
  condition: WeatherConditionType;
  conditionLabel: string;
  conditionLabelHindi: string;
  iconEmoji: string;
  temperatureC: number;
  feelsLikeC: number;
  rainProbabilityPercent: number;
  humidityPercent: number;
  windSpeedKmH: number;
  visibilityKm: number;
  locationName: string;
  locationHindi: string;
  district: string;
  state: string;
  nearestCenterName: string;
  nearestCenterHindi: string;
  distanceToCenterKm: number;
  updatedAt: string;
}

export interface FarmerAdvisory {
  headline: string;
  cropAdvice: string;
  docAdvice: string;
  travelAdvice: string;
  smartAdviceText: string;
  departureNote: string;
  recommendedDepartureTime: string;
  severity: 'normal' | 'caution' | 'critical';
  // Backward compatibility fields
  headlineHindi?: string;
  headlineEn?: string;
  cropAdviceHindi?: string;
  cropAdviceEn?: string;
  docAdviceHindi?: string;
  docAdviceEn?: string;
  travelAdviceHindi?: string;
  travelAdviceEn?: string;
  smartAdviceTextHindi?: string;
  smartAdviceTextEn?: string;
  departureNoteHindi?: string;
  departureNoteEn?: string;
}

export interface CarryItem {
  id: string;
  text: string;
  textHindi: string;
  textEn: string;
  icon: string;
  isCrucial: boolean;
}

export interface DailyForecast {
  dayName: string;
  dayNameHindi: string;
  dayNameEn: string;
  dateStr: string;
  tempC: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  conditionLabelHindi: string;
  conditionEmoji: string;
  rainProbabilityPercent: number;
}

export interface WeatherAlert {
  id: string;
  type: 'rain_alert' | 'procurement_alert' | 'prep_alert' | 'heat_alert' | 'wind_alert';
  title: string;
  titleHindi: string;
  titleEn: string;
  message: string;
  messageHindi: string;
  messageEn: string;
  urgency: 'info' | 'warning' | 'critical';
  time: string;
  iconEmoji: string;
}

export interface LocationOption {
  id: string;
  name: string;
  hindiName: string;
  district: string;
  distanceToCenterKm: number;
  centerName: string;
  centerHindi: string;
  localizedNames?: Partial<Record<LanguageCode, string>>;
  localizedCenterNames?: Partial<Record<LanguageCode, string>>;
}

export const AVAILABLE_LOCATIONS: LocationOption[] = [
  {
    id: 'rampur',
    name: 'Rampur Village',
    hindiName: 'रामपुर गांव',
    district: 'Varanasi',
    distanceToCenterKm: 4.2,
    centerName: 'Rampur Mandi Sub-Yard',
    centerHindi: 'रामपुर मंडी उप-यार्ड',
    localizedNames: {
      hi: 'रामपुर गांव',
      en: 'Rampur Village',
      pa: 'ਰਾਮਪੁਰ ਪਿੰਡ',
      mr: 'रामपूर गाव',
      gu: 'રામપુર ગામ',
      bn: 'রামপুর গ্রাম',
      te: 'రాంపూర్ గ్రామం',
      ta: 'ராம்பூர் கிராமம்',
      kn: 'ರಾಂಪುರ ಗ್ರಾಮ',
      ml: 'രാംപൂർ ഗ്രാമം',
      or: 'ରାମପୁର ଗ୍ରାମ',
    },
    localizedCenterNames: {
      hi: 'रामपुर मंडी उप-यार्ड',
      en: 'Rampur Mandi Sub-Yard',
      pa: 'ਰਾਮਪੁਰ ਮੰਡੀ ਸਬ-ਯਾਰਡ',
      mr: 'रामपूर मंडी उप-यार्ड',
      gu: 'રામપુર મંડી સબ-યાર્ડ',
      bn: 'রামপুর মান্ডি সাব-ইয়ার্ড',
      te: 'రాంపూర్ మార్కెట్ యార్డ్',
      ta: 'ராம்பூர் மண்டி துணை யார்டு',
      kn: 'ರಾಂಪುರ ಮಂಡಿ ಉಪ-ಯಾರ್ಡ್',
      ml: 'രാംപൂർ മണ്ഡി സബ് യാർഡ്',
      or: 'ରାମପୁର ମଣ୍ଡି ସବ୍-ୟାର୍ଡ',
    }
  },
  {
    id: 'shivpur',
    name: 'Shivpur Rural',
    hindiName: 'शिवपुर ग्रामीण',
    district: 'Varanasi',
    distanceToCenterKm: 7.5,
    centerName: 'Central Grain Mandi Varanasi',
    centerHindi: 'केंद्रीय अनाज मंडी वाराणसी',
    localizedNames: {
      hi: 'शिवपुर ग्रामीण',
      en: 'Shivpur Rural',
      pa: 'ਸ਼ਿਵਪੁਰ ਦਿਹਾਤੀ',
      mr: 'शिवपूर ग्रामीण',
      gu: 'શિવપુર ગ્રામીણ',
      bn: 'শিবপুর গ্রামীণ',
      te: 'శివపూర్ గ్రామీణ',
      ta: 'சிவ்பூர் கிராமப்புறம்',
      kn: 'ಶಿವಪುರ ಗ್ರಾಮೀಣ',
      ml: 'ശിവ്പൂർ ഗ്രാമീണം',
      or: 'ଶିବପୁର ଗ୍ରାମୀଣ',
    },
    localizedCenterNames: {
      hi: 'केंद्रीय अनाज मंडी वाराणसी',
      en: 'Central Grain Mandi Varanasi',
      pa: 'ਕੇਂਦਰੀ ਅਨਾਜ ਮੰਡੀ ਵਾਰਾਣਸੀ',
      mr: 'मध्यवर्ती धान्य मंडी वाराणसी',
      gu: 'સેન્ટ્રલ અનાજ મંડી વારાણસી',
      bn: 'কেন্দ্রীয় শস্য মান্ডি বারাণসী',
      te: 'సెంట్రల్ గ్రెయిన్ మార్కెట్ వారణాసి',
      ta: 'மத்திய தானிய மண்டி வாரணாசி',
      kn: 'ಕೇಂದ್ರ ಧಾನ್ಯ ಮಂಡಿ ವಾರಣಾಸಿ',
      ml: 'സെൻട്രൽ ഗ്രെയിൻ മണ്ഡി വാരണാസി',
      or: 'କେନ୍ଦ୍ରୀୟ ଶସ୍ୟ ମଣ୍ଡି ବାରାଣସୀ',
    }
  },
  {
    id: 'babatpur',
    name: 'Babatpur Block',
    hindiName: 'बाबतपुर ब्लॉक',
    district: 'Varanasi',
    distanceToCenterKm: 12.0,
    centerName: 'Babatpur Agro Centre',
    centerHindi: 'बाबतपुर कृषि केंद्र',
    localizedNames: {
      hi: 'बाबतपुर ब्लॉक',
      en: 'Babatpur Block',
      pa: 'ਬਾਬਤਪੁਰ ਬਲਾਕ',
      mr: 'बाबतपूर ब्लॉक',
      gu: 'બાબતપુર બ્લોક',
      bn: 'বাবতপুর ব্লক',
      te: 'బాబత్‌పూర్ బ్లాక్',
      ta: 'பாபத்பூர் பிளாக்',
      kn: 'ಬಾಬತ್‌ಪುರ ಬ್ಲಾಕ್',
      ml: 'ബാബത്പൂർ ബ്ലോക്ക്',
      or: 'ବାବତପୁର ବ୍ଲକ',
    },
    localizedCenterNames: {
      hi: 'बाबतपुर कृषि केंद्र',
      en: 'Babatpur Agro Centre',
      pa: 'ਬਾਬਤਪੁਰ ਖੇਤੀਬਾੜੀ ਕੇਂਦਰ',
      mr: 'बाबतपूर कृषी केंद्र',
      gu: 'બાબતપુર કૃષિ કેન્દ્ર',
      bn: 'বাবতপুর কৃষি কেন্দ্র',
      te: 'బాబత్‌పూర్ వ్యవసాయ కేంద్రం',
      ta: 'பாபத்பூர் வேளாண் மையம்',
      kn: 'ಬಾಬತ್‌ಪುರ ಕೃಷಿ ಕೇಂದ್ರ',
      ml: 'ബാബത്പൂർ കാർഷിക കേന്ദ്രം',
      or: 'ବାବତପୁର କୃଷି କେନ୍ଦ୍ର',
    }
  },
  {
    id: 'chandauli',
    name: 'Chandauli Border',
    hindiName: 'चंदौली सीमा',
    district: 'Chandauli',
    distanceToCenterKm: 18.5,
    centerName: 'Chandauli Food Corporation Depot',
    centerHindi: 'चंदौली खाद्य निगम डिपो',
    localizedNames: {
      hi: 'चंदौली सीमा',
      en: 'Chandauli Border',
      pa: 'ਚੰਦੌਲੀ ਸਰਹੱਦ',
      mr: 'चंदौली सीमा',
      gu: 'ચંદૌલી સરહદ',
      bn: 'চান্দৌলি সীমান্ত',
      te: 'చందౌలీ సరిహద్దు',
      ta: 'சந்தௌலி எல்லை',
      kn: 'ಚಂದೌಲಿ ಗಡಿ',
      ml: 'ചന്ദൗലി അതിർത്തി',
      or: 'ଚନ୍ଦୌଲି ସୀମା',
    },
    localizedCenterNames: {
      hi: 'चंदौली खाद्य निगम डिपो',
      en: 'Chandauli Food Corporation Depot',
      pa: 'ਚੰਦੌਲੀ ਖੁਰਾਕ ਨਿਗਮ ਡਿਪੂ',
      mr: 'चंदौली अन्न महामंडळ डेपो',
      gu: 'ચંદૌલી અન્ન નિગમ ડેપો',
      bn: 'চান্দৌলি খাদ্য নিগম ডিপো',
      te: 'చందౌలీ ఫుడ్ కార్పొరేషన్ డిపో',
      ta: 'சந்தௌலி உணவு கழக கிடங்கு',
      kn: 'ಚಂದೌಲಿ ಆಹಾರ ನಿಗಮ ಡಿಪೋ',
      ml: 'ചന്ദൗലി ഫുഡ് കോർപ്പറേഷൻ ഡിപ്പോ',
      or: 'ଚନ୍ଦୌଲି ଖାଦ୍ୟ ନିଗମ ଡିପୋ',
    }
  },
];

// Presets for real-time testing and simulation
export const WEATHER_PRESETS: Record<WeatherConditionType, Partial<WeatherData>> = {
  rain: {
    condition: 'rain',
    conditionLabel: 'Rain Possible (70%)',
    conditionLabelHindi: 'बारिश की संभावना (70%)',
    iconEmoji: '🌧️',
    temperatureC: 28,
    feelsLikeC: 31,
    rainProbabilityPercent: 70,
    humidityPercent: 78,
    windSpeedKmH: 12,
    visibilityKm: 6,
  },
  heavy_rain: {
    condition: 'heavy_rain',
    conditionLabel: 'Heavy Rain / Storm (90%)',
    conditionLabelHindi: 'भारी बारिश की संभावना (90%)',
    iconEmoji: '⛈️',
    temperatureC: 25,
    feelsLikeC: 27,
    rainProbabilityPercent: 90,
    humidityPercent: 92,
    windSpeedKmH: 28,
    visibilityKm: 3,
  },
  clear: {
    condition: 'clear',
    conditionLabel: 'Clear Skies (31°C)',
    conditionLabelHindi: 'मौसम साफ है (31°C)',
    iconEmoji: '☀️',
    temperatureC: 31,
    feelsLikeC: 33,
    rainProbabilityPercent: 10,
    humidityPercent: 48,
    windSpeedKmH: 8,
    visibilityKm: 10,
  },
  partly_cloudy: {
    condition: 'partly_cloudy',
    conditionLabel: 'Partly Cloudy (29°C)',
    conditionLabelHindi: 'आंशिक बादल (29°C)',
    iconEmoji: '⛅',
    temperatureC: 29,
    feelsLikeC: 32,
    rainProbabilityPercent: 35,
    humidityPercent: 62,
    windSpeedKmH: 10,
    visibilityKm: 8,
  },
  hot: {
    condition: 'hot',
    conditionLabel: 'High Heat (38°C)',
    conditionLabelHindi: 'तेज धूप व गर्मी (38°C)',
    iconEmoji: '🔥',
    temperatureC: 38,
    feelsLikeC: 42,
    rainProbabilityPercent: 5,
    humidityPercent: 38,
    windSpeedKmH: 14,
    visibilityKm: 9,
  },
  windy: {
    condition: 'windy',
    conditionLabel: 'Strong Winds (34 km/h)',
    conditionLabelHindi: 'तेज हवा (34 km/h)',
    iconEmoji: '🌬️',
    temperatureC: 27,
    feelsLikeC: 27,
    rainProbabilityPercent: 40,
    humidityPercent: 55,
    windSpeedKmH: 34,
    visibilityKm: 7,
  },
};

export class WeatherService {
  private static currentWeatherPreset: WeatherConditionType = 'rain';
  private static currentLocationId: string = 'rampur';

  public static getCurrentWeather(lang: LanguageCode = 'hi'): WeatherData {
    const loc = AVAILABLE_LOCATIONS.find(l => l.id === this.currentLocationId) || AVAILABLE_LOCATIONS[0];
    const preset = WEATHER_PRESETS[this.currentWeatherPreset];
    const locName = loc.localizedNames?.[lang] || loc.name;
    const centerName = loc.localizedCenterNames?.[lang] || loc.centerName;

    return {
      condition: this.currentWeatherPreset,
      conditionLabel: preset.conditionLabel || 'Rain Possible',
      conditionLabelHindi: preset.conditionLabelHindi || 'बारिश की संभावना',
      iconEmoji: preset.iconEmoji || '🌧️',
      temperatureC: preset.temperatureC ?? 28,
      feelsLikeC: preset.feelsLikeC ?? 31,
      rainProbabilityPercent: preset.rainProbabilityPercent ?? 70,
      humidityPercent: preset.humidityPercent ?? 78,
      windSpeedKmH: preset.windSpeedKmH ?? 12,
      visibilityKm: preset.visibilityKm ?? 6,
      locationName: locName,
      locationHindi: loc.hindiName,
      district: loc.district,
      state: 'Uttar Pradesh',
      nearestCenterName: centerName,
      nearestCenterHindi: loc.centerHindi,
      distanceToCenterKm: loc.distanceToCenterKm,
      updatedAt: 'Live',
    };
  }

  public static setWeatherPreset(condition: WeatherConditionType): WeatherData {
    this.currentWeatherPreset = condition;
    return this.getCurrentWeather();
  }

  public static setLocation(locationId: string): WeatherData {
    this.currentLocationId = locationId;
    return this.getCurrentWeather();
  }

  public static getCurrentLocationId(): string {
    return this.currentLocationId;
  }

  public static getCurrentCondition(): WeatherConditionType {
    return this.currentWeatherPreset;
  }

  /**
   * Generates tailored Farmer Advisory based on weather, slot, travel time, and language.
   */
  public static getFarmerAdvisory(
    weather: WeatherData,
    slotTime: string = '03:30 PM',
    travelTimeMinutes: number = 30,
    queueLength: number = 18,
    lang: LanguageCode = 'hi'
  ): FarmerAdvisory {
    const cond = weather.condition;

    // Localized dictionary for all 11 languages
    const ADVISORY_DATA: Record<WeatherConditionType, Record<LanguageCode, {
      headline: string;
      cropAdvice: string;
      docAdvice: string;
      travelAdvice: string;
      smartAdviceText: string;
      departureNote: string;
    }>> = {
      rain: {
        hi: {
          headline: 'आज आपके खरीद केंद्र के आसपास बारिश होने की संभावना (70%) है।',
          cropAdvice: 'फसल को वाटरप्रूफ तिरपाल (Tarpaulin) से कसकर ढककर लाएँ ताकि नमी 12% से न बढ़े।',
          docAdvice: 'दस्तावेज़ों (आधार, बैंक पासबुक, ई-टोकन) को वाटरप्रूफ प्लास्टिक पाउच में रखें।',
          travelAdvice: 'केंद्र निकलने से पूर्व लाइव कतार स्थिति देखें और सुरक्षित गति से चलें।',
          smartAdviceText: `बारिश की संभावना है और कतार में ${queueLength} किसान हैं। फसल को तिरपाल से ढककर 03:00 PM तक निकलने की सलाह है।`,
          departureNote: '03:00 PM तक केंद्र के लिए निकलने की सलाह है।',
        },
        en: {
          headline: '70% probability of rain around your procurement center today.',
          cropAdvice: 'Cover grain firmly with waterproof tarpaulin to keep moisture below 12%.',
          docAdvice: 'Keep Aadhaar, Bank Passbook, and e-Token slip inside waterproof pouch.',
          travelAdvice: 'Check live token queue before departure and drive safely.',
          smartAdviceText: `Rain is likely with ${queueLength} farmers in queue. Secure grains with tarpaulin and depart by 03:00 PM.`,
          departureNote: 'Recommended departure by 03:00 PM.',
        },
        pa: {
          headline: 'ਅੱਜ ਤੁਹਾਡੇ ਖਰੀਦ ਕੇਂਦਰ ਦੇ ਆਸ-ਪਾਸ ਮੀਂਹ ਪੈਣ ਦੀ 70% ਸੰਭਾਵਨਾ ਹੈ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਵਾਟਰਪ੍ਰੂਫ਼ ਤਿਰਪਾਲ ਨਾਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਢੱਕ ਕੇ ਲਿਆਓ ਤਾਂ ਜੋ ਨਮੀ 12% ਤੋਂ ਘੱਟ ਰਹੇ।',
          docAdvice: 'ਆਧਾਰ ਕਾਰਡ, ਬੈਂਕ ਪਾਸਬੁੱਕ ਅਤੇ ਈ-ਟੋਕਨ ਨੂੰ ਵਾਟਰਪ੍ਰੂਫ਼ ਲਿਫ਼ਾਫ਼ੇ ਵਿੱਚ ਰੱਖੋ।',
          travelAdvice: 'ਘਰੋਂ ਨਿਕਲਣ ਤੋਂ ਪਹਿਲਾਂ ਲਾਈਵ ਕਤਾਰ ਚੈੱਕ ਕਰੋ ਅਤੇ ਸੰਭਲ ਕੇ ਚੱਲੋ।',
          smartAdviceText: `ਮੀਂਹ ਦਾ ਖ਼ਦਸ਼ਾ ਹੈ ਅਤੇ ਕਤਾਰ ਵਿੱਚ ${queueLength} ਕਿਸਾਨ ਹਨ। ਤਿਰਪਾਲ ਬੰਨ੍ਹ ਕੇ 03:00 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`,
          departureNote: '03:00 PM ਤੱਕ ਮੰਡੀ ਲਈ ਰਵਾਨਾ ਹੋਣ ਦੀ ਸਲਾਹ ਹੈ।',
        },
        mr: {
          headline: 'आज आपल्या खरेदी केंद्राजवळ ७०% पावसाची शक्यता आहे.',
          cropAdvice: 'धान्यामध्ये आर्द्रता १२% पेक्षा वाढू नये म्हणून ते वॉटरप्रूफ ताडपत्रीने झाकून आणा.',
          docAdvice: 'आधार कार्ड, बँक पासबुक व ई-टोकन पावती प्लास्टिक पिशवीत सुरक्षित ठेवा.',
          travelAdvice: 'निघण्यापूर्वी थेट रांगेची स्थिती तपासा आणि सावकाश वाहन चालवा.',
          smartAdviceText: `पावसाची शक्यता असून रांगेत ${queueLength} शेतकरी आहेत. ताडपत्री बांधून दुपारी ०३:०० वाजता निघा.`,
          departureNote: 'दुपारी ०३:०० पर्यंत केंद्राकडे निघण्याचा सल्ला आहे.',
        },
        gu: {
          headline: 'આજે તમારા ખરીદ કેન્દ્ર આસપાસ ૭૦% વરસાદની સંભાવના છે.',
          cropAdvice: 'પાકમાં ભેજ ૧૨% થી વધે નહીં તે માટે વોટરપ્રૂફ તાડપત્રીથી ઢાંકીને લાવો.',
          docAdvice: 'આધાર કાર્ડ, બેંક પાસબુક અને ઈ-ટોકન પાવતી વોટરપ્રૂફ પાઉચમાં રાખો.',
          travelAdvice: 'નીકળતા પહેલા લાઈવ કતારની સ્થિતિ તપાસો અને સાવચેતીથી વાહન ચલાવો.',
          smartAdviceText: `વરસાદની સંભાવના છે અને કતારમાં ${queueLength} ખેડૂતો છે. તાડપત્રી બાંધી બપોરે ૦૩:૦૦ વાગ્યા સુધી નીકળો.`,
          departureNote: 'બપોરે ૦૩:૦૦ વાગ્યા સુધી નીકળવાની સલાહ છે.',
        },
        bn: {
          headline: 'আজ আপনার ক্রয় কেন্দ্রের আশেপাশে ৭০% বৃষ্টির সম্ভাবনা রয়েছে।',
          cropAdvice: 'ফসলের আর্দ্রতা ১২% এর নিচে রাখতে ওয়াটারপ্রুফ ত্রিপল দিয়ে ভালো করে ঢেকে আনুন।',
          docAdvice: 'আধার, ব্যাংক পাসবই এবং ই-টোকেন স্লিপ ওয়াটারপ্রুফ ব্যাগে সুরক্ষিত রাখুন।',
          travelAdvice: 'বেরোনোর আগে লাইভ সারির অবস্থান দেখুন এবং সাবধানে গাড়ি চালান।',
          smartAdviceText: `বৃষ্টির সম্ভাবনা এবং সারিতে ${queueLength} জন কৃষক আছেন। ত্রিপল দিয়ে ফসল ঢেকে ০৩:০০ PM এ রওনা দিন।`,
          departureNote: '০৩:০০ PM এর মধ্যে কেন্দ্রের উদ্দেশ্যে রওনা দেওয়ার পরামর্শ।',
        },
        te: {
          headline: 'ఈరోజు మీ సేకరణ కేంద్రం పరిసరాల్లో 70% వర్షం పడే అవకాశం ఉంది.',
          cropAdvice: 'తేమ 12% కంటే పెరగకుండా ధాన్యాన్ని వాటర్‌ప్రూఫ్ టార్పాలిన్‌తో గట్టిగా కప్పండి.',
          docAdvice: 'ఆధార్, బ్యాంక్ పాస్‌బుక్ మరియు ఇ-టోకెన్ రసీదును ప్లాస్టిక్ పౌచ్‌లో భద్రపరుచుకోండి.',
          travelAdvice: 'బయలుదేరే ముందు లైవ్ క్యూ వివరాలు తనిఖీ చేసి జాగ్రత్తగా ప్రయాణించండి.',
          smartAdviceText: `వర్ష సూచన ఉంది, క్యూలో ${queueLength} మంది రైతులు ఉన్నారు. టార్పాలిన్ కప్పి 03:00 PM కు బయలుదేరండి.`,
          departureNote: '03:00 PM కల్లా కేంద్రానికి బయలుదేరడం మంచిది.',
        },
        ta: {
          headline: 'இன்று உங்கள் கொள்முதல் மையப் பகுதியில் 70% மழை பெய்ய வாய்ப்புள்ளது.',
          cropAdvice: 'தானியத்தில் ஈரப்பதம் 12% மிகாமல் இருக்க தார்ப்பாய் கொண்டு மூடி கொண்டு வாருங்கள்.',
          docAdvice: 'ஆதார், வங்கி புத்தகம் மற்றும் இ-டோக்கன் ரசீதை பிளாஸ்டிக் பையில் பாதுகாப்பாக வைக்கவும்.',
          travelAdvice: 'புறப்படுவதற்கு முன் நேரலை வரிசை நிலையை அறிந்து கவனமாக வாகனம் ஓட்டவும்.',
          smartAdviceText: `மழை வாய்ப்பு உள்ளது, வரிசையில் ${queueLength} விவசாயிகள் உள்ளனர். 03:00 PM மணிக்கு புறப்படுங்கள்.`,
          departureNote: '03:00 PM மணிக்கு கொள்முதல் மையத்திற்கு புறப்பட அறிவுறுத்தப்படுகிறது.',
        },
        kn: {
          headline: 'ಇಂದು ನಿಮ್ಮ ಖರೀದಿ ಕೇಂದ್ರದ ಸುತ್ತಮುತ್ತ 70% ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.',
          cropAdvice: 'ಧಾನ್ಯದ ತೇವಾಂಶ 12% ಕ್ಕಿಂತ ಹೆಚ್ಚಾಗದಂತೆ ವಾಟರ್‌ಪ್ರೂಫ್ ಟಾರ್ಪಾಲಿನ್‌ನಿಂದ ಭದ್ರವಾಗಿ ಮುಚ್ಚಿ.',
          docAdvice: 'ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಮತ್ತು ಇ-ಟೋಕನ್ ರಸೀದಿಯನ್ನು ಜಿಪ್ ಬ್ಯಾಗ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿಡಿ.',
          travelAdvice: 'ಹೊರಡುವ ಮುನ್ನ ಲೈವ್ ಸರದಿ ಸ್ಥಿತಿ ನೋಡಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಚಾಲನೆ ಮಾಡಿ.',
          smartAdviceText: `ಮಳೆ ಸಂಭವನೀಯತೆ ಇದೆ, ಸರದಿಯಲ್ಲಿ ${queueLength} ರೈತರಿದ್ದಾರೆ. ಟಾರ್ಪಾಲಿನ್ ಮುಚ್ಚಿ 03:00 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: '03:00 PM ಗೆ ಕೇಂದ್ರಕ್ಕೆ ಹೊರಡಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.',
        },
        ml: {
          headline: 'ഇന്ന് നിങ്ങളുടെ സംഭരണ കേന്ദ്രത്തിന് സമീപം 70% മഴ സാധ്യതയുണ്ട്.',
          cropAdvice: 'ഈർപ്പം 12% ൽ കൂടാതെ സൂക്ഷിക്കാൻ വിളകൾ വാട്ടർപ്രൂഫ് ടാർപോളിൻ ഉപയോഗിച്ച് മൂടുക.',
          docAdvice: 'ആധാർ, ബാങ്ക് പാസ്ബുക്ക്, ഇ-ടോക്കൺ എന്നിവ വാട്ടർപ്രൂഫ് പൗച്ചിൽ സൂക്ഷിക്കുക.',
          travelAdvice: 'പുറപ്പെടുന്നതിന് മുൻപ് ലൈവ് ക്യൂ നില പരിശോധിച്ച് സുരക്ഷിതമായി യാത്ര ചെയ്യുക.',
          smartAdviceText: `മഴ സാധ്യതയുണ്ട്, ക്യൂവിൽ ${queueLength} കർഷകരുണ്ട്. ടാർപോളിൻ മൂടി 03:00 PM ന് പുറപ്പെടുക.`,
          departureNote: '03:00 PM ന് സംഭരണ കേന്ദ്രത്തിലേക്ക് പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ଆପଣଙ୍କ କ୍ରୟ କେନ୍ଦ୍ର ପାଖାପାଖି ୭୦% ବର୍ଷା ହେବାର ସମ୍ଭାବନା ଅଛି।',
          cropAdvice: 'ଫସଲରେ ଆର୍ଦ୍ରତା ୧୨% ରୁ କମ୍ ରଖିବାକୁ ୱାଟରପ୍ରୁଫ୍ ତାରପୋଲିନ୍ ଦେଇ ଘୋଡ଼ାଇ ଆଣନ୍ତୁ।',
          docAdvice: 'ଆଧାର କାର୍ଡ, ବ୍ୟାଙ୍କ ପାସବହି ଏବଂ ଇ-ଟୋକନ୍ ରସିଦ୍ କୁ ପ୍ଲାଷ୍ଟିକ୍ ବ୍ୟାଗରେ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।',
          travelAdvice: 'ବାହାରିବା ପୂର୍ବରୁ ଲାଇଭ୍ ଧାଡ଼ି ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ସାବଧାନରେ ଯାଆନ୍ତୁ।',
          smartAdviceText: `ବର୍ଷା ସମ୍ଭାବନା ଅଛି ଏବଂ ଧାଡ଼ିରେ ${queueLength} ଜଣ ଚାଷୀ ଅଛନ୍ତି। ତାରପୋଲିନ୍ ବାନ୍ଧି ୦୩:୦୦ PM ସୁଦ୍ଧା ବାହାରନ୍ତୁ।`,
          departureNote: '୦୩:୦୦ PM ସୁଦ୍ଧା କ୍ରୟ କେନ୍ଦ୍ରକୁ ବାହାରିବାକୁ ପରାମର୍ଶ।',
        },
      },
      heavy_rain: {
        hi: {
          headline: 'आज भारी बारिश और तेज बौछार की चेतावनी (90%) है। उच्च सतर्कता बरतें।',
          cropAdvice: 'फसल को डबल लेयर वाटरप्रूफ तिरपाल से बांधें और नीचे फट्टे रखकर पानी से बचाएं।',
          docAdvice: 'सभी कागजात और मोबाइल जिपलॉक पाउच में सुरक्षित रखें।',
          travelAdvice: 'केंद्र जाने से पहले तौल कांटा और मार्ग में जलभराव की स्थिति की पुष्टि करें।',
          smartAdviceText: `भारी बारिश की चेतावनी है। मार्ग में अतिरिक्त समय लेकर 02:45 PM तक सुरक्षित गति से निकलें।`,
          departureNote: 'भारी बारिश के कारण 02:45 PM पर अतिरिक्त समय लेकर निकलें।',
        },
        en: {
          headline: 'Severe rain and thunderstorm warning (90%) today. Exercise caution.',
          cropAdvice: 'Use double-layered tarpaulin and keep produce on pallets above floor level.',
          docAdvice: 'Store all identity slips and mobile phone in sealed waterproof pouches.',
          travelAdvice: 'Verify center operational status and road waterlogging before loading.',
          smartAdviceText: `Heavy rain alert. Take safe speed and depart early by 02:45 PM with buffer time.`,
          departureNote: 'Depart early by 02:45 PM with extra driving buffer.',
        },
        pa: {
          headline: 'ਅੱਜ ਭਾਰੀ ਮੀਂਹ ਅਤੇ ਤੂਫ਼ਾਨ ਦੀ ਚੇਤਾਵਨੀ (90%) ਹੈ। ਪੂਰੀ ਸਾਵਧਾਨੀ ਵਰਤੋ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਦੋਹਰੀ ਤਿਰਪਾਲ ਨਾਲ ਬੰਨ੍ਹੋ ਅਤੇ ਹੇਠਾਂ ਪਾਣੀ ਤੋਂ ਬਚਾਅ ਲਈ ਫੱਟੇ ਰੱਖੋ।',
          docAdvice: 'ਸਾਰੇ ਕਾਗਜ਼ਾਤ ਅਤੇ ਮੋਬਾਈਲ ਨੂੰ ਜ਼ਿਪਲੌਕ ਪਾਊਚ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।',
          travelAdvice: 'ਮੰਡੀ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਤੋਲ ਕੰਡੇ ਅਤੇ ਰਸਤੇ ਦੇ ਪਾਣੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।',
          smartAdviceText: `ਭਾਰੀ ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ ਹੈ। ਰਸਤੇ ਲਈ ਵਾਧੂ ਸਮਾਂ ਲੈ ਕੇ 02:45 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`,
          departureNote: 'ਭਾਰੀ ਮੀਂਹ ਕਾਰਨ 02:45 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।',
        },
        mr: {
          headline: 'आज मुसळधार पाऊस व वादळाचा इशारा (९०%) आहे. विशेष खबरदारी घ्या.',
          cropAdvice: 'धान्याला दुहेरी ताडपत्री बांधा आणि जमिनीपासून वर सुरक्षित ठेवा.',
          docAdvice: 'कागदपत्रे आणि मोबाईल वॉटरप्रूफ झिपलॉक पाऊचमध्ये ठेवा.',
          travelAdvice: 'केंद्राचा वजनकाटा सुरू असल्याची आणि रस्त्याची खात्री करूनच निघा.',
          smartAdviceText: `मुसळधार पावसाचा इशारा आहे. जास्त वेळ गृहीत धरून दुपारी ०२:४५ वाजता निघा.`,
          departureNote: 'मुसळधार पावसामुळे ०२:४५ वाजता लवकर निघा.',
        },
        gu: {
          headline: 'આજે ભારે વરસાદ અને વાવાઝોડાની ચેતવણી (૯૦%) છે. સાવચેત રહો.',
          cropAdvice: 'પાકને ડબલ તાડપત્રીથી બાંધો અને નીચે પાણીથી બચાવ માટે લાકડાના પાટિયા રાખો.',
          docAdvice: 'બધા દસ્તાવેજો અને મોબાઈલ ઝિપલૉક પાઉચમાં સુરક્ષિત રાખો.',
          travelAdvice: 'કેન્દ્ર પર વજનકાંટો ચાલુ હોવાની અને રસ્તાની ખાતરી કરીને નીકળો.',
          smartAdviceText: `ભારે વરસાદની ચેતવણી છે. રસ્તા માટે વધારાનો સમય રાખી બપોરે ૦૨:૪૫ વાગ્યે નીકળો.`,
          departureNote: 'ભારે વરસાદને કારણે ૦૨:૪૫ વાગ્યે નીકળવું.',
        },
        bn: {
          headline: 'আজ ভারী বৃষ্টি ও ঝড়ের সতর্কতা (৯০%) জারি রয়েছে। সর্বোচ্চ সতর্ক থাকুন।',
          cropAdvice: 'ফসলকে ডাবল ত্রিপল দিয়ে বাঁধুন এবং জল থেকে দূরে উঁচু স্থানে রাখুন।',
          docAdvice: 'সব কাগজপত্র ও মোবাইল জিপলক ওয়াটারপ্রুফ ব্যাগে রাখুন।',
          travelAdvice: 'কেন্দ্রে যাওয়ার আগে ওজন স্কেল ও রাস্তার জলমগ্নতা সম্পর্কে নিশ্চিত হন।',
          smartAdviceText: `ভারী বৃষ্টির সতর্কতা। রাস্তায় অতিরিক্ত সময় হাতে নিয়ে ০২:৪৫ PM এ রওনা দিন।`,
          departureNote: 'ভারী বৃষ্টির জন্য ০২:৪৫ PM এ আগে রওনা দিন।',
        },
        te: {
          headline: 'ఈరోజు భారీ వర్షం మరియు ఉరుముల హెచ్చరిక (90%) ఉంది. అత్యంత జాగ్రత్త వహించండి.',
          cropAdvice: 'ధాన్యంపై డబుల్ లేయర్ టార్పాలిన్ కప్పి, కింద నీరు తగలకుండా చెక్క బల్లలపై ఉంచండి.',
          docAdvice: 'పత్రాలు మరియు మొబైల్ ఫోన్‌ను సీల్ చేసిన వాటర్‌ప్రూఫ్ బ్యాగులో భద్రపరచండి.',
          travelAdvice: 'కేంద్రంలో కాటా పనిచేస్తుందో లేదో మరియు రోడ్డు పరిస్థితిని నిర్ధారించుకోండి.',
          smartAdviceText: `భారీ వర్ష హెచ్చరిక. తగిన సమయం చూసుకుని 02:45 PM కల్లా ముందుగానే బయలుదేరండి.`,
          departureNote: 'భారీ వర్షం దృష్ట్యా 02:45 PM కే బయలుదేరండి.',
        },
        ta: {
          headline: 'இன்று கனமழை மற்றும் இடியுடன் கூடிய மழை எச்சரிக்கை (90%) உள்ளது.',
          cropAdvice: 'தானியங்களை இரட்டை தார்ப்பாய் கொண்டு கட்டி, தரையில் நீர் படாமல் பாதுகாக்கவும்.',
          docAdvice: 'அனைத்து ஆவணங்களையும் மொபைலையும் ஜிப்லாக் பையில் பாதுகாப்பாக வைக்கவும்.',
          travelAdvice: 'மையத்தின் எடை மேடை இயங்குவதையும் சாலை நிலையையும் உறுதி செய்து புறப்படவும்.',
          smartAdviceText: `கனமழை எச்சரிக்கை. கூடுதல் நேரம் எடுத்துக்கொண்டு 02:45 PM மணிக்கு புறப்படவும்.`,
          departureNote: 'கனமழை காரணமாக 02:45 PM மணிக்கு புறப்படுங்கள்.',
        },
        kn: {
          headline: 'ಇಂದು ಭಾರಿ ಮಳೆ ಮತ್ತು ಗುಡುಗು ಮಿಂಚಿನ ಎಚ್ಚರಿಕೆ (90%) ಇದೆ. ಜಾಗರೂಕರಾಗಿರಿ.',
          cropAdvice: 'ಬೆಳೆಯನ್ನು ಡಬಲ್ ಟಾರ್ಪಾಲಿನ್‌ನಿಂದ ಕಟ್ಟಿ, ಕೆಳಗೆ ನೀರು ನಿಲ್ಲದಂತೆ ಹಲಗೆಗಳ ಮೇಲಿಡಿ.',
          docAdvice: 'ಎಲ್ಲ ದಾಖಲೆಗಳು ಮತ್ತು ಮೊಬೈಲ್ ಅನ್ನು ಜಿಪ್‌ಲಾಕ್ ಪೌಚ್‌ನಲ್ಲಿಡಿ.',
          travelAdvice: 'ತೂಕದ ಯಂತ್ರ ಚಾಲನೆಯಲ್ಲಿರುವುದನ್ನು ಮತ್ತು ರಸ್ತೆ ಸ್ಥಿತಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
          smartAdviceText: `ಭಾರಿ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇದೆ. ಮುಂಚಿತವಾಗಿ 02:45 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: 'ಭಾರಿ ಮಳೆಯ ಕಾರಣ 02:45 PM ಗೆ ಹೊರಡಿ.',
        },
        ml: {
          headline: 'ഇന്ന് ശക്തമായ മഴയ്ക്കും കാറ്റിനും സാധ്യത (90%). അതീവ ജാഗ്രത പാലിക്കുക.',
          cropAdvice: 'വിളകൾ ഇരട്ട ടാർപോളിൻ ഇട്ട് മൂടുകയും വെള്ളം തട്ടാത്തവിധം ഉയർത്തി വയ്ക്കുകയും ചെയ്യുക.',
          docAdvice: 'എല്ലാ രേഖകളും മൊബൈൽ ഫോണും സിപ്പ് ലോക്ക് പൗച്ചിൽ സൂക്ഷിക്കുക.',
          travelAdvice: 'കേന്ദ്രത്തിൽ തൂക്കം നടക്കുന്നുണ്ടെന്നും വഴിയിൽ തടസ്സമില്ലെന്നും ഉറപ്പാക്കുക.',
          smartAdviceText: `ശക്തമായ മഴ മുന്നറിയിപ്പുണ്ട്. മുൻകൂട്ടി 02:45 PM ന് പുറപ്പെടുക.`,
          departureNote: 'മഴ കാരണം 02:45 PM ന് നേരത്തെ പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ପ୍ରବଳ ବର୍ଷା ଓ ଝଡ଼ର ସତର୍କତା (୯୦%) ଅଛି। ସତର୍କ ରୁହନ୍ତୁ।',
          cropAdvice: 'ଫସଲକୁ ଦୁଇ ପରସ୍ତ ତାରପୋଲିନ୍ ଦେଇ ବାନ୍ଧନ୍ତୁ ଏବଂ ତଳେ ପଟା ଦେଇ ପାଣିରୁ ବଞ୍ଚାନ୍ତୁ।',
          docAdvice: 'ସମସ୍ତ କାଗଜପତ୍ର ଓ ମୋବାଇଲ୍ କୁ ଜିପଲକ୍ ପାଉଚରେ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।',
          travelAdvice: 'କେନ୍ଦ୍ରର ଓଜନ କଣ୍ଟା ଓ ରାସ୍ତା ସ୍ଥିତି ବୁଝି ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ।',
          smartAdviceText: `ପ୍ରବଳ ବର୍ଷା ସତର୍କତା ଅଛି। ଅତିରିକ୍ତ ସମୟ ହାତରେ ରଖି ୦୨:୪୫ PM ସୁଦ୍ଧା ବାହାରନ୍ତୁ।`,
          departureNote: 'ପ୍ରବଳ ବର୍ଷା ହେତୁ ୦୨:୪୫ PM ରେ ବାହାରନ୍ତୁ।',
        },
      },
      clear: {
        hi: {
          headline: 'आज मौसम पूरी तरह साफ और शुष्क है। खरीद केंद्र जाने हेतु स्थिति अनुकूल है।',
          cropAdvice: 'फसल को सामान्य तिरपाल से ढककर लाएँ ताकि रास्ते की धूल से बचाव रहे।',
          docAdvice: 'किसान आईडी, आधार कार्ड, बैंक पासबुक और ई-टोकन पर्ची साथ रखें।',
          travelAdvice: 'अपनी निर्धारित समय स्लॉट (03:30 PM) के अनुसार सुगमता से पहुंचें।',
          smartAdviceText: `मौसम साफ है और कतार में ${queueLength} किसान हैं। आप 03:05 PM तक आराम से निकल सकते हैं।`,
          departureNote: '03:05 PM तक केंद्र के लिए निकलने की सलाह है।',
        },
        en: {
          headline: 'Weather is clear and sunny. Conditions are favorable for procurement.',
          cropAdvice: 'Cover produce with clean cloth or tarpaulin to prevent road dust settling.',
          docAdvice: 'Carry Farmer ID, Aadhaar Card, Bank Passbook, and e-Token booking slip.',
          travelAdvice: 'Proceed normally as per your 03:30 PM scheduled slot.',
          smartAdviceText: `Clear weather with ${queueLength} farmers ahead. Comfortable departure at 03:05 PM.`,
          departureNote: 'Depart smoothly around 03:05 PM.',
        },
        pa: {
          headline: 'ਅੱਜ ਮੌਸਮ ਬਿਲਕੁਲ ਸਾਫ਼ ਅਤੇ ਖੁੱਲ੍ਹਾ ਹੈ। ਮੰਡੀ ਜਾਣ ਲਈ ਹਾਲਾਤ ਬਹੁਤ ਵਧੀਆ ਹਨ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਸਾਫ਼ ਤਿਰਪਾਲ ਨਾਲ ਢੱਕੋ ਤਾਂ ਜੋ ਰਸਤੇ ਦੀ ਧੂੜ-ਮਿੱਟੀ ਤੋਂ ਬਚਾਅ ਰਹੇ।',
          docAdvice: 'ਕਿਸਾਨ ਆਈਡੀ, ਆਧਾਰ ਕਾਰਡ, ਬੈਂਕ ਪਾਸਬੁੱਕ ਅਤੇ ਈ-ਟੋਕਨ ਪਰਚੀ ਨਾਲ ਰੱਖੋ।',
          travelAdvice: 'ਆਪਣੇ ਨਿਰਧਾਰਤ ਸਮੇਂ (03:30 PM) ਮੁਤਾਬਕ ਅਰਾਮ ਨਾਲ ਪਹੁੰਚੋ।',
          smartAdviceText: `ਮੌਸਮ ਸਾਫ਼ ਹੈ ਅਤੇ ਕਤਾਰ ਵਿੱਚ ${queueLength} ਕਿਸਾਨ ਹਨ। ਤੁਸੀਂ 03:05 PM ਤੱਕ ਨਿਕਲ ਸਕਦੇ ਹੋ।`,
          departureNote: '03:05 PM ਤੱਕ ਮੰਡੀ ਲਈ ਨਿਕਲਣ ਦੀ ਸਲਾਹ ਹੈ।',
        },
        mr: {
          headline: 'आज हवामान पूर्णपणे स्वच्छ आणि कोरडे आहे. केंद्रात जाण्यासाठी अनुकूल वेळ आहे.',
          cropAdvice: 'रस्त्यावरील धुळीपासून वाचवण्यासाठी धान्यावर स्वच्छ ताडपत्री टाका.',
          docAdvice: 'शेतकरी आयडी, आधार कार्ड, बँक पासबुक आणि ई-टोकन पावती सोबत ठेवा.',
          travelAdvice: 'आपल्या ठरलेल्या वेळेनुसार (०३:३० PM) केंद्रावर सहज पोहोचू शकता.',
          smartAdviceText: `हवामान स्वच्छ आहे आणि रांगेत ${queueLength} शेतकरी आहेत. दुपारी ०३:०५ पर्यंत निघा.`,
          departureNote: 'दुपारी ०३:०५ वाजता केंद्राकडे निघा.',
        },
        gu: {
          headline: 'આજે હવામાન સંપૂર્ણ સાફ અને સૂકું છે. ખરીદ કેન્દ્ર જવા માટે અનુકૂળ સ્થિતિ છે.',
          cropAdvice: 'રસ્તાની ધૂળથી બચાવવા માટે પાક પર સામાન્ય તાડપત્રી ઢાંકો.',
          docAdvice: 'ખેડૂત આઈડી, આધાર કાર્ડ, બેંક પાસબુક અને ઈ-ટોકન પહોંચ સાથે રાખો.',
          travelAdvice: 'તમારા નક્કી કરેલા સમય (૦૩:૩૦ PM) મુજબ આરામથી પહોંચો.',
          smartAdviceText: `હવામાન સાફ છે અને કતારમાં ${queueLength} ખેડૂતો છે. બપોરે ૦૩:૦૫ વાગ્યે નીકળો.`,
          departureNote: 'બપોરે ૦૩:૦૫ વાગ્યા સુધી નીકળવાની સલાહ છે.',
        },
        bn: {
          headline: 'আজ আবহাওয়া রৌদ্রোজ্জ্বল ও পরিষ্কার। ফসল সংগ্রহের জন্য অনুকূল পরিবেশ।',
          cropAdvice: 'ধুলোবালি থেকে রক্ষা করতে শস্যের উপর পরিষ্কার ত্রিপল দিয়ে আনুন।',
          docAdvice: 'কৃষক আইডি, আধার কার্ড, ব্যাংক পাসবই এবং ই-টোকেন স্লিপ সাথে রাখুন।',
          travelAdvice: 'আপনার নির্ধারিত সময়সূচী (০৩:৩০ PM) অনুযায়ী স্বাভাবিকভাবে যাত্রা করুন।',
          smartAdviceText: `আবহাওয়া পরিষ্কার, সামনে ${queueLength} জন কৃষক আছেন। ০৩:০৫ PM এ শান্তিতে রওনা দিন।`,
          departureNote: '০৩:০৫ PM এ কেন্দ্রের দিকে রওনা দিন।',
        },
        te: {
          headline: 'ఈరోజు వాతావరణం పూర్తిగా పొడిగా, అనుకూలంగా ఉంది.',
          cropAdvice: 'దారిలో దుమ్ము పడకుండా ధాన్యంపై శుభ్రమైన టార్పాలిన్ కప్పండి.',
          docAdvice: 'రైతు ఐడీ, ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్ మరియు ఇ-టోకెన్ రసీదు తీసుకురండి.',
          travelAdvice: 'మీకు కేటాయించిన సమయం (03:30 PM) ప్రకారం కేంద్రానికి చేరుకోండి.',
          smartAdviceText: `వాతావరణం బాగుంది, క్యూలో ${queueLength} మంది ఉన్నారు. 03:05 PM కు బయలుదేరండి.`,
          departureNote: '03:05 PM కు బయలుదేరడం మంచిది.',
        },
        ta: {
          headline: 'இன்று வானிலை தெளிவாகவும் வெயிலாகவும் உள்ளது. கொள்முதலுக்கு உகந்த நாள்.',
          cropAdvice: 'சாலையோர தூசியிலிருந்து பாதுகாக்க தானியங்களை தார்ப்பாய் கொண்டு மூடுங்கள்.',
          docAdvice: 'உழவர் ஐடி, ஆதார் அட்டை, வங்கி புத்தகம் மற்றும் இ-டோக்கன் சீட்டு எடுத்து வரவும்.',
          travelAdvice: 'உங்கள் நேரத்திற்கு (03:30 PM) ஏற்ப இயல்பாக செல்லலாம்.',
          smartAdviceText: `வானிலை சீராக உள்ளது. 03:05 PM மணிக்கு நிதானமாக புறப்படலாம்.`,
          departureNote: '03:05 PM மணிக்கு கொள்முதல் மையத்திற்கு புறப்படுங்கள்.',
        },
        kn: {
          headline: 'ಇಂದು ಹವಾಮಾನವು ಸಂಪೂರ್ಣವಾಗಿ ಸ್ವಚ್ಛವಾಗಿದೆ. ಮಂಡಿಗೆ ಹೋಗಲು ಉತ್ತಮ ಪರಿಸ್ಥಿತಿಯಿದೆ.',
          cropAdvice: 'ಧೂಳಿನಿಂದ ರಕ್ಷಿಸಲು ಬೆಳೆಯನ್ನು ಸ್ವಚ್ಛ ಟಾರ್ಪಾಲಿನ್‌ನಿಂದ ಮುಚ್ಚಿ ತನ್ನಿ.',
          docAdvice: 'ರೈತ ಐಡಿ, ಆಧಾರ್ ಕಾರ್ಡ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಮತ್ತು ಇ-ಟೋಕನ್ ರಸೀದಿ ಜೊತೆಗಿರಲಿ.',
          travelAdvice: 'ನಿಮ್ಮ ನಿಗದಿತ ಸಮಯ (03:30 PM) ಪ್ರಕಾರ ಆರಾಮವಾಗಿ ತಲುಪಿ.',
          smartAdviceText: `ಹವಾಮಾನ ಸ್ವಚ್ಛವಾಗಿದೆ, ಸರದಿಯಲ್ಲಿ ${queueLength} ರೈತರಿದ್ದಾರೆ. 03:05 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: '03:05 PM ಗೆ ಕೇಂದ್ರಕ್ಕೆ ಹೊರಡಲು ಸಲಹೆ.',
        },
        ml: {
          headline: 'ഇന്ന് തെളിഞ്ഞ കാലാവസ്ഥയാണ്. സംഭരണ കേന്ദ്രത്തിലേക്ക് പോകാൻ അനുകൂല സമയം.',
          cropAdvice: 'പൊടിപടലങ്ങളിൽ നിന്ന് സംരക്ഷിക്കാൻ വിളകൾ വൃത്തിയുള്ള തുണി/ഷീറ്റ് കൊണ്ട് മൂടുക.',
          docAdvice: 'കർഷക ഐഡി, ആധാർ കാർഡ്, ബാങ്ക് പാസ്ബുക്ക്, ഇ-ടോക്കൺ എന്നിവ കരുതുക.',
          travelAdvice: 'നിശ്ചയിച്ച സ്ലോട്ട് സമയം (03:30 PM) അനുസരിച്ച് സാധാരണപോലെ യാത്ര ചെയ്യാം.',
          smartAdviceText: `കാലാവസ്ഥ തെളിഞ്ഞതാണ്. 03:05 PM ന് സുഖമായി പുറപ്പെടാം.`,
          departureNote: '03:05 PM ന് പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ପାଣିପାଗ ସମ୍ପୂର୍ଣ୍ଣ ପରିଷ୍କାର ଓ ଖରାଟିଆ ଅଛି। କ୍ରୟ କେନ୍ଦ୍ର ଯିବାକୁ ଅନୁକୂଳ।',
          cropAdvice: 'ଧୂଳିମଳିରୁ ରକ୍ଷା କରିବା ପାଇଁ ଫସଲକୁ ସଫା ତାରପୋଲିନ୍ ଦେଇ ଘୋଡ଼ାନ୍ତୁ।',
          docAdvice: 'କୃଷକ ଆଇଡି, ଆଧାର କାର୍ଡ, ବ୍ୟାଙ୍କ ପାସବହି ଏବଂ ଇ-ଟୋକନ୍ ରସିଦ୍ ସାଥିରେ ଆଣନ୍ତୁ।',
          travelAdvice: 'ଆପଣଙ୍କ ନିର୍ଦ୍ଧାରିତ ସମୟ (୦୩:୩୦ PM) ଅନୁସାରେ ସହଜରେ ପହଞ୍ଚନ୍ତୁ।',
          smartAdviceText: `ପାଣିପାଗ ସଫା ଅଛି, ଧାଡ଼ିରେ ${queueLength} ଜଣ ଚାଷୀ ଅଛନ୍ତି। ୦୩:୦୫ PM ରେ ବାହାରନ୍ତୁ।`,
          departureNote: '୦୩:୦୫ PM ସୁଦ୍ଧା କ୍ରୟ କେନ୍ଦ୍ରକୁ ବାହାରନ୍ତୁ।',
        },
      },
      partly_cloudy: {
        hi: {
          headline: 'आज आंशिक बादल छाए रहेंगे। मौसम सामान्य व अनुकूल रहेगा।',
          cropAdvice: 'फसल को सामान्य तिरपाल से ढकें ताकि अचानक हल्की बूंदाबांदी से बचाव रहे।',
          docAdvice: 'दस्तावेज़ों को बैग में रखें और सुरक्षित रखें।',
          travelAdvice: 'समय पर निकलें और रास्ते में सावधानी रखें।',
          smartAdviceText: `मौसम सामान्य है। कतार में ${queueLength} किसान हैं। 03:05 PM पर प्रस्थान करें।`,
          departureNote: '03:05 PM तक प्रस्थान करें।',
        },
        en: {
          headline: 'Partly cloudy skies today with pleasant procurement conditions.',
          cropAdvice: 'Cover produce with tarpaulin as a precaution against stray drizzles.',
          docAdvice: 'Keep documents protected inside your file pouch.',
          travelAdvice: 'Depart on schedule for your booked time slot.',
          smartAdviceText: `Mild clouds, ${queueLength} farmers in queue. Depart at 03:05 PM.`,
          departureNote: 'Depart at 03:05 PM.',
        },
        pa: {
          headline: 'ਅੱਜ ਹਲਕੇ ਬੱਦਲ ਰਹਿਣਗੇ। ਮੰਡੀ ਲਈ ਮੌਸਮ ਠੀਕ-ਠਾਕ ਹੈ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਤਿਰਪਾਲ ਨਾਲ ਢੱਕ ਕੇ ਲਿਆਓ।',
          docAdvice: 'ਦਸਤਾਵੇਜ਼ ਬੈਗ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।',
          travelAdvice: 'ਆਪਣੇ ਸਮੇਂ ਸਿਰ ਮੰਡੀ ਪਹੁੰਚੋ।',
          smartAdviceText: `ਮੌਸਮ ਠੀਕ ਹੈ। 03:05 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`,
          departureNote: '03:05 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।',
        },
        mr: {
          headline: 'आज अंशतः ढगाळ हवामान राहील. खरेदीसाठी परिस्थिती अनुकूल आहे.',
          cropAdvice: 'धान्यावर सुरक्षित ताडपत्री बांधून आणा.',
          docAdvice: 'सर्व कागदपत्रे पिशवीत सुरक्षित ठेवा.',
          travelAdvice: 'वेळेवर केंद्रावर पोहोचा.',
          smartAdviceText: `हवामान सामान्य आहे. ०३:०५ PM वाजता निघा.`,
          departureNote: '०३:०५ PM वाजता निघा.',
        },
        gu: {
          headline: 'આજે આંશિક વાદળછાયું રહેશે. ખરીદી માટે વાતાવરણ સારું છે.',
          cropAdvice: 'પાકને તાડપત્રીથી ઢાંકીને લાવો.',
          docAdvice: 'દસ્તાવેજો સુરક્ષિત રાખો.',
          travelAdvice: 'સમયસર કેન્દ્ર પર પહોંચો.',
          smartAdviceText: `વાતાવરણ સારું છે. ૦૩:૦૫ વાગ્યે નીકળો.`,
          departureNote: '૦૩:૦૫ વાગ્યે નીકળો.',
        },
        bn: {
          headline: 'আজ আংশিক মেঘলা আকাশ থাকবে। ফসল সংগ্রহের উপযোগী পরিবেশ।',
          cropAdvice: 'ফসল ত্রিপল দিয়ে ঢেকে আনুন।',
          docAdvice: 'নথিপত্র ব্যাগে সুরক্ষিত রাখুন।',
          travelAdvice: 'সময়মতো কেন্দ্রে পৌঁছান।',
          smartAdviceText: `আবহাওয়া স্বাভাবিক। ০৩:০৫ PM এ রওনা দিন।`,
          departureNote: '০৩:০৫ PM এ রওনা দিন।',
        },
        te: {
          headline: 'ఈరోజు పాక్షికంగా మేఘావృతమై ఉంటుంది. సాధారణ పరిస్థితి.',
          cropAdvice: 'ధాన్యాన్ని టార్పాలిన్‌తో కప్పి తీసుకురండి.',
          docAdvice: 'పత్రాలను భద్రంగా ఉంచండి.',
          travelAdvice: 'సమయానికి కేంద్రానికి చేరుకోండి.',
          smartAdviceText: `వాతావરણ సాధారణం. 03:05 PM కు బయలుదేరండి.`,
          departureNote: '03:05 PM కు బయలుదేరండి.',
        },
        ta: {
          headline: 'இன்று லேசான மேகமூட்டம் காணப்படும். நிலைமை சீராக உள்ளது.',
          cropAdvice: 'தானியங்களை தார்ப்பாய் கொண்டு மூடுங்கள்.',
          docAdvice: 'ஆவணங்களை பையில் பாதுகாப்பாக வையுங்கள்.',
          travelAdvice: 'சரியான நேரத்தில் மையத்திற்கு செல்லுங்கள்.',
          smartAdviceText: `வானிலை சீரானது. 03:05 PM மணிக்கு புறப்படுங்கள்.`,
          departureNote: '03:05 PM மணிக்கு புறப்படுங்கள்.',
        },
        kn: {
          headline: 'ಇಂದು ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣವಿರುತ್ತದೆ. ಸ್ಥಿತಿ ಸಾಮಾನ್ಯ.',
          cropAdvice: 'ಬೆಳೆಯನ್ನು ಟಾರ್ಪಾಲಿನ್‌ನಿಂದ ಮುಚ್ಚಿ ತನ್ನಿ.',
          docAdvice: 'ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಿ.',
          travelAdvice: 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಮಂಡಿಗೆ ತಲುಪಿ.',
          smartAdviceText: `ವಾತಾವರಣ ಸಾಮಾನ್ಯವಾಗಿದೆ. 03:05 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: '03:05 PM ಗೆ ಹೊರಡಿ.',
        },
        ml: {
          headline: 'ഇന്ന് ഭാഗികമായി മേഘാവൃതമായിരിക്കും. കാലാവസ്ഥ അനുകൂലം.',
          cropAdvice: 'വിളകൾ ഷീറ്റ് കൊണ്ട് മൂടുക.',
          docAdvice: 'രേഖകൾ ഭദ്രമായി സൂക്ഷിക്കുക.',
          travelAdvice: 'കൃത്യസമയത്ത് കേന്ദ്രത്തിലെത്തുക.',
          smartAdviceText: `കാലാവസ്ഥ സാധാരണ നിലയിലാണ്. 03:05 PM ന് പുറപ്പെടുക.`,
          departureNote: '03:05 PM ന് പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ଆଂଶିକ ମେଘୁଆ ପାଗ ରହିବ। କ୍ରୟ ସ୍ଥିତି ସ୍ୱାଭାବିକ।',
          cropAdvice: 'ଫସଲକୁ ତାରପୋଲିନ୍ ଦେଇ ଘୋଡ଼ାନ୍ତୁ।',
          docAdvice: 'କାଗଜପତ୍ର ସୁରକ୍ଷିତ ରଖନ୍ତୁ।',
          travelAdvice: 'ସମୟାନୁସାରେ କେନ୍ଦ୍ରକୁ ଯାଆନ୍ତୁ।',
          smartAdviceText: `ପାଣିପାଗ ସ୍ୱାଭାବିକ। ୦୩:୦୫ PM ରେ ବାହାରନ୍ତୁ।`,
          departureNote: '୦୩:୦୫ PM ରେ ବାହାରନ୍ତୁ।',
        },
      },
      hot: {
        hi: {
          headline: 'आज तापमान 38°C से अधिक रहने की संभावना है। तेज धूप व लू से बचें।',
          cropAdvice: 'फसल को सीधी तीखी धूप से बचाने हेतु सूती कपड़ा या तिरपाल लगाएं।',
          docAdvice: 'कागजात छायादार जगह पर रखें और पसीने/धूल से सुरक्षित रखें।',
          travelAdvice: 'पीने का पानी (2-3 लीटर), गमछा और ओआरएस साथ रखें।',
          smartAdviceText: `गर्मी तेज है। कतार में ${queueLength} किसान हैं। पर्याप्त पानी लेकर 03:10 PM तक निकलें।`,
          departureNote: '03:10 PM तक निकलें, धूप से बचाव का सामान साथ रखें।',
        },
        en: {
          headline: 'Temperatures above 38°C expected today. Stay well hydrated.',
          cropAdvice: 'Cover grain with breathable cloth to prevent over-drying from intense sun.',
          docAdvice: 'Keep documents protected from heat, sweat, and dust in a file.',
          travelAdvice: 'Carry ample drinking water, head towel, and rest under shed.',
          smartAdviceText: `High heat today. Carry drinking water and depart around 03:10 PM.`,
          departureNote: 'Depart around 03:10 PM with sun protection.',
        },
        pa: {
          headline: 'ਅੱਜ ਤਾਪਮਾਨ 38°C ਤੋਂ ਵੱਧ ਰਹੇਗਾ। ਧੁੱਪ ਅਤੇ ਗਰਮੀ ਤੋਂ ਬਚਾਅ ਰੱਖੋ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਸਿੱਧੀ ਧੁੱਪ ਤੋਂ ਬਚਾਉਣ ਲਈ ਸੂਤੀ ਕੱਪੜੇ ਜਾਂ ਤਿਰਪਾਲ ਨਾਲ ਢੱਕੋ।',
          docAdvice: 'ਕਾਗਜ਼ਾਤ ਧੂੜ ਅਤੇ ਪਸੀਨੇ ਤੋਂ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।',
          travelAdvice: 'ਪੀਣ ਵਾਲਾ ਪਾਣੀ ਅਤੇ ਸਿਰ ਢੱਕਣ ਲਈ ਪਰਨਾ ਨਾਲ ਰੱਖੋ।',
          smartAdviceText: `ਗਰਮੀ ਤੇਜ਼ ਹੈ। ਪਾਣੀ ਨਾਲ ਲੈ ਕੇ 03:10 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।`,
          departureNote: '03:10 PM ਤੱਕ ਰਵਾਨਾ ਹੋਣ ਦੀ ਸਲਾਹ ਹੈ।',
        },
        mr: {
          headline: 'आज तापमान ३८°C पेक्षा जास्त राहण्याची शक्यता आहे. उन्हापासून काळजी घ्या.',
          cropAdvice: 'धान्याला थेट कडक उन्हापासून वाचवण्यासाठी कापडी ताडपत्री वापरा.',
          docAdvice: 'कागदपत्रे सावलीत व सुरक्षित पिशवीत ठेवा.',
          travelAdvice: 'पिण्याचे पाणी आणि डोक्यावर रुमाल/टोपी सोबत ठेवा.',
          smartAdviceText: `उन्हाचा पारा जास्त आहे. दुपारी ०३:१० पर्यंत केंद्राकडे निघा.`,
          departureNote: 'दुपारी ०३:१० वाजता उन्हाची काळजी घेऊन निघा.',
        },
        gu: {
          headline: 'આજે તાપમાન ૩૮°C થી વધુ રહેશે. ગરમી અને લૂ થી સાચવવું.',
          cropAdvice: 'પાકને સીધા તડકાથી બચાવવા સુતરાઉ કાપડ કે તાડપત્રી ઢાંકો.',
          docAdvice: 'દસ્તાવેજો ધૂળ અને પરસેવાથી સુરક્ષિત રાખો.',
          travelAdvice: 'પીવાનું પાણી અને માથે રૂમાલ/ટોપી સાથે રાખો.',
          smartAdviceText: `ગરમી વધારે છે. પાણી સાથે રાખી બપોરે ૦૩:૧૦ વાગ્યે નીકળો.`,
          departureNote: 'બપોરે ૦૩:૧૦ વાગ્યે નીકળવું.',
        },
        bn: {
          headline: 'আজ তাপমাত্রা ৩৮°C এর উপরে থাকতে পারে। তীব্র রোদ ও গরম থেকে সাবধান থাকুন।',
          cropAdvice: 'তীব্র রোদ থেকে বাঁচাতে শস্যের উপর সুতি চাদর বা ত্রিপল দিন।',
          docAdvice: 'নথিপত্র ঘাম ও ধুলো থেকে সুরক্ষিত রাখুন।',
          travelAdvice: 'পর্যাপ্ত পানীয় জল এবং গামছা সঙ্গে রাখুন।',
          smartAdviceText: `তীব্র গরম। সাথে জল নিয়ে ০৩:১০ PM এ রওনা দিন।`,
          departureNote: '০৩:১০ PM এ রওনা দেওয়ার পরামর্শ।',
        },
        te: {
          headline: 'ఈరోజు ఉష్ణోగ్రత 38°C కంటే ఎక్కువ ఉండే అవకాశం ఉంది. ఎండ దెబ్బ తగలకుండా చూసుకోండి.',
          cropAdvice: 'ధాన్యంపై నేరుగా తీవ్రమైన ఎండ పడకుండా కాటన్ క్లాత్ లేదా టార్పాలిన్ కప్పండి.',
          docAdvice: 'పత్రాలను చెమట మరియు దుమ్ము నుండి సురక్షితంగా ఉంచండి.',
          travelAdvice: 'త్రాగునీరు మరియు తలపాగా/గొడుగు వెంట తెచ్చుకోండి.',
          smartAdviceText: `ఎండ ఎక్కువగా ఉంది. నీరు వెంట ఉంచుకుని 03:10 PM కు బయలుదేరండి.`,
          departureNote: '03:10 PM కు బయలుదేరండి.',
        },
        ta: {
          headline: 'இன்று வெப்பநிலை 38°Cக்கு மேல் இருக்கும். வெயிலில் இருந்து தற்காத்துக் கொள்ளுங்கள்.',
          cropAdvice: 'தானியங்களை கடுமையான வெயிலில் இருந்து பாதுகாக்க துணி கொண்டு மூடுங்கள்.',
          docAdvice: 'ஆவணங்களை பாதுகாப்பாக பையில் வையுங்கள்.',
          travelAdvice: 'குடிநீர் மற்றும் தலைப்பாகை/துண்டு உடன் கொண்டு செல்லுங்கள்.',
          smartAdviceText: `வெயில் அதிகம். 03:10 PM மணிக்கு புறப்படலாம்.`,
          departureNote: '03:10 PM மணிக்கு புறப்படுங்கள்.',
        },
        kn: {
          headline: 'ಇಂದು ತಾಪಮಾನ 38°C ಗಿಂತ ಹೆಚ್ಚಿರುತ್ತದೆ. ಬಿಸಿಲಿನಿಂದ ಜಾಗರೂಕರಾಗಿರಿ.',
          cropAdvice: 'ಬೆಳೆಯನ್ನು ಬಿಸಿಲಿನಿಂದ ರಕ್ಷಿಸಲು ಹತ್ತಿ ಬಟ್ಟೆ ಅಥವಾ ಟಾರ್ಪಾಲಿನ್ ಮುಚ್ಚಿ.',
          docAdvice: 'ದಾಖಲೆಗಳನ್ನು ಧೂಳು ಮತ್ತು ಬೆವರಿನಿಂದ ರಕ್ಷಿಸಿ.',
          travelAdvice: 'ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಟವೆಲ್ ಜೊತೆಗೆ ಇಟ್ಟುಕೊಳ್ಳಿ.',
          smartAdviceText: `ಬಿಸಿಲು ಹೆಚ್ಚಿದೆ. ನೀರು ತೆಗೆದುಕೊಂಡು 03:10 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: '03:10 PM ಗೆ ಹೊರಡಿ.',
        },
        ml: {
          headline: 'ഇന്ന് താപനില 38°C ൽ കൂടുതൽ ആയിരിക്കും. കടുത്ത ചൂടിൽ നിന്ന് ശ്രദ്ധിക്കുക.',
          cropAdvice: 'വിളകൾ കഠിനമായ വെയിൽ തട്ടാതെ ഷീറ്റ് കൊണ്ട് സംരക്ഷിക്കുക.',
          docAdvice: 'രേഖകൾ ഭദ്രമായി സൂക്ഷിക്കുക.',
          travelAdvice: 'ധാരാളം കുടിവെള്ളവും തോർത്തും കരുതുക.',
          smartAdviceText: `ചൂട് കൂടുതലാണ്. 03:10 PM ന് പുറപ്പെടുക.`,
          departureNote: '03:10 PM ന് പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ତାପମାତ୍ରା ୩୮°C ରୁ ଅଧିକ ରହିବ। ପ୍ରଚଣ୍ଡ ଖରା ଓ ଲୁ ରୁ ବଞ୍ଚନ୍ତୁ।',
          cropAdvice: 'ଫସଲକୁ ସିଧାସଳଖ ଟାଣ ଖରାରୁ ବଞ୍ଚାଇବାକୁ ସୂତା କପଡ଼ା ବା ତାରପୋଲିନ୍ ଦିଅନ୍ତୁ।',
          docAdvice: 'କାଗଜପତ୍ର ଝାଳ ଓ ଧୂଳିରୁ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।',
          travelAdvice: 'ପିଇବା ପାଣି ଓ ଗାମୁଛା ସାଥିରେ ନିଅନ୍ତୁ।',
          smartAdviceText: `ଖରା ଟାଣ ଅଛି। ପାଣି ସାଥିରେ ନେଇ ୦୩:୧୦ PM ରେ ବାହାରନ୍ତୁ।`,
          departureNote: '୦୩:୧୦ PM ସୁଦ୍ଧା ବାହାରନ୍ତୁ।',
        },
      },
      windy: {
        hi: {
          headline: 'आज 34 km/h की गति से तेज हवा चलने की संभावना है।',
          cropAdvice: 'फसल को रस्सी और तिरपाल से चारों तरफ से अच्छी तरह बांधें ताकि दाने न उड़ें।',
          docAdvice: 'कागजात खुले न रखें, बैग के अंदर जिप बंद रखें।',
          travelAdvice: 'ट्रैक्टर ट्रॉली को सामान्य व नियंत्रित गति पर चलाएं।',
          smartAdviceText: `तेज हवा की संभावना है। फसल कसकर बांधकर 03:00 PM तक रवाना हों।`,
          departureNote: '03:00 PM तक निकलें और वाहन की गति नियंत्रित रखें।',
        },
        en: {
          headline: 'Strong winds (34 km/h) expected today. Secure grain load tightly.',
          cropAdvice: 'Tie tarpaulin with thick ropes on all sides to prevent grain loss in wind.',
          docAdvice: 'Keep slips secured inside zipped bag to prevent paper blow-away.',
          travelAdvice: 'Drive tractor-trolley at steady speed; be mindful of turns.',
          smartAdviceText: `Wind alert. Lash produce firmly and depart around 03:00 PM.`,
          departureNote: 'Depart by 03:00 PM and maintain safe driving speed.',
        },
        pa: {
          headline: 'ਅੱਜ 34 km/h ਦੀ ਰਫ਼ਤਾਰ ਨਾਲ ਤੇਜ਼ ਹਵਾ ਚੱਲਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।',
          cropAdvice: 'ਫਸਲ ਨੂੰ ਰੱਸਿਆਂ ਨਾਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਬੰਨ੍ਹੋ ਤਾਂ ਜੋ ਦਾਣੇ ਨਾ ਉੱਡਣ।',
          docAdvice: 'ਕਾਗਜ਼ਾਤ ਬੈਗ ਦੇ ਅੰਦਰ ਚੇਨ ਬੰਦ ਕਰਕੇ ਰੱਖੋ।',
          travelAdvice: 'ਟਰੈਕਟਰ-ਟਰਾਲੀ ਧੀਮੀ ਤੇ ਸਾਵਧਾਨੀ ਨਾਲ ਚਲਾਓ।',
          smartAdviceText: `ਤੇਜ਼ ਹਵਾ ਦਾ ਖ਼ਦਸ਼ਾ ਹੈ। ਫਸਲ ਚੰਗੀ ਤਰ੍ਹਾਂ ਬੰਨ੍ਹ ਕੇ 03:00 PM ਤੱਕ ਚੱਲੋ।`,
          departureNote: '03:00 PM ਤੱਕ ਰਵਾਨਾ ਹੋਵੋ।',
        },
        mr: {
          headline: 'आज ३४ किमी/तास वेगाने जोरदार वारे वाहण्याची शक्यता आहे.',
          cropAdvice: 'धान्य उडू नये म्हणून दोरीने ताडपत्री चारही बाजूंनी घट्ट बांधा.',
          docAdvice: 'कागदपत्रे पिशवीच्या आत बंद ठेवा.',
          travelAdvice: 'ट्रॅक्टर ट्रॉली सुरक्षित व नियंत्रित वेगाने चालवा.',
          smartAdviceText: `जोरदार वाऱ्याची शक्यता आहे. धान्य घट्ट बांधून दुपारी ०३:०० वाजता निघा.`,
          departureNote: 'दुपारी ०३:०० वाजता सावधपणे निघा.',
        },
        gu: {
          headline: 'આજે ૩૪ કિમી/કલાકની ઝડપે તેજ પવન ફૂંકાવાની સંભાવના છે.',
          cropAdvice: 'દાણા ઊડી ન જાય તે માટે પાકને દોરડા અને તાડપત્રીથી મજબૂત બાંધો.',
          docAdvice: 'દસ્તાવેજો બેગમાં સુરક્ષિત રાખો.',
          travelAdvice: 'ટ્રેક્ટર-ટ્રોલી નિયંત્રિત ઝડપે ચલાવો.',
          smartAdviceText: `તેજ પવનની શક્યતા છે. પાક બાંધી બપોરે ૦૩:૦૦ વાગ્યે નીકળો.`,
          departureNote: 'બપોરે ૦૩:૦૦ વાગ્યા સુધી નીકળવું.',
        },
        bn: {
          headline: 'আজ ৩৪ কিমি/ঘণ্টা বেগে দমকা বাতাস বইতে পারে।',
          cropAdvice: 'দানা উড়ে যাওয়া আটকাতে শস্যের ত্রিপল শক্ত দড়ি দিয়ে বেঁধে আনুন।',
          docAdvice: 'কাগজপত্র ব্যাগের ভিতরে চেইন বন্ধ করে রাখুন।',
          travelAdvice: 'ট্রাক্টর বা ট্রলি সাবধানে ও নিয়ন্ত্রিত গতিতে চালান।',
          smartAdviceText: `ঝড়ো বাতাসের সতর্কতা। ফসল শক্ত করে বেঁধে ০৩:০০ PM এ রওনা দিন।`,
          departureNote: '০৩:০০ PM এর মধ্যে রওনা দিন।',
        },
        te: {
          headline: 'ఈరోజు గంటకు 34 కి.మీ వేగంతో బలమైన గాలులు వీచే అవకాశం ఉంది.',
          cropAdvice: 'ధాన్యం గాలికి ఎగిరిపోకుండా టార్పాలిన్‌ను తాడులతో గట్టిగా కట్టండి.',
          docAdvice: 'పత్రాలు ఎగిరిపోకుండా బ్యాగ్ లోపల భద్రంగా ఉంచండి.',
          travelAdvice: 'ట్రాక్టర్/వాహనాన్ని నియంత్రిత వేగంతో జాగ్రత్తగా నడపండి.',
          smartAdviceText: `బలమైన గాలులు వీస్తున్నాయి. ధాన్యం గట్టిగా కట్టి 03:00 PM కు బయలుదేరండి.`,
          departureNote: '03:00 PM కు బయలుదేరండి.',
        },
        ta: {
          headline: 'இன்று மணிக்கு 34 கி.மீ வேகத்தில் பலத்த காற்று வீசக்கூடும்.',
          cropAdvice: 'தானியங்கள் காற்றில் பறக்காமல் இருக்க தார்ப்பாயை கயிறுகளால் இறுக்கமாக கட்டுங்கள்.',
          docAdvice: 'ஆவணங்கள் காற்றில் பறக்காமல் பைக்குள் பாதுகாப்பாக வையுங்கள்.',
          travelAdvice: 'வாகனத்தை மிதமான வேகத்தில் கவனமாக ஓட்டிச் செல்லுங்கள்.',
          smartAdviceText: `காற்று எச்சரிக்கை. தானியத்தை கட்டி 03:00 PM மணிக்கு புறப்படுங்கள்.`,
          departureNote: '03:00 PM மணிக்கு புறப்படுங்கள்.',
        },
        kn: {
          headline: 'ಇಂದು 34 ಕಿಮೀ/ಗಂಟೆ ವೇಗದಲ್ಲಿ ಬಲವಾದ ಗಾಳಿ ಬೀಸುವ ಸಾಧ್ಯತೆಯಿದೆ.',
          cropAdvice: 'ಧಾನ್ಯ ಹಾರಿಹೋಗದಂತೆ ಟಾರ್ಪಾಲಿನ್ ಅನ್ನು ಹಗ್ಗಗಳಿಂದ ಬಿಗಿಯಾಗಿ ಕಟ್ಟಿ.',
          docAdvice: 'ದಾಖಲೆಗಳು ಹಾರಿಹೋಗದಂತೆ ಬ್ಯಾಗ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿಡಿ.',
          travelAdvice: 'ವಾಹನವನ್ನು ನಿಧಾನವಾಗಿ, ಎಚ್ಚರಿಕೆಯಿಂದ ಚಲಾಯಿಸಿ.',
          smartAdviceText: `ಬಲವಾದ ಗಾಳಿಯ ಎಚ್ಚರಿಕೆ. ಧಾನ್ಯವನ್ನು ಕಟ್ಟಿ 03:00 PM ಗೆ ಹೊರಡಿ.`,
          departureNote: '03:00 PM ಗೆ ಹೊರಡಿ.',
        },
        ml: {
          headline: 'ഇന്ന് മണിക്കൂറിൽ 34 കി.മീ വേഗതയിൽ ശക്തമായ കാറ്റടിക്കാൻ സാധ്യതയുണ്ട്.',
          cropAdvice: 'വിളകൾ കാറ്റിൽ പറന്നുപോകാതിരിക്കാൻ കയർ ഉപയോഗിച്ച് ടാർപോളിൻ നന്നായി കെട്ടുക.',
          docAdvice: 'രേഖകൾ കാറ്റിൽ പറക്കാതെ ബാഗിൽ സുരക്ഷിതമാക്കുക.',
          travelAdvice: 'വാഹനം നിയന്ത്രിത വേഗതയിൽ സുരക്ഷിതമായി ഓടിക്കുക.',
          smartAdviceText: `ശക്തമായ കാറ്റുള്ളതിനാൽ 03:00 PM ന് പുറപ്പെടുക.`,
          departureNote: '03:00 PM ന് പുറപ്പെടുക.',
        },
        or: {
          headline: 'ଆଜି ୩୪ କିମି/ଘଣ୍ଟା ବେଗରେ ପ୍ରବଳ ପବନ ବହିବାର ସମ୍ଭାବନା ଅଛି।',
          cropAdvice: 'ଫସଲ ଉଡ଼ି ନଯିବାକୁ ଦଉଡ଼ି ଦେଇ ତାରପୋଲିନ୍ କୁ ଚାରିପାଖରୁ ଭଲ ଭାବେ ବାନ୍ଧନ୍ତୁ।',
          docAdvice: 'କାଗଜପତ୍ର ବ୍ୟାଗ୍ ଭିତରେ ଚେନ୍ ବନ୍ଦ କରି ରଖନ୍ତୁ।',
          travelAdvice: 'ଟ୍ରାକ୍ଟର ଟ୍ରଲି କୁ ନିୟନ୍ତ୍ରିତ ଗତିରେ ଚଲାନ୍ତୁ।',
          smartAdviceText: `ପବନର ସତର୍କତା। ଫସଲ ଭଲଭାବେ ବାନ୍ଧି ୦୩:୦୦ PM ରେ ବାହାରନ୍ତୁ।`,
          departureNote: '୦୩:୦୦ PM ସୁଦ୍ଧା ବାହାରନ୍ତୁ।',
        },
      },
    };

    const conditionData = ADVISORY_DATA[cond] || ADVISORY_DATA.rain;
    const localized = conditionData[lang] || conditionData.hi;
    const hindiData = conditionData.hi;
    const enData = conditionData.en;

    const severity: 'normal' | 'caution' | 'critical' = 
      cond === 'heavy_rain' ? 'critical' : (cond === 'rain' || cond === 'hot' || cond === 'windy' ? 'caution' : 'normal');

    const recommendedDepartureTime = 
      cond === 'heavy_rain' ? '02:45 PM' : (cond === 'hot' ? '03:10 PM' : (cond === 'clear' || cond === 'partly_cloudy' ? '03:05 PM' : '03:00 PM'));

    return {
      headline: localized.headline,
      cropAdvice: localized.cropAdvice,
      docAdvice: localized.docAdvice,
      travelAdvice: localized.travelAdvice,
      smartAdviceText: localized.smartAdviceText,
      departureNote: localized.departureNote,
      recommendedDepartureTime,
      severity,
      // Backward compatibility
      headlineHindi: hindiData.headline,
      headlineEn: enData.headline,
      cropAdviceHindi: hindiData.cropAdvice,
      cropAdviceEn: enData.cropAdvice,
      docAdviceHindi: hindiData.docAdvice,
      docAdviceEn: enData.docAdvice,
      travelAdviceHindi: hindiData.travelAdvice,
      travelAdviceEn: enData.travelAdvice,
      smartAdviceTextHindi: hindiData.smartAdviceText,
      smartAdviceTextEn: enData.smartAdviceText,
      departureNoteHindi: hindiData.departureNote,
      departureNoteEn: enData.departureNote,
    };
  }

  /**
   * Returns dynamic checklist items localized in the specified language.
   */
  public static getCarryItems(condition: WeatherConditionType, lang: LanguageCode = 'hi'): CarryItem[] {
    const ITEMS_DB: Record<string, {
      icon: string;
      isCrucial: boolean;
      text: Record<LanguageCode, string>;
    }> = {
      farmer_id: {
        icon: '🪪',
        isCrucial: true,
        text: {
          hi: 'किसान पहचान पत्र (Farmer ID / KCC)',
          en: 'Farmer ID / Kisan Credit Card',
          pa: 'ਕਿਸਾਨ ਸ਼ਨਾਖਤੀ ਕਾਰਡ (Farmer ID / KCC)',
          mr: 'शेतकरी ओळखपत्र (Farmer ID / KCC)',
          gu: 'ખેડૂત ઓળખપત્ર (Farmer ID / KCC)',
          bn: 'কৃষক পরিচয়পত্র (Farmer ID / KCC)',
          te: 'రైతు గుర్తింపు కార్డు (Farmer ID / KCC)',
          ta: 'உழவர் அடையாள அட்டை (Farmer ID / KCC)',
          kn: 'ರೈತ ಗುರುತಿನ ಚೀಟಿ (Farmer ID / KCC)',
          ml: 'കർഷക തിരിച്ചറിയൽ കാർഡ് (Farmer ID / KCC)',
          or: 'କୃଷକ ପରିଚୟ ପତ୍ର (Farmer ID / KCC)',
        }
      },
      bank_doc: {
        icon: '📄',
        isCrucial: true,
        text: {
          hi: 'आधार कार्ड एवं बैंक पासबुक की प्रति',
          en: 'Aadhaar Card & Bank Passbook Copy',
          pa: 'ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਬੈਂਕ ਪਾਸਬੁੱਕ ਕਾਪੀ',
          mr: 'आधार कार्ड आणि बँक पासबुक प्रत',
          gu: 'આધાર કાર્ડ અને બેંક પાસબુક નકલ',
          bn: 'আধার কার্ড ও ব্যাংক পাসবই কপি',
          te: 'ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ కాపీ',
          ta: 'ஆதார் அட்டை மற்றும் வங்கி புத்தக நகல்',
          kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
          ml: 'ആധാർ കാർഡും ബാങ്ക് പാസ്ബുക്ക് കോപ്പിയും',
          or: 'ଆଧାର କାର୍ଡ ଏବଂ ବ୍ୟାଙ୍କ ପାସବହି ନକଲ',
        }
      },
      phone: {
        icon: '📱',
        isCrucial: true,
        text: {
          hi: 'मोबाइल फोन (OTP एवं टोकन SMS हेतु)',
          en: 'Mobile Phone (for OTP & Token SMS)',
          pa: 'ਮੋਬਾਈਲ ਫੋਨ (OTP ਅਤੇ ਟੋਕਨ SMS ਲਈ)',
          mr: 'मोबाईल फोन (OTP व टोकन SMS साठी)',
          gu: 'મોબાઈલ ફોન (OTP અને ટોકન SMS માટે)',
          bn: 'মোবাইল ফোন (OTP এবং টোকেন SMS এর জন্য)',
          te: 'మొబైల్ ఫోన్ (OTP మరియు టోకెన్ SMS కొరకు)',
          ta: 'கைபேசி (OTP மற்றும் டோக்கன் SMS பெற)',
          kn: 'ಮೊಬೈಲ್ ಫೋನ್ (OTP ಮತ್ತು ಟೋಕನ್ SMS ಗಾಗಿ)',
          ml: 'മൊബൈൽ ഫോൺ (OTP, ടോക്കൺ SMS എന്നിവയ്ക്ക്)',
          or: 'ମୋବାଇଲ୍ ଫୋନ୍ (OTP ଏବଂ ଟୋକନ୍ SMS ପାଇଁ)',
        }
      },
      tarpaulin: {
        icon: '🛡️',
        isCrucial: true,
        text: {
          hi: 'वाटरप्रूफ तिरपाल (फसल ढकने एवं नमी से बचाव हेतु)',
          en: 'Waterproof Tarpaulin (to cover crop from moisture)',
          pa: 'ਵਾਟਰਪ੍ਰੂਫ਼ ਤਿਰਪਾਲ (ਫਸਲ ਢੱਕਣ ਅਤੇ ਨਮੀ ਤੋਂ ਬਚਾਅ ਲਈ)',
          mr: 'वॉटरप्रूफ ताडपत्री (धान्य झाकण्यासाठी व सुरक्षिततेसाठी)',
          gu: 'વોટરપ્રૂફ તાડપત્રી (પાક ઢાંકવા અને ભેજથી બચાવ માટે)',
          bn: 'ওয়াটারপ্রুফ ত্রিপল (ফসল ঢাকতে ও আর্দ্রতা প্রতিরোধে)',
          te: 'వాటర్‌ప్రూఫ్ టార్పాలిన్ (ధాన్యం కప్పడానికి)',
          ta: 'நீர்புகா தார்ப்பாய் (தானியங்களை மூட)',
          kn: 'ವಾಟರ್‌ಪ್ರೂಫ್ ಟಾರ್ಪಾಲಿನ್ (ಬೆಳೆ ಮುಚ್ಚಲು)',
          ml: 'വാട്ടർപ്രൂഫ് ടാർപോളിൻ (വിളകൾ മൂടാൻ)',
          or: 'ୱାଟରପ୍ରୁଫ୍ ତାରପୋଲିନ୍ (ଫସଲ ଘୋଡ଼ାଇବା ପାଇଁ)',
        }
      },
      doc_bag: {
        icon: '🧳',
        isCrucial: true,
        text: {
          hi: 'वाटरप्रूफ दस्तावेज़ बैग / जिपलॉक पाउच',
          en: 'Waterproof Document Bag / Zip-lock Pouch',
          pa: 'ਵਾਟਰਪ੍ਰੂਫ਼ ਕਾਗਜ਼ਾਤ ਬੈਗ / ਜ਼ਿਪਲੌਕ ਪਾਊਚ',
          mr: 'वॉटरप्रूफ कागदपत्रे पिशवी / झिपलॉक पाऊच',
          gu: 'વોટરપ્રૂફ દસ્તાવેજ બેગ / ઝિપલૉક પાઉચ',
          bn: 'ওয়াটারপ্রুফ নথি ব্যাগ / জিপলক পাউচ',
          te: 'వాటర్‌ప్రੂఫ్ డాక్యుమెంట్ బ్యాగ్ / జిప్‌లాక్ పౌచ్',
          ta: 'நீர்புகா ஆவணப் பை / ஜிப்லாக் பவுச்',
          kn: 'ವಾಟರ್‌ಪ್ರೂಫ್ ದಾಖಲೆ ಬ್ಯಾಗ್ / ಜಿಪ್‌ಲಾಕ್ ಪೌಚ್',
          ml: 'വാട്ടർപ്രൂഫ് ഡോക്യുമെന്റ് ബാഗ് / സിപ്പ് ലോക്ക്',
          or: 'ୱାଟରପ୍ରୁଫ୍ ଦସ୍ତାବିଜ୍ ବ୍ୟାଗ୍ / ଜିପଲକ୍ ପାଉଚ୍',
        }
      },
      umbrella: {
        icon: '☂️',
        isCrucial: false,
        text: {
          hi: 'छाता या बरसाती (व्यक्तिगत सुरक्षा हेतु)',
          en: 'Umbrella / Raincoat (personal protection)',
          pa: 'ਛੱਤਰੀ ਜਾਂ ਬਰਸਾਤੀ (ਨਿੱਜੀ ਸੁਰੱਖਿਆ ਲਈ)',
          mr: 'छत्री किंवा रेनकोट (स्वतःच्या संरक्षणासाठी)',
          gu: 'છત્રી અથવા રેઈનકોટ (વ્યક્તિગત રક્ષણ માટે)',
          bn: 'ছাতা বা রেইনকোট (ব্যক্তিগত সুরক্ষার জন্য)',
          te: 'గొడుగు లేదా రెయిన్‌కోట్ (రక్షణ కొరకు)',
          ta: 'குடை அல்லது மழைக்கோட்',
          kn: 'ಛತ್ರಿ ಅಥವಾ ಮಳೆಕೋಟ್',
          ml: 'കുട അല്ലെങ്കിൽ റെയിൻകോട്ട്',
          or: 'ଛତା ବା ରେନକୋଟ୍ (ନିଜ ସୁରକ୍ଷା ପାଇଁ)',
        }
      },
      rope: {
        icon: '🪢',
        isCrucial: true,
        text: {
          hi: 'तिरपाल बांधने हेतु मजबूत रस्सियां',
          en: 'Strong binding ropes for tarpaulin',
          pa: 'ਤਿਰਪਾਲ ਬੰਨ੍ਹਣ ਲਈ ਮਜ਼ਬੂਤ ਰੱਸੇ',
          mr: 'ताडपत्री बांधण्यासाठी मजबूत दोऱ्या',
          gu: 'તાડપત્રી બાંધવા માટે મજબૂત દોરડા',
          bn: 'ত্রিপল বাঁধার শক্ত দড়ি',
          te: 'టార్పాలిన్ కట్టడానికి బలమైన తాళ్లు',
          ta: 'தார்ப்பாய் கட்ட உறுதியான கயிறுகள்',
          kn: 'ಟಾರ್ಪಾಲಿನ್ ಕಟ್ಟಲು ಗಟ್ಟಿಮುಟ್ಟಾದ ಹಗ್ಗಗಳು',
          ml: 'ടാർപോളിൻ കെട്ടാനുള്ള ബലമുള്ള കയർ',
          or: 'ତାରପୋଲିନ୍ ବାନ୍ଧିବା ପାଇଁ ଶକ୍ତ ଦଉଡ଼ି',
        }
      },
      water: {
        icon: '💧',
        isCrucial: true,
        text: {
          hi: 'पीने का स्वच्छ पानी (2-3 लीटर बोतल)',
          en: 'Clean Drinking Water (2-3 Litres)',
          pa: 'ਪੀਣ ਵਾਲਾ ਸਾਫ਼ ਪਾਣੀ (2-3 ਲੀਟਰ ਬੋਤਲ)',
          mr: 'पिण्याचे स्वच्छ पाणी (२-३ लिटर बाटली)',
          gu: 'પીવાનું ચોખ્ખું પાણી (૨-૩ લીટર બોટલ)',
          bn: 'বিশুদ্ধ পানীয় জল (২-৩ লিটার বোতল)',
          te: 'త్రాగునీరు (2-3 లీటర్ల బాటిల్)',
          ta: 'குடிநீர் (2-3 லிட்டர் பாட்டில்)',
          kn: 'ಕುಡಿಯುವ ಶುದ್ಧ ನೀರು (2-3 ಲೀಟರ್)',
          ml: 'ശുദ്ധമായ കുടിവെള്ളം (2-3 ലിറ്റർ)',
          or: 'ପିଇବା ପାଣି (୨-୩ ଲିଟର ବୋତଲ)',
        }
      },
      cloth: {
        icon: '🧢',
        isCrucial: true,
        text: {
          hi: 'गमछा / टोपी (धूप से सिर ढकने हेतु)',
          en: 'Cotton Towel / Cap for Sun Protection',
          pa: 'ਪਰਨਾ / ਟੋਪੀ (ਧੁੱਪ ਤੋਂ ਸਿਰ ਢੱਕਣ ਲਈ)',
          mr: 'रुमाल / टोपी (उन्हापासून संरक्षणासाठी)',
          gu: 'રૂમાલ / ટોપી (તડકાથી રક્ષણ માટે)',
          bn: 'গামছা / টুপি (রোদ থেকে বাঁচার জন্য)',
          te: 'రుమాలు / టోపీ (ఎండ నుండి రక్షణ కొరకు)',
          ta: 'துண்டு / தொப்பி (வெயில் பாதுகாப்புக்கு)',
          kn: 'ಟವೆಲ್ / ಟೋಪಿ (ಬಿಸಿಲಿನಿಂದ ರಕ್ಷಣೆಗೆ)',
          ml: 'തോർത്ത് / തൊപ്പി (വെയിൽ ഏൽക്കാതിരിക്കാൻ)',
          or: 'ଗାମୁଛା / ଟୋପି (ଖରାରୁ ମୁଣ୍ଡ ଘୋଡ଼ାଇବା ପାଇଁ)',
        }
      },
    };

    let itemKeys: string[] = ['farmer_id', 'bank_doc', 'phone'];

    if (condition === 'rain' || condition === 'heavy_rain') {
      itemKeys = [...itemKeys, 'tarpaulin', 'doc_bag', 'umbrella', 'rope'];
    } else if (condition === 'hot') {
      itemKeys = [...itemKeys, 'water', 'cloth', 'tarpaulin'];
    } else if (condition === 'windy') {
      itemKeys = [...itemKeys, 'rope', 'tarpaulin'];
    } else {
      itemKeys = [...itemKeys, 'tarpaulin', 'water'];
    }

    return itemKeys.map(key => {
      const item = ITEMS_DB[key];
      return {
        id: key,
        text: item.text[lang] || item.text.hi,
        textHindi: item.text.hi,
        textEn: item.text.en,
        icon: item.icon,
        isCrucial: item.isCrucial,
      };
    });
  }

  /**
   * Returns 5-Day Simple Forecast localized in the selected language.
   */
  public static get5DayForecast(lang: LanguageCode = 'hi'): DailyForecast[] {
    const DAY_NAMES: Record<LanguageCode, string[]> = {
      hi: ['आज (Today)', 'कल (Tomorrow)', 'शनिवार', 'रविवार', 'सोमवार'],
      en: ['Today', 'Tomorrow', 'Saturday', 'Sunday', 'Monday'],
      pa: ['ਅੱਜ', 'ਭਲਕੇ (ਕੱਲ੍ਹ)', 'ਸ਼ਨੀਵਾਰ', 'ਐਤਵਾਰ', 'ਸੋਮਵਾਰ'],
      mr: ['आज', 'उद्या', 'शनिवार', 'रविवार', 'सोमवार'],
      gu: ['આજે', 'આવતીકાલે', 'શનિવાર', 'રવિવાર', 'સોમવાર'],
      bn: ['আজ', 'আগামীকাল', 'শনিবার', 'রবিবার', 'সোমবার'],
      te: ['ఈరోజు', 'రేపు', 'శనివారం', 'ఆదివారం', 'సోమవారం'],
      ta: ['இன்று', 'நாளை', 'சனிக்கிழமை', 'ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை'],
      kn: ['ಇಂದು', 'ನಾಳೆ', 'ಶನಿವಾರ', 'ಭಾನುವಾರ', 'ಸೋಮವಾರ'],
      ml: ['ഇന്ന്', 'നാളെ', 'ശനിയാഴ്ച', 'ഞായറാഴ്ച', 'തിങ്കളാഴ്ച'],
      or: ['ଆଜି', 'ଆସନ୍ତାକାଲି', 'ଶନିବାର', 'ରବିବାର', 'ସୋମବାର'],
    };

    const COND_LABELS: Record<WeatherConditionType, Record<LanguageCode, string>> = {
      rain: {
        hi: 'बारिश की संभावना', en: 'Rain Expected', pa: 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ', mr: 'पावसाची शक्यता',
        gu: 'વરસાદની સંભાવના', bn: 'বৃষ্টির সম্ভাবনা', te: 'వర్ష సూచన', ta: 'மழை வாய்ப்பு',
        kn: 'ಮಳೆಯ ಸಾಧ್ಯತೆ', ml: 'മഴ സാധ്യത', or: 'ବର୍ଷା ସମ୍ଭାବନା'
      },
      heavy_rain: {
        hi: 'भारी बारिश', en: 'Heavy Rain', pa: 'ਭਾਰੀ ਮੀਂਹ', mr: 'मुसळधार पाऊस',
        gu: 'ભારે વરસાદ', bn: 'ভারী বৃষ্টি', te: 'భారీ వర్షం', ta: 'கனமழை',
        kn: 'ಭಾರಿ ಮಳೆ', ml: 'ശക്തമായ മഴ', or: 'ପ୍ରବଳ ବର୍ଷା'
      },
      clear: {
        hi: 'धूप व साफ मौसम', en: 'Sunny & Clear', pa: 'ਸਾਫ਼ ਤੇ ਧੁੱਪ', mr: 'स्वच्छ व निरभ्र',
        gu: 'સાફ અને તડકો', bn: 'রৌদ্রোজ্জ্বল ও পরিষ্কার', te: 'ఎండ మరియు స్పష్టం', ta: 'வெயில் & தெளிவானது',
        kn: 'ಬಿಸಿಲು ಮತ್ತು ಸ್ವಚ್ಛ', ml: 'തെളിഞ്ഞ കാലാവസ്ഥ', or: 'ଖରାଟିଆ ଓ ପରିଷ୍କାର'
      },
      partly_cloudy: {
        hi: 'हल्के बादल', en: 'Partly Cloudy', pa: 'ਹਲਕੇ ਬੱਦਲ', mr: 'अंशतः ढगाळ',
        gu: 'હળવા વાદળો', bn: 'হালকা মেঘলা', te: 'తేలికపాటి మేఘాలు', ta: 'லேசான மேகம்',
        kn: 'ಭಾಗಶಃ ಮೋಡ', ml: 'ഭാഗിക മേഘാവൃതം', or: 'ହାଲୁକା ମେଘୁଆ'
      },
      hot: {
        hi: 'तेज धूप व गर्मी', en: 'High Heat', pa: 'ਗਰਮ ਮੌਸਮ', mr: 'उष्ण हवामान',
        gu: 'ગરમ હવામાન', bn: 'প্রচণ্ড গরম', te: 'ఎండ వేడి', ta: 'அதிக வெப்பம்',
        kn: 'ಅತಿಯಾದ ಬಿಸಿಲು', ml: 'കടുത്ത ചൂട്', or: 'ଟାଣ ଖରା'
      },
      windy: {
        hi: 'तेज हवा', en: 'Breezy / Windy', pa: 'ਤੇਜ਼ ਹਵਾ', mr: 'जोरदार वारा',
        gu: 'તેજ પવન', bn: 'দমকা বাতাস', te: 'బలమైన గాలులు', ta: 'பலத்த காற்று',
        kn: 'ಬಲವಾದ ಗಾಳಿ', ml: 'ശക്തമായ കാറ്റ്', or: 'ପ୍ରବଳ ପବନ'
      },
    };

    const days = DAY_NAMES[lang] || DAY_NAMES.hi;

    return [
      {
        dayName: days[0],
        dayNameHindi: DAY_NAMES.hi[0],
        dayNameEn: DAY_NAMES.en[0],
        dateStr: '27 Aug',
        tempC: 28,
        condition: 'rain',
        conditionLabel: COND_LABELS.rain[lang] || 'Rain Expected',
        conditionLabelHindi: COND_LABELS.rain.hi,
        conditionEmoji: '🌧️',
        rainProbabilityPercent: 70,
      },
      {
        dayName: days[1],
        dayNameHindi: DAY_NAMES.hi[1],
        dayNameEn: DAY_NAMES.en[1],
        dateStr: '28 Aug',
        tempC: 30,
        condition: 'clear',
        conditionLabel: COND_LABELS.clear[lang] || 'Clear Skies',
        conditionLabelHindi: COND_LABELS.clear.hi,
        conditionEmoji: '☀️',
        rainProbabilityPercent: 20,
      },
      {
        dayName: days[2],
        dayNameHindi: DAY_NAMES.hi[2],
        dayNameEn: DAY_NAMES.en[2],
        dateStr: '29 Aug',
        tempC: 29,
        condition: 'partly_cloudy',
        conditionLabel: COND_LABELS.partly_cloudy[lang] || 'Partly Cloudy',
        conditionLabelHindi: COND_LABELS.partly_cloudy.hi,
        conditionEmoji: '⛅',
        rainProbabilityPercent: 40,
      },
      {
        dayName: days[3],
        dayNameHindi: DAY_NAMES.hi[3],
        dayNameEn: DAY_NAMES.en[3],
        dateStr: '30 Aug',
        tempC: 27,
        condition: 'rain',
        conditionLabel: COND_LABELS.rain[lang] || 'Rain Expected',
        conditionLabelHindi: COND_LABELS.rain.hi,
        conditionEmoji: '🌧️',
        rainProbabilityPercent: 65,
      },
      {
        dayName: days[4],
        dayNameHindi: DAY_NAMES.hi[4],
        dayNameEn: DAY_NAMES.en[4],
        dateStr: '31 Aug',
        tempC: 31,
        condition: 'clear',
        conditionLabel: COND_LABELS.clear[lang] || 'Clear Skies',
        conditionLabelHindi: COND_LABELS.clear.hi,
        conditionEmoji: '☀️',
        rainProbabilityPercent: 15,
      },
    ];
  }

  /**
   * Returns localized Weather & Procurement Alerts.
   */
  public static getWeatherAlerts(weather: WeatherData, slotTime: string = '03:30 PM', lang: LanguageCode = 'hi'): WeatherAlert[] {
    const alerts: WeatherAlert[] = [
      {
        id: 'w-alert-1',
        type: 'rain_alert',
        title: lang === 'hi' ? '🌧️ बारिश की संभावना अलर्ट' : (lang === 'en' ? 'Rain Probability Alert' : '🌧️ ਮੌਸਮ ਅਲਰਟ / Weather Alert'),
        titleHindi: '🌧️ बारिश की संभावना अलर्ट',
        titleEn: 'Rain Probability Alert',
        message: lang === 'hi' 
          ? 'आज दोपहर बाद आपके खरीद केंद्र क्षेत्र में 70% बारिश की संभावना है।'
          : (lang === 'en' ? '70% probability of rain in your procurement center zone this afternoon.' : 'ਅੱਜ ਖਰੀਦ ਕੇਂਦਰ ਦੇ ਆਸ-ਪਾਸ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਫਸਲ ਨੂੰ ਤਿਰਪਾਲ ਨਾਲ ਢੱਕੋ।'),
        messageHindi: 'आज दोपहर बाद आपके खरीद केंद्र क्षेत्र में 70% बारिश की संभावना है।',
        messageEn: '70% probability of rain in your procurement center zone this afternoon.',
        urgency: 'warning',
        time: '12:30 PM',
        iconEmoji: '🌧️',
      },
      {
        id: 'w-alert-2',
        type: 'procurement_alert',
        title: lang === 'hi' ? '🎫 खरीद स्लॉट समय पुष्टि' : (lang === 'en' ? 'Procurement Slot Confirmation' : '🎫 ਸਲਾਟ ਪੁਸ਼ਟੀ / Slot Confirmation'),
        titleHindi: '🎫 खरीद स्लॉट समय',
        titleEn: 'Procurement Slot Confirmation',
        message: lang === 'hi'
          ? `आपकी खरीद स्लॉट ${slotTime} की है। केंद्र पर तौल कांटा सक्रिय है।`
          : (lang === 'en' ? `Your procurement slot is scheduled for ${slotTime}. Procurement yard is active.` : `ਤੁਹਾਡਾ ਸਲਾਟ ${slotTime} ਦਾ ਹੈ। ਕੇਂਦਰ ਤੇ ਕੰਪਿਊਟਰ ਕੰਡਾ ਚਾਲੂ ਹੈ।`),
        messageHindi: `आपकी खरीद स्लॉट ${slotTime} की है। रामपुर केंद्र पर तौल कांटा सक्रिय है।`,
        messageEn: `Your procurement slot is scheduled for ${slotTime}. Rampur yard is fully operational.`,
        urgency: 'info',
        time: '01:00 PM',
        iconEmoji: '🎫',
      },
      {
        id: 'w-alert-3',
        type: 'prep_alert',
        title: lang === 'hi' ? '🧳 तैयारी और सुरक्षा सलाह' : (lang === 'en' ? 'Preparation & Safety Advisory' : '🧳 ਤਿਆਰੀ ਸਲਾਹ / Safety Advisory'),
        titleHindi: '🧳 तैयारी और सुरक्षा सलाह',
        titleEn: 'Preparation & Safety Advisory',
        message: lang === 'hi'
          ? 'फसल को वाटरप्रूफ तिरपाल से ढककर लाएं और कागजात वाटरप्रूफ पाउच में रखें।'
          : (lang === 'en' ? 'Cover crops with waterproof tarpaulin and keep identity slips in sealed pouches.' : 'ਫਸਲ ਨੂੰ ਵਾਟਰਪ੍ਰੂਫ਼ ਤਿਰਪਾਲ ਨਾਲ ਢੱਕੋ ਅਤੇ ਕਾਗਜ਼ਾਤ ਸੁਰੱਖਿਅਤ ਰੱਖੋ।'),
        messageHindi: 'फसल को वाटरप्रूफ तिरपाल से ढककर लाएं और कागजात वाटरप्रूफ पाउच में रखें।',
        messageEn: 'Cover crops with waterproof tarpaulin and keep identity slips in sealed pouches.',
        urgency: 'warning',
        time: '01:15 PM',
        iconEmoji: '🧳',
      },
    ];

    return alerts;
  }

  /**
   * Generates natural voice assistant speech in all 11 Indian regional languages!
   */
  public static getVoiceSummary(weather: WeatherData, advisory: FarmerAdvisory, lang: LanguageCode = 'hi'): string {
    switch (lang) {
      case 'hi':
        return `नमस्ते किसान भाई! आपके इलाके ${weather.locationName} में आज ${weather.temperatureC} डिग्री तापमान है और बारिश की ${weather.rainProbabilityPercent} प्रतिशत संभावना है। ${advisory.headline} सलाह है कि ${advisory.cropAdvice} आप ${advisory.recommendedDepartureTime} तक खरीद केंद्र के लिए रवाना हों।`;

      case 'en':
        return `Namaste Farmer Friend! In ${weather.locationName}, the current temperature is ${weather.temperatureC} degrees Celsius with a ${weather.rainProbabilityPercent} percent rain probability. ${advisory.headline} We advise you to ${advisory.cropAdvice} and depart by ${advisory.recommendedDepartureTime}.`;

      case 'pa':
        return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰ ਜੀ! ਤੁਹਾਡੇ ਇਲਾਕੇ ${weather.locationName} ਵਿੱਚ ਅੱਜ ਤਾਪਮਾਨ ${weather.temperatureC} ਡਿਗਰੀ ਹੈ ਅਤੇ ਮੀਂਹ ਦੀ ${weather.rainProbabilityPercent} ਪ੍ਰਤੀਸ਼ਤ ਸੰਭਾਵਨਾ ਹੈ। ${advisory.headline} ${advisory.cropAdvice} ਤੁਸੀਂ ${advisory.recommendedDepartureTime} ਤੱਕ ਮੰਡੀ ਲਈ ਰਵਾਨਾ ਹੋਵੋ।`;

      case 'mr':
        return `नमस्कार शेतकरी बंधू! आपल्या ${weather.locationName} परिसरात आज तापमान ${weather.temperatureC} अंश आहे आणि पावसाची ${weather.rainProbabilityPercent} टक्के शक्यता आहे. ${advisory.headline} ${advisory.cropAdvice} आपण दुपारी ${advisory.recommendedDepartureTime} पर्यंत केंद्रासाठी निघावे.`;

      case 'gu':
        return `નમસ્તે ખેડૂત મિત્ર! તમારા વિસ્તાર ${weather.locationName} માં આજે ${weather.temperatureC} ડિગ્રી તાપમાન છે અને વરસાદની ${weather.rainProbabilityPercent} ટકા સંભાવના છે. ${advisory.headline} ${advisory.cropAdvice} તમે બપોરે ${advisory.recommendedDepartureTime} વાગ્યા સુધી કેન્દ્ર જવા નીકળો.`;

      case 'bn':
        return `নমস্কার কৃষক ভাই! আপনার এলাকা ${weather.locationName} এ আজকের তাপমাত্রা ${weather.temperatureC} ডিগ্রি এবং বৃষ্টির সম্ভাবনা ${weather.rainProbabilityPercent} শতাংশ। ${advisory.headline} পরামর্শ হলো ${advisory.cropAdvice} আপনি ${advisory.recommendedDepartureTime} এর মধ্যে কেন্দ্রের উদ্দেশ্যে রওনা দিন।`;

      case 'te':
        return `నమస్కారం రైతు సోదరా! మీ ప్రాంతం ${weather.locationName} లో నేడు ${weather.temperatureC} డిగ్రీల ఉష్ణోగ్రత మరియు ${weather.rainProbabilityPercent} శాతం వర్ష సూచన ఉంది. ${advisory.headline} ${advisory.cropAdvice} మీరు ${advisory.recommendedDepartureTime} కల్లా సేకరణ కేంద్రానికి బయలుదేరండి.`;

      case 'ta':
        return `வணக்கம் உழவர் தோழரே! உங்கள் பகுதி ${weather.locationName} இல் இன்று வெப்பநிலை ${weather.temperatureC} டிகிரி மற்றும் மழை வாய்ப்பு ${weather.rainProbabilityPercent} சதவீதம். ${advisory.headline} ${advisory.cropAdvice} நீங்கள் ${advisory.recommendedDepartureTime} மணிக்கு கொள்முதல் மையத்திற்கு புறப்படுங்கள்.`;

      case 'kn':
        return `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಿಮ್ಮ ಪ್ರದೇಶ ${weather.locationName} ದಲ್ಲಿ ಇಂದು ತಾಪಮಾನ ${weather.temperatureC} ಡಿಗ್ರಿ ಮತ್ತು ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ${weather.rainProbabilityPercent} ಪ್ರತಿಶತ ಇದೆ. ${advisory.headline} ${advisory.cropAdvice} ನೀವು ${advisory.recommendedDepartureTime} ಗೆ ಮಂಡಿಗೆ ಹೊರಡಿ.`;

      case 'ml':
        return `നമസ്കാരം കർഷക സുഹൃത്തേ! നിങ്ങളുടെ പ്രദേശം ${weather.locationName} ൽ ഇന്നത്തെ താപനില ${weather.temperatureC} ഡിഗ്രിയും മഴ സാധ്യത ${weather.rainProbabilityPercent} ശതമാനവുമാണ്. ${advisory.headline} ${advisory.cropAdvice} ${advisory.recommendedDepartureTime} ന് സംഭരണ കേന്ദ്രത്തിലേക്ക് പുറപ്പെടുക.`;

      case 'or':
        return `ନମସ୍କାର ଚାଷୀ ଭାଇ! ଆପଣଙ୍କ ଅଞ୍ଚଳ ${weather.locationName} ରେ ଆଜି ତାପମାତ୍ରା ${weather.temperatureC} ଡିଗ୍ରୀ ଏବଂ ବର୍ଷା ସମ୍ଭାବନା ${weather.rainProbabilityPercent} ପ୍ରତିଶତ ଅଛି। ${advisory.headline} ${advisory.cropAdvice} ଆପଣ ${advisory.recommendedDepartureTime} ସୁଦ୍ଧା କ୍ରୟ କେନ୍ଦ୍ରକୁ ବାହାରନ୍ତୁ।`;

      default:
        return `नमस्ते किसान भाई! आपके इलाके ${weather.locationName} में आज ${weather.temperatureC} डिग्री तापमान है। ${advisory.headline}`;
    }
  }
}
