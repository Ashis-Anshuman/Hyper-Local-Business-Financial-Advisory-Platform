import React from "react";
import {
  Calendar,
  Percent,
  Clock,
  TrendingDown,
  Building2,
} from "lucide-react";
import { TRANSLATIONS } from "../data/translations";
import { formatINR } from "../utils/calculator";

export const SchemeSummaryCard = ({ scheme, currentLang }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isMicro = scheme.schemeTier === "MICRO_FINANCE";

  return (
    <div id="scheme-summary-card" className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm overflow-hidden">
      {/* Scheme Tier Header Banner */}
      <div className="px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 text-white bg-[#5a6344] border-b border-[#4d5539]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#f8f7f2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e9e4d9]">
                Scheme Auto-Selected by Cost Tier
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#b45a3a] text-white shadow-xs">
                {isMicro ? "Tier 1: Up to ₹1.40L" : "Tier 2: ₹1.40L to ₹50.00L"}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{scheme.schemeName}</h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#e9e4d9] block">Concessional Lending</span>
          <span className="text-xs sm:text-sm font-semibold text-white">Channelizing Agency Norms</span>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 10% Margin */}
          <div className="bg-[#fdfaf3] rounded-2xl p-4 sm:p-5 border border-[#ece7d6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#7a7866]">10% Margin Money</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#b45a3a]"></span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#b45a3a]">
              {formatINR(scheme.availableMargin)}
            </p>
            <span className="text-[11px] text-[#7a7866] mt-1 block">
              Promoter contribution fraction
            </span>
          </div>

          {/* 100% Project Cost */}
          <div className="bg-[#f8f7f2] rounded-2xl p-4 sm:p-5 border border-[#e0ddcc]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#5a6344]">Total Project Cost (100%)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5a6344]"></span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#2a2a22]">
              {formatINR(scheme.feasibleProjectCost)}
            </p>
            <span className="text-[11px] text-[#5a6344] mt-1 block font-medium">
              Margin / 10% auto-calculated
            </span>
          </div>

          {/* 90% Loan Eligibility */}
          <div className="bg-[#fdfaf3] rounded-2xl p-4 sm:p-5 border border-[#ece7d6]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#5a6344]">Max Loan Amount (90%)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5a6344]"></span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#5a6344]">
              {formatINR(scheme.loanEligibility)}
            </p>
            <span className="text-[11px] text-[#7a7866] mt-1 block font-medium">
              SCA Concessional Credit
            </span>
          </div>

          {/* Concessional Interest Rate */}
          <div className="bg-[#f8f7f2] rounded-2xl p-4 sm:p-5 border border-[#e0ddcc]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-[#b45a3a]">{t.interestRate}</span>
              <Percent className="w-3.5 h-3.5 text-[#b45a3a]" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#b45a3a]">
              {scheme.interestRateAnnual}% <span className="text-sm font-semibold text-[#7a7866]">p.a.</span>
            </p>
            <span className="text-[11px] text-[#7a7866] mt-1 block font-medium">
              Concessional subsidized rate
            </span>
          </div>
        </div>

        {/* 10% vs 90% Visual Ratio Bar */}
        <div className="bg-[#fdfaf3] rounded-2xl p-4 border border-[#ece7d6] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#b45a3a]">
              <span className="w-3 h-3 rounded-full bg-[#b45a3a] inline-block"></span>
              Promoter Margin: 10% ({formatINR(scheme.availableMargin)})
            </span>
            <span className="flex items-center gap-1.5 text-[#5a6344]">
              <span className="w-3 h-3 rounded-full bg-[#5a6344] inline-block"></span>
              Government Loan: 90% ({formatINR(scheme.loanEligibility)})
            </span>
          </div>
          <div className="h-5 rounded-full overflow-hidden flex shadow-inner bg-[#e0ddcc]">
            <div
              style={{ width: "10%" }}
              className="bg-[#b45a3a] h-full flex items-center justify-center text-[10px] text-white font-bold"
            >
              10%
            </div>
            <div
              style={{ width: "90%" }}
              className="bg-[#5a6344] h-full flex items-center justify-center text-[10px] text-white font-bold"
            >
              90%
            </div>
          </div>
          <p className="text-[11px] text-[#7a7866]">
            Every ₹1,000 of your self-savings unlocks ₹9,000 in low-interest institutional capital under State Channelizing Agency guidelines.
          </p>
        </div>

        {/* Moratorium & Repayment Tenure Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Moratorium Feature */}
          <div className="bg-[#f8f7f2] rounded-2xl p-4 sm:p-5 border border-[#e0ddcc]">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#5a6344]" />
              <h4 className="text-xs font-bold text-[#5a6344] uppercase tracking-wide">
                Moratorium Grace Window
              </h4>
            </div>
            <p className="text-lg font-black text-[#2a2a22]">
              {scheme.moratoriumMonths} {t.months}{" "}
              <span className="text-xs font-semibold text-[#5a6344]">
                ({scheme.moratoriumQuarters} Quarter{scheme.moratoriumQuarters > 1 ? "s" : ""})
              </span>
            </p>
            <p className="text-xs text-[#7a7866] mt-1">
              Zero principal repayment required during startup period. Only nominal quarterly interest is serviced.
            </p>
          </div>

          {/* Total Tenure */}
          <div className="bg-[#ffffff] rounded-2xl p-4 sm:p-5 border border-[#e0ddcc]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#7a7866]" />
              <h4 className="text-xs font-bold text-[#2a2a22] uppercase tracking-wide">
                {t.tenure}
              </h4>
            </div>
            <p className="text-lg font-black text-[#2a2a22]">
              {scheme.tenureYears} {t.years}{" "}
              <span className="text-xs font-semibold text-[#7a7866]">
                ({scheme.totalQuarters} Quarters)
              </span>
            </p>
            <p className="text-xs text-[#7a7866] mt-1">
              Structured as 4 quarterly installments per year, aligned with rural harvest and mandi cashflow cycles.
            </p>
          </div>

          {/* Quarterly Repayment Post-Moratorium */}
          <div className="bg-[#fdfaf3] rounded-2xl p-4 sm:p-5 border border-[#ece7d6]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-[#b45a3a]" />
              <h4 className="text-xs font-bold text-[#b45a3a] uppercase tracking-wide">
                Est. Quarterly Installment
              </h4>
            </div>
            <p className="text-lg font-black text-[#b45a3a]">
              {formatINR(scheme.quarterlyPaymentPostMoratorium)}
            </p>
            <p className="text-xs text-[#7a7866] mt-1">
              Payable every 3 months after the {scheme.moratoriumMonths}-month moratorium concludes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
