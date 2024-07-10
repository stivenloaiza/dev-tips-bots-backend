import { Body, Controller, Get} from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';
import { CreateDiscordTipDto } from '../dto';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}
  
  @Get('tip')
  getTip(@Body() createDiscordTipDto: CreateDiscordTipDto){
    return this.discordBotService.getTip(createDiscordTipDto);
  }
}
