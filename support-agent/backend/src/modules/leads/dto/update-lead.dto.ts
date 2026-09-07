import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(["NEW", "QUALIFIED", "CONVERTED", "LOST"])
  status?: "NEW" | "QUALIFIED" | "CONVERTED" | "LOST";

  @IsOptional()
  @IsString()
  assignedToId?: string;
}
