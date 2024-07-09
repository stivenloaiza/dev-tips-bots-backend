import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits} from 'discord.js';
import { SentTipsService } from './send-tip.service';


@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;

  constructor(private readonly sentTipsService: SentTipsService) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
    });
  }


  async onModuleInit() {
    await this.client.login(process.env.BOT_TOKEN);
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
  }

  formatTipMessage(tip: any): string {
    let message = `
      **📝Tip title:**\n ${tip.title}\n\n🧠 **Description:**\n ${tip.body}\n\n⚡ **Seniority:**\n ${tip.level}\n\n❓ **Lenguage:**\n ${tip.technology}`;
    if (tip.link) {
      message += `\n\n📚 **Resource:** \n Checkout more info in this [website](${tip.link})!`;
    }
    return message;
  }
}

