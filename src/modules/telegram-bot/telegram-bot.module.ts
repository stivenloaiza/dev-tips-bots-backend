import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';

@Module({
  imports: [],
  providers: [ServicesService]
})
export class TelegramBotModule {}
