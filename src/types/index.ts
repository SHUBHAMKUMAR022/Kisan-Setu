export type LanguageCode = 
  | 'hi' // Hindi
  | 'en' // English
  | 'pa' // Punjabi
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'bn' // Bengali
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'or'; // Odia

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
  flagText: string;
}

export type ProcurementStageId = 
  | 'slot_booked'
  | 'farmer_arrived'
  | 'doc_verification'
  | 'quality_check'
  | 'weighing'
  | 'procurement_accepted'
  | 'payment_processing'
  | 'payment_completed';

export interface ProcurementStage {
  id: ProcurementStageId;
  titleKey: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  descriptionKey: string;
  details?: string;
}

export interface ProcurementCenter {
  id: string;
  name: string;
  hindiName: string;
  distanceKm: number;
  status: 'open' | 'closed' | 'busy';
  currentQueue: number;
  servingToken: string;
  estimatedWaitMinutes: number;
  availableSlots: number;
  workingHours: string;
  acceptedCrops: string[];
  address: string;
  contactPhone: string;
  activeCounters: number;
  isRecommended?: boolean;
  recommendationReason?: string;
  coordinates: { lat: number; lng: number };
}

export interface SlotTimeOption {
  id: string;
  timeRange: string;
  availableSlots: number;
  isFull: boolean;
}

export interface ActiveBooking {
  id: string;
  tokenNumber: string;
  centerId: string;
  centerName: string;
  centerHindiName: string;
  crop: string;
  cropHindi: string;
  quantityQuintal: number;
  bookingDate: string;
  timeSlot: string;
  farmersAhead: number;
  currentServingToken: string;
  estimatedWaitMinutes: number;
  counterNumber: number;
  status: 'booked' | 'in_queue' | 'processing' | 'completed' | 'cancelled';
  qrCodeData: string;
  arrivalAdvice: 'too_early' | 'start_preparing' | 'reach_now' | 'your_turn';
}

export interface QualityAssay {
  cropGrade: 'FAQ (Fair Average Quality)' | 'Grade A' | 'Standard';
  moisturePercent: number;
  moistureLimit: number;
  foreignMatterPercent: number;
  brokenGrainsPercent: number;
  status: 'Approved' | 'Review' | 'Rejected';
  inspectorName: string;
  verifiedAt: string;
}

export interface ActiveProcurementDetail {
  referenceId: string;
  tokenNumber: string;
  crop: string;
  cropHindi: string;
  variety: string;
  expectedQuantityQuintal: number;
  acceptedQuantityQuintal: number;
  grossWeightKg: number;
  tareWeightKg: number;
  netWeightKg: number;
  mspRatePerQuintal: number;
  totalPayableAmount: number;
  centerName: string;
  centerHindiName: string;
  procurementDate: string;
  eJFormNumber: string;
  quality: QualityAssay;
  currentStageIndex: number; // 0 to 7
  stages: ProcurementStage[];
}

export interface PaymentRecord {
  transactionId: string;
  amount: number;
  status: 'initiated' | 'bank_processing' | 'credited' | 'failed';
  date: string;
  utrNumber: string;
  maskedBankAcc: string;
  bankName: string;
  ifscPrefix: string;
  crop: string;
  quantityQuintal: number;
  dbtScheme: string;
}

export interface HistoricalYieldRecord {
  id: string;
  year: number;
  season: 'Rabi' | 'Kharif' | 'Zaid';
  crop: string;
  cropHindi: string;
  acreage: number;
  yieldQuintal: number;
  yieldPerAcre: number;
  mspRate: number;
  totalEarnings: number;
  centerName: string;
  qualityGrade: string;
  moisturePercent: number;
  status: 'Completed';
}

export interface NotificationItem {
  id: string;
  type: 'slot_reminder' | 'queue_update' | 'arrival_alert' | 'procurement_update' | 'payment_update' | 'govt_advisory';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgency: 'normal' | 'warning' | 'critical';
  actionRoute?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  hindiName: string;
  farmerId: string;
  mobile: string;
  village: string;
  villageHindi: string;
  district: string;
  districtHindi: string;
  state: string;
  preferredLanguage: LanguageCode;
  preferredCenterId: string;
  kisanCreditCardNo: string;
  maskedAadhaar: string;
  maskedBankAcc: string;
  bankName: string;
  ifsc: string;
  totalLandAcres: number;
  biometricRegistered: boolean;
  primaryCrop?: string;
  typicalCropQuantityQuintal?: number;
  registeredCrops?: RegisteredCrop[];
  preferredCenterStats?: PreferredCenterStats[];
}

export type CropReadiness = 'ready' | 'almost_ready' | 'not_ready';

export interface RegisteredCrop {
  id: string;
  cropName: string;
  cropHindi: string;
  variety: string;
  approxQuantityQuintal: number;
  readiness: CropReadiness;
  expectedProcurementDate: string;
  notes?: string;
}

export interface PreferredCenterStats {
  centerId: string;
  centerName: string;
  timesUsed: number;
  averageWaitMinutes: number;
  lastVisitDate: string;
}

export interface FarmerPersonalizedInsight {
  id: string;
  type: 'wait_time' | 'best_center' | 'crop_trend' | 'weather_tip';
  icon: string;
  title: string;
  message: string;
  actionText?: string;
  actionRoute?: string;
}

export type FarmerJourneyStep = 'plan' | 'prepare' | 'travel' | 'procure' | 'get_paid';

export interface PreArrivalCheckItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: string;
  checked: boolean;
  isRequired: boolean;
  category: 'document' | 'crop' | 'travel' | 'weather';
}

export interface CropPreCheckResult {
  scanId: string;
  cropType: string;
  imageUrl?: string;
  estimatedMoisturePercent: number;
  isMoistureSafe: boolean; // <= 12%
  cleanlinessScorePercent: number; // 0-100%
  grainLusterGrade: 'Good' | 'Standard' | 'Needs Cleaning';
  status: 'passed_preliminary' | 'needs_drying' | 'needs_cleaning';
  recommendations: string[];
  analyzedAt: string;
}

export interface CenterAlert {
  id: string;
  centerId: string;
  title: string;
  message: string;
  severity: 'warning' | 'emergency';
  alternativeCenterId: string;
  alternativeReason: string;
  isActive: boolean;
}

