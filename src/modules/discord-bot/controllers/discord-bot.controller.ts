import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';
import { CreateDiscordTipDto } from '../dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}

  //Send the tip to the channel
  @Post('tip')
  @UseGuards(ApiKeyGuard)
  getTip(@Body() createDiscordTipDto: CreateDiscordTipDto) {
    return this.discordBotService.getTip(createDiscordTipDto);
  }

  //Find all the tips in the database
  @Get('all/tips')
  async getAllTips() {
    return await this.discordBotService.getAllTips();
  }

  // Get a tip by ID
  @Get(':id')
  async getTipById(@Param('id') id: string) {
    return await this.discordBotService.getTipById(id);
  }

  // Delete a tip by ID
  @Delete('delete/:id')
  async deleteTipById(@Param('id') id: string) {
    await this.discordBotService.deleteTipById(id);
    return { message: `Tip with ID ${id} deleted successfully` };
  }
}
