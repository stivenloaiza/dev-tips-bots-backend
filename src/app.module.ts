import { Module } from '@nestjs/common';
import { persistenceModule } from './config/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './modules/discord-bot/discord-bot.module';
import dbConfig from './config/persistence/db-config';
import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';
import { HttpModule } from '@nestjs/axios';
import { TelegramBotService } from './modules/telegram-bot/services/telegram-bot.service';
import { DiscordService } from './modules/discord-bot/services/discord-bot.service';
import { BotController } from './common/controllers/bots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema, Logs } from './common/entities/log-entity';
import { LogsService } from './common/services/logs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    MongooseModule.forFeature([{ name: Logs.name, schema: logSchema }]),
    persistenceModule,
    DiscordBotModule,
    TelegramBotModule,
    HttpModule,
  ],
  controllers: [BotController],
  providers: [TelegramBotService, DiscordService,LogsService],
})
export class AppModule {}
