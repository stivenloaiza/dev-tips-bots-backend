import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { TipDto } from '../dto/telegram.dto';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;
  private chatId: string;
  private cronJobsUrl: string;

  constructor(private configService: ConfigService) {
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID'); // CAMBIAR ESTO, TERMINAR DE PROBAR
    this.cronJobsUrl = this.configService.get<string>('CRON_JOBS_URL'); // CAMBIAR ESTO, TERMINAR DE PROBAR
  }

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN'); // CAMBIAR ESTO
    this.bot = new TelegramBot(token, { polling: true });
    this.pollForTips();
  }

  private formatTipMessage(tip: TipDto): string {
    let message = `
            <b>💡 ${tip.title}</b>

            ${tip.body}

            🔗 <a href="${tip.link}">Learn more</a>

            🏷️ <b>Level:</b> ${tip.level}
            🌐 <b>Language:</b> ${tip.lang}
            🔧 <b>Technology:</b> ${tip.technology}
            🔍 <b>Subtechnology:</b> ${tip.subtechnology}
            `;

    if (tip.multimedia_url) {
      message += `\n\n<img src="${tip.multimedia_url}" />`;
    }

    return message;
  }

  private async fetchTip(): Promise<TipDto> {
    try {
      const response = await axios.get<TipDto>(this.cronJobsUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching tip from cron jobs API', error);
      throw new Error('Error fetching tip. Please try again later.');
    }
  }

  private async sendTip() {
    try {
      const tip = await this.fetchTip();
      const message = this.formatTipMessage(tip);
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
    } catch (error) {
      console.error('Error sending tip to Telegram', error);
    }
  }

  private async pollForTips() {
    while (true) {
      try {
        await this.sendTip();
        // Asumiendo que los cron jobs gestionarán el tiempo, podemos esperar un intervalo fijo o un evento.
        await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000)); // Sondeo cada hora como alternativa
      } catch (error) {
        console.error('Error during polling for tips', error);
        await new Promise((resolve) => setTimeout(resolve, 60 * 1000)); // Reintentar después de un minuto en caso de error
      }
    }
  }
}
