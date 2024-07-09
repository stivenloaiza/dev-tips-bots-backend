import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscordTipDto } from './create-discord-tip.dto';

export class UpdateDiscordBotDto extends PartialType(CreateDiscordTipDto) {}
