"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const AGENT_TYPE_OPTIONS = [
  "AI Sales Agent",
  "AI Customer Support Agent",
  "AI WhatsApp Agent",
  "AI Booking Agent",
  "AI Receptionist",
  "Custom AI Agent",
  "Business Automation",
];

const CUSTOMER_VOLUME_OPTIONS = ["1-50", "51-200", "201-500", "500+"];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  agentType: string;
  currentProcess: string;
  businessProblem: string;
  estimatedMonthlyCustomers: string;
  preferredCommunication: "EMAIL" | "PHONE" | "WHATSAPP";
  message: string;
};

function initialState(agentType?: string): FormState {
  return {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    industry: "",
    agentType: agentType || "",
    currentProcess: "",
    businessProblem: "",
    estimatedMonthlyCustomers: "",
    preferredCommunication: "EMAIL",
    message: "",
  };
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-brand-cyan/60";

export default function AIAgentInquiryModal({
  open,
  onClose,
  initialAgentType,
}: {
  open: boolean;
  onClose: () => void;
  initialAgentType?: string;
}) {
  const [form, setForm] = useState<FormState>(() => initialState(initialAgentType));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialState(initialAgentType));
      setErrors({});
      setSubmitError(null);
      setSubmitted(false);
    }
  }, [open, initialAgentType]);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (!form.industry.trim()) next.industry = "Industry is required.";
    if (!form.agentType) next.agentType = "Please select an AI solution.";
    if (!form.businessProblem.trim()) next.businessProblem = "Please tell us what you'd like to automate.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai-inquiry", {
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
    <Modal open={open} onClose={onClose} title="Build Your AI Agent">
      {submitted ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
            <CheckCircle2 className="h-7 w-7 text-white" />
          </div>
          <h4 className="mt-5 font-display text-lg font-semibold text-white">Request received!</h4>
          <p className="mt-2 max-w-sm text-sm text-white/55">
            Thanks for reaching out — our team will review your requirements and get back to you shortly.
          </p>
          <button type="button" onClick={onClose} className="btn-secondary mt-6 text-sm">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Full Name</label>
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
              />
              {errors.fullName && <p className="mt-1 text-xs text-brand-pink">{errors.fullName}</p>}
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
              <label className="mb-1.5 block text-xs font-medium text-white/60">Industry</label>
              <input
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className={inputClass}
              />
              {errors.industry && <p className="mt-1 text-xs text-brand-pink">{errors.industry}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">AI Solution Needed</label>
              <select
                value={form.agentType}
                onChange={(e) => update("agentType", e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="bg-base-panel">
                  Choose an option
                </option>
                {AGENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-base-panel">
                    {opt}
                  </option>
                ))}
              </select>
              {errors.agentType && <p className="mt-1 text-xs text-brand-pink">{errors.agentType}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              How do you currently handle these tasks?
            </label>
            <textarea
              rows={2}
              value={form.currentProcess}
              onChange={(e) => update("currentProcess", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              What tasks do you want to automate?
            </label>
            <textarea
              rows={3}
              value={form.businessProblem}
              onChange={(e) => update("businessProblem", e.target.value)}
              className={`${inputClass} resize-none`}
            />
            {errors.businessProblem && <p className="mt-1 text-xs text-brand-pink">{errors.businessProblem}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Monthly Customer Inquiries
              </label>
              <select
                value={form.estimatedMonthlyCustomers}
                onChange={(e) => update("estimatedMonthlyCustomers", e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" className="bg-base-panel">
                  Not sure
                </option>
                {CUSTOMER_VOLUME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-base-panel">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Preferred Contact</label>
              <select
                value={form.preferredCommunication}
                onChange={(e) => update("preferredCommunication", e.target.value)}
                className={`${inputClass} appearance-none`}
              >
                <option value="EMAIL" className="bg-base-panel">Email</option>
                <option value="PHONE" className="bg-base-panel">Phone</option>
                <option value="WHATSAPP" className="bg-base-panel">WhatsApp</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Additional Requirements (optional)
            </label>
            <textarea
              rows={2}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${inputClass} resize-none`}
            />
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
