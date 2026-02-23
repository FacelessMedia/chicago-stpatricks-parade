"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Clover, Crown, Star, Award, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Organization Info" },
  { id: 2, title: "Package Selection" },
  { id: 3, title: "Parade Entry" },
  { id: 4, title: "Ad Book" },
  { id: 5, title: "Review & Submit" },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: "",
    address: "",
    fullName: "",
    phone: "",
    email: "",
    packageType: "",
    selectedPackage: "",
    paradeEntry: false,
    unitDescription: "",
    marchers: "",
    useFloat: false,
    floatCompany: "",
    numVehicles: "",
    vehicleDescription: "",
    unitMarshal1: "",
    unitMarshal2: "",
    hasBand: false,
    bandName: "",
    bandDirector: "",
    bandEmail: "",
    bandApproved: false,
    adSize: "",
    bannerName: "",
    grandstandQty: 0,
    cbcSeats: 10,
    cbcFullTable: true,
  });

  const updateField = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4 text-shadow">
            Register to Participate
          </h1>
          <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
            Join one of the nation&apos;s most celebrated St. Patrick&apos;s Day parades
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="py-8 px-4 bg-white border-b border-emerald-100 sticky top-20 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                      currentStep > step.id
                        ? "bg-emerald-600 text-white"
                        : currentStep === step.id
                        ? "bg-gold-500 text-emerald-950"
                        : "bg-emerald-100 text-emerald-400"
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium hidden sm:block",
                    currentStep >= step.id ? "text-charcoal" : "text-charcoal/40"
                  )}>
                    {step.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2",
                    currentStep > step.id ? "bg-emerald-500" : "bg-emerald-100"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-4 bg-cream min-h-[60vh]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-emerald-100 shadow-xl">

            {/* Step 1: Organization Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Clover className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Organization Information</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Organization / Company Name *</label>
                  <input
                    type="text"
                    value={formData.orgName}
                    onChange={(e) => updateField("orgName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                    placeholder="e.g., O'Brien's Restaurant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                    placeholder="Street Address, City, State, Zip"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Contact Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                      placeholder="John O'Brien"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                      placeholder="(312) 555-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                    placeholder="john@obriensrestaurant.com"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Package Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Star className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Package Selection</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-3">Are you interested in a parade package?</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Yes — I'd like a package", "No — À la carte items only"].map((option, i) => (
                      <button
                        key={i}
                        onClick={() => updateField("packageType", i === 0 ? "package" : "alacarte")}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          formData.packageType === (i === 0 ? "package" : "alacarte")
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-emerald-200 hover:border-emerald-300"
                        )}
                      >
                        <span className="font-semibold text-charcoal">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.packageType === "package" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-charcoal mb-2">Select your preferred package:</label>
                    {[
                      { id: "vip", name: "VIP Shamrock Package", icon: Crown, desc: "Full VIP experience with 6 boat tickets" },
                      { id: "executive", name: "Executive Shamrock Package", icon: Star, desc: "Premium experience with 4 boat tickets" },
                      { id: "premier", name: "Premier Shamrock Package — $4,500", icon: Award, desc: "Great value with 2 boat tickets" },
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => updateField("selectedPackage", pkg.id)}
                        className={cn(
                          "w-full p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4",
                          formData.selectedPackage === pkg.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-emerald-200 hover:border-emerald-300"
                        )}
                      >
                        <pkg.icon className={cn("w-8 h-8 shrink-0", formData.selectedPackage === pkg.id ? "text-emerald-600" : "text-emerald-300")} />
                        <div>
                          <span className="font-bold text-charcoal block">{pkg.name}</span>
                          <span className="text-charcoal/60 text-sm">{pkg.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {formData.packageType === "alacarte" && (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <p className="text-emerald-800 text-sm font-medium mb-2">À La Carte Options</p>
                    <p className="text-charcoal/60 text-sm">
                      You can select individual items like parade entry, grandstand seats, ad book ads,
                      raffle tickets, and more in the following steps.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Light Pole Banner Name (displayed on Columbus Drive)
                  </label>
                  <input
                    type="text"
                    value={formData.bannerName}
                    onChange={(e) => updateField("bannerName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Parade Entry Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Clover className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Parade Entry Details</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-3">Will you have an entry in the Parade?</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => updateField("paradeEntry", option === "Yes")}
                        className={cn(
                          "p-4 rounded-xl border-2 text-center font-semibold transition-all",
                          formData.paradeEntry === (option === "Yes")
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-emerald-200 hover:border-emerald-300 text-charcoal"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.paradeEntry && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Unit Description *</label>
                      <textarea
                        value={formData.unitDescription}
                        onChange={(e) => updateField("unitDescription", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream resize-none"
                        placeholder="Describe your parade unit (e.g., float with dancers, marching group with banner...)"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Number of Marchers</label>
                        <input
                          type="number"
                          value={formData.marchers}
                          onChange={(e) => updateField("marchers", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Number of Vehicles</label>
                        <input
                          type="number"
                          value={formData.numVehicles}
                          onChange={(e) => updateField("numVehicles", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-3">Will you be using a Float Company?</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {["Yes", "No"].map((option) => (
                          <button
                            key={option}
                            onClick={() => updateField("useFloat", option === "Yes")}
                            className={cn(
                              "p-3 rounded-xl border-2 text-center font-semibold transition-all text-sm",
                              formData.useFloat === (option === "Yes")
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                                : "border-emerald-200 hover:border-emerald-300 text-charcoal"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.useFloat && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1.5">Float/Trolley Company Name</label>
                          <input
                            type="text"
                            value={formData.floatCompany}
                            onChange={(e) => updateField("floatCompany", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1.5">Vehicle Description</label>
                          <input
                            type="text"
                            value={formData.vehicleDescription}
                            onChange={(e) => updateField("vehicleDescription", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Unit Marshal 1</label>
                        <input
                          type="text"
                          value={formData.unitMarshal1}
                          onChange={(e) => updateField("unitMarshal1", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1.5">Unit Marshal 2</label>
                        <input
                          type="text"
                          value={formData.unitMarshal2}
                          onChange={(e) => updateField("unitMarshal2", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Ad Book */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Upload className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Parade Ad Book</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-3">Select Ad Size (if purchasing separately)</label>
                  <div className="space-y-3">
                    {[
                      { id: "full-color", name: "Full Page Color Ad", note: "Premium placement" },
                      { id: "full-bw", name: "Full Page Black & White Ad", note: "Standard placement" },
                      { id: "half-bw", name: "Half Page Black & White Ad", note: "Included with parade entry" },
                      { id: "none", name: "No additional ad", note: "Package ads are already included" },
                    ].map((ad) => (
                      <button
                        key={ad.id}
                        onClick={() => updateField("adSize", ad.id)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all",
                          formData.adSize === ad.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-emerald-200 hover:border-emerald-300"
                        )}
                      >
                        <span className="font-semibold text-charcoal block">{ad.name}</span>
                        <span className="text-charcoal/60 text-sm">{ad.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.adSize && formData.adSize !== "none" && (
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <Upload className="w-8 h-8 text-emerald-600 mb-3" />
                    <h3 className="font-bold text-charcoal mb-2">Upload Your Logo / Ad Artwork</h3>
                    <p className="text-charcoal/60 text-sm mb-4">
                      Please upload your logo or ad artwork in high resolution (PDF, PNG, or JPG).
                      Artwork deadline: January 30, 2026.
                    </p>
                    <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                      <p className="text-emerald-600 font-medium text-sm">Click to upload or drag & drop</p>
                      <p className="text-emerald-400 text-xs mt-1">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Check className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Review & Submit</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <h3 className="font-bold text-emerald-800 mb-3">Organization</h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <p><span className="text-charcoal/60">Name:</span> <span className="font-medium">{formData.orgName || "—"}</span></p>
                      <p><span className="text-charcoal/60">Contact:</span> <span className="font-medium">{formData.fullName || "—"}</span></p>
                      <p><span className="text-charcoal/60">Email:</span> <span className="font-medium">{formData.email || "—"}</span></p>
                      <p><span className="text-charcoal/60">Phone:</span> <span className="font-medium">{formData.phone || "—"}</span></p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                    <h3 className="font-bold text-emerald-800 mb-3">Package & Selections</h3>
                    <div className="text-sm space-y-2">
                      <p><span className="text-charcoal/60">Type:</span> <span className="font-medium capitalize">{formData.packageType || "—"}</span></p>
                      {formData.selectedPackage && <p><span className="text-charcoal/60">Package:</span> <span className="font-medium capitalize">{formData.selectedPackage}</span></p>}
                      <p><span className="text-charcoal/60">Parade Entry:</span> <span className="font-medium">{formData.paradeEntry ? "Yes" : "No"}</span></p>
                      {formData.adSize && <p><span className="text-charcoal/60">Ad:</span> <span className="font-medium capitalize">{formData.adSize}</span></p>}
                    </div>
                  </div>

                  <div className="bg-gold-50 rounded-xl p-5 border border-gold-200">
                    <p className="text-gold-800 text-sm font-medium">
                      By submitting this registration, you agree to the terms and conditions of the
                      Chicago St. Patrick&apos;s Day Parade. Payment will be processed separately via Stripe.
                      A member of the parade committee will follow up with you to confirm details and arrange payment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-emerald-100">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold rounded-full transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < STEPS.length ? (
                <button
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all">
                  Submit Registration <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Help */}
          <div className="text-center mt-8">
            <p className="text-charcoal/60 text-sm">
              Need help? <Link href="/contact" className="text-emerald-700 hover:text-emerald-600 font-semibold underline underline-offset-4">Contact us</Link> or email parade@chicagostpatricksdayparade.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
