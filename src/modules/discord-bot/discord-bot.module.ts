import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, logSchema } from '../../common/entities/log-entity';
import { DiscordService } from './services/discord-bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: logSchema }]),
  ],
  providers: [DiscordService],
})
export class DiscordBotModule {}
