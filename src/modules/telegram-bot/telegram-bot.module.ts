import { Module } from '@nestjs/common';
import { BotService } from './services/services.service';

@Module({
  imports: [],
  providers: [BotService],
})
export class TelegramBotModule {}
