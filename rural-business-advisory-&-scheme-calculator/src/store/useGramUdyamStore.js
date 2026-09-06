import { create } from "zustand";
import { calculateSchemeDetails, formatINR } from "../utils/calculator";
// import { fetchFeasibilityReport } from "../services/api";
import { DEMO_ACCOUNTS } from "../components/AuthModal";

// Initial default inputs
const DEFAULT_INPUTS = {
  state: "Madhya Pradesh",
  district: "Sehore",
  block: "Ashta",
  village: "Kothri",
  availableMargin: 100000, // ₹1,00,000 -> ₹10 Lakhs (Matches 10% Margin Scheme)
  businessCategory: "Dairy Farming & Milk Chilling Unit",
  customDetails: "Located near state highway milk tanker collection route. 2 village self-help groups active.",
  language: "en",
};

// Initial default feasibility report
const createDefaultReport = (inputs, scheme) => ({
  feasibilityScore: 88,
  viabilityRating: "High Viability",
  executiveSummary: `The proposed ${inputs.businessCategory} unit in ${inputs.village} (Block ${inputs.block}, ${inputs.district}) demonstrates strong economic viability. With a total project outlay of ₹${(inputs.availableMargin * 10).toLocaleString("en-IN")} structured with 10% promoter contribution and 90% concessional credit, the enterprise serves an addressable catchment of ~10,500 residents within a 7 km radius with high daily consumption demand.`,
  marketReach: {
    radiusKm: 7,
    estimatedConsumers: 10500,
    targetHouseholds: 2020,
    primaryDistributionChannels: [
      {
        channel: "Bi-Weekly Gram Panchayat Haat",
        description: "Direct cash sales at regional cluster bazaars capturing floating rural footfall with immediate daily cash liquidity.",
        viabilityScore: 94,
      },
      {
        channel: "Village Center Base & Doorstep Morning Supply",
        description: `Direct fulfillment to residential clusters in ${inputs.village} and 3 adjacent hamlets.`,
        viabilityScore: 89,
      },
      {
        channel: "District Dairy Cooperative / FPO Bulk Chilling",
        description: "Contracted off-take agreement with local milk union ensuring minimum assured rate and zero inventory wastage.",
        viabilityScore: 84,
      },
    ],
    ruralLogisticsNote: `Road connectivity along ${inputs.block} arterial road allows cost-effective two-wheeler or e-loader delivery, keeping freight under 3.5% of gross revenue.`,
  },
  opportunityAnalysis: {
    underservedNiches: [
      {
        title: "Fresh Chilled Country Paneer & Desi Ghee",
        explanation: "High local festive and wedding demand currently satisfied only by sub-division town shops at steep markups.",
        potentialMargin: "25% – 32%",
      },
      {
        title: "Pre-Booked Bulk Supply for Harvest & Festival Seasons",
        explanation: "Guaranteed cash bookings during Rabi and Kharif post-harvest cycles when liquidity peaks in the village.",
        potentialMargin: "28% – 35%",
      },
    ],
    seasonalOpportunities: [
      "Post-harvest festival cycles (Diwali, Makar Sankranti, Chhath, local melas) experiencing a 2.5x surge in milk and sweet demand.",
      "Summer wedding season driving high-margin bulk catering orders for curd and ghee.",
      "Monsoon buffer stocking where outside road access to distant towns is temporarily slowed.",
    ],
    valueAdditionPossibilities: [
      "Setting up a small solar-powered milk analyzer to provide instant transparent fat testing to local cow owners.",
      "Packaging in eco-friendly tamper-evident pouches with local village branding to build consumer trust.",
    ],
  },
  swot: {
    strengths: [
      `Low fixed overheads operating within ${inputs.village} with zero commercial town rent.`,
      "Direct personal trust and community kinship reducing marketing acquisition costs.",
      `Eligible for 90% concessional credit under ${scheme.schemeName} with structured moratorium.`,
      "Immediate daily cash collections providing steady operational liquidity.",
    ],
    weaknesses: [
      "Working capital sensitivity during the initial 45 days before steady customer retention.",
      "Initial dependence on family labor for day-to-day operations and feeding.",
      "Need for consistent electricity/solar backup for chilling perishable stock.",
    ],
    opportunities: [
      `Government SC/ST/OBC/Minority channelizing agency interest subsidy reducing cost of capital.`,
      "Tie-ups with local Self-Help Groups (SHGs / NRLM) for shared micro-distribution.",
      "Expanding product assortment into curd, flavored milk, and sweets as reserves accumulate.",
    ],
    threats: [
      "Uncontrolled requests for village credit (Udhaar) threatening daily operational cash flow.",
      "Seasonal fluctuations in cattle feed and fodder prices from regional markets.",
      "Monsoon rain disruption on unpaved village access roads.",
    ],
  },
  threatsIdentification: [
    {
      risk: "Excessive Village Credit (Udhaar Default)",
      impact: "High",
      mitigationStrategy: "Enforce strict credit ceiling: no customer credit exceeding ₹500, with clear 7-day settlement terms and a 2% discount incentive for digital UPI/cash payments.",
    },
    {
      risk: "Seasonal Cashflow Slump during Sowing Season",
      impact: "Medium",
      mitigationStrategy: "Utilize the loan moratorium buffer to maintain 45 days of operational working capital reserve in the business account.",
    },
    {
      risk: "Perishable Spoilage & Rural Power Outages",
      impact: "Medium",
      mitigationStrategy: "Deploy insulated stainless steel milk cans and small solar-inverter backup for essential chilling during load-shedding hours.",
    },
  ],
  competitorMapping: {
    estimatedCompetitorDensityInBlock: 4,
    saturationLevel: "Moderate",
    typicalWeaknessesOfLocalCompetitors: [
      "Erratic shop operating hours causing customer frustration.",
      "Inconsistent fat/SNF quality and lack of hygienic stainless steel handling.",
      "Frequent stock-outs of in-demand items forcing buyers to travel to sub-division markets.",
    ],
    moatAndDifferentiationAdvice: `Ensure disciplined 6:00 AM to 8:30 PM availability, provide transparent fat testing and fair pricing, and offer morning doorstep delivery for senior citizens and women within ${inputs.village}.`,
  },
  productMarketValue: {
    suggestedPricingTable: [
      {
        productOrService: "Full Cream Cow Milk (Per Liter)",
        localMarketRate: "₹55 - ₹60",
        proposedPrice: "₹56",
        marginPercent: "18%",
      },
      {
        productOrService: "Fresh Country Paneer (Per Kg)",
        localMarketRate: "₹340 - ₹380",
        proposedPrice: "₹350",
        marginPercent: "28%",
      },
      {
        productOrService: "Curd / Spiced Buttermilk (Per Liter)",
        localMarketRate: "₹40 - ₹45",
        proposedPrice: "₹42",
        marginPercent: "32%",
      },
    ],
    regionalPurchasingPowerContext: `Daily agricultural wage rates in rural ${inputs.district} average ₹320–₹420. Pricing must prioritize accessible daily ticket sizes (₹20 to ₹80 units) to align with daily cashflow cycles.`,
    paymentTermsAdvice: "Accept UPI (BHIM, PhonePe, GooglePay) alongside cash. Offer a small complimentary loyalty card or bonus curd pack for upfront monthly subscription payments.",
  },
  nextStepsActionPlan: [
    "Obtain Gram Panchayat No-Objection Certificate (NOC) or trade identification verification.",
    "Assemble Aadhaar, category certificate (if applicable for SCA quota), and 6-month bank passbook.",
    "Submit this Detailed Project Report (DPR) with the 10% Margin Bank Draft to the District SCA Office / Channelizing Agency Manager.",
    "Upon sanction, order capital equipment with genuine GST vendor invoices as mandated by the funding agency.",
    "Commence operations during the moratorium window to establish steady cashflow before the first quarterly repayment installment.",
  ],
});

// Helper to safely load stored user from localStorage
const getSavedUser = () => {
  try {
    const saved = localStorage.getItem("gramudyam_user");
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to read user from localStorage:", e);
    return null;
  }
};

const initialUser = getSavedUser();
const initialScheme = calculateSchemeDetails(DEFAULT_INPUTS.availableMargin);
const initialReport = createDefaultReport(DEFAULT_INPUTS, initialScheme);

export const useGramUdyamStore = create((set, get) => ({
  // === GLOBAL STATE ===
  user: initialUser,
  isLandingView: !initialUser,
  isRegisterView: false,
  isAuthModalOpen: false,
  currentLang: "en",
  inputs: DEFAULT_INPUTS,
  scheme: initialScheme,
  report: initialReport,
  isLoading: false,
  activeTab: "all", // "all" | "scheme" | "feasibility"
  isAdvisorChatOpen: false,
  isPrintModalOpen: false,
  isSpeaking: false,

  // === ACTIONS ===

  // Language Actions
  setCurrentLang: (lang) => {
    set((state) => ({
      currentLang: lang,
      inputs: { ...state.inputs, language: lang },
    }));
  },

  // Auth Actions
  setUser: (user) => set({ user }),

  login: (userData) => {
    try {
      localStorage.setItem("gramudyam_user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }

    set((state) => {
      const updatedInputs = userData
        ? {
            ...state.inputs,
            village: userData.village || state.inputs.village,
            block: userData.block || state.inputs.block,
            district: userData.district || state.inputs.district,
            state: userData.state || state.inputs.state,
            businessCategory: userData.businessCategory || state.inputs.businessCategory,
            availableMargin: Number(userData.availableMargin) || state.inputs.availableMargin,
          }
        : state.inputs;

      const updatedScheme = calculateSchemeDetails(updatedInputs.availableMargin);

      return {
        user: userData,
        inputs: updatedInputs,
        scheme: updatedScheme,
        isLandingView: false,
        isRegisterView: false,
        isAuthModalOpen: false,
      };
    });
  },

  registerUser: (formData) => {
    const newUser = {
      id: "reg-user-" + Date.now(),
      name: formData.name,
      dob: formData.dob,
      age: formData.age,
      mobile: formData.mobile,
      email: formData.email,
      state: formData.state,
      district: formData.district,
      block: formData.block,
      gramPanchayat: formData.gramPanchayat,
      village: formData.village,
      pincode: formData.pincode,
      role: "Registered Beneficiary",
      roleKey: "entrepreneur",
      businessCategory: formData.businessCategory || "Dairy Farming & Milk Chilling Unit",
      availableMargin: Number(formData.availableMargin) || 100000,
      avatarBg: "bg-[#5a6344]",
      badge: `Registered (PIN: ${formData.pincode})`,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("gramudyam_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to store registered user:", e);
    }

    set((state) => {
      const updatedInputs = {
        ...state.inputs,
        village: newUser.village || state.inputs.village,
        block: newUser.block || state.inputs.block,
        district: newUser.district || state.inputs.district,
        state: newUser.state || state.inputs.state,
        businessCategory: newUser.businessCategory || state.inputs.businessCategory,
        availableMargin: newUser.availableMargin || state.inputs.availableMargin,
      };
      const updatedScheme = calculateSchemeDetails(updatedInputs.availableMargin);

      return {
        user: newUser,
        inputs: updatedInputs,
        scheme: updatedScheme,
        isRegisterView: false,
        isLandingView: false,
        isAuthModalOpen: false,
      };
    });

    return newUser;
  },

  logout: () => {
    try {
      localStorage.removeItem("gramudyam_user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
    set({
      user: null,
      isLandingView: true,
      isRegisterView: false,
      isAuthModalOpen: false,
    });
  },

  quickDemoLogin: (roleKey = "entrepreneur") => {
    const demo = DEMO_ACCOUNTS.find((a) => a.roleKey === roleKey) || DEMO_ACCOUNTS[0];
    get().login(demo);
  },

  // Navigation & Modals
  setIsLandingView: (isLandingView) => set({ isLandingView, isRegisterView: false }),
  setIsRegisterView: (isRegisterView) => set({ isRegisterView, isLandingView: false }),
  setIsAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setIsAdvisorChatOpen: (isOpen) => set({ isAdvisorChatOpen: isOpen }),
  setIsPrintModalOpen: (isOpen) => set({ isPrintModalOpen: isOpen }),

  // Input & Scheme Actions
  setInputs: (updater) => {
    set((state) => {
      const newInputs = typeof updater === "function" ? updater(state.inputs) : { ...state.inputs, ...updater };
      // Recalculate scheme when availableMargin changes
      const newScheme = newInputs.availableMargin !== state.inputs.availableMargin
        ? calculateSchemeDetails(newInputs.availableMargin)
        : state.scheme;

      return {
        inputs: newInputs,
        scheme: newScheme,
      };
    });
  },

  setReport: (report) => set({ report }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Asynchronous Report Generation Action
  generateReport: async () => {
    const { inputs, currentLang } = get();
    set({ isLoading: true });

    try {
      const response = await fetchFeasibilityReport({
        ...inputs,
        language: currentLang,
      });

      if (response && response.success && response.data) {
        set({ report: response.data });
      }
    } catch (error) {
      console.error("Feasibility report generation failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Voice Narration Action
  toggleSpeech: () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Voice speech synthesis is not supported on this browser.");
      return;
    }

    const { isSpeaking, inputs, scheme, report } = get();

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      set({ isSpeaking: false });
      return;
    }

    const narrationText = `
      Namaste. For your proposed ${inputs.businessCategory} enterprise in ${inputs.village}, Block ${inputs.block}.
      Your available margin of ${formatINR(inputs.availableMargin)} unlocks a total project cost of ${formatINR(scheme.feasibleProjectCost)},
      and makes you eligible for a ${formatINR(scheme.loanEligibility)} concessional loan under the ${scheme.schemeName}.
      The loan features a subsidized interest rate of ${scheme.interestRateAnnual} percent with a ${scheme.moratoriumMonths} months moratorium grace period where no principal is due.
      The local market feasibility score is ${report.feasibilityScore} out of 100 with an addressable reach of ${report.marketReach.estimatedConsumers} people across a 7 kilometer radius.
    `;

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => set({ isSpeaking: false });
    utterance.onerror = () => set({ isSpeaking: false });

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    set({ isSpeaking: true });
  },

  stopSpeech: () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      set({ isSpeaking: false });
    }
  },
}));
