import { Module } from '@nestjs/common';
import { persistenceModule } from './config/persistence/persistence.module';


@Module({
  imports: [
    persistenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
