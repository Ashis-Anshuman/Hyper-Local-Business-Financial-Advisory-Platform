import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAI = null;
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Advisory generation endpoint
app.post("/api/advisory/generate", async (req, res) => {
  try {
    const {
      state = "Madhya Pradesh",
      district = "Sehore",
      block = "Ashta",
      village = "Kothri",
      availableMargin = 100000,
      businessCategory = "Dairy Farming",
      customDetails = "",
      language = "en",
    } = req.body;

    const marginNum = Number(availableMargin) || 10000;
    const projectCost = marginNum * 10;
    const isMicro = projectCost <= 140000;
    const maxLoanAllowed = isMicro
      ? Math.min(125000, projectCost * 0.9)
      : Math.min(4500000, projectCost * 0.9);

    const client = getGenAI();

    const languagePromptMap = {
      en: "English",
      hi: "Hindi (हिंदी) - use clear, accessible Devanagari Hindi suitable for rural entrepreneurs",
      bn: "Bengali (বাংলা)",
      te: "Telugu (తెలుగు)",
      ta: "Tamil (தமிழ்)",
      mr: "Marathi (मराठी)",
      or: "Odia (ଓଡ଼ିଆ)",
      gu: "Gujarati (ગુજરાતી)",
    };
    const targetLang = languagePromptMap[language] || "English";

    if (client) {
      const prompt = `
You are an expert Rural Micro-Enterprise Business Advisor and Concessional Credit Specialist working under State Channelizing Agencies (SCAs) and National Channelizing Agencies (NBCFDC, NSFDC, NMDFC).
Analyze this rural micro-entrepreneur's proposal and output a JSON document matching the EXACT required format.

ENTREPRENEUR PROFILE:
- Location: Village/Gram Panchayat: "${village}", Block: "${block}", District: "${district}", State: "${state}"
- Available Margin Capital (10% self-contribution): ₹${marginNum.toLocaleString("en-IN")}
- Total Feasible Project Cost (100%): ₹${projectCost.toLocaleString("en-IN")}
- Concessional Loan Eligibility (90%): ₹${maxLoanAllowed.toLocaleString("en-IN")}
- Applicable Scheme Tier: ${isMicro ? "Micro Finance Scheme (up to ₹1.40L, 6.5% interest, 3-yr tenure, 3-mo moratorium)" : "Term Loan Scheme (₹1.40L to ₹50L, 8.0% interest, 7-yr tenure, 6-mo moratorium)"}
- Proposed Business: "${businessCategory}"
- Additional context provided: "${customDetails}"
- Response Language Requirement: Write ALL analytical texts, titles, descriptions, and recommendations in ${targetLang}. Technical numbers and currency should remain in Indian Rupee format (₹).

MODULE REQUIREMENTS:
1. Market Reach:
   - Estimate immediate consumer base within 5–10 km radius of ${village} / ${block}.
   - Primary distribution channels (e.g. Weekly Haat bazaar, village door-to-door, local dairy cooperative / FPO, roadside stall, nearby town mandi).
   - Rural logistics advice.
2. Opportunity Analysis:
   - Highlighting unserved or underserved niches in ${businessCategory} in this block.
   - Value addition possibilities (e.g. converting raw milk to paneer/ghee, custom tailoring, packaging local grains).
   - Seasonal demand peaks (festivals, harvests, wedding seasons).
3. General Business Analysis (SWOT):
   - 3-4 Strengths tailored to this rural location and ₹${projectCost.toLocaleString("en-IN")} budget.
   - 3-4 Weaknesses (e.g., working capital constraints, single-person dependence).
   - 3-4 Opportunities (e.g., government subsidies, zero local competition for quality grade).
   - 3-4 Threats (e.g., cattle disease, power cuts, delayed payments from middlemen).
4. Threats Identification & Mitigation:
   - 3 specific localized threats (supply chain bottlenecks, seasonal cashflow crunches, reliance on single buyer).
   - Detailed practical mitigation steps.
5. Competitor Mapping:
   - Localized demographic density: estimated similar enterprises in the block.
   - Saturation level ("Low", "Moderate", or "High").
   - Weaknesses of existing local players and differentiation strategy to win customers.
6. Product Market Value & Pricing:
   - Suggested pricing table for 3-4 core goods/services comparing typical local informal rate vs proposed fair rate with profit margin.
   - Regional purchasing power context.
   - Crucial credit policy advice (e.g., how to handle village credit 'Udhaar' without losing goodwill).
7. Executive Summary & Action Steps:
   - Clear feasibility score (out of 100), viability rating ("High Viability", "Medium Viability"), and 5 immediate step-by-step actions for applying through the SCA.

Return ONLY a valid JSON object matching this schema:
{
  "feasibilityScore": number (e.g. 88),
  "viabilityRating": string,
  "executiveSummary": string,
  "marketReach": {
    "radiusKm": number,
    "estimatedConsumers": number,
    "targetHouseholds": number,
    "primaryDistributionChannels": [
      { "channel": string, "description": string, "viabilityScore": number }
    ],
    "ruralLogisticsNote": string
  },
  "opportunityAnalysis": {
    "underservedNiches": [
      { "title": string, "explanation": string, "potentialMargin": string }
    ],
    "seasonalOpportunities": [string],
    "valueAdditionPossibilities": [string]
  },
  "swot": {
    "strengths": [string],
    "weaknesses": [string],
    "opportunities": [string],
    "threats": [string]
  },
  "threatsIdentification": [
    { "risk": string, "impact": "High" | "Medium" | "Low", "mitigationStrategy": string }
  ],
  "competitorMapping": {
    "estimatedCompetitorDensityInBlock": number,
    "saturationLevel": "Low" | "Moderate" | "High",
    "typicalWeaknessesOfLocalCompetitors": [string],
    "moatAndDifferentiationAdvice": string
  },
  "productMarketValue": {
    "suggestedPricingTable": [
      { "productOrService": string, "localMarketRate": string, "proposedPrice": string, "marginPercent": string }
    ],
    "regionalPurchasingPowerContext": string,
    "paymentTermsAdvice": string
  },
  "nextStepsActionPlan": [string],
  "capexItems": [
    { "item": string, "amount": number, "description": string }
  ],
  "opexItems": [
    { "item": string, "amount": number, "description": string }
  ]
}
`;

      const aiResponse = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const text = aiResponse.text?.trim() || "";
      let parsed = null;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        console.warn("Could not parse JSON directly from Gemini, falling back to clean regex", e);
        const match = text.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
      }

      if (parsed) {
        return res.json({
          success: true,
          data: parsed,
          source: "gemini",
        });
      }
    }

    // Fallback localized rule-based intelligence generator (ensures 100% reliable responses in all environments)
    const fallbackReport = generateFallbackReport({
      state,
      district,
      block,
      village,
      availableMargin: marginNum,
      projectCost,
      maxLoanAllowed,
      businessCategory,
      language,
    });

    return res.json({
      success: true,
      data: fallbackReport,
      source: "local-engine",
    });
  } catch (error) {
    console.error("Error in /api/advisory/generate:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate business feasibility report",
    });
  }
});

// Follow-up Advisor Chat
app.post("/api/advisory/chat", async (req, res) => {
  try {
    const { question, context, history = [], language = "en" } = req.body;
    const client = getGenAI();

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (client) {
      const prompt = `
You are GramUdyam Mitra, an empathetic, highly knowledgeable advisor for rural micro-entrepreneurs in India applying for concessional loans (Micro Finance or Term Loan schemes via State Channelizing Agencies).
Answer the user's question directly, practically, and simply in their selected language (${language}).

CURRENT BUSINESS CONTEXT:
${JSON.stringify(context, null, 2)}

USER QUESTION:
"${question}"

Provide actionable, respectful guidance. Explain financial concepts (moratorium, margin money, working capital vs machinery, SCA procedures) in plain, reassuring terms without bureaucratic jargon.
`;

      const aiResponse = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.5,
        },
      });

      return res.json({
        success: true,
        answer: aiResponse.text || "I am here to guide your rural enterprise journey.",
      });
    }

    // Fallback response if no API key
    return res.json({
      success: true,
      answer: generateRuleBasedChatAnswer(question, context),
    });
  } catch (error) {
    console.error("Error in /api/advisory/chat:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Error processing chat query",
    });
  }
});

function generateFallbackReport(params) {
  const { state, district, block, village, projectCost, businessCategory } = params;
  const isDairy = /dairy|milk|cow|buffalo/i.test(businessCategory);
  const isRetail = /retail|kirana|grocery|store|shop/i.test(businessCategory);
  const isTextile = /textile|cloth|tailor|garment|weaving/i.test(businessCategory);
  const isPoultry = /poultry|chicken|egg/i.test(businessCategory);
  const isAgri = /agro|flour|mill|processing|spice|grain/i.test(businessCategory);

  const radiusKm = 7;
  const estimatedConsumers = 8500 + Math.floor(Math.random() * 3000);
  const targetHouseholds = Math.round(estimatedConsumers / 5.2);

  const capexAmount = Math.round(projectCost * 0.7);
  const opexAmount = Math.round(projectCost * 0.3);

  return {
    feasibilityScore: 86,
    viabilityRating: "High Viability",
    executiveSummary: `The proposed ${businessCategory} unit in ${village} (Block ${block}, ${district}) demonstrates strong economic viability. With a total project outlay of ₹${projectCost.toLocaleString("en-IN")} structured with 10% promoter contribution and 90% concessional credit, the enterprise serves an underserved local market radius of ${radiusKm} km with an addressable base of ~${estimatedConsumers.toLocaleString("en-IN")} residents across ${village} and adjacent Gram Panchayats.`,
    marketReach: {
      radiusKm,
      estimatedConsumers,
      targetHouseholds,
      primaryDistributionChannels: [
        {
          channel: "Bi-Weekly Gram Panchayat Haat",
          description: "Direct cash sales at regional cluster bazaars capturing floating rural footfall with immediate liquidity.",
          viabilityScore: 92,
        },
        {
          channel: "Village Center Base Outlet / Doorstep Supply",
          description: `Direct fulfillment to residential clusters in ${village} and neighboring hamlets within 3 km.`,
          viabilityScore: 88,
        },
        {
          channel: "B2B Ties with Local Retailers & Milk/Agri Aggregators",
          description: "Institutional buy-back or weekly bulk procurement contracts mitigating inventory holding risk.",
          viabilityScore: 81,
        },
      ],
      ruralLogisticsNote: `Terrain and road connectivity around ${block} favor cost-effective two-wheeler or e-rickshaw distribution, keeping transport costs below 4% of daily gross revenues.`,
    },
    opportunityAnalysis: {
      underservedNiches: [
        {
          title: isDairy ? "Value-added Desi Ghee & Fresh Paneer" : isRetail ? "Packaged Hygienic Spices & Daily Staples in Micro-Packs" : "Customized Affordable Products for Rural Households",
          explanation: "High rural demand currently met by irregular supplies from distant sub-divisional towns with 15-20% price markups.",
          potentialMargin: "24% - 32%",
        },
        {
          title: "Pre-order Seasonal Supply for Wedding & Harvest Months",
          explanation: "Guaranteed cash bookings during Rabi and Kharif post-harvest cycles when liquidity peaks.",
          potentialMargin: "28% - 35%",
        },
      ],
      seasonalOpportunities: [
        "Post-harvest festival cycles (Diwali, Makar Sankranti, Chhath/Eid/regional melas) seeing 2.5x spending surges.",
        "Summer wedding seasons driving bulk bookings and localized catering supply.",
        "Monsoon buffer stocking where outside road access is temporarily slowed.",
      ],
      valueAdditionPossibilities: [
        "Adopting solar-powered cooling or processing units to prevent spoilage during rural power fluctuations.",
        "Branding as clean, trusted local origin (shuddh desi / paramparik) over anonymous town distributors.",
      ],
    },
    swot: {
      strengths: [
        `Low fixed overheads operating within ${village} with zero commercial town rent burdens.`,
        "Direct personal trust and community kinship reducing marketing acquisition costs.",
        `Eligible for concessional 90% loan with structured moratorium easing initial cashflows.`,
        "Agile response to local consumer preferences compared to slow urban supply chains.",
      ],
      weaknesses: [
        "Working capital sensitivity during the initial 60 days before steady daily cash inflow.",
        "Initial dependence on family labor for day-to-day operations.",
        "Lack of formal computerized accounting (manageable via simple digital ledger/khata).",
      ],
      opportunities: [
        `Government SC/ST/OBC/Minority channelizing agency interest subsidy reducing cost of debt.`,
        "Tie-ups with local Self-Help Groups (SHGs / NRLM) for shared micro-distribution.",
        "Expanding product assortment as cash reserves accumulate after Year 1.",
      ],
      threats: [
        "Uncontrolled customer requests for credit (Udhaar) threatening daily liquidity.",
        "Seasonal disruptions in unpaved roads during heavy monsoon weeks.",
        "Fluctuations in raw material or feed input costs from regional wholesale markets.",
      ],
    },
    threatsIdentification: [
      {
        risk: "Excessive Village Credit (Udhaar Default)",
        impact: "High",
        mitigationStrategy: "Enforce strict credit ceiling: no customer credit exceeding ₹500, with clear 7-day settlement terms and incentives for UPI/cash payments.",
      },
      {
        risk: "Seasonal Cashflow Slump during Sowing Season",
        impact: "Medium",
        mitigationStrategy: "Utilize the 3-to-6 month loan moratorium buffer to maintain 45 days of operational working capital reserve in the business account.",
      },
      {
        risk: "Perishable Spoilage & Rural Power Outages",
        impact: "Medium",
        mitigationStrategy: "Deploy small insulated ice-boxes or battery/solar backup for critical inventory and stagger batch sizes.",
      },
    ],
    competitorMapping: {
      estimatedCompetitorDensityInBlock: 4,
      saturationLevel: "Moderate",
      typicalWeaknessesOfLocalCompetitors: [
        "Erratic shop operating hours causing customer frustration.",
        "Poor hygiene and inconsistent product quality.",
        "Frequent stock-outs of in-demand items forcing buyers to travel to sub-division markets.",
      ],
      moatAndDifferentiationAdvice: `Ensure disciplined 6:30 AM to 8:30 PM availability, provide transparent weighing/fair pricing, and offer doorstep delivery for senior citizens and women within ${village}.`,
    },
    productMarketValue: {
      suggestedPricingTable: [
        {
          productOrService: isDairy ? "Full Cream Cow Milk (Per Liter)" : isRetail ? "Cold-Pressed Mustard Oil (500ml)" : "Primary Standard Unit",
          localMarketRate: "₹55 - ₹60",
          proposedPrice: "₹56",
          marginPercent: "18%",
        },
        {
          productOrService: isDairy ? "Fresh Country Paneer (Per Kg)" : isRetail ? "Standard Grocery Combo Basket" : "Special Grade Item",
          localMarketRate: "₹340 - ₹380",
          proposedPrice: "₹350",
          marginPercent: "28%",
        },
        {
          productOrService: isDairy ? "Curd / Buttermilk (Per Liter/Pack)" : isRetail ? "Fresh Ground Spices (200g)" : "Value Added Product",
          localMarketRate: "₹40 - ₹45",
          proposedPrice: "₹40",
          marginPercent: "32%",
        },
      ],
      regionalPurchasingPowerContext: `Daily household wage rates in rural ${district} average ₹320-₹450. Pricing must prioritize accessible daily ticket sizes (₹20 to ₹80 units) to align with daily cashflow cycles.`,
      paymentTermsAdvice: "Accept UPI (BHIM, PhonePe, GooglePay) alongside cash. Offer a 2% spot-discount or small complimentary loyalty extra for upfront digital/cash settlement.",
    },
    nextStepsActionPlan: [
      "Obtain Gram Panchayat No-Objection Certificate (NOC) or trade identification verification.",
      "Assemble Aadhaar, caste/category certificate (if applicable for SCA concessional quota), and 6-month bank passbook.",
      "Submit this Detailed Project Report (DPR) with the 10% Margin Bank Draft to the District SCA Office / Channelizing Agency Manager.",
      "Upon sanction, order capital equipment with genuine GST vendor invoices as mandated by the funding agency.",
      "Commence operations during the moratorium window to establish steady cashflow before the first quarterly repayment installment.",
    ],
    capexItems: [
      { item: "Core Equipment & Production Machinery", amount: Math.round(capexAmount * 0.65), description: "Essential durable machinery / livestock / tools" },
      { item: "Workplace Shed / Setup & Electricals", amount: Math.round(capexAmount * 0.25), description: "Sanitary setup, display racks, and basic wiring" },
      { item: "Installation & Pre-operative Permits", amount: Math.round(capexAmount * 0.1), description: "Transport, setup, and local licensing fees" },
    ],
    opexItems: [
      { item: "Initial Raw Material & Inventory Stock", amount: Math.round(opexAmount * 0.6), description: "30-day opening stock inventory" },
      { item: "Emergency Cash & Operational Buffer", amount: Math.round(opexAmount * 0.25), description: "Fuel, transport, and unexpected contingencies" },
      { item: "Packaging & Initial Local Promotion", amount: Math.round(opexAmount * 0.15), description: "Banners, sample distribution, and printed packaging" },
    ],
  };
}

function generateRuleBasedChatAnswer(question, context) {
  const q = question.toLowerCase();
  if (q.includes("moratorium") || q.includes("grace") || q.includes("interest")) {
    return "During the moratorium period (3 months for Micro Finance or 6 months for Term Loan), you are not required to repay the principal amount. This allows your rural enterprise to establish cashflow, procure equipment, and onboard customers before your principal installments begin!";
  }
  if (q.includes("margin") || q.includes("10%") || q.includes("contribution")) {
    return "The 10% margin money is your personal investment fraction. For example, if you bring ₹50,000, the State Channelizing Agency facilitates a 90% loan of ₹4,50,000, creating a ₹5,00,000 viable enterprise. This proves your ownership and commitment to the scheme.";
  }
  if (q.includes("document") || q.includes("paper") || q.includes("apply") || q.includes("eligibility")) {
    return "To apply at your District State Channelizing Agency (SCA) or Bank CA desk, you need: 1) Aadhaar & PAN Card, 2) Residence / Ration Proof in the Gram Panchayat, 3) Caste / Category certificate (for concessional category schemes), 4) Bank Account Passbook with IFSC, and 5) The Detailed Feasibility Report generated right here!";
  }
  return "Your business plan has a strong foundation. Focus on keeping fixed costs low, avoiding long credit (udhaar) to villagers, and taking advantage of the moratorium period to build steady recurring sales.";
}

// Vite middleware and static serving
async function startServer() {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
