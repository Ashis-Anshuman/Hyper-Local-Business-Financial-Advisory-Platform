import React, { useState } from "react";
import {
  Table,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { TRANSLATIONS } from "../data/translations";
import { formatINR } from "../utils/calculator";

export const FinancialBreakdown = ({
  scheme,
  currentLang,
  capexItems,
  opexItems,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [showAllQuarters, setShowAllQuarters] = useState(false);

  // Default CAPEX items if not customized
  const defaultCapex = capexItems || [
    {
      item: "Production Machinery / Cattle / Core Equipment",
      amount: Math.round(scheme.capexAmount * 0.65),
      description: "Primary income-generating physical assets",
    },
    {
      item: "Work Shed / Civil Modifications & Electric Wiring",
      amount: Math.round(scheme.capexAmount * 0.25),
      description: "Sanitary concrete floor, shed roofing, and power connection",
    },
    {
      item: "Freight, Installation, Tools & License Fees",
      amount: Math.round(scheme.capexAmount * 0.1),
      description: "Logistics and initial local clearance",
    },
  ];

  // Default OPEX items
  const defaultOpex = opexItems || [
    {
      item: "Initial Raw Materials / Livestock Feed / Inventory Stock",
      amount: Math.round(scheme.workingCapitalAmount * 0.6),
      description: "30–45 days opening inventory to jumpstart cycle",
    },
    {
      item: "Operational Liquidity Buffer & Fuel/Transport Reserve",
      amount: Math.round(scheme.workingCapitalAmount * 0.25),
      description: "Cash cushion preventing liquidity crunches",
    },
    {
      item: "Packaging Materials & Local Launch Promotion",
      amount: Math.round(scheme.workingCapitalAmount * 0.15),
      description: "Clean packaging, signage, and sample bags for weekly haats",
    },
  ];

  const displayedSchedule = showAllQuarters ? scheme.schedule : scheme.schedule.slice(0, 8);

  return (
    <div id="financial-breakdown-section" className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7 space-y-7">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3 py-1 rounded-full border border-[#d6cfbe]">
          Module 2 (Part B): Capital Structuring &amp; Amortization
        </span>
        <h3 className="text-xl font-bold text-[#2a2a22] mt-2">
          Operational Capital &amp; Quarterly Repayment Plan
        </h3>
        <p className="text-xs text-[#7a7866] mt-0.5">
          Government concessional credit mandates a prudent split between durable machinery (CAPEX) and initial revolving working capital (OPEX).
        </p>
      </div>

      {/* CAPEX vs OPEX Allocation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* CAPEX Breakdown */}
        <div className="bg-[#fdfaf3] rounded-2xl p-5 border border-[#ece7d6]">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#5a6344]"></span>
              <h4 className="text-sm font-bold text-[#2a2a22]">{t.capexShare} (70%)</h4>
            </div>
            <span className="text-sm font-extrabold text-[#5a6344]">
              {formatINR(scheme.capexAmount)}
            </span>
          </div>
          <div className="space-y-2.5">
            {defaultCapex.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-[#ece7d6] flex items-start justify-between gap-3 text-xs shadow-2xs"
              >
                <div>
                  <span className="font-semibold text-[#2a2a22] block">{item.item}</span>
                  <span className="text-[#7a7866] text-[11px]">{item.description}</span>
                </div>
                <span className="font-bold text-[#2a2a22] shrink-0">
                  {formatINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OPEX / Working Capital Breakdown */}
        <div className="bg-[#f8f7f2] rounded-2xl p-5 border border-[#e0ddcc]">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#b45a3a]"></span>
              <h4 className="text-sm font-bold text-[#2a2a22]">{t.workingCapitalShare} (30%)</h4>
            </div>
            <span className="text-sm font-extrabold text-[#b45a3a]">
              {formatINR(scheme.workingCapitalAmount)}
            </span>
          </div>
          <div className="space-y-2.5">
            {defaultOpex.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-[#e0ddcc] flex items-start justify-between gap-3 text-xs shadow-2xs"
              >
                <div>
                  <span className="font-semibold text-[#2a2a22] block">{item.item}</span>
                  <span className="text-[#7a7866] text-[11px]">{item.description}</span>
                </div>
                <span className="font-bold text-[#2a2a22] shrink-0">
                  {formatINR(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moratorium Timeline Visual */}
      <div className="bg-[#fdfaf3] rounded-2xl p-5 border border-[#ece7d6]">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-[#b45a3a]" />
          <h4 className="text-sm font-bold text-[#2a2a22]">
            Moratorium Grace Period Timeline Explained
          </h4>
        </div>
        <p className="text-xs text-[#7a7866] leading-relaxed mb-4">
          The first {scheme.moratoriumMonths} months ({scheme.moratoriumQuarters} Quarter{scheme.moratoriumQuarters > 1 ? "s" : ""}) are designated as a <strong className="text-[#2a2a22]">moratorium window</strong>. You pay <strong className="text-[#b45a3a]">₹0 in principal</strong> so you can focus entirely on buying assets, training, and building cash flow. Only nominal quarterly interest of ~{formatINR(scheme.quarterlyInterestDuringMoratorium)} is billed. Principal amortization starts in Quarter {scheme.moratoriumQuarters + 1}.
        </p>

        {/* Visual blocks */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center">
          {scheme.schedule.slice(0, 12).map((s) => (
            <div
              key={s.quarter}
              className={`p-2 rounded-xl text-xs font-semibold border ${
                s.isMoratorium
                  ? "bg-[#b45a3a]/15 border-[#b45a3a]/30 text-[#b45a3a] font-bold"
                  : "bg-white border-[#ece7d6] text-[#3b3a32]"
              }`}
            >
              <span className="block text-[10px] uppercase text-[#7a7866]">Q{s.quarter}</span>
              <span className="text-[11px] block truncate font-bold">
                {s.isMoratorium ? "Grace" : formatINR(s.totalPayment)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly Amortization Schedule Table */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[#5a6344]" />
            <h4 className="text-sm font-bold text-[#2a2a22]">{t.repaymentSchedule}</h4>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#7a7866]">
              Total Interest: <strong className="text-[#2a2a22]">{formatINR(scheme.totalInterestPayable)}</strong>
            </span>
            <span className="text-[#7a7866]">
              Total Repaid: <strong className="text-[#2a2a22]">{formatINR(scheme.totalRepaymentAmount)}</strong>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#e0ddcc] rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f7f2] text-[#3b3a32] font-bold border-b border-[#e0ddcc]">
                <th className="py-3 px-3.5">Quarter</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5">Opening Balance</th>
                <th className="py-3 px-3.5">Principal Paid</th>
                <th className="py-3 px-3.5">Interest ({scheme.interestRateAnnual}%)</th>
                <th className="py-3 px-3.5 font-bold text-[#2a2a22]">Total Installment</th>
                <th className="py-3 px-3.5">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7d6] font-medium text-[#3b3a32]">
              {displayedSchedule.map((row) => (
                <tr
                  key={row.quarter}
                  className={row.isMoratorium ? "bg-[#fdfaf3] hover:bg-[#f8f7f2]" : "hover:bg-[#fdfaf3]/60"}
                >
                  <td className="py-2.5 px-3.5 font-bold text-[#2a2a22]">{row.label}</td>
                  <td className="py-2.5 px-3.5">
                    {row.isMoratorium ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b45a3a]/15 text-[#b45a3a] border border-[#b45a3a]/25">
                        <Clock className="w-2.5 h-2.5" /> Moratorium
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e9e4d9] text-[#5a6344]">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Amortizing
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5">{formatINR(row.openingBalance)}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-[#5a6344]">
                    {row.principalPayment === 0 ? "—" : formatINR(row.principalPayment)}
                  </td>
                  <td className="py-2.5 px-3.5 text-[#7a7866]">{formatINR(row.interestPayment)}</td>
                  <td className="py-2.5 px-3.5 font-bold text-[#2a2a22] bg-[#f8f7f2]/50">
                    {formatINR(row.totalPayment)}
                  </td>
                  <td className="py-2.5 px-3.5">{formatINR(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {scheme.schedule.length > 8 && (
          <div className="mt-3.5 text-center">
            <button
              type="button"
              onClick={() => setShowAllQuarters(!showAllQuarters)}
              className="text-xs font-bold text-[#5a6344] hover:text-[#4d5539] underline underline-offset-4 cursor-pointer"
            >
              {showAllQuarters
                ? "Show First 8 Quarters (Compact View)"
                : `View All ${scheme.schedule.length} Quarters (${scheme.tenureYears} Years Schedule)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
