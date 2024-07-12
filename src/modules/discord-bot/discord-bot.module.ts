import { Module } from '@nestjs/common';
import { BotController } from 'src/common/controllers/bots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, logSchema } from './entities/discord-log-entity';
import { DiscordService } from './services/discord-bot.service';
import { SentTipsService } from './services/send-tip.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: logSchema }]),
  ],
  controllers: [BotController],
  providers: [DiscordService, SentTipsService],
})
export class DiscordBotModule {}
