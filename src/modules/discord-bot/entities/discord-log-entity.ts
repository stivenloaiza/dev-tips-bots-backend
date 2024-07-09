import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Logs {
    @Prop()
    id: number;

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
    groupId: number;

    @Prop()
    createddAt: Date;
}

export const logSchema = SchemaFactory.createForClass(Logs);