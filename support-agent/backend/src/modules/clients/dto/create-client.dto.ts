import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClientDto {
  @IsString()
  businessName!: string;

  @IsEmail()
  contactEmail!: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  // First Client Admin login for this tenant.
  @IsString()
  adminName!: string;

  @IsEmail()
  adminEmail!: string;

  @IsString()
  @MinLength(8)
  adminPassword!: string;
}
