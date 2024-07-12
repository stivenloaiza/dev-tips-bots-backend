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
import { SentTipsService } from './send-tip.service';
import { Logs } from '../entities/discord-log-entity';
import { CreateDiscordTipDto } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;

  constructor(
    private readonly sentTipsService: SentTipsService,
    @InjectModel(Logs.name) private logsModel: Model<Logs>,
  ) {
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

  formatTipMessage(tip: CreateDiscordTipDto): string {
    let message = `
      **📝Tip title:**\n ${tip.title}\n\n🧠 **Description:**\n ${tip.body}\n\n⚡ **Seniority:**\n ${tip.level}\n\n❓ **Lenguage:**\n ${tip.technology}`;
    if (tip.link) {
      message += `\n\n📚 **Resource:** \n Checkout more info in this [website](${tip.link})!`;
    }
    return message;
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

  async saveTipToDatabase(
    createDiscordTip: CreateDiscordTipDto,
  ): Promise<Logs> {
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

  // Method to delete a tip by ID
  async deleteTipById(id: string): Promise<void> {
    const result = await this.logsModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Tip with ID ${id} not found`);
    }
  }
}
