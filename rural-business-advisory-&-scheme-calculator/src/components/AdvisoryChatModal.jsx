import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, RefreshCw } from "lucide-react";
import { TRANSLATIONS } from "../data/translations";
// import { sendAdvisorChat } from "../services/api";

const FREQUENT_QUESTIONS = [
  "Do I need land collateral for this concessional loan?",
  "How does the moratorium interest work in practice?",
  "What documents are needed at the District SCA office?",
  "How should I deal with villagers asking for Udhaar (credit)?",
];

export const AdvisoryChatModal = ({
  isOpen,
  onClose,
  context,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [messages, setMessages] = useState([
    {
      id: "initial",
      sender: "advisor",
      text: "Namaste! I am GramUdyam Mitra, your micro-enterprise and concessional credit advisor. You can ask me any question regarding your business feasibility, margin money, moratorium grace periods, or how to apply through your State Channelizing Agency.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (questionText) => {
    const q = questionText || inputValue.trim();
    if (!q || isLoading) return;

    const userMsg = {
      id: String(Date.now()),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await sendAdvisorChat({
        question: q,
        context,
        language: currentLang,
      });

      const advisorMsg = {
        id: String(Date.now() + 1),
        sender: "advisor",
        text: res.answer || "I am processing your query. Please consult your local SCA District Project Manager.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, advisorMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 2),
          sender: "advisor",
          text: "I could not connect to the advisory network right now. Please verify your internet or try asking again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="advisor-modal-overlay"
      className="fixed inset-0 z-50 bg-[#2a2a22]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
    >
      <div
        id="advisor-modal-box"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl h-[85vh] max-h-[640px] flex flex-col border border-[#e0ddcc] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#5a6344] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-[#e9e4d9]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2">
                GramUdyam Mitra
                <span className="text-[10px] font-semibold bg-white/20 text-[#f8f7f2] px-2.5 py-0.5 rounded-full">
                  AI Advisor
                </span>
              </h3>
              <p className="text-[11px] text-[#e9e4d9]">
                SCA Concessional Credit &amp; Rural Strategy Guide
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#f8f7f2] text-xs">
          {messages.map((msg) => {
            const isAdvisor = msg.sender === "advisor";
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAdvisor ? "justify-start" : "justify-end"}`}
              >
                {isAdvisor && (
                  <div className="w-7 h-7 rounded-full bg-[#5a6344] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-2xs leading-relaxed ${
                    isAdvisor
                      ? "bg-white text-[#2a2a22] border border-[#e0ddcc]"
                      : "bg-[#5a6344] text-white font-medium"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isAdvisor ? "text-[#7a7866]" : "text-[#e9e4d9]"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
                {!isAdvisor && (
                  <div className="w-7 h-7 rounded-full bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="flex items-center gap-2 text-[#7a7866] text-xs pl-9">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#5a6344]" />
              <span>Mitra is consulting rural credit guidelines...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2.5 bg-[#fdfaf3] border-t border-[#e0ddcc] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
          <span className="text-[#7a7866] font-semibold shrink-0">Try:</span>
          {FREQUENT_QUESTIONS.map((fq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(fq)}
              className="px-3 py-1 bg-white hover:bg-[#f8f7f2] rounded-full border border-[#e0ddcc] text-[#3b3a32] shrink-0 transition-colors cursor-pointer"
            >
              {fq}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3.5 bg-white border-t border-[#e0ddcc]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.askQuestionPlaceholder}
              className="flex-1 text-xs px-4 py-2.5 rounded-2xl border border-[#e0ddcc] bg-[#fdfaf3] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-5 py-2.5 rounded-2xl bg-[#5a6344] hover:bg-[#4d5539] text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{t.sendBtn}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
