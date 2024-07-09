import { Module } from '@nestjs/common';
import { DiscordService } from './services/discord-bot.service';
import { DiscordBotController } from './controllers/discord-bot.controller';
import { SentTipsService } from './services/send-tip.service';

@Module({
  controllers: [DiscordBotController],
  providers: [DiscordService, SentTipsService],
})
export class DiscordBotModule {}
