import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from "@nestjs/core";

import { AppModule } from './app.module';
import { ValidationPipe } from './services/pipes/validation.pipe';


async function bootstrap() {

  const PORT = process.env.PORT || 7000;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: true
    // origin: process.env.CLIENT_URL,
    // ---------------------------
    // origin: (origin, callback) => {
    //   const whitelist = [
    //     process.env.CLIENT_URL,
    //     process.env.CLIENT_URL_LOCAL
    //   ];

    //   if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //   } else {
    //       callback(new Error("Not allowed by CORS"))
    //   }
    // }
  });
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
