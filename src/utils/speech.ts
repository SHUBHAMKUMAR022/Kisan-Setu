/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Indian Female AI Voice Synthesis & Speech Recognition Utility
 * Provides natural Indian Girl / Female voice output for all 11 regional Indian languages:
 * Hindi (hi), English (en-IN), Punjabi (pa), Marathi (mr), Gujarati (gu),
 * Bengali (bn), Telugu (te), Tamil (ta), Kannada (kn), Malayalam (ml), Odia (or)
 */

import { LanguageCode } from '../types';

export const LANG_LOCALE_MAP: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  en: 'en-IN',
  pa: 'pa-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  or: 'or-IN',
};

// Priority keywords for Indian Female / Girl Voices across Google, Microsoft, Apple, Samsung & Android TTS
const FEMALE_VOICE_KEYWORDS = [
  'female',
  'woman',
  'girl',
  'neerja',
  'swara',
  'heera',
  'kavya',
  'veena',
  'priya',
  'ananya',
  'kalpana',
  'dhwani',
  'aarohi',
  'tanisha',
  'shruti',
  'pallavi',
  'sapna',
  'sobhana',
  'lekha',
  'sunita',
  'geeta',
  'zira',
  'aditi',
  'raveena',
  'sangeeta',
  'prerana',
  'manisha',
  'pooja',
  'natasha',
  'google हिन्दी',
  'google english (india)',
  'google'
];

let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch {
      // ignore
    }
  };

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

/**
 * Finds the most natural Indian Female / Girl voice for a given language.
 */
export function getIndianFemaleVoice(lang: LanguageCode = 'hi'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  if (!cachedVoices || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  const targetLocale = LANG_LOCALE_MAP[lang] || 'hi-IN';
  const langPrefix = targetLocale.split('-')[0].toLowerCase();

  // 1. First priority: Exact language match + Indian Female indicator
  const exactFemaleVoice = cachedVoices.find((v) => {
    const vLang = v.lang.toLowerCase();
    const vName = v.name.toLowerCase();
    const isLangMatch = vLang.startsWith(langPrefix) || vLang.includes(langPrefix);
    const isFemale = FEMALE_VOICE_KEYWORDS.some(kw => vName.includes(kw));
    return isLangMatch && isFemale;
  });
  if (exactFemaleVoice) return exactFemaleVoice;

  // 2. Second priority: Any voice matching target Indian language (e.g. pa-IN, mr-IN, gu-IN, etc.)
  const anyRegionalVoice = cachedVoices.find((v) => {
    const vLang = v.lang.toLowerCase();
    return vLang.startsWith(langPrefix) || vLang.includes(langPrefix);
  });
  if (anyRegionalVoice) return anyRegionalVoice;

  // 3. Third priority: Any Indian Female voice (hi-IN / en-IN female) to maintain Indian girl tone
  const anyIndianFemaleVoice = cachedVoices.find((v) => {
    const vLang = v.lang.toLowerCase();
    const vName = v.name.toLowerCase();
    const isIndia = vLang.includes('in') || vLang.includes('hi') || vLang.includes('en');
    const isFemale = FEMALE_VOICE_KEYWORDS.some(kw => vName.includes(kw));
    return isIndia && isFemale;
  });
  if (anyIndianFemaleVoice) return anyIndianFemaleVoice;

  // 4. Fourth priority: Default to first voice with 'IN' locale
  const anyIndianVoice = cachedVoices.find(v => v.lang.toLowerCase().includes('in'));
  if (anyIndianVoice) return anyIndianVoice;

  return cachedVoices[0] || null;
}

/**
 * Plays a pleasant, subtle 2-tone melodic harmonic chime using Web Audio API
 * to announce AI Didi / Indian Female voice response.
 */
export function playFemaleAssistantChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15); // E6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1320, now + 0.08);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.08);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  } catch {
    // ignore audio context restrictions
  }
}

/**
 * Synthesizes text to speech with Indian Female / Girl Voice tuning
 * for all 11 regional Indian languages.
 */
export function speakText(
  text: string, 
  lang: LanguageCode = 'hi', 
  onEnd?: () => void,
  playChime: boolean = false
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown, asterisks, formatting tags, extra punctuation for smooth natural voice
  const cleanText = text
    .replace(/[*_#`~[\]()]/g, '')
    .replace(/[•●▪]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  if (playChime) {
    playFemaleAssistantChime();
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const targetLocale = LANG_LOCALE_MAP[lang] || 'hi-IN';
  utterance.lang = targetLocale;

  // Indian Girl / Female Voice Tuning:
  // Pitch = 1.20 - 1.25 gives a clear, warm, sweet Indian female voice
  // Rate = 0.92 gives optimal listening comprehension for rural Indian farmers
  utterance.pitch = 1.22;
  utterance.rate = 0.92;
  utterance.volume = 1.0;

  const femaleVoice = getIndianFemaleVoice(lang);
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stops any active speech synthesis output.
 */
export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
