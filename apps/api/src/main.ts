import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [process.env.FRONTEND_URL, /^chrome-extension:\/\/.+/];
      const isAllowed =
        !origin ||
        allowed.some((p) =>
          typeof p === 'string' ? p === origin : p.test(origin),
        );
      callback(null, isAllowed);
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);

  console.log(`Server running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
