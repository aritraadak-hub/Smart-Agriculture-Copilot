import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  Send,
  Globe,
  Bot,
  User,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export const VoiceAssistant = () => {
  const { language, setLanguage } = useLanguage();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);

  // Chat conversation state
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        language === 'hi'
          ? 'नमस्ते किसान साथी! मैं आपका स्मार्ट कृषि वॉयस असिस्टेंट हूँ। आप मौसम, फसल, बाज़ार भाव, मिट्टी नमी या सरकारी योजनाओं के बारे में पूछ सकते हैं।'
          : language === 'bn'
          ? 'নমস্কার কৃষক বন্ধু! আমি আপনার স্মার্ট কৃষি ভয়েস অ্যাসিস্ট্যান্ট। আপনি আবহাওয়া, ফসল, বাজারের দাম, মাটির আর্দ্রতা বা সরকারি প্রকল্প সম্পর্কে জিজ্ঞাসা করতে পারেন।'
          : 'Hello Farmer! I am your Smart Agriculture AI Assistant. Ask me about weather, crop recommendations, market prices, soil moisture, irrigation, or government schemes.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Web Speech Recognition Initialization
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processQuery(transcript);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (err) => {
        console.warn('Speech recognition notice:', err.error);
        setIsListening(false);
        if (err.error === 'not-allowed') {
          showToast('Microphone access denied. You can type using the text chat below.', 'info');
        }
      };

      setRecognition(rec);
    }
  }, [language]);

  // Multilingual Question Suggestions
  const sampleQuestions = {
    en: [
      "What is today's weather?",
      "Which crop should I grow?",
      "What is rice price today?",
      "Is irrigation required?",
      "What is my soil moisture?",
      "Show government schemes."
    ],
    hi: [
      "आज का मौसम कैसा है?",
      "मुझे कौन सी फसल उगानी चाहिए?",
      "आज चावल का भाव क्या है?",
      "क्या सिंचाई की आवश्यकता है?",
      "मेरी मिट्टी की नमी कितनी है?",
      "सरकारी योजनाएं दिखाएं।"
    ],
    bn: [
      "আজকের আবহাওয়া কেমন?",
      "আমার কোন ফসল চাষ করা উচিত?",
      "আজ চালের দাম কত?",
      "সেচ দেওয়া কি প্রয়োজন?",
      "আমার মাটির আর্দ্রতা কত?",
      "সরকারি প্রকল্পগুলো দেখান।"
    ]
  };

  const activeSuggestions = sampleQuestions[language] || sampleQuestions.en;

  // Toggle Voice Recording
  const toggleListening = () => {
    if (!recognition) {
      showToast('Speech recognition not supported in browser. Use text chat below.', 'info');
      setIsOpen(true);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      let langCode = 'en-US';
      if (language === 'hi') langCode = 'hi-IN';
      if (language === 'bn') langCode = 'bn-IN';

      recognition.lang = langCode;
      try {
        recognition.start();
        setIsListening(true);
        setIsOpen(true);
        showToast('Listening... Speak your question in ' + (language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : 'English'), 'info');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Process Query & Return Dual Text + Speech Output
  const processQuery = (queryText) => {
    if (!queryText.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add User Message
    const userMsg = { sender: 'user', text: queryText, time: userTime };
    setMessages((prev) => [...prev, userMsg]);

    const lower = queryText.toLowerCase();
    let reply = '';

    // Smart Rule-Based Multilingual Agriculture Knowledge Engine
    if (lower.includes('weather') || lower.includes(' मौसम') || lower.includes('मौसम') || lower.includes('আবহাওয়া')) {
      reply =
        language === 'hi'
          ? 'आज लुधियाना, पंजाब में मौसम: आंशिक रूप से बादल छाए रहेंगे, तापमान 29°C और नमी 68% है। कल दोपहर बारिश की संभावना है।'
          : language === 'bn'
          ? 'আজ লুধিয়ানা, পাঞ্জাবে আবহাওয়া: আংশিক মেঘলা, তাপমাত্রা ২৯°সে এবং আর্দ্রতা ৬৮%। আগামীকাল বিকেলে বৃষ্টির সম্ভাবনা।'
          : 'Today in Ludhiana, Punjab: Partly Cloudy, 29°C, Humidity 68%. Heavy showers expected tomorrow afternoon.';
    } else if (lower.includes('crop') || lower.includes('grow') || lower.includes('फसल') || lower.includes('चाहिए') || lower.includes('ফসল')) {
      reply =
        language === 'hi'
          ? 'आपकी दोमट मिट्टी और वर्तमान रबी सीजन के आधार पर, गेहूँ (HD-2967) और सरसों 92% अनुकूलता के साथ सर्वोत्तम फसलें हैं।'
          : language === 'bn'
          ? 'আপনার দোআঁশ মাটি এবং বর্তমান রবি মরসুমের ওপর ভিত্তি করে, গম (HD-2967) এবং সরিষা ৯২% উপযুক্ততার সাথে সেরা ফসল।'
          : 'Based on your loamy soil and current Rabi season, Wheat (HD-2967) and Mustard are top recommendations with 92% suitability score.';
    } else if (lower.includes('rice') || lower.includes('price') || lower.includes(' rate') || lower.includes('चावल') || lower.includes('भाव') || lower.includes('দাম') || lower.includes('চাল')) {
      reply =
        language === 'hi'
          ? 'आज अमृतसर मंडी में बासमती चावल का भाव ₹4,100 प्रति क्विंटल है, जो पिछले हफ्ते से +6.4% अधिक है। बेचने का अच्छा समय है।'
          : language === 'bn'
          ? 'আজ অমৃতসর মন্ডিতে বাসমতি চালের দাম প্রতি কুইন্টালে ₹৪,১০০, যা গত সপ্তাহের চেয়ে +৬.৪% বেশি। বিক্রির চমৎকার সময়।'
          : 'Today paddy/rice (Basmati) price in Amritsar APMC Mandi is ₹4,100 per quintal (+6.4% gain this week). Great time to sell.';
    } else if (lower.includes('irrigation') || lower.includes('water') || lower.includes('सिंचाई') || lower.includes('पानी') || lower.includes('সেচ')) {
      reply =
        language === 'hi'
          ? 'मौसम पूर्वानुमान के अनुसार कल 24.5mm बारिश की संभावना है। पानी और ईंधन बचाने के लिए सिंचाई को स्थगित करें।'
          : language === 'bn'
          ? 'আবহাওয়ার পূর্বাভাস অনুযায়ী আগামীকাল ২৪.৫ মিমি বৃষ্টির সম্ভাবনা রয়েছে। জল ও খরচ বাঁচাতে সেচ স্থগিত রাখুন।'
          : 'Rainfall forecast indicates 24.5mm rain tomorrow. Delay planned irrigation to prevent soil waterlogging.';
    } else if (lower.includes('moisture') || lower.includes('soil') || lower.includes('नमी') || lower.includes('मिट्टी') || lower.includes('আর্দ্রতা') || lower.includes('মাটি')) {
      reply =
        language === 'hi'
          ? 'आपकी मिट्टी की वर्तमान नमी 28.5% है (आदर्श सीमा 35-60%)। हल्की ड्रिप सिंचाई की सिफारिश की जाती है।'
          : language === 'bn'
          ? 'আপনার মাটির বর্তমান আর্দ্রতা ২৮.৫% (আদর্শ মাত্রা ৩৫-৬০%)। হালকা ড্রিপ সেচের পরামর্শ দেওয়া হচ্ছে।'
          : 'Your current IoT soil moisture level is 28.5% (Optimal range is 35-60%). Light drip fertigation is recommended.';
    } else if (lower.includes('scheme') || lower.includes('government') || lower.includes('योजना') || lower.includes('सरकारी') || lower.includes('প্রকল্প')) {
      reply =
        language === 'hi'
          ? 'प्रमुख योजनाएं: 1. PM-KISAN (₹6,000/वर्ष) 2. PM फसल बीमा योजना (PMFBY) 3. कृषि इन्फ्रास्ट्रक्चर फंड (AIF)।'
          : language === 'bn'
          ? 'প্রধান সরকারি প্রকল্প: ১. পিএম-কিষাণ (₹৬,০০০/বছর) ২. পিএম ফসল বিমা যোজনা (PMFBY) ৩. কৃষি ইনফ্রাস্ট্রাকচার ফান্ড (AIF)।'
          : 'Top Active Schemes: 1. PM-KISAN (₹6,000/year) 2. PMFBY Crop Insurance 3. Agriculture Infrastructure Fund (AIF).';
    } else {
      reply =
        language === 'hi'
          ? `मैंने आपका प्रश्न समझा: "${queryText}"। सलाह: बेहतर उत्पादकता के लिए सॉइल एनालिटिक्स और क्रॉप रिकमेंडेशन मॉड्यूल देखें।`
          : language === 'bn'
          ? `আমি আপনার প্রশ্নটি পেয়েছি: "${queryText}"। পরামর্শ: বিস্তারিত তথ্যের জন্য সোয়েল অ্যানালিটিক্স ও ক্রপ মডিউলটি দেখুন।`
          : `AI Copilot analyzed: "${queryText}". Recommendation: Check the Soil Analytics and Crop Recommendation modules for tailored insights.`;
    }

    const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const botMsg = { sender: 'bot', text: reply, time: botTime };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
      if (speechEnabled) {
        speakText(reply);
      }
    }, 400);
  };

  // Text-To-Speech Synthesis Output
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'bn') utterance.lang = 'bn-IN';
      else utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      processQuery(inputText.trim());
      setInputText('');
    }
  };

  return (
    <>
      {/* Floating Microphone Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${
          isListening
            ? 'bg-rose-600 animate-pulse ring-4 ring-rose-300'
            : 'bg-gradient-to-tr from-emerald-800 via-emerald-600 to-emerald-500 shadow-emerald-700/40'
        }`}
        title="AI Farming Voice Assistant"
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>

      {/* Right Side Chat Drawer UI */}
      {isOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-96 max-w-full bg-white dark:bg-darkagri-card z-50 border-l border-slate-200 dark:border-darkagri-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 bg-emerald-900 text-white flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-800 rounded-xl">
                <Bot className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  Smart Agri Voice AI <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[10px] text-emerald-300 font-bold block">
                  {language === 'hi' ? 'हिंदी सहायिका' : language === 'bn' ? 'বাংলা অ্যাসিস্ট্যান্ট' : 'English Assistant'}
                </span>
              </div>
            </div>

            {/* Language Switcher & Controls */}
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-emerald-950 text-emerald-200 text-xs font-bold px-2 py-1 rounded-lg border border-emerald-700 outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">हिंदी</option>
                <option value="bn">বাংলা</option>
              </select>

              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-1.5 rounded-lg border transition-all ${
                  speechEnabled ? 'bg-emerald-800 border-emerald-600 text-emerald-200' : 'bg-emerald-950 border-emerald-800 text-slate-400'
                }`}
                title={speechEnabled ? 'Mute Speech Output' : 'Unmute Speech Output'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4 text-emerald-300" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-emerald-800/80 hover:bg-emerald-800 rounded-lg text-emerald-200 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation History Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/50 dark:bg-darkagri-bg">
            
            {/* Quick Sample Questions Chips */}
            <div className="space-y-1.5 pb-2 border-b border-slate-200/80 dark:border-darkagri-border">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-emerald-600" /> Quick Farming Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSuggestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => processQuery(q)}
                    className="px-2.5 py-1 bg-white dark:bg-darkagri-card border border-emerald-200 dark:border-darkagri-border text-emerald-800 dark:text-emerald-300 font-medium text-[11px] rounded-full hover:bg-emerald-50 dark:hover:bg-darkagri-hover transition-all text-left truncate max-w-full"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Stream */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-sm">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl space-y-1 shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                      : 'bg-white dark:bg-darkagri-card text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-darkagri-border rounded-bl-none font-medium'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right font-semibold ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-sm">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Controls: Microphone + Text Fallback Input */}
          <div className="p-3 bg-white dark:bg-darkagri-card border-t border-slate-200 dark:border-darkagri-border space-y-2">
            
            {/* Listening Banner */}
            {isListening && (
              <div className="p-2 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-center text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center justify-center gap-2 animate-pulse">
                <Mic className="w-4 h-4 text-rose-600" />
                <span>Listening in {language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : 'English'}... Speak now</span>
              </div>
            )}

            <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl text-white font-bold transition-all shadow ${
                  isListening ? 'bg-rose-600 animate-pulse' : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
                title="Tap to Speak"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'यहाँ प्रश्न लिखें या माइक पर बोलें...'
                    : language === 'bn'
                    ? 'এখানে প্রশ্ন লিখুন বা মাইকে বলুন...'
                    : 'Type farming question or tap mic...'
                }
                className="saas-input text-xs flex-1 py-2"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
