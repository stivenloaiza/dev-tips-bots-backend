import { Controller } from '@nestjs/common';
import { DiscordBotService } from '../services/discord-bot.service';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordBotService) {}

}
