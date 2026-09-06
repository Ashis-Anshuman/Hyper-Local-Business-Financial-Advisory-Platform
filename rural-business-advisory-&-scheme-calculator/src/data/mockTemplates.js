export const POPULAR_BUSINESS_CATEGORIES = [
  {
    id: "dairy",
    name: "Dairy Farming & Milk Chilling Unit",
    categoryGroup: "Animal Husbandry & Allied",
    iconName: "Milk",
    recommendedMargin: 100000, // ₹1,00,000 -> ₹10 Lakhs (Term Loan)
    description: "2-4 crossbred cows/buffaloes, automated milking machine, milk analyzer, and cooling cans supplying local dairy cooperative.",
    capexItems: ["Crossbred milch cattle", "Cattle shed with concrete flooring", "Milking machine & aluminum milk cans", "Biogas/solar water heater"],
    workingCapitalItems: ["Cattle feed (dry & green fodder)", "Veterinary medicine & vaccination buffer", "Initial 45-day operational cash"],
  },
  {
    id: "retail-kirana",
    name: "Rural Kirana & Daily Staples Store",
    categoryGroup: "Retail & Trade",
    iconName: "Store",
    recommendedMargin: 50000, // ₹50,000 -> ₹5 Lakhs (Term Loan)
    description: "Comprehensive village general store stocking packaged FMCG, pulses, oils, household utilities, and digital payment kiosk.",
    capexItems: ["Steel display racks & counter", "Digital weighing scale & POS billing machine", "Commercial refrigerator / deep freezer", "Store sign board & LED lighting"],
    workingCapitalItems: ["Opening FMCG grocery inventory (30 days)", "Wholesale grain & oil bulk stock", "UPI float & cash buffer"],
  },
  {
    id: "micro-tailoring",
    name: "Garment Tailoring & Boutique Unit",
    categoryGroup: "Textiles & Crafts",
    iconName: "Scissors",
    recommendedMargin: 14000, // ₹14,000 -> ₹1.40 Lakh (Micro Finance Scheme!)
    description: "Single-operator motorized sewing, overlock, and embroidery unit fulfilling village school uniforms and festive garments.",
    capexItems: ["High-speed motorized sewing machine", "Interlock/Overlock machine", "Cutting table & pressing iron", "Display mannequin & rack"],
    workingCapitalItems: ["Fabrics, lining & canvas rolls", "Threads, zips, buttons & embellishments", "Pre-festive buffer capital"],
  },
  {
    id: "poultry",
    name: "Commercial Broiler / Layer Poultry Farm",
    categoryGroup: "Animal Husbandry",
    iconName: "Egg",
    recommendedMargin: 150000, // ₹1.5L -> ₹15 Lakhs
    description: "Deep litter poultry shed for 1,000-2,000 birds with automatic drinkers, feeders, and direct wholesale trader tie-up.",
    capexItems: ["Ventilated poultry shed construction", "Brooders, automatic feeders & drinkers", "Foggers & mesh security fencing", "Weighing scale & crates"],
    workingCapitalItems: ["Day-old chicks batch purchase", "Starter & finisher feed stock", "Vaccines & bio-security sanitizers"],
  },
  {
    id: "agro-milling",
    name: "Mini Flour Mill & Spice Grinding (Atta Chakki)",
    categoryGroup: "Food Processing",
    iconName: "Wheat",
    recommendedMargin: 80000, // ₹80,000 -> ₹8 Lakhs
    description: "Electric flour pulverizer and masala grinder serving custom grinding needs for 4-5 adjacent villages with zero travel.",
    capexItems: ["Commercial Atta Chakki pulverizer", "Heavy-duty masala/spice grinder", "3-phase electric motor & starter", "Dust extraction setup"],
    workingCapitalItems: ["Grain cleaning sieves & packing pouches", "Electricity deposit & maintenance fund", "Buffer inventory of whole spices"],
  },
  {
    id: "two-wheeler-repair",
    name: "Agri-Machinery & Two-Wheeler Service Center",
    categoryGroup: "Rural Services",
    iconName: "Wrench",
    recommendedMargin: 35000, // ₹35,000 -> ₹3.5 Lakhs
    description: "Tire inflator, pressure washer, and computerized diagnostic kit repairing motorcycles, pump sets, and power tillers.",
    capexItems: ["Air compressor with tire inflator", "Hydraulic ramp & basic toolkit", "High-pressure water washing pump", "Battery charger & spark tester"],
    workingCapitalItems: ["Engine oils, lubricants & coolants", "Fast-moving spare parts (filters, plugs, tubes)", "Consumables & puncture patches"],
  },
  {
    id: "goat-rearing",
    name: "Goat Rearing & Breeding Unit (10+1)",
    categoryGroup: "Livestock",
    iconName: "Beef",
    recommendedMargin: 12000, // ₹12,000 -> ₹1.2 Lakhs (Micro Finance)
    description: "Small breeding unit of 10 female goats and 1 male buck (Sirohi/Black Bengal) with high reproductive turnover.",
    capexItems: ["Elevated wooden/slatted goat shed", "10 female parent goats + 1 breeding buck", "Fencing & feeding troughs", "Ear tagging and basic kit"],
    workingCapitalItems: ["Mineral mixture & concentrate feed", "Deworming medicines & vaccines", "Green fodder seeds"],
  },
  {
    id: "csc-digital",
    name: "Rural Digital Kiosk & Mobile Repair Hub",
    categoryGroup: "IT & Services",
    iconName: "Laptop",
    recommendedMargin: 20000, // ₹20,000 -> ₹2 Lakhs
    description: "Laptop, all-in-one printer, biometric scanner, and phone repair kit offering DBT schemes, Aadhaar banking, and recharges.",
    capexItems: ["Laptop/Desktop with UPS backup", "Color multifunction printer/scanner", "Biometric fingerprint & iris scanner", "Lamination machine & hot-air gun"],
    workingCapitalItems: ["AEPS banking wallet cash reserve", "Photo paper, lamination sheets & inks", "Mobile accessories & tempered glass stock"],
  },
];

export const REGIONAL_LOCATION_PRESETS = [
  {
    state: "Madhya Pradesh",
    district: "Sehore",
    block: "Ashta",
    village: "Kothri",
  },
  {
    state: "Odisha",
    district: "Nuapada",
    block: "Komna",
    village: "Tarbod",
  },
  {
    state: "Uttar Pradesh",
    district: "Varanasi",
    block: "Pindra",
    village: "Phoolpur",
  },
  {
    state: "Bihar",
    district: "Muzaffarpur",
    block: "Bochaha",
    village: "Sarfuddinpur",
  },
  {
    state: "Maharashtra",
    district: "Yavatmal",
    block: "Ralegaon",
    village: "Wardha Khurd",
  },
  {
    state: "Tamil Nadu",
    district: "Madurai",
    block: "Vadipatti",
    village: "Alanganallur",
  },
  {
    state: "Rajasthan",
    district: "Nagaur",
    block: "Merta",
    village: "Riyan Badi",
  },
  {
    state: "West Bengal",
    district: "Purulia",
    block: "Manbazar",
    village: "Bispur",
  },
];

export const QUICK_MARGIN_PRESETS = [
  { label: "₹10,000", value: 10000, scheme: "Micro Finance (₹1.0L Project)" },
  { label: "₹14,000", value: 14000, scheme: "Micro Finance (₹1.4L Max Micro)" },
  { label: "₹25,000", value: 25000, scheme: "Term Loan (₹2.5L Project)" },
  { label: "₹50,000", value: 50000, scheme: "Term Loan (₹5.0L Project)" },
  { label: "₹1,00,000", value: 100000, scheme: "Term Loan (₹10.0L Project)" },
  { label: "₹2,50,000", value: 250000, scheme: "Term Loan (₹25.0L Project)" },
];
