import { Module } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/services/telegram-bot.service'

@Module({
  imports: [],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}

