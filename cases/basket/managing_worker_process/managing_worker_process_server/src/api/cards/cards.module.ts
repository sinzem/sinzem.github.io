import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card, CardSchema } from './card.schema';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema}])]
})
export class CardsModule {}
