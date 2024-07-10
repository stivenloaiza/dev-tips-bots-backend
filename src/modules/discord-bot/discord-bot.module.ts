import { Module } from '@nestjs/common';
import { DiscordBotController } from './controllers/discord-bot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, logSchema } from './entities/discord-log-entity';
import { DiscordService } from './services/discord-bot.service';
import { SentTipsService } from './services/send-tip.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: logSchema }]),
  ],
  controllers: [DiscordBotController],
  providers: [DiscordService,SentTipsService],
})
export class DiscordBotModule {}