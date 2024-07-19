import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class TipDto {
  @ApiProperty({ description: 'URL for multimedia content associated with the tip (optional)', example: 'http://example.com/image.png' })
  @IsUrl()
  @IsOptional()
  img_url?: string;

  @ApiProperty({ description: 'Title of the tip', example: 'How to use Docker' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Body content of the tip', example: 'Here is a quick tip on using Docker effectively...' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ description: 'URL link associated with the tip', example: 'http://example.com/docker-guide' })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ description: 'Difficulty level of the tip', example: 'Junior' })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({ description: 'Language of the tip', example: 'English' })
  @IsString()
  @IsNotEmpty()
  lang: string;

  @ApiProperty({ description: 'Technology related to the tip', example: 'Docker' })
  @IsString()
  @IsNotEmpty()
  technology: string;

  
  @ApiProperty({ description: 'Subtechnology related to the tip', example: 'Docker' })
  @IsString()
  @IsNotEmpty()
  subtechnology: string;


  @ApiProperty({ description: 'Channel ID where the tip will be sent', example: '123456789' })
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty({ description: 'Channel name (e.g., discord, telegram)', example: 'discord' })
  @IsString()
  @IsNotEmpty()
  channelType: string;
}