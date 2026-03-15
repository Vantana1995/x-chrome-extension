"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (origin, callback) => {
            const allowed = [process.env.FRONTEND_URL, /^chrome-extension:\/\/.+/];
            const isAllowed = !origin ||
                allowed.some((p) => typeof p === 'string' ? p === origin : p.test(origin));
            callback(null, isAllowed);
        },
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3001);
    console.log(`Server running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
//# sourceMappingURL=main.js.map