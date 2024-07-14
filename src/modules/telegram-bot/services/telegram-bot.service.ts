import { Injectable, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { TipDto } from '../../../common/dtos/tipDto';
import { messages } from '../../../common/messages/messagesLang';
import { Logs } from '../../../common/entities/log-entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;
  private cronJobsUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(Logs.name) private logsModel: Model<Logs>,) {
    this.cronJobsUrl = this.configService.get<string>('CRON_JOBS_URL');
  }

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });
  }

  private formatTipMessage(tip: TipDto): string {
    if (tip.lang.toLowerCase() === 'spanish' || tip.lang.toLowerCase() === 'español') {
      return messages.spanish(tip);
    } else if (tip.lang.toLowerCase() === 'english' || tip.lang.toLowerCase() === 'inglés' || tip.lang.toLowerCase() === 'ingles') {
      return messages.english(tip);
    } else {
      return messages.unsupported(tip);
    }
  }
  async saveTipToDatabase(tipDto: TipDto): Promise<Logs> {
    const createdTip = new this.logsModel({
      ...tipDto,
      createdAt: new Date(),
    });
    return createdTip.save();
  }

  async getTip(tipDto: TipDto): Promise<void> {
    try {
      const response = await axios.get<TipDto>(`${this.cronJobsUrl}/channel/${tipDto.channelId}`);
      const tip = response.data;

      const message = this.formatTipMessage(tip);
      await this.bot.sendMessage(tipDto.channelId, message, { parse_mode: 'HTML' });

      await this.saveTipToDatabase(tip);
    } catch (error) {
      console.error('Error sending tip to Telegram', error);
      throw new InternalServerErrorException('Failed to send tip. Please try again later.');
    }
  }

}
