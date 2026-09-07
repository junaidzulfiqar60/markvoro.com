import { ToolDefinition } from "../providers/llm-provider.interface";

export const CAPTURE_LEAD_TOOL: ToolDefinition = {
  name: "capture_lead",
  description:
    "Save a qualified lead once the customer's name, a way to contact them, and a real requirement are known. Call this as soon as those three things are known — don't wait until the end of the conversation.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "Customer's name" },
      phone: { type: "string", description: "Phone number, if given" },
      email: { type: "string", description: "Email address, if given" },
      requirement: {
        type: "string",
        description: "What the customer needs, summarized in their own words",
      },
    },
    required: ["name", "requirement"],
  },
};

export const HANDOFF_TO_HUMAN_TOOL: ToolDefinition = {
  name: "handoff_to_human",
  description:
    "Transfer this conversation to a human support agent. Use this when the customer is frustrated, asks for a human explicitly, the same problem has failed to resolve after a few attempts, or the request involves something you cannot verify from the knowledge base or your tools (pricing/policy claims must never be guessed).",
  parameters: {
    type: "object",
    properties: {
      reason: { type: "string", description: "Why a human is needed" },
      summary: { type: "string", description: "2-3 sentence recap of the conversation so far, for the agent" },
    },
    required: ["reason", "summary"],
  },
};

export const CHECK_AVAILABILITY_TOOL: ToolDefinition = {
  name: "check_availability",
  description:
    "Check open appointment slots for a service on a given date, before booking. Always call this before book_appointment so you can offer the customer a real, open time.",
  parameters: {
    type: "object",
    properties: {
      service: { type: "string", description: "The service being booked" },
      date: { type: "string", description: "Date to check, as YYYY-MM-DD" },
    },
    required: ["service", "date"],
  },
};

export const BOOK_APPOINTMENT_TOOL: ToolDefinition = {
  name: "book_appointment",
  description:
    "Book a confirmed appointment once the customer has agreed to a specific date and time that check_availability showed as open.",
  parameters: {
    type: "object",
    properties: {
      service: { type: "string", description: "The service being booked" },
      dateTime: { type: "string", description: "ISO 8601 date-time for the appointment, e.g. 2026-09-10T14:00:00" },
      durationMinutes: { type: "number", description: "Length of the appointment in minutes (default 30)" },
    },
    required: ["service", "dateTime"],
  },
};

export const CHECK_ORDER_STATUS_TOOL: ToolDefinition = {
  name: "check_order_status",
  description:
    "Look up an order using the customer's order number and report its status. If no order system is connected for this business, say so honestly and offer to hand off rather than guessing.",
  parameters: {
    type: "object",
    properties: {
      orderNumber: { type: "string", description: "The order number the customer gave" },
    },
    required: ["orderNumber"],
  },
};

export const CREATE_SUPPORT_TICKET_TOOL: ToolDefinition = {
  name: "create_support_ticket",
  description:
    "Open a support ticket for a problem you cannot resolve yourself, so a human can follow up asynchronously (as an alternative to an immediate handoff — use this when the issue doesn't need a human right now, just a tracked follow-up).",
  parameters: {
    type: "object",
    properties: {
      description: { type: "string", description: "What the problem is, in the customer's words" },
      priority: { type: "string", enum: ["low", "normal", "high", "urgent"] },
    },
    required: ["description"],
  },
};

export const AGENT_TOOLS: ToolDefinition[] = [
  CAPTURE_LEAD_TOOL,
  HANDOFF_TO_HUMAN_TOOL,
  CHECK_AVAILABILITY_TOOL,
  BOOK_APPOINTMENT_TOOL,
  CHECK_ORDER_STATUS_TOOL,
  CREATE_SUPPORT_TICKET_TOOL,
];
