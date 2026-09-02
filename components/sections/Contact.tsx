"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, CheckCircle2, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactInfo, serviceOptions } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.service) nextErrors.service = "Please select a service.";
    if (!form.message.trim()) nextErrors.message = "Tell us a bit about your project.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Frontend-only demo: no backend submission is performed.
    setSubmitted(true);
    setForm(initialState);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-brand-cyan/60";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade opacity-40" />
      <div className="section-padding container-max">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="LET'S BUILD SOMETHING THAT GROWS."
              description="Tell us about your business and what you want to achieve."
              className="mx-0"
            />

            <div className="mt-10 space-y-4">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="glass flex items-center gap-4 p-5 transition-colors hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">Call Us</p>
                  <p className="text-sm font-medium text-white">{contactInfo.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="glass flex items-center gap-4 p-5 transition-colors hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">Email Us</p>
                  <p className="text-sm font-medium text-white">{contactInfo.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right column - form */}
          <div className="glass-panel p-6 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">
                  Message Sent!
                </h3>
                <p className="mt-3 max-w-sm text-sm text-white/55">
                  Thanks for reaching out. This is a frontend demo — no data
                  was actually submitted. Our team will get back to you soon
                  once a backend is connected.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary mt-8 text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium text-white/60">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="John Doe"
                      className={inputClass}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-brand-pink">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/60">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john@company.com"
                      className={inputClass}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-brand-pink">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-medium text-white/60">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+92 300 0000000"
                      className={inputClass}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-brand-pink">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="business" className="mb-2 block text-xs font-medium text-white/60">
                      Business Name
                    </label>
                    <input
                      id="business"
                      type="text"
                      value={form.business}
                      onChange={(e) => update("business", e.target.value)}
                      placeholder="Your Company"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-xs font-medium text-white/60">
                    Select Service
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={`${inputClass} appearance-none`}
                    aria-invalid={!!errors.service}
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
                  {errors.service && <p className="mt-1.5 text-xs text-brand-pink">{errors.service}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium text-white/60">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your business and goals..."
                    className={`${inputClass} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-brand-pink">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
