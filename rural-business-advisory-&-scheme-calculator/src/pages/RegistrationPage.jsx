import React, { useState, useEffect } from "react";
import { useGramUdyamStore } from "../store/useGramUdyamStore";
import { LOCATION_DATA, getPincodeForLocation } from "../data/locationData";
import { POPULAR_BUSINESS_CATEGORIES } from "../data/mockTemplates";
import {
  Landmark,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Sparkles,
  Home,
  Check,
} from "lucide-react";

const RegistrationPage = ({
  onBackToHome,
  onOpenLogin,
  onRegistrationComplete,
}) => {
  const store = useGramUdyamStore();

  // Current step: 1: Personal Info, 2: Location, 3: Password & Review
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // States available in dropdown
  const availableStates = Object.keys(LOCATION_DATA);

  // Initial State default
  const defaultState = "Madhya Pradesh";
  const defaultDistrict = Object.keys(LOCATION_DATA[defaultState]?.districts || {})[0] || "Sehore";
  const defaultBlock = Object.keys(LOCATION_DATA[defaultState]?.districts[defaultDistrict]?.blocks || {})[0] || "Ashta";
  const defaultGP = Object.keys(LOCATION_DATA[defaultState]?.districts[defaultDistrict]?.blocks[defaultBlock]?.gramPanchayats || {})[0] || "Kothri Gram Panchayat";
  const defaultVillage = LOCATION_DATA[defaultState]?.districts[defaultDistrict]?.blocks[defaultBlock]?.gramPanchayats[defaultGP]?.villages[0] || "Kothri";
  const defaultPincode = LOCATION_DATA[defaultState]?.districts[defaultDistrict]?.blocks[defaultBlock]?.gramPanchayats[defaultGP]?.pincode || "466114";

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    name: "",
    dob: "",
    age: "",
    mobile: "",
    email: "",

    // Step 2: Location Information (Cascading Dropdowns)
    state: defaultState,
    district: defaultDistrict,
    block: defaultBlock,
    gramPanchayat: defaultGP,
    village: defaultVillage,
    pincode: defaultPincode,
    customVillage: "",
    customGP: "",

    // Enterprise Scheme Profile
    businessCategory: "Dairy Farming & Milk Chilling Unit",
    availableMargin: 100000,
    socialCategory: "OBC / SEBC", // For SCA appraisal

    // Step 3: Password & Security
    password: "",
    confirmPassword: "",
    termsAccepted: true,
  });

  // Derived location dropdown lists based on current selections
  const currentDistricts = Object.keys(LOCATION_DATA[formData.state]?.districts || {});
  const currentBlocks = Object.keys(LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks || {});
  const currentGPs = Object.keys(LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks[formData.block]?.gramPanchayats || {});
  const currentGPData = LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks[formData.block]?.gramPanchayats[formData.gramPanchayat];
  const currentVillages = currentGPData?.villages || [];

  // Auto calculate age whenever DOB changes
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    let computedAge = "";

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        ageYears--;
      }
      if (ageYears >= 0 && ageYears <= 110) {
        computedAge = ageYears.toString();
      }
    }

    setFormData((prev) => ({
      ...prev,
      dob: dobValue,
      age: computedAge,
    }));

    if (errors.dob || errors.age) {
      setErrors((prev) => ({ ...prev, dob: "", age: "" }));
    }
  };

  // Location Handlers with Cascading Resets
  const handleStateChange = (e) => {
    const newState = e.target.value;
    const districts = Object.keys(LOCATION_DATA[newState]?.districts || {});
    const firstDistrict = districts[0] || "";
    const blocks = Object.keys(LOCATION_DATA[newState]?.districts[firstDistrict]?.blocks || {});
    const firstBlock = blocks[0] || "";
    const gps = Object.keys(LOCATION_DATA[newState]?.districts[firstDistrict]?.blocks[firstBlock]?.gramPanchayats || {});
    const firstGP = gps[0] || "";
    const gpData = LOCATION_DATA[newState]?.districts[firstDistrict]?.blocks[firstBlock]?.gramPanchayats[firstGP];
    const firstVillage = gpData?.villages?.[0] || "";
    const newPincode = gpData?.pincode || getPincodeForLocation(newState, firstDistrict, firstBlock, firstGP);

    setFormData((prev) => ({
      ...prev,
      state: newState,
      district: firstDistrict,
      block: firstBlock,
      gramPanchayat: firstGP,
      village: firstVillage,
      pincode: newPincode,
      customGP: "",
      customVillage: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    const blocks = Object.keys(LOCATION_DATA[formData.state]?.districts[newDistrict]?.blocks || {});
    const firstBlock = blocks[0] || "";
    const gps = Object.keys(LOCATION_DATA[formData.state]?.districts[newDistrict]?.blocks[firstBlock]?.gramPanchayats || {});
    const firstGP = gps[0] || "";
    const gpData = LOCATION_DATA[formData.state]?.districts[newDistrict]?.blocks[firstBlock]?.gramPanchayats[firstGP];
    const firstVillage = gpData?.villages?.[0] || "";
    const newPincode = gpData?.pincode || getPincodeForLocation(formData.state, newDistrict, firstBlock, firstGP);

    setFormData((prev) => ({
      ...prev,
      district: newDistrict,
      block: firstBlock,
      gramPanchayat: firstGP,
      village: firstVillage,
      pincode: newPincode,
      customGP: "",
      customVillage: "",
    }));
  };

  const handleBlockChange = (e) => {
    const newBlock = e.target.value;
    const gps = Object.keys(LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks[newBlock]?.gramPanchayats || {});
    const firstGP = gps[0] || "";
    const gpData = LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks[newBlock]?.gramPanchayats[firstGP];
    const firstVillage = gpData?.villages?.[0] || "";
    const newPincode = gpData?.pincode || getPincodeForLocation(formData.state, formData.district, newBlock, firstGP);

    setFormData((prev) => ({
      ...prev,
      block: newBlock,
      gramPanchayat: firstGP,
      village: firstVillage,
      pincode: newPincode,
      customGP: "",
      customVillage: "",
    }));
  };

  const handleGPChange = (e) => {
    const newGP = e.target.value;
    if (newGP === "OTHER") {
      setFormData((prev) => ({
        ...prev,
        gramPanchayat: "OTHER",
        village: "OTHER",
      }));
      return;
    }

    const gpData = LOCATION_DATA[formData.state]?.districts[formData.district]?.blocks[formData.block]?.gramPanchayats[newGP];
    const firstVillage = gpData?.villages?.[0] || "";
    const newPincode = gpData?.pincode || formData.pincode;

    setFormData((prev) => ({
      ...prev,
      gramPanchayat: newGP,
      village: firstVillage,
      pincode: newPincode,
      customGP: "",
    }));
  };

  const handleVillageChange = (e) => {
    const newVillage = e.target.value;
    setFormData((prev) => ({
      ...prev,
      village: newVillage,
    }));
  };

  // Password strength score
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 5
  };

  const passwordScore = getPasswordStrength(formData.password);

  // Validate Step 1 (Personal Info)
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 18) {
        newErrors.age = "Beneficiary must be at least 18 years old for margin money credit";
      } else if (ageNum > 75) {
        newErrors.age = "Please verify age (must be under 75)";
      }
    }

    const cleanPhone = formData.mobile.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.mobile = "Mobile number is required";
    } else if (cleanPhone.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2 (Location)
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.state) newErrors.state = "Please select your state";
    if (!formData.district) newErrors.district = "Please select your district";
    if (!formData.block) newErrors.block = "Please select your block / tehsil";

    if (formData.gramPanchayat === "OTHER" && !formData.customGP.trim()) {
      newErrors.gramPanchayat = "Please enter your Gram Panchayat name";
    }

    if (formData.village === "OTHER" && !formData.customVillage.trim()) {
      newErrors.village = "Please enter your Village name";
    }

    const cleanPin = formData.pincode.replace(/\D/g, "");
    if (!cleanPin) {
      newErrors.pincode = "Pincode is required";
    } else if (cleanPin.length !== 6) {
      newErrors.pincode = "Please enter a valid 6-digit postal pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 3 (Password & Terms)
  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "Please accept the declaration to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next Step Action
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  // Previous Step Action
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else if (onBackToHome) {
      onBackToHome();
    }
  };

  // Final Registration Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const finalGP = formData.gramPanchayat === "OTHER" ? formData.customGP : formData.gramPanchayat;
    const finalVillage = formData.village === "OTHER" ? formData.customVillage : formData.village;

    const payload = {
      name: formData.name.trim(),
      dob: formData.dob,
      age: formData.age,
      mobile: formData.mobile.replace(/\D/g, ""),
      email: formData.email.trim().toLowerCase(),
      state: formData.state,
      district: formData.district,
      block: formData.block,
      gramPanchayat: finalGP,
      village: finalVillage,
      pincode: formData.pincode.replace(/\D/g, ""),
      businessCategory: formData.businessCategory,
      availableMargin: formData.availableMargin,
      socialCategory: formData.socialCategory,
    };

    // Register via Zustand store
    const registeredUser = store.registerUser(payload);
    setIsSubmitted(true);

    if (onRegistrationComplete) {
      onRegistrationComplete(registeredUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f2] text-[#2a2a22] flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e0ddcc] px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="p-2 -ml-2 rounded-xl text-[#7a7866] hover:text-[#2a2a22] hover:bg-[#e9e4d9] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <div className="h-4 w-px bg-[#d6cfbe]"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#5a6344] text-white flex items-center justify-center shadow-xs">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-[#2a2a22] block leading-none">
                  Gram<span className="text-[#b45a3a]">Udyam</span>
                </span>
                <span className="text-[10px] text-[#7a7866] font-medium tracking-wide">
                  Beneficiary Registration Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-[#7a7866] hidden md:inline">Already registered?</span>
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 text-xs font-bold text-[#5a6344] hover:text-[#2a2a22] bg-[#ffffff] hover:bg-[#e9e4d9] border border-[#d6cfbe] rounded-full transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Registration Content */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9e4d9] text-[#5a6344] text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5a6344]" />
              <span>Government 10% Margin Money Scheme Registration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#2a2a22] tracking-tight">
              Create Your Beneficiary Account
            </h1>
            <p className="text-xs sm:text-sm text-[#7a7866] mt-2 max-w-xl mx-auto">
              Provide your personal details, verify your Gram Panchayat &amp; village catchment, and set a password to access your bank-ready Detailed Project Report (DPR).
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#e0ddcc] p-4 sm:p-5 shadow-xs mb-8">
            <div className="flex items-center justify-between relative">
              {/* Connector line */}
              <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-[#e9e4d9] -z-0">
                <div
                  className="h-full bg-[#5a6344] transition-all duration-300"
                  style={{
                    width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
                  }}
                ></div>
              </div>

              {/* Step 1 Pill */}
              <button
                type="button"
                onClick={() => currentStep > 1 && setCurrentStep(1)}
                className={`relative z-10 flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  currentStep === 1
                    ? "bg-[#5a6344] text-white shadow-xs"
                    : currentStep > 1
                    ? "bg-[#e9e4d9] text-[#5a6344] font-bold"
                    : "bg-[#ffffff] text-[#7a7866] border border-[#d6cfbe]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    currentStep === 1
                      ? "bg-white text-[#5a6344]"
                      : currentStep > 1
                      ? "bg-[#5a6344] text-white"
                      : "bg-[#e9e4d9] text-[#7a7866]"
                  }`}
                >
                  {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-none">Personal Info</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Name, DOB, Mobile</div>
                </div>
              </button>

              {/* Step 2 Pill */}
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && validateStep1()) setCurrentStep(2);
                  if (currentStep === 3) setCurrentStep(2);
                }}
                className={`relative z-10 flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  currentStep === 2
                    ? "bg-[#5a6344] text-white shadow-xs"
                    : currentStep > 2
                    ? "bg-[#e9e4d9] text-[#5a6344] font-bold"
                    : "bg-[#ffffff] text-[#7a7866] border border-[#d6cfbe]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    currentStep === 2
                      ? "bg-white text-[#5a6344]"
                      : currentStep > 2
                      ? "bg-[#5a6344] text-white"
                      : "bg-[#e9e4d9] text-[#7a7866]"
                  }`}
                >
                  {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : "2"}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-none">Location Details</div>
                  <div className="text-[10px] opacity-80 mt-0.5">State, GP, Village</div>
                </div>
              </button>

              {/* Step 3 Pill */}
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && validateStep1()) {
                    setCurrentStep(2);
                  } else if (currentStep === 2 && validateStep2()) {
                    setCurrentStep(3);
                  }
                }}
                className={`relative z-10 flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  currentStep === 3
                    ? "bg-[#5a6344] text-white shadow-xs"
                    : "bg-[#ffffff] text-[#7a7866] border border-[#d6cfbe]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    currentStep === 3
                      ? "bg-white text-[#5a6344]"
                      : "bg-[#e9e4d9] text-[#7a7866]"
                  }`}
                >
                  3
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-none">Create Password</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Security &amp; Review</div>
                </div>
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#e0ddcc] p-6 sm:p-8 shadow-xs">
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {/* ======================================================== */}
              {/* STEP 1: PERSONAL INFORMATION                             */}
              {/* ======================================================== */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-[#ece7d6] pb-4">
                    <div className="flex items-center gap-2 text-[#5a6344] font-bold text-xs uppercase tracking-wide">
                      <User className="w-4 h-4" />
                      <span>Step 1 of 3: Personal Information</span>
                    </div>
                    <h2 className="text-lg font-black text-[#2a2a22] mt-1">
                      Applicant Identification
                    </h2>
                    <p className="text-xs text-[#7a7866]">
                      Enter beneficiary details as listed in official identity records (Aadhaar / Voter ID).
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="reg-name" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                      Full Name of Beneficiary <span className="text-[#b45a3a]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-name"
                        type="text"
                        placeholder="e.g. Ramesh Chandra Patel"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-[#f8f7f2] border ${
                          errors.name ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                        } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Date of Birth and Age Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date of Birth */}
                    <div>
                      <label htmlFor="reg-dob" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Date of Birth <span className="text-[#b45a3a]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          id="reg-dob"
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          value={formData.dob}
                          onChange={handleDobChange}
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-[#f8f7f2] border ${
                            errors.dob ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                          } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                        />
                      </div>
                      {errors.dob ? (
                        <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.dob}</span>
                        </p>
                      ) : (
                        <span className="text-[10px] text-[#7a7866] mt-1 block">
                          Used to verify credit eligibility age criteria.
                        </span>
                      )}
                    </div>

                    {/* Age (Auto-calculated, adjustable) */}
                    <div>
                      <label htmlFor="reg-age" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Age (Years) <span className="text-[#b45a3a]">*</span>
                        {formData.dob && (
                          <span className="text-[10px] font-normal text-[#5a6344] ml-2">
                            (Auto-computed from DOB)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          id="reg-age"
                          type="number"
                          min="18"
                          max="80"
                          placeholder="e.g. 34"
                          value={formData.age}
                          onChange={(e) => {
                            setFormData({ ...formData, age: e.target.value });
                            if (errors.age) setErrors({ ...errors, age: "" });
                          }}
                          className={`w-full px-3.5 py-2.5 bg-[#f8f7f2] border ${
                            errors.age ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                          } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-[#7a7866] font-medium">
                          Years
                        </div>
                      </div>
                      {errors.age && (
                        <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.age}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="reg-mobile" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Mobile Number <span className="text-[#b45a3a]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866] text-xs font-bold">
                          +91
                        </div>
                        <input
                          id="reg-mobile"
                          type="tel"
                          maxLength="10"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setFormData({ ...formData, mobile: val });
                            if (errors.mobile) setErrors({ ...errors, mobile: "" });
                          }}
                          className={`w-full pl-12 pr-3.5 py-2.5 bg-[#f8f7f2] border ${
                            errors.mobile ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                          } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                        />
                      </div>
                      {errors.mobile && (
                        <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.mobile}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="reg-email" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Email Address <span className="text-[#b45a3a]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="reg-email"
                          type="email"
                          placeholder="ramesh.patel@example.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-[#f8f7f2] border ${
                            errors.email ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                          } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Category / Agency Quota Selection */}
                  <div>
                    <label htmlFor="reg-social" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                      Beneficiary Category (For Subsidized Interest &amp; SCA Quota)
                    </label>
                    <select
                      id="reg-social"
                      value={formData.socialCategory}
                      onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer"
                    >
                      <option value="OBC / Backward Classes (NBCFDC)">OBC / Backward Classes (NBCFDC - 6.5% to 7.0%)</option>
                      <option value="Scheduled Caste (NSFDC)">Scheduled Caste (NSFDC - 6.0% to 6.5%)</option>
                      <option value="Scheduled Tribe (NSTFDC)">Scheduled Tribe (NSTFDC - 6.0%)</option>
                      <option value="Religious Minority (NMDFC)">Religious Minority (NMDFC - 6.0% to 8.0%)</option>
                      <option value="Women SHG / NRLM Group">Women SHG / NRLM Cluster (Special Concession)</option>
                      <option value="General / Rural Unemployed Youth">General Rural Entrepreneur (SCA Term Loan)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* STEP 2: LOCATION INFORMATION (DROPDOWNS)                 */}
              {/* ======================================================== */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-[#ece7d6] pb-4">
                    <div className="flex items-center gap-2 text-[#5a6344] font-bold text-xs uppercase tracking-wide">
                      <MapPin className="w-4 h-4" />
                      <span>Step 2 of 3: Location Details</span>
                    </div>
                    <h2 className="text-lg font-black text-[#2a2a22] mt-1">
                      Rural Catchment &amp; Administrative Hierarchy
                    </h2>
                    <p className="text-xs text-[#7a7866]">
                      Select your State, District, Block, Gram Panchayat, and Village from the dropdown menus to automatically ground your 5–10 km market feasibility report.
                    </p>
                  </div>

                  {/* Row 1: State & District Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* State Dropdown */}
                    <div>
                      <label htmlFor="reg-state" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        State <span className="text-[#b45a3a]">*</span>
                      </label>
                      <select
                        id="reg-state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer font-semibold"
                      >
                        {availableStates.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.state}</p>
                      )}
                    </div>

                    {/* District Dropdown */}
                    <div>
                      <label htmlFor="reg-district" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        District <span className="text-[#b45a3a]">*</span>
                      </label>
                      <select
                        id="reg-district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer font-semibold"
                      >
                        {currentDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.district}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Block & Gram Panchayat Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Block Dropdown */}
                    <div>
                      <label htmlFor="reg-block" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Block / Taluka / Tehsil <span className="text-[#b45a3a]">*</span>
                      </label>
                      <select
                        id="reg-block"
                        value={formData.block}
                        onChange={handleBlockChange}
                        className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer font-semibold"
                      >
                        {currentBlocks.map((blk) => (
                          <option key={blk} value={blk}>
                            {blk}
                          </option>
                        ))}
                      </select>
                      {errors.block && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.block}</p>
                      )}
                    </div>

                    {/* Gram Panchayat Dropdown */}
                    <div>
                      <label htmlFor="reg-gp" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Gram Panchayat <span className="text-[#b45a3a]">*</span>
                      </label>
                      <select
                        id="reg-gp"
                        value={formData.gramPanchayat}
                        onChange={handleGPChange}
                        className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer font-semibold"
                      >
                        {currentGPs.map((gp) => (
                          <option key={gp} value={gp}>
                            {gp}
                          </option>
                        ))}
                        <option value="OTHER">+ Other Gram Panchayat (Type Manually)</option>
                      </select>
                      {errors.gramPanchayat && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.gramPanchayat}</p>
                      )}

                      {/* Custom GP Input if "OTHER" selected */}
                      {formData.gramPanchayat === "OTHER" && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Enter Gram Panchayat Name"
                            value={formData.customGP}
                            onChange={(e) => setFormData({ ...formData, customGP: e.target.value })}
                            className="w-full px-3 py-2 bg-[#ffffff] border border-[#b45a3a] rounded-xl text-xs text-[#2a2a22] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Village & Pincode Dropdown / Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Village Dropdown */}
                    <div>
                      <label htmlFor="reg-village" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Village <span className="text-[#b45a3a]">*</span>
                      </label>
                      {formData.gramPanchayat !== "OTHER" && currentVillages.length > 0 ? (
                        <select
                          id="reg-village"
                          value={formData.village}
                          onChange={handleVillageChange}
                          className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white cursor-pointer font-semibold"
                        >
                          {currentVillages.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                          <option value="OTHER">+ Other Village (Type Manually)</option>
                        </select>
                      ) : (
                        <input
                          id="reg-village-manual"
                          type="text"
                          placeholder="Enter your Village name"
                          value={formData.village === "OTHER" ? formData.customVillage : formData.village}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              village: "OTHER",
                              customVillage: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#f8f7f2] border border-[#d6cfbe] rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none"
                        />
                      )}

                      {formData.village === "OTHER" && formData.gramPanchayat !== "OTHER" && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Type Village Name"
                            value={formData.customVillage}
                            onChange={(e) => setFormData({ ...formData, customVillage: e.target.value })}
                            className="w-full px-3 py-2 bg-[#ffffff] border border-[#b45a3a] rounded-xl text-xs text-[#2a2a22] focus:outline-none"
                          />
                        </div>
                      )}

                      {errors.village && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.village}</p>
                      )}
                    </div>

                    {/* Pincode Input */}
                    <div>
                      <label htmlFor="reg-pincode" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                        Postal Pincode <span className="text-[#b45a3a]">*</span>
                        <span className="text-[10px] text-[#5a6344] font-normal ml-2">
                          (Auto-matched to GP)
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          id="reg-pincode"
                          type="text"
                          maxLength="6"
                          placeholder="466114"
                          value={formData.pincode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                            setFormData({ ...formData, pincode: val });
                            if (errors.pincode) setErrors({ ...errors, pincode: "" });
                          }}
                          className={`w-full pl-10 pr-3.5 py-2.5 bg-[#f8f7f2] border ${
                            errors.pincode ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                          } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all font-mono font-semibold`}
                        />
                      </div>
                      {errors.pincode && (
                        <p className="text-[11px] text-[#b45a3a] mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  {/* Proposed Trade & Margin Capital Preview */}
                  <div className="p-4 rounded-xl bg-[#e9e4d9]/50 border border-[#d6cfbe] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2a2a22]">Proposed Rural Enterprise Trade</span>
                      <span className="text-[11px] text-[#5a6344] font-bold">10% Margin Formula</span>
                    </div>
                    <select
                      value={formData.businessCategory}
                      onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#d6cfbe] rounded-xl text-xs text-[#2a2a22] font-semibold cursor-pointer"
                    >
                      {POPULAR_BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name} ({cat.categoryGroup})
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center justify-between text-xs text-[#7a7866]">
                      <span>Location Hierarchy:</span>
                      <span className="font-semibold text-[#2a2a22]">
                        {formData.village === "OTHER" ? formData.customVillage || "Village" : formData.village},{" "}
                        {formData.block}, {formData.district} ({formData.pincode})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* STEP 3: CREATE PASSWORD & ACCOUNT SECURITY                */}
              {/* ======================================================== */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-[#ece7d6] pb-4">
                    <div className="flex items-center gap-2 text-[#5a6344] font-bold text-xs uppercase tracking-wide">
                      <Lock className="w-4 h-4" />
                      <span>Step 3 of 3: Security &amp; Credentials</span>
                    </div>
                    <h2 className="text-lg font-black text-[#2a2a22] mt-1">
                      Create Your Secure Password
                    </h2>
                    <p className="text-xs text-[#7a7866]">
                      Set a password to protect your business financial plans and loan application records.
                    </p>
                  </div>

                  {/* Create Password */}
                  <div>
                    <label htmlFor="reg-password" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                      Create Password <span className="text-[#b45a3a]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        className={`w-full pl-10 pr-10 py-2.5 bg-[#f8f7f2] border ${
                          errors.password ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                        } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7a7866] hover:text-[#2a2a22] cursor-pointer"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#7a7866]">Password Strength:</span>
                          <span
                            className={`font-bold ${
                              passwordScore <= 2
                                ? "text-[#b45a3a]"
                                : passwordScore <= 3
                                ? "text-amber-600"
                                : "text-[#5a6344]"
                            }`}
                          >
                            {passwordScore <= 2 ? "Weak" : passwordScore <= 3 ? "Moderate" : "Strong & Secure"}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#e9e4d9] rounded-full overflow-hidden flex gap-1">
                          <div
                            className={`h-full transition-all ${
                              passwordScore >= 1
                                ? passwordScore <= 2
                                  ? "bg-[#b45a3a] w-1/3"
                                  : passwordScore <= 3
                                  ? "bg-amber-500 w-2/3"
                                  : "bg-[#5a6344] w-full"
                                : "w-0"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}

                    {errors.password && (
                      <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.password}</span>
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="reg-confirm-password" className="block text-xs font-bold text-[#2a2a22] mb-1.5">
                      Confirm Password <span className="text-[#b45a3a]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a7866]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="reg-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-type password exactly"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({ ...formData, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                        }}
                        className={`w-full pl-10 pr-10 py-2.5 bg-[#f8f7f2] border ${
                          errors.confirmPassword ? "border-[#b45a3a]" : "border-[#d6cfbe]"
                        } rounded-xl text-xs sm:text-sm text-[#2a2a22] focus:outline-none focus:ring-2 focus:ring-[#5a6344] focus:bg-white transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7a7866] hover:text-[#2a2a22] cursor-pointer"
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-[11px] text-[#b45a3a] mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.confirmPassword}</span>
                      </p>
                    )}
                  </div>

                  {/* Review Summary Card */}
                  <div className="p-4 rounded-xl bg-[#f8f7f2] border border-[#d6cfbe] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#5a6344]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Beneficiary Registration Summary</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#7a7866] block text-[10px]">Beneficiary Name:</span>
                        <span className="font-bold text-[#2a2a22]">{formData.name || "—"}</span>
                      </div>
                      <div>
                        <span className="text-[#7a7866] block text-[10px]">Age / DOB:</span>
                        <span className="font-bold text-[#2a2a22]">
                          {formData.age ? `${formData.age} Years` : "—"} ({formData.dob || "—"})
                        </span>
                      </div>
                      <div>
                        <span className="text-[#7a7866] block text-[10px]">Contact Mobile:</span>
                        <span className="font-bold text-[#2a2a22] font-mono">
                          {formData.mobile ? `+91 ${formData.mobile}` : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#7a7866] block text-[10px]">Official Email:</span>
                        <span className="font-bold text-[#2a2a22] truncate block">
                          {formData.email || "—"}
                        </span>
                      </div>
                      <div className="sm:col-span-2 pt-1 border-t border-[#ece7d6]">
                        <span className="text-[#7a7866] block text-[10px]">Registered Location Catchment:</span>
                        <span className="font-bold text-[#2a2a22]">
                          {formData.village === "OTHER" ? formData.customVillage : formData.village},{" "}
                          {formData.gramPanchayat === "OTHER" ? formData.customGP : formData.gramPanchayat},{" "}
                          {formData.block}, {formData.district}, {formData.state} - {formData.pincode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#7a7866]">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-0.5 rounded border-[#d6cfbe] text-[#5a6344] focus:ring-[#5a6344] cursor-pointer"
                      />
                      <span>
                        I declare that all personal and location details submitted are accurate. I understand that the 10% Margin Money Scheme appraisal requires genuine residency and verified Gram Panchayat identity.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-[11px] text-[#b45a3a] mt-1 font-medium">{errors.terms}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-[#ece7d6]">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-[#d6cfbe] bg-white hover:bg-[#e9e4d9] text-xs font-bold text-[#2a2a22] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{currentStep === 1 ? "Cancel" : "Previous Step"}</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#5a6344] hover:bg-[#4d5539] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to {currentStep === 1 ? "Location Details" : "Create Password"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#b45a3a] hover:bg-[#9d4c2f] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Registration &amp; Open DPR</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Bottom Help & Information Card */}
          <div className="mt-8 text-center text-xs text-[#7a7866] space-y-2">
            <p>
              Need assistance with your registration or Gram Panchayat documentation?
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e9e4d9]/60 rounded-full border border-[#d6cfbe] text-[11px] text-[#5a6344] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>State Channelizing Agency (SCA) &amp; National Finance Corporation Compliant</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;