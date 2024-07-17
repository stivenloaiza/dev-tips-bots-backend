import {
  Injectable,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { TipDto } from '../../../common/dtos/tipDto';
import { messages } from '../../../common/messages/messagesLangTelegram';
import { Logs } from '../../../common/entities/log-entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    @InjectModel(Logs.name) private logsModel: Model<Logs>,
  ) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TOKEN is not defined');
    }
    this.bot = new TelegramBot(token);
    /* this.setWebhook(); */
  }

  /*   private async setWebhook() {
    const url = `https://your-server-url/api/telegram-webhook`;
    await this.bot.setWebHook(url);
  } */

  private formatTipMessage(tip: TipDto): string {
    if (
      tip.lang.toLowerCase() === 'spanish' ||
      tip.lang.toLowerCase() === 'español'
    ) {
      return messages.spanish(tip);
    } else if (
      tip.lang.toLowerCase() === 'english' ||
      tip.lang.toLowerCase() === 'inglés' ||
      tip.lang.toLowerCase() === 'ingles'
    ) {
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
      const message = this.formatTipMessage(tipDto);

      const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

      await axios.post(url, {
        chat_id: tipDto.channelId,
        text: message,
        parse_mode: 'HTML',
      });

      await this.saveTipToDatabase(tipDto);
    } catch (error) {
      console.error(
        'Error sending tip to Telegram:',
        error.response ? error.response.data : error.message,
      );
      throw new InternalServerErrorException(
        'Failed to send tip. Please try again later.',
      );
    }
  }
}
