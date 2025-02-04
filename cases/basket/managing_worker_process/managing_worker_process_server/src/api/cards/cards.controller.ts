import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ValidationPipe } from 'src/services/pipes/validation.pipe';

@Controller('api/cards')
export class CardsController {

    constructor(private cardsService: CardsService) {}

    @UsePipes(ValidationPipe)
    @Post() 
    create(@Body() dto: CreateCardDto) { 
        return this.cardsService.createCard(dto);
    }
}
