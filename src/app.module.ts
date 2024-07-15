import { Module } from '@nestjs/common';
import { persistenceModule } from './config/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './modules/discord-bot/discord-bot.module';
import dbConfig from './config/persistence/db-config';
import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    persistenceModule,
    DiscordBotModule,
    TelegramBotModule,
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
