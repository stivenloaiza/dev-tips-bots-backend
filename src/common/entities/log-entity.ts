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
  levels: string;

  @Prop()
  technology: string;

  @Prop()
  lang: string;

  @Prop()
  channelId: number;

  @Prop()
  channelType: string;

  @Prop()
  createdAt: Date;
}

export const logSchema = SchemaFactory.createForClass(Logs);
