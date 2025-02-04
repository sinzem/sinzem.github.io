import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/api/users/user.schema';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' })
  ownerId: User;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cardNumberHidden: string;

  @Prop({ default: 0 })
  cardBalance: number;

  @Prop({ required: true })
  initials: string;
  
  @Prop({ required: true })
  cardCvc: number;

  @Prop({required: true})
  expiry: string;

  @Prop({default: "Visa"})
  system: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);