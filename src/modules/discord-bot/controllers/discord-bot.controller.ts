import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';
import { CreateDiscordTipDto } from '../dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}

  @Post('tip')
  @UseGuards(ApiKeyGuard)
  getTip(@Body() createDiscordTipDto: CreateDiscordTipDto) {
    return this.discordBotService.getTip(createDiscordTipDto);
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
