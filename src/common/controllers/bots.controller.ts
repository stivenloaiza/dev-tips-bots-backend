import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TipDto } from '../dtos/tipDto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { DiscordService } from 'src/modules/discord-bot/services/discord-bot.service';
import { TelegramBotService } from 'src/modules/telegram-bot/services/telegram-bot.service';

@Controller('bots')
export class BotController {
  constructor(
    private readonly discordBotService: DiscordService,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  @Post('tip')
  @UsePipes(new ValidationPipe())
  @UseGuards(ApiKeyGuard)
  async getTip(@Body() tipDto: TipDto) {
    let response;

    if (tipDto.channel === 'discord') {
      response = await this.discordBotService.getTip(tipDto);
    } else if (tipDto.channel === 'telegram') {
      response = await this.telegramBotService.getTip(tipDto);
    } else {
      throw new Error('Unsupported channel');
    }

    return response;
  }
}
