import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscordTipDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
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

  @IsString()
  @IsNotEmpty()
  channelId: string;
}
