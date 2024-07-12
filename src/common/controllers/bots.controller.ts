import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DiscordService } from '../../modules/discord-bot/services/discord-bot.service';
import { TipDto } from '../dtos/tipDto'; 
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('discord-bot')
export class BotController {
  constructor(private readonly discordBotService: DiscordService) {}

  @Post('bots')
  @UsePipes(new ValidationPipe())
  @UseGuards(ApiKeyGuard)
  getTip(@Body() tipDto: TipDto) {
    return this.discordBotService.getTip(tipDto);
  }

  @Get('all/tips')
  @ApiOperation({ summary: 'Find all the tips of the system.', description: 'View all tips registered in the system.' })
  @ApiResponse({status: 200, description: 'All tips were found successfully.'})
  @ApiResponse({status: 404, description: 'No tips were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the tips.'})
  async getAllTips() {
    const tips = await this.discordBotService.getAllTips();
    return { statusCode: HttpStatus.OK, tips };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the tip by ID of the system.', description: 'View a specific tip registered in the database.' })
  @ApiResponse({status: 200, description: 'Tip found successfully.',})
  @ApiResponse({status: 404, description: 'Tip with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the tip.'})
  async getTipById(@Param('id') id: string) {
    const tip = await this.discordBotService.getTipById(id);
    console.log(tip);
    return { statusCode: HttpStatus.OK, tip };
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a tip to the system.', description: 'Delete a tip of the system.' })
  @ApiResponse({status: 200, description: 'Tip deleted successfully.'})
  @ApiResponse({status: 404, description: 'Tip with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the tip.'})
  async deleteTipById(@Param('id') id: string) {
    await this.discordBotService.deleteTipById(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Tip with ID ${id} deleted successfully`,
    };
  }
}
