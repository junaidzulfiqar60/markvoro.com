"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { serviceOptions } from "@/lib/data";

const BUDGET_OPTIONS = ["Under $500", "$500 - $1,500", "$1,500 - $5,000", "$5,000+", "Not sure yet"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  budget: string;
  projectDetails: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  service: "",
  budget: "",
  projectDetails: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-brand-cyan/60";

export default function ServiceInquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialState);
      setErrors({});
      setSubmitError(null);
      setSubmitted(false);
    }
  }, [open]);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.projectDetails.trim()) next.projectDetails = "Please tell us about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Get a Quote">
      {submitted ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
            <CheckCircle2 className="h-7 w-7 text-white" />
          </div>
          <h4 className="mt-5 font-display text-lg font-semibold text-white">Request received!</h4>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Thanks for reaching out — our team will review your project and get back to you shortly.
          </p>
          <button type="button" onClick={onClose} className="btn-secondary mt-6 text-sm">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Name</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
              {errors.name && <p className="mt-1 text-xs text-brand-pink">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
              {errors.email && <p className="mt-1 text-xs text-brand-pink">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
              {errors.phone && <p className="mt-1 text-xs text-brand-pink">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Business Name</label>
              <input
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Service</label>
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="bg-base-panel">
                  Choose a service
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-base-panel">
                    {opt}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-xs text-brand-pink">{errors.service}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Budget</label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" className="bg-base-panel">
                  Not sure yet
                </option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-base-panel">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Project Details</label>
            <textarea
              rows={4}
              value={form.projectDetails}
              onChange={(e) => update("projectDetails", e.target.value)}
              className={`${inputClass} resize-none`}
            />
            {errors.projectDetails && <p className="mt-1 text-xs text-brand-pink">{errors.projectDetails}</p>}
          </div>

          {submitError && <p className="text-sm text-brand-pink">{submitError}</p>}

          <Button type="submit" variant="green" loading={loading} className="w-full">
            Send Request
          </Button>
        </form>
      )}
    </Modal>
  );
}
