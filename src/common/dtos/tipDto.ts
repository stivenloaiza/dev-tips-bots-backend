import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class TipDto {
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  multimedia_url?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lang: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  technology: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subtechnology: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  channel: string;
}
