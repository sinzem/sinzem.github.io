import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Card } from 'src/api/cards/card.schema';
import { RolesEnum } from 'src/types/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  surname: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ default: "" })
  activation: string;

  @Prop({default: null})
  refreshToken: string;

  @Prop({ required: true })
  role: RolesEnum;

  @Prop({ default: null })
  photo: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  index: number;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: 0 })
  hold: number;

  @Prop({ default: 0 })
  profit: number;

  @Prop({ default: 0 })
  budget: number;

  @Prop({ default: 0 })
  notification: number;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]})
  cards: Card[]
}

export const UserSchema = SchemaFactory.createForClass(User);