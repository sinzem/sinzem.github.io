import { IsString, Length } from "class-validator";

export class CreateCardDto {
    @Length(16, 16, {message: "The card number length must be 16 characters, only numbers"}) 
    readonly cardNumber: number;

    @IsString({message: "This should be a string"}) 
    @Length(4, 100, {message: "The initials length must be from 4 to 100 characters"}) 
    readonly initials: string;

    @Length(3, 3, {message: 'The CVC code must be 3 characters, only numbers'}) 
    readonly cardCvc: number;
 
    @IsString({message: "This should be a string"}) 
    @Length(5, 5, {message: "It must be a string of 5 characters - the month and year digits separated by a bar"}) 
    readonly expiry: string;
}