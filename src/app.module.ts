import { Module } from '@nestjs/common';
import { persistenceModule } from './config/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/persistence/db-config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:  [dbConfig],
      envFilePath: '.env',
    }),
    persistenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
