import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  title!: string;

  @IsIn(["faq", "manual", "url"])
  sourceType!: "faq" | "manual" | "url";

  // Required for "faq"/"manual"; for "url" the backend fetches the text itself.
  @IsOptional()
  @IsString()
  @MinLength(10)
  text?: string;

  @IsOptional()
  @IsString()
  url?: string;
}
