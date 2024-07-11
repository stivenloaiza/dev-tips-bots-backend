import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateDiscordTipDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  technology: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsNumber()
  @IsNotEmpty()
  channelId: number;
}
