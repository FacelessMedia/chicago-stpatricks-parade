"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Clover, Crown, Star, Award, Upload, CalendarClock, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { isRegistrationOpen, getSalesOpenLabel } from "@/lib/season";
import { ALA_CARTE_ITEMS, PACKAGES } from "@/lib/data";

const STEPS = [
  { id: 1, title: "Organization Info" },
  { id: 2, title: "Package Selection" },
  { id: 3, title: "Parade Entry" },
  { id: 4, title: "Ad Book" },
  { id: 5, title: "Review & Payment" },
];

const AD_IDS = ["ad-full-color", "ad-full-bw", "ad-half-bw"];

interface QuantitySelectorProps {
  label: string;
  description: string;
  priceLabel: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}

function QuantitySelector({ label, description, priceLabel, value, max, onChange }: QuantitySelectorProps) {
  return (
    <div className={cn(
      "rounded-xl border-2 p-4 transition-all",
      value > 0 ? "border-emerald-600 bg-emerald-50" : "border-emerald-200"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-charcoal">{label}</p>
          <p className="text-sm text-charcoal/60 mt-1">{description}</p>
          <p className="text-sm font-bold text-emerald-700 mt-2">{priceLabel}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onChange(Math.max(0, value - 1))}
            className="w-9 h-9 rounded-full border border-emerald-300 flex items-center justify-center hover:bg-white disabled:opacity-40"
            disabled={value === 0}
            aria-label={`Remove one ${label}`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-bold text-charcoal">{value}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, value + 1))}
            className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-600 disabled:opacity-40"
            disabled={value >= max}
            aria-label={`Add one ${label}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");
  const [reference, setReference] = useState("");
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
    bannerQty: 0,
    grandstandQty: 0,
    cbcSeats: 0,
    cbcTables: 0,
    raffleQty: 0,
    lapelPinQty: 0,
    donationAmount: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") !== "alacarte") return;
    const item = params.get("item") || "";
    setFormData((prev) => ({
      ...prev,
      packageType: "alacarte",
      paradeEntry: item === "parade-entry",
      adSize: AD_IDS.includes(item) ? item : "",
      cbcSeats: item === "cbc-seat" ? 1 : 0,
      cbcTables: item === "cbc-table" ? 1 : 0,
      grandstandQty: item === "grandstand" ? 1 : 0,
      bannerQty: item === "light-pole-banner" ? 1 : 0,
      raffleQty: item === "raffle" ? 1 : 0,
      lapelPinQty: item === "lapel-pin" ? 1 : 0,
      donationAmount: item === "donation" ? 25 : 0,
    }));
  }, []);

  const updateField = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectPackageType = (packageType: "package" | "alacarte") => {
    setFormData((prev) => ({
      ...prev,
      packageType,
      selectedPackage: "",
      paradeEntry: false,
      adSize: "",
      bannerName: "",
      bannerQty: 0,
      grandstandQty: 0,
      cbcSeats: 0,
      cbcTables: 0,
      raffleQty: 0,
      lapelPinQty: 0,
      donationAmount: 0,
    }));
  };

  const selectedPackageData = PACKAGES.find((pkg) => pkg.id === formData.selectedPackage);
  const packageAdId = formData.selectedPackage
    ? formData.selectedPackage === "premier" ? "ad-full-bw" : "ad-full-color"
    : "";
  const effectiveAdId = formData.packageType === "package" ? packageAdId : formData.adSize;
  const selectedAd = ALA_CARTE_ITEMS.find((item) => item.id === effectiveAdId);
  const hasAlaCarteSelection = Boolean(
    formData.paradeEntry ||
    formData.adSize ||
    formData.bannerQty ||
    formData.grandstandQty ||
    formData.cbcSeats ||
    formData.cbcTables ||
    formData.raffleQty ||
    formData.lapelPinQty ||
    formData.donationAmount
  );
  const visibleSteps = useMemo(
    () => STEPS.filter((step) => {
      if (step.id === 3) return formData.packageType === "package" || formData.paradeEntry;
      if (step.id === 4) return Boolean(effectiveAdId);
      return true;
    }),
    [effectiveAdId, formData.packageType, formData.paradeEntry]
  );
  const orderTotal = useMemo(() => {
    if (formData.packageType === "package") return selectedPackageData?.price || 0;
    const itemPrice = (id: string) => ALA_CARTE_ITEMS.find((item) => item.id === id)?.price || 0;
    return (
      (formData.paradeEntry ? itemPrice("parade-entry") : 0) +
      (formData.adSize ? itemPrice(formData.adSize) : 0) +
      formData.bannerQty * itemPrice("light-pole-banner") +
      formData.grandstandQty * itemPrice("grandstand") +
      formData.cbcSeats * itemPrice("cbc-seat") +
      formData.cbcTables * itemPrice("cbc-table") +
      formData.raffleQty * itemPrice("raffle") +
      formData.lapelPinQty * itemPrice("lapel-pin") +
      formData.donationAmount
    );
  }, [formData, selectedPackageData]);
  const reviewLines = useMemo(() => {
    if (formData.packageType === "package" && selectedPackageData) {
      return [{ label: selectedPackageData.name, quantity: 1, total: selectedPackageData.price }];
    }
    const lines: Array<{ label: string; quantity: number; total: number }> = [];
    const addItem = (id: string, quantity: number) => {
      const item = ALA_CARTE_ITEMS.find((candidate) => candidate.id === id);
      if (item && quantity > 0) lines.push({ label: item.name, quantity, total: item.price * quantity });
    };
    addItem("parade-entry", formData.paradeEntry ? 1 : 0);
    addItem(formData.adSize, formData.adSize ? 1 : 0);
    addItem("cbc-seat", formData.cbcSeats);
    addItem("cbc-table", formData.cbcTables);
    addItem("grandstand", formData.grandstandQty);
    addItem("light-pole-banner", formData.bannerQty);
    addItem("raffle", formData.raffleQty);
    addItem("lapel-pin", formData.lapelPinQty);
    if (formData.donationAmount > 0) {
      lines.push({ label: "Parade Donation", quantity: 1, total: formData.donationAmount });
    }
    return lines;
  }, [formData, selectedPackageData]);

  const validateStep = (step: number): string => {
    if (step === 1) {
      if (!formData.orgName.trim()) return "Please enter your organization or company name.";
      if (!formData.fullName.trim()) return "Please enter a contact name.";
      if (!formData.phone.trim()) return "Please enter a phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
        return "Please enter a valid email address.";
    }
    if (step === 2 && !formData.packageType)
      return "Please choose a package or à la carte to continue.";
    if (step === 2 && formData.packageType === "package" && !formData.selectedPackage)
      return "Please select a package to continue.";
    if (step === 2 && formData.packageType === "alacarte" && !hasAlaCarteSelection)
      return "Please select at least one à la carte item to continue.";
    if (step === 2 && (formData.packageType === "package" || formData.bannerQty > 0) && !formData.bannerName.trim())
      return "Please enter the company or family name for the light pole banner.";
    if (step === 3 && formData.paradeEntry && !formData.unitDescription.trim())
      return "Please describe your parade unit.";
    return "";
  };

  const nextStep = () => {
    const error = validateStep(currentStep);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    const currentIndex = visibleSteps.findIndex((step) => step.id === currentStep);
    const next = visibleSteps[currentIndex + 1];
    if (next) setCurrentStep(next.id);
  };
  const prevStep = () => {
    setStepError("");
    const currentIndex = visibleSteps.findIndex((step) => step.id === currentStep);
    const previous = visibleSteps[currentIndex - 1];
    if (previous) setCurrentStep(previous.id);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setReference(data.reference);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isRegistrationOpen()) {
    return (
      <section className="py-24 px-4 bg-cream min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarClock className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-4">
            Registration Opens in {getSalesOpenLabel()}
          </h1>
          <p className="text-charcoal/60 text-lg mb-8">
            Registration for next year&apos;s parade season isn&apos;t open yet. In the meantime,
            explore our history, browse the gallery, or get in touch — we&apos;ll make sure
            you&apos;re first to know when registration opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all"
            >
              Get Notified <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white font-semibold rounded-full transition-all"
            >
              Preview Packages
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (reference) {
    return (
      <section className="py-24 px-4 bg-cream min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-4">
            Registration Received!
          </h1>
          <p className="text-charcoal/70 text-lg mb-2">
            Thank you, {formData.orgName}. A confirmation email is on its way to{" "}
            <span className="font-semibold">{formData.email}</span>.
          </p>
          <p className="text-charcoal/50 text-sm mb-8">
            Reference: <span className="font-mono">{reference}</span>
          </p>
          <p className="text-charcoal/60 mb-8">
            A member of the parade committee will follow up to confirm your details and arrange payment.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all"
          >
            Back to Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

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
            {visibleSteps.map((step, i) => (
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
                {i < visibleSteps.length - 1 && (
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
                    {["Yes — I'd like a package", "No — À la carte items only"].map((option, i) => {
                      const packageType = i === 0 ? "package" : "alacarte";
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => selectPackageType(packageType)}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left transition-all",
                            formData.packageType === packageType
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-emerald-200 hover:border-emerald-300"
                          )}
                        >
                          <span className="font-semibold text-charcoal">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {formData.packageType === "package" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-charcoal mb-2">Select your preferred package:</label>
                    {PACKAGES.map((pkg) => {
                      const PackageIcon = pkg.id === "vip" ? Crown : pkg.id === "executive" ? Star : Award;
                      const boatTickets = pkg.id === "vip" ? 6 : pkg.id === "executive" ? 4 : 2;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => setFormData((prev) => ({ ...prev, selectedPackage: pkg.id, paradeEntry: true }))}
                          className={cn(
                            "w-full p-5 rounded-xl border-2 text-left transition-all flex items-center gap-4",
                            formData.selectedPackage === pkg.id
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-emerald-200 hover:border-emerald-300"
                          )}
                        >
                          <PackageIcon className={cn("w-8 h-8 shrink-0", formData.selectedPackage === pkg.id ? "text-emerald-600" : "text-emerald-300")} />
                          <div className="flex-1">
                            <span className="font-bold text-charcoal block">{pkg.name} — {pkg.priceLabel}</span>
                            <span className="text-charcoal/60 text-sm">Table for 10, parade entry, ad, banner, and {boatTickets} boat tickets</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {formData.packageType === "alacarte" && (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                      <p className="text-emerald-800 font-semibold mb-1">Choose only what you need</p>
                      <p className="text-charcoal/60 text-sm">Every selected item and price will appear in your review before secure checkout.</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateField("paradeEntry", !formData.paradeEntry)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        formData.paradeEntry ? "border-emerald-600 bg-emerald-50" : "border-emerald-200 hover:border-emerald-300"
                      )}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span>
                          <span className="font-semibold text-charcoal block">Parade Entry</span>
                          <span className="text-charcoal/60 text-sm">Includes a half-page black &amp; white ad</span>
                        </span>
                        <span className="font-bold text-emerald-700">$500</span>
                      </span>
                    </button>

                    <div>
                      <p className="text-sm font-semibold text-charcoal mb-3">Parade Ad Book</p>
                      <div className="space-y-3">
                        {AD_IDS.map((id) => {
                          const ad = ALA_CARTE_ITEMS.find((item) => item.id === id);
                          if (!ad) return null;
                          return (
                            <button
                              type="button"
                              key={ad.id}
                              onClick={() => updateField("adSize", formData.adSize === ad.id ? "" : ad.id)}
                              className={cn(
                                "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between gap-4",
                                formData.adSize === ad.id ? "border-emerald-600 bg-emerald-50" : "border-emerald-200 hover:border-emerald-300"
                              )}
                            >
                              <span>
                                <span className="font-semibold text-charcoal block">{ad.name}</span>
                                <span className="text-charcoal/60 text-sm">{ad.description}</span>
                              </span>
                              <span className="font-bold text-emerald-700 shrink-0">{ad.priceLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <QuantitySelector
                        label="CBC Dinner Individual Seats"
                        description="Individual seating at the Corned Beef & Cabbage Dinner"
                        priceLabel="$150 per seat"
                        value={formData.cbcSeats}
                        max={9}
                        onChange={(value) => updateField("cbcSeats", value)}
                      />
                      <QuantitySelector
                        label="CBC Dinner Tables"
                        description="One reserved table seats 10 guests"
                        priceLabel="$1,500 per table"
                        value={formData.cbcTables}
                        max={10}
                        onChange={(value) => updateField("cbcTables", value)}
                      />
                      <QuantitySelector
                        label="Grandstand Seats"
                        description="Reserved parade-route seating on Columbus Drive"
                        priceLabel="$65 per seat"
                        value={formData.grandstandQty}
                        max={50}
                        onChange={(value) => updateField("grandstandQty", value)}
                      />
                      <QuantitySelector
                        label="Light Pole Banners"
                        description="Company or family name displayed on Columbus Drive"
                        priceLabel="$2,000 per banner"
                        value={formData.bannerQty}
                        max={10}
                        onChange={(value) => updateField("bannerQty", value)}
                      />
                      <QuantitySelector
                        label="Raffle Tickets"
                        description="Annual raffle; limited to 10 tickets per online order"
                        priceLabel="$100 per ticket"
                        value={formData.raffleQty}
                        max={10}
                        onChange={(value) => updateField("raffleQty", value)}
                      />
                      <QuantitySelector
                        label="Parade Lapel Pins"
                        description="Official commemorative parade lapel pin"
                        priceLabel="$15 per pin"
                        value={formData.lapelPinQty}
                        max={50}
                        onChange={(value) => updateField("lapelPinQty", value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Optional Parade Donation</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/60">$</span>
                        <input
                          type="number"
                          min="0"
                          max="100000"
                          step="1"
                          value={formData.donationAmount || ""}
                          onChange={(e) => updateField("donationAmount", Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {((formData.packageType === "package" && formData.selectedPackage) || formData.bannerQty > 0) && (
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Light Pole Banner Name *
                    </label>
                    <p className="text-charcoal/50 text-xs mb-2">Enter the company or family name exactly as it should appear on Columbus Drive.</p>
                    <input
                      type="text"
                      value={formData.bannerName}
                      onChange={(e) => updateField("bannerName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream"
                      placeholder="Your Company or Family Name"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Parade Entry Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Clover className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Parade Entry Details</h2>
                </div>

                {formData.packageType === "package" ? (
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-3">Will you use the parade entry included with your package?</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {["Yes", "No"].map((option) => (
                        <button
                          type="button"
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
                ) : (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    Parade entry selected — please provide the unit details below.
                  </div>
                )}

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
            {currentStep === 4 && selectedAd && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Upload className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Parade Ad Book</h2>
                </div>

                <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-charcoal">{selectedAd.name}</p>
                      <p className="text-charcoal/60 text-sm mt-1">{selectedAd.description}</p>
                    </div>
                    <span className="font-bold text-emerald-700">
                      {formData.packageType === "package" ? "Included in package" : selectedAd.priceLabel}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <Upload className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-bold text-charcoal mb-2">Ad Artwork</h3>
                  <p className="text-charcoal/60 text-sm mb-2">
                    Artwork must be a high-resolution PDF, PNG, or JPG. The deadline is January 29, 2027.
                  </p>
                  <p className="text-charcoal/50 text-sm">
                    Your confirmation email will include the secure artwork-submission instructions.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <Check className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Review & Payment</h2>
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
                    <h3 className="font-bold text-emerald-800 mb-3">Order</h3>
                    <div className="divide-y divide-emerald-200">
                      {reviewLines.map((line) => (
                        <div key={line.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                          <span className="text-charcoal">
                            {line.label}{line.quantity > 1 ? ` × ${line.quantity}` : ""}
                          </span>
                          <span className="font-bold text-charcoal">${line.total.toLocaleString("en-US")}.00</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between gap-4 pt-4 text-lg font-bold">
                        <span>Total</span>
                        <span className="text-emerald-800">${orderTotal.toLocaleString("en-US")}.00</span>
                      </div>
                    </div>
                    {(formData.packageType === "package" || formData.bannerQty > 0) && (
                      <p className="text-sm mt-4"><span className="text-charcoal/60">Banner:</span> <span className="font-medium">{formData.bannerName}</span></p>
                    )}
                    {selectedAd && (
                      <p className="text-sm mt-2"><span className="text-charcoal/60">Ad:</span> <span className="font-medium">{selectedAd.name}{formData.packageType === "package" ? " (included)" : ""}</span></p>
                    )}
                    {formData.paradeEntry && (
                      <p className="text-sm mt-2"><span className="text-charcoal/60">Parade entry:</span> <span className="font-medium">{formData.unitDescription}</span></p>
                    )}
                  </div>

                  <div className="bg-gold-50 rounded-xl p-5 border border-gold-200">
                    <p className="text-gold-800 text-sm font-medium">
                      Your registration is saved before you are redirected to Stripe&apos;s secure checkout.
                      The current Stripe integration is sandbox-only and cannot create a real charge.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Errors */}
            {(stepError || submitError) && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                {stepError || submitError}
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
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-emerald-950 font-bold rounded-full transition-all"
                >
                  {submitting ? "Preparing Checkout..." : "Continue to Secure Payment"} <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Help */}
          <div className="text-center mt-8">
            <p className="text-charcoal/60 text-sm">
              Need help? <Link href="/contact" className="text-emerald-700 hover:text-emerald-600 font-semibold underline underline-offset-4">Contact us</Link> or email parade@chicagostpatricksdayparade.org
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
