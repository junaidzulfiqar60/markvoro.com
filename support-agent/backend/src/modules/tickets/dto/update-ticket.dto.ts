import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {
  @IsOptional()
  @IsIn(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"])
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

  @IsOptional()
  @IsIn(["LOW", "NORMAL", "HIGH", "URGENT"])
  priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";

  @IsOptional()
  @IsString()
  assignedToId?: string;
}
