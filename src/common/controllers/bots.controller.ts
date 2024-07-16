import {
  Body,
  Controller,
  HttpStatus,
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
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { TipDto } from '../dtos/tipDto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DiscordService } from 'src/modules/discord-bot/services/discord-bot.service';
import { TelegramBotService } from 'src/modules/telegram-bot/services/telegram-bot.service';

@ApiTags('bots')
@Controller('bots')
export class BotController {
  constructor(
    private readonly discordBotService: DiscordService,
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
}
