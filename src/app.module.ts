import { Module } from '@nestjs/common';
import { persistenceModule } from './config/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './modules/discord-bot/discord-bot.module';
import dbConfig from './config/persistence/db-config';
/* import { TelegramBotModule } from './modules/telegram-bot/telegram-bot.module'; */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      envFilePath: '.env',
    }),
    persistenceModule,
    DiscordBotModule,
    /*     TelegramBotModule, */
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
