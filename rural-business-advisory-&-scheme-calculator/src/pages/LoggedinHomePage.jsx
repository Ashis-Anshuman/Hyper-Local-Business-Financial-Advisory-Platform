import React, { useState, useEffect, useMemo } from "react";
import { Header } from "../components/Header";
import { InputPanel } from "../components/InputPanel";
import { SchemeSummaryCard } from "../components/SchemeSummaryCard";
import { FinancialBreakdown } from "../components/FinancialBreakdown";
import { FeasibilityReportView } from "../components/FeasibilityReportView";
import { AdvisoryChatModal } from "../components/AdvisoryChatModal";
import { PrintableDPR } from "../components/PrintableDPR";
import { calculateSchemeDetails, formatINR } from "../utils/calculator";

import { TRANSLATIONS } from "../data/translations";
import {
  Landmark,
  FileSpreadsheet,
  MessageSquare,
} from "lucide-react";

export default function LoggedinHomePage() {
  const [currentLang, setCurrentLang] = useState("en");

  // User input state
  const [inputs, setInputs] = useState({
    state: "Madhya Pradesh",
    district: "Sehore",
    block: "Ashta",
    village: "Kothri",
    availableMargin: 100000, // ₹1,00,000 -> ₹10 Lakhs (Matches exact prompt example!)
    businessCategory: "Dairy Farming & Milk Chilling Unit",
    customDetails: "Located near state highway milk tanker collection route. 2 village self-help groups active.",
    language: "en",
  });

  // Calculate live financial scheme details
  const scheme = useMemo(() => {
    return calculateSchemeDetails(inputs.availableMargin);
  }, [inputs.availableMargin]);

  // Feasibility report state
  const [report, setReport] = useState({
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

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync inputs language when user changes language
  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setInputs((prev) => ({ ...prev, language: lang }));
  };

  // Generate Report Handler
  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFeasibilityReport({
        ...inputs,
        language: currentLang,
      });

      if (response.success && response.data) {
        setReport(response.data);
      }
    } catch (e) {
      console.error("Failed to generate report:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Narration Toggle
  const handleToggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Voice speech synthesis is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
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
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-[#f8f7f2] text-[#3b3a32] flex flex-col font-sans selection:bg-[#d6cfbe]">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleLanguageChange}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        onPrintDpr={() => setIsPrintModalOpen(true)}
        onOpenChat={() => setIsAdvisorChatOpen(true)}
      />

      {/* Hero Strip */}
      <div className="bg-[#5a6344] text-[#f8f7f2] border-b border-[#4d5539] py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b45a3a] text-white uppercase tracking-wide">
                10% Margin Money Scheme
              </span>
              <span className="text-[#e9e4d9] text-xs hidden sm:inline font-medium">
                State Channelizing Agencies (SCAs) Concessional Lending
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              AI-Driven Rural Micro-Enterprise Advisory &amp; Financial Structuring
            </h2>
            <p className="text-xs sm:text-sm text-[#e9e4d9]/90 max-w-3xl mt-1">
              Eliminating rural business failure through hyper-local market research, SWOT analysis, and automated concessional credit structuring with quarterly moratorium schedules.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsAdvisorChatOpen(true)}
              className="bg-[#b45a3a] hover:bg-[#a14e30] border border-[#a14e30] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#f8f7f2]" />
              <span>Ask Advisor Mitra</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="bg-[#f8f7f2] hover:bg-[#e9e4d9] text-[#3b3a32] border border-[#d6cfbe] text-xs font-bold px-4 py-2.5 rounded-full shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#5a6344]" />
              <span>DPR for Bank</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* Module 1: Input Parameters */}
        <InputPanel
          inputs={inputs}
          onChange={(updated) => setInputs((prev) => ({ ...prev, ...updated }))}
          onSubmit={handleGenerateReport}
          isLoading={isLoading}
          currentLang={currentLang}
        />

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between border-b border-[#e0ddcc] pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === "all"
                  ? "bg-[#5a6344] text-white shadow-xs"
                  : "bg-[#ffffff] text-[#7a7866] hover:bg-[#e9e4d9] border border-[#e0ddcc]"
              }`}
            >
              Complete Analysis (All Modules)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("scheme")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === "scheme"
                  ? "bg-[#5a6344] text-white shadow-xs"
                  : "bg-[#ffffff] text-[#7a7866] hover:bg-[#e9e4d9] border border-[#e0ddcc]"
              }`}
            >
              Module 2: Smart Financial Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("feasibility")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                activeTab === "feasibility"
                  ? "bg-[#5a6344] text-white shadow-xs"
                  : "bg-[#ffffff] text-[#7a7866] hover:bg-[#e9e4d9] border border-[#e0ddcc]"
              }`}
            >
              Module 1: Hyper-Local Feasibility
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#7a7866]">
            <span>Location:</span>
            <strong className="text-[#2a2a22]">
              {inputs.village}, {inputs.block} ({inputs.district})
            </strong>
          </div>
        </div>

        {/* Module 2: Smart Financial Calculator & Scheme Router */}
        {(activeTab === "all" || activeTab === "scheme") && (
          <div className="space-y-6">
            <SchemeSummaryCard scheme={scheme} currentLang={currentLang} />
            {/* <FinancialBreakdown
              scheme={scheme}
              currentLang={currentLang}
              capexItems={report.capexItems}
              opexItems={report.opexItems}
            /> */}
          </div>
        )}

        {/* Module 1: Hyper-Local Business Feasibility Report */}
        {(activeTab === "all" || activeTab === "feasibility") && (
          <FeasibilityReportView report={report} inputs={inputs} currentLang={currentLang} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] border-t border-[#e0ddcc] py-6 px-4 sm:px-6 text-center text-xs text-[#7a7866] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#5a6344]" />
            <span className="font-semibold text-[#2a2a22]">
              GramUdyam Advisory &amp; Concessional Scheme Structurer
            </span>
          </div>
          <p className="text-[11px] text-[#7a7866]">
            Compliant with NBCFDC, NSFDC, NMDFC &amp; State Channelizing Agency 10% Margin / 90% Loan Norms.
          </p>
          <div className="flex items-center gap-4 text-[#7a7866] text-xs">
            <button
              type="button"
              onClick={() => setIsAdvisorChatOpen(true)}
              className="hover:text-[#5a6344] underline underline-offset-2 cursor-pointer"
            >
              Mitra AI Help
            </button>
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="hover:text-[#5a6344] underline underline-offset-2 cursor-pointer"
            >
              Print Bank DPR
            </button>
          </div>
        </div>
      </footer>

      {/* Advisor Chat Modal */}
      <AdvisoryChatModal
        isOpen={isAdvisorChatOpen}
        onClose={() => setIsAdvisorChatOpen(false)}
        context={{ inputs, scheme, reportSummary: report.executiveSummary }}
        currentLang={currentLang}
      />

      {/* Printable Detailed Project Report Modal */}
      <PrintableDPR
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        inputs={inputs}
        scheme={scheme}
        report={report}
      />
    </div>
  );
}
