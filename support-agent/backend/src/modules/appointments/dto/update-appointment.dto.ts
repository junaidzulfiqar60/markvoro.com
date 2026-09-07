import { IsIn } from "class-validator";

export class UpdateAppointmentDto {
  @IsIn(["CONFIRMED", "CANCELLED", "COMPLETED"])
  status!: "CONFIRMED" | "CANCELLED" | "COMPLETED";
}
