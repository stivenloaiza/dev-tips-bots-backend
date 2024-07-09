import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscordService } from '../services/discord-bot.service';
import { CreateDiscordTipDto, UpdateDiscordBotDto } from '../dto';

@Controller('discord-bot')
export class DiscordBotController {
  constructor(private readonly discordBotService: DiscordService) {}

 /*  @Post()
  create(@Body() createDiscordBotDto: CreateDiscordBotDto) {
    return this.discordBotService.create(createDiscordBotDto);
  }

  @Get()
  findAll() {
    return this.discordBotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discordBotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscordBotDto: UpdateDiscordBotDto) {
    return this.discordBotService.update(+id, updateDiscordBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discordBotService.remove(+id);
  } */
}
