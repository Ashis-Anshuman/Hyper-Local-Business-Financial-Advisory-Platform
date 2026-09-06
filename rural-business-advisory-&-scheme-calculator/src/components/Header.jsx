import React from "react";
import {
  Landmark,
  Globe,
  Volume2,
  VolumeX,
  Printer,
  Sparkles,
  MessageSquare,
  LogOut,
  Home,
  User,
} from "lucide-react";
import { TRANSLATIONS } from "../data/translations";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

export const Header = ({
  currentLang,
  onSelectLang,
  isSpeaking,
  onToggleSpeech,
  onPrintDpr,
  onOpenChat,
  user,
  onLogout,
  onNavigateHome,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <header id="main-header" className="bg-[#ffffff] border-b border-[#e0ddcc] sticky top-0 z-40 shadow-xs">
      {/* Top Concessional Agency Banner */}
      <div id="agency-banner" className="bg-[#2a2a22] text-[#f8f7f2] text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Landmark className="w-3.5 h-3.5 text-[#b45a3a] shrink-0" />
          <span>{t.badgeGovCredit}</span>
          <span className="text-[#9a9886] hidden sm:inline">•</span>
          <span className="text-[#d6cfbe] hidden sm:inline">NBCFDC / NSFDC / NMDFC / State Channelizing Agencies (SCAs)</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="hidden md:inline text-[#d6cfbe] font-semibold">Moratorium Buffer Included</span>
          <span className="text-[#5a6344] hidden md:inline">|</span>
          <span className="text-[#e9e4d9] font-medium bg-[#5a6344]/40 px-2 py-0.5 rounded-full">Interest: 6.5% – 8.0% p.a.</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5a6344] text-[#f8f7f2] flex items-center justify-center font-bold shadow-xs shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#2a2a22] leading-tight tracking-tight">
                {t.appTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#e9e4d9] text-[#5a6344] border border-[#d6cfbe]">
                <Sparkles className="w-3 h-3 text-[#5a6344]" />
                AI-Assisted
              </span>
            </div>
            <p className="text-xs text-[#7a7866] line-clamp-1 max-w-xl">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <label htmlFor="language-selector" className="sr-only">Select Language</label>
            <div className="flex items-center gap-1.5 bg-[#f8f7f2] hover:bg-[#e9e4d9] border border-[#d6cfbe] text-[#3b3a32] text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-[#5a6344]" />
              <select
                id="language-selector"
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#3b3a32] focus:outline-none cursor-pointer pr-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Voice Read Aloud */}
          <button
            id="voice-narration-btn"
            type="button"
            onClick={onToggleSpeech}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              isSpeaking
                ? "bg-[#b45a3a]/15 border-[#b45a3a] text-[#b45a3a] animate-pulse font-bold"
                : "bg-[#ffffff] border-[#d6cfbe] text-[#3b3a32] hover:bg-[#f8f7f2]"
            }`}
            title={isSpeaking ? t.audioNarrationPlaying : t.audioNarrationBtn}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#b45a3a]" />
                <span className="hidden md:inline">{t.audioNarrationPlaying}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#5a6344]" />
                <span className="hidden md:inline">{t.audioNarrationBtn}</span>
              </>
            )}
          </button>

          {/* Ask Mitra Advisor */}
          <button
            id="open-advisor-chat-btn"
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 bg-[#e9e4d9] hover:bg-[#dcd6c8] border border-[#d6cfbe] text-[#5a6344] text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#5a6344]" />
            <span className="hidden sm:inline">{t.chatWithAdvisor}</span>
          </button>

          {/* Print / Download DPR */}
          <button
            id="print-dpr-header-btn"
            type="button"
            onClick={onPrintDpr}
            className="flex items-center gap-1.5 bg-[#5a6344] hover:bg-[#4d5539] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#e9e4d9]" />
            <span className="hidden sm:inline">{t.printDprBtn}</span>
          </button>

          {/* Home / Landing Page Button */}
          {onNavigateHome && (
            <button
              id="header-home-btn"
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 bg-[#ffffff] hover:bg-[#f8f7f2] border border-[#d6cfbe] text-[#5a6344] text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              title="Return to Public Landing Page"
            >
              <Home className="w-3.5 h-3.5 text-[#5a6344]" />
              <span className="hidden md:inline">Home</span>
            </button>
          )}

          {/* Logged in User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-2 pl-1 border-l border-[#d6cfbe]">
              <div
                className={`w-7 h-7 rounded-full ${
                  user.avatarBg || "bg-[#5a6344]"
                } text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                title={`${user.name} (${user.role})`}
              >
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden xl:block text-left text-[11px] leading-tight max-w-[120px] truncate">
                <span className="font-bold text-[#2a2a22] block truncate">{user.name}</span>
                <span className="text-[10px] text-[#7a7866] block truncate">{user.role}</span>
              </div>
              {onLogout && (
                <button
                  id="header-logout-btn"
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 rounded-full text-[#7a7866] hover:text-[#b45a3a] hover:bg-[#b45a3a]/10 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
