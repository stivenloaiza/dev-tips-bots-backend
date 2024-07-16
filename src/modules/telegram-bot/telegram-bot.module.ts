import { Module } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/services/telegram-bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, logSchema } from 'src/common/entities/log-entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logs.name, schema: logSchema }]),
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
