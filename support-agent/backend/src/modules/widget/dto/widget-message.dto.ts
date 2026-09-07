import { IsString, MinLength } from "class-validator";

export class WidgetMessageDto {
  @IsString()
  @MinLength(1)
  sessionId!: string;

  @IsString()
  @MinLength(1)
  text!: string;
}
