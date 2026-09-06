import React from "react";
import {
  Compass,
  TrendingUp,
  Target,
  AlertTriangle,
  Users,
  Tag,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { TRANSLATIONS } from "../data/translations";

export const FeasibilityReportView = ({
  report,
  inputs,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div id="feasibility-report-container" className="space-y-6">
      {/* Executive Summary & Feasibility Score Banner */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f0eee4]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3 py-1 rounded-full border border-[#d6cfbe]">
              Module 1 &amp; Executive Assessment
            </span>
            <h3 className="text-xl font-bold text-[#2a2a22] mt-2">
              Hyper-Local Business Feasibility Study
            </h3>
            <p className="text-xs text-[#7a7866] mt-0.5 font-medium">
              Geographic Focal Point: {inputs.village}, Block {inputs.block}, District {inputs.district}, {inputs.state}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#fdfaf3] px-4 py-2.5 rounded-2xl border border-[#ece7d6]">
            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#7a7866] uppercase block">
                Viability Index
              </span>
              <span className="text-xs font-bold text-[#5a6344]">
                {report.viabilityRating || "High Viability"}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#5a6344] text-white font-black text-base flex items-center justify-center shadow-xs">
              {report.feasibilityScore || 88}
              <span className="text-[9px] font-normal text-[#e9e4d9] ml-0.5">/100</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-[#3b3a32] leading-relaxed bg-[#fdfaf3] p-4 sm:p-5 rounded-2xl border border-[#ece7d6]">
          <p className="font-medium">{report.executiveSummary}</p>
        </div>
      </div>

      {/* Module 1: Market Reach */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#2a2a22]">{t.marketReachTitle}</h4>
              <p className="text-xs text-[#7a7866]">Demographic catchment &amp; access routes</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#5a6344] bg-[#e9e4d9] px-3 py-1 rounded-full border border-[#d6cfbe]">
            Radius: {report.marketReach.radiusKm || 7} km
          </span>
        </div>

        {/* Catchment Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc]">
            <span className="text-xs text-[#7a7866] font-semibold block">{t.consumerBase}</span>
            <span className="text-xl font-black text-[#2a2a22]">
              ~{(report.marketReach.estimatedConsumers || 8500).toLocaleString("en-IN")} People
            </span>
            <span className="text-[11px] text-[#7a7866] block mt-0.5">
              Within 5–10 km cluster villages
            </span>
          </div>

          <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#ece7d6]">
            <span className="text-xs text-[#7a7866] font-semibold block">Target Households</span>
            <span className="text-xl font-black text-[#5a6344]">
              ~{(report.marketReach.targetHouseholds || 1600).toLocaleString("en-IN")} Homes
            </span>
            <span className="text-[11px] text-[#7a7866] block mt-0.5">
              Avg. 5.2 members per rural household
            </span>
          </div>

          <div className="bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc] sm:col-span-2 lg:col-span-1">
            <span className="text-xs text-[#7a7866] font-semibold block">Rural Logistics Route</span>
            <span className="text-xs font-bold text-[#2a2a22] block mt-1">
              Low-overhead 2-Wheeler / E-rickshaw
            </span>
            <span className="text-[11px] text-[#7a7866] block mt-0.5">
              {report.marketReach.ruralLogisticsNote}
            </span>
          </div>
        </div>

        {/* Distribution Channels */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#7a7866] mb-2.5">
            {t.distributionChannels}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.marketReach.primaryDistributionChannels.map((chan, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#ece7d6] hover:border-[#5a6344] transition-colors flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#2a2a22]">{chan.channel}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#e9e4d9] text-[#5a6344]">
                      {chan.viabilityScore}% Viability
                    </span>
                  </div>
                  <p className="text-xs text-[#7a7866]">{chan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module 2: Opportunity Analysis */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#2a2a22]">{t.opportunityTitle}</h4>
            <p className="text-xs text-[#7a7866]">Unserved local niches and seasonal demand spikes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Underserved Niches */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7a7866] block">
              Underserved Niches in this Block
            </span>
            {report.opportunityAnalysis.underservedNiches.map((niche, idx) => (
              <div
                key={idx}
                className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#ece7d6] text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#2a2a22] text-xs">{niche.title}</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#b45a3a]/15 text-[#b45a3a]">
                    Margin: {niche.potentialMargin}
                  </span>
                </div>
                <p className="text-[#7a7866] text-xs">{niche.explanation}</p>
              </div>
            ))}
          </div>

          {/* Seasonal Opportunities & Value Additions */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7a7866] block">
              Seasonal Spikes &amp; Value Addition
            </span>
            <div className="bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc] space-y-2 text-xs">
              <span className="font-bold text-[#2a2a22] block">Seasonal Peaks:</span>
              <ul className="space-y-1.5 text-[#7a7866]">
                {report.opportunityAnalysis.seasonalOpportunities.map((op, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#b45a3a] font-bold">•</span>
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#ece7d6] space-y-2 text-xs">
              <span className="font-bold text-[#5a6344] block">Value-Addition Strategy:</span>
              <ul className="space-y-1.5 text-[#3b3a32]">
                {report.opportunityAnalysis.valueAdditionPossibilities.map((va, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5a6344] shrink-0 mt-0.5" />
                    <span>{va}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: SWOT Matrix */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#2a2a22]">{t.swotTitle}</h4>
            <p className="text-xs text-[#7a7866]">
              Tailored specifically to this village and ₹{(inputs.availableMargin * 10).toLocaleString("en-IN")} project scale
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-[#f8f7f2] p-5 rounded-2xl border border-[#e0ddcc]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5a6344]"></span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#5a6344]">
                Strengths (आंतरिक ताकत)
              </h5>
            </div>
            <ul className="space-y-1.5 text-xs text-[#3b3a32]">
              {report.swot.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5a6344] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-[#fdfaf3] p-5 rounded-2xl border border-[#ece7d6]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b45a3a]"></span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#b45a3a]">
                Weaknesses (कमज़ोरियाँ)
              </h5>
            </div>
            <ul className="space-y-1.5 text-xs text-[#3b3a32]">
              {report.swot.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#b45a3a] font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-[#f8f7f2] p-5 rounded-2xl border border-[#e0ddcc]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5a6344]"></span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#5a6344]">
                Opportunities (सकारात्मक अवसर)
              </h5>
            </div>
            <ul className="space-y-1.5 text-xs text-[#3b3a32]">
              {report.swot.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#5a6344] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-[#fdfaf3] p-5 rounded-2xl border border-[#ece7d6]">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b45a3a]"></span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#b45a3a]">
                Threats (बाहरी चुनौतियाँ)
              </h5>
            </div>
            <ul className="space-y-1.5 text-xs text-[#3b3a32]">
              {report.swot.threats.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#b45a3a] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Module 4: Threats Identification & Practical Mitigation */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#b45a3a] flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#2a2a22]">{t.threatsTitle}</h4>
            <p className="text-xs text-[#7a7866]">
              Preventing rural business failure: supply bottlenecks, seasonal slumps, and credit default
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {report.threatsIdentification.map((threat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-[#ece7d6] bg-[#fdfaf3] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="md:w-1/3">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      threat.impact === "High"
                        ? "bg-[#b45a3a]/15 text-[#b45a3a] border border-[#b45a3a]/25"
                        : "bg-[#e9e4d9] text-[#5a6344]"
                    }`}
                  >
                    {threat.impact} Impact Risk
                  </span>
                </div>
                <span className="font-bold text-[#2a2a22] text-sm">{threat.risk}</span>
              </div>

              <div className="md:w-2/3 bg-white p-3.5 rounded-xl border border-[#ece7d6]">
                <span className="text-[11px] font-bold text-[#5a6344] uppercase block mb-0.5">
                  Mitigation Action Plan:
                </span>
                <p className="text-[#3b3a32] leading-relaxed">{threat.mitigationStrategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module 5: Competitor Mapping & Density */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#2a2a22]">{t.competitorTitle}</h4>
              <p className="text-xs text-[#7a7866]">
                Density estimation and strategic market differentiation
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#7a7866] block">Block Saturation</span>
            <span
              className={`text-xs font-extrabold px-3 py-0.5 rounded-full ${
                report.competitorMapping.saturationLevel === "Low"
                  ? "bg-[#e9e4d9] text-[#5a6344]"
                  : "bg-[#fdfaf3] border border-[#ece7d6] text-[#b45a3a]"
              }`}
            >
              {report.competitorMapping.saturationLevel} Saturation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc] space-y-2">
            <span className="text-xs font-semibold text-[#7a7866] block">
              Estimated Competitors in Block
            </span>
            <span className="text-3xl font-black text-[#2a2a22]">
              {report.competitorMapping.estimatedCompetitorDensityInBlock || 4}
              <span className="text-xs font-normal text-[#7a7866] ml-1.5">similar units</span>
            </span>
            <p className="text-[11px] text-[#7a7866]">
              Most existing units are unorganized informal players with limited quality control and irregular supplies.
            </p>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#ece7d6] text-xs">
              <span className="font-bold text-[#2a2a22] block mb-1.5">
                Observed Weaknesses of Existing Competitors:
              </span>
              <ul className="space-y-1 text-[#7a7866]">
                {report.competitorMapping.typicalWeaknessesOfLocalCompetitors.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#b45a3a] font-bold">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc] text-xs">
              <span className="font-bold text-[#5a6344] block mb-1">
                Your Competitive Moat &amp; Differentiation Strategy:
              </span>
              <p className="text-[#3b3a32] leading-relaxed">
                {report.competitorMapping.moatAndDifferentiationAdvice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module 6: Product Market Value & Pricing Strategy */}
      <div className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#e9e4d9] text-[#5a6344] flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#2a2a22]">{t.pricingTitle}</h4>
            <p className="text-xs text-[#7a7866]">
              Optimal pricing matching rural purchasing power and credit containment
            </p>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="overflow-x-auto border border-[#e0ddcc] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f7f2] text-[#3b3a32] font-bold border-b border-[#e0ddcc]">
                <th className="py-3 px-3.5">Product / Service</th>
                <th className="py-3 px-3.5">Local Informal Rate</th>
                <th className="py-3 px-3.5">Proposed Fair Rate</th>
                <th className="py-3 px-3.5 font-bold text-[#5a6344]">Gross Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7d6] font-medium text-[#3b3a32]">
              {report.productMarketValue.suggestedPricingTable.map((priceItem, idx) => (
                <tr key={idx} className="hover:bg-[#fdfaf3]">
                  <td className="py-2.5 px-3.5 font-bold text-[#2a2a22]">
                    {priceItem.productOrService}
                  </td>
                  <td className="py-2.5 px-3.5 text-[#7a7866]">{priceItem.localMarketRate}</td>
                  <td className="py-2.5 px-3.5 font-bold text-[#2a2a22]">
                    {priceItem.proposedPrice}
                  </td>
                  <td className="py-2.5 px-3.5 font-extrabold text-[#5a6344]">
                    {priceItem.marginPercent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Regional Context & Credit Policy Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#f8f7f2] p-4 rounded-2xl border border-[#e0ddcc]">
            <span className="font-bold text-[#2a2a22] block mb-1">
              Regional Purchasing Power Alignment:
            </span>
            <p className="text-[#7a7866] leading-relaxed">
              {report.productMarketValue.regionalPurchasingPowerContext}
            </p>
          </div>
          <div className="bg-[#fdfaf3] p-4 rounded-2xl border border-[#ece7d6]">
            <span className="font-bold text-[#b45a3a] block mb-1">
              Village Credit (Udhaar) Containment Protocol:
            </span>
            <p className="text-[#7a7866] leading-relaxed">
              {report.productMarketValue.paymentTermsAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps Action Plan */}
      <div className="bg-[#5a6344] text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#f8f7f2]" />
          <h4 className="text-base font-bold text-white">
            Application Roadmap: State Channelizing Agency Submission Steps
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {report.nextStepsActionPlan.map((step, idx) => (
            <div key={idx} className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#b45a3a] text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
                {idx + 1}
              </span>
              <p className="text-[#e9e4d9] font-medium leading-tight">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
