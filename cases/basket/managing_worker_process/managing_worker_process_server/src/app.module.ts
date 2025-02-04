import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './api/users/users.module';
import { CardsModule } from './api/cards/cards.module';
import { AuthModule } from './api/auth/auth.module';
import { MailModule } from './api/mail/mail.module';

const DB = process.env.MONGO_DB;

@Module({
  imports: [
    MongooseModule.forRoot(`${DB}`), 
    UsersModule, 
    CardsModule, 
    AuthModule, 
    MailModule
  ],
})
export class AppModule {}
