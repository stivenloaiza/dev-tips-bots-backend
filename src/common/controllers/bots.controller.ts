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
  ApiInternalServerErrorResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiOperation, 
  ApiParam, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { TipDto } from '../dtos/tipDto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
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
  ) { }

  @Post('tip')
  @UsePipes(new ValidationPipe())
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Send a tip to a specified channel (Discord/Telegram)' })
  @ApiOkResponse({ description: 'Tip sent successfully!' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Channel not supported' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiBody({ type: TipDto, description: 'Tip data' })
  async getTip(@Body() tipDto: TipDto) {
    if (tipDto.channel.toLowerCase() === 'discord') {
      await this.discordBotService.getTip(tipDto);
    } else if (tipDto.channel.toLowerCase() === 'telegram') {
      await this.telegramBotService.getTip(tipDto);
    } else {
      throw new Error('Unsupported channel');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Tip sent successfully!',
    };
  }

  @Get("/all")
  @ApiOperation({ summary: 'Get all tips' })
  @ApiOkResponse({ description: 'List of all tips'})
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiNotFoundResponse({ description: 'Tip not found' })
  async getAllTips(): Promise<Logs[]> {
    return await this.logsService.getAllTips();
  }

  @Get('search/:id')
  @ApiOperation({ summary: 'Get a tip by ID' })
  @ApiParam({ name: 'id', description: 'ID of the tip to retrieve' })
  @ApiOkResponse({ description: 'The found tip'})
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