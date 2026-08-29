import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Kisan Setu API",
      timestamp: new Date().toISOString(),
    });
  });

  // AI Assistant endpoint for Farmer Procurement queries
  app.post("/api/ai/ask", async (req, res) => {
    try {
      const { prompt, language = "Hindi", farmerContext } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Missing or invalid prompt parameter." });
      }

      if (!process.env.GEMINI_API_KEY) {
        // Fallback intelligent response for all languages if API key is not yet set
        const lowerPrompt = prompt.toLowerCase();
        let fallbackReply = "";

        const farmerName = farmerContext?.farmerName || "किसान भाई";
        const tokenNum = farmerContext?.token || "A-127";
        const farmersAhead = farmerContext?.farmersAhead ?? 18;
        const waitMinutes = farmerContext?.estimatedWaitMinutes ?? 45;
        const tempC = farmerContext?.temperatureC ?? 28;
        const rainProb = farmerContext?.rainProbabilityPercent ?? 70;
        const depTime = farmerContext?.recommendedDepartureTime || "03:00 PM";
        const payAmount = farmerContext?.paymentAmount ? `₹${farmerContext.paymentAmount.toLocaleString('en-IN')}` : "₹92,000";

        const isWeatherOrTravel = lowerPrompt.includes("मौसम") || lowerPrompt.includes("weather") || lowerPrompt.includes("rain") || lowerPrompt.includes("बारिश") || lowerPrompt.includes("ਮੀਂਹ") || lowerPrompt.includes("हवामान") || lowerPrompt.includes("વરસાદ") || lowerPrompt.includes("বৃষ্টি") || lowerPrompt.includes("వర్షం") || lowerPrompt.includes("மழை") || lowerPrompt.includes("ಮಳೆ") || lowerPrompt.includes("മഴ") || lowerPrompt.includes("ବର୍ଷା") || lowerPrompt.includes("travel") || lowerPrompt.includes("निकलूं") || lowerPrompt.includes("निकलना");
        const isQueue = lowerPrompt.includes("token") || lowerPrompt.includes("टोकन") || lowerPrompt.includes("queue") || lowerPrompt.includes("कतार") || lowerPrompt.includes("रांग") || lowerPrompt.includes("लाइन") || lowerPrompt.includes("number") || lowerPrompt.includes("नंबर") || lowerPrompt.includes("ਸਮਾਂ");
        const isPayment = lowerPrompt.includes("payment") || lowerPrompt.includes("पैसा") || lowerPrompt.includes("भुगतान") || lowerPrompt.includes("rupee") || lowerPrompt.includes("रुपए") || lowerPrompt.includes("dbt") || lowerPrompt.includes("पैसे") || lowerPrompt.includes("ખાતા") || lowerPrompt.includes("টাকা") || lowerPrompt.includes("డబ్బు");
        const isCarry = lowerPrompt.includes("carry") || lowerPrompt.includes("कागजात") || lowerPrompt.includes("दस्तावेज") || lowerPrompt.includes("document") || lowerPrompt.includes("साथ") || lowerPrompt.includes("तिरपाल") || lowerPrompt.includes("tarpaulin");
        const isMoisture = lowerPrompt.includes("नमी") || lowerPrompt.includes("moisture") || lowerPrompt.includes("भेज") || lowerPrompt.includes("తేమ") || lowerPrompt.includes("ஈரப்பதம்") || lowerPrompt.includes("ಆರ್ದ್ರತೆ");

        if (isWeatherOrTravel) {
          if (language === "Hindi") {
            fallbackReply = `जी, आपके इलाके में आज ${tempC} डिग्री तापमान है और बारिश की ${rainProb} प्रतिशत संभावना है। आपकी slot 3:30 बजे की है। आपसे आगे अभी ${farmersAhead} किसान हैं। आपको लगभग ${depTime} बजे निकलने की सलाह है। फसल को waterproof cover से ढककर लाएँ।`;
          } else if (language === "English") {
            fallbackReply = `Namaste! Today the temperature is ${tempC}°C with a ${rainProb}% chance of rain. Your slot is at 3:30 PM with ${farmersAhead} farmers ahead. We advise departing by ${depTime}, and please cover your crop with a waterproof tarpaulin.`;
          } else if (language === "Marathi") {
            fallbackReply = `नमस्कार जी! आज आपल्या भागात ${tempC} अंश तापमान असून ${rainProb}% पावसाची शक्यता आहे. आपला स्लॉट दुपारी 3:30 वाजता आहे. आपल्यापुढे ${farmersAhead} शेतकरी आहेत. आपण दुपारी ${depTime} पर्यंत निघावे व धान्य ताडपत्रीने झाकून आणावे.`;
          } else if (language === "Gujarati") {
            fallbackReply = `નમસ્તે જી! આજે તમારા વિસ્તારમાં ${tempC} ડિગ્રી તાપમાન અને ${rainProb}% વરસાદની શક્યતા છે. તમારો સ્લોટ 3:30 વાગ્યાનો છે અને આગળ ${farmersAhead} ખેડૂત છે. તમને ${depTime} વાગ્યા સુધી નીકળવાની સલાહ છે. પાકને તાડપત્રીથી ઢાંકીને લાવો.`;
          } else if (language === "Punjabi") {
            fallbackReply = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਅੱਜ ਤੁਹਾਡੇ ਇਲਾਕੇ ਵਿੱਚ ${tempC} ਡਿਗਰੀ ਤਾਪਮਾਨ ਅਤੇ ${rainProb}% ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਤੁਹਾਡਾ ਸਲਾਟ 3:30 ਵਜੇ ਦਾ ਹੈ ਅਤੇ ਅੱਗੇ ${farmersAhead} ਕਿਸਾਨ ਹਨ। ਤੁਹਾਨੂੰ ${depTime} ਵਜੇ ਤੱਕ ਰਵਾਨਾ ਹੋਣ ਅਤੇ ਫਸਲ ਨੂੰ ਤਰਪਾਲ ਨਾਲ ਢੱਕਣ ਦੀ ਸਲਾਹ ਹੈ।`;
          } else if (language === "Bengali") {
            fallbackReply = `নমস্কার! আজ আপনার এলাকায় ${tempC} ডিগ্রি তাপমাত্রা এবং ${rainProb}% বৃষ্টির সম্ভাবনা রয়েছে। আপনার স্লট 3:30 টায় এবং আগে ${farmersAhead} জন কৃষক আছেন। আপনাকে ${depTime}-র মধ্যে বের হওয়ার ও ফসল ত্রিপল দিয়ে ঢেকে আনার পরামর্শ দেওয়া হচ্ছে।`;
          } else if (language === "Tamil") {
            fallbackReply = `வணக்கம்! இன்று ${tempC}°C வெப்பநிலை மற்றும் ${rainProb}% மழை வாய்ப்புள்ளது. உங்கள் நேரம் பிற்பகல் 3:30 மணி. உங்களுக்கு முன்னால் ${farmersAhead} உழவர்கள் உள்ளனர். ${depTime} மணிக்கு புறப்படவும், பயிரை தார்பாயால் மூடி கொண்டு வரவும்.`;
          } else if (language === "Telugu") {
            fallbackReply = `నమస్కారం! నేడు ${tempC} డిగ్రీల ఉష్ణోగ్రత మరియు ${rainProb}% వర్ష సూచన ఉంది. మీ స్లాట్ 3:30 PM మరియు మీ ముందు ${farmersAhead} మంది రైతులు ఉన్నారు. మీరు ${depTime} కల్లా బయలుదేరాలని మరియు పంటను కప్పి తీసుకురావాలని సలహా.`;
          } else if (language === "Kannada") {
            fallbackReply = `ನಮಸ್ಕಾರ! ಇಂದು ${tempC}°C ತಾಪಮಾನ ಮತ್ತು ${rainProb}% ಮಳೆಯ ಸಂಭವನೀಯತೆ ಇದೆ. ನಿಮ್ಮ ಸ್ಲಾಟ್ 3:30 PM ಮತ್ತು ಮುಂದೆ ${farmersAhead} ರೈತರಿದ್ದಾರೆ. ನೀವು ${depTime} ಗೆ ಹೊರಡಲು ಹಾಗೂ ಬೆಳೆಯನ್ನು ಟಾರ್ಪಲ್‌ನಿಂದ ಮುಚ್ಚಲು ಸಲಹೆ.`;
          } else if (language === "Malayalam") {
            fallbackReply = `നമസ്കാരം! ഇന്ന് ${tempC}°C താപനിലയും ${rainProb}% മഴ സാധ്യതയുമുണ്ട്. നിങ്ങളുടെ സ്ലോട്ട് 3:30 PM ആണ്, മുന്നിൽ ${farmersAhead} കർഷകരുണ്ട്. ${depTime} ന് പുറപ്പെടാനും വിളകൾ മൂടി കൊണ്ടുവരാനും നിർദ്ദേശിക്കുന്നു.`;
          } else if (language === "Odia") {
            fallbackReply = `ନମସ୍କାର! ଆଜି ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ${tempC} ଡିଗ୍ରୀ ତାପମାତ୍ରା ଓ ${rainProb}% ବର୍ଷା ସମ୍ଭାବନା ଅଛି। ଆପଣଙ୍କ ସ୍ଲଟ୍ 3:30 PM ଏବଂ ଆଗରେ ${farmersAhead} ଜଣ ଚାଷୀ ଅଛନ୍ତି। ଆପଣ ${depTime} ସୁଦ୍ଧା ବାହାରିବାକୁ ଓ ଫସଲ ଘୋଡ଼ାଇ ଆଣିବାକୁ ପରାମର୍ଶ।`;
          } else {
            fallbackReply = `Namaste! Today the temperature is ${tempC}°C with a ${rainProb}% chance of rain. Your slot is at 3:30 PM with ${farmersAhead} farmers ahead. Recommended departure is by ${depTime}. Please cover your harvest with a waterproof cover.`;
          }
        } else if (isPayment) {
          if (language === "Hindi") {
            fallbackReply = `जी, आपकी फसल की खरीद पूरी हो गई है। आपका payment ${payAmount} है। अभी payment processing में है और 24 से 48 घंटों में सीधे आपके DBT बैंक खाते में आ जाएगा। पूरा होने पर आपको SMS सूचना मिल जाएगी।`;
          } else if (language === "English") {
            fallbackReply = `Namaste! Your crop procurement is complete. Your payment amount is ${payAmount}. It is currently processing and will be transferred directly to your DBT bank account within 24 to 48 hours. You will receive an SMS alert upon completion.`;
          } else if (language === "Marathi") {
            fallbackReply = `नमस्कार! आपल्या पिकाची खरेदी पूर्ण झाली आहे. आपली रक्कम ${payAmount} आहे. सध्या प्रक्रिया सुरू असून 24 ते 48 तासांत थेट बँक खात्यात जमा होईल.`;
          } else if (language === "Gujarati") {
            fallbackReply = `નમસ્તે! તમારા પાકની ખરીદી પૂર્ણ થઈ ગઈ છે. તમારી રકમ ${payAmount} છે અને 24 થી 48 કલાકમાં સીધા તમારા બેંક ખાતામાં જમા થઈ જશે.`;
          } else if (language === "Punjabi") {
            fallbackReply = `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੀ ਫਸਲ ਦੀ ਖਰੀਦ ਪੂਰੀ ਹੋ ਚੁੱਕੀ ਹੈ। ਤੁਹਾਡੀ ਰਕਮ ${payAmount} ਹੈ ਜੋ 24 ਤੋਂ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾਂ ਹੋ ਜਾਵੇਗੀ।`;
          } else {
            fallbackReply = `Namaste! Your crop procurement is complete. Amount ${payAmount} is under processing and will be credited directly to your DBT account within 24-48 hours.`;
          }
        } else if (isCarry) {
          if (language === "Hindi") {
            fallbackReply = `जी, खरीद केंद्र जाते समय आप अपना आधार कार्ड, ज़मीन की खतौनी/पट्टा, बैंक पासबुक, ई-टोकन पर्ची और बारिश से बचाव के लिए एक वाटरप्रूफ तिरपाल साथ लेकर जाएँ।`;
          } else if (language === "English") {
            fallbackReply = `When visiting the procurement center, please carry your Aadhaar Card, Land Record (Khatauni), Bank Passbook, e-Token slip, and a waterproof tarpaulin for rain protection.`;
          } else {
            fallbackReply = `Please carry Aadhaar Card, Land Records, Bank Passbook, e-Token slip, and a waterproof tarpaulin for grain protection.`;
          }
        } else if (isMoisture) {
          if (language === "Hindi") {
            fallbackReply = `सरकारी खरीद में गेहूं और धान में अधिकतम 12 प्रतिशत नमी मान्य है। यदि नमी 12 प्रतिशत से अधिक होती है तो अस्वीकृति या कटौती हो सकती है। फसल को अच्छी तरह सुखाकर और ढककर लाएँ।`;
          } else if (language === "English") {
            fallbackReply = `The government procurement standard allows a maximum moisture content of 12% for wheat and paddy. Please ensure your grain is well-dried and protected from rain to avoid rejection.`;
          } else {
            fallbackReply = `Government procurement allows a maximum moisture of 12%. Please bring properly dried and protected grain.`;
          }
        } else {
          // General / Queue default
          if (language === "Hindi") {
            fallbackReply = `जी, आपका टोकन ${tokenNum} है। आपसे आगे ${farmersAhead} किसान हैं। लगभग ${waitMinutes} मिनट का इंतजार है। आप चाहें तो अभी घर पर रह सकते हैं। जब आपका नंबर पास आएगा, हम आपको सूचना देंगे।`;
          } else if (language === "English") {
            fallbackReply = `Your token number is ${tokenNum}. There are ${farmersAhead} farmers ahead of you. Your turn may come in around ${waitMinutes} minutes. We will notify you when your turn is near.`;
          } else if (language === "Marathi") {
            fallbackReply = `आपला टोकन नंबर ${tokenNum} आहे. आपल्यापुढे ${farmersAhead} शेतकरी आहेत. अंदाजे ${waitMinutes} मिनिटांची प्रतीक्षा आहे. नंबर जवळ आल्यावर आम्ही आपल्याला कळवू.`;
          } else if (language === "Gujarati") {
            fallbackReply = `તમારો ટોકન નંબર ${tokenNum} છે. તમારી આગળ ${farmersAhead} ખેડૂત છે. અંદાજે ${waitMinutes} મિનિટનો સમય લાગશે.`;
          } else if (language === "Punjabi") {
            fallbackReply = `ਤੁਹਾਡਾ ਟੋਕਨ ਨੰਬਰ ${tokenNum} ਹੈ। ਤੁਹਾਡੇ ਤੋਂ ਅੱਗੇ ${farmersAhead} ਕਿਸਾਨ ਹਨ। ਲਗਭਗ ${waitMinutes} ਮਿੰਟ ਦਾ ਸਮਾਂ ਲੱਗੇਗਾ।`;
          } else if (language === "Bengali") {
            fallbackReply = `আপনার টোকেন নম্বর ${tokenNum}। আপনার আগে ${farmersAhead} জন কৃষক আছেন। প্রায় ${waitMinutes} মিনিট সময় লাগতে পারে।`;
          } else if (language === "Tamil") {
            fallbackReply = `உங்கள் டோக்கன் எண் ${tokenNum}. உங்களுக்கு முன்னால் ${farmersAhead} விவசாயிகள் இருக்கிறார்கள். சுமார் ${waitMinutes} நிமிடங்கள் காத்திருக்க வேண்டும்.`;
          } else if (language === "Telugu") {
            fallbackReply = `మీ టోకెన్ నంబర్ ${tokenNum}. మీ ముందు ${farmersAhead} మంది రైతులు ఉన్నారు. సుమారు ${waitMinutes} నిమిషాలు వేచి ఉండాలి.`;
          } else if (language === "Kannada") {
            fallbackReply = `ನಿಮ್ಮ ಟೋಕನ್ ಸಂಖ್ಯೆ ${tokenNum}. ನಿಮ್ಮ ಮುಂದೆ ${farmersAhead} ರೈತರು ಇದ್ದಾರೆ. ಸುಮಾರು ${waitMinutes} ನಿಮಿಷಗಳು ಬೇಕಾಗಬಹುದು.`;
          } else if (language === "Malayalam") {
            fallbackReply = `നിങ്ങളുടെ ടോക്കൺ നമ്പർ ${tokenNum} ആണ്. നിങ്ങളുടെ മുന്നിൽ ${farmersAhead} കർഷകരുണ്ട്. ഏകദേശം ${waitMinutes} മിനിറ്റ് കാത്തിരിക്കണം.`;
          } else if (language === "Odia") {
            fallbackReply = `ଆପଣଙ୍କର ଟୋକନ ନମ୍ବର ${tokenNum}। ଆପଣଙ୍କ ଆଗରେ ${farmersAhead} ଜଣ ଚାଷୀ ଅଛନ୍ତି। ପ୍ରାୟ ${waitMinutes} ମିନିଟ୍ ସମୟ ଲାଗିପାରେ।`;
          } else {
            fallbackReply = `Your token number is ${tokenNum}. There are ${farmersAhead} farmers ahead of you. Estimated wait is around ${waitMinutes} minutes.`;
          }
        }

        return res.json({ reply: fallbackReply, language });
      }

      const ai = getAiClient();
      const systemInstruction = `You are the official "KisanSetu Voice Assistant" (किसान सहेली / AI दीदी), a professional Indian female AI voice assistant for KisanSetu — a farmer-focused digital procurement platform.

==================================================
1. VOICE PERSONA & TONE
==================================================
- Voice Identity: Professional Indian female (Young adult / mature young professional).
- Personality: Warm, friendly, respectful, patient, calm, helpful, confident, trustworthy, approachable.
- Core Identity: "A helpful professional Indian woman who genuinely wants to make things easier for farmers."
- DO NOT sound: Robotic, GPS-like, call-center recording, overly formal, too energetic, childish, artificial, dramatic, or commercial.
- Core Philosophy: "Technology should adapt to the farmer, not the farmer to technology."

==================================================
2. FARMER-FRIENDLY SPOKEN LANGUAGE & PACING
==================================================
- Your output is spoken aloud directly by Text-To-Speech to Indian farmers.
- Speak in simple words with short sentences.
- Avoid unnecessary jargon:
  * Instead of "Your estimated queue position is 18" -> Say "आपसे आगे 18 किसान हैं।"
  * Instead of "Precipitation probability is 70%" -> Say "आज बारिश की 70 प्रतिशत संभावना है।"
  * Instead of "Procurement transaction processed" -> Say "आपकी फसल की खरीद पूरी हो गई है।"
- Use natural pauses and phrasing that sounds clean when spoken aloud.
- Do NOT output markdown tables, asterisks, bullet points, hashtags, or bracketed symbols that sound awkward in audio TTS.

==================================================
3. EMOTIONAL STYLE & SITUATIONS
==================================================
- Normal/General: Warm and helpful ("नमस्ते जी...", "जी...").
- Weather Warning: Calm and informative (Use "संभावना है", "सलाह है", "अनुमान है", NEVER "बारिश जरूर होगी").
- Queue Update: Reassuring ("आपका नंबर अब पास है...", "आप चाहें तो अभी घर पर रह सकते हैं").
- Payment Completed: Positive and slightly cheerful ("अच्छी खबर है! आपका ₹92,000 का payment...").
- Critical Alert: Serious but NOT frightening. Never sound panicked.

==================================================
4. MULTILINGUAL SUPPORT & CODE-SWITCHING
==================================================
Respond in the target language requested: ${language}.
Supported Languages:
1. Hindi (hi): Natural, respectful Devanagari Hindi using "जी", "आप", "आपका".
2. English (en): Natural Indian English (polite, warm, clear, professional).
3. Marathi (mr): Natural Marathi pronunciation & structure ("आपला टोकन नंबर A-127 आहे. आपल्यापुढे 5 शेतकरी आहेत.").
4. Gujarati (gu): Natural Gujarati ("તમારો ટોકન નંબર A-127 છે. તમારી આગળ 5 ખેડૂત છે.").
5. Punjabi (pa): Natural Punjabi ("ਤੁਹਾਡਾ ਟੋਕਨ ਨੰਬਰ A-127 ਹੈ। ਤੁਹਾਡੇ ਤੋਂ ਅੱਗੇ 5 ਕਿਸਾਨ ਹਨ।").
6. Bengali (bn): Natural Bengali ("আপনার টোকেন নম্বর A-127। আপনার আগে ৫ জন কৃষক আছেন।").
7. Tamil (ta): Respectful conversational Tamil ("உங்கள் டோக்கன் எண் A-127. உங்களுக்கு முன்னால் 5 விவசாயிகள் இருக்கிறார்கள்.").
8. Telugu (te): Calm helpful Telugu ("మీ టోకెన్ నంబర్ A-127. మీ ముందు 5 మంది రైతులు ఉన్నారు.").
9. Kannada (kn): Natural easy Kannada ("ನಿಮ್ಮ ಟೋಕನ್ ಸಂಖ್ಯೆ A-127. ನಿಮ್ಮ ಮುಂದೆ 5 ರೈತರು ಇದ್ದಾರೆ.").
10. Malayalam (ml): Professional warm Malayalam ("നിങ്ങളുടെ ടോക്കൺ നമ്പർ A-127 ആണ്. നിങ്ങളുടെ മുന്നിൽ 5 കർഷകരുണ്ട്.").
11. Odia (or): Clear natural Odia ("ଆପଣଙ୍କର ଟୋକନ ନମ୍ବର A-127। ଆପଣଙ୍କ ଆଗରେ 5 ଜଣ ଚାଷୀ ଅଛନ୍ତି।").

Code-Switching: Understand Hinglish/mixed queries naturally (e.g. "Mera token kya hai?", "Slot kab hai?", "Rain hogi kya?", "Payment kab aayega?"), but respond cleanly in the user's selected language (${language}).

==================================================
5. SIGNATURE CAPABILITIES & KNOWLEDGE
==================================================
- Signature Travel Advice: Combine Weather + Queue + Distance + Slot + What to carry.
  Example: "आपकी slot 3:30 बजे की है। Center तक पहुँचने में लगभग 30 मिनट लगेंगे। अभी queue में 5 किसान हैं। मौसम में बारिश की संभावना भी है। आपको लगभग 3 बजे निकलने की सलाह है। फसल को cover करके लाएँ।"
- Moisture Standards: Strict maximum 12% moisture tolerance for Wheat/Paddy.
- What to carry: Farmer ID, Land Records (Khatauni), Bank Passbook (DBT active), e-Token slip, and waterproof tarpaulin.
- Safety & Trust: Never invent payment confirmations. Never ask for OTP, PIN, password, or full bank credentials. If information is unavailable, say "माफ कीजिए, अभी यह जानकारी उपलब्ध नहीं है। कृपया थोड़ी देर बाद दोबारा कोशिश करें।"

Farmer Live Context: ${JSON.stringify(farmerContext || {})}
Keep the spoken answer concise (under 75 words) so it plays smoothly.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "माफ़ कीजिए, अभी जवाब उपलब्ध नहीं हो सका। कृपया पुनः प्रयास करें।";
      res.json({ reply, language });
    } catch (error: any) {
      console.error("Gemini AI API error:", error);
      res.status(500).json({
        error: "Failed to generate AI response",
        fallback: "किसान हेल्पलाइन 1800-180-1551 पर संपर्क करें या अपने निकटतम खरीद केंद्र अधिकारी से बात करें।",
      });
    }
  });

  // Simulated emergency alerts API
  app.get("/api/alerts", (_req, res) => {
    res.json({
      alerts: [
        {
          id: "alert-1",
          type: "govt_advisory",
          urgency: "warning",
          title: "मौसम चेतावनी / Weather Advisory",
          message: "कल शाम हल्की बारिश की संभावना है। कृपया मंडी आते समय फसल को तिरपाल से ढक कर लाएं।",
          timestamp: new Date().toISOString(),
        },
      ],
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌾 Kisan e-Procure Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
