import React from "react";
import {
  MapPin,
  Coins,
  Briefcase,
  Store,
  Scissors,
  Egg,
  Wheat,
  Wrench,
  Milk,
  Beef,
  Laptop,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { TRANSLATIONS } from "../data/translations";
import { POPULAR_BUSINESS_CATEGORIES, REGIONAL_LOCATION_PRESETS, QUICK_MARGIN_PRESETS } from "../data/mockTemplates";
import { formatINR } from "../utils/calculator";

const ICON_MAP = {
  Milk: <Milk className="w-5 h-5 text-[#5a6344]" />,
  Store: <Store className="w-5 h-5 text-[#b45a3a]" />,
  Scissors: <Scissors className="w-5 h-5 text-[#5a6344]" />,
  Egg: <Egg className="w-5 h-5 text-[#b45a3a]" />,
  Wheat: <Wheat className="w-5 h-5 text-[#5a6344]" />,
  Wrench: <Wrench className="w-5 h-5 text-[#3b3a32]" />,
  Beef: <Beef className="w-5 h-5 text-[#5a6344]" />,
  Laptop: <Laptop className="w-5 h-5 text-[#3b3a32]" />,
};

export const InputPanel = ({
  inputs,
  onChange,
  onSubmit,
  isLoading,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const calculatedProject = inputs.availableMargin * 10;
  const isMicro = calculatedProject <= 140000;
  const calculatedLoan = isMicro
    ? Math.min(125000, calculatedProject * 0.9)
    : Math.min(4500000, calculatedProject * 0.9);

  return (
    <div id="input-panel-container" className="bg-[#ffffff] rounded-3xl border border-[#e0ddcc] shadow-sm p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#f0eee4]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5a6344] bg-[#e9e4d9] px-3 py-1 rounded-full border border-[#d6cfbe]">
            Step 1: Entrepreneur &amp; Location Inputs
          </span>
          <h2 className="text-xl font-bold text-[#2a2a22] mt-1.5">
            Rural Enterprise Parameters
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7a7866] font-medium hidden sm:inline">Try preset:</span>
          <div className="flex flex-wrap gap-1.5">
            {REGIONAL_LOCATION_PRESETS.slice(0, 3).map((loc) => (
              <button
                key={`${loc.state}-${loc.district}`}
                type="button"
                onClick={() =>
                  onChange({
                    state: loc.state,
                    district: loc.district,
                    block: loc.block,
                    village: loc.village,
                  })
                }
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#f8f7f2] hover:bg-[#e9e4d9] border border-[#e0ddcc] text-[#5a6344] transition-colors cursor-pointer"
              >
                {loc.village}, {loc.district}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6 mt-6"
      >
        {/* Section 1: Geographic Location */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-[#b45a3a]" />
            <label className="text-sm font-bold text-[#2a2a22]">{t.locationLabel}</label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label htmlFor="state-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                {t.state}
              </label>
              <input
                id="state-input"
                type="text"
                required
                value={inputs.state}
                onChange={(e) => onChange({ state: e.target.value })}
                placeholder="e.g. Madhya Pradesh"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-[#fdfaf3]"
              />
            </div>
            <div>
              <label htmlFor="district-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                {t.district}
              </label>
              <input
                id="district-input"
                type="text"
                required
                value={inputs.district}
                onChange={(e) => onChange({ district: e.target.value })}
                placeholder="e.g. Sehore"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-[#fdfaf3]"
              />
            </div>
            <div>
              <label htmlFor="block-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                {t.block}
              </label>
              <input
                id="block-input"
                type="text"
                required
                value={inputs.block}
                onChange={(e) => onChange({ block: e.target.value })}
                placeholder="e.g. Ashta"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-[#fdfaf3]"
              />
            </div>
            <div>
              <label htmlFor="village-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                {t.village}
              </label>
              <input
                id="village-input"
                type="text"
                required
                value={inputs.village}
                onChange={(e) => onChange({ village: e.target.value })}
                placeholder="e.g. Kothri"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-[#fdfaf3] font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Available Margin Capital (10%) */}
        <div className="bg-[#fdfaf3] rounded-2xl p-5 border border-[#ece7d6]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#b45a3a]" />
              <label htmlFor="margin-capital-input" className="text-sm font-bold text-[#2a2a22]">
                {t.marginCapitalLabel}
              </label>
            </div>
            <span className="text-xs font-bold text-[#b45a3a] bg-[#b45a3a]/15 px-3 py-0.5 rounded-full">
              Standard 10% Contribution Rule
            </span>
          </div>
          <p className="text-xs text-[#7a7866] mb-4">{t.marginHelpText}</p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Direct Number Input */}
            <div className="md:col-span-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#b45a3a] font-bold text-base">
                  ₹
                </span>
                <input
                  id="margin-capital-input"
                  type="number"
                  min="2000"
                  max="500000"
                  step="1000"
                  value={inputs.availableMargin}
                  onChange={(e) =>
                    onChange({ availableMargin: Math.max(1000, Number(e.target.value) || 0) })
                  }
                  className="w-full pl-8 pr-3 py-2.5 text-xl font-black text-[#b45a3a] bg-white border border-[#ece7d6] rounded-xl focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Slider with quick drag */}
            <div className="md:col-span-8 space-y-1">
              <input
                id="margin-slider"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={inputs.availableMargin}
                onChange={(e) => onChange({ availableMargin: Number(e.target.value) })}
                className="w-full accent-[#5a6344] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7a7866] font-medium">
                <span>₹5,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#ece7d6]">
            <span className="text-xs text-[#7a7866] font-medium mr-1">Quick Select:</span>
            {QUICK_MARGIN_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => onChange({ availableMargin: preset.value })}
                className={`text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  inputs.availableMargin === preset.value
                    ? "bg-[#5a6344] text-white border-[#5a6344] shadow-xs"
                    : "bg-white text-[#3b3a32] border-[#d6cfbe] hover:border-[#5a6344]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Real-time Math Preview Bar */}
          <div className="mt-4 bg-white rounded-2xl p-4 border border-[#e0ddcc] grid grid-cols-1 sm:grid-cols-3 gap-3 shadow-xs">
            <div className="border-b sm:border-b-0 sm:border-r border-[#f0eee4] pb-2 sm:pb-0 sm:pr-3">
              <span className="text-[11px] font-medium text-[#7a7866] block">
                10% Margin Provided
              </span>
              <span className="text-base font-black text-[#b45a3a]">
                {formatINR(inputs.availableMargin)}
              </span>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-[#f0eee4] pb-2 sm:pb-0 sm:pr-3">
              <span className="text-[11px] font-medium text-[#7a7866] block">
                {t.projectCostCalculated}
              </span>
              <span className="text-base font-black text-[#2a2a22]">
                {formatINR(calculatedProject)}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#7a7866] block">
                {t.loanEligibilityCalculated}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-[#5a6344]">
                  {formatINR(calculatedLoan)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isMicro ? "bg-[#b45a3a]/15 text-[#b45a3a]" : "bg-[#e9e4d9] text-[#5a6344]"
                  }`}
                >
                  {isMicro ? "Micro Finance (6.5%)" : "Term Loan (8.0%)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Proposed Business Category */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#5a6344]" />
              <label className="text-sm font-bold text-[#2a2a22]">
                {t.businessCategoryLabel}
              </label>
            </div>
            <span className="text-xs text-[#7a7866]">Select standard archetype or custom</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {POPULAR_BUSINESS_CATEGORIES.map((cat) => {
              const isSelected = inputs.businessCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChange({ businessCategory: cat.name })}
                  className={`text-left p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#fdfaf3] border-[#5a6344] ring-1 ring-[#5a6344] shadow-xs"
                      : "bg-white border-[#ece7d6] hover:border-[#5a6344] hover:bg-[#fdfaf3]"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#5a6344] absolute top-2.5 right-2.5" />
                  )}
                  <div className="mb-2.5 p-2 rounded-xl bg-[#e9e4d9]/60 w-fit text-[#5a6344]">
                    {ICON_MAP[cat.iconName] || <Briefcase className="w-5 h-5 text-[#5a6344]" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#2a2a22] line-clamp-2">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#7a7866] mt-0.5 font-medium">
                      Rec. Margin: {formatINR(cat.recommendedMargin)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom business option or additional context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label htmlFor="custom-category-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                Custom Business Name (Optional)
              </label>
              <input
                id="custom-category-input"
                type="text"
                value={inputs.businessCategory}
                onChange={(e) => onChange({ businessCategory: e.target.value })}
                placeholder="Or type a specific activity..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-white"
              />
            </div>
            <div>
              <label htmlFor="custom-details-input" className="block text-xs font-semibold text-[#7a7866] mb-1">
                Specific Local Nuance / Context
              </label>
              <input
                id="custom-details-input"
                type="text"
                value={inputs.customDetails}
                onChange={(e) => onChange({ customDetails: e.target.value })}
                placeholder={t.customDetailsPlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#ece7d6] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-[#2a2a22] bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            id="generate-feasibility-btn"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5a6344] hover:bg-[#4d5539] active:bg-[#3f462f] text-white font-bold py-3.5 px-6 rounded-full shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-[#e9e4d9]" />
                <span>{t.generatingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#f8f7f2]" />
                <span>{t.generateReportBtn}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
