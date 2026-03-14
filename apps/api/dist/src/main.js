"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidUnknownValues: false,
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.enableCors({
        origin: (origin, callback) => {
            const allowed = [
                process.env.FRONTEND_URL,
                /^chrome-extension:\/\/.+/,
            ].filter(Boolean);
            const isAllowed = !origin ||
                allowed.some((p) => typeof p === 'string' ? p === origin : p.test(origin));
            callback(null, isAllowed);
        },
        credentials: true,
    });
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map