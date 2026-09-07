import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ToolCall } from "../providers/llm-provider.interface";
import { AppointmentsService } from "../../appointments/appointments.service";
import { TicketsService } from "../../tickets/tickets.service";
import { OrderAdapterResolver } from "./order-adapter";

export interface ToolExecutionContext {
  clientId: string;
  customerId: string;
  conversationId: string;
  platform: "WEB" | "WHATSAPP" | "MESSENGER" | "INSTAGRAM" | "EMAIL";
}

export interface ToolExecutionResult {
  toolCallId: string;
  toolName: string;
  resultForModel: string;
  /** Signals the orchestrator to stop looping and flip the conversation to human mode. */
  handoffTriggered?: boolean;
}

@Injectable()
export class ToolDispatcherService {
  private readonly logger = new Logger(ToolDispatcherService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly appointments: AppointmentsService,
    private readonly tickets: TicketsService,
    private readonly orderAdapters: OrderAdapterResolver,
  ) {}

  async execute(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    switch (call.name) {
      case "capture_lead":
        return this.captureLead(call, ctx);
      case "handoff_to_human":
        return this.handoffToHuman(call, ctx);
      case "check_availability":
        return this.checkAvailability(call, ctx);
      case "book_appointment":
        return this.bookAppointment(call, ctx);
      case "check_order_status":
        return this.checkOrderStatus(call, ctx);
      case "create_support_ticket":
        return this.createSupportTicket(call, ctx);
      default:
        this.logger.warn(`Unknown tool call requested by model: ${call.name}`);
        return {
          toolCallId: call.id,
          toolName: call.name,
          resultForModel: `Error: "${call.name}" is not a real tool. Do not call it again.`,
        };
    }
  }

  private async captureLead(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { name?: string; phone?: string; email?: string; requirement?: string };
    if (!args.name || !args.requirement) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: "Error: name and requirement are required to capture a lead.",
      };
    }

    let score = 20;
    if (args.phone) score += 30;
    if (args.email) score += 20;
    if (args.requirement.length > 40) score += 20;

    const lead = await this.prisma.lead.create({
      data: {
        clientId: ctx.clientId,
        customerId: ctx.customerId,
        name: args.name,
        phone: args.phone,
        email: args.email,
        requirement: args.requirement,
        source: "AI_AGENT",
        score: Math.min(score, 100),
      },
    });

    // Keep the customer's own contact details in sync for future conversations.
    await this.prisma.customer.update({
      where: { id: ctx.customerId },
      data: {
        name: args.name,
        phone: args.phone ?? undefined,
        email: args.email ?? undefined,
        leadStatus: "QUALIFIED",
      },
    });

    return {
      toolCallId: call.id,
      toolName: call.name,
      resultForModel: `Lead saved (id: ${lead.id}). Thank the customer and continue helping them.`,
    };
  }

  private async handoffToHuman(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { reason?: string; summary?: string };

    await this.prisma.conversation.update({
      where: { id: ctx.conversationId },
      data: { mode: "HUMAN", status: "ESCALATED" },
    });

    await this.prisma.message.create({
      data: {
        conversationId: ctx.conversationId,
        sender: "AI",
        content: `[Handed off to a human agent] Reason: ${args.reason ?? "unspecified"}. Summary: ${args.summary ?? "n/a"}`,
        messageType: "text",
        platform: ctx.platform,
      },
    });

    return {
      toolCallId: call.id,
      toolName: call.name,
      resultForModel:
        "Handoff recorded. Tell the customer a team member will follow up shortly, and stop offering further automated help on this topic.",
      handoffTriggered: true,
    };
  }

  private async checkAvailability(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { service?: string; date?: string };
    if (!args.date) {
      return { toolCallId: call.id, toolName: call.name, resultForModel: "Error: date (YYYY-MM-DD) is required." };
    }
    try {
      const slots = await this.appointments.listOpenSlots(ctx.clientId, args.date);
      if (slots.length === 0) {
        return {
          toolCallId: call.id,
          toolName: call.name,
          resultForModel: `No open slots on ${args.date} (closed that day, fully booked, or all remaining times have passed). Offer another date.`,
        };
      }
      const times = slots.slice(0, 8).map((iso) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: `Open times on ${args.date}: ${times.join(", ")}. Offer a few of these to the customer.`,
      };
    } catch (err) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: `Error checking availability: ${(err as Error).message}`,
      };
    }
  }

  private async bookAppointment(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { service?: string; dateTime?: string; durationMinutes?: number };
    if (!args.service || !args.dateTime) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: "Error: service and dateTime are required to book.",
      };
    }
    try {
      const appt = await this.appointments.book(
        ctx.clientId,
        ctx.customerId,
        args.service,
        args.dateTime,
        args.durationMinutes,
      );
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: `Booked (id: ${appt.id}) for ${args.service} at ${appt.scheduledAt.toISOString()}. Confirm this with the customer.`,
      };
    } catch (err) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: `Could not book: ${(err as Error).message}. Ask the customer to pick a different time.`,
      };
    }
  }

  private async checkOrderStatus(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { orderNumber?: string };
    if (!args.orderNumber) {
      return { toolCallId: call.id, toolName: call.name, resultForModel: "Error: orderNumber is required." };
    }

    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: ctx.clientId } });
    const adapter = this.orderAdapters.resolve(client);
    if (!adapter) {
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel:
          "No order system is connected for this business yet. Tell the customer you can't look up orders automatically right now, and use handoff_to_human so a person can check.",
      };
    }

    try {
      const result = await adapter.getOrderStatus(args.orderNumber);
      if (!result.found) {
        return {
          toolCallId: call.id,
          toolName: call.name,
          resultForModel: `No order found matching "${args.orderNumber}". Ask the customer to double-check the order number.`,
        };
      }
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: `Order ${args.orderNumber}: ${result.details ?? result.status}.`,
      };
    } catch (err) {
      this.logger.error("Order lookup failed", err as Error);
      return {
        toolCallId: call.id,
        toolName: call.name,
        resultForModel: "The order system didn't respond. Apologize and use handoff_to_human.",
      };
    }
  }

  private async createSupportTicket(call: ToolCall, ctx: ToolExecutionContext): Promise<ToolExecutionResult> {
    const args = call.arguments as { description?: string; priority?: string };
    if (!args.description) {
      return { toolCallId: call.id, toolName: call.name, resultForModel: "Error: description is required." };
    }
    const priority = (args.priority?.toUpperCase() as "LOW" | "NORMAL" | "HIGH" | "URGENT") ?? "NORMAL";

    const ticket = await this.tickets.create(ctx.clientId, ctx.customerId, args.description, priority);
    return {
      toolCallId: call.id,
      toolName: call.name,
      resultForModel: `Ticket ${ticket.ticketNumber} created. Let the customer know their ticket number and that the team will follow up.`,
    };
  }
}
