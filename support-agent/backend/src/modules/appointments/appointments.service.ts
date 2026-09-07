import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
const DEFAULT_HOURS: [string, string] = ["09:00", "18:00"]; // used when a client hasn't configured businessHours yet
const SLOT_MINUTES = 30;

export interface BusinessHours {
  [day: string]: [string, string] | null | undefined;
}

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private hoursFor(businessHours: BusinessHours, date: Date): [string, string] | null {
    const key = DAY_KEYS[date.getDay()];
    if (Object.prototype.hasOwnProperty.call(businessHours, key)) {
      return businessHours[key] ?? null;
    }
    return DEFAULT_HOURS; // not configured for this client yet — fall back to a sane default
  }

  private parseTimeOnDate(date: Date, hhmm: string): Date {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date(date);
    d.setHours(h, m, 0, 0);
    return d;
  }

  async listOpenSlots(clientId: string, dateStr: string): Promise<string[]> {
    const date = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(date.getTime())) throw new BadRequestException("Invalid date — use YYYY-MM-DD.");

    const client = await this.prisma.client.findUniqueOrThrow({ where: { id: clientId } });
    const businessHours = (client.businessHours as BusinessHours) ?? {};
    const hours = this.hoursFor(businessHours, date);
    if (!hours) return []; // closed that day

    const dayStart = this.parseTimeOnDate(date, hours[0]);
    const dayEnd = this.parseTimeOnDate(date, hours[1]);

    const existing = await this.prisma.appointment.findMany({
      where: {
        clientId,
        status: "CONFIRMED",
        scheduledAt: { gte: dayStart, lt: dayEnd },
      },
      select: { scheduledAt: true, durationMinutes: true },
    });

    const slots: string[] = [];
    for (let t = new Date(dayStart); t < dayEnd; t = new Date(t.getTime() + SLOT_MINUTES * 60_000)) {
      const slotEnd = new Date(t.getTime() + SLOT_MINUTES * 60_000);
      const overlaps = existing.some((appt) => {
        const apptStart = appt.scheduledAt;
        const apptEnd = new Date(apptStart.getTime() + appt.durationMinutes * 60_000);
        return t < apptEnd && slotEnd > apptStart;
      });
      if (!overlaps && t > new Date()) slots.push(t.toISOString());
    }
    return slots;
  }

  async book(
    clientId: string,
    customerId: string,
    service: string,
    dateTimeIso: string,
    durationMinutes = 30,
  ) {
    const scheduledAt = new Date(dateTimeIso);
    if (Number.isNaN(scheduledAt.getTime())) {
      throw new BadRequestException("Invalid appointment date/time.");
    }
    if (scheduledAt < new Date()) {
      throw new BadRequestException("Can't book an appointment in the past.");
    }

    const slotEnd = new Date(scheduledAt.getTime() + durationMinutes * 60_000);
    const dayStart = new Date(scheduledAt);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60_000);

    const sameDayAppointments = await this.prisma.appointment.findMany({
      where: { clientId, status: "CONFIRMED", scheduledAt: { gte: dayStart, lt: dayEnd } },
      select: { scheduledAt: true, durationMinutes: true },
    });
    const conflict = sameDayAppointments.some((appt) => {
      const apptEnd = new Date(appt.scheduledAt.getTime() + appt.durationMinutes * 60_000);
      return scheduledAt < apptEnd && slotEnd > appt.scheduledAt;
    });
    if (conflict) {
      throw new BadRequestException("That slot was just booked — please pick another time.");
    }

    return this.prisma.appointment.create({
      data: { clientId, customerId, service, scheduledAt, durationMinutes },
    });
  }

  async list(clientId: string, status?: string) {
    return this.prisma.appointment.findMany({
      where: { clientId, ...(status ? { status: status as never } : {}) },
      orderBy: { scheduledAt: "asc" },
      include: { customer: { select: { name: true, phone: true, email: true } } },
    });
  }

  async updateStatus(clientId: string, id: string, status: "CONFIRMED" | "CANCELLED" | "COMPLETED") {
    const appt = await this.prisma.appointment.findFirst({ where: { id, clientId } });
    if (!appt) throw new NotFoundException("Appointment not found.");
    return this.prisma.appointment.update({ where: { id }, data: { status } });
  }
}
