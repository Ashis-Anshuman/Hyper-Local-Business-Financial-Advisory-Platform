import React, { useState } from "react";
import { useGramUdyamStore } from "../store/useGramUdyamStore";
import {
  X,
  User,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Building2,
  Sparkles,
  Lock,
} from "lucide-react";

export const DEMO_ACCOUNTS = [
  {
    id: "demo-entrepreneur-1",
    name: "Ramesh Patel",
    role: "Rural Entrepreneur",
    roleKey: "entrepreneur",
    village: "Kothri",
    block: "Ashta",
    district: "Sehore",
    state: "Madhya Pradesh",
    businessCategory: "Dairy Farming & Milk Chilling Unit",
    availableMargin: 100000,
    avatarBg: "bg-[#5a6344]",
    phone: "+91 98261 44102",
    badge: "10% Margin Ready (₹1.00 Lakh)",
  },
  {
    id: "demo-entrepreneur-2",
    name: "Sunita Devi",
    role: "Women SHG Lead / Artisan",
    roleKey: "entrepreneur",
    village: "Ramnagar",
    block: "Kashi",
    district: "Varanasi",
    state: "Uttar Pradesh",
    businessCategory: "Apparel, Uniforms & Tailoring Cluster",
    availableMargin: 50000,
    avatarBg: "bg-[#b45a3a]",
    phone: "+91 94502 11983",
    badge: "Micro Finance Ready (₹50,000 Margin)",
  },
  {
    id: "demo-officer-1",
    name: "Dr. Arvind Shrivastava",
    role: "SCA District Project Manager",
    roleKey: "officer",
    village: "District HQ",
    block: "Sehore Sadar",
    district: "Sehore",
    state: "Madhya Pradesh",
    businessCategory: "All Concessional Sectors (Reviewer)",
    availableMargin: 100000,
    avatarBg: "bg-[#2a2a22]",
    phone: "+91 91110 88234",
    badge: "SCA Verification Desk",
  },
];

export const AuthModal = (props) => {
  const store = useGramUdyamStore();
  const isOpen = props.isOpen !== undefined ? props.isOpen : store.isAuthModalOpen;
  const onClose = props.onClose ?? (() => store.setIsAuthModalOpen(false));
  const onLoginSuccess = props.onLoginSuccess ?? store.login;
  const onOpenRegister = props.onOpenRegister ?? (() => {
    onClose();
    store.setIsRegisterView(true);
  });
  const currentLang = props.currentLang ?? store.currentLang;
  const [activeTab, setActiveTab] = useState("quick"); // 'quick', 'phone', 'register'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // New registration form state
  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    village: "",
    block: "",
    district: "",
    state: "Madhya Pradesh",
    businessCategory: "Dairy Farming & Milk Chilling Unit",
    availableMargin: 50000,
  });

  if (!isOpen) return null;

  const handleSelectDemo = (account) => {
    onLoginSuccess(account);
    onClose();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.replace(/\D/g, "").length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpError("");
    setOtpSent(true);
    setEnteredOtp("4821"); // Auto-fill demo OTP for convenience
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp !== "4821" && enteredOtp.length !== 4) {
      setOtpError("Invalid OTP. For demo test, enter 4821");
      return;
    }

    // Authenticate with phone
    const user = {
      id: "phone-user-" + Date.now(),
      name: "Rural Beneficiary",
      role: "Rural Entrepreneur",
      roleKey: "entrepreneur",
      phone: phoneNumber,
      village: "Kothri",
      block: "Ashta",
      district: "Sehore",
      state: "Madhya Pradesh",
      businessCategory: "Dairy Farming & Milk Chilling Unit",
      availableMargin: 100000,
      avatarBg: "bg-[#5a6344]",
      badge: "Verified by Mobile OTP",
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.village || !regForm.district) {
      setOtpError("Please fill in name, village, and district");
      return;
    }

    const newUser = {
      id: "reg-user-" + Date.now(),
      name: regForm.name,
      role: "Registered Entrepreneur",
      roleKey: "entrepreneur",
      phone: regForm.phone || "+91 98000 00000",
      village: regForm.village,
      block: regForm.block || regForm.village,
      district: regForm.district,
      state: regForm.state,
      businessCategory: regForm.businessCategory,
      availableMargin: Number(regForm.availableMargin) || 50000,
      avatarBg: "bg-[#5a6344]",
      badge: `Registered (₹${(Number(regForm.availableMargin) || 50000).toLocaleString("en-IN")} Margin)`,
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 bg-[#2a2a22]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
    >
      <div
        id="auth-modal-box"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-[#e0ddcc] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-[#5a6344] text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#e9e4d9]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Sign In to GramUdyam Portal
              </h3>
              <p className="text-[11px] text-[#e9e4d9]">
                SCA Concessional Credit &amp; Feasibility Engine
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#e0ddcc] bg-[#f8f7f2] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("quick");
              setOtpError("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === "quick"
                ? "border-[#5a6344] text-[#5a6344] bg-white font-extrabold"
                : "border-transparent text-[#7a7866] hover:text-[#2a2a22]"
            }`}
          >
            🚀 1-Click Demo Logins
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              setOtpError("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === "phone"
                ? "border-[#5a6344] text-[#5a6344] bg-white font-extrabold"
                : "border-transparent text-[#7a7866] hover:text-[#2a2a22]"
            }`}
          >
            📱 Mobile OTP Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setOtpError("");
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === "register"
                ? "border-[#5a6344] text-[#5a6344] bg-white font-extrabold"
                : "border-transparent text-[#7a7866] hover:text-[#2a2a22]"
            }`}
          >
            ✨ New Registration
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {otpError && (
            <div className="p-2.5 rounded-xl bg-[#b45a3a]/10 border border-[#b45a3a]/30 text-[#b45a3a] text-xs font-medium">
              {otpError}
            </div>
          )}

          {/* TAB 1: 1-CLICK DEMO LOGINS */}
          {activeTab === "quick" && (
            <div className="space-y-3">
              <div className="bg-[#fdfaf3] p-3 rounded-xl border border-[#ece7d6]">
                <p className="text-[#3b3a32] text-[11px] leading-relaxed">
                  Select a pre-configured profile to explore GramUdyam's 10% Margin Scheme Calculator, localized market catchment analysis, and printable Bank DPR instantly:
                </p>
              </div>

              <div className="space-y-2.5">
                {DEMO_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => handleSelectDemo(acc)}
                    className="group bg-[#ffffff] hover:bg-[#f8f7f2] border border-[#e0ddcc] hover:border-[#5a6344] rounded-2xl p-3.5 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl ${acc.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}
                      >
                        {acc.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#2a2a22] group-hover:text-[#5a6344] transition-colors">
                            {acc.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e9e4d9] text-[#5a6344] font-semibold">
                            {acc.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7a7866] mt-0.5">
                          {acc.businessCategory} • {acc.village}, {acc.district}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold text-[#b45a3a]">
                          {acc.badge}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 w-8 h-8 rounded-full bg-[#f8f7f2] group-hover:bg-[#5a6344] group-hover:text-white text-[#5a6344] flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MOBILE OTP LOGIN */}
          {activeTab === "phone" && (
            <div className="space-y-4">
              <p className="text-[#7a7866] text-xs">
                Enter your 10-digit mobile number registered with your Self Help Group (SHG) or Gram Panchayat for instant OTP authentication:
              </p>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2a2a22] mb-1">
                      Mobile Number (मोबाइल नंबर)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2.5 bg-[#f8f7f2] border border-[#e0ddcc] rounded-xl font-bold text-xs text-[#2a2a22]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="98261 44102"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#e0ddcc] bg-[#ffffff] focus:border-[#5a6344] focus:ring-1 focus:ring-[#5a6344] outline-none text-xs font-medium text-[#2a2a22]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#5a6344] hover:bg-[#4d5539] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Send Verification Code (OTP)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div className="bg-[#fdfaf3] p-3 rounded-xl border border-[#ece7d6]">
                    <span className="text-[11px] text-[#7a7866] block">
                      Code sent to +91 {phoneNumber || "98261 44102"}
                    </span>
                    <span className="text-xs font-bold text-[#5a6344] block mt-0.5">
                      Demo Test OTP is pre-filled: 4821
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2a2a22] mb-1">
                      Enter 4-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="4821"
                      className="w-full tracking-widest text-center text-base font-black px-3.5 py-2 rounded-xl border border-[#e0ddcc] bg-[#ffffff] focus:border-[#5a6344] outline-none text-[#2a2a22]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#b45a3a] hover:bg-[#a04e32] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Verify &amp; Enter Platform</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-[#7a7866] hover:text-[#5a6344] underline"
                  >
                    Change Mobile Number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: NEW REGISTRATION */}
          {activeTab === "register" && (
            <div className="space-y-3">
              {/* Full Registration Page Banner CTA */}
              <div className="p-3 bg-[#e9e4d9]/70 rounded-xl border border-[#d6cfbe] flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-[#5a6344] block">Full 3-Step Beneficiary Registration</span>
                  <span className="text-[11px] text-[#7a7866] block">
                    Personal Info, Cascading GP/Village Dropdowns &amp; Password creation.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="px-3 py-1.5 bg-[#5a6344] hover:bg-[#4d5539] text-white text-[11px] font-bold rounded-lg shrink-0 transition-all cursor-pointer shadow-2xs"
                >
                  Open Full Page
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Entrepreneur Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    placeholder="+91 98261 44102"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Gram Panchayat / Village *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.village}
                    onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                    placeholder="e.g. Kothri"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Block / Tehsil
                  </label>
                  <input
                    type="text"
                    value={regForm.block}
                    onChange={(e) => setRegForm({ ...regForm, block: e.target.value })}
                    placeholder="e.g. Ashta"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.district}
                    onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                    placeholder="e.g. Sehore"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={regForm.state}
                    onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                    placeholder="Madhya Pradesh"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Proposed Trade / Activity
                  </label>
                  <input
                    type="text"
                    value={regForm.businessCategory}
                    onChange={(e) => setRegForm({ ...regForm, businessCategory: e.target.value })}
                    placeholder="Dairy, Flour Mill, Tailoring"
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2a2a22] mb-0.5">
                    Available Margin (10% Self Cash)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={regForm.availableMargin}
                    onChange={(e) => setRegForm({ ...regForm, availableMargin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#e0ddcc] text-xs outline-none focus:border-[#5a6344]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#5a6344] hover:bg-[#4d5539] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Complete Registration &amp; Open Plan</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-[#f8f7f2] border-t border-[#e0ddcc] p-3 text-center text-[11px] text-[#7a7866] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5a6344]" />
          <span>Compliant with State Channelizing Agency Direct Benefit Lending Norms</span>
        </div>
      </div>
    </div>
  );
};
