import { Module } from '@nestjs/common';
import { DiscordBotService } from './services/discord-bot.service';
import { DiscordBotController } from './controllers/discord-bot.controller';

@Module({
  controllers: [DiscordBotController],
  providers: [DiscordBotService],
})
export class DiscordBotModule {}
