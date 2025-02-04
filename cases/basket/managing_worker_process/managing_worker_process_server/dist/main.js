"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("./services/pipes/validation.pipe");
async function bootstrap() {
    const PORT = process.env.PORT || 7000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        credentials: true,
        origin: true
    });
    app.use(cookieParser());
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map