import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
export declare class CardsController {
    private cardsService;
    constructor(cardsService: CardsService);
    create(dto: CreateCardDto): Promise<void>;
}
