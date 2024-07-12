import { IsString, IsUrl, IsOptional } from 'class-validator';

export class TipDto {
  @IsUrl()
  @IsOptional()
  multimedia_url?: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsUrl()
  link: string;

  @IsString()
  level: string;

  @IsString()
  lang: string;

  @IsString()
  technology: string;

  @IsString()
  subtechnology: string;
}
