import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';
import { CreateDiscordTipDto } from '../dto';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}

  @Post('tip')
  async getTip(@Body() createDiscordTipDto: CreateDiscordTipDto) {
    await this.discordBotService.getTip(createDiscordTipDto);
    return { statusCode: HttpStatus.CREATED, message: 'Tip sent successfully' };
  }

  @Get('all/tips')
  async getAllTips() {
    const tips = await this.discordBotService.getAllTips();
    return { statusCode: HttpStatus.OK, tips };
  }

  @Get(':id')
  async getTipById(@Param('id') id: string) {
    const tip = await this.discordBotService.getTipById(id);
    console.log(tip);
    return { statusCode: HttpStatus.OK, tip };
  }

  @Delete('delete/:id')
  async deleteTipById(@Param('id') id: string) {
    await this.discordBotService.deleteTipById(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Tip with ID ${id} deleted successfully`,
    };
  }
}
