import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscordBotDto } from './create-discord-tip.dto';

export class UpdateDiscordBotDto extends PartialType(CreateDiscordBotDto) {}
