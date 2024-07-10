import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChannelType, Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { SentTipsService } from './send-tip.service';
import { Logs } from '../entities/discord-log-entity';
import { CreateDiscordTipDto } from '../dto';


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

  formatTipMessage(tip: CreateDiscordTipDto): string {
    let message = `
      **📝Tip title:**\n ${tip.title}\n\n🧠 **Description:**\n ${tip.body}\n\n⚡ **Seniority:**\n ${tip.level}\n\n❓ **Lenguage:**\n ${tip.technology}`;
    if (tip.link) {
      message += `\n\n📚 **Resource:** \n Checkout more info in this [website](${tip.link})!`;
    }
    return message;
  }

  async getTip(CreateDiscordTipDto){
    const { channelId } = CreateDiscordTipDto

    try {
      const channel = this.client.channels.cache.get(channelId);
      let response
      
      if (channel && channel.type === ChannelType.GuildText) {
        response = await (channel as TextChannel).send(this.formatTipMessage(CreateDiscordTipDto));
      } else {
        console.error(`Channel ${channelId} is not a text channel.`);
      }
      return response
    } catch (err) {
      console.log(err);
    }
  }



}