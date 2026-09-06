import React, { useState } from "react";
import { useGramUdyamStore } from "../store/useGramUdyamStore";
import {
  Landmark,
  Globe,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Clock,
  Compass,
  FileSpreadsheet,
  MessageSquare,
  Sparkles,
  Users,
  ChevronDown,
  Building2,
  Percent,
  Coins,
  Store,
  Scale,
  Award,
  UserPlus,
} from "lucide-react";
import { formatINR } from "../utils/calculator";

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

const FAQS = [
  {
    q: "What is the 10% Margin Money Scheme under State Channelizing Agencies?",
    a: "Under concessional schemes by National Corporations (NBCFDC, NSFDC, NMDFC) and their State Channelizing Agencies (SCAs), rural beneficiaries need to contribute only 10% of the total project cost from self-savings. The remaining 90% is funded through low-interest concessional term loans or micro finance.",
  },
  {
    q: "Do I need commercial land or heavy collateral to qualify?",
    a: "For Micro Finance projects (up to ₹1.40 Lakh), loans are collateral-free, often guaranteed through Self-Help Group (SHG) mutual accountability or simple personal guarantee. For Term Loans up to ₹50 Lakh, hypothecation of the machinery/assets purchased is standard without requiring mortgaged agricultural land.",
  },
  {
    q: "How does the Moratorium Grace Window protect my cashflow?",
    a: "Starting a rural unit takes time to purchase equipment, install power, and acquire customers. The scheme provides a 3-month (Micro Finance) or 6-month (Term Loan) moratorium where ₹0 principal is billed. You only service nominal quarterly interest, preventing early liquidity crises.",
  },
  {
    q: "Can I print this Detailed Project Report (DPR) for my local Bank or District SCA?",
    a: "Yes! GramUdyam generates an official, bank-ready Detailed Project Report formatted according to SCA guidelines, including CAPEX/OPEX cost breakups, market catchment numbers, SWOT analysis, and quarterly amortization schedules ready for submission.",
  },
  {
    q: "What languages does GramUdyam support?",
    a: "GramUdyam supports 8 Indian regional languages: English, Hindi, Bengali, Telugu, Tamil, Marathi, Odia, and Gujarati, with built-in voice narration to assist semi-literate or rural micro-entrepreneurs.",
  },
];

const SUCCESS_STORIES = [
  {
    name: "Ramesh Patel",
    trade: "Dairy Farming & Milk Chilling Unit",
    location: "Kothri Village, Ashta Block, Sehore (MP)",
    marginSaved: 100000,
    loanUnlocked: 900000,
    tenure: "5 Years",
    moratorium: "6 Months Grace",
    quote: "With just ₹1 Lakh in family savings, GramUdyam structured my ₹10 Lakh project with a 6-month moratorium. That buffer allowed my cows to reach full milk yield before any principal payment was due.",
  },
  {
    name: "Sunita Devi",
    trade: "Apparel & School Uniform Tailoring Cluster",
    location: "Ramnagar Gram Panchayat, Varanasi (UP)",
    marginSaved: 50000,
    loanUnlocked: 450000,
    tenure: "5 Years",
    moratorium: "6 Months Grace",
    quote: "The feasibility study showed 2,000 households within 7 km. We secured 4 school uniform contracts and purchased 8 heavy-duty sewing machines with 90% concessional credit.",
  },
  {
    name: "Bidyadhar Sahu",
    trade: "Mini Dal Mill & Mustard Oil Expeller",
    location: "Sinapali Village, Nuapada District (Odisha)",
    marginSaved: 75000,
    loanUnlocked: 675000,
    tenure: "5 Years",
    moratorium: "6 Months Grace",
    quote: "Farmers in our cluster used to travel 22 km to town for mustard processing. The SCA loan enabled our village unit to retain all local processing margins.",
  },
];

const LandingPage = (props) => {
  const store = useGramUdyamStore();
  const user = props.user !== undefined ? props.user : store.user;
  const onGoToDashboard = props.onGoToDashboard ?? (() => store.setIsLandingView(false));
  const onLogout = props.onLogout ?? store.logout;
  const onLoginClick = props.onLoginClick ?? (() => store.setIsAuthModalOpen(true));
  const onRegisterClick = props.onRegisterClick ?? (() => store.setIsRegisterView(true));
  const onQuickDemoLogin = props.onQuickDemoLogin ?? store.quickDemoLogin;
  const currentLang = props.currentLang ?? store.currentLang;
  const onSelectLang = props.onSelectLang ?? store.setCurrentLang;
  const [sliderMargin, setSliderMargin] = useState(100000);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Live calculation for preview
  const projectCost = sliderMargin * 10;
  const loanAmount = Math.round(projectCost * 0.9);
  const isMicro = projectCost <= 140000;
  const schemeName = isMicro ? "Micro Finance Concessional Scheme" : "Term Loan Concessional Scheme";
  const interestRate = isMicro ? "6.5%" : "8.0%";
  const moratoriumMonths = isMicro ? 3 : 6;
  const tenureYears = isMicro ? 3 : 5;

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#f8f7f2] text-[#3b3a32] font-sans selection:bg-[#d6cfbe]">
      {/* 1. Top Government / SCA Affiliation Bar */}
      <div className="bg-[#2a2a22] text-[#f8f7f2] text-xs px-4 py-2 border-b border-[#3b3a32]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Landmark className="w-3.5 h-3.5 text-[#b45a3a] shrink-0" />
            <span className="font-bold text-[#e9e4d9]">Government Concessional Credit Framework</span>
            <span className="text-[#9a9886] hidden sm:inline">•</span>
            <span className="text-[#d6cfbe] hidden md:inline">
              10% Promoter Contribution : 90% Concessional Lending via State Channelizing Agencies (SCAs)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#d6cfbe] hidden sm:inline">
              Interest: <strong className="text-white">6.5% – 8.0% p.a.</strong>
            </span>
            <span className="text-[#5a6344] hidden sm:inline">|</span>
            <span className="text-[#e9e4d9] bg-[#5a6344]/50 px-2.5 py-0.5 rounded-full">
              Moratorium Grace Period Included
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="bg-[#ffffff] border-b border-[#e0ddcc] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5a6344] text-[#f8f7f2] flex items-center justify-center font-bold shadow-xs shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#2a2a22] tracking-tight">
                  GramUdyam
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#e9e4d9] text-[#5a6344] border border-[#d6cfbe]">
                  Rural AI
                </span>
              </div>
              <p className="text-[11px] text-[#7a7866] line-clamp-1">
                Micro-Enterprise Advisory &amp; Concessional Scheme Structurer
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#5a6344]">
            <a href="#how-it-works" className="hover:text-[#2a2a22] transition-colors">
              How It Works
            </a>
            <a href="#scheme-tiers" className="hover:text-[#2a2a22] transition-colors">
              10% Margin Schemes
            </a>
            <a href="#feasibility-pillars" className="hover:text-[#2a2a22] transition-colors">
              Feasibility Engine
            </a>
            <a href="#success-stories" className="hover:text-[#2a2a22] transition-colors">
              Village Spotlights
            </a>
            <a href="#faqs" className="hover:text-[#2a2a22] transition-colors">
              FAQs
            </a>
          </nav>

          {/* Controls & Login CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#f8f7f2] border border-[#d6cfbe] text-[#3b3a32] text-xs font-medium px-2.5 py-1.5 rounded-full cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-[#5a6344]" />
              <select
                aria-label="Select Language"
                value={currentLang}
                onChange={(e) => onSelectLang && onSelectLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#3b3a32] focus:outline-none cursor-pointer pr-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* Sign In or Active Session Controls */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#e9e4d9] rounded-full border border-[#d6cfbe] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#5a6344] animate-pulse"></span>
                  <span className="font-bold text-[#2a2a22] truncate max-w-[130px]">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={onGoToDashboard}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#5a6344] hover:bg-[#4d5539] rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Open My DPR Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#5a6344] hover:bg-[#4d5539] rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="px-3.5 py-1.5 text-xs font-bold text-[#5a6344] hover:text-[#2a2a22] bg-[#ffffff] hover:bg-[#e9e4d9] border border-[#d6cfbe] rounded-full transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#f8f7f2] to-[#f8f7f2] pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-[#e0ddcc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9e4d9] border border-[#d6cfbe] text-[#5a6344] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#5a6344]" />
                <span>Empowering India's Rural Micro-Entrepreneurs</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2a2a22] tracking-tight leading-[1.15]">
                Turn <span className="text-[#b45a3a]">10% Self Savings</span> into a Thriving Village Enterprise.
              </h1>

              <p className="text-sm sm:text-base text-[#7a7866] leading-relaxed max-w-2xl">
                Unlock <strong className="text-[#2a2a22]">90% concessional credit</strong> from State Channelizing Agencies. GramUdyam tests your village catchment feasibility within 5–10 km, designs practical SWOT risk mitigations, and generates a bank-ready Detailed Project Report (DPR) with structured moratorium grace periods.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="px-6 py-3.5 rounded-2xl bg-[#5a6344] hover:bg-[#4d5539] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register as Beneficiary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onLoginClick}
                  className="px-5 py-3.5 rounded-2xl bg-[#ffffff] hover:bg-[#f8f7f2] border border-[#d6cfbe] text-[#2a2a22] text-xs sm:text-sm font-bold shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => onQuickDemoLogin && onQuickDemoLogin("entrepreneur")}
                  className="px-4 py-3.5 rounded-2xl bg-[#e9e4d9] hover:bg-[#ded8cb] text-[#5a6344] text-xs sm:text-sm font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-[#b45a3a]" />
                  <span>1-Click Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#ece7d6]">
                <div>
                  <span className="text-lg font-black text-[#b45a3a]">10% : 90%</span>
                  <span className="text-[11px] text-[#7a7866] block">Promoter to Loan Ratio</span>
                </div>
                <div>
                  <span className="text-lg font-black text-[#5a6344]">6.5% – 8.0%</span>
                  <span className="text-[11px] text-[#7a7866] block">Subsidized Interest</span>
                </div>
                <div>
                  <span className="text-lg font-black text-[#2a2a22]">3–6 Months</span>
                  <span className="text-[11px] text-[#7a7866] block">Moratorium Grace</span>
                </div>
                <div>
                  <span className="text-lg font-black text-[#5a6344]">8 Languages</span>
                  <span className="text-[11px] text-[#7a7866] block">Voice Read-Aloud</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Scheme Calculator Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-md p-6 sm:p-7 space-y-5 relative">
                <div className="flex items-center justify-between border-b border-[#f0eee4] pb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#5a6344] text-white flex items-center justify-center">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#2a2a22] uppercase tracking-wide">
                        Live 10% Margin Calculator
                      </h3>
                      <p className="text-[10px] text-[#7a7866]">Instant Government Scheme Auto-Router</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e9e4d9] text-[#5a6344]">
                    Interactive
                  </span>
                </div>

                {/* Slider Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#2a2a22]">
                      Your Available Self Savings (10% Margin):
                    </label>
                    <span className="text-base font-black text-[#b45a3a]">
                      {formatINR(sliderMargin)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={10000}
                    value={sliderMargin}
                    onChange={(e) => setSliderMargin(Number(e.target.value))}
                    className="w-full accent-[#5a6344] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#7a7866] font-medium">
                    <span>₹10,000 (Min)</span>
                    <span>₹1.00 Lakh (Example)</span>
                    <span>₹5.00 Lakhs</span>
                  </div>
                </div>

                {/* Unlocked Potential Display */}
                <div className="bg-[#fdfaf3] rounded-2xl p-4 border border-[#ece7d6] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#7a7866]">Total Feasible Project Cost (100%)</span>
                    <span className="text-lg font-black text-[#2a2a22]">{formatINR(projectCost)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#5a6344]">Concessional Loan Unlocked (90%)</span>
                    <span className="text-xl font-black text-[#5a6344]">{formatINR(loanAmount)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#e0ddcc] overflow-hidden flex">
                    <div style={{ width: "10%" }} className="bg-[#b45a3a] h-full" title="10% Margin"></div>
                    <div style={{ width: "90%" }} className="bg-[#5a6344] h-full" title="90% Concessional Loan"></div>
                  </div>
                </div>

                {/* Qualifying Scheme Details */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc]">
                    <span className="text-[10px] text-[#7a7866] uppercase block">Selected Tier</span>
                    <span className="font-bold text-[#2a2a22] block truncate">{schemeName}</span>
                  </div>
                  <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc]">
                    <span className="text-[10px] text-[#7a7866] uppercase block">Subsidized Interest</span>
                    <span className="font-bold text-[#b45a3a] block">{interestRate} p.a.</span>
                  </div>
                  <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc]">
                    <span className="text-[10px] text-[#7a7866] uppercase block">Moratorium Grace</span>
                    <span className="font-bold text-[#5a6344] block">{moratoriumMonths} Months (₹0 Principal)</span>
                  </div>
                  <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc]">
                    <span className="text-[10px] text-[#7a7866] uppercase block">Repayment Tenure</span>
                    <span className="font-bold text-[#2a2a22] block">{tenureYears} Years ({tenureYears * 4} Quarters)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onLoginClick}
                  className="w-full py-2.5 rounded-xl bg-[#5a6344] hover:bg-[#4d5539] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Build Full Feasibility Report with this Budget</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (3 Steps Roadmap) */}
      <section id="how-it-works" className="py-16 sm:py-20 border-b border-[#e0ddcc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3.5 py-1 rounded-full border border-[#d6cfbe]">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2a2a22]">
              From Village Idea to Approved Bank Capital
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7866]">
              Designed to be intuitive for first-generation micro-entrepreneurs, women SHGs, and State Channelizing Agency field staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e0ddcc] shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5a6344] text-white flex items-center justify-center font-black text-lg shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-[#2a2a22]">
                Enter Village &amp; Margin Money
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                Provide your Gram Panchayat, Block, District, and available self-cash savings (e.g. ₹50,000 or ₹1,00,000). GramUdyam instantly scales your 100% project budget.
              </p>
              <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc] text-[11px] text-[#5a6344] font-semibold">
                ✓ Auto-detects Micro Finance (≤₹1.4L) vs Term Loan (&gt;₹1.4L)
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e0ddcc] shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#b45a3a] text-white flex items-center justify-center font-black text-lg shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-[#2a2a22]">
                Instant Hyper-Local Feasibility
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                GramUdyam maps your 5–10 km catchment, assesses local consumer households, flags seasonal demand spikes, identifies unserved niches, and sets competitive moats.
              </p>
              <div className="bg-[#fdfaf3] p-3 rounded-xl border border-[#ece7d6] text-[11px] text-[#b45a3a] font-semibold">
                ✓ Includes Udhaar (credit) containment &amp; SWOT mitigation
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-7 border border-[#e0ddcc] shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2a2a22] text-white flex items-center justify-center font-black text-lg shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-[#2a2a22]">
                Print Bank-Ready DPR &amp; Apply
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                Download or print an official Detailed Project Report (DPR) with quarterly repayment schedules, moratorium interest tables, and signatures ready for the District SCA desk.
              </p>
              <div className="bg-[#f8f7f2] p-3 rounded-xl border border-[#e0ddcc] text-[11px] text-[#2a2a22] font-semibold">
                ✓ 70% CAPEX vs 30% OPEX compliant with credit rules
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Concessional Scheme Architecture (Tier 1 vs Tier 2) */}
      <section id="scheme-tiers" className="py-16 sm:py-20 bg-[#ffffff] border-b border-[#e0ddcc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b45a3a] bg-[#b45a3a]/10 px-3.5 py-1 rounded-full border border-[#b45a3a]/25">
              Concessional Lending Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2a2a22]">
              Two Clear Scheme Tiers Aligned with Your Capital
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7866]">
              Subsidized credit channeled via NBCFDC, NSFDC, NMDFC &amp; State Corporations directly to grassroot entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier 1: Micro Finance */}
            <div className="bg-[#fdfaf3] rounded-3xl p-7 border border-[#ece7d6] space-y-5 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#b45a3a] bg-[#b45a3a]/15 px-3 py-1 rounded-full">
                  Tier 1: Micro Finance
                </span>
                <span className="text-xs font-bold text-[#7a7866]">Low Margin Required</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2a2a22]">
                  Projects Up to ₹1,40,000
                </h3>
                <p className="text-xs text-[#7a7866] mt-1">
                  Ideal for village tailoring, vegetable vending cart, mobile repairs, poultry, or small kirana shops.
                </p>
              </div>

              <div className="space-y-3 text-xs border-y border-[#ece7d6] py-4">
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Promoter Contribution (10%):</span>
                  <strong className="text-[#b45a3a]">Up to ₹14,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Concessional Loan (90%):</span>
                  <strong className="text-[#5a6344]">Up to ₹1,26,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Interest Rate:</span>
                  <strong className="text-[#2a2a22]">6.5% per annum</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Moratorium Window:</span>
                  <strong className="text-[#5a6344]">3 Months (1 Quarter ₹0 Principal)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Repayment Tenure:</span>
                  <strong className="text-[#2a2a22]">3 Years (12 Quarters)</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoginClick}
                className="w-full py-2.5 rounded-2xl bg-[#b45a3a] hover:bg-[#a04e32] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Calculate Micro Finance Plan
              </button>
            </div>

            {/* Tier 2: Term Loan */}
            <div className="bg-[#f8f7f2] rounded-3xl p-7 border border-[#e0ddcc] space-y-5 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3 py-1 rounded-full border border-[#d6cfbe]">
                  Tier 2: Term Loan Scheme
                </span>
                <span className="text-xs font-bold text-[#5a6344]">Growth &amp; Machinery</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2a2a22]">
                  Projects ₹1,40,000 to ₹50,00,000
                </h3>
                <p className="text-xs text-[#7a7866] mt-1">
                  Ideal for dairy chilling units, flour &amp; oil mills, light engineering, bio-fertilizer, and agro-service centers.
                </p>
              </div>

              <div className="space-y-3 text-xs border-y border-[#e0ddcc] py-4">
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Promoter Contribution (10%):</span>
                  <strong className="text-[#b45a3a]">₹14,000 to ₹5,00,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Concessional Loan (90%):</span>
                  <strong className="text-[#5a6344]">₹1,26,000 to ₹45,00,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Interest Rate:</span>
                  <strong className="text-[#2a2a22]">8.0% per annum</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Moratorium Window:</span>
                  <strong className="text-[#5a6344]">6 Months (2 Quarters ₹0 Principal)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a7866]">Repayment Tenure:</span>
                  <strong className="text-[#2a2a22]">5 Years (20 Quarters)</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoginClick}
                className="w-full py-2.5 rounded-2xl bg-[#5a6344] hover:bg-[#4d5539] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Calculate Term Loan Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Rural Enterprises Fail & How GramUdyam Protects You */}
      <section id="feasibility-pillars" className="py-16 sm:py-20 border-b border-[#e0ddcc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3.5 py-1 rounded-full border border-[#d6cfbe]">
              Solving Real Rural Pitfalls
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2a2a22]">
              Built Specifically for Rural Economic Realities
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7866]">
              Unlike generic urban business templates, GramUdyam addresses the real causes of village enterprise sickness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e0ddcc] space-y-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2a2a22]">
                Udhaar (Credit) Default Containment
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                GramUdyam incorporates strict village credit protocols (₹500 individual caps, 7-day settlement, digital UPI discounts) so uncollected local receivables never starve your operational liquidity.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e0ddcc] space-y-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2a2a22]">
                Quarterly Harvest-Synced Repayment
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                Rural income is cyclical, not monthly. Our amortization is structured in 4 quarterly installments per year, aligning debt servicing with Rabi, Kharif, and festival cash influxes.
              </p>
            </div>

            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e0ddcc] space-y-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#2a2a22]">
                70% CAPEX vs 30% OPEX Discipline
              </h3>
              <p className="text-xs text-[#7a7866] leading-relaxed">
                Never exhaust your entire loan on machinery with zero money left for raw materials. The system enforces a mandatory 30% working capital buffer to absorb initial startup gestation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Success Stories / Village Spotlights */}
      <section id="success-stories" className="py-16 sm:py-20 bg-[#ffffff] border-b border-[#e0ddcc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b45a3a] bg-[#b45a3a]/10 px-3.5 py-1 rounded-full border border-[#b45a3a]/25">
              Grassroots Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2a2a22]">
              Real Stories of Concessional Lending Success
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7866]">
              Entrepreneurs who converted modest self-savings into resilient, income-generating local enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="bg-[#fdfaf3] rounded-3xl p-6 border border-[#ece7d6] flex flex-col justify-between space-y-4 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#5a6344] bg-[#e9e4d9] px-2.5 py-0.5 rounded-full">
                      {story.trade}
                    </span>
                    <Award className="w-4 h-4 text-[#b45a3a]" />
                  </div>
                  <h3 className="text-base font-bold text-[#2a2a22]">{story.name}</h3>
                  <p className="text-xs text-[#7a7866]">{story.location}</p>
                  <p className="text-xs text-[#3b3a32] italic leading-relaxed pt-2">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ece7d6] grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#7a7866] block">Promoter Margin:</span>
                    <strong className="text-[#b45a3a]">{formatINR(story.marginSaved)}</strong>
                  </div>
                  <div>
                    <span className="text-[#7a7866] block">SCA Loan Unlocked:</span>
                    <strong className="text-[#5a6344]">{formatINR(story.loanUnlocked)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (Accordion) */}
      <section id="faqs" className="py-16 sm:py-20 border-b border-[#e0ddcc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3.5 py-1 rounded-full border border-[#d6cfbe]">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2a2a22]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#7a7866]">
              Clear guidelines on margin money, collateral exemptions, and District Channelizing Agency procedures.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#ffffff] rounded-2xl border border-[#e0ddcc] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#2a2a22]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5a6344] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-[#7a7866] leading-relaxed border-t border-[#f0eee4] bg-[#fdfaf3]">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-[#5a6344] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#e9e4d9] text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>State Channelizing Agency Desk Ready</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            Ready to Plan Your Rural Micro-Enterprise?
          </h2>

          <p className="text-xs sm:text-sm text-[#e9e4d9] max-w-xl mx-auto leading-relaxed">
            Join thousands of village entrepreneurs who built sustainable livelihoods with 10% self-savings, 90% concessional credit, and automated bank-ready DPRs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onLoginClick}
              className="px-7 py-3.5 rounded-2xl bg-[#b45a3a] hover:bg-[#a04e32] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Sign In / Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onQuickDemoLogin && onQuickDemoLogin("officer")}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#e9e4d9]" />
              <span>Officer Verification Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. Institutional Footer */}
      <footer className="bg-[#2a2a22] text-[#d6cfbe] py-10 border-t border-[#3b3a32] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#5a6344] text-white flex items-center justify-center font-bold">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">GramUdyam Advisory &amp; Scheme Structurer</span>
                <p className="text-[11px] text-[#9a9886]">Empowering rural self-reliance across 700+ Indian districts</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={onLoginClick}
                className="hover:text-white underline underline-offset-2"
              >
                Sign In
              </button>
              <a href="#scheme-tiers" className="hover:text-white underline underline-offset-2">
                Concessional Schemes
              </a>
              <a href="#how-it-works" className="hover:text-white underline underline-offset-2">
                Roadmap
              </a>
            </div>
          </div>

          <div className="border-t border-[#3b3a32] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9a9886]">
            <p>
              Adheres to 10% Margin Money &amp; 90% Loan Norms of NBCFDC, NSFDC, NMDFC &amp; State Channelizing Agencies (SCAs).
            </p>
            <p>© {new Date().getFullYear()} GramUdyam. Built for rural entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;