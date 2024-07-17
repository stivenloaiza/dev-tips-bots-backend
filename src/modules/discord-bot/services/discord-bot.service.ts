import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  ChannelType,
  Client,
  GatewayIntentBits,
  TextChannel,
} from 'discord.js';
import { Logs } from '../../../common/entities/log-entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipDto } from 'src/common/dtos/tipDto';
import { messages } from '../../../common/messages/messagesLangDiscord';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;

  constructor(@InjectModel(Logs.name) private logsModel: Model<Logs>) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
  }

  async onModuleInit() {
    await this.client.login(process.env.BOT_TOKEN);
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
  }

  formatTipMessage(tip: TipDto): string {
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

  async getTip(CreateDiscordTipDto) {
    const { channelId } = CreateDiscordTipDto;

    try {
      const channel = this.client.channels.cache.get(channelId);

      if (!channel || channel.type !== ChannelType.GuildText) {
        throw new NotFoundException(
          `Channel ${channelId} is not a text channel or does not exist.`,
        );
      }

      const formattedMessage = this.formatTipMessage(CreateDiscordTipDto);
      const response = await (channel as TextChannel).send(formattedMessage);

      if (!response) {
        throw new InternalServerErrorException(
          `Failed to send tip to channel ${channelId}.`,
        );
      }

      // Save to MongoDB
      await this.saveTipToDatabase(CreateDiscordTipDto);

      return response;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to send tip. Please try again later.',
      );
    }
  }

  async saveTipToDatabase(createDiscordTip: TipDto): Promise<Logs> {
    const createdTip = new this.logsModel({
      ...createDiscordTip,
      createdAt: new Date(),
    });
    return createdTip.save();
  }

  // Method to get all tips
  async getAllTips(): Promise<Logs[]> {
    return this.logsModel.find().exec();
  }

  // Method to get a tip by ID
  async getTipById(id: string): Promise<Logs> {
    const tip = await this.logsModel.findById(id).exec();
    console.log(tip);

    if (!tip) {
      throw new NotFoundException(`Tip with ID ${id} not found`);
    }
    return tip;
  }

}
