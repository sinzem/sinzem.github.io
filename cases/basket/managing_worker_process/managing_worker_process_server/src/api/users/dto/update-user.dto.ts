import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto {

    @IsString({message: "This should be a string"}) 
    @Length(2, 32, {message: "The name length must be from 2 to 32 characters"}) 
    readonly name: string;

    @IsString({message: "This should be a string"}) 
    @Length(2, 32, {message: "The name length must be from 2 to 32 characters"}) 
    readonly surname: string;

    @IsString({message: "This should be a string"}) 
    @Length(13, 13, {message: 'The telephone number must consist of a "+" sign and twelve digits'}) 
    readonly phone: string;

    @IsString({message: "This should be a string"}) 
    @IsEmail({}, {message: "Incorrect email address"}) 
    readonly email: string;

    @IsString({message: "This should be a string"}) 
    @Length(8, 32, {message: "The password length must be from 8 to 32 characters"}) 
    readonly password: string;
}