import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LanguageCode, 
  FarmerProfile, 
  ProcurementCenter, 
  ActiveBooking, 
  ActiveProcurementDetail, 
  PaymentRecord, 
  HistoricalYieldRecord, 
  NotificationItem,
  ProcurementStageId
} from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  INITIAL_FARMER, 
  INITIAL_CENTERS, 
  INITIAL_BOOKING, 
  INITIAL_PROCUREMENT_DETAIL, 
  INITIAL_PAYMENT, 
  INITIAL_HISTORICAL_YIELDS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { speakText, stopSpeaking } from '../utils/speech';
import confetti from 'canvas-confetti';

export type NavigationTab = 
  | 'dashboard'
  | 'weather'
  | 'centers'
  | 'booking'
  | 'queue'
  | 'procurement'
  | 'payment'
  | 'yield'
  | 'notifications'
  | 'history'
  | 'profile'
  | 'help';

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  speak: (text: string) => void;
  stopSpeakingVoice: () => void;
  
  farmer: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  
  centers: ProcurementCenter[];
  activeBooking: ActiveBooking;
  setActiveBooking: React.Dispatch<React.SetStateAction<ActiveBooking>>;
  
  procurementDetail: ActiveProcurementDetail;
  setProcurementDetail: React.Dispatch<React.SetStateAction<ActiveProcurementDetail>>;
  
  payment: PaymentRecord;
  setPayment: React.Dispatch<React.SetStateAction<PaymentRecord>>;
  
  historicalYields: HistoricalYieldRecord[];
  
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
  
  isSimpleMode: boolean;
  setIsSimpleMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSimpleMode: () => void;
  
  isOffline: boolean;
  setIsOffline: React.Dispatch<React.SetStateAction<boolean>>;
  lastSyncTime: string;
  
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  
  isAuthenticated: boolean;
  login: (mobile: string) => boolean;
  register: (farmerData: Partial<FarmerProfile>) => void;
  logout: () => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isBiometricModalOpen: boolean;
  setIsBiometricModalOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  isCropScanModalOpen: boolean;
  setIsCropScanModalOpen: (open: boolean) => void;
  isPreArrivalModalOpen: boolean;
  setIsPreArrivalModalOpen: (open: boolean) => void;
  isAlternativeModalOpen: boolean;
  setIsAlternativeModalOpen: (open: boolean) => void;
  weatherState: 'clear' | 'rain_alert';
  setWeatherState: (state: 'clear' | 'rain_alert') => void;
  centerAlertActive: boolean;
  setCenterAlertActive: (active: boolean) => void;
  
  // SIH Demo Simulation Actions
  simulateAdvanceQueue: () => void;
  simulateAdvanceStage: () => void;
  simulatePaymentCredit: () => void;
  bookNewSlot: (centerId: string, crop: string, quantity: number, date: string, timeSlot: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kisan_lang');
      if (saved) return saved as LanguageCode;
    }
    return 'hi';
  });

  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kisan_simple_mode') === 'true';
    }
    return false;
  });

  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kisan_farmer');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_FARMER;
  });

  const [centers, setCenters] = useState<ProcurementCenter[]>(INITIAL_CENTERS);
  const [activeBooking, setActiveBooking] = useState<ActiveBooking>(INITIAL_BOOKING);
  const [procurementDetail, setProcurementDetail] = useState<ActiveProcurementDetail>(INITIAL_PROCUREMENT_DETAIL);
  const [payment, setPayment] = useState<PaymentRecord>(INITIAL_PAYMENT);
  const [historicalYields] = useState<HistoricalYieldRecord[]>(INITIAL_HISTORICAL_YIELDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('2 min ago');
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [isCropScanModalOpen, setIsCropScanModalOpen] = useState<boolean>(false);
  const [isPreArrivalModalOpen, setIsPreArrivalModalOpen] = useState<boolean>(false);
  const [isAlternativeModalOpen, setIsAlternativeModalOpen] = useState<boolean>(false);
  const [weatherState, setWeatherState] = useState<'clear' | 'rain_alert'>('rain_alert');
  const [centerAlertActive, setCenterAlertActive] = useState<boolean>(false);

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_lang', lang);
    }
  };

  const toggleSimpleMode = () => {
    setIsSimpleMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kisan_simple_mode', String(next));
      }
      return next;
    });
  };

  const t = (key: string, fallback?: string): string => {
    return getTranslation(language, key, fallback);
  };

  const speak = (text: string) => {
    speakText(text, language);
  };

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmer(prev => {
      const next = { ...prev, ...updated };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kisan_farmer', JSON.stringify(next));
      }
      return next;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const login = (_mobile: string) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (farmerData: Partial<FarmerProfile>) => {
    const newProfile: FarmerProfile = {
      ...INITIAL_FARMER,
      ...farmerData,
      id: `FARM-${Math.floor(10000 + Math.random() * 90000)}`,
      farmerId: `UP-KMY-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setFarmer(newProfile);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_farmer', JSON.stringify(newProfile));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Demo queue progression
  const simulateAdvanceQueue = () => {
    setActiveBooking(prev => {
      let nextAhead = prev.farmersAhead;
      let nextServing = prev.currentServingToken;
      let nextWait = prev.estimatedWaitMinutes;
      let advice: ActiveBooking['arrivalAdvice'] = prev.arrivalAdvice;

      if (nextAhead > 15) {
        nextAhead = 12;
        nextServing = 'A-115';
        nextWait = 24;
        advice = 'start_preparing';
      } else if (nextAhead > 8) {
        nextAhead = 5;
        nextServing = 'A-122';
        nextWait = 10;
        advice = 'reach_now';
      } else if (nextAhead > 2) {
        nextAhead = 1;
        nextServing = 'A-126';
        nextWait = 3;
        advice = 'reach_now';
      } else if (nextAhead > 0) {
        nextAhead = 0;
        nextServing = 'A-127';
        nextWait = 0;
        advice = 'your_turn';
        // Trigger celebratory audio and notification
        speak(language === 'hi' 
          ? 'टोकन A-127 आपकी बारी आ गई है। कृपया तुरंत काउंटर 2 पर जाएं।' 
          : 'Token A-127, it is your turn! Please proceed to Counter 2.');
      } else {
        // Reset to initial for repeated demo
        nextAhead = 18;
        nextServing = 'A-109';
        nextWait = 35;
        advice = 'start_preparing';
      }

      return {
        ...prev,
        farmersAhead: nextAhead,
        currentServingToken: nextServing,
        estimatedWaitMinutes: nextWait,
        arrivalAdvice: advice,
      };
    });
  };

  // Demo Stage progression
  const simulateAdvanceStage = () => {
    setProcurementDetail(prev => {
      const nextIndex = (prev.currentStageIndex + 1) % prev.stages.length;
      const updatedStages = prev.stages.map((stg, idx) => {
        if (idx < nextIndex) return { ...stg, status: 'completed' as const };
        if (idx === nextIndex) return { ...stg, status: 'current' as const };
        return { ...stg, status: 'pending' as const };
      });

      // If reaching payment completed, fire confetti
      if (nextIndex === 7) {
        simulatePaymentCredit();
      }

      return {
        ...prev,
        currentStageIndex: nextIndex,
        stages: updatedStages,
      };
    });
  };

  const simulatePaymentCredit = () => {
    setPayment(prev => ({
      ...prev,
      status: 'credited',
      utrNumber: `UTR-${Date.now().toString().slice(-8)}`,
      date: '22 August 2026',
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#3b82f6'],
      });
    } catch {
      // ignore
    }

    speak(language === 'hi' 
      ? 'बधाई हो! आपकी फसल की राशि ₹92,000 सफलतापूर्वक आपके बैंक खाते में जमा हो गई है।' 
      : 'Congratulations! Your crop payment of ₹92,000 has been credited to your bank account.');
  };

  const bookNewSlot = (centerId: string, crop: string, quantity: number, date: string, timeSlot: string): string => {
    const matchedCenter = centers.find(c => c.id === centerId) || centers[0];
    const newToken = `A-${Math.floor(100 + Math.random() * 899)}`;

    const newBooking: ActiveBooking = {
      id: `BOOK-${Date.now()}`,
      tokenNumber: newToken,
      centerId: matchedCenter.id,
      centerName: matchedCenter.name,
      centerHindiName: matchedCenter.hindiName,
      crop,
      cropHindi: crop,
      quantityQuintal: quantity,
      bookingDate: date,
      timeSlot,
      farmersAhead: Math.floor(8 + Math.random() * 15),
      currentServingToken: `A-${Math.floor(80 + Math.random() * 20)}`,
      estimatedWaitMinutes: 30,
      counterNumber: Math.floor(1 + Math.random() * 4),
      status: 'booked',
      qrCodeData: `KISAN-EPROCURE:TOKEN=${newToken}:FARMER=${farmer.farmerId}:SLOT=${date}-${timeSlot}`,
      arrivalAdvice: 'too_early',
    };

    setActiveBooking(newBooking);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'slot_reminder',
      title: 'स्लॉट बुक हुआ / Slot Booked ✅',
      message: `आपका टोकन ${newToken} ${matchedCenter.name} के लिए ${date} (${timeSlot}) पर सुरक्षित हो गया है।`,
      timestamp: 'अभी-अभी',
      read: false,
      urgency: 'normal',
      actionRoute: 'token',
    };

    setNotifications(prev => [newNotif, ...prev]);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    return newToken;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        speak,
        stopSpeakingVoice: stopSpeaking,
        farmer,
        updateFarmerProfile,
        centers,
        activeBooking,
        setActiveBooking,
        procurementDetail,
        setProcurementDetail,
        payment,
        setPayment,
        historicalYields,
        notifications,
        markNotificationAsRead,
        unreadCount,
        isSimpleMode,
        setIsSimpleMode,
        toggleSimpleMode,
        isOffline,
        setIsOffline,
        lastSyncTime,
        activeTab,
        setActiveTab,
        isAuthenticated,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isBiometricModalOpen,
        setIsBiometricModalOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        isCropScanModalOpen,
        setIsCropScanModalOpen,
        isPreArrivalModalOpen,
        setIsPreArrivalModalOpen,
        isAlternativeModalOpen,
        setIsAlternativeModalOpen,
        weatherState,
        setWeatherState,
        centerAlertActive,
        setCenterAlertActive,
        simulateAdvanceQueue,
        simulateAdvanceStage,
        simulatePaymentCredit,
        bookNewSlot,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
