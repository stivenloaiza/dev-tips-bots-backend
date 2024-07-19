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
  subtechnology: string;

  @Prop()
  lang: string;

  @Prop()
  channelId: number;

  @Prop()
  channelType: string;

  @Prop({ default: 'unavailable' })
  img_url: string;

  @Prop()
  createdAt: Date;
}

export const logSchema = SchemaFactory.createForClass(Logs);
