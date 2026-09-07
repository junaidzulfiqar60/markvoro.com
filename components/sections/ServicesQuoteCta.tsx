"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ServiceInquiryModal from "@/components/forms/ServiceInquiryModal";

export default function ServicesQuoteCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-14 flex justify-center">
      <button type="button" onClick={() => setOpen(true)} className="btn-green">
        Get a Quote
        <ArrowRight className="h-4 w-4" />
      </button>
      <ServiceInquiryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
