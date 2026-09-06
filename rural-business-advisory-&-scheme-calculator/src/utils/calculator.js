export function calculateSchemeDetails(marginInput) {
  // Margin input (10% promoter contribution)
  const availableMargin = Math.max(1000, Math.round(marginInput));
  
  // Total Feasible Project Cost = Available Margin / 10%
  const feasibleProjectCost = availableMargin * 10;

  // Determine Scheme Tier
  let schemeTier = "TERM_LOAN";
  let schemeName = "Term Loan Scheme (SCA Concessional Credit)";
  let interestRateAnnual = 8.0;
  let tenureYears = 7;
  let moratoriumMonths = 6; // 2 quarters
  let maxLoanCap = 4500000; // ₹45.00 Lakh

  if (feasibleProjectCost <= 140000) {
    schemeTier = "MICRO_FINANCE";
    schemeName = "Micro Finance Scheme (SCA Concessional Credit)";
    interestRateAnnual = 6.5;
    tenureYears = 3;
    moratoriumMonths = 3; // 1 quarter
    maxLoanCap = 125000; // ₹1.25 Lakh cap as stated in guidelines
  } else if (feasibleProjectCost > 5000000) {
    schemeTier = "ABOVE_LIMIT";
    schemeName = "Special High-Tier Term Loan (MSME / Co-financed)";
    interestRateAnnual = 8.5;
    tenureYears = 7;
    moratoriumMonths = 6;
    maxLoanCap = 4500000;
  }

  // Loan is 90% of Project Cost, up to scheme maximum cap
  const calculatedLoan = feasibleProjectCost * 0.9;
  const loanEligibility = Math.min(calculatedLoan, maxLoanCap);

  const totalQuarters = tenureYears * 4; // 12 or 28
  const moratoriumQuarters = Math.max(1, Math.round(moratoriumMonths / 3)); // 1 or 2
  const activeRepaymentQuarters = totalQuarters - moratoriumQuarters;

  const quarterlyRate = interestRateAnnual / 100 / 4;

  // Amortization Schedule Calculation
  const schedule = [];
  let currentBalance = loanEligibility;
  let totalInterestPayable = 0;

  // Standard Equal Principal Repayment with quarterly interest on reducing balance (standard SCA norm)
  const principalPerQuarter = activeRepaymentQuarters > 0 ? loanEligibility / activeRepaymentQuarters : 0;
  
  // Quarterly interest during moratorium
  const quarterlyInterestDuringMoratorium = Math.round(loanEligibility * quarterlyRate);

  for (let q = 1; q <= totalQuarters; q++) {
    const isMoratorium = q <= moratoriumQuarters;
    const year = Math.ceil(q / 4);
    const quarterOfYear = ((q - 1) % 4) + 1;
    const label = `Y${year} Q${quarterOfYear}`;

    const openingBalance = Math.round(currentBalance);
    const interestPayment = Math.round(openingBalance * quarterlyRate);
    
    let principalPayment = 0;
    if (!isMoratorium) {
      if (q === totalQuarters) {
        // Last quarter clears remainder
        principalPayment = openingBalance;
      } else {
        principalPayment = Math.min(openingBalance, Math.round(principalPerQuarter));
      }
    }

    const totalPayment = principalPayment + interestPayment;
    const closingBalance = Math.max(0, openingBalance - principalPayment);
    currentBalance = closingBalance;
    totalInterestPayable += interestPayment;

    schedule.push({
      quarter: q,
      year,
      label,
      isMoratorium,
      openingBalance,
      principalPayment,
      interestPayment,
      totalPayment,
      closingBalance,
    });
  }

  // Estimate Post-moratorium representative payment (first active quarter payment)
  const firstActiveQuarter = schedule.find((s) => !s.isMoratorium);
  const quarterlyPaymentPostMoratorium = firstActiveQuarter
    ? firstActiveQuarter.totalPayment
    : Math.round(principalPerQuarter + loanEligibility * quarterlyRate);

  const totalRepaymentAmount = loanEligibility + totalInterestPayable;

  // CAPEX vs Working Capital split (typically 70% CAPEX, 30% OPEX/Working capital for micro-enterprises)
  const capexRatio = 0.7;
  const workingCapitalRatio = 0.3;
  const capexAmount = Math.round(feasibleProjectCost * capexRatio);
  const workingCapitalAmount = Math.round(feasibleProjectCost * workingCapitalRatio);

  return {
    availableMargin,
    feasibleProjectCost,
    loanEligibility,
    promoterContributionPercent: 10,
    loanPercentage: 90,
    schemeTier,
    schemeName,
    interestRateAnnual,
    tenureYears,
    totalQuarters,
    moratoriumMonths,
    moratoriumQuarters,
    activeRepaymentQuarters,
    quarterlyInterestDuringMoratorium,
    quarterlyPaymentPostMoratorium,
    totalInterestPayable,
    totalRepaymentAmount,
    capexAmount,
    workingCapitalAmount,
    capexRatio,
    workingCapitalRatio,
    schedule,
  };
}

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}
