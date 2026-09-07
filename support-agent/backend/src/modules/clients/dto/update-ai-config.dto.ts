import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateAiConfigDto {
  @IsOptional()
  @IsIn(["anthropic", "openai"])
  provider?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsIn(["en", "ur", "auto"])
  language?: string;

  @IsOptional()
  @IsString()
  systemPromptExtra?: string;
}
