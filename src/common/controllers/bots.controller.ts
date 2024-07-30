import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TipDto } from '../dtos/tipDto';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { DiscordService } from 'src/modules/discord-bot/services/discord-bot.service';
import { TelegramBotService } from 'src/modules/telegram-bot/services/telegram-bot.service';
import { LogsService } from '../services/logs.service';
import { Logs } from '../entities/log-entity';

@ApiTags('Bots')
@Controller('bots')
export class BotController {
  constructor(
    private readonly discordBotService: DiscordService,
    private readonly logsService: LogsService,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  @Post('tip')
  @UsePipes(new ValidationPipe())
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key',
    required: true,
    example: "60d21b4667d0d8992e610c85"
  })
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Send a tip to a specified channel (Discord/Telegram)', description: 'This endpoint send a tip in charge of the channel type selected by the user (Discord/Telegram)'
  })
  @ApiOkResponse({ description: 'Tip sent successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiNotFoundResponse({ description: 'Unsupported Channel type' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiBody({ 
    type: TipDto,
    description: 'Details of the tip send data',
    examples: {
      example1: {
        summary: "Discord tip data format",
        value: {
          img_url: 'http://example.com/image.png',
          title: 'How to use Docker',
          body: 'Here is a quick tip on using Docker effectively...',
          link: 'http://example.com/docker-guide',
          level: 'Junior',
          lang: 'english',
          technology: 'Java',
          subtechnology: 'SpringBoot',
          channelId: '123456789',
          channelType: 'discord',
        }
      },
      example2: {
        summary:"Telegram tip data format",
        value: {
          img_url: 'http://example.com/image.png',
          title: 'How to use Docker',
          body: 'Here is a quick tip on using Docker effectively...',
          link: 'http://example.com/docker-guide',
          level: 'Junior',
          lang: 'english',
          technology: 'c-sharp',
          subtechnology: '.Net',
          channelId: '123456789',
          channelType: 'telegram',
        }
      }

    }



   })
  async getTip(@Body() tipDto: TipDto) {
    if (tipDto.channelType.toLowerCase() === 'discord') {
      await this.discordBotService.getTip(tipDto);
    } else if (tipDto.channelType.toLowerCase() === 'telegram') {
      await this.telegramBotService.getTip(tipDto);
    } else {
      throw new Error('Unsupported channel');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Tip sent successfully!',
    };
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all tips' })
  @ApiOkResponse({ description: 'List of all tips' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiNotFoundResponse({ description: 'Tip not found' })
  async getAllTips(): Promise<Logs[]> {
    return await this.logsService.getAllTips();
  }

  @Get('search/:id')
  @ApiOperation({ summary: 'Get a tip by ID' })
  @ApiParam({ name: 'id', description: 'ID of the tip to retrieve', example:"60d21b4667d0d8992e610c85" })
  @ApiOkResponse({ description: 'The tip has been sucessfully found' })
  @ApiNotFoundResponse({ description: 'Tip not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  async getTipById(@Param('id') id: string): Promise<Logs> {
    try {
      return await this.logsService.getTipById(id);
    } catch (error) {
      throw new NotFoundException(`Tip with ID ${id} not found`);
    }
  }
}
