import { Controller} from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';


@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}

}
