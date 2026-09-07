import { IsOptional, IsString, MinLength } from "class-validator";

export class ConnectWhatsAppDto {
  @IsString()
  @MinLength(1)
  phoneNumberId!: string;

  @IsString()
  @MinLength(1)
  wabaId!: string;

  @IsString()
  @MinLength(1)
  accessToken!: string;

  @IsOptional()
  @IsString()
  displayPhoneNumber?: string;
}

export class ConnectMessengerDto {
  @IsString()
  @MinLength(1)
  pageId!: string;

  @IsString()
  @MinLength(1)
  accessToken!: string;

  @IsOptional()
  @IsString()
  pageName?: string;
}

export class ConnectInstagramDto {
  @IsString()
  @MinLength(1)
  igBusinessId!: string;

  @IsString()
  @MinLength(1)
  accessToken!: string;

  @IsOptional()
  @IsString()
  username?: string;
}
