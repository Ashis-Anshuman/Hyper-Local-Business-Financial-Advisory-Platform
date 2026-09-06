import React from "react";
import { Landmark, Printer, X } from "lucide-react";
import { formatINR } from "../utils/calculator";

export const PrintableDPR = ({
  isOpen,
  onClose,
  inputs,
  scheme,
  report,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="printable-dpr-modal"
      className="fixed inset-0 z-50 bg-[#2a2a22]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col border border-[#e0ddcc] overflow-hidden">
        {/* Top Control Bar (Hidden on actual print) */}
        <div className="bg-[#5a6344] text-white px-5 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Landmark className="w-4 h-4 text-[#e9e4d9]" />
            <span>Detailed Project Report (DPR) — Ready for SCA / Bank Submission</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-[#b45a3a] hover:bg-[#a04e32] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Document Area */}
        <div id="dpr-print-content" className="p-8 overflow-y-auto space-y-6 text-[#2a2a22] bg-white text-xs">
          {/* Header */}
          <div className="text-center border-b-2 border-[#5a6344] pb-4 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7a7866]">
              Government of India / State Channelizing Agency Concessional Credit Framework
            </span>
            <h1 className="text-xl font-black uppercase text-[#2a2a22]">
              Detailed Project Feasibility &amp; Financial Structuring Report (DPR)
            </h1>
            <p className="text-xs text-[#7a7866]">
              Under Micro Finance / Term Loan Concessional Lending Guidelines (10% Promoter Contribution : 90% Loan)
            </p>
          </div>

          {/* Section 1: Enterprise Profile */}
          <div className="border border-[#e0ddcc] rounded-2xl p-4 space-y-2 bg-[#fdfaf3]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2a2a22] border-b border-[#ece7d6] pb-1">
              1. Proposed Micro-Enterprise &amp; Location Profile
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[#7a7866] block text-[11px]">Proposed Activity</span>
                <span className="font-bold text-[#2a2a22]">{inputs.businessCategory}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[11px]">Gram Panchayat / Village</span>
                <span className="font-bold text-[#2a2a22]">{inputs.village}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[11px]">Block / District</span>
                <span className="font-bold text-[#2a2a22]">{inputs.block}, {inputs.district}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[11px]">State</span>
                <span className="font-bold text-[#2a2a22]">{inputs.state}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Financial Structuring & Scheme Auto-Selection */}
          <div className="border border-[#e0ddcc] rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2a2a22] border-b border-[#ece7d6] pb-1">
              2. Financial Structuring &amp; Scheme Terms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f8f7f2] p-3.5 rounded-xl border border-[#e0ddcc]">
              <div>
                <span className="text-[#7a7866] block text-[10px]">Promoter Margin (10%)</span>
                <span className="text-sm font-black text-[#b45a3a]">{formatINR(scheme.availableMargin)}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[10px]">Total Project Cost (100%)</span>
                <span className="text-sm font-black text-[#5a6344]">{formatINR(scheme.feasibleProjectCost)}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[10px]">Concessional Loan (90%)</span>
                <span className="text-sm font-black text-[#2a2a22]">{formatINR(scheme.loanEligibility)}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[10px]">Interest Rate</span>
                <span className="text-sm font-black text-[#2a2a22]">{scheme.interestRateAnnual}% p.a.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-[#7a7866] block text-[11px]">Qualifying Scheme Tier:</span>
                <span className="font-bold text-[#2a2a22]">{scheme.schemeName}</span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[11px]">Moratorium Period:</span>
                <span className="font-bold text-[#5a6344]">
                  {scheme.moratoriumMonths} Months ({scheme.moratoriumQuarters} Quarter{scheme.moratoriumQuarters > 1 ? "s" : ""}) Principal Free
                </span>
              </div>
              <div>
                <span className="text-[#7a7866] block text-[11px]">Total Repayment Period:</span>
                <span className="font-bold text-[#2a2a22]">
                  {scheme.tenureYears} Years ({scheme.totalQuarters} Quarters)
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Cost Breakup (CAPEX vs OPEX) */}
          <div className="border border-[#e0ddcc] rounded-2xl p-4 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2a2a22] border-b border-[#ece7d6] pb-1">
              3. Capital Expenditure &amp; Working Capital Breakup
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-[#5a6344] block mb-1">
                  Fixed Capital Assets / CAPEX (70%): {formatINR(scheme.capexAmount)}
                </span>
                <ul className="list-disc pl-4 text-[#7a7866] space-y-0.5">
                  <li>Core Machinery / Cattle / Hardware Setup (~65%)</li>
                  <li>Work Shed, Electrification &amp; Civil (~25%)</li>
                  <li>Installation &amp; License Approvals (~10%)</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-[#b45a3a] block mb-1">
                  Working Capital / OPEX (30%): {formatINR(scheme.workingCapitalAmount)}
                </span>
                <ul className="list-disc pl-4 text-[#7a7866] space-y-0.5">
                  <li>Opening 30-Day Raw Material &amp; Feed (~60%)</li>
                  <li>Operational Fuel &amp; Transport Reserve (~25%)</li>
                  <li>Packaging &amp; Local Launch (~15%)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Feasibility Assessment */}
          <div className="border border-[#e0ddcc] rounded-2xl p-4 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2a2a22] border-b border-[#ece7d6] pb-1">
              4. Hyper-Local Feasibility Findings
            </h2>
            <p className="text-[#3b3a32] leading-relaxed">{report.executiveSummary}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[#3b3a32]">
              <div>
                <span className="font-semibold text-[#7a7866] block">Immediate Radius:</span>
                <span>{report.marketReach.radiusKm} km (~{report.marketReach.estimatedConsumers.toLocaleString("en-IN")} population)</span>
              </div>
              <div>
                <span className="font-semibold text-[#7a7866] block">Competitor Density:</span>
                <span>~{report.competitorMapping.estimatedCompetitorDensityInBlock} units in block ({report.competitorMapping.saturationLevel} saturation)</span>
              </div>
              <div>
                <span className="font-semibold text-[#7a7866] block">Viability Assessment:</span>
                <span className="font-bold text-[#5a6344]">{report.viabilityRating} ({report.feasibilityScore}/100)</span>
              </div>
            </div>
          </div>

          {/* Section 5: Signatures and Declarations */}
          <div className="pt-6 border-t-2 border-dashed border-[#d6cfbe] grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-8">
              <span className="text-[#7a7866] italic">Signature of Beneficiary / Applicant</span>
              <div className="border-t border-[#d6cfbe] pt-1">
                <span className="font-bold block text-[#2a2a22]">Promoter / Micro-Entrepreneur</span>
                <span className="text-[11px] text-[#7a7866]">{inputs.village} Gram Panchayat</span>
              </div>
            </div>
            <div className="space-y-8">
              <span className="text-[#7a7866] italic">Verified by Field Officer / SCA Manager</span>
              <div className="border-t border-[#d6cfbe] pt-1">
                <span className="font-bold block text-[#2a2a22]">State Channelizing Agency Desk</span>
                <span className="text-[11px] text-[#7a7866]">District Office: {inputs.district}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
