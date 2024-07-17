import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Logs {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  link: string;

  @Prop()
  level: string;

  @Prop()
  technology: string;

  @Prop()
  language: string;

  @Prop()
  channelId: number;

  @Prop()
  channel: string;

  @Prop()
  createdAt: Date;
}

export const logSchema = SchemaFactory.createForClass(Logs);
